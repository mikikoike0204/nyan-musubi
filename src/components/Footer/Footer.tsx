// components/Footer/Footer.tsx
import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="c-container">
        <Link className="privacy-link" href="">
          個人情報保護方針
        </Link>
        <p className="copyright">&copy; Nyan-musubi All Rights Reserved.</p>
      </div>
    </footer>
  );
}
