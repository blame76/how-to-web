# Form Submission

Erster **how-to-web Pattern-Test**.

Der Fokus liegt nicht auf einem bestimmten Formularlayout, sondern auf dem vollständigen Weg von **„Absenden“ bis zu einem klaren Ergebnis**.

## Lernkern

> Ein Formular ist erst fertig, wenn Fehler, Erfolg und Wiederholung definiert sind.

Die Seite soll besonders Nicht-Webentwicklern zeigen, dass ein scheinbar banaler Submit mehrere fachlich unterschiedliche Ausgänge hat:

- Eingabe korrigieren,
- senden,
- erfolgreich abgeschlossen,
- Servicefehler,
- Ausgang unklar.

Technische Details werden dort erklärt, wo sie die Entscheidung verändern. Das Pattern soll keine HTTP- oder Accessibility-Enzyklopädie werden.

## Scope

Enthalten:

- native Form Semantics als Baseline,
- submit intent,
- Validierungsgrenze,
- Pending bei asynchronem Submit,
- Erfolg,
- serverseitiger Validierungsfehler,
- technischer Submission-Fehler,
- unbekannter Ausgang,
- Werteerhalt,
- Duplicate-/Retry-Entscheidung,
- zugängliche Status-/Fehlerkommunikation.

Bewusst nicht vertieft:

- alle Form Controls,
- vollständige Validation Pattern Library,
- Authentifizierung,
- konkrete Backend-Frameworks,
- generische File-Upload-Flows,
- konkrete Idempotency-Key-APIs.

Validation bleibt Teil des Submission-Vertrags. Wenn sie später einen eigenen Lerngegenstand trägt, kann daraus ein separater Concern entstehen.

## Demonstration

Ein einfaches Kontaktformular dient als vertraute Oberfläche.

Es ist **nicht** die Spezifikation. Die vier demonstrierten Ausgänge sind wichtiger als die Felder selbst.

## Build DNA

`build-dna.json` ist die kanonische normative Quelle.

Die Human Reference erhält über das zentrale Repo-Tool eine generierte Inline-Kopie:

```bash
python3 bin/sync-build-dna patterns/form-submission
python3 bin/sync-build-dna --check patterns/form-submission
```

Research, Markdown Reference und Demo erklären den Vertrag, werden aber nicht daraus generiert.
