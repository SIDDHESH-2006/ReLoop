import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Heart, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button, Pill, ScoreRing, opTone, cx } from "../components/ui";
import { useStore } from "../lib/store";
import { getMatches } from "../lib/api/matching";
import type { Listing, Match } from "../lib/types";

export default function ItemDetail() {
  const { id } = useParams();
  const { listings, saved, toggleSaved, interested, expressInterest } = useStore();
  const listing = listings.find((l) => l.id === id) as Listing | undefined;

  const [matches, setMatches] = useState<Match[] | null>(null);
  useEffect(() => {
    setMatches(null);
    if (id) getMatches(id).then(setMatches);
  }, [id]);

  if (!listing) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-20 text-center">
        <h1 className="font-display text-4xl font-extrabold">Item not found</h1>
        <Button to="/marketplace" className="mt-6">Back to marketplace</Button>
      </div>
    );
  }

  const isSaved = saved.has(listing.id);
  const hasInterest = interested.has(listing.id);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-10">
      <Link to="/marketplace" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase hover:text-primary" data-cursor="link">
        <ArrowLeft className="h-4 w-4" /> Marketplace
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* image */}
        <div className="relative overflow-hidden rounded-3xl border-[3px] border-foreground bg-muted shadow-[6px_6px_0_#111]">
          <img src={listing.image} alt={listing.name} className="aspect-square w-full object-cover" />
          <div className="absolute left-4 top-4">
            <Pill tone={opTone(listing.operation)}>{listing.operation}</Pill>
          </div>
        </div>

        {/* info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">{listing.name}</h1>
            <ScoreRing score={listing.circularScore} label="circular" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Pill tone="muted" className="border">{listing.condition}</Pill>
            <Pill tone="muted" className="border">{listing.category}</Pill>
            <span className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {listing.location}
            </span>
          </div>

          <p className="mt-5 text-muted-foreground">{listing.description}</p>

          <div className="mt-6 font-display text-5xl font-extrabold">
            {listing.price > 0 ? `₹${listing.price.toLocaleString("en-IN")}` : listing.operation === "DONATE" ? "Free" : "Swap"}
          </div>

          {/* seller */}
          <div className="mt-6 flex items-center gap-3 rounded-3xl border-[3px] border-foreground bg-card p-4 shadow-[4px_4px_0_#111]">
            <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-foreground bg-amber font-mono font-bold">
              {listing.seller.avatar}
            </span>
            <div className="flex-1">
              <div className="font-display font-bold">{listing.seller.name}</div>
              <div className="font-mono text-xs text-muted-foreground">{listing.seller.course} · {listing.seller.year}</div>
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-sm font-bold">
              <Star className="h-4 w-4 fill-amber text-amber" /> {listing.seller.rating}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => expressInterest(listing.id)} variant={hasInterest ? "dark" : "mint"} disabled={hasInterest}>
              {hasInterest ? <><Check className="h-4 w-4" /> Interest sent</> : "Express interest"}
            </Button>
            <button
              onClick={() => toggleSaved(listing.id)}
              className={cx(
                "inline-flex items-center gap-2 rounded-full border-[3px] border-foreground px-5 py-3 font-mono text-sm font-bold uppercase shadow-[4px_4px_0_#111] nb-hover",
                isSaved ? "bg-amber" : "bg-white",
              )}
            >
              <Heart className="h-4 w-4" fill={isSaved ? "#111" : "none"} /> {isSaved ? "Saved" : "Save"}
            </button>
            <Button to={`/passport/${listing.id}`} variant="white">
              <ShieldCheck className="h-4 w-4" /> Passport
            </Button>
          </div>
        </div>
      </div>

      {/* matches */}
      <section className="mt-14">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" fill="#00df81" />
          <h2 className="font-display text-3xl font-extrabold uppercase">Potential matches</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <AnimatePresence>
            {!matches
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="h-48 animate-pulse rounded-3xl border-[3px] border-foreground bg-muted" />
                ))
              : matches.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                    className="rounded-3xl border-[3px] border-foreground bg-card p-5 shadow-[4px_4px_0_#111]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-foreground bg-primary font-mono font-bold text-primary-foreground">
                        {m.avatar}
                      </span>
                      <span className="font-display text-3xl font-extrabold">{m.percent}%</span>
                    </div>
                    <div className="mt-3 font-display text-lg font-bold">{m.student}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.note}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {Object.entries(m.reasons).filter(([, v]) => v).map(([k]) => (
                        <span key={k} className="rounded-full border border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-bold uppercase">{k}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
