"use client";

import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";

/** 家庭相册：简洁的 contact sheet / 拍立得样式 */
export default function FamilyAlbum({ photos }: { photos: (string | null)[] }) {
  return (
    <section aria-labelledby="album-title" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="paper-texture rounded-[10px] border border-[#EADBC4] bg-paper/90 px-4 py-8 shadow-[0_24px_60px_-34px_rgba(48,44,41,0.5)] sm:px-10 sm:py-12">
        <header className="mb-8 flex items-center justify-between font-display text-[11px] tracking-[0.3em] text-muted">
          <h3 id="album-title" className="font-serif text-base tracking-[0.2em] text-ink">
            家庭相册
          </h3>
          <span>CONTACT SHEET · {String(photos.length).padStart(2, "0")} FRAMES</span>
        </header>

        <ul className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
          {photos.map((src, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <figure className="group rounded-[3px] bg-[#FFFDF9] p-2 pb-3 shadow-[0_8px_24px_-14px_rgba(48,44,41,0.45)] ring-1 ring-[#EFE3D0] sm:p-2.5 sm:pb-4">
                <div className="overflow-hidden">
                  {/* TODO: 后续上传家庭照片 —— 上传 /public/images/family-0X.jpg 即可 */}
                  <PhotoFrame
                    src={src}
                    alt={`家庭照片 ${i + 1}`}
                    variant="family"
                    label="家庭照片"
                    sizes="(max-width: 768px) 45vw, 300px"
                    className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-2.5 flex items-center justify-between px-0.5 font-display text-[10px] tracking-[0.25em] text-muted">
                  <span>No. {String(i + 1).padStart(2, "0")}</span>
                  <span>{String(i + 1).padStart(2, "0")}A ▸</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
