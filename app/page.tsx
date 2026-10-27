import { siteContent } from "@/data/siteContent";
import { tracks } from "@/data/tracks";
import { publicAsset } from "@/lib/assets";
import { PlayerProvider, type ResolvedTrack } from "@/components/MusicPlayer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedTrack from "@/components/FeaturedTrack";
import MusicLibrary from "@/components/MusicLibrary";
import AboutJason from "@/components/AboutJason";
import Archive from "@/components/Archive";
import Footer from "@/components/Footer";

// 页面在构建时生成：此时检查哪些照片 / 封面 / 音频已经上传，没有的显示占位设计
export const dynamic = "force-static";

export default function Home() {
  const resolvedTracks: ResolvedTrack[] = tracks.map((t) => ({
    ...t,
    coverSrc: publicAsset(t.cover),
    audioSrc: publicAsset(t.audio),
  }));

  const heroImage = publicAsset(siteContent.heroImage);
  const aboutImage = publicAsset(siteContent.aboutImage);
  const familyPhotos = siteContent.familyPhotos.map((p) => publicAsset(p));

  return (
    <PlayerProvider tracks={resolvedTracks}>
      <Navbar />
      <main>
        <Hero heroImage={heroImage} />
        <FeaturedTrack />
        <MusicLibrary />
        <AboutJason aboutImage={aboutImage} />
        <Archive familyPhotos={familyPhotos} />
      </main>
      <Footer />
    </PlayerProvider>
  );
}
