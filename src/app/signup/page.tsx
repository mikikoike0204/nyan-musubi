"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // ← 作成済みの Supabase client を import
import "./style.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("メールアドレスが一致しません");
      return;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    setLoading(true);

    // ① Supabase Auth でユーザー作成
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert("登録エラー: " + error.message);
      return;
    }

    // ② profiles テーブルにユーザー情報を追加
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id, // Auth の UUID
            name: email.split("@")[0], // 仮にメールの前半を名前に
          },
        ]);

      if (profileError) {
        setLoading(false);
        alert("プロフィール登録エラー: " + profileError.message);
        return;
      }
    }

    setLoading(false);
    alert("登録完了！メールを確認してください。");
  };

  return (
    <div className="c-section-wrapper">
      <section className="p-sub-mv">
        <div className="c-container">
          <div className="p-sub-mv__content">
            <div
              className="p-sub-mv__image"
              style={{ backgroundImage: "url('/signup/bg-mv.jpg')" }}
            ></div>
            <div className="p-sub-mv__bg"></div>
            <h1 className="p-sub-mv__title">新規会員登録</h1>
          </div>
        </div>
      </section>

      <section className="c-section p-login">
        <div className="c-container">
          <div className="p-login__content">
            {/* <h2 className="p-login__head">新規会員登録</h2> */}
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
                <div className="p-login__item-head">
                  メールアドレス（確認用）
                </div>
                <div className="p-login__item-desc">
                  <input
                    className="p-login__item-desc-input"
                    type="email"
                    placeholder="入力"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
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
              <div className="p-login__item">
                <div className="p-login__item-head">パスワード（確認用）</div>
                <div className="p-login__item-desc">
                  <input
                    className="p-login__item-desc-input"
                    type="password"
                    placeholder="入力"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="p-login__btn">
                <button className="c-common-btn" type="submit" disabled={loading}>
                  {loading ? "登録中..." : "登録する"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
