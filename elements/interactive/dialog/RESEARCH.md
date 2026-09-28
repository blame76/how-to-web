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

## Quellenbasis

Primär:

- WHATWG HTML Standard
- WAI-ARIA Authoring Practices (APG)
- MDN Web Docs

Ergänzend:

- USWDS Accessibility Tests
- web.dev

## Befunde und Ableitungen

### 1. Native `<dialog>` + `showModal()` bleibt die Baseline

`showModal()` setzt den Dialog in den Top Layer, erzeugt `::backdrop` und macht den übrigen Inhalt desselben Dokuments inert.

**Ableitung:** how-to-web bevorzugt natives `<dialog>` mit `showModal()`, sofern kein nachgewiesener Plattformgrund dagegen spricht. Kein eigener JavaScript-Focus-Trap, solange die native Plattform den Vertrag erfüllt.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- https://html.spec.whatwg.org/multipage/interactive-elements.html

### 2. Initialfokus ist eine Produktentscheidung

APG nennt unterschiedliche Strategien:

- bei strukturiertem/längerem Inhalt einen statischen Anfangspunkt mit `tabindex="-1"`,
- bei Form-Tasks das erste relevante Eingabefeld,
- bei schwer rückgängig zu machenden Aktionen die weniger destruktive Aktion,
- bei einfachen Bestätigungen gegebenenfalls die wahrscheinlichste Continue-/OK-Aktion.

Der Dialog-Container selbst soll nicht über `tabindex` fokussierbar gemacht werden.

**Ableitung:** Initialfokus gehört als explizite Entscheidung in Build DNA. Unsere drei Varianten bilden genau drei unterschiedliche Strategien ab.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog

### 3. Accessible Description hängt von der Inhaltsstruktur ab

APG empfiehlt `aria-describedby` vor allem für kurze, einfache Beschreibungen. Bei mehreren Absätzen, Listen oder anderer semantischer Struktur kann eine pauschal vorgelesene Beschreibung das Verständnis verschlechtern.

**Ableitung:**
- Information / Long Content: kein `aria-describedby`; Fokus liegt statisch am Inhaltsanfang.
- Form: kein unnötiges `aria-describedby`.
- Destructive Confirmation: kurze, einfache Warnung darf per `aria-describedby` referenziert werden.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### 4. Escape / Close Request ist erwartetes Modal-Verhalten

APG beschreibt Escape als Schließweg. Native modale Dialoge unterstützen den Close Request bereits.

Seit Mai 2025 ist `HTMLDialogElement.requestClose()` auf aktuellen Browsern Baseline. Im Unterschied zu `close()` feuert `requestClose()` zuerst ein `cancel`-Event; dadurch kann derselbe Close-Request-Pfad für Escape und explizites Abbrechen verwendet werden.

**Ableitung:** explizite Cancel-/Close-Aktionen verwenden `requestClose()`, mit `close()`-Fallback für ältere Browser. Erfolgreiche Task-Abschlüsse dürfen weiterhin direkt `close(result)` verwenden.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/requestClose
- https://html.spec.whatwg.org/dev/interactive-elements.html
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### 5. `closedby` macht Light Dismiss deklarierbar, ist aber noch keine Baseline

Das `closedby`-Attribut kann festlegen, ob Plattform-Close-Requests oder Light Dismiss erlaubt sind. Bei einem per `showModal()` geöffneten Dialog entspricht der Default ohne Attribut derzeit `closerequest`: Plattform-Close wie Escape ja, Light Dismiss nein.

MDN führt `closedBy` aktuell als **Limited availability**.

**Ableitung:** Backdrop-/Light-Dismiss bleibt in Build DNA eine explizite Produktentscheidung und standardmäßig `false`. `closedby="any"` darf als progressive Umsetzung verwendet werden, aber how-to-web setzt es noch nicht als Mindestvoraussetzung voraus.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/closedBy
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog

### 6. Invoker Commands sind inzwischen eine echte progressive Option

Die Invoker Commands API unterstützt für Dialoge deklarativ `command="show-modal"`, `command="close"` und `command="request-close"`. MDN führt sie seit Dezember 2025 als Baseline 2025 für aktuelle Browser.

**Ableitung:** Build DNA darf diese Technik als mögliche Plattformumsetzung nennen, bindet die Rekonstruktion aber nicht daran. Projekte mit älteren Browserzielen können weiterhin die etablierten JavaScript-Methoden verwenden.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- https://html.spec.whatwg.org/multipage/form-elements.html

### 7. Fokus bleibt innerhalb des Modals

APG verlangt, dass Tab und Shift+Tab nicht aus dem aktiven Modal herauslaufen. USWDS führt dieselbe Erwartung in seinen Accessibility-Tests.

**Ableitung:** Native `showModal()` ist unsere Plattformbasis. Ein Custom-Dialog müsste Modalität und Tastaturverhalten vollständig nachbilden.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://designsystem.digital.gov/components/modal/accessibility-tests/

### 8. Fokusrückgabe ist Teil des Workflows

APG empfiehlt nach Schließen die Rückgabe an den Invoker, sofern dieser noch existiert. Wenn der Invoker entfernt wurde oder der abgeschlossene Task logisch zu einem neuen Element führt, geht Fokus an dieses nächste sinnvolle Ziel.

**Ableitung:** Die Referenz speichert den Invoker explizit. Das Confirmation-Beispiel demonstriert beide Fälle: Cancel → Invoker; erfolgreiche Demo-Löschung → Ergebnisbereich.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### 9. Explizites Schließen bleibt Pflicht

APG empfiehlt ein sichtbares Button-Control zum Schließen. Auch MDN empfiehlt einen expliziten Schließmechanismus.

**Ableitung:** Escape oder Light Dismiss sind nie der einzige Schließweg.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog

### 10. Nicht jeden Task in einen Dialog zwingen

Dialoge unterbrechen Kontext. Lange komplexe Workflows oder große Informationsmengen können als eigene Seite besser funktionieren.

**Ableitung:** Die Referenz beginnt bewusst mit der Frage: „Muss der aktuelle Kontext wirklich unterbrochen werden?“

## Varianten

### Information / Long Content
Initialfokus auf statische Überschrift am Inhaltsanfang. Kein `aria-describedby` für den gesamten strukturierten Inhalt.

### Form
Initialfokus auf erstes sinnvolles Eingabefeld.

### Destructive Confirmation
Initialfokus auf Cancel / weniger destruktive Aktion. Kurze Warnung über `aria-describedby`.

## Produktionshinweis

APG-Beispiele sind illustrative Referenzen. Neue Plattformfunktionen wie Invoker Commands sind inzwischen Baseline auf aktuellen Browsern, können je nach Zielgruppe aber weiterhin einen Fallback benötigen. Produktionsprojekte müssen im eigenen Browser-/Assistive-Technology-Zielraum testen.
