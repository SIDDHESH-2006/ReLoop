/**
 * SELL flow — Circular Decision Engine (pricing) boundary.
 *
 * The real Circular Decision Engine is BACKEND-OWNED. For now `analyzeSellingPrice`
 * returns deterministic frontend mock values. A backend developer can later replace
 * the body of this function with a real request and keep the same return shape.
 */

export type SellDraft = {
  productName: string;
  category: string;
  brand: string;
  age: string;
  condition: string;
  buyingPrice: string;
  targetPrice: string;
  purchaseYear: string;
  description: string;
  defects: string;
};

export const emptyDraft: SellDraft = {
  productName: "",
  category: "",
  brand: "",
  age: "",
  condition: "",
  buyingPrice: "",
  targetPrice: "",
  purchaseYear: "",
  description: "",
  defects: "",
};

export const sellCategories = [
  "Clothing",
  "Books",
  "Electronics",
  "Furniture",
  "Sports",
  "Bags & Accessories",
  "Hostel / Household",
  "Other",
];

export const sellAges = [
  "Brand New",
  "Less than 6 months",
  "6 months – 1 year",
  "1–2 years",
  "2–3 years",
  "3–5 years",
  "More than 5 years",
  "Approximate / Unknown",
];

export const sellConditions = ["New", "Like New", "Good", "Fair", "Used", "Damaged"];

export type SellRecommendation =
  | "PRICE TOO HIGH"
  | "PRICE CAN BE REDUCED"
  | "PRICE IS FAIR"
  | "PRICE CAN BE INCREASED";

export type SellAnalysisResult = {
  recommendation: SellRecommendation;
  suggestedPrice: number;
  priceRange: [number, number];
  reason: string;
  fitScore: number;
  material: string;
  scores: {
    reusability: number;
    repairability: number;
    upcyclability: number;
    recyclability: number;
  };
};

const AGE_FACTOR: Record<string, number> = {
  "Brand New": 1,
  "Less than 6 months": 0.85,
  "6 months – 1 year": 0.75,
  "1–2 years": 0.6,
  "2–3 years": 0.48,
  "3–5 years": 0.35,
  "More than 5 years": 0.22,
  "Approximate / Unknown": 0.5,
};

const CONDITION_FACTOR: Record<string, number> = {
  New: 1,
  "Like New": 0.92,
  Good: 0.8,
  Fair: 0.65,
  Used: 0.55,
  Damaged: 0.35,
};

const CONDITION_REUSE: Record<string, number> = {
  New: 96,
  "Like New": 92,
  Good: 80,
  Fair: 66,
  Used: 55,
  Damaged: 40,
};

const CATEGORY_PROFILE: Record<
  string,
  { material: string; repairability: number; upcyclability: number; recyclability: number }
> = {
  Clothing: { material: "Nylon / Polyester", repairability: 62, upcyclability: 78, recyclability: 45 },
  Books: { material: "Paper / Board", repairability: 40, upcyclability: 55, recyclability: 88 },
  Electronics: { material: "Mixed Electronics", repairability: 74, upcyclability: 48, recyclability: 60 },
  Furniture: { material: "Wood / Metal", repairability: 80, upcyclability: 70, recyclability: 55 },
  Sports: { material: "Composite / Rubber", repairability: 58, upcyclability: 52, recyclability: 40 },
  "Bags & Accessories": { material: "Leather / Fabric", repairability: 60, upcyclability: 74, recyclability: 42 },
  "Hostel / Household": { material: "Mixed Materials", repairability: 55, upcyclability: 60, recyclability: 58 },
  Other: { material: "Mixed Materials", repairability: 50, upcyclability: 55, recyclability: 50 },
};

const round50 = (n: number) => Math.max(0, Math.round(n / 50) * 50);
const clampPct = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

/**
 * MOCK pricing recommendation. Deterministic — same inputs always yield the
 * same output. Replace the body with a backend call when the engine is ready.
 */
export function analyzeSellingPrice(data: SellDraft): SellAnalysisResult {
  const profile = CATEGORY_PROFILE[data.category] ?? CATEGORY_PROFILE.Other;
  const ageFactor = AGE_FACTOR[data.age] ?? 0.5;
  const condFactor = CONDITION_FACTOR[data.condition] ?? 0.6;

  const buying = Number(data.buyingPrice) || 0;
  const target = Number(data.targetPrice) || 0;

  const estimatedRaw = buying * ageFactor * condFactor;
  const suggestedPrice = round50(estimatedRaw) || 0;
  const priceRange: [number, number] = [
    round50(estimatedRaw * 0.9),
    round50(estimatedRaw * 1.1),
  ];

  const ratio = suggestedPrice > 0 ? target / suggestedPrice : 1;

  let recommendation: SellRecommendation;
  let reason: string;
  if (target <= 0) {
    recommendation = "PRICE IS FAIR";
    reason = `Based on the item's age and condition, a price around ₹${suggestedPrice.toLocaleString("en-IN")} is reasonable for campus resale.`;
  } else if (ratio >= 1.3) {
    recommendation = "PRICE TOO HIGH";
    reason = "The target price is well above the item's estimated campus resale value for its age and condition.";
  } else if (ratio >= 1.1) {
    recommendation = "PRICE CAN BE REDUCED";
    reason = "The target price is slightly high compared with the item's age and current condition.";
  } else if (ratio >= 0.9) {
    recommendation = "PRICE IS FAIR";
    reason = "The target price is reasonable for the product's age and condition.";
  } else {
    recommendation = "PRICE CAN BE INCREASED";
    reason = "The item is in strong condition and the target price is below the estimated campus resale range.";
  }

  const fitScore = target > 0 ? clampPct(100 - Math.abs(1 - ratio) * 100) : 80;

  return {
    recommendation,
    suggestedPrice,
    priceRange,
    reason,
    fitScore,
    material: profile.material,
    scores: {
      reusability: clampPct(CONDITION_REUSE[data.condition] ?? 60),
      repairability: clampPct(profile.repairability * (0.6 + condFactor * 0.4)),
      upcyclability: clampPct(profile.upcyclability),
      recyclability: clampPct(profile.recyclability),
    },
  };
}
