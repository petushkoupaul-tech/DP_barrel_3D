const navigation = [
  ["О проекте", "#about"],
  ["Галерея", "#gallery"],
  ["Мастерская", "#workshop"],
  ["Выдержка", "#aging"],
  ["Использование", "#use"],
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/медиа/hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__shade" aria-hidden="true" />

        <header className="site-header">
          <a className="brand" href="#top" aria-label="DP Barrel & Spirit — наверх">
            <span className="brand__mark flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 border-[#B87333] text-[27px] text-[#B87333]">DP</span>
            <span className="brand__name">BARREL <i>&</i> SPIRIT</span>
          </a>
          <nav className="navigation" aria-label="Основная навигация">
            {navigation.map(([label, href]) => (
              <a key={label} href={href}>{label}</a>
            ))}
          </nav>
          <a className="header-contact" href="#contacts">Связаться <span aria-hidden="true">↗</span></a>
          <a className="mobile-contact" href="#contacts" aria-label="Связаться">↗</a>
        </header>

        <div className="hero__content" id="top">
          <p className="eyebrow"><span /> Мастерская бондарного ремесла</p>
          <h1 id="hero-title">DP Barrel<br /><em>&amp; Spirit</em></h1>
          <p className="hero__tagline mt-9 text-xl text-[#D1CBC0]">Crafted by Nature. Aged by Time.</p>
          <p className="hero__description">
            Ремесленные деревянные бочки, созданные с вниманием<br className="desktop-break" /> к материалу, деталям и качеству.
          </p>
        </div>
      </section>
    </main>
  );
}
