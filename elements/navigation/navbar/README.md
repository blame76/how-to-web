# Navbar

Vollständige **how-to-web Showcase + Build-DNA-Referenz** für globale Website-Navigation.

## Ziel

Die Referenz beantwortet zwei Fragen:

1. Wie erkennt und spezifiziert ein Mensch eine robuste Navbar?
2. Welche maschinenlesbare DNA braucht ein Coding-Agent, um sie stack-unabhängig korrekt zu rekonstruieren?

## Kanonische Dateien

```text
navbar/
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
    ├── simple.{html,css,js,json}
    ├── with-disclosures.{html,css,js,json}
    └── utility-plus-primary.{html,css,js,json}
```

## Drei Varianten

- **Simple** – direkte globale Links.
- **With Disclosures** – echte Buttons öffnen Untergruppen; kein Hover-Zwang und keine ARIA-Menubar.
- **Utility + Primary** – primäre und ergänzende Navigationsziele bleiben unterscheidbar.

Mobile ist keine vierte Variante. Jede Variante besitzt einen Narrow-State derselben Informationsarchitektur.

## Scope-Grenze

Navbar ist nicht gleich Site Header.

Nicht Teil dieser Referenz sind Promo-Bar, vollständige Suche, Warenkorb, komplexer Account-Flow oder Mega Menu. Ein Host-Header darf diese Bausteine zusammensetzen.

## Build DNA

`build-dna.json` beschreibt:

- Purpose
- Composition
- Data Contract
- Layout
- Behavior
- Responsive Transformation
- Accessibility
- Constraints
- Adaptation Contract
- Acceptance

Die konkreten `examples/*.json` liefern nur Beispiel-Inhalte und Variantenentscheidungen.

## Coding-Agent-Workflow

```text
Baue mir eine Navbar nach
https://blame76.github.io/how-to-web/elements/navigation/navbar/
```

Der Agent soll:

1. lokale Discovery lesen,
2. `build-dna.json` als normativen Rekonstruktionsvertrag nutzen,
3. Navigationsziele, Reihenfolge und Zustände bewahren,
4. Framework und visuelle Tokens an das Zielprojekt anpassen,
5. fehlende Informationsarchitektur nicht erfinden.

## Serien-Gate

Die Navbar gilt als abgeschlossen, wenn:

- alle drei Varianten funktionieren,
- jede Variante ihren Narrow-State besitzt,
- Links/Buttons semantisch korrekt getrennt sind,
- Disclosure- und Mobile-Zustände per Tastatur bedienbar sind,
- Current-State exponiert ist,
- Build DNA ohne Beispielcode rekonstruierbar ist,
- JSON/JS mechanisch validiert sind,
- Cross-LLM-Reconstruction ohne Originalcode sinnvoll konvergiert.
