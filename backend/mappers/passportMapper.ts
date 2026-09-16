// Raw Database Row Shape (from PostgreSQL `item_passport_events`)
export interface DbPassportEventRow {
  id: string;
  item_id: string;
  event_type: string; // 'listed', 'ownership_transferred', 'repaired', 'upcycled', 'recycled'
  actor_id: string | null;
  hub_id: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  actor?: {
    full_name: string;
    hostel_block: string;
  } | null;
  hub?: {
    name: string;
    hub_type: string;
  } | null;
}

export interface PassportTimelineEventDto {
  id: string;
  eventType: string;
  title: string;
  description: string;
  timestamp: string;
  actorName: string;
  hubName: string | null;
}

export interface ItemPassportDto {
  itemId: string;
  itemTitle: string;
  totalTransfers: number;
  totalRepairs: number;
  timeline: PassportTimelineEventDto[];
}

function formatEventTitle(eventType: string): string {
  switch (eventType) {
    case 'listed':
      return 'First Listed on ReLoop';
    case 'ownership_transferred':
      return 'Campus Peer Handoff';
    case 'repaired':
      return 'Fixed & Restored';
    case 'upcycled':
      return 'Upcycled / Repurposed';
    case 'recycled':
      return 'Recycled Responsibly';
    default:
      return 'Lifecycle Milestone';
  }
}

export function toPassportTimelineEventDto(
  row: DbPassportEventRow
): PassportTimelineEventDto {
  return {
    id: row.id,
    eventType: row.event_type,
    title: formatEventTitle(row.event_type),
    description: row.notes ?? '',
    timestamp: row.created_at,
    actorName: row.actor?.full_name
      ? `${row.actor.full_name} (Block ${row.actor.hostel_block})`
      : 'Campus Member',
    hubName: row.hub?.name ?? null,
  };
}

export function toItemPassportDto(
  itemId: string,
  itemTitle: string,
  eventRows: DbPassportEventRow[]
): ItemPassportDto {
  const timeline = eventRows.map(toPassportTimelineEventDto);

  const totalTransfers = eventRows.filter(
    (e) => e.event_type === 'ownership_transferred'
  ).length;
  const totalRepairs = eventRows.filter(
    (e) => e.event_type === 'repaired'
  ).length;

  return {
    itemId,
    itemTitle,
    totalTransfers,
    totalRepairs,
    timeline,
  };
}
