import type { Match } from "../types";

/** BACKEND INTEGRATION POINT — replace with matching service. */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MATCHES: Match[] = [
  {
    id: "m1",
    student: "Riya Sharma",
    avatar: "RS",
    percent: 94,
    reasons: { category: true, price: true, proximity: true, condition: true },
    note: "Wants the same category · budget aligned · same hostel block",
  },
  {
    id: "m2",
    student: "Rahul Nair",
    avatar: "RN",
    percent: 82,
    reasons: { category: true, price: true, proximity: false, condition: true },
    note: "Category & price match · 400m away",
  },
  {
    id: "m3",
    student: "Ananya Rao",
    avatar: "AR",
    percent: 76,
    reasons: { category: true, price: false, proximity: true, condition: true },
    note: "Nearby & condition fits · slightly under budget",
  },
];

export async function getMatches(_listingId: string): Promise<Match[]> {
  await delay(1200);
  return MATCHES;
}
