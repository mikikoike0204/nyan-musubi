// components/Footer/Footer.tsx
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="c-container">
        <p className={styles.copyright}>
          &copy; Nyan-musubi All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
