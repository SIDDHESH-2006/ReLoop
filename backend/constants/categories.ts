// ─── Item Categories ─────────────────────────────────────────────
export const ITEM_CATEGORIES = [
  'electronics',
  'books',
  'furniture',
  'appliances',
  'clothing',
  'other',
] as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  electronics: 'Electronics',
  books: 'Books & Stationery',
  furniture: 'Furniture',
  appliances: 'Appliances',
  clothing: 'Clothing & Accessories',
  other: 'Other',
};

// ─── Item Conditions ─────────────────────────────────────────────
export const ITEM_CONDITIONS = [
  'brand_new',
  'like_new',
  'good',
  'fair',
  'for_parts',
] as const;

export type ItemCondition = (typeof ITEM_CONDITIONS)[number];

export const CONDITION_LABELS: Record<ItemCondition, string> = {
  brand_new: 'Brand New (Unused)',
  like_new: 'Like New',
  good: 'Good',
  fair: 'Fair (Visible Wear)',
  for_parts: 'For Parts Only',
};

// Numeric scores used for impact estimation (higher = better condition)
export const CONDITION_SCORES: Record<ItemCondition, number> = {
  brand_new: 1.0,
  like_new: 0.85,
  good: 0.65,
  fair: 0.4,
  for_parts: 0.1,
};

// ─── Circular Pathways (User-Selected) ───────────────────────────
export const ITEM_PATHWAYS = [
  'sell',
  'donate',
  'exchange',
  'repair',
  'upcycle',
  'recycle',
] as const;

export type ItemPathway = (typeof ITEM_PATHWAYS)[number];

export const PATHWAY_LABELS: Record<ItemPathway, string> = {
  sell: 'Sell on Marketplace',
  donate: 'Donate / Free Hub',
  exchange: 'Exchange with Peer',
  repair: 'Send for Repair',
  upcycle: 'Upcycle / Repurpose',
  recycle: 'Recycle / E-Waste',
};

// ─── Item Statuses ───────────────────────────────────────────────
export const ITEM_STATUSES = [
  'draft',
  'available',
  'reserved',
  'completed',
  'archived',
] as const;

export type ItemStatus = (typeof ITEM_STATUSES)[number];
