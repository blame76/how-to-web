# Article Teaser

Struktur-Scaffold für how-to-web. Noch kein fertiges Design.

## Dateien

- `index.html`, `styles.css`, `script.js`: lokale Bühne
- `RESEARCH.md`: Leitplanken
- `examples/variants.json`: geplante Stile
- `examples/build-manifest.sh`: erkennt vorhandene HTML-Beispiele
- `assets/process-images.sh`: skaliert und konvertiert lokale Bilder

Es gibt bewusst kein zentrales CSS oder JavaScript.

## Beispiel erstellen

1. Eigenständige HTML-Datei unter `examples/` anlegen.
2. Lokale Assets aus `../assets/generated/` verwenden.
3. `bash examples/build-manifest.sh` ausführen.
4. `index.html` neu laden; das Beispiel erscheint automatisch.

## Bild generieren

Exakte Basisanweisung:

> Editorial documentary photograph for a generic magazine article teaser, single clear scene, natural light, no text, no logos, no watermark, realistic and credible, horizontal 3:2 composition, 1800px minimum.

UI-Text, Preise, Namen und Beschriftungen bleiben HTML und gehören nicht ins Bild.

Quelldatei nach `assets/source/`, dann:

```bash
bash assets/process-images.sh
```

Die aktuelle Oberfläche bleibt absichtlich schwarz/weiß.
