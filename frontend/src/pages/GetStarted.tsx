import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, GraduationCap, UtensilsCrossed, Recycle, HeartHandshake } from "lucide-react";
import { Eyebrow } from "../components/ui";
import { RadialEmblem } from "../components/effects";

const roles = [
  {
    to: "/marketplace",
    icon: GraduationCap,
    title: "Student Login",
    body: "Buy, sell, exchange, donate and give your unused items a new life within campus.",
    tone: "bg-primary text-primary-foreground",
    cta: "Enter marketplace",
  },
  {
    to: "/food-institutions",
    icon: UtensilsCrossed,
    title: "Food Institutions",
    body: "Manage food waste and connect surplus or organic waste with the right processing partners.",
    tone: "bg-white",
    cta: "Start setup",
  },
  {
    to: "/recyclers-upcyclers",
    icon: Recycle,
    title: "Recyclers / Upcyclers",
    body: "Connect recyclable materials and reusable waste with organisations that can recover or transform them.",
    tone: "bg-amber",
    cta: "Start setup",
  },
  {
    to: "/ngos-donations",
    icon: HeartHandshake,
    title: "NGOs / Donation Organisations",
    body: "Connect reusable items with organisations that can distribute them to people and communities in need.",
    tone: "bg-foreground text-white",
    cta: "Start setup",
  },
];

export default function GetStarted() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 md:pt-40">
      <div className="flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Eyebrow>Get started</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.92] md:text-6xl">
            How do you want to <span className="text-primary">Reloop?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Choose your role to continue.</p>
        </motion.div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {roles.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.1 + i * 0.08 }}
          >
            <Link
              to={r.to}
              data-cursor="link"
              className={`group flex h-full flex-col rounded-[1.75rem] border-[3px] border-foreground p-7 shadow-[6px_6px_0_#111] nb-hover ${r.tone}`}
            >
              <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border-2 border-foreground bg-background text-foreground">
                <r.icon className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <h2 className="font-display text-2xl font-extrabold uppercase leading-tight">{r.title}</h2>
              <p className="mt-3 text-sm opacity-80">{r.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest">
                {r.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center opacity-40">
        <RadialEmblem size={110} />
      </div>
    </section>
  );
}
