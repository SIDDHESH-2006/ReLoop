import { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowRight,
  ScanLine,
  Sparkles,
  GitMerge,
  Repeat,
  Leaf,
  GraduationCap,
  UtensilsCrossed,
  Recycle,
  HeartHandshake,
} from "lucide-react";
import { Button, Eyebrow, Pill } from "../ui";
import { RadialEmblem } from "../effects";

/* ============ HOW RELOOP WORKS ============ */
const steps = [
  { label: "Identify", icon: ScanLine },
  { label: "Analyze", icon: Sparkles },
  { label: "Match", icon: GitMerge },
  { label: "Reuse / Repair / Recycle", icon: Repeat },
  { label: "Track Impact", icon: Leaf },
];

export function HowReloopWorks() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-[2rem] border-[3px] border-foreground bg-foreground p-6 text-white shadow-[8px_8px_0_#00df81] md:p-10">
        <Pill tone="mint" className="mb-6">
          <Repeat className="h-3 w-3" /> How Reloop works
        </Pill>
        <h2 className="mb-10 max-w-lg font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
          From item to impact.
        </h2>
        <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
          {steps.map((s, i) => (
            <Fragment key={s.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 380, damping: 24, delay: i * 0.08 }}
                className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-white/30 bg-white/5 px-4 py-6 text-center"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-foreground bg-primary text-primary-foreground">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="font-display text-sm font-bold uppercase leading-tight">{s.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-primary md:block" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ROLE FUNNEL — who's in the loop ============ */
const roles = [
  {
    to: "/marketplace",
    icon: GraduationCap,
    title: "Students",
    flow: "Reusable Items",
    body: "Buy, sell, exchange and donate unused items within campus.",
    tone: "bg-primary text-primary-foreground",
  },
  {
    to: "/food-institutions",
    icon: UtensilsCrossed,
    title: "Food Institutions",
    flow: "Food Waste",
    body: "Connect surplus and organic waste with the right processing partners.",
    tone: "bg-white",
  },
  {
    to: "/recyclers-upcyclers",
    icon: Recycle,
    title: "Recyclers / Upcyclers",
    flow: "Recovery / Transformation",
    body: "Recover, refurbish, upcycle and transform recyclable material streams.",
    tone: "bg-amber",
  },
  {
    to: "/ngos-donations",
    icon: HeartHandshake,
    title: "NGOs",
    flow: "Donation / Redistribution",
    body: "Redistribute reusable items to people and communities in need.",
    tone: "bg-foreground text-white",
  },
];

export function RoleFunnel() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Who's in the loop</Eyebrow>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
            One platform. Four participants.
          </h2>
        </div>
        <Button to="/get-started" variant="dark">
          Choose your role <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.06 }}
          >
            <Link
              to={r.to}
              data-cursor="link"
              className={`group flex h-full flex-col rounded-3xl border-[3px] border-foreground p-6 shadow-[4px_4px_0_#111] nb-hover ${r.tone}`}
            >
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-2 border-foreground bg-background text-foreground">
                <r.icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <h3 className="font-display text-xl font-bold uppercase leading-tight">{r.title}</h3>
              <p className="mt-2 text-sm opacity-80">{r.body}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">
                <ArrowRight className="h-3.5 w-3.5" /> {r.flow}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        All connected through <span className="text-foreground">Reloop</span>
      </p>
    </section>
  );
}

/* ============ FINAL CTA ============ */
export function LandingFinalCTA() {
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
          Join the loop keeping campuses and communities circular — one item at a time.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button to="/get-started" variant="mint" className="px-9 py-4 text-base">
            Get started <ArrowRight className="h-4 w-4" />
          </Button>
          <Button to="/about" variant="amber" className="px-9 py-4 text-base">
            Explore about us
          </Button>
        </div>
      </div>
    </section>
  );
}
