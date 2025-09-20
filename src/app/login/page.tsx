"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Supabase Auth でログイン
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("ログインエラー: " + error.message);
      setLoading(false);
      return;
    }

    // ログイン成功 → プロフィール取得
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        alert("プロフィール取得エラー: " + profileError.message);
      } else {
        alert(`ログイン成功！ようこそ ${profile.name} さん`);
        router.push("/"); // ログイン後に遷移
      }
    }

    setLoading(false);
  };


  return (
    <div className="c-section-wrapper">
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/login/bg-mv.jpg')" }}
            ></div>
            <div className="p-sub-mv__bg"></div>
            <h1 className="p-sub-mv__title">ログイン</h1>
          </div>
        </div>
      </section>

      <section className="c-section p-login">
        <div className="c-container">
          <div className="p-login__content">
            {/* <h2 className="p-login__head">ログイン情報入力</h2> */}
            <form className="p-login__form" onSubmit={handleSubmit}>
              <div className="p-login__item">
                <div className="p-login__item-head">メールアドレス</div>
                <div className="p-login__item-desc">
                  <input
                    className="p-login__item-desc-input"
                    type="email"
                    placeholder="入力"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="p-login__item">
                <div className="p-login__item-head">パスワード</div>
                <div className="p-login__item-desc">
                  <input
                    className="p-login__item-desc-input"
                    type="password"
                    placeholder="入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Link className="p-login__link" href="">
                ログインメールアドレス・パスワードをお忘れの方
              </Link>
              <div className="p-login__btn">
                <button className="c-common-btn" type="submit">
                  {loading ? "ログイン中..." : "ログインする"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
