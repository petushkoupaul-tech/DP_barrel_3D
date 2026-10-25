"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const navigation = [
  ["О проекте", "#about"],
  ["Галерея", "#gallery"],
  ["Мастерская", "#workshop"],
  ["Выдержка", "#aging"],
  ["Использование", "#use"],
] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
} satisfies Variants;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const embers = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  tone: index % 3,
  style: {
    left: `${3 + ((index * 17) % 94)}%`,
    bottom: `${4 + ((index * 11) % 82)}%`,
    width: `${1 + ((index * 7) % 16) / 10}px`,
    height: `${1 + ((index * 7) % 16) / 10}px`,
    animationDuration: `${11 + ((index * 5) % 10)}s`,
    animationDelay: `-${(index * 1.7) % 14}s`,
  },
}));

export default function CinematicLanding() {
  const storyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.28], [0, -30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.23, 0.83]);

  return (
    <main ref={storyRef} className="cinematic-story">
      <section className="hero hero--sticky" aria-labelledby="hero-title">
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
        <motion.div className="hero__global-shade" style={{ opacity: reduceMotion ? 0.23 : overlayOpacity }} aria-hidden="true" />
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

        <motion.div
          className="hero__content hero__content-scroll"
          id="top"
          style={{ opacity: reduceMotion ? 1 : copyOpacity, y: reduceMotion ? 0 : copyY }}
        >
          <div className="hero__copy-reveal">
            <p className="eyebrow"><span /> Мастерская бондарного ремесла</p>
            <h1 id="hero-title">DP Barrel<br /><em>&amp; Spirit</em></h1>
            <p className="hero__tagline mt-9 text-xl text-[#D1CBC0]">Crafted by Nature. Aged by Time.</p>
            <p className="hero__description">
              Ремесленные деревянные бочки, созданные с вниманием<br className="desktop-break" /> к материалу, деталям и качеству.
            </p>
          </div>
        </motion.div>
      </section>

      <motion.section
        id="about"
        className="philosophy"
        aria-labelledby="philosophy-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        <div className="philosophy__surface" aria-hidden="true" />
        <div
          className="philosophy__curtain pointer-events-none absolute inset-x-0 top-48 -mt-48 h-64 bg-gradient-to-b from-transparent via-[#141311]/75 to-[#141311]"
          aria-hidden="true"
        />
        <div className="philosophy__embers pointer-events-none" aria-hidden="true">
          {embers.map(({ id, tone, style }) => (
            <span key={id} className={`ember ember--${tone}`} style={style} />
          ))}
        </div>

        <div className="philosophy__inner">
          <motion.div className="philosophy__copy" variants={stagger}>
            <motion.h2 id="philosophy-title" className="philosophy__title philosophy__reveal" variants={reveal}>
              Философия
            </motion.h2>
            <motion.blockquote className="philosophy__quote philosophy__reveal" variants={reveal}>
              «Качество — это делать всё правильно, даже когда никто не смотрит». — Генри Форд
            </motion.blockquote>
            <motion.div className="philosophy__body philosophy__reveal" variants={reveal}>
              <p>
                DP Barrel &amp; Spirit — ремесленное производство бочек из благородных пород дерева. Каждое изделие создаётся вручную: от выбора древесины до финальной отделки, гравировки и сборки.
              </p>
              <p>
                Мы работаем с натуральными и экологически чистыми материалами, сохраняя живую текстуру дерева и индивидуальность каждой формы. На любой вкус, задачу и стиль — с неизменным вниманием к качеству и деталям.
              </p>
            </motion.div>
          </motion.div>

          <motion.div className="philosophy__image-reveal philosophy__reveal" variants={reveal}>
            <div className="philosophy__image-frame group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#B87333]/20 transition-[border-color,box-shadow] duration-700 ease-out group-hover:border-[#D49B5B]/50 group-hover:shadow-[0_0_40px_-10px_rgba(184,115,51,0.25)]">
              <Image
                src="/media/philosophy/2.png"
                alt="Натуральная древесина и детали мастерской DP Barrel & Spirit"
                fill
                sizes="(max-width: 767px) 90vw, 42vw"
                quality={90}
                className="object-cover brightness-[0.88] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#141311] via-[#141311]/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 z-20 bg-[#141311] opacity-30 transition-opacity duration-700 ease-out group-hover:opacity-10" />
              <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,19,17,0.58)_100%)]" />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
