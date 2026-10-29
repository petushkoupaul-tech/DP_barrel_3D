"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

const products = [
  ["10f00cd4-13f7-49a5-b02a-77f68b3a2dce.png", "Изделие из дуба с авторской отделкой"],
  ["15e383bb-c154-4bcb-8c67-64f44df8a54d.png", "Деревянная бочка ручной работы"],
  ["2562e493-997b-4787-82b6-9f7456fe2620.png", "Бочка из натурального дерева"],
  ["5114b837-5976-450f-a16e-a303c8a8cb81.png", "Бочка с металлическим краном"],
  ["6e344030-2a4f-49dd-8d21-d19f41252d9b.png", "Детали деревянного изделия"],
  ["83d15055-0261-436d-9974-c54b3be63611.png", "Дубовый бочонок с отделкой"],
  ["8627ceab-1923-40da-bdbc-654054c22062.png", "Бочка с выразительной текстурой дерева"],
  ["8b634e12-3d9f-4dfd-8df8-747d7995505b.png", "Авторская бочка ручной работы"],
  ["8e1d6411-486b-47d2-8ce8-8957ae7c6c2e.png", "Деревянная бочка с металлическими деталями"],
  ["Бочонок мастера_ ремесленный виски.png", "Бочонок мастера для ремесленного виски"],
  ["Декоративная дубовая бочка для виски.png", "Декоративная дубовая бочка для виски"],
  ["Премиальная дубовая бочка с краном.png", "Дубовая бочка с краном"],
  ["Резная дубовая бочка с латунным краном.png", "Резная дубовая бочка с латунным краном"],
  ["Роскошный дубовый бочонок с латунным краном.png", "Дубовый бочонок с латунным краном"],
  ["Рустикальная бочка с латунным краном и стопками.png", "Бочка с латунным краном и стопками"],
  ["b364317c-5955-481e-a255-a4706cf681ab.png", "Фактура и отделка деревянного изделия"],
  ["d362fd32-dbb9-4cba-b4b7-375dbf42e719.png", "Детали бочки ручной работы"],
] as const;

const specifications = [
  { label: "Материалы", text: "Дуб, ясень, акация, а также их авторские комбинации: акация/ясень, дуб/ясень, акация/дуб/ясень." },
  { label: "Форма и геометрия", text: "Испанская форма Sherry Butt — вытянутая с удлинённой клёпкой; классическая форма («русский» стиль) и индивидуальные комбинации по запросу." },
  { label: "Объёмы и детали", text: "От 2 до 70 литров. Краны и металлические элементы из пищевой нержавеющей стали." },
];

const detailPhotos = [
  ["2bfa069a-a23a-4e8e-92d3-ac241496c211.png", "Латунный кран и гравировка на дубовой бочке"],
  ["1157d3f8-6ab9-463e-a34d-86faf9410282.png", "Детали резных деревянных изделий"],
  ["5b848571-08cd-4a23-9560-a08e6f347cac.png", "Клеймо на древесине и металлические обручи"],
  ["9d583cd1-83fe-4899-a828-61e2a67fd6de.png", "Текстура и обручи бочки на подставке"],
  ["f1f40381-64d5-469e-97ba-b6ef42bc1579.png", "Гравированное донце и подставка бочки"],
  ["fd1b69c6-6ba6-4b29-906c-1497911a89e9.png", "Дубовая бочка с латунным краном"],
] as const;

