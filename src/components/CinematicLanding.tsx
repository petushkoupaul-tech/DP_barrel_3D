"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type RefObject } from "react";

const navigation = [
  ["О проекте", "#philosophy"],
  ["Галерея", "#gallery"],
  ["Мастерская", "#workshop"],
  ["Выдержка", "#aging"],
  ["Использование", "#use"],
] as const;

const sparkColors = ["#D49B5B", "#B87333", "#E58A2B"];

function WorkshopSparks({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !section || !context) return;

    type Spark = {
      x: number;
      y: number;
      radius: number;
      speed: number;
      phase: number;
      color: string;
      glow: boolean;
    };

    let width = 0;
    let height = 0;
    let particles: Spark[] = [];
    let frameId = 0;
    let isVisible = false;
    let lastTime = 0;

    const random = (min: number, max: number) => min + Math.random() * (max - min);
    const makeSpark = (y = random(0, height)) => ({
      x: random(0, width),
      y,
      radius: random(1, 2.2),
      speed: random(0.3, 0.85),
      phase: random(0, Math.PI * 2),
      color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
      glow: Math.random() < 0.3,
    });

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = window.innerWidth >= 1024 ? 42 : 19;
      particles = Array.from({ length: count }, () => makeSpark());
    };

    const draw = (time: number) => {
      frameId = window.requestAnimationFrame(draw);
      if (lastTime === 0) lastTime = time;
      const frameScale = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      context.clearRect(0, 0, width, height);

      for (const spark of particles) {
        spark.y -= spark.speed * frameScale;
        spark.x += Math.sin(time * 0.001 + spark.phase) * 0.35 * frameScale;
        if (spark.y < -10) {
          spark.x = random(0, width);
          spark.y = height + 10;
          spark.speed = random(0.3, 0.85);
          spark.phase = random(0, Math.PI * 2);
        }

        context.globalAlpha = 0.45 + Math.sin(time * 0.0015 + spark.phase) * 0.3;
        context.fillStyle = spark.color;
        context.shadowBlur = spark.glow ? 5 : 0;
        context.shadowColor = spark.glow ? "#D49B5B" : "transparent";
        context.beginPath();
        context.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    };

    const start = () => {
      if (!isVisible || frameId) return;
      lastTime = 0;
      frameId = window.requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    observer.observe(section);
    const handleResize = () => {
      resize();
      if (isVisible) {
        stop();
        start();
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      context.clearRect(0, 0, width, height);
    };
  }, [sectionRef]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-transparent" aria-hidden="true" />;
}

export default function CinematicLanding() {
  const storyRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const cardScale = useMotionValue(1);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const springScale = useSpring(cardScale, { stiffness: 150, damping: 20 });
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.28], [0, -30]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.23, 0.83]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const updateTilt = () => setTiltEnabled(media.matches);
    updateTilt();
    media.addEventListener("change", updateTilt);
    return () => media.removeEventListener("change", updateTilt);
  }, []);

  const handleCardMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const normalizedY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    tiltX.set(-normalizedY * 5);
    tiltY.set(normalizedX * 5);
  };

  const resetCardTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    cardScale.set(1);
  };

  const scrollToPhilosophy = () => {
    const section = document.getElementById("philosophy");
    if (section) {
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
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
        ref={philosophyRef}
        id="philosophy"
        className="philosophy pointer-events-none scroll-mt-20 lg:scroll-mt-24"
        aria-labelledby="philosophy-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="philosophy__surface" aria-hidden="true" />
        <WorkshopSparks sectionRef={philosophyRef} />
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

          <div className="philosophy__image-reveal relative select-none" style={{ perspective: 1000 }}>
            <div className="group relative isolate select-none">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-tr from-[#B87333]/15 via-[#D49B5B]/10 to-transparent opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#B87333]/20 transition-colors duration-500 group-hover:border-[#D49B5B]/40 lg:rounded-3xl"
                style={{ rotateX: springX, rotateY: springY, scale: springScale, transformStyle: "preserve-3d" }}
                onMouseMove={tiltEnabled ? handleCardMouseMove : undefined}
                onMouseEnter={tiltEnabled ? () => cardScale.set(1.015) : undefined}
                onMouseLeave={tiltEnabled ? resetCardTilt : undefined}
              >
                <Image
                  src="/media/philosophy/2.png"
                  alt="Дубовая бочка на резной подставке с гравированной кружкой"
                  fill
                  sizes="(max-width: 767px) 90vw, 42vw"
                  quality={90}
                  className="object-cover brightness-100 contrast-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/20 lg:rounded-3xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#141311]/60 via-[#141311]/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
