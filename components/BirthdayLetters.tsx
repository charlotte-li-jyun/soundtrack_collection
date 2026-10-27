"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/siteContent";

type Letter = {
  no: string;
  title: string;
  message: string;
  signature: string;
  accent: string;
};

const letters: Letter[] = [
  {
    no: "01",
    title: "妈妈想对你说",
    message: siteContent.momMessage,
    signature: siteContent.momSignature,
    accent: "#98AA8B",
  },
  {
    no: "02",
    title: "Charlotte 想对你说",
    message: siteContent.daughterMessage,
    signature: siteContent.daughterSignature,
    accent: "#E99052",
  },
];

/** 祝福：设计成 CD 内页 / liner notes 的样子 */
export default function BirthdayLetters() {
  return (
    <section aria-label="家人的生日祝福" className="mx-auto max-w-2xl space-y-10 px-4 py-16 sm:space-y-14 sm:px-6 sm:py-20">
      {letters.map((l, i) => (
        <motion.article
          key={l.no}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`paper-texture relative rounded-[6px] text-left border border-[#EADBC4] bg-paper px-6 py-9 shadow-[0_24px_50px_-30px_rgba(48,44,41,0.45)] sm:px-12 sm:py-12 ${
            i % 2 ? "sm:ml-8 sm:-rotate-[0.4deg]" : "sm:mr-8 sm:rotate-[0.4deg]"
          }`}
        >
          {/* 页眉 */}
          <header className="flex items-center justify-between border-b border-dashed border-[#E3D3BA] pb-4 font-display text-[11px] tracking-[0.3em] text-muted">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: l.accent }} aria-hidden="true" />
              LINER NOTES · NO. {l.no}
            </span>
            <span>{siteContent.birthdayYear}</span>
          </header>

          <h3 className="mt-8 font-serif text-2xl font-semibold text-ink sm:text-[1.7rem]">{l.title}</h3>

          <div className="mt-6 space-y-4 font-serif text-[17px] leading-[2.05] text-ink/85">
            {l.message
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p, j) => (
                <p key={j} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
          </div>

          <footer className="mt-10 flex flex-col items-end">
            <p className="font-hand text-[1.9rem] leading-none text-ink/85">{l.signature}</p>
            <svg viewBox="0 0 120 10" className="mt-2 w-28" aria-hidden="true">
              <path d="M2 6 Q30 1 60 5 T118 4" fill="none" stroke={l.accent} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </footer>

          <span className="absolute bottom-3 left-6 font-display text-[10px] tracking-[0.3em] text-muted/70 sm:left-12" aria-hidden="true">
            P. {l.no}
          </span>
        </motion.article>
      ))}
    </section>
  );
}
