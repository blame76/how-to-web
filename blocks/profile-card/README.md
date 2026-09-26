# Profile Card

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

> Professional editorial portrait of a fictional adult professional, chest-up, natural expression, neutral background, no text, no logos, no watermark, realistic photography, inclusive and non-stereotyped presentation, vertical 4:5 composition, 1600px minimum.

UI-Text, Preise, Namen und Beschriftungen bleiben HTML und gehören nicht ins Bild.

Quelldatei nach `assets/source/`, dann:

```bash
bash assets/process-images.sh
```

Die aktuelle Oberfläche bleibt absichtlich schwarz/weiß.
