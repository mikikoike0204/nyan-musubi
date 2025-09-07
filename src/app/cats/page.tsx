import React from "react";
import CatSearch from "@/components/CatSearch/CatSearch";
import Image from "next/image";
import Select from "@/components/Select/Select";
import "./style.css";

export default function Cats() {
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
            <h1 className="p-sub-mv__title">
              {" "}
              家族を探している
              <br />
              ねこちゃん一覧
            </h1>
          </div>
        </div>
      </section>

      <section className="c-section p-cats-parameters">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">絞り込み条件</h2>
          </div>
          <div className="p-cats-parameter__content">
            <form className="p-cats-parameter__form" action="">
              <CatSearch />
              <div className="p-top-newcat__more">
                <button type="submit" className="c-common-btn">
                  検索する
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="c-section p-cats-list">
        <div className="c-container">
          <div className="p-cats-list__sort">
            <Select
              name="sort"
              options={[
                { value: "desc", label: "登録が新しい順" },
                { value: "asc", label: "登録が古い順" },
                { value: "updated", label: "情報の更新順" },
              ]}
            />
          </div>
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

          <div className="c-pagination table ml-auto mr-auto mt-15">
            <ol className="c-pagination__list flex justify-center items-center gap-x-3">
              <li className="c-pagination__item w-10 h-20">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center arrow prev-arrow w-full h-full"
                  href=""
                >
                  <Image
                    src="/common/icon-prev-arrow.svg"
                    alt=""
                    width={20}
                    height={15}
                    className="c-pagination__arrow"
                  />
                </a>
              </li>
              <li className="c-pagination__item current border w-10 h-10 flex direction-col justify-center items-center">
                1
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  2
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  3
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  4
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  5
                </a>
              </li>
              <li className="c-pagination__item w-10 h-10">
                <a
                  className="c-pagination__link flex direction-col justify-center items-center arrow next-arrow w-10 h-10"
                  href=""
                >
                  <Image
                    src="/common/icon-next-arrow.svg"
                    alt=""
                    width={20}
                    height={15}
                    className="c-pagination__arrow"
                  />
                </a>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
