"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Images, X } from "lucide-react";
import { siteContent } from "@/data/siteContent";
import { usePlayer } from "./MusicPlayer";
import BirthdayLetters from "./BirthdayLetters";
import FamilyAlbum from "./FamilyAlbum";

type Props = {
  open: boolean;
  onClose: () => void;
  familyPhotos: (string | null)[];
};

const ease = [0.22, 1, 0.36, 1] as const;

/** 背景里缓慢漂浮的照片 */
const floating = [
  { className: "left-[4%] top-[12%] w-24 sm:w-32 rotate-[-8deg]", delay: "0s" },
  { className: "right-[5%] top-[18%] w-20 sm:w-28 rotate-[6deg]", delay: "-3s" },
  { className: "left-[8%] bottom-[14%] w-20 sm:w-28 rotate-[5deg]", delay: "-5s" },
  { className: "right-[9%] bottom-[10%] w-24 sm:w-32 rotate-[-4deg]", delay: "-7s" },
];

/** 光点 */
const motes = [
  [12, 30, 10], [24, 70, 6], [38, 18, 8], [52, 82, 12], [66, 36, 7], [78, 64, 9], [88, 24, 6], [46, 50, 5],
];

export default function BirthdaySurprise({ open, onClose, familyPhotos }: Props) {
  const { pause } = usePlayer();
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);
  const [albumOpen, setAlbumOpen] = useState(false);

  // 打开时：暂停音乐、锁定背景滚动、聚焦关闭按钮
  useEffect(() => {
    if (!open) return;
    pause();
    setAlbumOpen(false);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // 简单的焦点循环，键盘用户不会跳出弹层
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open, onClose, pause]);

  const openAlbum = () => {
    setAlbumOpen(true);
    setTimeout(() => albumRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="birthday-title"
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* 1. 主页面先稍微变暗 */}
          <motion.div
            className="absolute inset-0 bg-ink/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          />
          {/* 2. 然后背景慢慢变成温暖的奶油色 */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,#FFF6E4_0%,#FBEBD2_55%,#F6DFC2_100%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
            aria-hidden="true"
          />
          {/* 胶片颗粒 */}
          <div
            className="grain-overlay pointer-events-none absolute -inset-[10%] opacity-60 motion-safe:animate-[grain_1.2s_steps(4)_infinite]"
            aria-hidden="true"
          />

          {/* 关闭 */}
          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭，回到音乐档案"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/80 text-ink shadow-sm backdrop-blur transition-colors hover:bg-paper sm:right-5 sm:top-5"
          >
            <X className="h-5 w-5" />
          </motion.button>

          {/* 可滚动的内容 */}
          <div ref={scrollRef} className="relative h-full overflow-y-auto overflow-x-hidden overscroll-contain">
            {/* ── 开场 ── */}
            <section className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
              {/* 光点 */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {motes.map(([x, y, s], i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-honey blur-[2px]"
                    style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0.25, 0.7], y: [0, -18, 0] }}
                    transition={{ duration: 8 + i, delay: 1 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>

              {/* 漂浮的照片 */}
              <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
                {floating.map((f, i) => {
                  const src = familyPhotos[i] ?? null;
                  return (
                    <motion.div
                      key={i}
                      className={`absolute ${f.className}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.55, y: 0 }}
                      transition={{ delay: 2 + i * 0.3, duration: 1.4, ease }}
                    >
                      <div className="animate-float rounded-sm bg-paper p-1.5 pb-5 shadow-lg" style={{ animationDelay: f.delay }}>
                        <div className="relative aspect-square w-full overflow-hidden bg-[linear-gradient(135deg,#F8E2C2,#F2D3B0)]">
                          {src ? <Image src={src} alt="" fill sizes="128px" className="object-cover" /> : null}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="font-display text-xs tracking-[0.45em] text-ember"
              >
                TRACK 00 · HIDDEN TRACK
              </motion.p>
              <motion.h2
                id="birthday-title"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.1, ease }}
                className="mt-6 font-serif text-[clamp(2.25rem,8vw,4.5rem)] font-bold tracking-wider text-ink"
              >
                生日快乐，爸爸。
              </motion.h2>
              <div className="mt-8 space-y-2 font-serif text-lg leading-relaxed text-ink/80 sm:text-xl">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }}>
                  有些歌是 AI 写的。
                </motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }}>
                  但这一个彩蛋，是我们写给你的。
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.6, duration: 0.8 }}
                className="absolute bottom-8 flex flex-col items-center gap-1 text-xs tracking-[0.3em] text-muted"
                aria-hidden="true"
              >
                往下看
                <ChevronDown className="h-4 w-4 animate-float" />
              </motion.div>
            </section>

            {/* ── 祝福 ── */}
            <BirthdayLetters />

            {/* ── 相册入口 ── */}
            <section className="px-6 pb-16 pt-8 text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: scrollRef }}
                transition={{ duration: 0.6 }}
                className="font-serif text-xl text-ink sm:text-2xl"
              >
                还有一点东西想留给你。
              </motion.p>
              {!albumOpen && (
                <button
                  type="button"
                  onClick={openAlbum}
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-7 text-[15px] text-cream transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Images className="h-4 w-4" />
                  打开相册
                </button>
              )}
            </section>

            <AnimatePresence>
              {albumOpen && (
                <motion.div
                  ref={albumRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <FamilyAlbum photos={familyPhotos} />

                  {/* ── 最终页 ── */}
                  <section className="px-6 pb-24 pt-20 text-center">
                    <motion.h3
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, root: scrollRef }}
                      transition={{ duration: 0.8, ease }}
                      className="font-serif text-[clamp(2rem,7vw,3.5rem)] font-bold tracking-wider text-ink"
                    >
                      生日快乐，爸爸 <span aria-label="爱心">❤️</span>
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, root: scrollRef }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mx-auto mt-6 max-w-md font-serif text-base leading-loose text-ink/75 sm:text-lg"
                    >
                      愿你一直都有新的兴趣、新的旋律，
                      <br />
                      也一直有我们陪你听。
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, root: scrollRef }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="mt-10 font-hand text-4xl text-ink/85"
                    >
                      Mom &amp; Charlotte
                    </motion.p>
                    <p className="mt-10 font-display text-[11px] tracking-[0.35em] text-muted">
                      MADE WITH LOVE · {siteContent.birthdayYear}
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-12 inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm text-ink transition-colors hover:bg-paper/70"
                    >
                      回到音乐档案
                    </button>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
