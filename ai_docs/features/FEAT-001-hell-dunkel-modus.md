# FEAT-001: Umschalten zwischen hellem und dunklem Design

| Feld | Wert |
|---|---|
| Status | Bereit zur Umsetzung |
| Priorität | Kann |
| PRD-Bezug | neu |
| Erstellt | 2026-10-07 |
| Geschätzter Aufwand | S |

## 1. Ziel und Nutzen
Die App hat heute nur ein dunkles Design. Bei Tageslicht oder für Nutzer, die ihr System auf „hell“ eingestellt haben, ist das unpassend. Künftig startet die App im Farbschema des Betriebssystems, und ein Knopf im Header schaltet zwischen Hell und Dunkel um. Die Wahl bleibt beim nächsten Besuch erhalten.

## 2. User Story
Als Besucher des ISS-Trackers möchte ich zwischen hellem und dunklem Design wechseln können, damit die Seite in meiner Umgebung gut lesbar ist und zu meinen Systemeinstellungen passt.

## 3. Umfang
### Im Umfang
- Zwei Farbschemata (Hell, Dunkel) für die gesamte Oberfläche: Hintergrund, Kacheln, Texte, Links, Fehlerhinweis, Platzhalter der Karte.
- Startmodus nach Systemeinstellung (`prefers-color-scheme`), solange der Nutzer nicht selbst umgeschaltet hat.
- Ein Umschalt-Knopf (Icon-Button) oben rechts im Header.
- Speichern der manuellen Wahl im Browser (`localStorage`).
- Abdunkeln der OpenStreetMap-Kacheln im Dunkelmodus per CSS-Filter.
### Nicht im Umfang
- Eine dritte Option „System“ im Umschalter (Rückkehr zur Systemeinstellung nur durch Löschen der Website-Daten).
- Ein anderer Kachel-Anbieter (z. B. CARTO Dark Matter) – es bleibt bei OpenStreetMap laut PRD.
- Weitere Themes, frei wählbare Akzentfarben oder ein automatischer Wechsel nach Tageszeit.
- Änderungen am ISS-Marker (🛰️) oder an der Datenlogik/dem Polling.

## 4. Funktionale Anforderungen
| ID | Anforderung | Priorität |
|---|---|---|
| FA-1 | Ohne gespeicherte Wahl entspricht das Design der Systemeinstellung (`prefers-color-scheme: light` → Hell, sonst Dunkel). | Muss |
| FA-2 | Ein Klick auf den Umschalt-Knopf wechselt sofort ins jeweils andere Design, ohne Neuladen und ohne Unterbrechung des Pollings. | Muss |
| FA-3 | Die manuelle Wahl wird unter dem Schlüssel `iss-tracker.theme` mit dem Wert `light` oder `dark` gespeichert und beim nächsten Besuch angewendet. | Muss |
| FA-4 | Solange keine manuelle Wahl gespeichert ist, folgt die App einem Wechsel der Systemeinstellung live (ohne Neuladen). | Soll |
| FA-5 | Beim Laden wird das richtige Design schon vor dem ersten Zeichnen gesetzt – kein kurzes Aufblitzen des falschen Designs. | Muss |
| FA-6 | Im Dunkelmodus werden die Kartenkacheln per CSS-Filter abgedunkelt; im Hellmodus werden sie unverändert angezeigt. | Muss |

## 5. Akzeptanzkriterien
- **AK-1** – Start nach Systemeinstellung (hell)
  - **Gegeben** das Betriebssystem steht auf „hell“ und `localStorage` enthält keinen Eintrag `iss-tracker.theme`
  - **Wenn** die Seite geladen wird
  - **Dann** ist `<html data-theme="light">` gesetzt, der Seitenhintergrund ist `#f4f6f8` und die Kartenkacheln sind ungefiltert.
