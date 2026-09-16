import { motion } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ArrowRight, Pencil, Recycle, TrendingUp } from "lucide-react";
import { Button, Eyebrow, Pill, ScoreRing, cx } from "../../components/ui";
import { analyzeSellingPrice, type SellDraft } from "../../lib/api/selling";

export default function SellAnalysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const draft = (location.state as { draft?: SellDraft } | null)?.draft;

  // No draft means the page was opened directly — send the student back to the form.
  if (!draft) return <Navigate to="/sell" replace />;

  const result = analyzeSellingPrice(draft);
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const edit = () => navigate("/sell", { state: { draft } });

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <Eyebrow>Circular Decision Engine</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95] md:text-6xl">Sell analysis</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        {draft.productName ? `"${draft.productName}"` : "Your item"} — here's how Reloop reads its selling path.
      </p>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* analysis panel */}
        <div className="rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-[6px_6px_0_#111]">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="dark">{draft.category || "Item"}</Pill>
            <Pill tone="muted" className="border">{result.material}</Pill>
            <Pill tone="amber">{draft.condition || "Unrated"}</Pill>
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
                  <span>{label}</span>
                  <span>{val}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full border-2 border-foreground bg-white">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button onClick={edit} variant="white">
              <Pencil className="h-4 w-4" /> Edit
            </Button>
          </div>
        </div>

        {/* selling recommendation panel */}
        <div className="rounded-3xl border-[3px] border-foreground bg-foreground p-6 text-white shadow-[6px_6px_0_#00df81]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-white/60">Selling analysis</span>
            <Recycle className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="font-display text-3xl font-extrabold uppercase leading-[0.95] text-primary md:text-4xl">
              {result.recommendation}
            </div>
            <ScoreRing score={result.fitScore} size={92} label="fit" />
          </div>
          <p className="mt-3 text-white/70">"{result.reason}"</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t-2 border-dashed border-white/20 pt-4">
            <div className="rounded-2xl border-2 border-white/40 bg-white/10 px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">Suggested price</div>
              <div className="mt-1 font-display text-2xl font-extrabold">{inr(result.suggestedPrice)}</div>
            </div>
            <div className="rounded-2xl border-2 border-white/40 bg-white/10 px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">Recommended range</div>
              <div className="mt-1 font-display text-lg font-extrabold">
                {inr(result.priceRange[0])} – {inr(result.priceRange[1])}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* next-life journey adapted to the selling workflow */}
      <NextLifeFlow />

      {/* actions below the journey */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <Button
          onClick={() => navigate("/list", { state: { price: Number(draft.targetPrice) || undefined } })}
          variant="mint"
          className="px-9 py-4 text-base"
        >
          Proceed to sell <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => navigate("/list", { state: { price: result.suggestedPrice } })}
          variant="amber"
          className="px-9 py-4 text-base"
        >
          Proceed with the suggestion <TrendingUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function NextLifeFlow() {
  const steps = ["ITEM", "ANALYZE", "SELLING ANALYSIS", "RECOMMENDED PRICE", "NEW OWNER"];
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
