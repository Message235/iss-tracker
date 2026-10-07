"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

// Leaflet greift auf window zu und darf daher nur im Browser geladen werden.
const IssMap = dynamic(() => import("./IssMap"), {
  ssr: false,
  loading: () => <div className="map-placeholder">Karte wird geladen …</div>,
});

const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
const POLL_INTERVAL_MS = 5000;

const formatNumber = (value, digits) =>
  value.toLocaleString("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function Home() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosition() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        setPosition({
          latitude: data.latitude,
          longitude: data.longitude,
          altitude: data.altitude,
          velocity: data.velocity,
        });
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.warn("ISS-Position konnte nicht geladen werden:", err);
        setError(
          "Die ISS-Daten sind gerade nicht erreichbar. Wir versuchen es automatisch alle 5 Sekunden erneut."
        );
      }
    }

    fetchPosition();
    const id = setInterval(fetchPosition, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <main className="container">
      <header className="header">
        <div>
          <h1>ISS-Live-Tracker</h1>
          <p className="subtitle">
            Aktuelle Position der Internationalen Raumstation, aktualisiert alle 5 Sekunden.
          </p>
        </div>
        <ThemeToggle />
      </header>

      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}

      <section className="stats" aria-live="polite">
        <Stat label="Breite" value={position && `${formatNumber(position.latitude, 4)}°`} />
        <Stat label="Länge" value={position && `${formatNumber(position.longitude, 4)}°`} />
        <Stat label="Höhe" value={position && `${formatNumber(position.altitude, 1)} km`} />
        <Stat
          label="Geschwindigkeit"
          value={position && `${formatNumber(position.velocity, 0)} km/h`}
        />
      </section>

      <div className="map-wrapper">
        <IssMap position={position} />
      </div>

      <footer>
        {lastUpdate
          ? `Letzte Aktualisierung: ${lastUpdate.toLocaleTimeString("de-DE")}`
          : "Warte auf erste Daten …"}
        {" · Daten: "}
        <a href="https://wheretheiss.at/" target="_blank" rel="noreferrer">
          wheretheiss.at
        </a>
      </footer>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value ?? "–"}</span>
    </div>
  );
}