- **AK-2** – Start nach Systemeinstellung (dunkel)
  - **Gegeben** das Betriebssystem steht auf „dunkel“ und es ist keine Wahl gespeichert
  - **Wenn** die Seite geladen wird
  - **Dann** ist `<html data-theme="dark">` gesetzt und die Seite sieht aus wie bisher (Hintergrund `#0b1220`), die Kartenkacheln sind abgedunkelt.
- **AK-3** – Umschalten
  - **Gegeben** die Seite ist im dunklen Design geöffnet
  - **Wenn** der Nutzer auf den Umschalt-Knopf klickt
  - **Dann** wechselt die gesamte Oberfläche inklusive Karte innerhalb eines Frames ins helle Design, der Knopf zeigt nun das Mond-Symbol mit `aria-label="Zu dunklem Design wechseln"`, und die Werte aktualisieren sich weiterhin alle 5 Sekunden.
- **AK-4** – Wahl bleibt erhalten
  - **Gegeben** der Nutzer hat auf „hell“ umgeschaltet, sein System steht auf „dunkel“
  - **Wenn** er die Seite neu lädt
  - **Dann** startet die Seite direkt hell, ohne sichtbares Aufblitzen des dunklen Designs, und `localStorage["iss-tracker.theme"]` ist `"light"`.
- **AK-5** – Systemwechsel ohne gespeicherte Wahl
  - **Gegeben** es ist keine Wahl gespeichert, die Seite ist offen
  - **Wenn** der Nutzer die Systemeinstellung von dunkel auf hell ändert (oder in den DevTools `prefers-color-scheme` emuliert)
  - **Dann** wechselt die Seite ohne Neuladen ins helle Design.
- **AK-6** – Systemwechsel mit gespeicherter Wahl
  - **Gegeben** `iss-tracker.theme` ist `"dark"` gespeichert
  - **Wenn** die Systemeinstellung auf hell wechselt
  - **Dann** bleibt die Seite dunkel.
- **AK-7** – Speicher nicht verfügbar
  - **Gegeben** `localStorage` wirft beim Zugriff eine Exception (z. B. blockierte Website-Daten)
  - **Wenn** die Seite geladen und umgeschaltet wird
  - **Dann** startet sie nach Systemeinstellung, das Umschalten funktioniert für die laufende Sitzung, und die Konsole zeigt keinen unbehandelten Fehler.
- **AK-8** – Fehlerhinweis in beiden Designs lesbar
  - **Gegeben** die API ist nicht erreichbar (z. B. Request in den DevTools blockiert)
  - **Wenn** der Fehlerhinweis angezeigt wird, in Hell und in Dunkel
  - **Dann** ist er in beiden Designs gut lesbar (Kontrast Text/Hintergrund ≥ 4,5 : 1) und deutlich als Warnung erkennbar.
- **AK-9** – Bedienbarkeit
  - **Gegeben** die Seite ist geladen
  - **Wenn** der Nutzer per Tab-Taste zum Knopf navigiert und Enter oder Leertaste drückt
  - **Dann** wechselt das Design; der Knopf hat einen sichtbaren Fokusrahmen und ist mindestens 44 × 44 px groß, auch bei 390 px Bildschirmbreite.

## 6. Edge Cases und Fehlerverhalten
| Situation | Erwartetes Verhalten |
|---|---|
| `localStorage` blockiert/wirft Fehler | Alle Zugriffe in try/catch; Fallback auf Systemeinstellung; Umschalten wirkt nur in der Sitzung (AK-7). |
| Ungültiger gespeicherter Wert (z. B. `"blue"`) | Wird ignoriert wie „nicht gespeichert“ → Systemeinstellung. |
| Browser ohne `matchMedia` | Start im dunklen Design (bisheriges Verhalten). |
| API nicht erreichbar | Polling und Fehlerhinweis unverändert; Hinweis nutzt die Farben des aktiven Designs (AK-8). |
| Umschalten, bevor die Karte geladen ist | Platzhalter „Karte wird geladen …“ nutzt die Farben des aktiven Designs; die Karte erscheint anschließend im richtigen Design. |
| Server-Rendering vs. Browser | Server kennt das Design nicht; das Attribut setzt ein Inline-Skript vor dem Rendern. Kein Hydration-Warning in der Konsole. |

