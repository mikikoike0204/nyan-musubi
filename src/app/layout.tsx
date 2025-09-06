// src/app/layout.tsx
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "にゃん結び",
  description: "保護猫 × 里親マッチングサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="shadow-md">
          <div className="c-container">
            <div className="flex justify-between items-center pt-1 pb-1">
              <h1>
                <a className="c-button-opacity" href="/">
                  <Image
                    src="/common/logo.png"
                    alt="にゃん結び"
                    width={75}
                    height={75}
                  />
                </a>
              </h1>
              <nav className="flex items-center">
                <ul className="flex gap-x-3 items-center">
                  <li>
                    <a className="text-sm c-button-opacity" href="/">
                      トップ
                    </a>
                  </li>
                  <li>
                    <a className="text-sm c-button-opacity" href="/cats">
                      ねこちゃん一覧
                    </a>
                  </li>
                  <li>
                    <a className="text-sm c-button-opacity" href="/favorites">
                      お気に入り
                    </a>
                  </li>
                </ul>
                <ul className="flex ml-2 gap-x-2">
                  <li>
                    <a
                      className="block py-1 px-5 rounded-2xl bg-[#4a90e2] text-white text-sm c-button-opacity"
                      href="/signup"
                    >
                      新規登録
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-1 px-5 rounded-2xl bg-gray-300 text-sm c-button-opacity"
                      href="/login"
                    >
                      ログイン
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="c-footer mt-30 text-xs py-5 bg-gray-100">
          <div className="c-container">
            <a className="table ml-auto mr-auto text-center" href="">
              個人情報保護方針
            </a>
            <p className="text-center text-xs mt-2">
              &copy; Nyan-musubi All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
