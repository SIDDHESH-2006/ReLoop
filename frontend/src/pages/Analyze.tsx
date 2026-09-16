import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ImagePlus, Loader2, Recycle, Sparkles } from "lucide-react";
import { Button, Eyebrow, Pill, ScoreRing, cx, nextLifeColor } from "../components/ui";
import { analyzeItem, getDecision } from "../lib/api/analysis";
import type { AnalysisResult, Decision } from "../lib/types";

const examples = ["Broken hostel chair", "Nike jacket, worn once", "Charger with frayed cable", "Old textbook"];

export default function Analyze() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [decision, setDecision] = useState<Decision | null>(null);

  const run = async (input?: string) => {
    const q = input ?? text;
    if (!q.trim()) return;
    setText(q);
    setLoading(true);
    setResult(null);
    setDecision(null);
    const r = await analyzeItem(q);
    setResult(r);
    const d = await getDecision(r);
    setDecision(d);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <Eyebrow>Circular Decision Engine</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95] md:text-6xl">Analyze an item</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Describe your item — Reloop reads its material and condition, then recommends the best next life.
      </p>

      {/* input */}
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-3 rounded-3xl border-[3px] border-foreground bg-white px-4 py-2 shadow-[4px_4px_0_#111]">
          <ImagePlus className="h-5 w-5 shrink-0" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Describe the item (or upload a photo)…"
            className="w-full bg-transparent py-2 outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Button onClick={() => run()} disabled={loading} variant="mint">
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing</> : <>Analyze <Sparkles className="h-4 w-4" /></>}
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button key={ex} onClick={() => run(ex)} className="rounded-full border-2 border-foreground bg-background px-3 py-1 font-mono text-xs font-bold hover:bg-muted">
            {ex}
          </button>
        ))}
      </div>

      {/* loading skeleton */}
      <AnimatePresence>
        {loading && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 grid gap-4 md:grid-cols-2">
            {[0, 1].map((i) => <div key={i} className="h-56 animate-pulse rounded-3xl border-[3px] border-foreground bg-muted" />)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* analysis panel */}
            <div className="rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-[6px_6px_0_#111]">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="dark">{result.category}</Pill>
                <Pill tone="muted" className="border">{result.material}</Pill>
                <Pill tone="amber">{result.condition}</Pill>
              </div>
              <div className="mt-6 space-y-4">
                {([
                  ["Reusability", result.scores.reusability],
                  ["Repairability", result.scores.repairability],
                  ["Upcyclability", result.scores.upcyclability],
                  ["Recyclability", result.scores.recyclability],
                ] as const).map(([label, val], i) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between font-mono text-xs font-bold uppercase">
                      <span>{label}</span><span>{val}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full border-2 border-foreground bg-white">
                      <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* decision panel */}
            <div className="rounded-3xl border-[3px] border-foreground bg-foreground p-6 text-white shadow-[6px_6px_0_#00df81]">
              {!decision ? (
                <div className="flex h-full items-center justify-center gap-2 text-white/70"><Loader2 className="h-5 w-5 animate-spin" /> Deciding next life…</div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/60">Recommended action</span>
                    <Recycle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="font-display text-6xl font-extrabold" style={{ color: nextLifeColor[decision.recommended] }}>
                      {decision.recommended}
                    </div>
                    <ScoreRing score={decision.circularScore} size={92} label="score" />
                  </div>
                  <p className="mt-3 text-white/70">"{decision.reason}"</p>
                  <div className="mt-6 border-t-2 border-dashed border-white/20 pt-4">
                    <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-white/50">Alternatives</div>
                    <div className="flex gap-3">
                      {decision.alternatives.map((a) => (
                        <div key={a} className="flex-1 rounded-2xl border-2 border-white/40 bg-white/10 px-3 py-2 font-display text-lg font-bold">{a}</div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* next-life visualization */}
      {decision && <NextLifeFlow action={decision.recommended} />}
    </div>
  );
}

function NextLifeFlow({ action }: { action: string }) {
  const steps = ["ITEM", "ANALYZE", "POSSIBLE FUTURES", `${action}`, "NEW OWNER / USE"];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12">
      <h2 className="mb-6 font-display text-2xl font-extrabold uppercase">The next life journey</h2>
      <div className="flex flex-wrap items-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 400, damping: 22 }}
              className={cx(
                "rounded-2xl border-[3px] border-foreground px-4 py-3 font-display font-extrabold uppercase shadow-[4px_4px_0_#111]",
                i === 3 ? "bg-primary text-primary-foreground text-xl" : "bg-white",
              )}
            >
              {s}
            </motion.div>
            {i < steps.length - 1 && <ArrowRight className="h-5 w-5 shrink-0" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
