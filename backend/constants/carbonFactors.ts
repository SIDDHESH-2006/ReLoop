import { ItemCategory } from './categories';

// ─── Estimated Weight per Category (kg) ──────────────────────────
// Average weight of a typical item in each category.
// Used to compute waste diverted from landfill.
export const AVG_WEIGHT_KG: Record<ItemCategory, number> = {
  electronics: 1.5,
  books: 0.4,
  furniture: 8.0,
  appliances: 3.0,
  clothing: 0.6,
  other: 1.0,
};

// ─── Carbon Emission Factor (kg CO₂ per kg of product) ──────────
// Approximate lifecycle carbon footprint of manufacturing a new
// replacement item. Reusing/recycling saves this amount.
export const CARBON_FACTOR_KG_CO2: Record<ItemCategory, number> = {
  electronics: 20.0,   // High embedded energy (chips, screens, batteries)
  books: 2.5,          // Paper & print production
  furniture: 5.0,      // Wood processing, metal, foam
  appliances: 12.0,    // Motors, heating elements, plastics
  clothing: 8.0,       // Textile production, dyeing, transport
  other: 3.0,          // Conservative default
};

// ─── Pathway Effectiveness Multipliers ───────────────────────────
// What fraction of the carbon/waste is actually saved per pathway.
// e.g. Selling reuses the item fully (1.0), recycling recovers ~40%.
export const PATHWAY_MULTIPLIER: Record<string, number> = {
  sell: 1.0,       // Full reuse — maximum impact
  donate: 1.0,     // Full reuse via donation
  exchange: 1.0,   // Full reuse via peer swap
  repair: 0.75,    // Extends life, but repair has some footprint
  upcycle: 0.6,    // Partial material reuse + creative repurposing
  recycle: 0.4,    // Material recovery only, energy still spent
};
