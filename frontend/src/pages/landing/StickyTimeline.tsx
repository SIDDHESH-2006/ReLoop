import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, ScanLine, Repeat, LineChart } from "lucide-react";
import { Eyebrow, Pill } from "../../components/ui";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "List",
    icon: ClipboardList,
    body: "Post any item in under a minute.",
    card: (
      <div className="space-y-3">
        <Pill tone="mint">SELL</Pill>
        <div className="font-display text-2xl font-extrabold">Nike Jacket</div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-extrabold">₹3,000</span>
        </div>
        <div className="h-24 rounded-2xl border-2 border-foreground bg-muted" />
      </div>
    ),
  },
  {
    n: "02",
    title: "Analyze",
    icon: ScanLine,
    body: "Reloop reads the item automatically.",
    card: (
      <div className="space-y-2">
        <Pill tone="amber">Analyzing</Pill>
        <div className="font-display text-2xl font-extrabold">Clothing</div>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between border-b-2 border-dashed border-foreground/20 pb-1"><span>Condition</span><b>New</b></div>
          <div className="flex justify-between border-b-2 border-dashed border-foreground/20 pb-1"><span>Resale potential</span><b className="text-primary">High</b></div>
        </div>
      </div>
    ),
  },
  {
    n: "03",
    title: "Find next life",
    icon: Repeat,
    body: "The engine recommends the best route.",
    card: (
      <div className="space-y-3">
        <Pill tone="dark">Recommended</Pill>
        <div className="font-display text-4xl font-extrabold text-primary">SELL</div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border-2 border-foreground bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground">96 score</div>
          <span className="font-mono text-sm text-muted-foreground">12 matches</span>
        </div>
      </div>
    ),
  },
  {
    n: "04",
    title: "Track impact",
    icon: LineChart,
    body: "Every handover updates the passport.",
    card: (
      <div className="space-y-3">
        <Pill tone="mint">Impact</Pill>
        <div className="font-display text-xl font-bold leading-snug">Transferred to another student.</div>
        <div className="rounded-2xl border-2 border-foreground bg-amber px-3 py-2 font-mono text-sm font-bold">Passport updated ✓</div>
      </div>
    ),
  },
];

export default function StickyTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduced || !isDesktop) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".sop-card");
      const labels = gsap.utils.toArray<HTMLElement>(".sop-label");
      const line = root.current!.querySelector<SVGPathElement>(".sop-line");

      gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.94 });
      gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });
      labels.forEach((l, i) => l.classList.toggle("is-active", i === 0));

      const len = line ? line.getTotalLength() : 0;
      if (line) {
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=" + steps.length * 500,
          pin: ".sop-pin",
          scrub: 1,
        },
      });

      if (line) tl.to(line, { strokeDashoffset: 0, ease: "none" }, 0);

      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = i / steps.length;
        tl.to(cards[i - 1], { autoAlpha: 0, y: -40, scale: 0.94, duration: 0.15 }, at);
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.15 }, at + 0.02);
        tl.add(() => {
          labels.forEach((l, li) => l.classList.toggle("is-active", li === i));
        }, at);
        tl.add(() => {
          labels.forEach((l, li) => l.classList.toggle("is-active", li === i - 1 ? false : l.classList.contains("is-active")));
        }, at);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" ref={root} className="relative z-10">
      <div className="sop-pin mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <Eyebrow>How Reloop works</Eyebrow>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          {/* left steps */}
          <div className="relative">
            <svg className="absolute left-[26px] top-2 hidden h-[80%] w-6 md:block" viewBox="0 0 20 400" fill="none" preserveAspectRatio="none">
              <path className="sop-line" d="M10 0 L10 400" stroke="#00df81" strokeWidth="4" strokeLinecap="round" />
              <path d="M10 0 L10 400" stroke="#111" strokeWidth="4" strokeDasharray="2 8" strokeLinecap="round" opacity="0.15" />
            </svg>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="sop-label flex items-start gap-4 opacity-40 transition-opacity duration-300 [&.is-active]:opacity-100">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[3px] border-foreground bg-white font-display text-xl font-extrabold shadow-[3px_3px_0_#111] [.is-active_&]:bg-primary">
                    {s.n}
                  </span>
                  <div className="pt-1">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-5 w-5" />
                      <h3 className="font-display text-2xl font-bold uppercase">{s.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* right dynamic cards */}
          <div className="relative min-h-[320px]">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="sop-card absolute inset-0 flex flex-col justify-center rounded-3xl border-[3px] border-foreground bg-card p-8 shadow-[6px_6px_0_#111]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <span className="mb-4 w-fit rounded-full border-2 border-foreground bg-background px-3 py-1 font-mono text-xs font-bold uppercase">
                  Step {s.n}
                </span>
                {s.card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
