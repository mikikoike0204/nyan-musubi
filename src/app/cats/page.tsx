import React from "react";
import CatSearch from "@/components/CatSearch/CatSearch";
import Image from "next/image";
import Select from "@/components/Select/Select";

export default function Cats() {
  return (
    <main className="mt-5">
      <section>
        <div className="c-container">
          <div className="relative h-80 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/favorites/bg-mv.jpg')" }}
            ></div>

            <div className="absolute inset-0 bg-black/50"></div>
            <h1 className="relative text-white text-4xl font-bold tracking-wider text-center">
              家族を探している
              <br />
              ねこちゃん一覧
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-15">
        <div className="c-container">
          <h2 className="text-center text-xl bg-[#dfefff] border-dashed border-white border-2 shadow-[0_0_0_5px_#dfefff] px-1 py-1 text-center">
            絞り込み条件
          </h2>
          <div className="py-5 px-5 border border-gray-300 px-5 py-5 mt-15">
            <form action="">
              <CatSearch />
              <div className="table ml-auto mr-auto mt-10">
                <button
                  type="submit"
                  className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-10 font-medium border"
                >
                  <span>検索する</span>
                  <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </form>
            {/* <ul className="flex flex-wrap gap-x-4 gap-y-4">
              <li className="flex w-full gap-x-2">
                <div className="text-center w-35 bg-gray-300 h-8 flex direction-col items-center justify-center">
                  毛色
                </div>
                <div>
                  <fieldset className="flex flex-wrap gap-x-2 gap-y-2">
                    <label className="checkbox-label">
                      <input type="checkbox" name="checkbox-2" />
                      白系
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      黒系
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      茶系
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      グレー系
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      サビ
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      白茶
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      白黒
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      茶トラ
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      キジトラ
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      サバトラ
                    </label>
                    <label>
                      <input type="checkbox" name="checkbox-2" />
                      その他
                    </label>
                  </fieldset>
                </div>
              </li>
              <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-x-2">
                <div className="text-center w-35 bg-gray-300 h-8 flex direction-col items-center justify-center">
                  募集地域
                </div>
                <div>
                  <select name="prefecture" id="prefecture">
                    <option value="">選択してください</option>
                    <option value="hokkaido">北海道</option>
                    <option value="aomori">青森県</option>
                    <option value="iwate">岩手県</option>
                    <option value="miyagi">宮城県</option>
                    <option value="akita">秋田県</option>
                    <option value="yamagata">山形県</option>
                    <option value="fukushima">福島県</option>
                    <option value="ibaraki">茨城県</option>
                    <option value="tochigi">栃木県</option>
                    <option value="gunma">群馬県</option>
                    <option value="saitama">埼玉県</option>
                    <option value="chiba">千葉県</option>
                    <option value="tokyo">東京都</option>
                    <option value="kanagawa">神奈川県</option>
                    <option value="niigata">新潟県</option>
                    <option value="toyama">富山県</option>
                    <option value="ishikawa">石川県</option>
                    <option value="fukui">福井県</option>
                    <option value="yamanashi">山梨県</option>
                    <option value="nagano">長野県</option>
                    <option value="gifu">岐阜県</option>
                    <option value="shizuoka">静岡県</option>
                    <option value="aichi">愛知県</option>
                    <option value="mie">三重県</option>
                    <option value="shiga">滋賀県</option>
                    <option value="kyoto">京都府</option>
                    <option value="osaka">大阪府</option>
                    <option value="hyogo">兵庫県</option>
                    <option value="nara">奈良県</option>
                    <option value="wakayama">和歌山県</option>
                    <option value="tottori">鳥取県</option>
                    <option value="shimane">島根県</option>
                    <option value="okayama">岡山県</option>
                    <option value="hiroshima">広島県</option>
                    <option value="yamaguchi">山口県</option>
                    <option value="tokushima">徳島県</option>
                    <option value="kagawa">香川県</option>
                    <option value="ehime">愛媛県</option>
                    <option value="kochi">高知県</option>
                    <option value="fukuoka">福岡県</option>
                    <option value="saga">佐賀県</option>
                    <option value="nagasaki">長崎県</option>
                    <option value="kumamoto">熊本県</option>
                    <option value="oita">大分県</option>
                    <option value="miyazaki">宮崎県</option>
                    <option value="kagoshima">鹿児島県</option>
                    <option value="okinawa">沖縄県</option>
                  </select>
                </div>
              </li>
              <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-x-2">
                <div className="text-center w-35 bg-gray-300 h-8 flex direction-col items-center justify-center">
                  年齢
                </div>
                <div>
                  <select name="" id="">
                    <option value="">オス</option>
                    <option value="">メス</option>
                  </select>
                </div>
              </li>
              <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-x-2">
                <div className="text-center w-35 bg-gray-300 h-8 flex direction-col items-center justify-center">
                  避妊・去勢
                </div>
                <div>
                  <select name="" id="">
                    <option value="">済み</option>
                    <option value="">未</option>
                  </select>
                </div>
              </li>
              <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-x-2">
                <div className="text-center w-35 bg-gray-300 h-8 flex direction-col items-center justify-center">
                  その他条件
                </div>
                <div>
                  <select name="" id="">
                    <option value="">一人暮らし相談可</option>
                    <option value="">高齢者相談可</option>
                  </select>
                </div>
              </li>
              <li className="flex w-[calc((100%_-_2rem)_/_2)] gap-x-2">
                <div className="text-center w-35 bg-gray-300 h-8 flex direction-col items-center justify-center">
                  年齢
                </div>
                <div>
                  <select name="" id="">
                    <option value="">幼少期</option>
                    <option value="">若年期</option>
                    <option value="">高齢期</option>
                  </select>
                </div>
              </li>
            </ul> */}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="c-container">
          <div className="w-60 ml-auto">
            <Select
              name="sort"
              options={[
                { value: "desc", label: "登録が新しい順" },
                { value: "asc", label: "登録が古い順" },
                { value: "updated", label: "情報の更新順" },
              ]}
            />
          </div>
          <ul className="p-top__newcat-list flex flex-wrap gap-x-4 gap-y-4 mt-5">
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/top/newcat-list-img01.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    12ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">茶白</div>
                    <h3 className="text-center text-base">人懐っこい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img02.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    6ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジトラ</div>
                    <h3 className="text-center text-base">元気な女の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img03.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    3ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジ白</div>
                    <h3 className="text-center text-base">おとなしい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img04.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    シニア / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">サバトラ</div>
                    <h3 className="text-center text-base">
                      落ち着きのある男の子
                    </h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/top/newcat-list-img01.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    12ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">茶白</div>
                    <h3 className="text-center text-base">人懐っこい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img02.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    6ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジトラ</div>
                    <h3 className="text-center text-base">元気な女の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img03.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    3ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジ白</div>
                    <h3 className="text-center text-base">おとなしい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img04.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    シニア / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">サバトラ</div>
                    <h3 className="text-center text-base">
                      落ち着きのある男の子
                    </h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/top/newcat-list-img01.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    12ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">茶白</div>
                    <h3 className="text-center text-base">人懐っこい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img02.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    6ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジトラ</div>
                    <h3 className="text-center text-base">元気な女の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img03.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    3ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジ白</div>
                    <h3 className="text-center text-base">おとなしい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img04.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    シニア / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">サバトラ</div>
                    <h3 className="text-center text-base">
                      落ち着きのある男の子
                    </h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/top/newcat-list-img01.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    12ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">茶白</div>
                    <h3 className="text-center text-base">人懐っこい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img02.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    6ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジトラ</div>
                    <h3 className="text-center text-base">元気な女の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img03.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    3ヶ月 / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">キジ白</div>
                    <h3 className="text-center text-base">おとなしい男の子</h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
            <li className="w-[calc((100%_-_1rem*3)_/_4)]">
              <a
                className="relative block border border-gray-300 px-4 py-4 hover:bg-[#dfefff] transition duration-300 hover:border-[#dfefff]"
                href=""
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  <Image
                    src="/sample/newcat-list-img04.jpg"
                    alt="新着のねこちゃん画像"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col justify-center mt-5">
                  <div className="text-center text-sm">
                    ミックス ♂<br />
                    シニア / 関東
                  </div>
                  <div className="mt-5">
                    <div className="text-center text-sm">サバトラ</div>
                    <h3 className="text-center text-base">
                      落ち着きのある男の子
                    </h3>
                  </div>
                  <button className="block py-2 px-5 rounded-full bg-[#4a90e2] text-white text-sm mt-5 cursor-pointer">
                    お気に入り❤︎
                  </button>
                </div>
              </a>
            </li>
          </ul>

          <div className="table ml-auto mr-auto mt-15">
            <ol className="flex justify-center items-center gap-x-3">
              <li className="w-10 h-20">
                <a
                  className="flex direction-col justify-center items-center arrow prev-arrow w-full h-full"
                  href=""
                >
                  <Image
                    src="/common/icon-prev-arrow.svg"
                    alt=""
                    width={20}
                    height={15}
                  />
                </a>
              </li>
              <li className="current border w-10 h-10 flex direction-col justify-center items-center">
                1
              </li>
              <li className="w-10 h-10">
                <a
                  className="flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  2
                </a>
              </li>
              <li className="w-10 h-10">
                <a
                  className="flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  3
                </a>
              </li>
              <li className="w-10 h-10">
                <a
                  className="flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  4
                </a>
              </li>
              <li className="w-10 h-10">
                <a
                  className="flex direction-col justify-center items-center w-10 h-10 bg-gray-300"
                  href=""
                >
                  5
                </a>
              </li>
              <li className="w-10 h-10">
                <a
                  className="flex direction-col justify-center items-center arrow next-arrow w-10 h-10"
                  href=""
                >
                  <Image
                    src="/common/icon-next-arrow.svg"
                    alt=""
                    width={20}
                    height={15}
                  />
                </a>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
