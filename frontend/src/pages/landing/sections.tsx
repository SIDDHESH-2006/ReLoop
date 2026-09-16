import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowRight,
  Recycle,
  Wrench,
  Sparkles,
  ScanLine,
  HandCoins,
  MapPin,
  Leaf,
  Repeat,
} from "lucide-react";
import Counter from "../../components/Counter";
import ListingCard from "../../components/ListingCard";
import { Button, Eyebrow, Pill, ScoreRing } from "../../components/ui";
import { RadialEmblem } from "../../components/effects";
import { seedListings } from "../../lib/mockData";

/* ============ STAT RIBBON ============ */
export function StatRibbon() {
  const stats = [
    { value: 1284, label: "Items recirculated" },
    { value: 342, label: "Items repaired" },
    { value: 98, label: "Items upcycled" },
    { value: 2.4, label: "Value recirculated", prefix: "₹", suffix: "L", isDecimal: true },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border-[3px] border-foreground bg-foreground p-6 shadow-[6px_6px_0_#00df81] md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center text-white">
            <div className="font-display text-4xl font-extrabold text-primary md:text-5xl">
              {s.isDecimal ? (
                <>
                  {s.prefix}
                  {s.value}
                  {s.suffix}
                </>
              ) : (
                <Counter to={s.value} />
              )}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ DIAGONAL MARQUEE ============ */
function MarqueeRow({ text, tone, reverse }: { text: string; tone: "mint" | "amber"; reverse?: boolean }) {
  const bg = tone === "mint" ? "bg-primary text-primary-foreground" : "bg-amber text-foreground";
  const items = Array(6).fill(text);
  return (
    <div className={`flex border-y-[3px] border-foreground ${bg}`}>
      <div className={`flex shrink-0 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-4 whitespace-nowrap px-6 py-3 font-display text-xl font-extrabold uppercase md:text-2xl">
            {t} <Recycle className="h-5 w-5" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function DiagonalMarquee() {
  return (
    <section className="relative z-10 my-16 overflow-hidden py-6">
      <div className="-mx-8 -rotate-3 space-y-1">
        <MarqueeRow text="Find a second life" tone="mint" />
        <MarqueeRow text="Reloop — keep it circulating" tone="amber" reverse />
        <MarqueeRow text="Sell • Reuse • Repair • Upcycle" tone="mint" />
      </div>
    </section>
  );
}

/* ============ WHY RELOOP ============ */
export function WhyReloop() {
  const cards = [
    { icon: ScanLine, title: "Understand any item", body: "Snap a photo and Reloop reads category, material and condition in seconds.", tone: "bg-white" },
    { icon: Repeat, title: "Circular decision engine", body: "We rank every possible next life — sell, repair, upcycle or recycle.", tone: "bg-primary text-primary-foreground" },
    { icon: MapPin, title: "Match on campus", body: "Connect with the nearest student or repair hub, not a stranger across the city.", tone: "bg-white" },
    { icon: Leaf, title: "Track real impact", body: "Every handover updates a waste passport and your circular footprint.", tone: "bg-amber" },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Why Reloop</Eyebrow>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
            Not a marketplace. A whole loop.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Most apps only help you sell. Reloop decides the smartest next life for an item — and keeps it moving.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.06 }}
            className={`flex flex-col rounded-3xl border-[3px] border-foreground p-5 shadow-[4px_4px_0_#111] nb-hover ${c.tone}`}
          >
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-2 border-foreground bg-background text-foreground">
              <c.icon className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <h3 className="font-display text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-sm opacity-80">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ CIRCULAR DECISION ENGINE DEMO ============ */
export function DecisionEngineDemo() {
  const alts = [
    { life: "UPCYCLE", score: 78, icon: Sparkles },
    { life: "RECYCLE", score: 61, icon: Recycle },
  ];
  return (
    <section id="engine" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid items-center gap-8 rounded-[2rem] border-[3px] border-foreground bg-foreground p-6 text-white shadow-[8px_8px_0_#ffb020] md:p-10 lg:grid-cols-2">
        <div>
          <Pill tone="mint" className="mb-5"><Repeat className="h-3 w-3" /> Circular Decision Engine</Pill>
          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
            The product<br /> differentiator.
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Feed in any item. Reloop scores reusability, repairability, upcyclability and recyclability — then
            recommends the single best next life, with alternatives.
          </p>
          <Button to="/analyze" variant="mint" className="mt-7">
            Try the analyzer <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="rounded-3xl border-[3px] border-foreground bg-background p-5 text-foreground shadow-[6px_6px_0_#00df81]"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Recommended action</span>
            <RadialEmblem size={64} />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="font-display text-5xl font-extrabold text-foreground">REPAIR</div>
              <div className="mt-1 max-w-xs text-sm text-muted-foreground">
                "High repairability and strong reuse potential once fixed."
              </div>
            </div>
            <ScoreRing score={91} size={88} label="score" />
          </div>
          <div className="mt-5 border-t-2 border-dashed border-foreground/20 pt-4">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Alternatives</div>
            <div className="flex gap-3">
              {alts.map((a) => (
                <div key={a.life} className="flex flex-1 items-center gap-2 rounded-2xl border-2 border-foreground bg-white px-3 py-2">
                  <a.icon className="h-4 w-4" />
                  <div>
                    <div className="font-display text-sm font-bold">{a.life}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{a.score}/100</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ MARKETPLACE PREVIEW ============ */
export function MarketplacePreview() {
  const preview = seedListings.slice(0, 4);
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Marketplace</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
            Fresh on campus
          </h2>
        </div>
        <Button to="/marketplace" variant="white">
          Browse all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((l, i) => (
          <ListingCard key={l.id} listing={l} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ============ IMPACT PREVIEW ============ */
export function ImpactPreview() {
  const items = [
    { icon: HandCoins, k: "₹2.4L", v: "Value recirculated" },
    { icon: Wrench, k: "342", v: "Items repaired" },
    { icon: Recycle, k: "176", v: "Items recycled" },
    { icon: Leaf, k: "3.1T", v: "Waste avoided (est.)" },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-[2rem] border-[3px] border-foreground bg-primary p-6 shadow-[8px_8px_0_#111] md:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-lg font-display text-4xl font-extrabold uppercase leading-[0.95] text-primary-foreground md:text-5xl">
            The campus is keeping it circular.
          </h2>
          <Button to="/impact" variant="dark">
            See full impact <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.v} className="rounded-3xl border-[3px] border-foreground bg-background p-5 shadow-[4px_4px_0_#111]">
              <it.icon className="mb-3 h-6 w-6" strokeWidth={2.2} />
              <div className="font-display text-3xl font-extrabold">{it.k}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{it.v}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-primary-foreground/70">* Environmental values are estimates.</p>
      </div>
    </section>
  );
}

/* ============ TESTIMONIAL BENTO ============ */
export function TestimonialBento() {
  const t = [
    { quote: "Sold my unused jacket in one day.", name: "Aarav", meta: "CSE • 3rd Year", tone: "bg-white", span: "sm:col-span-2" },
    { quote: "The analyzer told me my broken chair was worth repairing, not trashing.", name: "Ananya", meta: "Design • 1st Year", tone: "bg-amber", span: "sm:row-span-2" },
    { quote: "Swapped my calculator for a lab coat. Zero rupees spent.", name: "Rahul", meta: "Mechanical • 4th Year", tone: "bg-foreground text-white", span: "" },
    { quote: "Found a cycle two blocks from my hostel.", name: "Kabir", meta: "Civil • 3rd Year", tone: "bg-white", span: "" },
    { quote: "Donating cardboard boxes felt effortless.", name: "Riya", meta: "ECE • 2nd Year", tone: "bg-primary text-primary-foreground", span: "sm:col-span-2" },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <Eyebrow>Loved on campus</Eyebrow>
      <h2 className="mt-3 mb-8 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
        Students in the loop
      </h2>
      <div className="grid auto-rows-[minmax(0,1fr)] gap-4 sm:grid-cols-3">
        {t.map((c, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.05 }}
            className={`flex flex-col justify-between rounded-3xl border-[3px] border-foreground p-5 shadow-[4px_4px_0_#111] nb-hover ${c.tone} ${c.span}`}
          >
            <div>
              <div className="font-mono text-sm tracking-widest text-amber">★★★★★</div>
              <blockquote className="mt-3 font-display text-xl font-bold leading-snug">"{c.quote}"</blockquote>
            </div>
            <figcaption className="mt-5 font-mono text-xs uppercase tracking-widest opacity-70">
              {c.name} — {c.meta}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ============ FINAL CTA ============ */
export function FinalCTA() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-foreground bg-background p-10 text-center shadow-[8px_8px_0_#111] md:p-16">
        <div className="pointer-events-none absolute -left-6 -top-6 opacity-20">
          <RadialEmblem size={140} />
        </div>
        <div className="pointer-events-none absolute -bottom-6 -right-6 opacity-20">
          <RadialEmblem size={140} />
        </div>
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
          Give your next item a <span className="text-primary">next life.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Join students already keeping their campus circular — one item at a time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/list" variant="mint">List an item <ArrowRight className="h-4 w-4" /></Button>
          <Button to="/analyze" variant="amber">Analyze an item</Button>
        </div>
      </div>
    </section>
  );
}
