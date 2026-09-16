import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, Package, Repeat, ShieldCheck, TrendingUp } from "lucide-react";
import { Eyebrow, Pill, ScoreRing, opTone } from "../components/ui";
import { useStore } from "../lib/store";
import { seedListings } from "../lib/mockData";

export default function Dashboard() {
  const { listings, saved, interested } = useStore();
  const mine = listings.filter((l) => l.seller.id === "me");
  const savedItems = listings.filter((l) => saved.has(l.id));
  const interestItems = listings.filter((l) => interested.has(l.id));

  const activity = [
    { label: "You listed a new item", when: "Just now", tone: "bg-primary" },
    { label: "Riya expressed interest in your jacket", when: "2h ago", tone: "bg-amber" },
    { label: "Passport CL-2026-0001 updated → Transferred", when: "Yesterday", tone: "bg-white" },
    { label: "You saved 'Hero Sprint Cycle'", when: "2 days ago", tone: "bg-white" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
      <Eyebrow>Student dashboard</Eyebrow>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95]">Hey, Aarav 👋</h1>
        <div className="flex items-center gap-3 rounded-full border-[3px] border-foreground bg-card px-4 py-2 shadow-[4px_4px_0_#111]">
          <ScoreRing score={87} size={48} />
          <div>
            <div className="font-display font-bold leading-none">Circular score</div>
            <div className="font-mono text-xs text-muted-foreground">Top 12% on campus</div>
          </div>
        </div>
      </div>

      {/* stat row */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Package, k: mine.length, label: "My listings" },
          { icon: Repeat, k: interestItems.length, label: "My interests" },
          { icon: Heart, k: savedItems.length, label: "Saved items" },
          { icon: TrendingUp, k: 6, label: "Transactions" },
        ].map((s) => (
          <div key={s.label} className="rounded-3xl border-[3px] border-foreground bg-card p-5 shadow-[4px_4px_0_#111]">
            <s.icon className="mb-3 h-6 w-6" strokeWidth={2.2} />
            <div className="font-display text-3xl font-extrabold">{s.k}</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* listings */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold uppercase">My listings</h2>
          <div className="space-y-3">
            {(mine.length ? mine : seedListings.slice(0, 2)).map((l) => (
              <Link
                key={l.id}
                to={`/marketplace/${l.id}`}
                className="flex items-center gap-4 rounded-3xl border-[3px] border-foreground bg-card p-3 shadow-[4px_4px_0_#111] nb-hover"
                data-cursor="link"
              >
                <img src={l.image} alt={l.name} className="h-16 w-16 rounded-2xl border-2 border-foreground object-cover" />
                <div className="flex-1">
                  <div className="font-display font-bold">{l.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{l.location}</div>
                </div>
                <Pill tone={opTone(l.operation)}>{l.operation}</Pill>
                <div className="font-display text-xl font-extrabold">
                  {l.price > 0 ? `₹${l.price.toLocaleString("en-IN")}` : "Free"}
                </div>
              </Link>
            ))}
          </div>

          <h2 className="mb-4 mt-8 font-display text-2xl font-extrabold uppercase">Waste passports</h2>
          <Link
            to="/passport/CL-2026-0001"
            className="flex items-center gap-3 rounded-3xl border-[3px] border-foreground bg-primary p-4 text-primary-foreground shadow-[4px_4px_0_#111] nb-hover"
            data-cursor="link"
          >
            <ShieldCheck className="h-6 w-6" />
            <div className="flex-1">
              <div className="font-display font-bold">Nike Windrunner Jacket</div>
              <div className="font-mono text-xs">CL-2026-0001 · Transferred</div>
            </div>
            <span className="font-mono text-sm font-bold uppercase">View →</span>
          </Link>
        </section>

        {/* activity */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold uppercase">Activity</h2>
          <ol className="space-y-3">
            {activity.map((a, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 rounded-3xl border-[3px] border-foreground bg-card p-4 shadow-[4px_4px_0_#111]"
              >
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-foreground ${a.tone}`} />
                <div>
                  <div className="text-sm font-semibold">{a.label}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{a.when}</div>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