## 7. UI und Texte
- **Platzierung:** Knopf rechts im Header auf Höhe der Überschrift „ISS-Live-Tracker“ (Header wird eine Flex-Zeile mit `justify-content: space-between`; auf schmalen Bildschirmen darf er umbrechen).
- **Knopf:** `<button type="button">` mit Inline-SVG-Symbol (Strich-Icon, kein Emoji), 44 × 44 px, Rahmen in `--border`, Hintergrund `--panel`.
  - Im dunklen Design: Sonnen-Symbol, `aria-label="Zu hellem Design wechseln"`, `title` gleichlautend.
  - Im hellen Design: Mond-Symbol, `aria-label="Zu dunklem Design wechseln"`, `title` gleichlautend.
- **Farbwerte (CSS-Variablen):**

| Variable | Dunkel (wie heute) | Hell |
|---|---|---|
| `--bg` | `#0b1220` | `#f4f6f8` |
| `--panel` | `#131c2e` | `#ffffff` |
| `--border` | `#24324d` | `#d5dde6` |
| `--text` | `#e6ecf5` | `#16202b` |
| `--muted` | `#8fa0bd` | `#5a6573` |
| `--accent` | `#4ea8ff` | `#1f5fd1` |
| `--alert-bg` | `#3b1d1d` | `#fdecea` |
| `--alert-border` | `#a94442` | `#c0392b` |
| `--alert-text` | `#ffd6d6` | `#7a1f17` |

- **Kartenfilter im Dunkelmodus:** auf `.leaflet-tile-pane`: `filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)`. Marker, Zoom-Knöpfe und Attribution werden nicht gefiltert; die OSM-Attribution bleibt lesbar.
- `color-scheme: light` bzw. `dark` je Design setzen, damit Scrollbars und Formularelemente passen.

## 8. Technische Hinweise
- **Betroffene Dateien:**
  - `app/globals.css` – bestehende Variablen in `:root` bleiben als Dunkel-Default; neuer Block `[data-theme="light"]` mit den hellen Werten; Kartenfilter unter `[data-theme="dark"] .leaflet-tile-pane`; Stil für den Knopf.
  - `app/layout.js` – kleines Inline-Skript im `<head>` (vor dem ersten Rendern), das `localStorage` (in try/catch) und `matchMedia` liest und `document.documentElement.dataset.theme` setzt; `<html>` bekommt `suppressHydrationWarning`.
  - `app/page.js` – Header um den Knopf erweitern (oder eigene Client-Komponente `app/ThemeToggle.js`).
- **Daten/Zustand:** Quelle der Wahrheit ist `data-theme` auf `<html>`. Der Knopf liest den Wert nach dem Mount (`useEffect`), setzt ihn beim Klick und speichert ihn. Ein `matchMedia("(prefers-color-scheme: light)")`-Listener aktualisiert das Design nur, solange nichts gespeichert ist.
- **Abhängigkeiten:** keine neuen Pakete (kein `next-themes`).
- **Einschränkungen aus dem PRD:** Karte weiter Leaflet + OpenStreetMap, nur clientseitig; keine zusätzlichen Requests; kein Backend; alles über HTTPS.

## 9. Umsetzungsschritte
1. `globals.css`: helle Variablen unter `[data-theme="light"]` ergänzen, `color-scheme` setzen; durch manuelles Setzen von `data-theme` in den DevTools prüfen, dass alle Elemente beide Designs korrekt annehmen.
2. `layout.js`: Inline-Skript für das Start-Design ergänzen; Neuladen mit beiden Systemeinstellungen prüfen (AK-1, AK-2), kein Aufblitzen.
3. Umschalt-Knopf mit Speichern bauen und in den Header setzen (AK-3, AK-4, AK-9).
4. `matchMedia`-Listener für den Systemwechsel ergänzen (AK-5, AK-6).
5. Kartenfilter für den Dunkelmodus ergänzen und Lesbarkeit der Attribution prüfen.
6. Fehlerfälle prüfen (AK-7, AK-8) und `npm run build` ausführen.

