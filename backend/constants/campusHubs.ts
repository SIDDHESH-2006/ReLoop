export interface CampusHubDefinition {
  name: string;
  hub_type: 'drop_off' | 'repair_station' | 'recycle_point';
  hostel_or_building: string;
  latitude: number;
  longitude: number;
  operating_hours: string;
}

// ─── Hostel Blocks ───────────────────────────────────────────────
export const HOSTEL_BLOCKS = [
  'A', 'B', 'C', 'D', 'E', 'F',
] as const;

export type HostelBlock = (typeof HOSTEL_BLOCKS)[number];

// ─── Pre-defined Campus Hub Locations ────────────────────────────
// Update coordinates to match your actual campus layout.
export const DEFAULT_CAMPUS_HUBS: CampusHubDefinition[] = [
  {
    name: 'Block A Drop-Off Point',
    hub_type: 'drop_off',
    hostel_or_building: 'Block A - Ground Floor',
    latitude: 19.0760,
    longitude: 72.8777,
    operating_hours: '24/7',
  },
  {
    name: 'Block B Drop-Off Point',
    hub_type: 'drop_off',
    hostel_or_building: 'Block B - Common Room',
    latitude: 19.0763,
    longitude: 72.8780,
    operating_hours: '24/7',
  },
  {
    name: 'Block C Drop-Off Point',
    hub_type: 'drop_off',
    hostel_or_building: 'Block C - Ground Floor',
    latitude: 19.0766,
    longitude: 72.8783,
    operating_hours: '24/7',
  },
  {
    name: 'Central E-Waste Bin',
    hub_type: 'recycle_point',
    hostel_or_building: 'Admin Block - Parking Area',
    latitude: 19.0755,
    longitude: 72.8790,
    operating_hours: 'Mon-Sat: 8 AM - 6 PM',
  },
  {
    name: 'Campus Repair Kiosk',
    hub_type: 'repair_station',
    hostel_or_building: 'Workshop Wing',
    latitude: 19.0758,
    longitude: 72.8785,
    operating_hours: 'Mon-Sat: 4 PM - 8 PM',
  },
  {
    name: 'Library Book Exchange Shelf',
    hub_type: 'drop_off',
    hostel_or_building: 'Central Library - Entrance',
    latitude: 19.0750,
    longitude: 72.8775,
    operating_hours: 'Mon-Sat: 9 AM - 9 PM',
  },
];
