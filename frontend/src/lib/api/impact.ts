import type { ImpactMetrics } from "../types";

/** BACKEND INTEGRATION POINT — replace with analytics service. */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getImpact(): Promise<ImpactMetrics> {
  await delay(500);
  return {
    recirculated: 1284,
    sold: 742,
    donated: 268,
    repaired: 342,
    upcycled: 98,
    recycled: 176,
    wasteAvoidedKg: 3120,
    valueRecirculated: 240000,
  };
}
