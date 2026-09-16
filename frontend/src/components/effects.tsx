import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

/* ---------- media helpers ---------- */
function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

function usePrefersReduced() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ---------- Smooth scroller (Lenis) ---------- */
export function SmoothScroller() {
  const reduced = usePrefersReduced();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // never hijack native scroll containers / modals
    (window as any).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as any).__lenis = undefined;
    };
  }, [reduced]);
  return null;
}

/* ---------- Custom cursor (desktop only) ---------- */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReduced();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a,button,[data-cursor="link"],input,textarea,select'));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.body.style.cursor = "";
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: down ? 0.78 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      >
        <motion.div
          className="grid place-items-center rounded-full bg-white/95 shadow-[0_0_0_1px_rgba(17,17,17,0.16)]"
          animate={{ width: hovering ? 24 : 18, height: hovering ? 24 : 18 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
        >
          <motion.div
            className="rounded-full bg-primary"
            animate={{ width: hovering ? 10 : 7, height: hovering ? 10 : 7 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-foreground"
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          scale: down ? 0.78 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </div>
  );
}

/* ---------- Ambient glow following mouse ---------- */
export function AmbientGlow() {
  const fine = useFinePointer();
  const reduced = usePrefersReduced();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.2);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [fine, reduced, x, y]);

  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);
  if (!fine || reduced) return null;
  return (
    <motion.div
      aria-hidden
      style={{ left, top }}
      className="pointer-events-none fixed z-0 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full transform-gpu"
    >
      <div className="h-full w-full rounded-full bg-primary/20 blur-[120px]" />
    </motion.div>
  );
}

/* ---------- Background shapes + architectural line art ---------- */
export function BackgroundShapes() {
  const reduced = usePrefersReduced();
  const floats = [
    { size: 220, top: "12%", left: "6%", color: "rgba(0,223,129,0.14)", rot: -8, delay: 0 },
    { size: 300, top: "58%", left: "82%", color: "rgba(255,176,32,0.16)", rot: 10, delay: 1.4 },
    { size: 160, top: "78%", left: "10%", color: "rgba(124,92,255,0.12)", rot: 6, delay: 0.6 },
  ];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {floats.map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[2rem] border border-foreground/20 backdrop-blur-sm"
          style={{ width: f.size, height: f.size, top: f.top, left: f.left, background: f.color }}
          animate={reduced ? {} : { y: [0, -24, 0], rotate: [f.rot, f.rot + 4, f.rot] }}
          transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        />
      ))}
      {/* architectural line art */}
      <svg className="absolute bottom-0 left-0 w-full opacity-[0.05]" height="260" preserveAspectRatio="none" viewBox="0 0 1440 260">
        <g stroke="#111" strokeWidth="2" fill="none">
          <rect x="60" y="120" width="120" height="140" />
          <rect x="90" y="150" width="24" height="24" />
          <rect x="126" y="150" width="24" height="24" />
          <path d="M60 120 L120 70 L180 120" />
          <rect x="260" y="80" width="90" height="180" />
          <path d="M260 80 L305 40 L350 80" />
          <line x1="0" y1="260" x2="1440" y2="260" />
          <path d="M420 260 Q620 180 900 240 T1440 210" />
          <rect x="980" y="100" width="160" height="160" />
          <rect x="1010" y="130" width="30" height="30" />
          <rect x="1060" y="130" width="30" height="30" />
          <rect x="1010" y="180" width="30" height="30" />
          <rect x="1060" y="180" width="30" height="30" />
          <rect x="1220" y="140" width="110" height="120" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- Scroll progress (right rail) ---------- */
export function ScrollProgress() {
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll();
  const h = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const height = useTransform(h, (v) => `${v * 100}%`);
  const trackRef = useRef<HTMLDivElement>(null);

  const jump = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    const target = ratio * (document.body.scrollHeight - window.innerHeight);
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  if (!fine) return null;
  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div
        ref={trackRef}
        onClick={jump}
        className="relative h-40 w-2 cursor-pointer rounded-full border-2 border-foreground bg-white/60"
        data-cursor="link"
        aria-label="Scroll progress — click to jump"
        role="scrollbar"
      >
        <motion.div style={{ height }} className="absolute left-0 top-0 w-full rounded-full bg-primary" />
      </div>
    </div>
  );
}

/* ---------- Radial rotating emblem ---------- */
export function RadialEmblem({ size = 130, className }: { size?: number; className?: string }) {
  const id = "emblem-path";
  return (
    <div className={className} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text fontSize="16.5" fontWeight="700" fill="#111" letterSpacing="3" fontFamily="'JetBrains Mono', monospace">
          <textPath href={`#${id}`}>RELOOP • KEEP IT CIRCULATING • RELOOP • KEEP IT CIRCULATING • </textPath>
        </text>
        <circle cx="100" cy="100" r="46" fill="#00df81" stroke="#111" strokeWidth="3" />
        <text x="100" y="107" textAnchor="middle" fontSize="26" fontWeight="800" fill="#062b1c" fontFamily="'Bricolage Grotesque', sans-serif">
          ↻
        </text>
      </motion.svg>
    </div>
  );
}
