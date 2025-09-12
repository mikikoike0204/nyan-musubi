import Link from "next/link";
import "./style.css";

export default function Login() {
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
            <form className="p-login__form" action="">
              <div className="p-login__item">
                <div className="p-login__item-head">メールアドレス</div>
                <div className="p-login__item-desc">
                  <input
                    className="p-login__item-desc-input"
                    type="email"
                    placeholder="入力"
                  />
                </div>
              </div>
              <div className="p-login__item">
                <div className="p-login__item-head">メールアドレス（確認用）</div>
                <div className="p-login__item-desc">
                  <input
                    className="p-login__item-desc-input"
                    type="email"
                    placeholder="入力"
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
                  />
                </div>
              </div>
              <div className="p-login__btn">
                <button className="c-common-btn" type="submit">
                  登録する
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
