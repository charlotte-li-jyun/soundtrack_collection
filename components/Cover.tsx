import Image from "next/image";
import { trackNo } from "@/lib/format";

type CoverProps = {
  id: number;
  title: string;
  /** 真实封面路径；为 null 时显示自动生成的抽象封面 */
  src: string | null;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

const C = {
  cream: "#FFF8EE",
  paper: "#FFFCF7",
  sand: "#F6EAD8",
  orange: "#E99052",
  honey: "#F2C96D",
  sage: "#98AA8B",
  slate: "#8299AA",
  ink: "#302C29",
  rose: "#E8B8A0",
};

/** 每首歌一张不同的抽象封面：同一套颜色与笔触，保持整体统一 */
function Art({ variant }: { variant: number }) {
  switch (variant % 10) {
    // 01 晚霞与山
    case 1:
      return (
        <>
          <rect width="200" height="200" fill={C.sand} />
          <circle cx="128" cy="86" r="38" fill={C.orange} />
          <path d="M0 150 Q50 110 95 138 T200 128 V200 H0Z" fill={C.sage} />
          <path d="M0 170 Q70 140 130 164 T200 158 V200 H0Z" fill={C.slate} opacity="0.85" />
        </>
      );
    // 02 雨线
    case 2:
      return (
        <>
          <rect width="200" height="200" fill="#E6ECEF" />
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={i}
              x1={18 + i * 16}
              y1={20 + (i % 3) * 14}
              x2={8 + i * 16}
              y2={120 + (i % 4) * 18}
              stroke={C.slate}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.45 + (i % 3) * 0.2}
            />
          ))}
          <rect x="0" y="150" width="200" height="50" fill={C.paper} opacity="0.9" />
          <circle cx="150" cy="150" r="18" fill={C.honey} />
        </>
      );
    // 03 晨光条纹
    case 3:
      return (
        <>
          <rect width="200" height="200" fill={C.paper} />
          {[C.honey, C.orange, C.rose, C.sage, C.slate].map((c, i) => (
            <rect key={i} x="0" y={60 + i * 22} width="200" height="22" fill={c} opacity={0.9 - i * 0.08} />
          ))}
          <circle cx="100" cy="60" r="34" fill={C.orange} />
          <rect x="0" y="0" width="200" height="60" fill={C.paper} />
          <path d="M66 60 A34 34 0 0 1 134 60Z" fill={C.orange} />
        </>
      );
    // 04 黑胶纹路
    case 4:
      return (
        <>
          <rect width="200" height="200" fill={C.honey} />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx="100" cy="100" r={82 - i * 9} fill="none" stroke={C.ink} strokeWidth="1.2" opacity={0.18 + i * 0.04} />
          ))}
          <circle cx="100" cy="100" r="20" fill={C.orange} />
          <circle cx="100" cy="100" r="3" fill={C.ink} />
        </>
      );
    // 05 远山层叠
    case 5:
      return (
        <>
          <rect width="200" height="200" fill="#EDF0E8" />
          <circle cx="58" cy="62" r="16" fill={C.paper} />
          <path d="M0 130 L50 72 L92 118 L132 64 L200 132 V200 H0Z" fill={C.slate} opacity="0.6" />
          <path d="M0 158 L60 108 L110 150 L160 104 L200 140 V200 H0Z" fill={C.sage} />
          <path d="M0 186 Q100 160 200 184 V200 H0Z" fill={C.paper} opacity="0.85" />
        </>
      );
    // 06 咖啡杯俯视
    case 6:
      return (
        <>
          <rect width="200" height="200" fill={C.rose} opacity="0.55" />
          <rect width="200" height="200" fill={C.cream} opacity="0.4" />
          <circle cx="100" cy="104" r="60" fill={C.paper} />
          <circle cx="100" cy="104" r="44" fill="#8C5E3C" />
          <path d="M80 98 Q100 84 120 98 Q100 118 80 98Z" fill={C.sand} opacity="0.85" />
          <path d="M160 92 Q182 104 160 118" fill="none" stroke={C.paper} strokeWidth="10" strokeLinecap="round" />
        </>
      );
    // 07 两个圆（老朋友）
    case 7:
      return (
        <>
          <rect width="200" height="200" fill={C.paper} />
          <circle cx="78" cy="100" r="50" fill={C.sage} opacity="0.85" />
          <circle cx="122" cy="100" r="50" fill={C.orange} opacity="0.75" style={{ mixBlendMode: "multiply" }} />
          <line x1="20" y1="170" x2="180" y2="170" stroke={C.ink} strokeWidth="1" opacity="0.3" />
        </>
      );
    // 08 夜航
    case 8:
      return (
        <>
          <rect width="200" height="200" fill="#5E6F7E" />
          <rect width="200" height="200" fill={C.slate} opacity="0.45" />
          {[[30, 40], [62, 28], [150, 36], [172, 70], [118, 58], [44, 82]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 1.1} fill={C.cream} opacity="0.9" />
          ))}
          <circle cx="140" cy="62" r="16" fill={C.honey} />
          <path d="M0 140 Q50 128 100 140 T200 140" fill="none" stroke={C.cream} strokeWidth="1.5" opacity="0.6" />
          <path d="M0 156 Q50 144 100 156 T200 156" fill="none" stroke={C.cream} strokeWidth="1.5" opacity="0.4" />
          <path d="M0 172 Q50 160 100 172 T200 172" fill="none" stroke={C.cream} strokeWidth="1.5" opacity="0.25" />
        </>
      );
    // 09 小城窗格
    case 9:
      return (
        <>
          <rect width="200" height="200" fill={C.sand} />
          {[
            [26, 96, 34, 80, C.slate],
            [64, 70, 40, 106, C.orange],
            [108, 110, 30, 66, C.sage],
            [142, 84, 34, 92, C.honey],
          ].map(([x, y, w, h, c], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width={w as number} height={h as number} fill={c as string} />
              <rect x={(x as number) + 8} y={(y as number) + 12} width="7" height="9" fill={C.paper} opacity="0.85" />
              <rect x={(x as number) + 19} y={(y as number) + 12} width="7" height="9" fill={C.paper} opacity="0.6" />
            </g>
          ))}
          <circle cx="40" cy="46" r="14" fill={C.paper} />
        </>
      );
    // 10 未完成的线
    default:
      return (
        <>
          <rect width="200" height="200" fill={C.paper} />
          <path
            d="M24 120 C 50 60, 80 60, 100 110 S 150 160, 176 80"
            fill="none"
            stroke={C.orange}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="200 14 4 14"
          />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="24" y1={40 + i * 6} x2="176" y2={40 + i * 6} stroke={C.ink} strokeWidth="0.6" opacity="0.18" />
          ))}
          <circle cx="176" cy="80" r="5" fill={C.sage} />
        </>
      );
  }
}

export default function Cover({ id, title, src, sizes = "(max-width: 768px) 50vw, 25vw", className = "", priority }: CoverProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image src={src} alt={`《${title}》封面`} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} role="img" aria-label={`《${title}》抽象封面`}>
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <Art variant={id} />
      </svg>
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <span
        className="pointer-events-none absolute left-[7%] top-[6%] font-display text-[10px] tracking-[0.25em] text-ink/60"
        aria-hidden="true"
      >
        JL · {trackNo(id)}
      </span>
    </div>
  );
}
