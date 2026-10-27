import { siteContent } from "@/data/siteContent";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          <span className="font-serif text-ink">{siteContent.artistName}</span>
          <span className="ml-2 font-display italic">{siteContent.artistEnglishName} · Music Archive</span>
        </p>
        <p className="font-display text-xs tracking-[0.25em]">© {siteContent.birthdayYear} · 持续更新中</p>
      </div>
    </footer>
  );
}
