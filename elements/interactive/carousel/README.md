# Carousel

Feature-Baseline für die nächste vollständige how-to-web Organismus-Referenz.

## Zielbild

Der erste visuell starke Showcase wird **Editorial / Visual Story**: ein eigenständiges Full-Bleed-Carousel mit bildschirmfüllenden Gadget-Motiven.

Die normale how-to-web Referenzseite bleibt separat. Sie erklärt Anatomie, Entscheidungen, Research und Build DNA und verlinkt auf die Fullscreen-Demo.

Weitere Varianten werden erst zusammen mit der eigentlichen Umsetzung final festgelegt.

## Asset-Workflow

Source Images bleiben unverändert unter:

```text
elements/interactive/carousel/assets/source/
```

Empfohlene, aber nicht technisch erzwungene Namen:

```text
gadget-charm.png
gadget-ring.png
gadget-pocket.png
gadget-clip.png
```

Das Script verarbeitet alle PNG/JPG/JPEG/WebP/AVIF/TIFF-Dateien im Source-Ordner.

### Lokal erzeugen

```bash
bash elements/interactive/carousel/assets/process-images.sh
```

Ergebnis:

```text
elements/interactive/carousel/assets/generated/
```

Erzeugt werden responsive WebP-Dateien sowie AVIF, falls die lokale ImageMagick-Installation AVIF unterstützt.

Zielbreiten:

```text
640
960
1440
1920
2560
```

Das Script:

- unterstützt ImageMagick 7 (`magick`) und ImageMagick 6 (`convert` + `identify`),
- skaliert nie über die Breite des Originals hinaus,
- erzeugt zusätzlich immer eine Variante in Originalbreite,
- erhält das Original-Seitenverhältnis,
- entfernt Metadaten,
- erzeugt keine Crops.

**Wichtig:** Der Fullscreen-Showcase wird später mit `object-fit: cover` arbeiten. Focal Point / `object-position` wird deshalb pro Slide in JSON definiert und nicht beim Asset-Build fest eingebrannt.

## Danach

Nach lokaler Asset-Erzeugung:

```bash
git add elements/interactive/carousel/assets/
git commit -m "assets: add editorial carousel gadget images"
git push
```

Danach bauen wir auf den echten Assets:

1. Research und Scope,
2. Build DNA,
3. how-to-web Referenzseite,
4. separate Full-Bleed Editorial / Visual Story Demo,
5. weitere Carousel-Varianten,
6. Accessibility/Keyboard/Reduced-Motion Review,
7. Cross-LLM Reconstruction.
