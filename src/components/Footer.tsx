import styles from "./Footer.module.css";

const navigation = [
  { label: "Коллекция", href: "#gallery" },
  { label: "Детали", href: "#gallery" },
  { label: "Мастерская", href: "#workshop" },
  { label: "Процесс", href: "#aging" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/dp_barrels" },
  { label: "TikTok", href: "https://www.tiktok.com/@dp__barrels" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a className={styles.brandName} href="#top">DP Barrel &amp; Spirit</a>
          <p className={styles.tagline}>Crafted by Nature. Aged by Time.</p>
        </div>

        <div className={styles.linksArea}>
          <nav className={styles.navigation} aria-label="Навигация в футере">
            <p className={styles.heading}>Навигация</p>
            <ul>
              {navigation.map(({ label, href }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <p className={styles.heading}>Наши медиа</p>
            <ul className={styles.socials}>
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {year} DP Barrel &amp; Spirit</p>
      </div>
    </footer>
  );
}