## 10. Testplan
| Schritt | Erwartung | Deckt ab |
|---|---|---|
| DevTools → Rendering → `prefers-color-scheme: light`, `localStorage` leeren, neu laden | Helles Design, Karte ungefiltert | AK-1 |
| Dasselbe mit `dark` | Dunkles Design wie bisher, Karte abgedunkelt | AK-2 |
| Knopf klicken, 10 s warten | Design wechselt sofort, Werte aktualisieren weiter | AK-3 |
| Auf Hell schalten, System auf Dunkel emulieren, neu laden (auch mit „Slow 3G“) | Startet hell ohne Aufblitzen; `localStorage` = `"light"` | AK-4 |
| `localStorage` leeren, Emulation umstellen ohne Neuladen | Seite folgt dem System | AK-5 |
| Wahl `"dark"` speichern, Emulation auf `light` | Seite bleibt dunkel | AK-6 |
| Inkognito mit blockierten Website-Daten öffnen, umschalten | Funktioniert in der Sitzung, keine Konsolenfehler | AK-7 |
| Request an `api.wheretheiss.at` in DevTools blockieren, in beiden Designs ansehen | Hinweis lesbar, Kontrast ≥ 4,5 : 1 (DevTools-Kontrastprüfung) | AK-8 |
| Nur Tastatur, Gerätebreite 390 px | Knopf erreichbar, Fokus sichtbar, ≥ 44 px | AK-9 |

## 11. Definition of Done
### Allgemein
- [ ] Alle Akzeptanzkriterien (AK-1 … AK-9) sind erfüllt und manuell im Browser geprüft.
- [ ] `npm run build` läuft ohne Fehler und ohne neue Warnungen.
- [ ] Die Browser-Konsole zeigt keine Fehler, insbesondere keinen Mixed-Content-Fehler.
- [ ] Alle Requests laufen über HTTPS; keine API-Keys oder Secrets im Code.
- [ ] Die Einschränkungen aus dem PRD (Abschnitt 5) sind eingehalten.
- [ ] Die Ansicht funktioniert auf Desktop- und auf Smartphone-Breite (~390 px).
- [ ] Fehlerfälle aus Abschnitt 6 führen nicht zu Absturz oder leerer Seite.
- [ ] Code folgt dem bestehenden Stil im Ordner `app/`; keine toten Code-Reste.
- [ ] Änderungen sind committet; das Deployment (falls vorgesehen) ist aktualisiert und geprüft.
### Feature-spezifisch
- [ ] Beim Laden blitzt in keiner Kombination aus System- und gespeicherter Einstellung das falsche Design auf (AK-4).
- [ ] Keine Hydration-Warnung in der Konsole.
- [ ] Alle Textfarben erreichen in beiden Designs mindestens 4,5 : 1 Kontrast zu ihrem Hintergrund.
- [ ] Keine neue npm-Abhängigkeit; Kartenkacheln weiterhin von OpenStreetMap.
- [ ] Der Umschalt-Knopf hat in beiden Zuständen ein passendes `aria-label`.

## 12. Annahmen und offene Fragen
- **Entschieden mit dem Nutzer:** Start nach Systemeinstellung; ein Knopf Hell ↔ Dunkel; OSM-Kacheln werden im Dunkelmodus per CSS-Filter abgedunkelt.
- **Annahme:** Die hellen Farbwerte in Abschnitt 7 sind ein Vorschlag (angelehnt an Variante „B · Atlas“ der Design-Entwürfe) und dürfen bei der Umsetzung leicht angepasst werden, solange die Kontrastanforderung erfüllt bleibt.
- **Offen:** –
