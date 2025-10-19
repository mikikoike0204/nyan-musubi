import CatSlider from "@/components/CatSlider/CatSlider";
import EditButton from "@/components/EditButton/EditButton";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { fetchCatById, fetchCatImages } from "@/lib/catApi";
import styles from "./page.module.css";
import CommentForm from "@/components/CommentForm/CommentForm";
import CommentList from "@/components/CommentList/CommentList";
import { fetchComments } from "@/lib/commentApi";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CatDetail({ params }: Props) {
  const { id } = await params;

  const cat = await fetchCatById(id);
  const images = await fetchCatImages(id);
  const comments = await fetchComments(id);

  if (!cat) {
    return <div className="c-loading">ねこちゃんが見つかりませんでした。</div>;
  }

  return (
    <div className="c-section-wrapper p-detail">
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
            <EditButton catId={id} postUserId={cat.user_id} />
          </div>
        </div>
      </section>
      <section className="c-section p-detail-comment">
        <div className="c-container">
          <h2 className={styles.commentTitle}>質問する</h2>
          <div className={styles.commentContent}>
            <div className={styles.commentFormWrap}>
              <CommentForm catId={id} />
            </div>
            <CommentList comments={comments} catPostUserId={cat.user_id} />
          </div>
        </div>
      </section>
    </div>
  );
}
