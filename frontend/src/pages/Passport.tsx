import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Check, Clock } from "lucide-react";
import { Eyebrow, Pill } from "../components/ui";
import { getPassport } from "../lib/api/passport";
import type { Passport as PassportType } from "../lib/types";

export default function Passport() {
  const { id = "CL-2026-0001" } = useParams();
  const [passport, setPassport] = useState<PassportType | null>(null);

  useEffect(() => {
    getPassport(id).then(setPassport);
  }, [id]);

  const url = typeof window !== "undefined" ? `${window.location.origin}/passport/${id}` : `/passport/${id}`;

  if (!passport) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-20">
        <div className="h-96 animate-pulse rounded-3xl border-[3px] border-foreground bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-16">
      <Eyebrow>Waste Passport</Eyebrow>
      <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95]">Item lifecycle</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_260px]">
        {/* main card */}
        <div className="rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-[6px_6px_0_#111]">
          <div className="flex items-center gap-4">
            <img src={passport.image} alt={passport.itemName} className="h-20 w-20 rounded-2xl border-2 border-foreground object-cover" />
            <div>
              <div className="font-display text-2xl font-extrabold">{passport.itemName}</div>
              <div className="font-mono text-sm text-muted-foreground">Passport ID · {passport.id}</div>
            </div>
          </div>

          {/* timeline */}
          <ol className="relative mt-8 space-y-1 pl-2">
            {passport.events.map((ev, i) => (
              <motion.li
                key={ev.stage}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {i < passport.events.length - 1 && (
                  <span className={`absolute left-[15px] top-8 h-full w-0.5 ${ev.done ? "bg-primary" : "bg-foreground/15"}`} />
                )}
                <span className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-foreground ${ev.done ? "bg-primary" : "bg-white"}`}>
                  {ev.done ? <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} /> : <Clock className="h-4 w-4 text-muted-foreground" />}
                </span>
                <div className="pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold uppercase">{ev.stage}</span>
                    {!ev.done && <Pill tone="muted" className="border text-[9px]">Pending</Pill>}
                  </div>
                  <div className="text-sm text-muted-foreground">{ev.label}</div>
                  <div className="font-mono text-[11px] text-muted-foreground">{ev.date}</div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* QR */}
        <div className="flex h-fit flex-col items-center rounded-3xl border-[3px] border-foreground bg-foreground p-6 text-center text-white shadow-[6px_6px_0_#00df81]">
          <div className="rounded-2xl border-[3px] border-foreground bg-white p-3">
            <QRCodeSVG value={url} size={150} fgColor="#111111" bgColor="#ffffff" />
          </div>
          <div className="mt-4 font-mono text-xs uppercase tracking-widest text-white/60">Scan to verify</div>
          <div className="mt-1 font-display text-lg font-bold">{passport.id}</div>
          <p className="mt-3 text-xs text-white/50">Every handover is logged to the item's passport.</p>
        </div>
      </div>
    </div>
  );
}
