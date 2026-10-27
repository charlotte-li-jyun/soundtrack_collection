"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { formatTime, trackNo } from "@/lib/format";
import { usePlayer } from "./MusicPlayer";
import Cover from "./Cover";
import Vinyl from "./Vinyl";

export default function FeaturedTrack() {
  const { tracks, current, isPlaying, currentTime, duration, playTrack, seek } = usePlayer();
  const track = tracks.find((t) => t.featured) ?? tracks[0];
  if (!track) return null;

  const isCurrent = current?.id === track.id;
  const playing = isCurrent && isPlaying;
  const time = isCurrent ? currentTime : 0;
  const total = isCurrent && duration ? duration : 0;
  const pct = total ? (time / total) * 100 : 0;

  return (
    <section aria-labelledby="featured-title" className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="paper-texture mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[1.75rem] border border-line bg-paper p-5 sm:p-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-center md:gap-12 lg:p-12"
      >
        {/* 封面 + 唱片 */}
        <div className="relative mx-auto w-full max-w-[18rem] pr-12 sm:max-w-[20rem] md:mx-0">
          <Vinyl
            spinning={playing}
            className="absolute right-0 top-1/2 aspect-square w-[86%] -translate-y-1/2 transition-transform duration-500"
            labelColor="#F2C96D"
          />
          <div className="relative overflow-hidden rounded-xl shadow-[0_18px_40px_-18px_rgba(48,44,41,0.5)]">
            <Cover id={track.id} title={track.title} src={track.coverSrc} sizes="320px" className="aspect-square w-full" />
          </div>
        </div>

        {/* 信息 */}
        <div className="min-w-0">
          <p className="flex items-center gap-3 font-display text-xs tracking-[0.35em] text-ember">
            <span className="h-px w-8 bg-orange" aria-hidden="true" />
            NOW PLAYING · TRACK {trackNo(track.id)}
          </p>
          <h2 id="featured-title" className="mt-4 font-serif text-sm tracking-[0.3em] text-muted">
            最近在听
          </h2>
          <p className="mt-2 font-serif text-4xl font-semibold text-ink sm:text-5xl">《{track.title}》</p>
          <p className="mt-4 text-sm tracking-wider text-muted">
            {track.year} · {track.genre}
          </p>
          <p className="mt-6 max-w-lg font-serif text-lg leading-loose text-ink/85">{track.description}</p>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => playTrack(track.id)}
              disabled={!track.audioSrc}
              aria-label={playing ? `暂停《${track.title}》` : `播放《${track.title}》`}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-orange px-7 text-[15px] font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {playing ? (
                <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              )}
              {playing ? "暂停" : "播放"}
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="font-display text-xs tabular-nums text-muted">{formatTime(time)}</span>
              <input
                type="range"
                min={0}
                max={total || 0}
                step={0.1}
                value={Math.min(time, total || 0)}
                onChange={(e) => seek(Number(e.target.value))}
                disabled={!isCurrent || !total}
                aria-label={`《${track.title}》播放进度`}
                aria-valuetext={`${formatTime(time)} / ${formatTime(total)}`}
                className="range disabled:cursor-default"
                style={{ ["--pct" as string]: `${pct}%` }}
              />
              <span className="font-display text-xs tabular-nums text-muted">
                {total ? formatTime(total) : track.duration}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
