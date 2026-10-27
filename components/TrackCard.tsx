"use client";

import { Pause, Play } from "lucide-react";
import { trackNo } from "@/lib/format";
import { usePlayer, type ResolvedTrack } from "./MusicPlayer";
import Cover from "./Cover";

export default function TrackCard({ track }: { track: ResolvedTrack }) {
  const { current, isPlaying, playTrack } = usePlayer();
  const isCurrent = current?.id === track.id;
  const playing = isCurrent && isPlaying;
  const available = Boolean(track.audioSrc);

  return (
    <article className="group">
      <div
        className={`relative overflow-hidden rounded-xl shadow-[0_12px_30px_-18px_rgba(48,44,41,0.55)] ring-1 transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-18px_rgba(48,44,41,0.6)] ${
          isCurrent ? "ring-orange" : "ring-transparent"
        }`}
      >
        <Cover
          id={track.id}
          title={track.title}
          src={track.coverSrc}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <button
          type="button"
          onClick={() => playTrack(track.id)}
          disabled={!available}
          aria-label={!available ? `《${track.title}》即将上线` : playing ? `暂停《${track.title}》` : `播放《${track.title}》`}
          aria-pressed={playing}
          className={`absolute bottom-2.5 right-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-ink shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-60 sm:bottom-3 sm:right-3 ${
            isCurrent ? "opacity-100" : "opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100"
          }`}
        >
          {playing ? (
            <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
          )}
        </button>
        {playing && (
          <span className="absolute bottom-3.5 left-3 flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="eq-bar block h-full w-[3px] rounded-full bg-paper" style={{ animationDelay: `${i * 0.18}s` }} />
            ))}
          </span>
        )}
      </div>

      <div className="mt-3.5 px-0.5">
        <p className="flex items-center justify-between font-display text-[11px] tracking-[0.25em] text-muted">
          <span>TRACK {trackNo(track.id)}</span>
          <span className="tabular-nums tracking-normal">{track.duration}</span>
        </p>
        <h3 className={`mt-1 truncate font-serif text-lg font-semibold ${isCurrent ? "text-ember" : "text-ink"}`}>{track.title}</h3>
        <p className="mt-0.5 truncate text-[13px] text-muted">
          {track.year} · {track.genre}
        </p>
      </div>
    </article>
  );
}
