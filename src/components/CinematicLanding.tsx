"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const navigation = [
  ["О проекте", "#philosophy"],
  ["Галерея", "#gallery"],
  ["Мастерская", "#workshop"],
  ["Выдержка", "#aging"],
  ["Использование", "#use"],
] as const;

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
  const scrollToPhilosophy = () => {
    document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main ref={storyRef} className="cinematic-story">
      <section className="hero hero--sticky" aria-labelledby="hero-title">
        <video
          className="hero__video brightness-[1.03]"
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

        <button
          type="button"
          onClick={scrollToPhilosophy}
          aria-label="Листать к философии"
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer group pointer-events-auto select-none px-5 py-2"
        >
          <span className="text-[11px] font-sans tracking-[0.25em] text-[#EDE8DF] group-hover:text-[#D49B5B] transition-colors duration-300">
            ЛИСТАТЬ
          </span>
          <span aria-hidden="true" className="w-[1.5px] h-7 bg-gradient-to-b from-[#D49B5B] via-[#B87333]/80 to-transparent group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </section>

      <motion.section
        id="philosophy"
        className="philosophy pointer-events-none scroll-mt-20 lg:scroll-mt-24"
        aria-labelledby="philosophy-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="philosophy__surface" aria-hidden="true" />
        <div className="philosophy__embers pointer-events-none absolute inset-0 z-0 overflow-hidden bg-transparent" aria-hidden="true">
          {embers.map(({ id, tone, style }) => (
            <span key={id} className={`ember ember--${tone}`} style={style} />
          ))}
        </div>
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-36 bg-gradient-to-b from-transparent via-[#141311]/75 to-[#141311] lg:h-48" aria-hidden="true" />

        <div className="philosophy__inner pointer-events-auto relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="philosophy__copy -mt-8">
            <h2 id="philosophy-title" className="mb-8 bg-gradient-to-r from-[#EDE8DF] via-[#D49B5B] to-[#B87333] bg-clip-text font-serif text-4xl font-medium leading-tight text-transparent drop-shadow-[0_2px_12px_rgba(212,155,91,0.25)] lg:mb-10 lg:text-[48px]">
              Философия
            </h2>
            <blockquote className="my-8 border-l-2 border-[#B87333] pl-5 font-serif text-2xl italic leading-snug text-[#EDE8DF]/95 lg:text-[26px]">
              «Качество — это делать всё правильно, даже когда никто не смотрит». — Генри Форд
            </blockquote>
            <div className="space-y-5 font-sans text-base leading-relaxed text-[#D1CBC0] lg:text-[19px]">
              <p>
                DP Barrel &amp; Spirit — ремесленное производство бочек из благородных пород дерева. Каждое изделие создаётся вручную: от выбора древесины до финальной отделки, гравировки и сборки.
              </p>
              <p>
                Мы работаем с натуральными и экологически чистыми материалами, сохраняя живую текстуру дерева и индивидуальность каждой формы. На любой вкус, задачу и стиль — с неизменным вниманием к качеству и деталям.
              </p>
            </div>
          </div>

          <div className="philosophy__image-reveal">
            <div className="philosophy__image-frame group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#B87333]/20 transition-[border-color,box-shadow] duration-700 ease-out group-hover:border-[#D49B5B]/50 group-hover:shadow-[0_0_40px_-10px_rgba(184,115,51,0.25)]">
              <Image
                src="/media/philosophy/2.png"
                alt="Дубовая бочка на резной подставке с гравированной кружкой"
                fill
                sizes="(max-width: 767px) 90vw, 42vw"
                quality={90}
                className="object-cover brightness-100 contrast-[1.02] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[15%] bg-gradient-to-t from-[#141311]/25 to-transparent" />
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
