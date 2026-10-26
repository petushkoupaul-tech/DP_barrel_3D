"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type TouchEvent } from "react";

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
  const touchStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const count = products.length;
  const move = (direction: number) => setIndex((current) => (current + direction + count) % count);
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStart.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    if (Math.abs(delta) > 42) move(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <section id="gallery" className="collection" aria-labelledby="collection-title">
      <div className="collection__inner">
        <motion.div className="collection__intro" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="collection__eyebrow"><span /> DP BARREL &amp; SPIRIT</p>
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
              <div className="collection__stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-label="Галерея изделий. Проведите в сторону, чтобы сменить фотографию.">
                {[-1, 0, 1].map((offset) => {
                  const photoIndex = (index + offset + count) % count;
                  const [src, alt] = products[photoIndex];
                  return <motion.figure key={`${photoIndex}-${offset}`} className={`collection__slide collection__slide--${offset === 0 ? "active" : offset < 0 ? "previous" : "next"}`} initial={{ opacity: 0, x: `${offset * 78}%` }} animate={{ opacity: offset === 0 ? 1 : 0.48, x: `${offset * 78}%`, scale: offset === 0 ? 1 : 0.82, rotate: offset * 1.5 }} transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={`/media/collection/${encodeURIComponent(src)}`} alt={alt} fill sizes="(max-width: 700px) 84vw, 62vw" priority={index === photoIndex} quality={88} className="collection__image" />
                  </motion.figure>;
                })}
              </div>
              <div className="collection__controls">
                <span className="collection__counter"><b>{String(index + 1).padStart(2, "0")}</b><i />{String(count).padStart(2, "0")}</span>
                <p>Изделия, созданные вручную</p>
                <div className="collection__arrows">
                  <button type="button" aria-label="Предыдущее изделие" onClick={() => move(-1)}>←</button>
                  <button type="button" aria-label="Следующее изделие" onClick={() => move(1)}>→</button>
                </div>
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
