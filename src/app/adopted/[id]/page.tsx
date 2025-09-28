// src/app/adopted/[id]/page.tsx
import CatSlider from "@/components/CatSlider/CatSlider";
import { fetchCatById, fetchCatImages, fetchCatUpdates } from "@/lib/catApi";
import "./style.css";
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
    return <div>ねこちゃんが見つかりませんでした。</div>;
  }

  return (
    <div className="c-section-wrapper p-detail">
      <div className="p-detail-adopted__label">
        <div className="c-container">
          <h1 className="p-detail-adopted__label-title">{cat.title}</h1>
          <div className="p-detail-adopted__label-adopted">
            家族が決まりました！
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(cat, null, 2)}</pre> */}
      <section className="c-section p-detail-slider">
        <div className="c-container">
          <CatSlider images={images.map((img) => img.image_url)} />
        </div>
      </section>
      <section className="c-section p-detail-desc">
        <div className="c-container">
          <h1 className="p-detail-desc__title">{cat.title}</h1>
          <div className="p-detail-desc__content">
            <div className="p-detail-desc__table">
              <h2 className="p-detail-desc__content-title">基本情報</h2>
              <ul className="p-detail-desc__table-list">
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">毛色</div>
                  <div className="p-detail-desc__table-desc">{cat.color}</div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">募集地域</div>
                  <div className="p-detail-desc__table-desc">
                    {cat.prefecture}
                  </div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">年齢</div>
                  <div className="p-detail-desc__table-desc">{cat.age}</div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">性別</div>
                  <div className="p-detail-desc__table-desc">{cat.gender}</div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">ワクチン接種</div>
                  <div className="p-detail-desc__table-desc">
                    {cat.vaccinated ? "済" : "未"}
                  </div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">避妊・去勢</div>
                  <div className="p-detail-desc__table-desc">
                    {cat.neutered ? "済" : "未"}
                  </div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">
                    単身者応募可否
                  </div>
                  <div className="p-detail-desc__table-desc">
                    {cat.single_ok ? "可" : "不可"}
                  </div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">
                    高齢者応募可否
                  </div>
                  <div className="p-detail-desc__table-desc">
                    {cat.elderly_ok ? "可" : "不可"}
                  </div>
                </li>
              </ul>
            </div>
            <div className="p-detail-desc__explanation">
              <div className="p-detail-desc__explanation-item">
                <h2 className="p-detail-desc__content-title">保護の経緯</h2>
                <div className="p-detail-desc__explanation-text">
                  {cat.description}
                </div>
              </div>
              <div className="p-detail-desc__explanation-item">
                <h2 className="p-detail-desc__content-title">性格・特徴</h2>
                <div className="p-detail-desc__explanation-text">
                  {cat.personality}
                </div>
              </div>
              <div className="p-detail-desc__explanation-item">
                <h2 className="p-detail-desc__content-title">健康状態</h2>
                <div className="p-detail-desc__explanation-text">
                  {cat.health_condition}
                </div>
              </div>
              <div className="p-detail-desc__explanation-fav">
                <button className="p-top-newcat__fav">お気に入り❤︎</button>
              </div>
            </div>
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
                <div className="p-detail-adopted__image">
                  <Image
                    src={update.image_url}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    className="p-detail-adopted__image-photo"
                  />
                </div>
              )}

              <div className="p-detail-adopted__desc">
                <h3 className="p-detail-adopted__title">
                  ご家族からのコメント
                </h3>
                <p className="p-detail-adopted__text">{update.update_text}</p>
              </div>
            </div>
          </section>
        ))}
    </div>
  );
}
