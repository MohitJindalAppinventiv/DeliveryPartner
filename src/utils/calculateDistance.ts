

export default function calculateDistanceInMeters(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number
): number {
  // console.log("calculateDistanceInMeters inputs:", { lng1, lat1, lng2, lat2 });

  const metersPerDegLat = 111320;
  const avgLat = (lat1 + lat2) / 2;
  const metersPerDegLng =
    (40075000 * Math.cos((avgLat * Math.PI) / 180)) / 360;

  const dx = (lng2 - lng1) * metersPerDegLng;
  const dy = (lat2 - lat1) * metersPerDegLat;

  const distance = Math.sqrt(dx * dx + dy * dy);

  // console.log("dx:", dx, "dy:", dy, "distance:", distance);

  return distance;
}