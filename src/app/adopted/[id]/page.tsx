// src/app/adopted/[id]/page.tsx
import CatSlider from "@/components/CatSlider/CatSlider";
import EditButton from "@/components/EditButton/EditButton";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { fetchCatById, fetchCatImages, fetchCatUpdates } from "@/lib/catApi";
import styles from "./page.module.css";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>; // ← Next.js 15 では Promise 型
}

export default async function CatDetail({ params }: Props) {
  const { id } = await params; // ← Promise を await して展開

  const cat = await fetchCatById(id);
  const images = await fetchCatImages(id);
  const updates = await fetchCatUpdates(id);

  if (!cat) {
    return <div className="c-loading">ねこちゃんが見つかりませんでした。</div>;
  }

  return (
    <div className="c-section-wrapper p-detail">
      <div className={styles.adoptedLabel}>
        <div className="c-container">
          <h1 className={styles.adoptedLabelTitle}>{cat.title}</h1>
          <div className={styles.adoptedLabelAdopted}>家族が決まりました！</div>
        </div>
      </div>
      <section className="c-section p-detail-slider">
        <div className="c-container">
          <CatSlider images={images.map((img) => img.image_url)} />
        </div>
      </section>
      <section className="c-section p-detail-desc">
        <div className="c-container">
          <h1 className={styles.title}>{cat.title}</h1>
          <div className={styles.content}>
            <div className={styles.table}>
              <h2 className={styles.contentTitle}>基本情報</h2>
              <ul className={styles.tableList}>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>毛色</div>
                  <div className={styles.tableDesc}>{cat.color}</div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>募集地域</div>
                  <div className={styles.tableDesc}>{cat.prefecture}</div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>年齢</div>
                  <div className={styles.tableDesc}>{cat.age}</div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>性別</div>
                  <div className={styles.tableDesc}>{cat.gender}</div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>ワクチン接種</div>
                  <div className={styles.tableDesc}>
                    {cat.vaccinated ? "済" : "未"}
                  </div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>避妊・去勢</div>
                  <div className={styles.tableDesc}>
                    {cat.neutered ? "済" : "未"}
                  </div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>単身者応募可否</div>
                  <div className={styles.tableDesc}>
                    {cat.single_ok ? "可" : "不可"}
                  </div>
                </li>
                <li className={styles.tableItem}>
                  <div className={styles.tableHead}>高齢者応募可否</div>
                  <div className={styles.tableDesc}>
                    {cat.elderly_ok ? "可" : "不可"}
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.explanation}>
              <div className={styles.explanationItem}>
                <h2 className={styles.contentTitle}>保護の経緯</h2>
                <div className={styles.explanationText}>{cat.description}</div>
              </div>
              <div className={styles.explanationItem}>
                <h2 className={styles.contentTitle}>性格・特徴</h2>
                <div className={styles.explanationText}>{cat.personality}</div>
              </div>
              <div className={styles.explanationItem}>
                <h2 className={styles.contentTitle}>健康状態</h2>
                <div className={styles.explanationText}>
                  {cat.health_condition}
                </div>
              </div>
              <div className={styles.explanationFav}>
                <FavoriteButton
                  catId={id}
                  isAdopted={cat.adopted}
                  showAlways={true}
                />
              </div>
            </div>
          </div>
          <div className={styles.contact}>
            {/* 投稿者本人なら「編集する」、それ以外は「応募する」を表示 */}
            <EditButton
              catId={id}
              postUserId={cat.user_id}
              editPath={`/adopted/${id}/edit`}
            />
          </div>
        </div>
      </section>

      {updates.length > 0 &&
        updates.map((update) => (
          <section
            key={update.id}
            id="adopted-update"
            className="c-section p-detail-adopted"
          >
            <div className="c-container">
              <div className="c-section-title-wrap">
                <h2 className="c-section-title">
                  {new Date(update.created_at).toLocaleDateString("ja-JP")}　
                  家族決定後の経過報告
                </h2>
              </div>

              {update.image_url && (
                <div className={styles.adoptedImage}>
                  <Image
                    src={update.image_url}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    className={styles.adoptedImagePhoto}
                  />
                </div>
              )}

              <div className={styles.adoptedDesc}>
                <h3 className={styles.adoptedTitle}>ご家族からのコメント</h3>
                <p className={styles.adoptedText}>{update.update_text}</p>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}
