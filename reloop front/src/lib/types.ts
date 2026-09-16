export type Operation = "SELL" | "EXCHANGE" | "DONATE";

export type NextLife =
  | "SELL"
  | "EXCHANGE"
  | "DONATE"
  | "REPAIR"
  | "REFURBISH"
  | "UPCYCLE"
  | "RECYCLE";

export type Condition = "New" | "Like New" | "Good" | "Fair" | "Damaged";

export type Category =
  | "Clothing"
  | "Books"
  | "Electronics"
  | "Furniture"
  | "Sports"
  | "Stationery"
  | "Packaging"
  | "Other";

export type CampusLocation =
  | "Hostel Block A"
  | "Hostel Block B"
  | "Hostel Block C"
  | "Library"
  | "Academic Block"
  | "Cafeteria"
  | "Repair Center"
  | "Recycling Point";

export interface Seller {
  id: string;
  name: string;
  course: string;
  year: string;
  avatar: string;
  rating: number;
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number; // 0 for donate / exchange
  operation: Operation;
  condition: Condition;
  location: CampusLocation;
  image: string;
  seller: Seller;
  circularScore: number;
  createdAt: string;
  status: "LISTED" | "INTERESTED" | "SOLD" | "TRANSFERRED";
  saved?: boolean;
  interested?: boolean;
}

export interface AnalysisResult {
  category: Category;
  material: string;
  condition: Condition;
  scores: {
    reusability: number;
    repairability: number;
    upcyclability: number;
    recyclability: number;
  };
}

export interface Decision {
  recommended: NextLife;
  circularScore: number;
  reason: string;
  alternatives: NextLife[];
}

export interface Match {
  id: string;
  student: string;
  avatar: string;
  percent: number;
  reasons: { category: boolean; price: boolean; proximity: boolean; condition: boolean };
  note: string;
}

export type PassportStage =
  | "LISTED"
  | "INTERESTED"
  | "SOLD"
  | "TRANSFERRED"
  | "REPAIRED"
  | "RECYCLED";

export interface PassportEvent {
  stage: PassportStage;
  label: string;
  date: string;
  done: boolean;
}

export interface Passport {
  id: string;
  itemName: string;
  image: string;
  events: PassportEvent[];
}

export interface ImpactMetrics {
  recirculated: number;
  sold: number;
  donated: number;
  repaired: number;
  upcycled: number;
  recycled: number;
  wasteAvoidedKg: number;
  valueRecirculated: number;
}
