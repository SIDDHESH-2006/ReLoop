import { motion } from "framer-motion";
import { Link } from "react-router";
import type { ReactNode } from "react";
import type { NextLife, Operation } from "../lib/types";

export const spring = { type: "spring", stiffness: 400, damping: 25 } as const;

export function cx(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(" ");
}

/* ---------- Pill ---------- */
export function Pill({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "mint" | "amber" | "dark" | "muted";
  className?: string;
}) {
  const tones = {
    default: "bg-white text-foreground",
    mint: "bg-primary text-primary-foreground",
    amber: "bg-amber text-foreground",
    dark: "bg-foreground text-white",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide font-mono",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Button ---------- */
type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: "mint" | "dark" | "white" | "amber";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({ children, onClick, to, variant = "mint", className, type = "button", disabled }: BtnProps) {
  const variants = {
    mint: "bg-primary text-primary-foreground",
    dark: "bg-foreground text-white",
    white: "bg-white text-foreground",
    amber: "bg-amber text-foreground",
  };
  const base = cx(
    "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide font-mono nb-hover shadow-[4px_4px_0_#111] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    className,
  );
  const inner = (
    <motion.span whileTap={{ scale: disabled ? 1 : 0.96 }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );
  if (to)
    return (
      <Link to={to} className={base} data-cursor="link">
        {inner}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base} data-cursor="link">
      {inner}
    </button>
  );
}

/* ---------- Score ring ---------- */
export function ScoreRing({ score, size = 64, label }: { score: number; size?: number; label?: string }) {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e9ebef" strokeWidth="6" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#00df81"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: off }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center leading-none">
        <div className="font-display font-extrabold" style={{ fontSize: size * 0.28 }}>
          {score}
        </div>
        {label && <div className="font-mono text-[8px] uppercase text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}

/* ---------- operation / next-life color maps ---------- */
export function opTone(op: Operation): "mint" | "amber" | "dark" {
  return op === "SELL" ? "mint" : op === "EXCHANGE" ? "amber" : "dark";
}

export const nextLifeColor: Record<NextLife, string> = {
  SELL: "#00df81",
  EXCHANGE: "#ffb020",
  DONATE: "#111111",
  REPAIR: "#00df81",
  REFURBISH: "#7c5cff",
  UPCYCLE: "#ffb020",
  RECYCLE: "#2a9d8f",
};

/* ---------- Section heading ---------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-primary border border-foreground" />
      {children}
    </div>
  );
}
