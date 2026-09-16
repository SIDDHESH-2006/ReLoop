// Raw Database Row Shape (from PostgreSQL `impact_logs`)
export interface DbImpactLogRow {
  id: string;
  user_id: string | null;
  item_id: string | null;
  pathway: string;
  carbon_saved_kg: number | string;
  waste_diverted_kg: number | string;
  money_saved_inr: number | string;
  created_at: string;
}

export interface AggregatedImpactDto {
  totalCarbonSavedKg: number;
  totalWasteDivertedKg: number;
  totalMoneySavedInr: number;
  formattedMoneySaved: string; // e.g. "₹24,500"
  // Fun campus equivalents
  treesEquivalent: number; // ~21 kg CO2 absorbed per tree per year
  plasticBottlesDiverted: number; // ~0.025 kg per plastic bottle
}

export function toAggregatedImpactDto(
  logs: DbImpactLogRow[]
): AggregatedImpactDto {
  let totalCarbon = 0;
  let totalWaste = 0;
  let totalMoney = 0;

  for (const log of logs) {
    totalCarbon += Number(log.carbon_saved_kg ?? 0);
    totalWaste += Number(log.waste_diverted_kg ?? 0);
    totalMoney += Number(log.money_saved_inr ?? 0);
  }

  // Rounded to 2 decimals
  const roundedCarbon = Math.round(totalCarbon * 100) / 100;
  const roundedWaste = Math.round(totalWaste * 100) / 100;
  const roundedMoney = Math.round(totalMoney);

  return {
    totalCarbonSavedKg: roundedCarbon,
    totalWasteDivertedKg: roundedWaste,
    totalMoneySavedInr: roundedMoney,
    formattedMoneySaved: `₹${roundedMoney.toLocaleString('en-IN')}`,
    treesEquivalent: Math.round((roundedCarbon / 21) * 10) / 10,
    plasticBottlesDiverted: Math.round(roundedWaste / 0.025),
  };
}
