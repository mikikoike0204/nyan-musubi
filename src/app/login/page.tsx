"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

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

      <section className={`c-section {styles.login}`}>
        <div className="c-container">
          <div className={styles.loginContent}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div className={styles.loginItem}>
                <div className={styles.loginItemHead}>メールアドレス</div>
                <div className={styles.loginItemDesc}>
                  <input
                    className={styles.loginItemDescInput}
                    type="email"
                    placeholder="入力"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.loginItem}>
                <div className={styles.loginItemHead}>パスワード</div>
                <div className={styles.loginItemDesc}>
                  <input
                    className={styles.loginItemDescInput}
                    type="password"
                    placeholder="入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Link className={styles.loginLink} href="/signup">
                新規登録の方はこちら
              </Link>
              <div className={styles.loginBtn}>
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
