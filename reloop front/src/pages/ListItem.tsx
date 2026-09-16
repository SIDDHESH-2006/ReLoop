import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Check, ImagePlus, Loader2 } from "lucide-react";
import { Button, Eyebrow, cx } from "../components/ui";
import { useStore } from "../lib/store";
import { createListing } from "../lib/api/marketplace";
import type { Category, Condition, Operation } from "../lib/types";

const schema = z.object({
  name: z.string().min(3, "Give your item a clear name"),
  description: z.string().min(10, "Add a few details buyers will want"),
  category: z.enum(["Clothing", "Books", "Electronics", "Furniture", "Sports", "Stationery", "Packaging", "Other"]),
  operation: z.enum(["SELL", "EXCHANGE", "DONATE"]),
  condition: z.enum(["New", "Like New", "Good", "Fair", "Damaged"]),
  price: z.coerce.number().min(0, "Price can't be negative"),
  location: z.enum(["Hostel Block A", "Hostel Block B", "Hostel Block C", "Library", "Academic Block", "Cafeteria", "Repair Center", "Recycling Point"]),
});
type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

const categories: Category[] = ["Clothing", "Books", "Electronics", "Furniture", "Sports", "Stationery", "Packaging", "Other"];
const conditions: Condition[] = ["New", "Like New", "Good", "Fair", "Damaged"];
const locations = ["Hostel Block A", "Hostel Block B", "Hostel Block C", "Library", "Academic Block", "Cafeteria", "Repair Center", "Recycling Point"] as const;
const ops: Operation[] = ["SELL", "EXCHANGE", "DONATE"];

const fieldCx = "w-full rounded-2xl border-[3px] border-foreground bg-white px-4 py-3 text-base outline-none focus:shadow-[3px_3px_0_#00df81]";

export default function ListItem() {
  const { addListing } = useStore();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { operation: "SELL", condition: "Good", category: "Clothing", location: "Hostel Block A", price: 0 },
  });

  const op = watch("operation");

  const onSubmit = async (v: FormValues) => {
    const listing = await createListing({
      ...v,
      price: v.operation === "SELL" ? v.price : 0,
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=800&fit=crop&auto=format",
    });
    addListing(listing);
    setDone(true);
    setTimeout(() => navigate(`/marketplace/${listing.id}`), 1200);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-6 pt-40 pb-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[3px] border-foreground bg-primary shadow-[4px_4px_0_#111]">
          <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>
        <h1 className="mt-6 font-display text-4xl font-extrabold uppercase">Listed!</h1>
        <p className="mt-2 text-muted-foreground">Redirecting to your item…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pt-32 pb-16">
      <Eyebrow>Create listing</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95]">List an item</h1>
      <p className="mt-3 text-muted-foreground">Give your item a next life. It takes about a minute.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-[6px_6px_0_#111] md:p-8">
        {/* operation selector */}
        <div>
          <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">Operation</label>
          <div className="grid grid-cols-3 gap-2">
            {ops.map((o) => (
              <button
                type="button"
                key={o}
                onClick={() => setValue("operation", o)}
                className={cx(
                  "rounded-2xl border-[3px] border-foreground px-3 py-3 font-mono text-sm font-bold uppercase transition-colors",
                  op === o ? "bg-foreground text-white" : "bg-white hover:bg-muted",
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <Field label="Item name" error={errors.name?.message}>
          <input {...register("name")} className={fieldCx} placeholder="e.g. Nike Windrunner Jacket" />
        </Field>

        <Field label="Description" error={errors.description?.message}>
          <textarea {...register("description")} rows={3} className={fieldCx} placeholder="Condition, reason for listing, anything useful…" />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Category" error={errors.category?.message}>
            <select {...register("category")} className={fieldCx}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Condition" error={errors.condition?.message}>
            <select {...register("condition")} className={fieldCx}>
              {conditions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={op === "SELL" ? "Price (₹)" : "Price"} error={errors.price?.message}>
            <input
              type="number"
              {...register("price")}
              disabled={op !== "SELL"}
              className={cx(fieldCx, op !== "SELL" && "opacity-50")}
              placeholder={op === "SELL" ? "3000" : op === "DONATE" ? "Free" : "Swap only"}
            />
          </Field>
          <Field label="Location" error={errors.location?.message}>
            <select {...register("location")} className={fieldCx}>
              {locations.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Image">
          <div className="flex items-center justify-center gap-3 rounded-2xl border-[3px] border-dashed border-foreground/40 bg-background py-10 text-muted-foreground">
            <ImagePlus className="h-6 w-6" />
            <span className="font-mono text-sm">A demo photo will be attached automatically</span>
          </div>
        </Field>

        <Button type="submit" variant="mint" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Publishing…</> : "Publish listing"}
        </Button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      {children}
      {error && <p className="mt-1.5 font-mono text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
}
