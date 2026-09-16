import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button, Eyebrow, cx } from "../../components/ui";
import { RadialEmblem } from "../../components/effects";
import { FormSection, controlCx } from "../../components/onboarding/FormKit";
import {
  emptyDraft,
  sellAges,
  sellCategories,
  sellConditions,
  type SellDraft,
} from "../../lib/api/selling";

function FieldLabel({ children, span }: { children: ReactNode; span?: boolean }) {
  return (
    <span
      className={cx(
        "mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground",
        span && "sm:col-span-2",
      )}
    >
      {children}
    </span>
  );
}

export default function SellItem() {
  const navigate = useNavigate();
  const location = useLocation();
  // EDIT returns here with the previously entered values so nothing is lost.
  const initial = (location.state as { draft?: SellDraft } | null)?.draft ?? emptyDraft;
  const [draft, setDraft] = useState<SellDraft>(initial);

  const set = (key: keyof SellDraft) => (value: string) => setDraft((d) => ({ ...d, [key]: value }));

  const analyse = () => navigate("/sell/analysis", { state: { draft } });

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          to="/marketplace"
          data-cursor="link"
          className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_#111] nb-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Marketplace
        </Link>
        <RadialEmblem size={72} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Eyebrow>Sell</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">Sell an item</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Tell us about the item you're selling so Reloop can determine its best selling path.
        </p>
      </motion.div>

      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          analyse();
        }}
      >
        <FormSection index={0} title="Product details">
          <label className="sm:col-span-2">
            <FieldLabel>Product name</FieldLabel>
            <input
              value={draft.productName}
              onChange={(e) => set("productName")(e.target.value)}
              placeholder="e.g. Nike running jacket"
              required
              className={controlCx}
            />
          </label>
          <label>
            <FieldLabel>Product category</FieldLabel>
            <select
              value={draft.category}
              onChange={(e) => set("category")(e.target.value)}
              className={cx(controlCx, "appearance-none")}
              required
            >
              <option value="" disabled>
                Select…
              </option>
              {sellCategories.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label>
            <FieldLabel>Product brand (optional)</FieldLabel>
            <input
              value={draft.brand}
              onChange={(e) => set("brand")(e.target.value)}
              placeholder="e.g. Nike"
              className={controlCx}
            />
          </label>
        </FormSection>

        <FormSection index={1} title="Product age">
          <label className="sm:col-span-2">
            <FieldLabel>How old is the product?</FieldLabel>
            <select
              value={draft.age}
              onChange={(e) => set("age")(e.target.value)}
              className={cx(controlCx, "appearance-none")}
              required
            >
              <option value="" disabled>
                Select…
              </option>
              {sellAges.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        </FormSection>

        <FormSection index={2} title="Condition of the product">
          <div className="sm:col-span-2">
            <FieldLabel>Condition</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {sellConditions.map((o) => {
                const on = draft.condition === o;
                return (
                  <button
                    key={o}
                    type="button"
                    data-cursor="link"
                    onClick={() => set("condition")(o)}
                    className={cx(
                      "rounded-full border-2 border-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-all",
                      on
                        ? "bg-primary text-primary-foreground shadow-[3px_3px_0_#111] -translate-y-0.5"
                        : "bg-white hover:bg-muted",
                    )}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        </FormSection>

        <FormSection index={3} title="Buying price">
          <label className="sm:col-span-2">
            <FieldLabel>Original buying price</FieldLabel>
            <span className="mb-2 block text-xs text-muted-foreground">
              Approximate price paid when originally purchased.
            </span>
            <div className="flex items-center gap-2 rounded-2xl border-2 border-foreground bg-white px-4 focus-within:shadow-[3px_3px_0_#111]">
              <span className="font-display text-lg font-extrabold">₹</span>
              <input
                value={draft.buyingPrice}
                onChange={(e) => set("buyingPrice")(e.target.value.replace(/[^0-9]/g, ""))}
                inputMode="numeric"
                placeholder="4000"
                required
                className="w-full bg-transparent py-3 text-sm font-medium outline-none"
              />
            </div>
          </label>
        </FormSection>

        <FormSection index={4} title="Target selling price">
          <label className="sm:col-span-2">
            <FieldLabel>Target selling price</FieldLabel>
            <span className="mb-2 block text-xs text-muted-foreground">
              What price would you ideally like to receive?
            </span>
            <div className="flex items-center gap-2 rounded-2xl border-2 border-foreground bg-white px-4 focus-within:shadow-[3px_3px_0_#111]">
              <span className="font-display text-lg font-extrabold">₹</span>
              <input
                value={draft.targetPrice}
                onChange={(e) => set("targetPrice")(e.target.value.replace(/[^0-9]/g, ""))}
                inputMode="numeric"
                placeholder="3500"
                required
                className="w-full bg-transparent py-3 text-sm font-medium outline-none"
              />
            </div>
          </label>
        </FormSection>

        <FormSection index={5} title="Additional details">
          <label>
            <FieldLabel>Purchase year (approx.)</FieldLabel>
            <input
              value={draft.purchaseYear}
              onChange={(e) => set("purchaseYear")(e.target.value)}
              placeholder="e.g. 2023"
              className={controlCx}
            />
          </label>
          <label>
            <FieldLabel>Any defects / damage</FieldLabel>
            <input
              value={draft.defects}
              onChange={(e) => set("defects")(e.target.value)}
              placeholder="e.g. minor scuff on sleeve"
              className={controlCx}
            />
          </label>
          <label className="sm:col-span-2">
            <FieldLabel>Description</FieldLabel>
            <textarea
              value={draft.description}
              onChange={(e) => set("description")(e.target.value)}
              rows={3}
              placeholder="Anything else a buyer should know?"
              className={cx(controlCx, "resize-none")}
            />
          </label>
        </FormSection>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" variant="mint" className="px-8 py-4 text-base">
            Analyse <Sparkles className="h-4 w-4" />
          </Button>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Mock decision engine — backend coming soon
          </span>
        </div>
      </form>
    </section>
  );
}