export default function CollectionSection() {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<"gallery" | "details">("gallery");
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxOpener = useRef<HTMLElement | null>(null);
  const drag = useRef<{ pointerId: number; startX: number; delta: number; pitch: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const count = products.length;
  const lightboxOpen = lightboxIndex !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxRef.current?.focus();
    const handleLightboxKeys = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + detailPhotos.length) % detailPhotos.length);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % detailPhotos.length);
    };
    window.addEventListener("keydown", handleLightboxKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleLightboxKeys);
      lightboxOpener.current?.focus();
    };
  }, [lightboxOpen]);
  const finishDrag = () => {
    if (!drag.current) return;
    const steps = Math.round(-drag.current.delta / drag.current.pitch);
    drag.current = null;
    setDragging(false);
    setDragOffset(0);
    if (steps) setIndex((current) => ((current + Math.max(-2, Math.min(2, steps))) % count + count) % count);
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (!(event.target instanceof Element) || !event.target.closest(".collection__slide")) return;
    const stage = event.currentTarget;
    const slide = stage.querySelector<HTMLElement>(".collection__slide--active");
    if (!slide) return;
    drag.current = { pointerId: event.pointerId, startX: event.clientX, delta: 0, pitch: slide.getBoundingClientRect().width * 0.78 };
    stage.setPointerCapture(event.pointerId);
    setDragging(true);
    if (event.pointerType === "mouse") event.preventDefault();
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current.delta = event.clientX - drag.current.startX;
    setDragOffset(drag.current.delta);
  };
  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    finishDrag();
  };
  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    setDragOffset(0);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); setIndex((current) => (current - 1 + count) % count); }
    if (event.key === "ArrowRight") { event.preventDefault(); setIndex((current) => (current + 1) % count); }
    if (event.key === "Home") { event.preventDefault(); setIndex(0); }
    if (event.key === "End") { event.preventDefault(); setIndex(count - 1); }
  };

  return (
    <section id="gallery" className="collection" aria-labelledby="collection-title">
      <div className="collection__inner">
        <motion.div className="collection__intro" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <h2 id="collection-title" className="mb-0 bg-gradient-to-r from-[#EDE8DF] via-[#D49B5B] to-[#B87333] bg-clip-text font-serif text-4xl font-medium leading-tight text-transparent drop-shadow-[0_2px_12px_rgba(212,155,91,0.25)] lg:text-[48px]">Коллекция изделий</h2>
          <p>Каждое изделие создаётся вручную — от выбора материала до финальной отделки с вниманием ко всем деталям. Для покрытия поверхности применяются авторские технологии обработки, основанные на натуральных и долговечных материалах. Благодаря этой технике каждая бочка приобретает свой уникальный вид, а текстура дерева открывается с новой стороны.</p>
          <div className="collection__tabs" role="tablist" aria-label="Коллекция изделий">
            <button role="tab" aria-selected={tab === "gallery"} onClick={() => setTab("gallery")}>Галерея</button>
            <button role="tab" aria-selected={tab === "details"} onClick={() => setTab("details")}>Детали</button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          {tab === "gallery" ? (
            <motion.div key="gallery" className="collection__gallery" role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : 0.45 }}>
              <div className={`collection__stage${dragging ? " collection__stage--dragging" : ""}`} style={{ "--collection-drag-offset": `${dragOffset}px` } as CSSProperties} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerCancel} onKeyDown={handleKeyDown} role="group" tabIndex={0} aria-label="Галерея изделий. Перетаскивайте фотографии или используйте клавиши со стрелками.">
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const photoIndex = (index + offset + count) % count;
                  const [src, alt] = products[photoIndex];
                  return <motion.figure key={photoIndex} className={`collection__slide collection__slide--${offset === 0 ? "active" : Math.abs(offset) === 1 ? offset < 0 ? "previous" : "next" : "distant"}`} style={{ "--collection-slide-offset": `${offset * 78}%` } as CSSProperties} initial={{ opacity: 0 }} animate={{ opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.48 : 0.16, scale: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.82 : 0.68, rotate: Math.sign(offset) * (Math.abs(offset) === 1 ? 1.5 : 2) }} transition={{ duration: dragging || reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={`/media/collection/${encodeURIComponent(src)}`} alt={alt} fill sizes="(max-width: 700px) 66vw, 50vw" priority={index === photoIndex} quality={88} draggable={false} className="collection__image" />
                  </motion.figure>;
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="details" className="collection__details" role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : 0.45 }}>
              <div className="collection__details-copy">
                {specifications.map((item, itemIndex) => <article className="collection__detail" key={item.label}><span>0{itemIndex + 1}</span><div><h3>{item.label}</h3><p>{item.text}</p></div></article>)}
              </div>
              <div className="collection__collage" aria-label="Фотографии изделий и деталей">
                {detailPhotos.map(([src, alt], photoIndex) => <motion.button type="button" key={src} className={`collection__photo collection__photo--${photoIndex + 1}`} aria-label={`Открыть фотографию: ${alt}`} onClick={(event) => { lightboxOpener.current = event.currentTarget; setLightboxIndex(photoIndex); }} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : photoIndex * 0.055, ease: [0.22, 1, 0.36, 1] }}>
                  <Image src={`/media/collection/details/${src}`} alt={alt} fill sizes="(max-width: 700px) 45vw, 12vw" quality={88} className="collection__photo-image" />
                </motion.button>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {lightboxIndex !== null && <motion.div ref={lightboxRef} className="collection__lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографий изделий" tabIndex={-1} onClick={() => setLightboxIndex(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
          <div className="collection__lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="collection__lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Закрыть просмотр">×</button>
            <button type="button" className="collection__lightbox-arrow collection__lightbox-arrow--previous" onClick={() => setLightboxIndex((current) => current === null ? null : (current - 1 + detailPhotos.length) % detailPhotos.length)} aria-label="Предыдущее фото">←</button>
            <div className="collection__lightbox-image">
              <Image src={`/media/collection/details/${detailPhotos[lightboxIndex][0]}`} alt={detailPhotos[lightboxIndex][1]} fill sizes="94vw" quality={90} className="collection__lightbox-img" />
            </div>
            <button type="button" className="collection__lightbox-arrow collection__lightbox-arrow--next" onClick={() => setLightboxIndex((current) => current === null ? null : (current + 1) % detailPhotos.length)} aria-label="Следующее фото">→</button>
          </div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}
