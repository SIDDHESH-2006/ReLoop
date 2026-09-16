import type { Listing } from "../types";
import { seedListings } from "../mockData";

/**
 * BACKEND INTEGRATION POINT
 * Swap these mock resolvers for real fetch() calls. Signatures are stable.
 */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getListings(): Promise<Listing[]> {
  await delay(650);
  return seedListings;
}

export async function getListing(id: string): Promise<Listing | undefined> {
  await delay(450);
  return seedListings.find((l) => l.id === id);
}

export async function createListing(input: Omit<Listing, "id" | "seller" | "createdAt" | "status" | "circularScore">): Promise<Listing> {
  await delay(900);
  return {
    ...input,
    // Unique per listing — a plain random number could collide with an existing
    // (seed or previously created) id and duplicate React keys in the grid.
    id: `CL-2026-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString().slice(0, 10),
    status: "LISTED",
    circularScore: Math.floor(70 + Math.random() * 28),
    seller: { id: "me", name: "You", course: "CSE", year: "3rd Year", avatar: "YOU", rating: 5 },
  };
}
