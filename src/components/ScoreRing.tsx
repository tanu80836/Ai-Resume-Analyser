export default function ScoreRing({
  score,
  label,
  sub,
  color = "#7C3AED",
  size = 150,
}: {
  score: number;
  label: string;
  sub?: string;
  color?: string;
  size?: number;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E9E7F5" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-[#0B1B3F]">{score}</span>
          <span className="text-xs font-semibold text-slate-500">/ 100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-bold text-[#0B1B3F]">{label}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  );
}
