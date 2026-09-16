import type { AnalysisResult, Decision, NextLife } from "./types";

/**
 * CIRCULAR DECISION ENGINE
 * ------------------------------------------------------------------
 * Client-side reference implementation. The scoring below is a mock
 * heuristic so the UI can tell the full story today.
 *
 * BACKEND INTEGRATION POINT:
 * Replace `decideNextLife` with an API call (see lib/api/analysis.ts).
 * The return shape (`Decision`) is the stable contract for the UI.
 * ------------------------------------------------------------------
 */
export function decideNextLife(a: AnalysisResult): Decision {
  const { reusability, repairability, upcyclability, recyclability } = a.scores;

  const candidates: { life: NextLife; score: number }[] = [];

  // Sellable / reusable as-is
  if (a.condition === "New" || a.condition === "Like New" || a.condition === "Good") {
    candidates.push({ life: "SELL", score: reusability + 6 });
    candidates.push({ life: "EXCHANGE", score: reusability - 4 });
    candidates.push({ life: "DONATE", score: reusability - 10 });
  }
  // Damaged / fair → repair paths
  if (a.condition === "Damaged" || a.condition === "Fair") {
    candidates.push({ life: "REPAIR", score: repairability + 4 });
    candidates.push({ life: "REFURBISH", score: (repairability + reusability) / 2 });
    candidates.push({ life: "UPCYCLE", score: upcyclability });
  }
  candidates.push({ life: "UPCYCLE", score: upcyclability - 2 });
  candidates.push({ life: "RECYCLE", score: recyclability - 6 });

  // pick best, de-duplicate keeping the highest scoring
  const best = new Map<NextLife, number>();
  for (const c of candidates) {
    best.set(c.life, Math.max(best.get(c.life) ?? 0, c.score));
  }
  const ranked = [...best.entries()].sort((x, y) => y[1] - x[1]);

  const [recommended, topScore] = ranked[0];
  const alternatives = ranked.slice(1, 3).map(([life]) => life);

  return {
    recommended,
    circularScore: Math.min(100, Math.max(40, Math.round(topScore))),
    reason: reasonFor(recommended, a),
    alternatives,
  };
}

function reasonFor(life: NextLife, a: AnalysisResult): string {
  switch (life) {
    case "SELL":
      return "Strong resale potential and high reusability — another student can use it as-is.";
    case "EXCHANGE":
      return "High reusability makes this a great candidate for a peer swap.";
    case "DONATE":
      return "Usable condition with limited resale value — donation keeps it in circulation.";
    case "REPAIR":
      return "High repairability and strong reuse potential once fixed.";
    case "REFURBISH":
      return "Sound core with fixable wear — refurbishing restores most of its value.";
    case "UPCYCLE":
      return `Great upcyclability for ${a.material.toLowerCase()} — creative reuse beats disposal.`;
    case "RECYCLE":
      return "Beyond practical reuse — material recovery keeps resources in the loop.";
  }
}
