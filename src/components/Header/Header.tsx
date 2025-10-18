"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  // 初期ロード時にユーザー取得
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // 状態変化（ログイン / ログアウト）を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeMenu();
  };

  // メニューの開閉
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // メニューを閉じる
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // メニューが開いている時、bodyのスクロールを防止
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

  // Escapeキーで閉じる
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
          {/* ロゴ */}
          <h1>
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
          </h1>

          {/* ナビゲーション（PC用） */}
          <nav className={styles.nav}>
            <div className={styles.navInner}>
              <ul className={styles.navLinks}>
                <li>
                  <Link className={styles.navItem} href="/">
                    トップ
                  </Link>
                </li>
                <li>
                  <Link className={styles.navItem} href="/cats">
                    ねこちゃん一覧
                  </Link>
                </li>
                <li>
                  <Link className={styles.navItem} href="/cats/new">
                    新規投稿作成
                  </Link>
                </li>
                {user && (
                  <>
                    <li>
                      <Link className={styles.navItem} href="/favorites">
                        お気に入り
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.navItem} href="/mypage">
                        マイページ
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* 認証リンク */}
              <ul className={styles.authLinks}>
                {user ? (
                  <li>
                    <button
                      className={`${styles.authItem} ${styles.authItemLogin}`}
                      onClick={handleLogout}
                    >
                      ログアウト
                    </button>
                  </li>
                ) : (
                  <>
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
                  </>
                )}
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

      {/* オーバーレイ */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* スマホメニュー */}
      <nav
        className={`${styles.spMenu} ${isMenuOpen ? styles.open : ""}`}
        aria-label="メインメニュー"
      >
        {/* 閉じるボタン */}
        <button
          className={styles.spMenuClose}
          onClick={closeMenu}
          aria-label="メニューを閉じる"
        >
          ✕
        </button>

        <ul className={styles.spMenuList}>
          <li className={styles.spMenuItem}>
            <Link href="/" onClick={closeMenu}>
              トップ
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/cats" onClick={closeMenu}>
              ねこちゃん一覧
            </Link>
          </li>
          <li className={styles.spMenuItem}>
            <Link href="/cats/new" onClick={closeMenu}>
              新規投稿作成
            </Link>
          </li>
          {user && (
            <>
              <li className={styles.spMenuItem}>
                <Link href="/favorites" onClick={closeMenu}>
                  お気に入り
                </Link>
              </li>
              <li className={styles.spMenuItem}>
                <Link href="/mypage" onClick={closeMenu}>
                  マイページ
                </Link>
              </li>
            </>
          )}
          <li className={styles.spMenuDivider}></li>
          {user ? (
            <li className={styles.spMenuItem}>
              <button className={styles.spMenuLogout} onClick={handleLogout}>
                ログアウト
              </button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
