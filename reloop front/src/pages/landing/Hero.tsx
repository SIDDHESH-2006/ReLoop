import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Zap } from "lucide-react";
import { Button, Pill } from "../../components/ui";
import { RadialEmblem } from "../../components/effects";

const words = ["SELL.", "EXCHANGE.", "REPAIR.", "UPCYCLE.", "RECYCLE."];

function Typewriter() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid">
      {words.map((w, idx) => (
        <motion.span
          key={w}
          className="col-start-1 row-start-1 text-primary"
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 12 }}
          transition={{ duration: 0.4 }}
          style={{ visibility: i === idx ? "visible" : "hidden" }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

function FloatingCards() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="relative mx-auto h-[420px] w-full max-w-md"
      style={{ perspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative h-full w-full">
        {/* Card 1 — live tasks */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-0 top-6 w-64 -rotate-6 rounded-3xl border-[3px] border-foreground bg-white p-4 shadow-[6px_6px_0_#111]"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-center justify-between">
            <Pill tone="mint"><Zap className="h-3 w-3" /> Live</Pill>
            <span className="font-mono text-xs text-muted-foreground">now</span>
          </div>
          <div className="mt-3 font-display text-lg font-bold">Live tasks</div>
          <div className="text-sm text-muted-foreground">5 items found nearby</div>
          <div className="mt-3 flex -space-x-2">
            {["AM", "RS", "RN", "AR"].map((a) => (
              <span key={a} className="grid h-7 w-7 place-items-center rounded-full border-2 border-foreground bg-amber font-mono text-[10px] font-bold">
                {a}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 2 — circular match */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 300, damping: 24 }}
          className="absolute right-0 top-0 w-60 rotate-3 rounded-3xl border-[3px] border-foreground bg-amber p-4 shadow-[6px_6px_0_#111]"
          style={{ transform: "translateZ(60px)" }}
        >
          <Pill tone="dark"><Sparkles className="h-3 w-3" /> Circular Match</Pill>
          <div className="mt-3 font-display text-lg font-bold leading-tight">Nike Jacket</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-4xl font-extrabold">94%</span>
            <span className="font-mono text-xs font-bold uppercase">match</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full border-2 border-foreground bg-white">
            <motion.div className="h-full bg-foreground" initial={{ width: 0 }} animate={{ width: "94%" }} transition={{ delay: 0.8, duration: 0.9 }} />
          </div>
        </motion.div>

        {/* Card 3 — decision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 24 }}
          className="absolute bottom-2 left-8 w-72 rotate-2 rounded-3xl border-[3px] border-foreground bg-foreground p-4 text-white shadow-[6px_6px_0_#00df81]"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-white/60">Circular Decision</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">↻</span>
          </div>
          <div className="mt-2 font-display text-3xl font-extrabold text-primary">REPAIR</div>
          <div className="text-sm text-white/70">Best next life · Score 91/100</div>
        </motion.div>

        <div className="absolute -right-6 bottom-16" style={{ transform: "translateZ(110px)" }}>
          <RadialEmblem size={104} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 pt-36 pb-16 md:pt-44">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Pill tone="mint" className="mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> Campus circular economy
            </Pill>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 26 }}
            className="font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl"
          >
            Find the next best life for every item.
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Buy, sell, exchange, donate, repair, upcycle and recycle within your campus. One tap to{" "}
            <Typewriter />
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button to="/get-started" variant="mint" className="px-9 py-4 text-base">
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/about" variant="white" className="px-9 py-4 text-base">
              Explore about us
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> 6 campus hubs</span>
            <span className="h-3 w-px bg-foreground/20" />
            <span>1,284 items recirculated</span>
          </div>
        </div>

        <div className="hidden lg:block">
          <FloatingCards />
        </div>
      </div>
    </section>
  );
}
