---
name: feature-spec
description: Verfasst eine strukturierte, umsetzungsreife Feature-Spezifikation (User Story, Akzeptanzkriterien, Edge Cases, technische Hinweise, Definition of Done) für diese App und speichert sie als Markdown unter ai_docs/features/. Verwende diesen Skill immer, wenn der Nutzer ein neues Feature, eine Erweiterung, eine Bonus-Aufgabe oder eine Änderung an der App planen, beschreiben, spezifizieren oder "aufschreiben" möchte – auch wenn er nur sagt "ich will X einbauen, lass uns das erst mal sauber festhalten", "schreib mir ein Ticket/eine Story für ...", "Feature-Spec", "Anforderungen für ...", "DoD für ..." oder ein Feature aus dem PRD (z. B. B1–B4) vorbereiten will. Nicht verwenden, wenn der Nutzer das Feature direkt implementiert haben will, ohne vorher eine Spezifikation zu wollen.
---

# Feature-Spezifikation schreiben

Ziel ist ein Dokument, mit dem eine Entwicklerin oder ein Coding-Agent das Feature **ohne Rückfragen** umsetzen und am Ende objektiv prüfen kann, ob es fertig ist. Jede Aussage in der Spezifikation sollte daher entweder eine Entscheidung, eine prüfbare Anforderung oder eine klar markierte Annahme sein – vage Formulierungen ("soll schön aussehen", "schnell laden") helfen bei der Umsetzung nicht und gehören präzisiert oder gestrichen.

## Ablauf

### 1. Kontext einlesen, bevor du fragst

Lies zuerst, was es schon gibt, damit du nur noch fragst, was du wirklich nicht weißt:

- `ai_docs/PRD.md` – Ziele, Muss-/Bonus-Anforderungen (IDs wie F1, B2), nicht-funktionale Einschränkungen (z. B. nur HTTPS, kein Backend, Leaflet nur clientseitig). Die Spezifikation darf diesen Einschränkungen nicht widersprechen; wenn das Feature es doch muss (z. B. B4 braucht einen Proxy), benenne den Konflikt ausdrücklich.
- Bestehende Specs in `ai_docs/features/` – für die nächste freie Nummer und um Überschneidungen zu erkennen.
- Den relevanten Code unter `app/` – damit die technischen Hinweise auf echte Dateien, Komponenten und Datenfelder verweisen (z. B. welche Felder die API schon liefert).

### 2. Offene Punkte gebündelt klären

Formuliere aus dem Kontext für jede wichtige Entscheidung einen konkreten Vorschlag. Frag den Nutzer dann **in einer Runde** nur nach dem, was du nicht sinnvoll selbst entscheiden kannst – höchstens etwa vier Fragen, jeweils mit deinem Vorschlag als erste Option (z. B. per AskUserQuestion). Typische Kandidaten: Umfang (was ist bewusst *nicht* Teil des Features), Verhalten in Grenzfällen, sichtbare Texte/UI-Platzierung, Priorität.

Kleinkram (Benennungen, Rundung, Reihenfolge) entscheidest du selbst und schreibst ihn als Entscheidung hinein. Ist niemand erreichbar, der antworten kann, frag nicht, sondern triff die Entscheidung und führe sie im Abschnitt „Annahmen“ auf – so sieht der Leser sofort, was noch bestätigt werden sollte.

### 3. Spezifikation schreiben

Lies `references/template.md` und folge genau dieser Gliederung. Hinweise zu den Abschnitten, die am häufigsten schiefgehen:

- **Akzeptanzkriterien** als Given/When/Then mit IDs (AK-1, AK-2 …). Jedes Kriterium muss im Browser oder per Test beobachtbar sein – mit konkreten Zahlen und Texten statt Adjektiven. Decke den Normalfall *und* die wichtigsten Fehler-/Grenzfälle ab (API nicht erreichbar, leere Daten, Datumsgrenze ±180° Länge, mobile Breite, …).
- **Nicht im Umfang** ist genauso wichtig wie der Umfang: Es verhindert, dass bei der Umsetzung Dinge „mitgebaut“ werden.
- **Technische Hinweise** nennen betroffene Dateien, neue Zustände/Daten und Abhängigkeiten. Sie sind Leitplanken, kein fertiger Code – schreib keine vollständige Implementierung hinein.
- **Umsetzungsschritte**: kleine, einzeln prüfbare Schritte in sinnvoller Reihenfolge, damit die Umsetzung inkrementell laufen kann.
- **Definition of Done**: Checkliste aus den allgemeinen Punkten der Vorlage (Build, keine Konsolenfehler, HTTPS, PRD-Einschränkungen …) **plus** feature-spezifischen Punkten. Jeder Punkt ist abhakbar mit Ja/Nein. Verweise auf die AK-IDs, statt sie zu wiederholen.

Schreib auf Deutsch (so wie das PRD), knapp und in vollständigen Sätzen, wo Erklärung nötig ist, sonst in Listen/Tabellen.

### 4. Speichern und zusammenfassen

- Dateiname: `ai_docs/features/FEAT-<NNN>-<kebab-slug>.md`, `NNN` = nächste freie dreistellige Nummer (beginnend bei 001), Slug kurz und ohne Umlaute (z. B. `FEAT-002-bahnspur.md`). Die Präfix `FEAT-` vermeidet Verwechslung mit den Anforderungs-IDs des PRD (F1, B1 …).
- Status im Kopf: `Entwurf`, solange Annahmen offen sind, sonst `Bereit zur Umsetzung`.
- Antworte danach kurz: Pfad der Datei, ein Satz zum Feature, die offenen Annahmen (falls vorhanden) und der Hinweis, dass die Umsetzung mit z. B. „Setze ai_docs/features/FEAT-… um“ gestartet werden kann. Implementiere das Feature nicht selbst, solange der Nutzer das nicht verlangt.
