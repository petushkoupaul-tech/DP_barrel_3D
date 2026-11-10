"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./ContactModal.module.css";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && <motion.div className={styles.backdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .22 }}>
        <motion.section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ duration: reduceMotion ? 0 : .28 }}>
          <button className={styles.close} type="button" onClick={onClose} aria-label="Закрыть окно">×</button>
          <p className={styles.brand}>DP Barrel &amp; Spirit</p>
          <h2 id="contact-title">Связаться с нами</h2>
          <a className={styles.action} href="mailto:Comateh@gmail.com"><svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="m3.5 6 8.5 7 8.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg><span>Написать на почту</span><span className={styles.arrow} aria-hidden="true">→</span></a>
          <a className={styles.action} href="https://t.me/Dprpty" target="_blank" rel="noopener noreferrer"><svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M21.8 3.4 18.5 20c-.25 1.18-.93 1.47-1.88.92l-5.2-3.84-2.51 2.42c-.28.28-.51.51-1.04.51l.37-5.3 9.65-8.72c.42-.37-.09-.58-.65-.21L5.31 13.3.18 11.7c-1.11-.35-1.13-1.11.23-1.65L20.5 2.3c.92-.34 1.73.22 1.3 1.1Z"/></svg><span>Написать в Telegram</span><span className={styles.arrow} aria-hidden="true">→</span></a>
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  );
}
