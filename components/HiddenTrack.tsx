"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import BirthdaySurprise from "./BirthdaySurprise";
import Vinyl from "./Vinyl";

export default function HiddenTrack({ familyPhotos }: { familyPhotos: (string | null)[] }) {
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mt-24 flex flex-col items-center text-center sm:mt-28">
      <span className="mb-10 h-10 w-px bg-line" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setRevealed(true)}
        aria-expanded={revealed}
        aria-controls="hidden-track-card"
        aria-label="好像还有一首没有公开的歌。点击查看隐藏曲目"
        className="group flex flex-col items-center gap-3 rounded-2xl p-3"
      >
        <span className="relative block h-14 w-14 transition-transform duration-500 group-hover:scale-110">
          <Vinyl spinning={revealed} className="h-full w-full opacity-90" labelColor="#F2C96D" label="" />
        </span>
        <span className="font-serif text-[15px] text-muted transition-colors group-hover:text-ink">好像还有一首没有公开的歌。</span>
        <span className="font-display text-[11px] italic tracking-[0.35em] text-muted/80">Hidden Track</span>
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            id="hidden-track-card"
            initial={{ opacity: 0, y: 14, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm overflow-hidden"
          >
            <div className="paper-texture mt-8 rounded-2xl border border-line bg-paper px-6 py-8">
              <p className="font-display text-xs tracking-[0.4em] text-ember">TRACK 00</p>
              <p className="mt-3 font-serif text-3xl font-semibold text-ink">《给爸爸》</p>
              <p className="mt-3 inline-block rounded-full border border-line px-3 py-1 text-xs tracking-wider text-muted">
                未公开曲目 · {siteContent.birthdayYear}
              </p>
              <div className="mt-7">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-cream transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  播放隐藏曲目
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BirthdaySurprise
        open={open}
        familyPhotos={familyPhotos}
        onClose={() => {
          setOpen(false);
          // 关闭后把焦点还给触发按钮
          requestAnimationFrame(() => triggerRef.current?.focus());
        }}
      />
    </div>
  );
}
