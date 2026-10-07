# Vorlage: Feature-Spezifikation

Übernimm diese Gliederung vollständig. Abschnitte, die für ein Feature wirklich nichts enthalten, bleiben mit „–“ stehen, damit klar ist, dass sie bedacht wurden. Kursive Hinweise ersetzen bzw. löschen.

```markdown
# FEAT-<NNN>: <Feature-Titel>

| Feld | Wert |
|---|---|
| Status | Entwurf / Bereit zur Umsetzung |
| Priorität | Muss / Soll / Kann |
| PRD-Bezug | *z. B. B1 oder „neu“* |
| Erstellt | <JJJJ-MM-TT> |
| Geschätzter Aufwand | S / M / L |

## 1. Ziel und Nutzen
*2–4 Sätze: Welches Problem löst das Feature, für wen, woran merkt man den Nutzen?*

## 2. User Story
Als <Rolle> möchte ich <Fähigkeit>, damit <Nutzen>.

## 3. Umfang
### Im Umfang
- …
### Nicht im Umfang
- …

## 4. Funktionale Anforderungen
| ID | Anforderung | Priorität |
|---|---|---|
| FA-1 | … | Muss |

## 5. Akzeptanzkriterien
- **AK-1** – *Kurzname*
  - **Gegeben** …
  - **Wenn** …
  - **Dann** …

## 6. Edge Cases und Fehlerverhalten
| Situation | Erwartetes Verhalten |
|---|---|
| API nicht erreichbar | … |

## 7. UI und Texte
*Platzierung, Bedienelemente (mit Beschriftung), sichtbare Texte wörtlich, Verhalten auf schmalen Bildschirmen, Barrierefreiheit (Tastatur, aria-Labels).*

## 8. Technische Hinweise
- **Betroffene Dateien:** …
- **Daten/Zustand:** …
- **Abhängigkeiten:** *neue Pakete nur, wenn nötig – mit Begründung*
- **Einschränkungen aus dem PRD:** *z. B. nur HTTPS, kein Backend, Leaflet nur clientseitig*

## 9. Umsetzungsschritte
1. …

## 10. Testplan
| Schritt | Erwartung | Deckt ab |
|---|---|---|
| … | … | AK-1 |

## 11. Definition of Done
### Allgemein
- [ ] Alle Akzeptanzkriterien (AK-1 … AK-n) sind erfüllt und manuell im Browser geprüft.
- [ ] `npm run build` läuft ohne Fehler und ohne neue Warnungen.
- [ ] Die Browser-Konsole zeigt keine Fehler, insbesondere keinen Mixed-Content-Fehler.
- [ ] Alle Requests laufen über HTTPS; keine API-Keys oder Secrets im Code.
- [ ] Die Einschränkungen aus dem PRD (Abschnitt 5) sind eingehalten.
- [ ] Die Ansicht funktioniert auf Desktop- und auf Smartphone-Breite (~390 px).
- [ ] Fehlerfälle aus Abschnitt 6 führen nicht zu Absturz oder leerer Seite.
- [ ] Code folgt dem bestehenden Stil im Ordner `app/`; keine toten Code-Reste.
- [ ] Änderungen sind committet; das Deployment (falls vorgesehen) ist aktualisiert und geprüft.
### Feature-spezifisch
- [ ] …

## 12. Annahmen und offene Fragen
- **Annahme:** … *(bitte bestätigen)*
- **Offen:** …
```
