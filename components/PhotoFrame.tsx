import Image from "next/image";
import { Camera } from "lucide-react";

type PhotoFrameProps = {
  /** 图片路径；为 null 时显示占位设计 */
  src: string | null;
  alt: string;
  /** 占位时显示的文字 */
  label?: string;
  sublabel?: string;
  variant?: "hero" | "about" | "family";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * 照片位：有图显示图，没图显示一张柔和的抽象占位图（不是灰色框）。
 * 替换照片只需要把文件上传到 /public/images/，无需修改这里。
 */
export default function PhotoFrame({
  src,
  alt,
  label = "PHOTO",
  sublabel,
  variant = "about",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  className = "",
}: PhotoFrameProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} role="img" aria-label={`${alt}（照片待上传）`}>
      {variant === "hero" && <HeroPlaceholderArt />}
      {variant === "about" && <AboutPlaceholderArt />}
      {variant === "family" && <FamilyPlaceholderArt />}
      <div className="paper-texture pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 pb-[8%] text-center" aria-hidden="true">
        {variant === "family" ? (
          <Camera className="mb-1 h-5 w-5 text-ink/45" strokeWidth={1.5} />
        ) : null}
        <span
          className={
            variant === "family"
              ? "font-serif text-sm tracking-[0.2em] text-ink/60"
              : "font-display text-sm tracking-[0.5em] text-ink/55"
          }
        >
          {label}
        </span>
        {sublabel ? <span className="text-[11px] tracking-wider text-ink/45">{sublabel}</span> : null}
      </div>
    </div>
  );
}

function HeroPlaceholderArt() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCE7C8" />
          <stop offset="0.55" stopColor="#F8D9B4" />
          <stop offset="1" stopColor="#EFD3B9" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#hero-sky)" />
      <circle cx="270" cy="170" r="88" fill="#E99052" opacity="0.85" />
      <circle cx="270" cy="170" r="120" fill="none" stroke="#FFFCF7" strokeWidth="1" opacity="0.7" />
      <circle cx="270" cy="170" r="150" fill="none" stroke="#FFFCF7" strokeWidth="1" opacity="0.45" />
      <path d="M0 360 Q100 300 200 340 T400 320 V500 H0Z" fill="#98AA8B" opacity="0.9" />
      <path d="M0 410 Q120 370 240 400 T400 392 V500 H0Z" fill="#8299AA" opacity="0.75" />
      {/* 一个人的抽象剪影：简单线条 */}
      <g fill="none" stroke="#302C29" strokeWidth="1.4" opacity="0.55" strokeLinecap="round">
        <circle cx="128" cy="230" r="26" />
        <path d="M78 330 Q84 272 128 266 Q172 272 178 330" />
      </g>
      <line x1="40" y1="60" x2="140" y2="60" stroke="#302C29" strokeWidth="0.8" opacity="0.25" />
      <line x1="40" y1="68" x2="110" y2="68" stroke="#302C29" strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function AboutPlaceholderArt() {
  return (
    <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <rect width="300" height="400" fill="#EEF0E8" />
      <rect x="0" y="250" width="300" height="150" fill="#F6EAD8" />
      {/* 窗 */}
      <rect x="160" y="50" width="100" height="130" fill="#FFFCF7" stroke="#8299AA" strokeWidth="1.2" opacity="0.9" />
      <line x1="210" y1="50" x2="210" y2="180" stroke="#8299AA" strokeWidth="1.2" />
      <line x1="160" y1="115" x2="260" y2="115" stroke="#8299AA" strokeWidth="1.2" />
      <circle cx="236" cy="86" r="14" fill="#F2C96D" />
      {/* 桌上的唱片与咖啡 */}
      <ellipse cx="96" cy="262" rx="64" ry="14" fill="#302C29" opacity="0.75" />
      <ellipse cx="96" cy="258" rx="14" ry="3.5" fill="#E99052" />
      <path d="M190 236 h40 v24 a14 14 0 0 1 -14 14 h-12 a14 14 0 0 1 -14 -14Z" fill="#FFFCF7" stroke="#756D66" strokeWidth="1" />
      <path d="M230 242 q12 4 0 14" fill="none" stroke="#756D66" strokeWidth="1" />
      <path d="M200 226 q4 -8 0 -16 M212 226 q4 -8 0 -16" fill="none" stroke="#756D66" strokeWidth="0.8" opacity="0.6" />
      <line x1="0" y1="250" x2="300" y2="250" stroke="#302C29" strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function FamilyPlaceholderArt() {
  return (
    <svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="fam-glow" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FFF4DD" />
          <stop offset="0.6" stopColor="#F6E3C6" />
          <stop offset="1" stopColor="#EED7BD" />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill="url(#fam-glow)" />
      <circle cx="210" cy="100" r="46" fill="#F2C96D" opacity="0.55" />
      <circle cx="96" cy="170" r="70" fill="#E99052" opacity="0.18" />
    </svg>
  );
}
