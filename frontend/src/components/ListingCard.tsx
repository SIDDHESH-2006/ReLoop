import { Link } from "react-router";
import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles } from "lucide-react";
import type { Listing } from "../lib/types";
import { Pill, opTone, cx } from "./ui";
import { useStore } from "../lib/store";

export default function ListingCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  const { saved, toggleSaved } = useStore();
  const isSaved = saved.has(listing.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 400, damping: 25, delay: (index % 4) * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border-[3px] border-foreground bg-card shadow-[4px_4px_0_#111] nb-hover"
    >
      <Link to={`/marketplace/${listing.id}`} className="block" data-cursor="link">
        <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-foreground bg-muted">
          <img
            src={listing.image}
            alt={listing.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <Pill tone={opTone(listing.operation)}>{listing.operation}</Pill>
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border-2 border-foreground bg-white px-2 py-1 font-mono text-xs font-bold">
            <Sparkles className="h-3 w-3 text-primary" fill="#00df81" /> {listing.circularScore}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/marketplace/${listing.id}`} data-cursor="link">
            <h3 className="font-display text-lg font-bold leading-tight">{listing.name}</h3>
          </Link>
          <button
            onClick={() => toggleSaved(listing.id)}
            aria-label={isSaved ? "Remove from saved" : "Save item"}
            className={cx(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-foreground transition-colors",
              isSaved ? "bg-amber" : "bg-white hover:bg-muted",
            )}
          >
            <Heart className="h-4 w-4" fill={isSaved ? "#111" : "none"} />
          </button>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Pill tone="muted" className="border">{listing.condition}</Pill>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {listing.location}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t-2 border-dashed border-foreground/20 pt-3">
          <div>
            <div className="font-display text-2xl font-extrabold">
              {listing.price > 0 ? `₹${listing.price.toLocaleString("en-IN")}` : listing.operation === "DONATE" ? "Free" : "Swap"}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {listing.seller.name} · {listing.seller.course}
            </div>
          </div>
          <Link
            to={`/marketplace/${listing.id}`}
            data-cursor="link"
            className="rounded-full border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
