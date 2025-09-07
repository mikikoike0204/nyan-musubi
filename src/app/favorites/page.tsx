import Image from "next/image";
import Link from "next/link";

export default function Favorites() {
  return (
    <div className="c-section-wrapper">
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/favorites/bg-mv.jpg')" }}
            ></div>
            <div className="p-sub-mv__bg"></div>
            <h1 className="p-sub-mv__title">お気に入りのねこちゃん</h1>
          </div>
        </div>
      </section>

      <section className="c-section p-favorites-list">
        <div className="c-container">
          <ul className="p-top-newcat__list">
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/top/newcat-list-img01.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    12ヶ月 / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">茶白</div>
                    <h3 className="p-top-newcat__text2-title">
                      人懐っこい男の子
                    </h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/sample/newcat-list-img02.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    6ヶ月 / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">キジトラ</div>
                    <h3 className="p-top-newcat__text2-title">元気な女の子</h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/sample/newcat-list-img03.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    3ヶ月 / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">キジ白</div>
                    <h3 className="p-top-newcat__text2-title">
                      おとなしい男の子
                    </h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/sample/newcat-list-img04.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    シニア / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">サバトラ</div>
                    <h3 className="p-top-newcat__text2-title">
                      落ち着きのある男の子
                    </h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/top/newcat-list-img01.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    12ヶ月 / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">茶白</div>
                    <h3 className="p-top-newcat__text2-title">
                      人懐っこい男の子
                    </h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/sample/newcat-list-img02.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    6ヶ月 / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">キジトラ</div>
                    <h3 className="p-top-newcat__text2-title">元気な女の子</h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/sample/newcat-list-img03.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    3ヶ月 / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">キジ白</div>
                    <h3 className="p-top-newcat__text2-title">
                      おとなしい男の子
                    </h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__image">
                  <Image
                    src="/sample/newcat-list-img04.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                    className="p-top-newcat__image-pic"
                  />
                </div>
                <div className="p-top-newcat__desc">
                  <div className="p-top-newcat__text1">
                    ミックス ♂<br />
                    シニア / 関東
                  </div>
                  <div className="p-top-newcat__text2">
                    <div className="p-top-newcat__text2-s">サバトラ</div>
                    <h3 className="p-top-newcat__text2-title">
                      落ち着きのある男の子
                    </h3>
                  </div>
                  <button className="p-top-newcat__fav">お気に入り❤︎</button>
                </div>
              </a>
            </li>
          </ul>

          <div className="p-top-newcat__more">
            <Link href="/" className="c-common-btn">
              TOPページに戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
