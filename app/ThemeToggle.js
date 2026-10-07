"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "iss-tracker.theme";

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  // Das Start-Design setzt das Skript in layout.js; hier wird es erst nach dem Mount gelesen.
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

    if (!window.matchMedia) return;
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = (event) => {
      // Eine manuelle Wahl hat Vorrang vor der Systemeinstellung.
      if (readStoredTheme()) return;
      const next = event.matches ? "light" : "dark";
      applyTheme(next);
      setTheme(next);
    };
    query.addEventListener("change", onSystemChange);
    return () => query.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Speicher blockiert: Die Wahl gilt dann nur für diese Sitzung.
    }
  }

  const label =
    theme === "light"
      ? "Zu dunklem Design wechseln"
      : theme === "dark"
        ? "Zu hellem Design wechseln"
        : "Design wechseln";

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {theme === "light" && <MoonIcon />}
      {theme === "dark" && <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
