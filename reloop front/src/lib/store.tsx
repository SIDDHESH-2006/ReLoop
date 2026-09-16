import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Listing } from "./types";
import { seedListings } from "./mockData";

/**
 * Client-side app state. Persisted to localStorage so simulated actions
 * (create listing, save, express interest) survive reloads.
 * Prepared so each mutation can later dispatch a real API call.
 */
interface StoreValue {
  listings: Listing[];
  saved: Set<string>;
  interested: Set<string>;
  addListing: (l: Listing) => void;
  toggleSaved: (id: string) => void;
  expressInterest: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);
const KEY = "reloop:v1";

interface Persisted {
  extra: Listing[];
  saved: string[];
  interested: string[];
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { extra: [], saved: [], interested: [] };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const initial = load();
  const [extra, setExtra] = useState<Listing[]>(initial.extra);
  const [saved, setSaved] = useState<Set<string>>(new Set(initial.saved));
  const [interested, setInterested] = useState<Set<string>>(new Set(initial.interested));

  useEffect(() => {
    const data: Persisted = {
      extra,
      saved: [...saved],
      interested: [...interested],
    };
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [extra, saved, interested]);

  // Dedupe by id so a stale/colliding persisted listing can't produce
  // duplicate React keys in the marketplace grid.
  const listings = useMemo(() => {
    const seen = new Set<string>();
    return [...extra, ...seedListings].filter((l) => {
      if (seen.has(l.id)) return false;
      seen.add(l.id);
      return true;
    });
  }, [extra]);

  const value: StoreValue = {
    listings,
    saved,
    interested,
    addListing: (l) => setExtra((prev) => [l, ...prev]),
    toggleSaved: (id) =>
      setSaved((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      }),
    expressInterest: (id) => setInterested((prev) => new Set(prev).add(id)),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
