# Dialog – Recherche

Stand: 2026-09-28

## Scope

Diese Referenz behandelt **modale Dialoge**.

Nicht Teil dieses Features:

- Popover
- Tooltip
- Drawer/Off-canvas Navigation
- Toast
- non-modale Floating Panels
- komplette Seiten, die nur wie ein Dialog aussehen

## Befunde

### 1. Native `<dialog>` + `showModal()` ist die Baseline

Der native Dialog wird im Top Layer angezeigt und erzeugt ein `::backdrop`. Der restliche Dokumentinhalt wird während eines modalen Dialogs inert.

**Ableitung:** how-to-web bevorzugt natives `<dialog>` mit `showModal()`, sofern kein nachgewiesener Plattformgrund dagegen spricht.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
- https://www.w3.org/WAI/WCAG22/Techniques/html/H102

### 2. Initialfokus ist eine Produktentscheidung

APG nennt mehrere sinnvolle Strategien:

- bei Form-Tasks auf das erste relevante Feld,
- bei langem/strukturiertem Inhalt auf einen statischen Anfangspunkt mit `tabindex="-1"`,
- bei schwer rückgängig zu machenden Aktionen auf die weniger destruktive Aktion,
- bei einfachen Bestätigungen gegebenenfalls auf Continue/OK.

**Ableitung:** Build DNA enthält Initialfokus nicht als Implementierungsdetail, sondern als expliziten Teil des Verhaltensvertrags.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### 3. Escape gehört zum erwarteten Modal-Verhalten

APG und MDN beschreiben Escape als erwarteten Schließweg für modale Dialoge.

**Ableitung:** Referenzbeispiele lassen das native `cancel`-/Escape-Verhalten intakt. Zusätzlich existiert immer eine sichtbare Schließen-/Abbrechen-Aktion.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog

### 4. Fokus bleibt innerhalb des Modals

Ein modaler Dialog begrenzt die Interaktion auf seinen Inhalt. Native `showModal()` übernimmt Inertheit außerhalb; ein Custom-Dialog müsste dieses Verhalten vollständig nachbilden.

**Ableitung:** Kein eigener JavaScript-Focus-Trap, solange natives `<dialog>` den Vertrag erfüllt.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert

### 5. Fokusrückgabe ist Teil des Workflows

APG empfiehlt nach Schließen die Rückgabe an den Invoker, sofern dieser noch existiert und kein anderer Workflow-Schritt logisch sinnvoller ist.

**Ableitung:** Die Referenz speichert den Invoker explizit und restauriert Fokus beim `close`-Event.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### 6. Nicht jeden Inhalt in einen Dialog zwingen

Dialoge unterbrechen Kontext. Lange komplexe Tasks oder große Informationsmengen können als eigene Seite besser funktionieren.

**Ableitung:** Die Referenz fragt explizit „Muss der Kontext wirklich unterbrochen werden?“ und behandelt Größe/Task-Komplexität als Produktentscheidung.

## Varianten

### Information / Long Content
Initialfokus auf statische Überschrift am Inhaltsanfang.

### Form
Initialfokus auf erstes sinnvolles Eingabefeld.

### Destructive Confirmation
Initialfokus auf Cancel / weniger destruktive Aktion.

## Produktionshinweis

APG-Beispiele sind illustrative Referenzen. Produktionsprojekte müssen im eigenen Browser-/Assistive-Technology-Zielraum testen.
