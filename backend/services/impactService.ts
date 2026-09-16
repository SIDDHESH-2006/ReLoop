import { ItemCategory, ItemPathway } from '../constants/categories';
import { AVG_WEIGHT_KG, CARBON_FACTOR_KG_CO2, PATHWAY_MULTIPLIER } from '../constants/carbonFactors';

export interface CalculatedImpact {
  carbonSavedKg: number;
  wasteDivertedKg: number;
  moneySavedInr: number;
  treesEquivalent: number;
}

/**
 * Calculates environmental savings when an item is recirculated via ReLoop.
 * 
 * @param category - Category of the item (electronics, appliances, etc.)
 * @param pathway - User chosen pathway (sell, donate, exchange, repair, upcycle, recycle)
 * @param originalOrEstimatedPrice - Estimated replacement cost / original price (optional)
 * @param customWeightKg - Optional override for item weight
 */
export function calculateItemImpact(
  category: ItemCategory,
  pathway: ItemPathway,
  originalOrEstimatedPrice: number = 0,
  customWeightKg?: number
): CalculatedImpact {
  const weight =
    customWeightKg && customWeightKg > 0
      ? customWeightKg
      : AVG_WEIGHT_KG[category] ?? 1.0;

  const carbonFactor = CARBON_FACTOR_KG_CO2[category] ?? 3.0;
  const effectiveness = PATHWAY_MULTIPLIER[pathway] ?? 1.0;

  // Waste diverted: weight * pathway recovery efficiency
  const wasteDiverted = weight * effectiveness;

  // Carbon saved: weight * CO2 factor * pathway recovery efficiency
  const carbonSaved = weight * carbonFactor * effectiveness;

  // Money saved: For buyers/receivers on campus avoiding buying new
  const moneySaved =
    pathway === 'donate' || pathway === 'recycle'
      ? originalOrEstimatedPrice * 0.8
      : Math.max(0, originalOrEstimatedPrice * 0.5);

  const roundedCarbon = Math.round(carbonSaved * 100) / 100;
  const roundedWaste = Math.round(wasteDiverted * 100) / 100;
  const roundedMoney = Math.round(moneySaved);

  return {
    carbonSavedKg: roundedCarbon,
    wasteDivertedKg: roundedWaste,
    moneySavedInr: roundedMoney,
    // 1 mature tree absorbs approx 21 kg of CO2 per year
    treesEquivalent: Math.round((roundedCarbon / 21) * 10) / 10,
  };
}
