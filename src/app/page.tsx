"use client";

import TopSlider from "@/components/TopSlider/TopSlider";
import Link from "next/link";
import styles from "./page.module.css";
import CatList from "@/components/CatList/CatList";

export default function Home() {
  return (
    <div className="c-section-wrapper">
      <section className="c-section p-top-mv">
        <div className="c-container">
          <TopSlider />
          <div className={styles.topMvDesc}>
            <p className={styles.topMvText}>
              ねこを飼った事がないけれど、
              <br />
              困っている子を家族としてお迎えしたい。
            </p>
            <p className={styles.topMvText}>
              ねこについて詳しくないけど、
              <br />
              ねこを保護したので家族になってくれる人を探したい。
            </p>
            <p className={styles.topMvText}>
              そんな優しい人たちの間で、
              <br className="forSP" />
              にゃんこのご縁を結びたい。
              <br />
              そう思って出来たサイト「にゃん結び」です。
            </p>
          </div>
        </div>
      </section>

      <section className={`c-section ${styles.topNewCat}`}>
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">新着のねこちゃん</h2>
          </div>
          <CatList limit={8} showAdopted={false} />
          <div className="p-top-newcat__more">
            <Link href="/cats" className="c-common-btn">
              もっと見る
            </Link>
          </div>
        </div>
      </section>

      <section className="c-section">
        <div className="c-container">
          <div className="c-section-title-wrap">
            <h2 className="c-section-title">家族が決定したねこちゃん</h2>
          </div>
          <CatList limit={4} showAdopted={true} />
          <div className="p-top-newcat__more">
            <Link href="/adopted" className="c-common-btn">
              もっと見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
