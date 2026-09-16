import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HandCoins, Leaf, Recycle, RefreshCw, Sparkles, Wrench } from "lucide-react";
import Counter from "../components/Counter";
import { Eyebrow } from "../components/ui";
import { getImpact } from "../lib/api/impact";
import type { ImpactMetrics } from "../lib/types";

export default function Impact() {
  const [m, setM] = useState<ImpactMetrics | null>(null);
  useEffect(() => {
    getImpact().then(setM);
  }, []);

  if (!m) {
    return (
      <div className="mx-auto max-w-6xl px-6 pt-40 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="h-40 animate-pulse rounded-3xl border-[3px] border-foreground bg-muted" />)}
        </div>
      </div>
    );
  }

  const big = [
    { icon: RefreshCw, k: m.recirculated, label: "Items recirculated", tone: "bg-primary text-primary-foreground" },
    { icon: HandCoins, k: m.valueRecirculated, label: "Value recirculated", tone: "bg-amber", prefix: "₹", fmt: (n: number) => `${(n / 1000).toFixed(0)}K` },
    { icon: Leaf, k: m.wasteAvoidedKg, label: "Waste avoided (est.)", tone: "bg-foreground text-white", suffix: " kg" },
  ];
  const breakdown = [
    { icon: HandCoins, k: m.sold, label: "Sold" },
    { icon: Sparkles, k: m.donated, label: "Donated" },
    { icon: Wrench, k: m.repaired, label: "Repaired" },
    { icon: Sparkles, k: m.upcycled, label: "Upcycled" },
    { icon: Recycle, k: m.recycled, label: "Recycled" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
      <Eyebrow>Impact</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95] md:text-6xl">Campus circular impact</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Every reloop keeps something useful out of a landfill. Environmental values are estimates.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {big.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 25 }}
            className={`rounded-[2rem] border-[3px] border-foreground p-7 shadow-[6px_6px_0_#111] ${b.tone}`}
          >
            <b.icon className="mb-4 h-8 w-8" strokeWidth={2.2} />
            <div className="font-display text-5xl font-extrabold">
              <Counter to={b.k} prefix={b.prefix} suffix={b.suffix} format={b.fmt} />
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-widest opacity-80">{b.label}</div>
          </motion.div>
        ))}
      </div>

      <h2 className="mt-14 mb-5 font-display text-2xl font-extrabold uppercase">Where items went</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {breakdown.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-3xl border-[3px] border-foreground bg-card p-5 shadow-[4px_4px_0_#111]"
          >
            <b.icon className="mb-3 h-6 w-6" strokeWidth={2.2} />
            <div className="font-display text-3xl font-extrabold"><Counter to={b.k} /></div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{b.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
