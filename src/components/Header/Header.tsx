"use client";

import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState<any>(null);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className="c-container">
        <div className={styles.headerInner}>
          <h1>
            <Link className={styles.headerLogoLink} href="/">
              <Image
                src="/common/logo.png"
                alt="にゃん結び"
                width={75}
                height={75}
              />
            </Link>
          </h1>
          <nav className={styles.nav}>
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
              {user ? (
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
              ) : (
                ""
              )}
            </ul>
            <ul className={styles.authLinks}>
              {user ? (
                <>
                  <li>
                    <button
                      className={`${styles.authItem} ${styles.authItemLogin}`}
                      onClick={handleLogout}
                    >
                      ログアウト
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className={`${styles.authItem} ${styles.authItemSignup}`}
                      href="/signup"
                    >
                      新規登録
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${styles.authItem} ${styles.authItemLogin}`}
                      href="/login"
                    >
                      ログイン
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
