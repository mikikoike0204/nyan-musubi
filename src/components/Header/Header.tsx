"use client";

import "./Header.css";
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
                <Link className="c-nav__item" href="/cats/new">
                  新規投稿作成
                </Link>
              </li>
              {user ? (
                <li>
                  <Link className="c-nav__item" href="/favorites">
                    お気に入り
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {/* ログイン状態で出し分け */}
            <ul className="c-auth__links">
              {user ? (
                <>
                  <li>
                    <button
                      className="c-auth__item login"
                      onClick={handleLogout}
                    >
                      ログアウト
                    </button>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
