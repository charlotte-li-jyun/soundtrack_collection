"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/data/siteContent";

const links = [
  { href: "#top", id: "top", label: "首页" },
  { href: "#music", id: "music", label: "音乐" },
  { href: "#about", id: "about", label: "关于" },
  { href: "#archive", id: "archive", label: "创作档案" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-cream/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav aria-label="主导航" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-baseline gap-2" aria-label={`${siteContent.artistName} 首页`}>
          <span className="font-serif text-lg font-semibold tracking-wide text-ink">{siteContent.artistName}</span>
          <span className="hidden font-display text-sm italic tracking-wide text-muted sm:inline">
            {siteContent.artistEnglishName}
          </span>
        </a>
        <ul className="flex items-center gap-0.5 sm:gap-2">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                aria-current={active === l.id ? "location" : undefined}
                className={`relative inline-flex min-h-11 items-center px-2 text-sm transition-colors duration-200 sm:px-3 ${
                  active === l.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-2 bottom-2 h-px origin-left bg-orange transition-transform duration-300 sm:inset-x-3 ${
                    active === l.id ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
