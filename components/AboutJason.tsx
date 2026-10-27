"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import PhotoFrame from "./PhotoFrame";
import SectionHeading from "./SectionHeading";

export default function AboutJason({ aboutImage }: { aboutImage: string | null }) {
  const [first, ...rest] = siteContent.artistBio;

  return (
    <section id="about" aria-labelledby="about-title" className="bg-paper/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="about-title" eyebrow="ABOUT · INTERVIEW" title="关于 Jason" />

        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 lg:gap-20">
          {/* 杂志采访页式的人物照片 */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-sm md:max-w-none"
          >
            <div className="rounded-2xl border border-line bg-cream p-3 shadow-[0_20px_50px_-30px_rgba(48,44,41,0.5)]">
              {/* TODO: 替换为 Jason 的生活照片 —— 上传 /public/images/jason-about.jpg 即可 */}
              <PhotoFrame
                src={aboutImage}
                alt="Jason 的生活照片"
                variant="about"
                label="PHOTO"
                sublabel="生活照片"
                sizes="(max-width: 768px) 90vw, 420px"
                className="aspect-[3/4] w-full rounded-xl"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 px-1 text-xs text-muted">
              <span className="font-serif">{siteContent.aboutImageCaption}</span>
              <span className="font-display tracking-[0.25em]">P. 02</span>
            </figcaption>
          </motion.figure>

          {/* 文字 */}
          <div className="min-w-0">
            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-l-2 border-orange pl-5 font-serif text-2xl leading-relaxed text-ink sm:pl-6 sm:text-[1.75rem]"
            >
              {first}
            </motion.blockquote>

            <div className="mt-8 space-y-5 font-serif text-base leading-[2] text-ink/80 sm:text-[17px]">
              {rest.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {siteContent.artistFacts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl border border-line bg-cream px-5 py-4"
                >
                  <dt className="flex items-center gap-2 text-xs tracking-wider text-muted">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: ["#E99052", "#98AA8B", "#F2C96D", "#8299AA"][i % 4] }}
                      aria-hidden="true"
                    />
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-lg text-ink">{f.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
