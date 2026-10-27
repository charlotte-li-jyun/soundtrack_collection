"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Headphones, Play, Pause } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { usePlayer } from "./MusicPlayer";
import PhotoFrame from "./PhotoFrame";
import Vinyl from "./Vinyl";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Hero({ heroImage }: { heroImage: string | null }) {
  const { tracks, current, isPlaying, playTrack } = usePlayer();
  const latest = tracks.find((t) => t.featured && t.audioSrc) ?? tracks.find((t) => t.audioSrc);
  const latestIsPlaying = isPlaying && current?.id === latest?.id;

  // 小彩蛋：连续点击名字 5 次
  const clicks = useRef<{ count: number; last: number }>({ count: 0, last: 0 });
  const [toast, setToast] = useState(false);

  const onNameClick = () => {
    const now = Date.now();
    const c = clicks.current;
    c.count = now - c.last < 1500 ? c.count + 1 : 1;
    c.last = now;
    if (c.count >= 5) {
      c.count = 0;
      setToast(true);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <section id="top" aria-label="首页" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      {/* 背景：缓慢漂浮的柔和圆形 */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-honey/25 blur-3xl animate-float" />
        <div className="absolute right-[-6rem] top-[-4rem] h-96 w-96 rounded-full bg-orange/15 blur-3xl animate-float [animation-delay:-4s]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sage/20 blur-3xl animate-float [animation-delay:-2s]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 sm:gap-12 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-10 lg:gap-16 lg:px-8 lg:pb-24">
        {/* 左侧文字 */}
        <div className="order-2 md:order-1">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 flex items-center gap-3 font-display text-[11px] tracking-[0.22em] text-muted sm:text-xs sm:tracking-[0.35em]"
          >
            <span className="h-px w-8 bg-orange" aria-hidden="true" />
            MUSIC ARCHIVE · {siteContent.birthdayYear} COLLECTION
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="select-none">
            <span
              onClick={onNameClick}
              className="block font-serif text-[clamp(3.25rem,10vw,6.25rem)] font-bold leading-[1.05] tracking-[0.08em] text-ink"
            >
              {siteContent.artistName}
            </span>
            <span className="mt-3 block font-display text-[clamp(1rem,2.6vw,1.4rem)] font-medium tracking-[0.6em] text-muted">
              {siteContent.artistEnglishName.toUpperCase()}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-8 max-w-md font-serif text-xl leading-relaxed text-ink sm:text-2xl"
          >
            {siteContent.artistSubtitle}
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-3 text-sm tracking-wider text-muted">
            {siteContent.artistRole}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-10 flex flex-wrap gap-3">
            {latest ? (
              <button
                type="button"
                onClick={() => playTrack(latest.id)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] text-cream shadow-[0_8px_24px_-10px_rgba(48,44,41,0.6)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {latestIsPlaying ? (
                  <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ) : (
                  <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                )}
                {latestIsPlaying ? "暂停播放" : "播放最新作品"}
              </button>
            ) : null}
            <a
              href="#music"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 bg-paper/60 px-6 text-[15px] text-ink transition-colors duration-200 hover:border-ink/40 hover:bg-paper"
            >
              浏览全部作品
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* 右侧：人物照片 + 唱片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-[15rem] pr-9 sm:max-w-md sm:pr-14 md:order-2"
        >
          {/* 从“唱片封套”里露出的黑胶 */}
          <Vinyl
            spinning
            className="absolute right-0 top-1/2 aspect-square w-[78%] -translate-y-1/2"
            label="JASON LI"
          />
          <div className="relative rotate-[-1.5deg] rounded-[1.25rem] bg-paper p-2.5 shadow-[0_24px_60px_-24px_rgba(48,44,41,0.45)]">
            {/* TODO: 将这里替换为 Jason 的人物照片 —— 上传 /public/images/jason-hero.jpg 即可 */}
            <PhotoFrame
              src={heroImage}
              alt="李靖睿 Jason 的人物照片"
              variant="hero"
              label="PHOTO"
              sublabel="Jason Li · Portrait"
              sizes="(max-width: 768px) 90vw, 440px"
              priority
              className="aspect-[4/5] w-full rounded-[0.9rem]"
            />
            <div className="flex items-center justify-between px-1.5 pb-0.5 pt-2.5 font-display text-[11px] tracking-[0.25em] text-muted">
              <span>VOL. 01</span>
              <span>{siteContent.birthdayYear}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 成就解锁 Toast */}
      <div className="pointer-events-none fixed bottom-28 right-4 z-50 sm:right-6" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink shadow-[0_12px_40px_-12px_rgba(48,44,41,0.35)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-honey/40">
                <Headphones className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-[10px] tracking-[0.3em] text-muted">ACHIEVEMENT</span>
                成就解锁：Jason 的头号听众 🎧
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
