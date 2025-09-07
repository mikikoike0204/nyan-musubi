import "./Header.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="c-header">
      <div className="c-container">
        <div className="c-header__inner">
          <h1>
            <Link className="c-header__logo-link" href="/">
              <Image
                src="/common/logo.png"
                alt="にゃん結び"
                width={75}
                height={75}
              />
            </Link>
          </h1>
          <nav className="c-nav">
            <ul className="c-nav__links">
              <li>
                <Link className="c-nav__item" href="/">
                  トップ
                </Link>
              </li>
              <li>
                <Link className="c-nav__item" href="/cats">
                  ねこちゃん一覧
                </Link>
              </li>
              <li>
                <Link className="c-nav__item" href="/favorites">
                  お気に入り
                </Link>
              </li>
            </ul>
            <ul className="c-auth__links">
              <li>
                <Link className="c-auth__item signup" href="/signup">
                  新規登録
                </Link>
              </li>
              <li>
                <Link className="c-auth__item login" href="/login">
                  ログイン
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
