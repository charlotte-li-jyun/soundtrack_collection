"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import type { Track } from "@/data/tracks";
import { formatTime, trackNo } from "@/lib/format";
import Cover from "./Cover";

/** 构建时已检查过文件是否存在的歌曲数据 */
export type ResolvedTrack = Track & {
  coverSrc: string | null;
  audioSrc: string | null;
};

type PlayerState = {
  tracks: ResolvedTrack[];
  current: ResolvedTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  /** 播放指定歌曲；若已是当前歌曲则切换播放 / 暂停 */
  playTrack: (id: number) => void;
  toggle: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}

export function PlayerProvider({ tracks, children }: { tracks: ResolvedTrack[]; children: ReactNode }) {
  // 全站只有这一个 audio 元素，所以同一时间只会播放一首歌
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [muted, setMuted] = useState(false);

  const playable = useMemo(() => tracks.filter((t) => t.audioSrc), [tracks]);
  const current = useMemo(() => tracks.find((t) => t.id === currentId) ?? null, [tracks, currentId]);

  const load = useCallback(
    (track: ResolvedTrack) => {
      const audio = audioRef.current;
      if (!audio || !track.audioSrc) return;
      if (currentId !== track.id) {
        audio.src = track.audioSrc;
        audio.currentTime = 0;
        setCurrentTime(0);
        setDuration(0);
        setCurrentId(track.id);
      }
      audio.play().catch(() => setIsPlaying(false));
    },
    [currentId],
  );

  const playTrack = useCallback(
    (id: number) => {
      const audio = audioRef.current;
      const track = tracks.find((t) => t.id === id);
      if (!audio || !track?.audioSrc) return;
      if (currentId === id) {
        if (audio.paused) audio.play().catch(() => setIsPlaying(false));
        else audio.pause();
        return;
      }
      load(track);
    },
    [tracks, currentId, load],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!current) {
      if (playable[0]) load(playable[0]);
      return;
    }
    if (audio.paused) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [current, playable, load]);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!playable.length) return;
      const idx = playable.findIndex((t) => t.id === currentId);
      const nextIdx = idx === -1 ? 0 : (idx + dir + playable.length) % playable.length;
      load(playable[nextIdx]);
    },
    [playable, currentId, load],
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => {
    const audio = audioRef.current;
    // 播放超过 3 秒时，「上一首」先回到本曲开头
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    step(-1);
  }, [step]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    if (audio) {
      audio.volume = clamped;
      if (clamped > 0 && audio.muted) {
        audio.muted = false;
        setMuted(false);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  // 音频事件
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onMeta = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("timeupdate", onTime);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("timeupdate", onTime);
    };
    // 只需在挂载时绑定一次
  }, []);

  // 播放结束自动下一首
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => next();
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [next]);

  // 播放时用 requestAnimationFrame 让进度条更顺滑
  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    const tick = () => {
      // 取整到 0.1 秒，相同值时 React 会跳过重复渲染
      if (audioRef.current) setCurrentTime(Math.round(audioRef.current.currentTime * 10) / 10);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  // 播放器出现后给页面底部留白，避免遮挡正文
  useEffect(() => {
    if (current) document.body.dataset.player = "on";
    return () => {
      delete document.body.dataset.player;
    };
  }, [current]);

  const value = useMemo<PlayerState>(
    () => ({
      tracks,
      current,
      isPlaying,
      currentTime,
      duration,
      volume,
      muted,
      playTrack,
      toggle,
      pause,
      next,
      prev,
      seek,
      setVolume,
      toggleMute,
    }),
    [tracks, current, isPlaying, currentTime, duration, volume, muted, playTrack, toggle, pause, next, prev, seek, setVolume, toggleMute],
  );

  return (
    <PlayerContext.Provider value={value}>
      {/* 系统开启「减少动态效果」时，关闭非必要动画 */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <audio ref={audioRef} preload="metadata" className="hidden" />
      <MiniPlayer />
    </PlayerContext.Provider>
  );
}

/** 底部固定的迷你播放器：第一次播放后出现 */
function MiniPlayer() {
  const { current, isPlaying, currentTime, duration, volume, muted, toggle, next, prev, seek, setVolume, toggleMute } =
    usePlayer();
  const total = duration || 0;
  const pct = total ? (currentTime / total) * 100 : 0;
  const volPct = muted ? 0 : volume * 100;

  return (
    <AnimatePresence>
      {current && (
        <motion.section
          key="mini-player"
          aria-label="音乐播放器"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-line bg-paper/95 shadow-[0_10px_40px_-12px_rgba(48,44,41,0.25)] backdrop-blur-md">
            {/* 手机端：进度条在顶部 */}
            <div className="px-4 pt-2 md:hidden">
              <ProgressInput currentTime={currentTime} total={total} pct={pct} onSeek={seek} />
            </div>

            <div className="flex items-center gap-3 px-3 pb-3 pt-1 md:gap-5 md:px-4 md:py-3">
              {/* 当前歌曲 */}
              <div className="flex min-w-0 flex-1 items-center gap-3 md:w-56 md:flex-none">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg md:h-12 md:w-12">
                  <Cover id={current.id} title={current.title} src={current.coverSrc} sizes="48px" className="h-full w-full" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[10px] tracking-[0.25em] text-muted">
                    {isPlaying ? "NOW PLAYING" : "PAUSED"} · {trackNo(current.id)}
                  </p>
                  <p className="truncate font-serif text-[15px] font-semibold text-ink">{current.title}</p>
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="flex shrink-0 items-center gap-1 md:gap-2">
                <IconButton label="上一首" onClick={prev}>
                  <SkipBack className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={1.5} />
                </IconButton>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? "暂停" : "播放"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
                  ) : (
                    <Play className="ml-0.5 h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
                  )}
                </button>
                <IconButton label="下一首" onClick={next}>
                  <SkipForward className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={1.5} />
                </IconButton>
              </div>

              {/* 桌面端进度条 */}
              <div className="hidden min-w-0 flex-1 md:block">
                <ProgressInput currentTime={currentTime} total={total} pct={pct} onSeek={seek} />
              </div>

              {/* 音量 */}
              <div className="hidden items-center gap-2 md:flex">
                <IconButton label={muted ? "取消静音" : "静音"} onClick={toggleMute}>
                  {muted || volume === 0 ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
                </IconButton>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="音量"
                  aria-valuetext={`${Math.round(volPct)}%`}
                  className="range w-20"
                  style={{ ["--pct" as string]: `${volPct}%` }}
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function ProgressInput({
  currentTime,
  total,
  pct,
  onSeek,
}: {
  currentTime: number;
  total: number;
  pct: number;
  onSeek: (t: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 shrink-0 text-right font-display text-xs tabular-nums text-muted">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={total || 0}
        step={0.1}
        value={Math.min(currentTime, total || 0)}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="播放进度"
        aria-valuetext={`${formatTime(currentTime)} / ${formatTime(total)}`}
        disabled={!total}
        className="range"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
      <span className="w-10 shrink-0 font-display text-xs tabular-nums text-muted">{formatTime(total)}</span>
    </div>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full text-ink/80 transition-colors duration-200 hover:bg-sand hover:text-ink"
    >
      {children}
    </button>
  );
}
