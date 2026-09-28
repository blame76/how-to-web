# Carousel

Vollständige **how-to-web Showcase + Build-DNA-Referenz** für das Carousel-Organism.

## Varianten

1. **Editorial / Visual Story** – eigenständige Full-Bleed-Seite mit einem sichtbaren Slide.
2. **Content Rail** – mehrere Cards gleichzeitig sichtbar, native horizontale Scrollbarkeit plus Prev/Next.
3. **Media Gallery** – großes Medium mit direkter Thumbnail-Auswahl.

Autoplay ist in keiner Referenzvariante aktiv. Es bleibt eine explizite Produktentscheidung mit eigenem Accessibility-Vertrag.

## Kanonische Dateien

```text
carousel/
├── index.html
├── index.md
├── build-dna.json
├── llms.txt
├── RESEARCH.md
├── README.md
├── styles.css
├── script.js
├── assets/
│   ├── source/
│   ├── generated/
│   └── process-images.sh
└── examples/
    ├── manifest.json
    ├── variants.json
    ├── build-manifest.sh
    ├── editorial-story.{html,css,js,json}
    ├── content-rail.{html,css,js,json}
    └── media-gallery.{html,css,js,json}
```

## Full-Bleed Showcase

Direkt lokal:

```text
/elements/interactive/carousel/examples/editorial-story.html
```

Öffentlich nach Merge:

```text
https://blame76.github.io/how-to-web/elements/interactive/carousel/examples/editorial-story.html
```

Die Referenzseite verlinkt diese Demo ausdrücklich separat, damit die visuelle Story nicht in die normale how-to-web-Bühne gezwängt wird.

## Asset-Workflow

Originale:

```text
assets/source/
gadget-charm.png
gadget-ring.png
gadget-pocket.png
gadget-clip.png
```

Responsive Assets:

```bash
bash elements/interactive/carousel/assets/process-images.sh
```

Das Script unterstützt ImageMagick 6/7, WebP und optional AVIF, skaliert nie hoch und croppt nicht. Focal Point und `object-position` werden pro Slide im jeweiligen JSON festgelegt.

## Build DNA

`build-dna.json` beschreibt den generischen Carousel-Vertrag:

- Sequenz und Slide-Composition
- Previous/Next Controls
- optionaler Picker
- Fokusverhalten
- Hidden-Content-Regeln
- Autoplay-Entscheidung
- Reduced Motion
- Responsive Verhalten
- Acceptance

Beispiel-JSONs sind Ausprägungen dieses Vertrags, nicht die Spezifikation selbst.

## Coding-Agent-Einstiege

- generisches Carousel
- Editorial / Visual Story
- Content Rail
- Media Gallery
- Übertragung in ein bestehendes Projekt

Alle Einstiegspunkte lösen auf dieselbe Build DNA auf.

## Serien-Gate

Das Feature gilt als abgeschlossen, wenn:

- alle drei Varianten funktionieren,
- Editorial Story separat Full-Bleed nutzbar ist,
- JSON/JS mechanisch valide sind,
- Tastaturpfade und Fokusverhalten nachvollziehbar sind,
- Reduced Motion berücksichtigt wird,
- Build DNA ohne Beispielcode rekonstruierbar ist,
- Cross-LLM-Reconstruction im fremden Agenten sinnvoll konvergiert.
