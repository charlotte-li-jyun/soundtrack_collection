"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import HiddenTrack from "./HiddenTrack";
import SectionHeading from "./SectionHeading";

const dots = ["bg-sage", "bg-honey", "bg-orange"];

export default function Archive({ familyPhotos }: { familyPhotos: (string | null)[] }) {
  return (
    <section id="archive" aria-labelledby="archive-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        id="archive-title"
        eyebrow="CREATIVE ARCHIVE"
        title="创作档案"
        subtitle="有些兴趣，开始的时候并不知道会走到哪里。"
      />

      {/* 时间线：手机纵向，桌面横向 */}
      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {/* 线 */}
        <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:hidden" aria-hidden="true" />
        <span className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" aria-hidden="true" />

        {siteContent.archive.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-10 md:pl-0 md:pt-10"
          >
            <span
              className={`absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-[3px] border-cream ${dots[i % 3]} shadow-[0_0_0_1px_var(--color-line)]`}
              aria-hidden="true"
            />
            <p className="font-dm text-3xl text-ink/85">{item.year}</p>
            <p className="mt-1 font-display text-[11px] tracking-[0.3em] text-muted">CHAPTER {String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 max-w-xs font-serif leading-loose text-ink/75">{item.text}</p>
          </motion.li>
        ))}
      </ol>

      {/* 档案底部：隐藏曲目 */}
      <HiddenTrack familyPhotos={familyPhotos} />
    </section>
  );
}
