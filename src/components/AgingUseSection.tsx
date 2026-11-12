"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type KeyboardEvent } from "react";

type SectionTab = "aging" | "interior";

const agingPhotos = [
  ["/media/aging/1.png", "Дубовая бочка для выдержки рядом с бутылкой креплёного вина"],
  ["/media/aging/2.png", "Напиток наливают из бочки с деревянным резным основанием"],
  ["/media/aging/3.png", "Бокал напитка перед деревянной бочкой с гравировкой"],
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
    alt: "Резные дубовые бочки выставлены на деревянных полках в интерьере",
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
                <div className="aging-use__rows">
                  {agingPhotos.map(([src, alt], index) => (
                    <motion.article
                      className={`aging-use__row${index === 1 ? " aging-use__row--reverse" : ""}${index === 2 ? " aging-use__row--aftertaste" : ""}`}
                      key={src}
                      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <figure className="aging-use__media">
                        <Image src={src} alt={alt} fill sizes="(max-width: 767px) 88vw, (max-width: 1100px) 44vw, 600px" quality={88} />
                      </figure>
                      {index === 0 && <div className="aging-use__copy">
                        <h4>Выдержка</h4>
                        <p>Характер бочки формируется не только древесиной, но и напитками, с которыми она взаимодействует.</p>
                        <p>Для создания особого вкусового профиля бочку предварительно насыщают ароматами креплёных вин, дистиллятов и других основ. После этого её используют для выдержки другого напитка, который постепенно раскрывает новые оттенки, унаследованные от древесины.</p>
                        <p>Так рождается многогранный вкус, в котором соединяются характер исходной древесины и ароматический след предыдущей основы</p>
                        <p>Срок выдержки зависит от выбранной основы и объёма бочки. Процесс может занимать несколько недель, год и более. Со временем древесина впитывает часть ароматов напитка, сохраняя их для последующего использования.</p>
                      </div>}
                      {index === 1 && <div className="aging-use__copy">
                        <h4>Используемые основы</h4>
                        <div className="aging-use__bases">
                          <div><strong>Испанские креплёные вина</strong><p>Pedro Ximénez  ◈  Amontillado  ◈  Fino  ◈  Oloroso  ◈  Cream</p><p>От насыщенного изюма и сухофруктов до тонких ореховых и пряных оттенков. Каждый стиль хереса оставляет свой след в древесине, который со временем может проявиться в новом напитке, придавая ему глубину и выразительность.</p></div>
                          <div><strong>Португальские вина</strong><p>White Port ◈ Ruby Port ◈ Porto Tawny</p><p>Ягодная сочность, спелые плоды, цитрусовая свежесть и мягкая сладость. После взаимодействия с древесиной эти характерные черты могут стать более округлыми, а вкус — обрести дополнительную глубину.</p></div>
                          <div><strong>Дистилляты и наливки</strong><p>Ром ◈ Кальвадос ◈ Москатель ◈ Натуральная сливовица ◈ Ежевичная наливка</p><p>Ваниль, карамель, специи, яблоки, сливы и тёмные ягоды. Древесина помогает объединить эти оттенки, смягчить резкость и сформировать более цельный, многогранный характер напитка.</p></div>
                        </div>
                      </div>}
                      {index === 2 && <div className="aging-use__copy">
                        <h4>Послевкусие</h4>
                        <p>Каждая основа оставляет свой ароматический след в древесине. При последующем заполнении бочки он может раскрыться в напитке оттенками фруктов, орехов, специй или тёплой древесности.</p>
                        <p>Время, объём бочки и выбранный напиток определяют характер этого взаимодействия. Именно в нём рождается новое сочетание, не похожее на исходный вкус.</p>
                      </div>}
                    </motion.article>
                  ))}
                </div>
                <p className="aging-use__manifesto">Реальная выдержка. Натуральные материалы. Без искусственной имитации ароматов.</p>
              </motion.div>
              ) : (
              <motion.div
                key="interior"
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                variants={{ hidden: {}, visible: {} }}
              >
                <div className="aging-use__interior-stage">
                <motion.div
                  className="aging-use__panel-intro aging-use__panel-intro--interior"
                  variants={{
                    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.08 } },
                  }}
                >
                  <h3>Бочка как часть интерьера</h3>
                  <p>Натуральная древесина, металлические обручи и выразительная фактура превращают бочку в функциональную деталь пространства. Она естественно сочетается с деревом, камнем и кожей — в домашнем баре, кабинете или лаунже.</p>
                </motion.div>
                <div className="aging-use__interior-gallery">
                  {interiorPhotos.map((photo) => (
                    <motion.figure
                      className="aging-use__interior-photo"
                      key={photo.src}
                      variants={{
                        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.25 + interiorPhotos.indexOf(photo) * 0.15, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 88vw, (max-width: 1100px) 44vw, 600px" quality={88} />
                      <figcaption><span>В ДЕТАЛЯХ ПРОСТРАНСТВА</span></figcaption>
                    </motion.figure>
                  ))}
                </div>
                <motion.p
                  className="aging-use__interior-note"
                  variants={{
                    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.45 } },
                  }}
                >Лаконичный акцент, который не перегружает интерьер.</motion.p>
                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </section>
  );
}
