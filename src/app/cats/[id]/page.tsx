// src/app/cats/[id]/page.tsx
import CatSlider from "@/components/CatSlider/CatSlider";
import { fetchCatById } from "@/lib/catApi";
import "./style.css";
interface Props {
  params: Promise<{ id: string }>; // Promise型に変更
}

export default async function CatDetail({ params }: Props) {
  const { id } = await params;
  const cat = await fetchCatById(id);

  if (!cat) {
    return <div>ねこちゃんが見つかりませんでした。</div>;
  }

  return (
    <div className="c-section-wrapper p-detail">
      {/* 家族が決まった投稿に表示 */}
      {/* <div className="p-detail-adopted__label">
        <div className="c-container">
          <h1 className="p-detail-adopted__label-title">{cat.title}</h1>
          <div className="p-detail-adopted__label-adopted">
            家族が決まりました！
          </div>
        </div>
      </div> */}

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
          <div className="p-detail-desc__contact">
            <button className="c-common-btn" type="submit">
              応募する・問い合わせる
            </button>
          </div>
        </div>
      </section>

      {/* 家族が決まった投稿に表示 */}
      {/* <section id="adopted-update" className="c-section p-detail-adopted">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">
              2025/08/10　家族になって○ヵ月の様子
            </h2>
          </div>
          <div className="p-detail-adopted__image">
            <Image
              src="/sample/adopted.jpg"
              alt=""
              fill
              style={{ objectFit: "contain" }}
              className="p-detail-adopted__image-photo"
            />
          </div>
          <div className="p-detail-adopted__desc">
            <h3 className="p-detail-adopted__title">ご家族からのコメント</h3>
            <p className="p-detail-adopted__text">
              〇〇と家族になって3ヶ月、体重が３キロと倍に成長しました！
              驚くほどすぐにうちに慣れて、毎日元気に走り回っています。人間が大好きで、毎日一緒に寝ています。
              これからも大事に育てていきます。
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
