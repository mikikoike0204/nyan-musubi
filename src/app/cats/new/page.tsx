"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Prefecture, prefectureOptions } from "@/types/prefectures";
import { Color, colorOptions } from "@/types/color";
import "./style.css";

export default function NewCatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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

  // 画像
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [sliderFiles, setSliderFiles] = useState<File[]>([]);
  const [sliderUrls, setSliderUrls] = useState<string[]>([]);

  // ログインチェック
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) router.push("/login");
      else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push("/login");
        else setUser(session.user);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (loading) return <p>チェック中...</p>;

  // 画像選択
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0])
      setThumbnailFile(e.target.files[0]);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 7); // 最大7枚
    setSliderFiles(files);
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

  // 投稿
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("ログインしてください");
      setLoading(false);
      return;
    }

    if (!thumbnailFile) return alert("サムネイルを選択してください");

    setLoading(true);
    try {
      // 1. サムネイルアップロード
      const thumbUrl = await uploadFile(thumbnailFile, "cat-images");

      // 2. 投稿作成
      const { data: catData, error: catError } = await supabase
        .from("cat_adoption_info")
        .insert([
          {
            user_id: user.id,
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
            adopted: false,
          },
        ])
        .select()
        .single();

      if (catError) throw new Error(catError.message);

      const catId = catData.id;

      // 3. スライダー画像アップロード
      const urls: string[] = [];
      for (let i = 0; i < sliderFiles.length; i++) {
        const url = await uploadFile(sliderFiles[i], "cat-images");
        urls.push(url);

        // cat_images にINSERT
        const { error } = await supabase
          .from("cat_images")
          .insert([{ cat_id: catId, image_url: url, order: i + 1 }]);
        if (error) console.error("cat_images insert error:", error.message);
      }

      setThumbnailUrl(thumbUrl);
      setSliderUrls(urls);

      alert("投稿しました！");
      router.push("/cats");
    } catch (err: any) {
      console.error(err);
      alert("投稿失敗: " + err.message);
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
            <h1 className="p-sub-mv__title">新規投稿作成</h1>
          </div>
        </div>
      </section>

      <section className="c-section p-detail-desc">
        <div className="c-container">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-new__post-title">
              <div className="p-new__post-title-head">タイトル:</div>
              <div className="p-new__post-title-desc">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="投稿タイトルを入力"
                  required
                />
              </div>
            </div>

            <div className="p-new__post-thumbnail">
              {/* サムネイル */}
              <label>サムネイル</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              {thumbnailFile && <p>選択中: {thumbnailFile.name}</p>}
            </div>

            <div className="p-new__post-silder">
              {/* スライダー画像 */}
              <label>スライダー画像 (最大7枚)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleSliderChange}
              />
              {sliderFiles.length > 0 && (
                <ul>
                  {sliderFiles.map((f, idx) => (
                    <li key={idx}>{f.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-detail-desc__content">
              <div className="p-detail-desc__table">
                <h2 className="p-detail-desc__content-title">基本情報</h2>
                <ul className="p-detail-desc__table-list">
                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">毛色</div>
                    <div className="p-detail-desc__table-desc p-new__post-select-wap">
                      <select
                        value={color}
                        onChange={(e) => setColor(e.target.value as Color)}
                        className="p-new__post-select"
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
                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">募集地域</div>
                    <div className="p-detail-desc__table-desc p-new__post-select-wap">
                      <select
                        value={prefecture}
                        onChange={(e) =>
                          setPrefecture(e.target.value as Prefecture)
                        }
                        className="p-new__post-select"
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
                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">年齢</div>
                    <div className="p-detail-desc__table-desc p-new__post-select-wap">
                      <select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="p-new__post-select"
                      >
                        <option value="">選択してください</option>
                        <option value="幼少期">幼少期</option>
                        <option value="若年期">若年期</option>
                        <option value="高齢期">高齢期</option>
                      </select>
                    </div>
                  </li>
                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">性別</div>
                    <div className="p-detail-desc__table-desc p-new__post-select-wap">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="p-new__post-select"
                      >
                        <option value="">選択してください</option>
                        <option value="オス">オス</option>
                        <option value="メス">メス</option>
                        <option value="不明">不明</option>
                      </select>
                    </div>
                  </li>
                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">
                      ワクチン接種
                    </div>
                    <div className="p-detail-desc__table-desc p-new__post-radio-wrap">
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

                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">避妊・去勢</div>
                    <div className="p-detail-desc__table-desc p-new__post-radio-wrap">
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

                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">
                      単身者応募可否
                    </div>
                    <div className="p-detail-desc__table-desc p-new__post-radio-wrap">
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

                  <li className="p-detail-desc__table-item">
                    <div className="p-detail-desc__table-head">
                      高齢者応募可否
                    </div>
                    <div className="p-detail-desc__table-desc p-new__post-radio-wrap">
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
                </ul>
              </div>
              <div className="p-detail-desc__explanation">
                <div className="p-detail-desc__explanation-item">
                  <h2 className="p-detail-desc__content-title">保護の経緯</h2>
                  <div className="p-detail-desc__explanation-text">
                    <textarea
                      placeholder="いつ、どこで保護したか、詳しい状況などを記載して下さい。"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-detail-desc__explanation-item">
                  <h2 className="p-detail-desc__content-title">性格・特徴</h2>
                  <div className="p-detail-desc__explanation-text">
                    <textarea
                      placeholder="できるだけ詳しく書くと、新しい家族が見つかりやすくなります。"
                      value={personality}
                      onChange={(e) => setPersonality(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-detail-desc__explanation-item">
                  <h2 className="p-detail-desc__content-title">健康状態</h2>
                  <div className="p-detail-desc__explanation-text">
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
              className="c-common-btn p-new__post-submit"
            >
              {loading ? "投稿中..." : "投稿する"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
