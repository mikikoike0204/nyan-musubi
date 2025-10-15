// src/app/adopted/[id]/edit/page.tsx
"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Prefecture, prefectureOptions } from "@/types/prefectures";
import { Color, colorOptions } from "@/types/color";
import styles from "./page.module.css";
import Image from "next/image";

export default function EditCatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { id: catId } = use(params);

  // フォーム状態
  const [title, setTitle] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [color, setColor] = useState<Color | "">("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [singleOk, setSingleOk] = useState(false);
  const [elderlyOk, setElderlyOk] = useState(false);
  const [description, setDescription] = useState("");
  const [personality, setPersonality] = useState("");
  const [health, setHealth] = useState("");
  const [adopted, setAdopted] = useState(false);

  // 画像
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [sliderFiles, setSliderFiles] = useState<File[]>([]);
  const [currentSliderImages, setCurrentSliderImages] = useState<any[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  // 既存データ読み込み
  useEffect(() => {
    const checkSessionAndLoadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);

      // 投稿データ取得
      const { data: catData, error: catError } = await supabase
        .from("cat_adoption_info")
        .select("*")
        .eq("id", catId)
        .single();

      if (catError || !catData) {
        alert("投稿が見つかりません");
        router.push("/adopted");
        return;
      }

      // 投稿者本人かチェック
      if (catData.user_id !== session.user.id) {
        alert("編集権限がありません");
        router.push("/adopted");
        return;
      }

      // フォームに既存データをセット
      setTitle(catData.title || "");
      setPrefecture(catData.prefecture || "");
      setColor(catData.color || "");
      setAge(catData.age || "");
      setGender(catData.gender || "");
      setVaccinated(catData.vaccinated || false);
      setNeutered(catData.neutered || false);
      setSingleOk(catData.single_ok || false);
      setElderlyOk(catData.elderly_ok || false);
      setDescription(catData.description || "");
      setPersonality(catData.personality || "");
      setHealth(catData.health_condition || "");
      setCurrentThumbnail(catData.thumbnail || "");
      setAdopted(catData.adopted || false);

      // スライダー画像取得
      const { data: images, error: imagesError } = await supabase
        .from("cat_images")
        .select("*")
        .eq("cat_id", catId)
        .order("order");

      if (!imagesError && images) {
        setCurrentSliderImages(images);
      }

      setLoading(false);
    };

    checkSessionAndLoadData();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push("/login");
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router, catId]);

  if (loading) return <p className="c-loading">読み込み中...</p>;

  // 画像選択
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0])
      setThumbnailFile(e.target.files[0]);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 7);
    setSliderFiles(files);
  };

  // 既存画像削除
  const handleDeleteSliderImage = (imageId: number) => {
    setDeletedImageIds([...deletedImageIds, imageId]);
    setCurrentSliderImages(
      currentSliderImages.filter((img) => img.id !== imageId)
    );
  };

  // Storage アップロード
  const uploadFile = async (file: File, folder: string) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(fileName, file);
    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from(folder).getPublicUrl(fileName);
    if (!data.publicUrl) throw new Error("URL取得失敗");

    return data.publicUrl;
  };

  // 更新
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let thumbUrl = currentThumbnail;

      // 新しいサムネイルがある場合はアップロード
      if (thumbnailFile) {
        thumbUrl = await uploadFile(thumbnailFile, "cat-images");
      }

      // 投稿情報更新
      const { error: updateError } = await supabase
        .from("cat_adoption_info")
        .update({
          title,
          prefecture,
          color,
          age,
          gender,
          description,
          personality,
          health_condition: health,
          vaccinated,
          neutered,
          single_ok: singleOk,
          elderly_ok: elderlyOk,
          thumbnail: thumbUrl,
          adopted,
        })
        .eq("id", catId);

      if (updateError) throw new Error(updateError.message);

      // 削除対象の画像を削除
      for (const imageId of deletedImageIds) {
        await supabase.from("cat_images").delete().eq("id", imageId);
      }

      // 新しいスライダー画像をアップロード
      if (sliderFiles.length > 0) {
        const maxOrder =
          currentSliderImages.length > 0
            ? Math.max(...currentSliderImages.map((img) => img.order))
            : 0;

        for (let i = 0; i < sliderFiles.length; i++) {
          const url = await uploadFile(sliderFiles[i], "cat-images");
          await supabase
            .from("cat_images")
            .insert([
              { cat_id: catId, image_url: url, order: maxOrder + i + 1 },
            ]);
        }
      }

      alert("更新しました!");

      // adopted状態によって遷移先を変更
      if (adopted) {
        router.push(`/adopted/${catId}`);
      } else {
        router.push(`/cats/${catId}`);
      }
    } catch (err: any) {
      console.error(err);
      alert("更新失敗: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="c-section-wrapper p-detail">
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/cats/bg-mv.jpg')" }}
            ></div>
            <div className="p-sub-mv__bg"></div>
            <h1 className="p-sub-mv__title">投稿を編集</h1>
          </div>
        </div>
      </section>

      <section className="c-section p-detail-desc">
        <div className="c-container">
          <form onSubmit={handleSubmit}>
            <div className={styles.postTitle}>
              <div className={styles.postTitleHead}>タイトル:</div>
              <div className={styles.postTitleDesc}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="投稿タイトルを入力"
                  required
                />
              </div>
            </div>

            <div className={styles.postThumbnail}>
              <label className={styles.postThumbnailLabel}>サムネイル</label>
              {currentThumbnail && !thumbnailFile && (
                <div className={styles.postThumbnailImage}>
                  <div className={styles.postThumbnailImageImgWrap}>
                    <Image
                      src={currentThumbnail}
                      alt="現在のサムネイル"
                      fill
                      sizes="185px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className={styles.postThumbnailImageText}>
                    現在のサムネイル（変更する場合は新しい画像を選択）
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className={styles.postThumbnailInput}
              />
            </div>

            <div className={styles.postSlider}>
              <label className={styles.postSliderLabel}>スライダー画像</label>

              {currentSliderImages.length > 0 && (
                <div className={styles.postSliderSelectedWrap}>
                  <p className={styles.postSliderSelectedText}>現在の画像:</p>
                  <div className={styles.postSliderSelectedItem}>
                    {currentSliderImages.map((img) => (
                      <div
                        className={styles.postSliderSelectedItemInner}
                        key={img.id}
                      >
                        <div className={styles.postSliderSelectedItemImage}>
                          <Image
                            src={img.image_url}
                            alt=""
                            fill
                            sizes="100px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <button
                          className={styles.postSliderSelectedItemImageClose}
                          type="button"
                          onClick={() => handleDeleteSliderImage(img.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.postSliderSelectedItemAdd}>
                <label className={styles.postSliderSelectedItemAddLabel}>
                  新しい画像を追加 (最大7枚)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSliderChange}
                  className={styles.postSliderSelectedItemAddInput}
                />
              </div>
              {sliderFiles.length > 0 && (
                <div className={styles.postSliderSelectedWrap}>
                  <p>追加予定: </p>
                  <ul className={styles.postSliderSelected}>
                    {sliderFiles.map((f, idx) => (
                      <li className={styles.postSliderSelectedItem} key={idx}>
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.table}>
                <h2 className={styles.contentTitle}>基本情報</h2>
                <ul className={styles.tableList}>
                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>毛色</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postSelectWrap}`}
                    >
                      <select
                        value={color}
                        onChange={(e) => setColor(e.target.value as Color)}
                        className={styles.postSelect}
                        required
                      >
                        <option value="">選択してください</option>
                        {colorOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>募集地域</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postSelectWrap}`}
                    >
                      <select
                        value={prefecture}
                        onChange={(e) =>
                          setPrefecture(e.target.value as Prefecture)
                        }
                        className={styles.postSelect}
                        required
                      >
                        <option value="">選択してください</option>
                        {prefectureOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>年齢</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postSelectWrap}`}
                    >
                      <select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={styles.postSelect}
                      >
                        <option value="">選択してください</option>
                        <option value="幼少期">幼少期</option>
                        <option value="若年期">若年期</option>
                        <option value="高齢期">高齢期</option>
                      </select>
                    </div>
                  </li>
                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>性別</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postSelectWrap}`}
                    >
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={styles.postSelect}
                      >
                        <option value="">選択してください</option>
                        <option value="オス">オス</option>
                        <option value="メス">メス</option>
                        <option value="不明">不明</option>
                      </select>
                    </div>
                  </li>
                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>ワクチン接種</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postRadioWrap}`}
                    >
                      <label>
                        <input
                          type="radio"
                          name="vaccinated"
                          checked={vaccinated === true}
                          onChange={() => setVaccinated(true)}
                        />
                        済
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="vaccinated"
                          checked={vaccinated === false}
                          onChange={() => setVaccinated(false)}
                        />
                        未
                      </label>
                    </div>
                  </li>

                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>避妊・去勢</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postRadioWrap}`}
                    >
                      <label>
                        <input
                          type="radio"
                          name="neutered"
                          checked={neutered === true}
                          onChange={() => setNeutered(true)}
                        />
                        済
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="neutered"
                          checked={neutered === false}
                          onChange={() => setNeutered(false)}
                        />
                        未
                      </label>
                    </div>
                  </li>

                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>単身者応募可否</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postRadioWrap}`}
                    >
                      <label>
                        <input
                          type="radio"
                          name="singleOk"
                          checked={singleOk === true}
                          onChange={() => setSingleOk(true)}
                        />
                        可
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="singleOk"
                          checked={singleOk === false}
                          onChange={() => setSingleOk(false)}
                        />
                        不可
                      </label>
                    </div>
                  </li>

                  <li className={styles.tableItem}>
                    <div className={styles.tableHead}>高齢者応募可否</div>
                    <div
                      className={`${styles.tableDesc} ${styles.postRadioWrap}`}
                    >
                      <label>
                        <input
                          type="radio"
                          name="elderlyOk"
                          checked={elderlyOk === true}
                          onChange={() => setElderlyOk(true)}
                        />
                        可
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="elderlyOk"
                          checked={elderlyOk === false}
                          onChange={() => setElderlyOk(false)}
                        />
                        不可
                      </label>
                    </div>
                  </li>
                  <li className={styles.tableItem}>
                    <div className={styles.tableHeadAdopted}>
                      家族が決まったかどうか
                    </div>
                    <div
                      className={`${styles.tableDesc} ${styles.postRadioWrap}`}
                    >
                      <label>
                        <input
                          type="radio"
                          name="adopted"
                          checked={adopted === true}
                          onChange={() => setAdopted(true)}
                        />
                        決まった
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="adopted"
                          checked={adopted === false}
                          onChange={() => setAdopted(false)}
                        />
                        募集中
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.explanation}>
                <div className={styles.explanationItem}>
                  <h2 className={styles.contentTitle}>保護の経緯</h2>
                  <div className={styles.explanationText}>
                    <textarea
                      placeholder="いつ、どこで保護したか、詳しい状況などを記載して下さい。"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.explanationItem}>
                  <h2 className={styles.contentTitle}>性格・特徴</h2>
                  <div className={styles.explanationText}>
                    <textarea
                      placeholder="できるだけ詳しく書くと、新しい家族が見つかりやすくなります。"
                      value={personality}
                      onChange={(e) => setPersonality(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.explanationItem}>
                  <h2 className={styles.contentTitle}>健康状態</h2>
                  <div className={styles.explanationText}>
                    <textarea
                      placeholder="獣医を受診したかどうか、した場合はその結果を書いて下さい。受診していない場合は、ご飯の食べ具合や元気さ、怪我や病気の有無など見てわかる範囲で書いて下さい。"
                      value={health}
                      onChange={(e) => setHealth(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`c-common-btn ${styles.postSubmit}`}
            >
              {loading ? "更新中..." : "更新する"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
