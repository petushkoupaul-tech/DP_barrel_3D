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

function GalleryPhoto({ photo, position, reducedMotion, onActivate }: { photo: WorkshopPhoto; position: number; reducedMotion: boolean; onActivate: () => void }) {
  const x = position === 0 ? 0 : (position % 2 ? 1 : -1) * Math.ceil(position / 2) * 13;
  const y = position * 13;
  return (
    <motion.button type="button" className={`workshop__photo${position === 0 ? " workshop__photo--active" : ""}`} onClick={position === 0 ? onActivate : undefined} aria-label={position === 0 ? `${photo.alt}. Нажмите, чтобы показать следующую фотографию` : photo.alt} aria-hidden={position !== 0} tabIndex={position === 0 ? 0 : -1}
      animate={reducedMotion ? { x: 0, y: 0, z: 0, scale: 1, opacity: position < 4 ? 1 : 0 } : { x, y, z: -position * 34, scale: 1 - position * 0.025, opacity: position < 5 ? 1 : 0, rotate: (position % 2 ? 1 : -1) * Math.min(position, 3) * 0.6 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ zIndex: 10 - position }}>
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
  const [stack, setStack] = useState(workshopPhotos.map((_, i) => i));
  const [locked, setLocked] = useState(false);
  const timer = (delta: number) => { if (locked) return; setLocked(true); setStack(current => delta > 0 ? [...current.slice(1), current[0]] : [current[current.length - 1], ...current.slice(0, -1)]); window.setTimeout(() => setLocked(false), reducedMotion ? 10 : 610); };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (event.key === "ArrowRight") { event.preventDefault(); timer(1); } if (event.key === "ArrowLeft") { event.preventDefault(); timer(-1); } };
  const index = stack[0];

  return (
    <section id="workshop" className={`workshop${reducedMotion ? " workshop--reduced-motion" : ""}`} aria-labelledby="workshop-title">
      <div className="workshop__inner">
        <div className="workshop__copy">
          <h2 id="workshop-title">Мастерская<br />и ремесло</h2>
          <p>Путь бочки начинается с древесины. Отбор материала, подготовка клёпок, обработка, сборка и обжиг формируют конструкцию и подготавливают дерево к дальнейшему использованию.</p>
          <p className="workshop__accent">Важна каждая деталь: точность соединений, свойства древесины и степень обжига. Именно сочетание этих факторов определяет характер готового изделия.</p>
          <ol className="workshop__stages">
            <li>Отбор древесины и подготовка заготовок</li>
            <li>Сборка остова и натяжка обручей</li>
            <li>Контролируемый обжиг живым огнем</li>
          </ol>
        </div>

        <div className="workshop__gallery" aria-label="Шесть фотографий мастерской">
          <div className="workshop__gallery-depth">
            {stack.map((photoIndex, position) => (
              <GalleryPhoto key={workshopPhotos[photoIndex].src.src} photo={workshopPhotos[photoIndex]} position={position} reducedMotion={Boolean(reducedMotion)} onActivate={() => timer(1)} />
            ))}
          </div>
          <div className="workshop__interaction" onKeyDown={keyDown} tabIndex={0} role="group" aria-label={`Галерея мастерской, фотография ${index + 1} из 6`} aria-roledescription="галерея">
            <button type="button" className="workshop__arrow" onClick={() => timer(-1)} disabled={locked} aria-label="Предыдущая фотография">←</button>
            <p className="workshop__hint">Нажмите на фотографию, чтобы продолжить</p>
            <p className="workshop__progress" aria-live="polite">0{index + 1} — 06</p>
            <button type="button" className="workshop__arrow" onClick={() => timer(1)} disabled={locked} aria-label="Следующая фотография">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
