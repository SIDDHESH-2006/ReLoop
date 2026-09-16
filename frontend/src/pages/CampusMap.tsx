import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Recycle, Wrench, Gift } from "lucide-react";
import { Eyebrow, cx } from "../components/ui";
import { campusPoints } from "../lib/mockData";

const meta = {
  listing: { color: "#00df81", icon: Package, label: "Listing" },
  repair: { color: "#7c5cff", icon: Wrench, label: "Repair point" },
  recycle: { color: "#2a9d8f", icon: Recycle, label: "Recycling point" },
  donate: { color: "#ffb020", icon: Gift, label: "Donation point" },
} as const;

type Kind = keyof typeof meta;
const kinds = Object.keys(meta) as Kind[];

export default function CampusMap() {
  const [active, setActive] = useState<Kind | "all">("all");
  const [hover, setHover] = useState<string | null>(null);

  const visible = campusPoints.filter((p) => active === "all" || p.type === active);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
      <Eyebrow>Campus map</Eyebrow>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95]">Everything, nearby</h1>
      </div>

      {/* legend / filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setActive("all")} className={cx("rounded-full border-2 border-foreground px-3 py-1 font-mono text-xs font-bold uppercase", active === "all" ? "bg-foreground text-white" : "bg-white")}>All</button>
        {kinds.map((k) => {
          const M = meta[k];
          return (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={cx("inline-flex items-center gap-1.5 rounded-full border-2 border-foreground px-3 py-1 font-mono text-xs font-bold uppercase", active === k ? "text-white" : "bg-white")}
              style={active === k ? { background: M.color, color: k === "donate" ? "#111" : "#fff" } : {}}
            >
              <span className="h-2.5 w-2.5 rounded-full border border-foreground" style={{ background: M.color }} /> {M.label}
            </button>
          );
        })}
      </div>

      {/* map surface */}
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[2rem] border-[3px] border-foreground bg-surface shadow-[6px_6px_0_#111]">
        {/* faux campus grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" preserveAspectRatio="none">
          <defs>
            <pattern id="mapgrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0 L0 0 0 48" fill="none" stroke="#111" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapgrid)" />
        </svg>
        {/* faux paths & blocks */}
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 62" preserveAspectRatio="none">
          <path d="M0 40 Q40 30 60 45 T100 38" stroke="#111" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          <path d="M50 0 L50 62" stroke="#111" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          <rect x="10" y="10" width="16" height="12" fill="none" stroke="#111" strokeWidth="0.6" />
          <rect x="70" y="44" width="18" height="12" fill="none" stroke="#111" strokeWidth="0.6" />
        </svg>

        {visible.map((p) => {
          const M = meta[p.type as Kind];
          return (
            <motion.button
              key={p.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              data-cursor="link"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-foreground shadow-[3px_3px_0_#111]" style={{ background: M.color }}>
                <M.icon className="h-5 w-5" color={p.type === "donate" ? "#111" : "#fff"} strokeWidth={2.4} />
              </span>
              {hover === p.id && (
                <span className="absolute left-1/2 top-12 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-foreground bg-white px-3 py-1 font-mono text-xs font-bold shadow-[3px_3px_0_#111]">
                  {p.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      <p className="mt-4 font-mono text-xs text-muted-foreground">Demo map with mock coordinates — ready to drop into Leaflet later.</p>
    </div>
  );
}
