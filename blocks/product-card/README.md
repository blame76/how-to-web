# Product Card

Struktur-Scaffold für how-to-web. Noch kein fertiges Design.

## Dateien

- `index.html` – Referenzgerüst und Bühne
- `styles.css` – ausschließlich lokales Schwarz-Weiß-Grundlayout
- `script.js` – lädt lokale Beispiele
- `RESEARCH.md` – aktuelle Best-Practice-Leitplanken
- `examples/variants.json` – geplante Darstellungen
- `examples/build-manifest.sh` – erzeugt aus vorhandenen HTML-Beispielen das Bühnen-Manifest
- `assets/process-images.sh` – skaliert und konvertiert Bildassets
- `assets/source/` – Originale
- `assets/generated/` – erzeugte Web-Assets

Es gibt bewusst **kein zentrales CSS oder JavaScript** für dieses Showcase. Ein Beispiel soll lokal verständlich und transportierbar bleiben.

## Beispiel erstellen

1. Eine eigenständige HTML-Datei in `examples/` ablegen, z. B. `premium-retail.html`.
2. Beispiel darf lokale Dateien aus diesem Ordner bzw. `../assets/generated/` verwenden.
3. Manifest neu erzeugen:

```bash
bash examples/build-manifest.sh
```

4. `index.html` neu laden. Das Beispiel erscheint automatisch im Switcher.

Dateien, deren Name mit `_` beginnt, werden nicht ins Manifest übernommen.

## Bild generieren

Exakte Basisanweisung für das Bildmodell:

> High-end e-commerce studio product photograph of one generic premium consumer product, fully visible, realistic materials, neutral seamless background, no text, no logo, no brand marks, no watermark, centered with comfortable crop room, square 1:1 composition, 1800x1800 minimum.

Zusätzliche Regel: Das Bild enthält **niemals UI-Text**, Preise, Namen oder Beschriftungen, die später HTML sein sollen. Text bleibt HTML.

Quelldatei anschließend unter `assets/source/` ablegen.

## Bilder skalieren und konvertieren

Voraussetzung: ImageMagick mit `magick`.

```bash
bash assets/process-images.sh
```

Erzeugt WebP in 480, 960, 1440 und 1920 px Breite. Wenn die lokale ImageMagick-Installation AVIF unterstützt, werden zusätzlich AVIF-Dateien erzeugt.

## Qualitätsregel für spätere Showcases

Der how-to-web-Rahmen erklärt. Das Beispiel selbst darf später visuell hochwertig sein. Die aktuelle Struktur bleibt absichtlich schwarz/weiß, bis die Showcase-Richtung separat freigegeben ist.
