function getMapboxToken(): string | undefined {
  return (
    (typeof process !== "undefined" && process.env?.MAPBOX_TOKEN) ||
    (typeof window !== "undefined" && (window as any).__ENV__?.MAPBOX_TOKEN) ||
    (typeof import.meta !== "undefined" && (import.meta as any).env?.MAPBOX_TOKEN)
  );
}

export const mapboxConfig = {
  token: getMapboxToken(),
  style: "mapbox://styles/mapbox/light-v11",
  defaultZoom: 10,
  defaultCenter: [46.6753, 24.7136], // Riyadh coordinates
};

export function initMapbox(mapId: string) {
  if (!mapboxConfig.token) {
    console.warn("Mapbox token not found. Maps disabled.");
    return null;
  }

  return {
    token: mapboxConfig.token,
    style: mapboxConfig.style,
    container: mapId,
    zoom: mapboxConfig.defaultZoom,
    center: mapboxConfig.defaultCenter,
  };
}

