"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

const issIcon = L.divIcon({
  className: "iss-icon",
  html: "🛰️",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export default function IssMap({ position }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      center: [0, 0],
      zoom: 2,
      worldCopyJump: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
    }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !position) return;
    const latLng = [position.latitude, position.longitude];

    if (markerRef.current) {
      markerRef.current.setLatLng(latLng);
    } else {
      markerRef.current = L.marker(latLng, { icon: issIcon, title: "ISS" }).addTo(map);
      map.setView(latLng, 3);
    }
  }, [position]);

  return <div ref={containerRef} className="map" />;
}
