# Combobox

Vollständige **how-to-web Entscheidungs-, Lern-, Showcase- und Build-DNA-Referenz** für eine editable Combobox mit Listbox-Popup.

## Lernkern

Das Feature beginnt nicht mit einer fertigen UI, sondern mit dem Zustandsvertrag:

- `query`
- `popup_open`
- `active_option`
- `selected_value`
- `value_policy`

Der State Lab macht sichtbar, dass Pfeilnavigation eine aktive Popup-Option verändern kann, ohne den Feldwert bereits zu übernehmen.

## Selection Gate

Der Alternativenvergleich ist hier fachlich begründet:

- `<select>` für geschlossene bekannte Auswahl ohne eigene Textfilterung,
- `<datalist>` für einfache Vorschläge bei weiterhin gültigem Freitext, sofern Browser-/AT-Grenzen akzeptabel und getestet sind,
- Custom Combobox erst, wenn der zusätzliche Query-/Popup-/Selection-Vertrag wirklich benötigt wird.

Visuelle Anpassung allein rechtfertigt kein Custom Widget.

## Varianten

1. **Free Text Suggestions** – Vorschläge helfen; unlisted text bleibt gültig.
2. **Restricted Selection** – nur ein explizit übernommener Listenwert ist gültig.
3. **Rich Suggestions** – Optionen dürfen Zusatzinformation zeigen, bleiben aber je ein einzelner auswählbarer Wert.

Alle drei nutzen List Autocomplete mit manueller Auswahl.

## Fokus- und Keyboard-Vertrag

- DOM-Fokus bleibt im Input.
- `aria-activedescendant` zeigt auf die aktive sichtbare Option.
- die aktive Popup-Option darf `aria-selected="true"` tragen,
- diese Popup-Selektion ist trotzdem noch nicht automatisch der committed `selected_value`,
- ↑/↓ navigieren Vorschläge,
- Enter übernimmt,
- Escape schließt ohne Übernahme,
- Tab bleibt normale Seitenfokusnavigation,
- native Textbearbeitung bleibt intakt.

## Kanonische Dateien

```text
combobox/
├── index.html
├── index.md
├── build-dna.json
├── llms.txt
├── RESEARCH.md
├── README.md
├── styles.css
├── script.js
├── sync-build-dna.sh
└── examples/
    ├── manifest.json
    ├── variants.json
    ├── build-manifest.sh
    ├── free-text.{html,css,js,json}
    ├── restricted.{html,css,js,json}
    └── rich-suggestions.{html,css,js,json}
```

## Experiment: Inline Build DNA + Drift Gate

Wie bei der Product Card wird `build-dna.json` zusätzlich inline in `index.html` gespiegelt, damit Single-Pass-Reader den normativen Vertrag ohne zweiten Request erhalten.

Die kanonische Quelle bleibt ausschließlich `build-dna.json`.

Synchronisieren:

```bash
bash elements/interactive/combobox/sync-build-dna.sh
```

Nur prüfen:

```bash
bash elements/interactive/combobox/sync-build-dna.sh --check
```

Der Check schlägt fehl, wenn die Inline-Kopie nicht exakt aus der aktuellen Build DNA erzeugt wurde. Damit testen wir beim zweiten Feature zusätzlich, ob sich die Single-Pass-Idee ohne Vertragsdrift betreiben lässt.

## Serien-Gate

Das Feature gilt als bereit für Review, wenn:

- Research vor der Implementierung dokumentiert ist,
- Selection Gate fachlich trägt,
- State Lab Query / Active / Selected sauber trennt,
- alle drei Value-Policy-Beispiele funktionieren,
- Keyboard- und `aria-activedescendant`-Vertrag nachvollziehbar sind,
- JSON/JS mechanisch valide sind,
- Inline Build DNA mit `--check` synchron ist,
- ein fremdes LLM aus der normativen DNA eine äquivalente Umsetzung rekonstruieren kann.
