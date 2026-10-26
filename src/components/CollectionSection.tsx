"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

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

export default function CollectionSection() {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<"gallery" | "details">("gallery");
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const drag = useRef<{ pointerId: number; startX: number; delta: number; pitch: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const count = products.length;
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
          <h2 id="collection-title">Коллекция изделий</h2>
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
              {specifications.map((item, itemIndex) => <article className="collection__detail" key={item.label}><span>0{itemIndex + 1}</span><div><h3>{item.label}</h3><p>{item.text}</p></div></article>)}
              <div className="collection__detail-photo"><Image src={`/media/collection/${encodeURIComponent(products[index][0])}`} alt={products[index][1]} fill sizes="(max-width: 700px) 90vw, 40vw" quality={85} className="collection__image" /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
