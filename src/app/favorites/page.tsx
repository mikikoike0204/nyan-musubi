import Image from "next/image";

export default function Favorites() {
  return (
    <main className="mt-5">
      <section>
        <div className="c-container">
          <div className="relative h-70 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/favorites/bg-mv.jpg')" }}
            ></div>

            <div className="absolute inset-0 bg-black/50"></div>
            <h1 className="relative text-white text-4xl font-bold tracking-wider text-center">
              お気に入りのねこちゃん
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-15">
        <div className="c-container">
          <ul className="p-top__newcat-list flex flex-wrap gap-x-4 gap-y-4">
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
            <a
              href="/"
              className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-10 font-medium border"
            >
              <span>TOPページに戻る</span>
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
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
