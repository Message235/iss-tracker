import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata = {
  title: "ISS-Live-Tracker",
  description: "Aktuelle Position der Internationalen Raumstation live auf der Karte",
};

// Setzt das Design vor dem ersten Zeichnen, damit nicht kurz das falsche aufblitzt.
const themeScript = `(function () {
  var theme;
  try {
    var stored = localStorage.getItem("iss-tracker.theme");
    if (stored === "light" || stored === "dark") theme = stored;
  } catch (e) {}
  if (!theme) {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.documentElement.dataset.theme = theme;
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
