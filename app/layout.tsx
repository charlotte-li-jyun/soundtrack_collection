import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "李靖睿 Jason Li · Music Archive",
  description: "李靖睿 Jason 的个人音乐档案馆。用好奇心写歌，用旋律收藏生活。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFF8EE",
};

// 字体通过 Google Fonts 在浏览器端加载；加载失败时会回退到系统中文字体（宋体 / 苹方 / 微软雅黑）
const fontsHref =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Noto+Serif+SC:wght@400;600;700",
    "family=Noto+Sans+SC:wght@400;500",
    "family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500",
    "family=DM+Serif+Display",
    "family=Caveat:wght@500",
    "family=Ma+Shan+Zheng",
  ].join("&") +
  "&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body>
        <a
          href="#music"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          跳到音乐作品
        </a>
        {children}
      </body>
    </html>
  );
}
