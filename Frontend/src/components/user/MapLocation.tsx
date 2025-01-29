import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;

interface MapProps {
  coordinates: [number, number];
}

const MapLocation: React.FC<MapProps> = ({ coordinates }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map if not already created
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: coordinates, // Initial map center
        zoom: 12,
      });
    }

    // Fly to new location on coordinates change
    if (mapRef.current) {
      mapRef.current.flyTo({ center: coordinates, zoom: 12 });
    }
  }, [coordinates]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "400px", borderRadius: "8px" }}
    />
  );
};

export default MapLocation;
