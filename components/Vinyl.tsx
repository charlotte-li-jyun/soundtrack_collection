type VinylProps = {
  spinning?: boolean;
  label?: string;
  className?: string;
  /** 唱片中心标签颜色 */
  labelColor?: string;
};

/** 一张简单的黑胶唱片；spinning 时缓慢旋转（系统开启减少动画时自动停止） */
export default function Vinyl({ spinning = false, label = "JL", className = "", labelColor = "#E99052" }: VinylProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full animate-spin-slow"
        style={{ animationPlayState: spinning ? "running" : "paused" }}
      >
        <defs>
          <radialGradient id="vinyl-sheen" cx="0.3" cy="0.25" r="0.9">
            <stop offset="0" stopColor="#5A524C" />
            <stop offset="0.45" stopColor="#3A3531" />
            <stop offset="1" stopColor="#2A2623" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="99" fill="url(#vinyl-sheen)" />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx="100" cy="100" r={92 - i * 4.2} fill="none" stroke="#FFF8EE" strokeOpacity={0.05 + (i % 3) * 0.025} strokeWidth="0.6" />
        ))}
        {/* 光泽 */}
        <path d="M100 4 A96 96 0 0 1 178 46 L100 100Z" fill="#FFF8EE" opacity="0.05" />
        <path d="M100 196 A96 96 0 0 1 22 154 L100 100Z" fill="#FFF8EE" opacity="0.04" />
        <circle cx="100" cy="100" r="30" fill={labelColor} />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#302C29" strokeOpacity="0.15" />
        <text x="100" y="94" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="9" letterSpacing="2" fill="#302C29" opacity="0.75">
          {label}
        </text>
        <line x1="84" y1="110" x2="116" y2="110" stroke="#302C29" strokeOpacity="0.35" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="3.2" fill="#FFF8EE" />
      </svg>
    </div>
  );
}
