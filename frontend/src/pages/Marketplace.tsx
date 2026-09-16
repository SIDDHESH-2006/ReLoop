import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import ListingCard from "../components/ListingCard";
import { Eyebrow, Pill, cx } from "../components/ui";
import { useStore } from "../lib/store";
import type { Category, Condition, Operation } from "../lib/types";

const categories: (Category | "All")[] = ["All", "Clothing", "Books", "Electronics", "Furniture", "Sports", "Packaging"];
const operations: (Operation | "All")[] = ["All", "SELL", "EXCHANGE", "DONATE"];
const conditions: (Condition | "All")[] = ["All", "New", "Like New", "Good", "Fair", "Damaged"];

export default function Marketplace() {
  const { listings } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [op, setOp] = useState<Operation | "All">("All");
  const [cond, setCond] = useState<Condition | "All">("All");
  const [maxPrice, setMaxPrice] = useState(5000);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (q && !`${l.name} ${l.description} ${l.seller.name}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "All" && l.category !== cat) return false;
      if (op !== "All" && l.operation !== op) return false;
      if (cond !== "All" && l.condition !== cond) return false;
      if (l.price > maxPrice) return false;
      return true;
    });
  }, [listings, q, cat, op, cond, maxPrice]);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-10">
      <Eyebrow>Marketplace</Eyebrow>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] md:text-6xl">Find your next thing</h1>
        <span className="font-mono text-sm text-muted-foreground">{filtered.length} items on campus</span>
      </div>

      {/* search */}
      <div className="mt-8 flex items-center gap-3 rounded-full border-[3px] border-foreground bg-white px-4 py-2 shadow-[4px_4px_0_#111]">
        <Search className="h-5 w-5 shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search items, sellers, keywords…"
          className="w-full bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* filters */}
        <aside className="h-fit rounded-3xl border-[3px] border-foreground bg-card p-5 shadow-[4px_4px_0_#111] lg:sticky lg:top-28">
          <div className="mb-4 flex items-center gap-2 font-display text-lg font-bold">
            <SlidersHorizontal className="h-5 w-5" /> Filters
          </div>

          <FilterGroup label="Operation">
            {operations.map((o) => (
              <FilterPill key={o} active={op === o} onClick={() => setOp(o)}>{o}</FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Category">
            {categories.map((c) => (
              <FilterPill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Condition">
            {conditions.map((c) => (
              <FilterPill key={c} active={cond === c} onClick={() => setCond(c)}>{c}</FilterPill>
            ))}
          </FilterGroup>

          <div className="mt-5">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Max price · ₹{maxPrice.toLocaleString("en-IN")}
            </div>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#00df81]"
            />
          </div>
        </aside>

        {/* grid */}
        <div>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border-[3px] border-dashed border-foreground/40 p-16 text-center">
              <p className="font-display text-2xl font-bold">Nothing matches yet.</p>
              <p className="mt-2 text-muted-foreground">Try widening your filters.</p>
            </motion.div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((l, i) => (
                <ListingCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border-2 border-foreground px-3 py-1 font-mono text-xs font-bold uppercase transition-colors",
        active ? "bg-foreground text-white" : "bg-white hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
