"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className="c-container">
        <div className={styles.headerInner}>
          <Link href="/" className={styles.headerLogoLink}>
            <Image
              src="/common/logo.png"
              alt="にゃん結び"
              width={75}
              height={75}
              className={styles.headerLogoImg}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <div className={styles.navInner}>
              <ul className={styles.navLinks}>
                <li className={styles.navItem}>
                  <Link href="/cats">ねこを探す</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/adopted">家族が決まったねこ</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/favorites">お気に入り</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/new">投稿する</Link>
                </li>
              </ul>

              {/* 認証リンク */}
              <ul className={styles.authLinks}>
                <li>
                  <Link
                    href="/signup"
                    className={`${styles.authItem} ${styles.authItemSignup}`}
                  >
                    新規登録
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className={`${styles.authItem} ${styles.authItemLogin}`}
                  >
                    ログイン
                  </Link>
                </li>
              </ul>
            </div>

            {/* ハンバーガーアイコン */}
            <button
              className={styles.hamIconBox}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={isMenuOpen}
            >
              <div
                className={`${styles.hamIconInner} ${
                  isMenuOpen ? styles.active : ""
                }`}
              >
                <span className={styles.hamIconBar}></span>
                <span className={styles.hamIconBar}></span>
                <span className={styles.hamIconBar}></span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className={`${styles.spMenu} ${isMenuOpen ? styles.open : ""}`}
        aria-label="メインメニュー"
      >
        <button
          className={styles.spMenuClose}
          onClick={closeMenu}
          aria-label="メニューを閉じる"
        >
          ✕
        </button>

        <ul className={styles.spMenuList}>
          <li className={styles.spMenuItem}>
            <Link href="/cats" onClick={closeMenu}>
              ねこを探す
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/adopted" onClick={closeMenu}>
              家族が決まったねこ
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/favorites" onClick={closeMenu}>
              お気に入り
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/new" onClick={closeMenu}>
              投稿する
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/mypage" onClick={closeMenu}>
              マイページ
            </Link>
          </li>
          <li className={styles.spMenuDivider}></li>
          <li className={styles.spMenuItem}>
            <Link href="/signup" onClick={closeMenu}>
              新規登録
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/login" onClick={closeMenu}>
              ログイン
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
