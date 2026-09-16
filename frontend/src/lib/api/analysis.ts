import type { AnalysisResult, Decision } from "../types";
import { decideNextLife } from "../engine";

/**
 * BACKEND INTEGRATION POINT
 * `analyzeItem` currently returns a seeded/heuristic result. Replace with a
 * call to the vision + circularity model. `getDecision` wraps the engine and
 * can point at a server endpoint later.
 */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const PRESETS: Record<string, AnalysisResult> = {
  chair: {
    category: "Furniture",
    material: "Wood + Metal",
    condition: "Damaged",
    scores: { reusability: 84, repairability: 91, upcyclability: 78, recyclability: 61 },
  },
  jacket: {
    category: "Clothing",
    material: "Nylon Shell",
    condition: "Like New",
    scores: { reusability: 96, repairability: 70, upcyclability: 55, recyclability: 40 },
  },
  charger: {
    category: "Electronics",
    material: "Plastic + Copper",
    condition: "Fair",
    scores: { reusability: 48, repairability: 74, upcyclability: 42, recyclability: 88 },
  },
  book: {
    category: "Books",
    material: "Paper",
    condition: "Good",
    scores: { reusability: 90, repairability: 30, upcyclability: 60, recyclability: 95 },
  },
};

export function detectPreset(text: string): AnalysisResult {
  const t = text.toLowerCase();
  if (t.includes("chair") || t.includes("furniture") || t.includes("desk")) return PRESETS.chair;
  if (t.includes("jacket") || t.includes("cloth") || t.includes("shirt")) return PRESETS.jacket;
  if (t.includes("charger") || t.includes("cable") || t.includes("phone")) return PRESETS.charger;
  if (t.includes("book") || t.includes("note")) return PRESETS.book;
  return PRESETS.chair;
}

export async function analyzeItem(description: string): Promise<AnalysisResult> {
  await delay(1800);
  return detectPreset(description);
}

export async function getDecision(result: AnalysisResult): Promise<Decision> {
  await delay(500);
  return decideNextLife(result);
}
