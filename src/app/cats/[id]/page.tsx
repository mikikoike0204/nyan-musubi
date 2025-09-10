// src/app/cats/[id]/page.tsx
import CatSlider from "@/components/CatSlider/CatSlider";
import { fetchCatById } from "@/lib/catApi";
import "./style.css";

interface Props {
  params: { id: string };
}

export default async function CatDetail({ params }: Props) {
  const cat = await fetchCatById(params.id);

  if (!cat) {
    return <div>ねこちゃんが見つかりませんでした。</div>;
  }

  return (
    <div className="c-section-wrapper p-detail">
      <section className="c-section p-detail-slider">
        <div className="c-container">
          <CatSlider images={cat.sliderImages} />
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
                  <div className="p-detail-desc__table-head">避妊・去勢</div>
                  <div className="p-detail-desc__table-desc">{cat.neuter}</div>
                </li>
                <li className="p-detail-desc__table-item">
                  <div className="p-detail-desc__table-head">その他条件</div>
                  <div className="p-detail-desc__table-desc">{cat.other}</div>
                </li>
              </ul>
            </div>
            <div className="p-detail-desc__explanation">
              <h2 className="p-detail-desc__content-title">
                性格やアピールポイント
              </h2>
              <div className="p-detail-desc__explanation-text">
                {cat.description}
              </div>
              <div className="p-detail-desc__explanation-fav">
                <button className="p-top-newcat__fav">お気に入り❤︎</button>
              </div>
            </div>
          </div>
          <a className="p-detail-desc__contact" href="">
            応募する・問い合わせる
          </a>
        </div>
      </section>
    </div>
  );
}
