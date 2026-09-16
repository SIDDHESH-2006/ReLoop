import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button, Eyebrow, Pill, cx } from "../ui";
import { RadialEmblem } from "../effects";

/* ---------- Page shell for an onboarding flow ---------- */
export function FormShell({
  eyebrow,
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel = "Submit setup",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          to="/get-started"
          data-cursor="link"
          className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_#111] nb-hover"
        >
          <ArrowLeft className="h-4 w-4" /> Roles
        </Link>
        <RadialEmblem size={72} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{subtitle}</p>
      </motion.div>

      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" variant="mint" className="px-8 py-4 text-base">
            {submitLabel} <Check className="h-4 w-4" />
          </Button>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Frontend preview — not yet connected
          </span>
        </div>
      </form>
    </section>
  );
}

/* ---------- Grouped card of fields ---------- */
export function FormSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 380, damping: 26, delay: index * 0.04 }}
      className="rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-[4px_4px_0_#111] md:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-foreground bg-primary font-mono text-sm font-extrabold text-primary-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </motion.div>
  );
}

function Label({ children, span }: { children: ReactNode; span?: boolean }) {
  return (
    <label className={cx("block", span && "sm:col-span-2")}>
      <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {children}
      </span>
    </label>
  );
}

export const controlCx =
  "w-full rounded-2xl border-2 border-foreground bg-white px-4 py-3 text-sm font-medium outline-none transition-shadow focus:shadow-[3px_3px_0_#111]";

export function TextField({
  label,
  placeholder,
  type = "text",
  span,
  required,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  span?: boolean;
  required?: boolean;
}) {
  return (
    <div className={cx(span && "sm:col-span-2")}>
      <Label>{label}</Label>
      <input type={type} placeholder={placeholder} required={required} className={controlCx} />
    </div>
  );
}

export function TextArea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="sm:col-span-2">
      <Label>{label}</Label>
      <textarea rows={3} placeholder={placeholder} className={cx(controlCx, "resize-none")} />
    </div>
  );
}

export function SelectField({
  label,
  options,
  span,
}: {
  label: string;
  options: string[];
  span?: boolean;
}) {
  return (
    <div className={cx(span && "sm:col-span-2")}>
      <Label>{label}</Label>
      <select defaultValue="" className={cx(controlCx, "appearance-none")}>
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------- Selectable chips (single or multi) ---------- */
export function ChipGroup({
  label,
  options,
  multi = true,
}: {
  label: string;
  options: string[];
  multi?: boolean;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (o: string) =>
    setSelected((prev) =>
      multi
        ? prev.includes(o)
          ? prev.filter((x) => x !== o)
          : [...prev, o]
        : prev.includes(o)
          ? []
          : [o],
    );
  return (
    <div className="sm:col-span-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              data-cursor="link"
              onClick={() => toggle(o)}
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
  );
}

/* ---------- Yes / No toggle, optionally revealing children ---------- */
export function YesNo({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  const [value, setValue] = useState<"yes" | "no" | null>(null);
  return (
    <div className="sm:col-span-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((v) => (
          <button
            key={v}
            type="button"
            data-cursor="link"
            onClick={() => setValue(v)}
            className={cx(
              "rounded-full border-2 border-foreground px-6 py-2 font-mono text-xs font-bold uppercase tracking-wide transition-all",
              value === v
                ? "bg-foreground text-white shadow-[3px_3px_0_#00df81] -translate-y-0.5"
                : "bg-white hover:bg-muted",
            )}
          >
            {v}
          </button>
        ))}
      </div>
      {value === "yes" && children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden pt-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Coming soon confirmation screen ---------- */
export function ComingSoon({ message }: { message: string }) {
  const navigate = useNavigate();
  return (
    <section className="relative z-10 mx-auto grid min-h-screen max-w-2xl place-items-center px-6 py-32 text-center">
      <div>
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-full border-[3px] border-foreground bg-primary shadow-[6px_6px_0_#111]"
        >
          <motion.span
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Check className="h-12 w-12 text-primary-foreground" strokeWidth={3} />
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Pill tone="amber" className="mt-8">
            Partner onboarding
          </Pill>
          <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.9] md:text-7xl">
            Coming soon
          </h1>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">{message}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="dark">
              Back to home
            </Button>
            <Button onClick={() => navigate("/get-started")} variant="white">
              Return to role selection
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
