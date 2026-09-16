import { motion } from "framer-motion";
import {
  ArrowRight,
  ScanLine,
  Sparkles,
  GitMerge,
  Repeat,
  Recycle,
  UtensilsCrossed,
  HeartHandshake,
  GraduationCap,
  ShoppingBag,
  Leaf,
} from "lucide-react";
import { Button, Eyebrow, Pill } from "../components/ui";
import { RadialEmblem } from "../components/effects";

const services = [
  {
    n: "01",
    title: "Student Reuse Marketplace",
    body: "Students can buy, sell, exchange and donate unused items within the campus ecosystem.",
    tone: "bg-primary text-primary-foreground",
    icon: ShoppingBag,
  },
  {
    n: "02",
    title: "Food Waste Management",
    body: "Food institutions can report waste and connect organic waste with appropriate processing partners.",
    tone: "bg-white",
    icon: UtensilsCrossed,
  },
  {
    n: "03",
    title: "Recycling & Upcycling Network",
    body: "Reloop connects material streams with organisations capable of recycling, refurbishing, upcycling or recovering materials.",
    tone: "bg-amber",
    icon: Recycle,
  },
  {
    n: "04",
    title: "Donation & Social Impact",
    body: "Reusable products can be directed toward NGOs and donation organisations that redistribute them to communities in need.",
    tone: "bg-foreground text-white",
    icon: HeartHandshake,
  },
];

const steps = [
  { label: "Identify", icon: ScanLine },
  { label: "Analyze", icon: Sparkles },
  { label: "Match", icon: GitMerge },
  { label: "Reuse / Repair / Recycle", icon: Repeat },
  { label: "Track Impact", icon: Leaf },
];

const network = [
  { who: "Students", flow: "Reusable Items", icon: GraduationCap, tone: "bg-white" },
  { who: "Food Institutions", flow: "Food Waste", icon: UtensilsCrossed, tone: "bg-amber" },
  { who: "Recyclers / Upcyclers", flow: "Recovery / Transformation", icon: Recycle, tone: "bg-white" },
  { who: "NGOs", flow: "Donation / Redistribution", icon: HeartHandshake, tone: "bg-primary text-primary-foreground" },
];

export default function About() {
  return (
    <>
      {/* ===== WHAT IS RELOOP ===== */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-12 md:pt-44">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Pill tone="mint" className="mb-6">About Reloop</Pill>
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.92] md:text-6xl">
              Keep products, materials & resources in use.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Reloop is a circular-economy platform designed to keep products, materials and resources in use for
              as long as possible. Instead of allowing useful items to become waste, Reloop connects them with their
              next possible owner, processor, recycler, upcycler, food-waste processor or donation organisation.
            </p>
            <Button to="/get-started" variant="mint" className="mt-8 px-8 py-4 text-base">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <div className="hidden justify-center lg:flex">
            <RadialEmblem size={220} />
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-3 mb-10 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
          Four services. One loop.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.06 }}
              className={`flex flex-col rounded-3xl border-[3px] border-foreground p-7 shadow-[4px_4px_0_#111] nb-hover ${s.tone}`}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-extrabold opacity-30">{s.n}</span>
                <s.icon className="h-7 w-7" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm opacity-80">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2rem] border-[3px] border-foreground bg-foreground p-6 text-white shadow-[8px_8px_0_#00df81] md:p-10">
          <Pill tone="mint" className="mb-6"><Repeat className="h-3 w-3" /> How Reloop works</Pill>
          <h2 className="mb-10 max-w-lg font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
            From item to impact.
          </h2>
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 md:flex-1 md:flex-col md:text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 380, damping: 24, delay: i * 0.08 }}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/5 px-4 py-3 md:flex-col md:gap-2"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-foreground bg-primary text-primary-foreground">
                    <s.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="font-display text-sm font-bold uppercase leading-tight">{s.label}</span>
                </motion.div>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-primary md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROLE NETWORK ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <Eyebrow>The network</Eyebrow>
        <h2 className="mt-3 mb-10 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
          Everyone in the loop.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {network.map((n, i) => (
            <motion.div
              key={n.who}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.06 }}
              className={`rounded-3xl border-[3px] border-foreground p-6 shadow-[4px_4px_0_#111] nb-hover ${n.tone}`}
            >
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-2 border-foreground bg-background text-foreground">
                <n.icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <h3 className="font-display text-xl font-bold uppercase">{n.who}</h3>
              <div className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">
                <ArrowRight className="h-3.5 w-3.5" /> {n.flow}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          All connected through <span className="text-foreground">Reloop</span>
        </p>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-foreground bg-primary p-10 text-center shadow-[8px_8px_0_#111] md:p-16">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.95] text-primary-foreground md:text-6xl">
            Ready to find the next best life?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/get-started" variant="dark" className="px-8 py-4 text-base">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/" variant="white" className="px-8 py-4 text-base">
              Back to home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
