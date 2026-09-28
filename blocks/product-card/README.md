# Product Card

Vollständige **how-to-web Showcase + Build-DNA-Referenz** für eine Product Card.

Die Referenz hat zwei Aufgaben:

1. Menschen sollen eine Product Card sehen, benennen, beurteilen und spezifizieren können.
2. Coding-Agenten sollen sie unabhängig vom Originalcode aus einer implementierungsneutralen Build DNA rekonstruieren können.

## Kanonische Dateien

```text
product-card/
├── index.html          # visuelle/human-readable Referenz
├── index.md            # LLM-freundliche Referenz
├── build-dna.json      # kanonischer Rekonstruktionsvertrag
├── llms.txt            # Agent-Discovery für diesen Pfad
├── RESEARCH.md         # Quellen und fachliche Ableitungen
├── README.md
├── styles.css
├── script.js
├── assets/
│   ├── process-images.sh
│   ├── source/
│   └── generated/
└── examples/
    ├── manifest.json
    ├── variants.json
    ├── build-manifest.sh
    ├── premium-retail.{html,css,js,json}
    ├── technical-retail.{html,css,js,json}
    └── compact.{html,css,js,json}
```

## Build DNA vs. Beispiel-JSON

**`build-dna.json`** beschreibt, was eine Product Card als Web-Baustein ausmacht:

- Purpose
- Composition
- Data Contract
- Layout
- Visual Hierarchy
- Behavior
- Responsive
- Accessibility
- Performance
- Constraints
- Adaptation Contract
- Acceptance

**`examples/premium-retail.json`** enthält dagegen nur konkrete Demo-Daten für den Lunar Hoodie und verweist mit `conforms_to` auf die Build DNA.

Die Beispielimplementierung ist **nicht** die Spezifikation.

## Coding-Agent-Workflow

Der sichtbare Bereich „Für Coding-Agenten“ zeigt fünf typische Auftragsformen:

- generische Product Card,
- Premium Retail,
- Technical Retail,
- Compact,
- Übertragung in ein bestehendes Projekt.

Alle fünf sind Einstiegspunkte in dieselbe Build DNA. Die Varianten sind Beispiele für unterschiedliche Ausprägungen, keine konkurrierenden Spezifikationen.

Ein Agent sollte unabhängig vom Einstieg folgendermaßen arbeiten:

1. `llms.txt` bzw. die Discovery-Links der Seite lesen.
2. `build-dna.json` als primären Rekonstruktionsvertrag verwenden.
3. Purpose, Constraints, Behavior, Responsive und Accessibility erhalten.
4. Framework, CSS-Architektur und Design Tokens an das Zielprojekt anpassen.
5. Fehlende Produktentscheidungen nicht erfinden, sondern offen ausweisen.

## Geometrie-Regel

Der Medienwechsel darf die Karte nicht verändern.

Dafür gilt im Showcase:

- der JSON-Mount besitzt eine feste maximale Inline-Größe,
- die Card selbst ist immer `width: 100%`,
- die Medienfläche bleibt `1:1`,
- unterschiedliche intrinsische Bildabmessungen dürfen weder Kartenbreite noch Seitenverhältnis beeinflussen.

Diese Regel ist zusätzlich in der Build DNA festgeschrieben.

## Varianten

Die Referenz enthält drei vollständige Varianten:

1. `premium-retail` – bildstark, drei Ansichten inklusive Detail-Crop.
2. `technical-retail` – spezifikationsorientiert für vergleichsintensive Produkte.
3. `compact` – platzsparende Listenansicht mit reduzierten Sekundärinformationen.

Die vorhandenen Bildassets sind `hoodie-studio-front` und `hoodie-moon-back`. Die Premium-Variante erzeugt zusätzlich eine Detailansicht als bewussten Crop aus dem Studio-Asset.

## Neue Bilder generieren

### Studio / Produktansicht

> High-end e-commerce studio product photograph of one bare oversized heavyweight hoodie, fully visible from the front, no model, no branding, no typography, no logo, no watermark, realistic fabric texture and folds, neutral seamless background, centered with generous crop room, square 1:1 composition, 2048x2048 or larger.

### Lifestyle / Rückansicht

> Obviously AI-generated cinematic fashion scene on the Moon. One adult model is shown strictly from behind with no face visible, wearing one bare oversized heavyweight hoodie with no branding, print, typography or logo. The model stands on a lunar surface and looks toward the Earth above the horizon. Full hoodie silhouette must remain readable, realistic fabric folds and oversized proportions, dramatic but plausible lunar light, no helmet, no text, no watermark, square 1:1 composition, 2048x2048 or larger.

### Optionale zusätzliche Detailaufnahme

> High-end e-commerce detail photograph of the same bare oversized heavyweight hoodie, close-up of hood, shoulder seam and heavyweight fabric texture, no person, no branding, no typography, no logo, no watermark, neutral studio background, realistic material detail, square 1:1 composition, 2048x2048 or larger.

UI-Text, Produktname, Preis, Labels und Badges bleiben HTML.

## Bilder optimieren

`process-images.sh` unterstützt ImageMagick 7 (`magick`) und ImageMagick 6 (`convert`).

```bash
bash blocks/product-card/assets/process-images.sh
```

Erzeugt 480, 960, 1440 und 1920 Pixel breite WebP-Dateien sowie AVIF, falls unterstützt.

## Beispiele automatisch in die Bühne aufnehmen

```bash
bash blocks/product-card/examples/build-manifest.sh
```

Das Script erzeugt `examples/manifest.json`.

## Serien-Gate

Ein Feature ist erst bereit als Vorlage für die Serie, wenn:

- Human Reference funktioniert,
- Markdown Reference vorhanden ist,
- Build DNA ohne Beispielcode verständlich ist,
- llms.txt Discovery vorhanden ist,
- ein fremdes LLM aus der Build DNA eine funktional äquivalente Umsetzung erzeugen kann,
- Review-Gate und Acceptance erfüllt sind.
