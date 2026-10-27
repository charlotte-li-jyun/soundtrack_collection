"use client";

import { motion } from "framer-motion";
import { usePlayer } from "./MusicPlayer";
import SectionHeading from "./SectionHeading";
import TrackCard from "./TrackCard";

export default function MusicLibrary() {
  const { tracks } = usePlayer();

  return (
    <section id="music" aria-labelledby="music-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        id="music-title"
        eyebrow="ALL TRACKS"
        title="音乐"
        subtitle="一些旋律，一些实验，也是一点点属于自己的空间。"
        aside={`${tracks.length} 首作品`}
      />

      <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
        {tracks.map((t, i) => (
          <motion.li
            key={t.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <TrackCard track={t} />
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
