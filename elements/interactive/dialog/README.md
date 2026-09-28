# Dialog

Vollständige **how-to-web Showcase + Build-DNA-Referenz** für modale Dialoge.

## Varianten

1. **Information / Long Content** – Initialfokus auf statischen Inhalt am Anfang.
2. **Form** – Initialfokus auf das erste relevante Eingabefeld.
3. **Destructive Confirmation** – Initialfokus auf die weniger destruktive Aktion.

Alle Referenzvarianten verwenden natives `<dialog>` mit `showModal()`.

## Kanonische Dateien

```text
dialog/
├── index.html
├── index.md
├── build-dna.json
├── llms.txt
├── RESEARCH.md
├── README.md
├── styles.css
├── script.js
└── examples/
    ├── manifest.json
    ├── variants.json
    ├── build-manifest.sh
    ├── information.{html,css,js,json}
    ├── form.{html,css,js,json}
    └── confirmation.{html,css,js,json}
```

## Warum drei Varianten?

Der sichtbare Container ist ähnlich. Der entscheidende Unterschied liegt im Fokusvertrag:

- längerer Inhalt → statischer Startpunkt,
- Formular → erstes relevantes Feld,
- destruktive Bestätigung → weniger destruktive Aktion.

Damit testet dieses Feature genau die Information, die ein Screenshot nicht zuverlässig weitergeben kann.

## Fokus-Rückgabe

Normalfall: Fokus zurück zum Invoker.

Ausnahme im Confirmation-Beispiel: Wird die Demo-Löschung bestätigt, verschwindet der Invoker mit dem Projekt. Fokus geht deshalb zum nächsten logischen Ergebnisbereich. Bei Cancel kehrt er zum Invoker zurück.

## Scope

Nicht Teil dieser Referenz:

- Popover
- Tooltip
- Drawer
- Toast
- non-modale Floating Panels

## Build DNA

Die Build DNA beschreibt insbesondere:

- Modalität und Inertheit
- Initialfokusstrategie
- Tab/Shift+Tab
- Escape
- explizites Schließen
- Backdrop-Click als bewusste Entscheidung
- Fokusrückgabe
- Narrow-/Zoom-Verhalten

## Coding-Agent-Einstiege

- generischer Dialog
- Information / Long Content
- Form
- Destructive Confirmation
- Übertragung in ein bestehendes Projekt

Alle Einstiegspunkte verwenden dieselbe Build DNA.

## Serien-Gate

Das Feature gilt als abgeschlossen, wenn:

- alle drei Varianten funktionieren,
- Initialfokus pro Variante korrekt ist,
- Escape und explizites Schließen funktionieren,
- Hintergrund modal inert ist,
- Fokusrückgabe dem dokumentierten Workflow folgt,
- JSON/JS mechanisch valide sind,
- Build DNA ohne Beispielcode rekonstruierbar ist,
- Cross-LLM-Reconstruction sinnvoll konvergiert.
