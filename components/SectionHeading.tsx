"use client";

import { motion } from "framer-motion";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  aside?: string;
};

export default function SectionHeading({ id, eyebrow, title, subtitle, aside }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="flex items-center gap-3 font-display text-xs tracking-[0.35em] text-ember">
          <span className="h-px w-8 bg-orange" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-4 font-serif text-4xl font-bold tracking-wide text-ink sm:text-5xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p> : null}
      </div>
      {aside ? <p className="font-display text-sm italic tracking-wider text-muted">{aside}</p> : null}
    </motion.header>
  );
}
