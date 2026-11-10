"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/dp_barrels", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@dp__barrels", icon: "tiktok" },
] as const;

function SocialIcon({ name }: { name: "instagram" | "tiktok" }) {
  if (name === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.4 3h3.1c.2 1.8 1.2 3.4 3 4.1v3.2a9.1 9.1 0 0 1-5.9-2v7.1a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.3a2.9 2.9 0 1 0 1.7 2.7V3h3z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToHero = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    window.history.replaceState(null, "", "#top");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a className={styles.brandName} href="#top">DP Barrel &amp; Spirit</a>
          <p className={styles.tagline}>Crafted by Nature. Aged by Time.</p>
        </div>

        <div className={styles.emblem}>
          <Image
            src="/media/footer/dp-emblem.png"
            alt="Эмблема DP с головой бизона"
            width={1536}
            height={1024}
            sizes="(max-width: 767px) 180px, (max-width: 1100px) 220px, 260px"
            className={styles.emblemImage}
          />
        </div>

        <div className={styles.socials} aria-label="Социальные сети">
          {socialLinks.map(({ label, href, icon }) => (
            <a key={label} className={styles.socialLink} href={href} target="_blank" rel="noopener noreferrer">
              <SocialIcon name={icon} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <a className={styles.backToTop} href="#top" onClick={scrollToHero}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M12 20V4M5.5 10.5 12 4l6.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>В начало</span>
        </a>
      </div>

      <div className={styles.bottom}>
        <p>© {year} DP Barrel &amp; Spirit</p>
      </div>
    </footer>
  );
}
