"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";

import workshopOne from "../../медиа/4 мастерская и производство/1.png";
import workshopTwo from "../../медиа/4 мастерская и производство/2.png";
import workshopThree from "../../медиа/4 мастерская и производство/3.png";
import workshopFour from "../../медиа/4 мастерская и производство/4.webp";
import workshopFive from "../../медиа/4 мастерская и производство/5.png";
import workshopSix from "../../медиа/4 мастерская и производство/6.png";

type WorkshopPhoto = {
  src: StaticImageData;
  alt: string;
  position: string;
};

const workshopPhotos: readonly WorkshopPhoto[] = [
  { src: workshopOne, alt: "Отбор древесины и подготовка заготовок", position: "50% 50%" },
  { src: workshopTwo, alt: "Отбор древесины и подготовка заготовок", position: "50% 47%" },
  { src: workshopThree, alt: "Контролируемый обжиг живым огнем", position: "52% 50%" },
  { src: workshopFour, alt: "Контролируемый обжиг живым огнем", position: "50% 43%" },
  { src: workshopFive, alt: "Сборка остова и натяжка обручей", position: "50% 50%" },
  { src: workshopSix, alt: "Сборка остова и натяжка обручей", position: "50% 50%" },
];

function GalleryPhoto({ photo, photoIndex, position, reducedMotion, onActivate }: { photo: WorkshopPhoto; photoIndex: number; position: number; reducedMotion: boolean; onActivate: () => void }) {
  const offsets = [0, 58, 96, 118, -96, -58] as const;
  const tiltAngles = [-1.4, 1.1, -0.9, 1.5, -1.2, 0.8] as const;
  const x = offsets[position];
  const rotate = tiltAngles[photoIndex];
  const depth = position === 0 ? 60 : -Math.min(position, 6 - position) * 42;
  const scale = position === 0 ? 1 : 0.88 - Math.min(position, 6 - position) * 0.025;
  const opacity = position === 0 ? 1 : position === 3 ? 0.46 : 0.82;
  return (
    <motion.button type="button" className={`workshop__photo${position === 0 ? " workshop__photo--active" : ""}`} onClick={position === 0 ? onActivate : undefined} aria-label={position === 0 ? `${photo.alt}. Нажмите, чтобы показать следующую фотографию` : photo.alt} aria-hidden={position !== 0} tabIndex={position === 0 ? 0 : -1}
      animate={reducedMotion ? { x: `${x}%`, z: 0, scale: 1, opacity, rotate: 0 } : { x: `${x}%`, z: depth, scale, opacity, rotate }}
      transition={{ duration: reducedMotion ? 0.01 : 0.66, ease: [0.22, 1, 0.36, 1] }} style={{ zIndex: 20 - position }}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 767px) 70vw, (max-width: 1100px) 42vw, 510px"
        className="workshop__photo-image"
        style={{ objectPosition: photo.position }}
      />
      <span className="workshop__photo-shade" aria-hidden="true" />
    </motion.button>
  );
}

export default function WorkshopGallery() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const timer = (delta: number) => { if (locked) return; setLocked(true); setIndex(current => (current + delta + workshopPhotos.length) % workshopPhotos.length); window.setTimeout(() => setLocked(false), reducedMotion ? 10 : 690); };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (event.key === "ArrowRight") { event.preventDefault(); timer(1); } if (event.key === "ArrowLeft") { event.preventDefault(); timer(-1); } };

  return (
    <section id="workshop" className={`workshop${reducedMotion ? " workshop--reduced-motion" : ""}`} aria-labelledby="workshop-title">
      <div className="workshop__inner">
        <div className="workshop__copy">
          <motion.h2 id="workshop-title" initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>Мастерская<br />и ремесло</motion.h2>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.12 }}>Путь бочки начинается с древесины. Отбор материала, подготовка клёпок, обработка, сборка и обжиг формируют конструкцию и подготавливают дерево к дальнейшему использованию.</motion.p>
          <motion.p className="workshop__accent" initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.22 }}>Важна каждая деталь: точность соединений, свойства древесины и степень обжига. Именно сочетание этих факторов определяет характер готового изделия.</motion.p>
          <ol className="workshop__stages">
            {["Отбор древесины и подготовка заготовок", "Сборка остова и натяжка обручей", "Контролируемый обжиг живым огнем"].map((stage, i) => <motion.li key={stage} initial={reducedMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.32 + i * 0.1 }}>{stage}</motion.li>)}
          </ol>
        </div>

        <div className="workshop__gallery" aria-label="Галерея фотографий мастерской">
          <div className="workshop__gallery-depth" onKeyDown={keyDown} tabIndex={0} role="group" aria-label={`Фотография ${index + 1} из 6`} aria-roledescription="галерея">
            {workshopPhotos.map((photo, photoIndex) => {
              const position = (photoIndex - index + workshopPhotos.length) % workshopPhotos.length;
              return <GalleryPhoto key={photo.src.src} photo={photo} photoIndex={photoIndex} position={position} reducedMotion={Boolean(reducedMotion)} onActivate={() => timer(1)} />;
            })}
            <button type="button" className="workshop__arrow workshop__arrow--previous" onClick={() => timer(-1)} disabled={locked} aria-label="Предыдущая фотография">←</button>
            <button type="button" className="workshop__arrow workshop__arrow--next" onClick={() => timer(1)} disabled={locked} aria-label="Следующая фотография">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
