import {
  ItemCategory,
  ItemCondition,
  ItemPathway,
  ItemStatus,
  CATEGORY_LABELS,
  CONDITION_LABELS,
  PATHWAY_LABELS,
} from '../constants/categories';

// Raw Database Row Shape (from PostgreSQL `items` table)
export interface DbItemRow {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  category: ItemCategory;
  condition: ItemCondition;
  pathway: ItemPathway;
  price: number | string | null;
  is_free: boolean;
  status: ItemStatus;
  images: string[];
  hostel_block: string;
  latitude: number | null;
  longitude: number | null;
  decision_engine_metadata: Record<string, unknown> | null;
  views_count: number;
  created_at: string;
  updated_at: string;
  // Optional joined owner profile
  owner?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    hostel_block: string;
    reputation_score: number | string;
  } | null;
}

// Clean Frontend-facing DTO
export interface ItemDto {
  id: string;
  title: string;
  description: string;
  category: {
    key: ItemCategory;
    label: string;
  };
  condition: {
    key: ItemCondition;
    label: string;
  };
  pathway: {
    key: ItemPathway;
    label: string;
  };
  price: number;
  formattedPrice: string; // e.g. "₹350" or "Free"
  isFree: boolean;
  status: ItemStatus;
  images: string[];
  location: {
    hostelBlock: string;
    displayLocation: string; // e.g. "Hostel Block B"
    coordinates: {
      latitude: number | null;
      longitude: number | null;
    } | null;
  };
  viewsCount: number;
  createdAt: string;
  owner?: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    hostelBlock: string;
    reputationScore: number;
  };
}

export function toItemDto(row: DbItemRow): ItemDto {
  const numericPrice = Number(row.price ?? 0);
  const isFree =
    row.is_free ||
    numericPrice === 0 ||
    row.pathway === 'donate' ||
    row.pathway === 'recycle';

  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    category: {
      key: row.category,
      label: CATEGORY_LABELS[row.category] ?? row.category,
    },
    condition: {
      key: row.condition,
      label: CONDITION_LABELS[row.condition] ?? row.condition,
    },
    pathway: {
      key: row.pathway,
      label: PATHWAY_LABELS[row.pathway] ?? row.pathway,
    },
    price: isFree ? 0 : numericPrice,
    formattedPrice: isFree ? 'Free' : `₹${numericPrice.toLocaleString('en-IN')}`,
    isFree,
    status: row.status,
    images: row.images ?? [],
    location: {
      hostelBlock: row.hostel_block,
      displayLocation: `Hostel Block ${row.hostel_block}`,
      coordinates:
        row.latitude !== null && row.longitude !== null
          ? { latitude: row.latitude, longitude: row.longitude }
          : null,
    },
    viewsCount: row.views_count,
    createdAt: row.created_at,
    owner: row.owner
      ? {
          id: row.owner.id,
          fullName: row.owner.full_name,
          avatarUrl: row.owner.avatar_url,
          hostelBlock: row.owner.hostel_block,
          reputationScore: Number(row.owner.reputation_score ?? 5.0),
        }
      : undefined,
  };
}

export function toItemDtoList(rows: DbItemRow[]): ItemDto[] {
  return rows.map(toItemDto);
}
