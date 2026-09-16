export type PassportEventType =
  | 'listed'
  | 'ownership_transferred'
  | 'repaired'
  | 'upcycled'
  | 'recycled';

export interface CreatePassportEventInput {
  item_id: string;
  event_type: PassportEventType;
  actor_id?: string;
  hub_id?: string;
  notes: string;
  metadata?: Record<string, unknown>;
}

/**
 * Helper to build standard passport event payloads for inserting into the `item_passport_events` table.
 */
export function buildPassportEvent(
  input: CreatePassportEventInput
): CreatePassportEventInput {
  return {
    item_id: input.item_id,
    event_type: input.event_type,
    actor_id: input.actor_id,
    hub_id: input.hub_id,
    notes: input.notes.trim(),
    metadata: input.metadata ?? {},
  };
}

/**
 * Standard description builder for automated lifecycle milestones.
 */
export function getDefaultEventNote(
  eventType: PassportEventType,
  details?: { hostelBlock?: string; pathway?: string }
): string {
  switch (eventType) {
    case 'listed':
      return details?.pathway
        ? `Listed for ${details.pathway} in Block ${details.hostelBlock ?? 'Campus'}`
        : 'Item registered on ReLoop network';
    case 'ownership_transferred':
      return 'Physical handoff verified between students';
    case 'repaired':
      return 'Restored and verified operational';
    case 'upcycled':
      return 'Repurposed into new functional use';
    case 'recycled':
      return 'Delivered to designated campus e-waste / recycling point';
    default:
      return 'Milestone recorded';
  }
}
