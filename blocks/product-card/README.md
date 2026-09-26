# Product Card

Erster vollständig ausgearbeiteter Showcase-Block für **how-to-web**.

Die Referenzseite bleibt schwarz/weiß. Das eigentliche Beispiel ist lokal gekapselt und wird aus JSON gerendert.

## Struktur

```text
product-card/
├── index.html
├── styles.css
├── script.js
├── RESEARCH.md
├── README.md
├── assets/
│   ├── process-images.sh
│   ├── source/
│   └── generated/
└── examples/
    ├── manifest.json
    ├── variants.json
    ├── build-manifest.sh
    ├── premium-retail.html
    ├── premium-retail.css
    ├── premium-retail.js
    └── premium-retail.json
```

Es gibt bewusst **kein zentrales CSS oder JavaScript** für das Beispiel.

## Aktuelles Beispiel

`premium-retail.html` rendert seine Produktdaten aus `premium-retail.json`.

Das JSON enthält:

- Produktbezeichnung und Preis
- Demo-Bewertungsdaten
- Variant-Cue
- Bildquellen für AVIF/WebP
- Alt-Texte und Bildrollen
- Darstellungsentscheidungen

Damit ist die Beispielseite austauschbar, ohne HTML neu zu schreiben.

## Vorhandene Bildassets

Aktuell werden zwei freigegebene Ansichten verwendet:

1. `hoodie-studio-front` – neutrale Studioansicht
2. `hoodie-moon-back` – getragene Rückansicht auf dem Mond mit Blick auf die Erde

Für Apparel empfiehlt die aktuelle Baymard-Forschung mindestens drei zugängliche Produktansichten. Der aktuelle Zwei-Bild-Stand ist deshalb im Review ausdrücklich als offene Lücke dokumentiert.

## Neue Bilder generieren

### Studio / Produktansicht

> High-end e-commerce studio product photograph of one bare oversized heavyweight hoodie, fully visible from the front, no model, no branding, no typography, no logo, no watermark, realistic fabric texture and folds, neutral seamless background, centered with generous crop room, square 1:1 composition, 2048x2048 or larger.

### Lifestyle / Rückansicht

> Obviously AI-generated cinematic fashion scene on the Moon. One adult model is shown strictly from behind with no face visible, wearing one bare oversized heavyweight hoodie with no branding, print, typography or logo. The model stands on a lunar surface and looks toward the Earth above the horizon. Full hoodie silhouette must remain readable, realistic fabric folds and oversized proportions, dramatic but plausible lunar light, no helmet, no text, no watermark, square 1:1 composition, 2048x2048 or larger.

### Weitere sinnvolle dritte Ansicht

> High-end e-commerce detail photograph of the same bare oversized heavyweight hoodie, close-up of hood, shoulder seam and heavyweight fabric texture, no person, no branding, no typography, no logo, no watermark, neutral studio background, realistic material detail, square 1:1 composition, 2048x2048 or larger.

UI-Text, Produktname, Preis, Labels und Badges gehören **nie** ins generierte Bild. Sie bleiben HTML.

Originale kommen nach:

```text
assets/source/
```

## Bilder optimieren

`process-images.sh` unterstützt ImageMagick 7 (`magick`) und ImageMagick 6 (`convert`).

```bash
bash blocks/product-card/assets/process-images.sh
```

Erzeugt 480, 960, 1440 und 1920 Pixel breite WebP-Dateien sowie AVIF, falls die lokale Installation AVIF unterstützt.

## Beispiele automatisch in die Bühne aufnehmen

Nach dem Anlegen oder Entfernen einer HTML-Datei:

```bash
bash blocks/product-card/examples/build-manifest.sh
```

Das Script erzeugt `examples/manifest.json`. Existiert ein gleichnamiges JSON, wird dessen `label` für den Switcher verwendet.

## Qualitätsregel

Ein neues Beispiel gilt erst als Showcase, wenn:

- sein Inhalt aus JSON kommt,
- es isoliert ohne zentrale Beispiel-CSS/JS-Abhängigkeit funktioniert,
- Tastaturbedienung und Fokus sichtbar sind,
- responsive Bilder verwendet werden,
- es bei 200 % Zoom und schmalen Viewports nicht zerfällt,
- keine Produktbehauptung erfunden wird, ohne sie als Demo-Inhalt zu kennzeichnen.
