import { DEFAULT_CAMPUS_HUBS, CampusHubDefinition, HostelBlock } from '../constants/campusHubs';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface HubDistanceMatch {
  hub: CampusHubDefinition;
  distanceMeters: number;
  formattedDistance: string;
}

// Approximate reference coordinates for campus Hostel Blocks (Blocks A–F)
export const HOSTEL_COORDINATES: Record<HostelBlock, Coordinates> = {
  A: { latitude: 19.0760, longitude: 72.8777 },
  B: { latitude: 19.0763, longitude: 72.8780 },
  C: { latitude: 19.0766, longitude: 72.8783 },
  D: { latitude: 19.0770, longitude: 72.8786 },
  E: { latitude: 19.0774, longitude: 72.8789 },
  F: { latitude: 19.0778, longitude: 72.8792 },
};

/**
 * Calculates straight-line distance in meters between two coordinates using the Haversine formula.
 */
export function calculateDistanceMeters(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371e3; // Earth's radius in meters
  const lat1Rad = (coord1.latitude * Math.PI) / 180;
  const lat2Rad = (coord2.latitude * Math.PI) / 180;
  const deltaLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Finds the nearest campus hub (e.g. drop-off spot, repair kiosk, or e-waste bin) for a given location or hostel block.
 */
export function findNearestHub(
  origin: Coordinates | HostelBlock,
  hubType?: 'drop_off' | 'repair_station' | 'recycle_point',
  availableHubs: CampusHubDefinition[] = DEFAULT_CAMPUS_HUBS
): HubDistanceMatch | null {
  const originCoords: Coordinates =
    typeof origin === 'string'
      ? HOSTEL_COORDINATES[origin] ?? HOSTEL_COORDINATES.A
      : origin;

  const filteredHubs = hubType
    ? availableHubs.filter((h) => h.hub_type === hubType)
    : availableHubs;

  if (filteredHubs.length === 0) return null;

  let nearestHub: CampusHubDefinition = filteredHubs[0];
  let minDistance = calculateDistanceMeters(originCoords, {
    latitude: nearestHub.latitude,
    longitude: nearestHub.longitude,
  });

  for (let i = 1; i < filteredHubs.length; i++) {
    const hub = filteredHubs[i];
    const dist = calculateDistanceMeters(originCoords, {
      latitude: hub.latitude,
      longitude: hub.longitude,
    });

    if (dist < minDistance) {
      minDistance = dist;
      nearestHub = hub;
    }
  }

  const formattedDistance =
    minDistance < 1000
      ? `${minDistance}m away`
      : `${(minDistance / 1000).toFixed(1)}km away`;

  return {
    hub: nearestHub,
    distanceMeters: minDistance,
    formattedDistance,
  };
}
