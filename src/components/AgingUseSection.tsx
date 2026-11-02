"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type KeyboardEvent } from "react";

type SectionTab = "aging" | "interior";

const agingRows = [
  {
    number: "01",
    title: "Древесина и напиток",
    paragraphs: [
      "Для подготовки бочек используют креплёные вина и дистилляты. Взаимодействуя с древесиной, они влияют на будущий вкусоароматический профиль.",
    ],
    image: "/media/aging/1.png",
    alt: "Дубовая бочка для выдержки рядом с бутылкой креплёного вина",
  },
  {
    number: "02",
    title: "Основы выдержки",
    paragraphs: [],
    image: "/media/aging/2.png",
    alt: "Напиток наливают из бочки с деревянным резным основанием",
  },
  {
    number: "03",
    title: "Время раскрывает характер",
    paragraphs: [
      "Срок выдержки зависит от напитка и объёма бочки: процесс может занять несколько недель, год и более.",
      "Реальная выдержка. Натуральные материалы. Без искусственной имитации ароматов.",
    ],
    image: "/media/aging/3.png",
    alt: "Бокал напитка перед деревянной бочкой с гравировкой",
  },
] as const;

const interiorPhotos = [
  {
    src: "/media/aging/interior-1.png",
    alt: "Декоративная бочка в современной домашней барной зоне",
  },
  {
    src: "/media/aging/interior-2.png",
    alt: "Резная бочка на деревянном круглом столике в интерьере",
  },
  {
    src: "/media/aging/interior-3.png",
    alt: "Бочка и деревянные кружки в тёплом лаунже",
  },
  {
    src: "/media/aging/interior-4.png",
    alt: "Бочка для напитка с бокалом виски на деревянной поверхности",
  },
] as const;

function updateSectionHash(tab: SectionTab) {
  const hash = tab === "aging" ? "#aging" : "#use";
  if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
}

export default function AgingUseSection() {
  const [activeTab, setActiveTab] = useState<SectionTab>("aging");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const syncTabWithHash = () => {
      const hash = window.location.hash;
      if (hash === "#use") setActiveTab("interior");
      if (hash === "#aging") setActiveTab("aging");
    };
    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);
    window.addEventListener("popstate", syncTabWithHash);
    return () => {
      window.removeEventListener("hashchange", syncTabWithHash);
      window.removeEventListener("popstate", syncTabWithHash);
    };
  }, []);

  const selectTab = (tab: SectionTab) => {
    setActiveTab(tab);
    updateSectionHash(tab);
  };

  const handleTabKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const nextTab = activeTab === "aging" ? "interior" : "aging";
      selectTab(nextTab);
      document.getElementById(nextTab === "aging" ? "aging-tab" : "use")?.focus();
    }
  };

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section id="aging" className="aging-use" aria-labelledby="aging-use-title">
      <div className="aging-use__inner">
        <motion.header
          className="aging-use__header"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="aging-use-title">Выдержка и использование</h2>
          <div className="aging-use__tabs" role="tablist" aria-label="Выдержка и интерьер" onKeyDown={handleTabKeys}>
            <button
              id="aging-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "aging"}
              aria-controls="aging-use-panel"
              tabIndex={activeTab === "aging" ? 0 : -1}
              onClick={() => selectTab("aging")}
            >
              Выдержка
            </button>
            <button
              id="use"
              type="button"
              role="tab"
              aria-selected={activeTab === "interior"}
              aria-controls="aging-use-panel"
              tabIndex={activeTab === "interior" ? 0 : -1}
              onClick={() => selectTab("interior")}
            >
              Интерьер
            </button>
          </div>
        </motion.header>

        <div className="aging-use__panels">
          <section
            id="aging-use-panel"
            className="aging-use__panel"
            role="tabpanel"
            aria-labelledby={activeTab === "aging" ? "aging-tab" : "use"}
            tabIndex={0}
          >
            <AnimatePresence mode="wait" initial={false}>
              {activeTab === "aging" ? (
              <motion.div key="aging" {...reveal} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}>
                <div className="aging-use__panel-intro">
                  <h3>Характер, который формируется со временем</h3>
                </div>

                <div className="aging-use__rows">
                  {agingRows.map((row, index) => (
                    <motion.article
                      className={`aging-use__row${index === 1 ? " aging-use__row--reverse" : ""}`}
                      key={row.number}
                      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <figure className="aging-use__media">
                        <Image src={row.image} alt={row.alt} fill sizes="(max-width: 767px) 88vw, (max-width: 1100px) 44vw, 600px" quality={88} />
                        <figcaption><span>DP BARREL &amp; SPIRIT</span></figcaption>
                      </figure>
                      <div className="aging-use__copy">
                        <h4>{row.title}</h4>
                        {row.paragraphs.map((paragraph, paragraphIndex) => (
                          <p className={index === 2 && paragraphIndex === 1 ? "aging-use__manifesto" : undefined} key={paragraph}>
                            {paragraph}
                          </p>
                        ))}
                        {index === 1 && (
                          <div className="aging-use__bases" aria-label="Напитки для подготовки бочек">
                            <div><span>Испанские креплёные</span><p>PX · Amontillado · Fino · Oloroso · Cream</p></div>
                            <div><span>Португальские</span><p>White Port · Ruby Port</p></div>
                            <div><span>Дистилляты и наливки</span><p>Ром · кальвадос · москатель · натуральная сливовица и ежевичная наливка</p></div>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
              ) : (
              <motion.div key="interior" {...reveal} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}>
                <div className="aging-use__panel-intro aging-use__panel-intro--interior">
                  <h3>Бочка как часть интерьера</h3>
                  <p>Натуральная древесина, металлические обручи и выразительная фактура превращают бочку в функциональную деталь пространства. Она естественно сочетается с деревом, камнем и кожей — в домашнем баре, кабинете или лаунже.</p>
                </div>
                <div className="aging-use__interior-gallery">
                  {interiorPhotos.map((photo, index) => (
                    <motion.figure
                      className="aging-use__interior-photo"
                      key={photo.src}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.055, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 88vw, (max-width: 1100px) 44vw, 600px" quality={88} />
                      <figcaption><span>В ДЕТАЛЯХ ПРОСТРАНСТВА</span></figcaption>
                    </motion.figure>
                  ))}
                </div>
                <p className="aging-use__interior-note">Лаконичный акцент, который не перегружает интерьер.</p>
              </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </section>
  );
}
