# Mega Menu

Vollständige **how-to-web Entscheidungs-, Showcase- und Build-DNA-Referenz** für großflächige Website-Navigation.

## Decision-first

Die öffentliche Seite beginnt bewusst nicht mit dem fertigen Organismus. Sie vergleicht dieselbe Informationsarchitektur als Simple Dropdown, Cascading Navigation und Mega Menu und macht Gewinn und Kosten sichtbar.

Das Selection Gate fragt nach Menge, Gruppierbarkeit, Überblicksbedarf und Komplexitätskosten. Es gibt absichtlich keine universelle Linkzahl, ab der ein Mega Menu „richtig“ wäre.

Ein zweites Gegenbeispiel trennt Pattern und Informationsarchitektur: Eine große Fläche repariert keine schwachen Gruppen oder Labels.

## Varianten

1. **Grouped Links** – klassische Kategorien in scanbaren Gruppen.
2. **Task Based** – Navigation nach Nutzeraufgaben statt interner Organisation.
3. **Featured Content** – Linkgruppen plus ein einzelner untergeordneter visueller Teaser.

Alle Referenzvarianten verwenden Click/Tap als Baseline. Hover ist bewusst nicht erforderlich.

## Kanonische Dateien

```text
mega-menu/
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
    ├── grouped-links.{html,css,js,json}
    ├── task-based.{html,css,js,json}
    └── featured-content.{html,css,js,json}
```

## Semantik

Website-Navigation bleibt Website-Navigation:

- `nav`
- Listen
- Links
- native Disclosure-Buttons
- `aria-expanded`

Kein `role="menu"`, `menubar` oder `menuitem` für gewöhnliche Site-Navigation.

Wenn eine Top-Level-Kategorie selbst navigiert, bleiben Link und Disclosure-Button getrennte Controls.

## Verhalten

- Click/Tap und Enter/Space öffnen.
- Maximal ein Mega Panel ist gleichzeitig offen.
- Escape schließt und fokussiert den Trigger.
- Verlässt Fokus die Navigation vollständig, schließt das Panel.
- Pointer außerhalb darf ebenfalls schließen.
- Tab/Shift+Tab bleiben normaler Dokumentfluss.
- Hover ist optionales Enhancement, nicht Voraussetzung.

## Mobile

Die Informationsarchitektur bleibt erhalten. Die Desktop-Spalten werden auf schmalen Viewports gestapelt; es wird keine zweite, unabhängige Navigation erfunden.

## Featured Content

Featured Content ist optional und sekundär. Die Referenz erlaubt einen einzelnen visuellen Teaser. Keine Formulare, Slider, Tabs oder Mini-Anwendungen im Mega Panel.

## Build DNA

`build-dna.json` beschreibt insbesondere:

- Link-vs-Trigger-Semantik
- Gruppenstruktur
- Disclosure-Zustand
- Dismiss-Verhalten
- optionales Hover
- Current-Page-Semantik
- Mobile-Reflow
- Grenzen für Featured Content

## Coding-Agent-Einstiege

- generisches Mega Menu
- Grouped Links
- Task Based
- Featured Content
- Übertragung in ein bestehendes Projekt

Alle Einstiegspunkte verwenden dieselbe Build DNA.

## Serien-Gate

Das Feature gilt als abgeschlossen, wenn:

- alle drei Varianten funktionieren,
- kein ARIA-Menubar-Verhalten eingeschmuggelt wurde,
- Click/Tap und Tastatur ohne Hover funktionieren,
- Escape/Focus-Leaving sauber schließen,
- Linkgruppen semantisch und scanbar bleiben,
- Mobile dieselbe IA erhält,
- JSON/JS mechanisch valide sind,
- Build DNA ohne Beispielcode rekonstruierbar ist.
