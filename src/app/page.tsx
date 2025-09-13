import TopSlider from "@/components/TopSlider/TopSlider";
import Image from "next/image";
import Link from "next/link";
import "./style.css";
import CatList from "@/components/CatList/CatList";

export default function Home() {
  return (
    <div className="c-section-wrapper">
      <section className="c-section p-top-mv">
        <div className="c-container">
          <TopSlider />
          <div className="p-top-mv__desc">
            <p className="p-top-mv__text">
              ねこを飼った事がないけれど、
              <br />
              困っている子を家族としてお迎えしたい。
            </p>
            <p className="p-top-mv__text">
              ねこについて詳しくないけど、
              <br />
              猫を保護したので家族になってくれる人を探したい。
            </p>
            <p className="p-top-mv__text">
              そんな優しい人たちの間で、にゃんこのご縁を結びたい。
              <br />
              そう思って出来たサイト「にゃん結び」です。
            </p>
          </div>
        </div>
      </section>

      <section className="c-section p-top-newcat">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">新着のねこちゃん</h2>
          </div>
          <CatList />
        </div>
      </section>

      <section className="c-section p-top-adopted">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">家族が決定したねこちゃん</h2>
          </div>
          <ul className="p-top-newcat__list">
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__shuku">
                  <Image
                    src="/top/icon-shuku.png"
                    alt=""
                    width="72"
                    height="64"
                  />
                </div>
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
                  <div className="p-top-newcat__adopted-label">
                    家族が決まりました！
                  </div>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__shuku">
                  <Image
                    src="/top/icon-shuku.png"
                    alt=""
                    width="72"
                    height="64"
                  />
                </div>
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
                  <div className="p-top-newcat__adopted-label">
                    家族が決まりました！
                  </div>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__shuku">
                  <Image
                    src="/top/icon-shuku.png"
                    alt=""
                    width="72"
                    height="64"
                  />
                </div>
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
                  <div className="p-top-newcat__adopted-label">
                    家族が決まりました！
                  </div>
                </div>
              </a>
            </li>
            <li className="p-top-newcat__item">
              <a className="p-top-newcat__link" href="">
                <div className="p-top-newcat__shuku">
                  <Image
                    src="/top/icon-shuku.png"
                    alt=""
                    width="72"
                    height="64"
                  />
                </div>
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
                  <div className="p-top-newcat__adopted-label">
                    家族が決まりました！
                  </div>
                </div>
              </a>
            </li>
          </ul>

          <div className="p-top-newcat__more">
            <Link href="/adopted" className="c-common-btn">
              もっと見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
