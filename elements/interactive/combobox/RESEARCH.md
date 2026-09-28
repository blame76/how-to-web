# Combobox – Recherche

Stand: 2026-09-28

## Scope

Diese Referenz behandelt eine **editable Combobox mit Listbox-Popup**:

- ein editierbares einzeiliges Eingabefeld,
- eine dynamische Liste passender Vorschläge,
- DOM-Fokus bleibt im Eingabefeld,
- eine Option im Popup kann über `aria-activedescendant` aktiv sein,
- Auswahl/Übernahme ist ein eigener Schritt.

Nicht Teil dieses Features:

- select-only Combobox als Ersatz für `<select>`,
- Grid-, Tree- oder Dialog-Popups,
- Multi-Select / Tag Picker,
- Command Palette,
- Suchergebnisliste mit eigenständigen Aktionen statt möglichen Feldwerten.

## Quellenbasis

Primär:

- WAI-ARIA Authoring Practices (APG)
- MDN Web Docs
- HTML / ARIA Plattformdokumentation

## 1. Vor dem Custom Widget: Welche einfachere Kontrolle löst den Task?

### Native `<select>`

Ein natives `<select>` ist der naheliegende Ausgangspunkt, wenn:

- die Menge gültiger Werte geschlossen und bekannt ist,
- Nutzer genau einen vorhandenen Wert auswählen,
- keine eigene textbasierte Filter-/Autocomplete-Logik benötigt wird.

Browser übernehmen große Teile von Semantik, Fokus, Tastatur und mobiler Darstellung.

Vollständig anpassbare Select-Picker entwickeln sich weiter, sind 2026 aber noch nicht in allen verbreiteten Browsern verfügbar.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select

### `<input list>` + `<datalist>`

`<datalist>` bietet native Vorschläge für ein Eingabefeld. Der eingegebene Wert muss nicht zwingend einer Option entsprechen; die Liste ist eine Empfehlung, keine geschlossene Auswahl.

Das klingt für einfache Autocomplete-Fälle attraktiv, hat aber weiterhin relevante Einschränkungen:

- MDN führt `<datalist>` nicht als Baseline.
- Optionsdarstellung lässt sich nur sehr eingeschränkt stylen.
- Optionsschrift skaliert in mehreren Implementierungen nicht mit Page Zoom.
- bestimmte Screenreader/Browser-Kombinationen kündigen den Vorschlags-Popup nicht zuverlässig an.

**Ableitung:** `<datalist>` ist eine mögliche native Alternative, aber keine pauschale Accessibility-Abkürzung. Zielbrowser und Assistive Technology müssen zum Task passen.

Quelle:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist

### Eigene Combobox

Eine eigene Combobox ist leichter zu rechtfertigen, wenn der Task tatsächlich einen kontrollierten Input+Popup-Vertrag braucht, zum Beispiel:

- Vorschläge werden anhand der Query dynamisch gefiltert oder geladen,
- aktive Vorschläge müssen programmatisch nachvollziehbar sein,
- Auswahl und freie Texteingabe brauchen einen expliziten Value-Policy-Vertrag,
- Popup-Inhalt und Darstellung benötigen Kontrolle, die native Alternativen nicht liefern,
- zusätzliche Metadaten in einer Listbox-Option müssen lesbar sein.

**Decision Gate:** Nicht „wir wollen ein hübsches Dropdown“, sondern „wir brauchen das zusätzliche Interaktionsmodell“.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role

## 2. Combobox ist nicht einfach „Input + Dropdown“

APG definiert Combobox als zusammengesetztes Widget: ein Eingabewert plus ein Popup mit möglichen Werten. Eine editable Combobox kann Freitext erlauben oder auf unterstützte Werte beschränkt sein.

**Ableitung:** Build DNA muss mindestens unterscheiden:

- `query`: Text, der gerade im Input steht,
- `popup_open`: Sichtbarkeit der Vorschläge,
- `active_option`: aktuell per Tastatur/Pfeilnavigation hervorgehobene Option,
- `selected_value`: tatsächlich übernommener Wert,
- `value_policy`: Freitext erlaubt oder nur Werte aus der Liste.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

## 3. Active Option ist nicht Selected Value

Bei `aria-activedescendant` bleibt DOM-Fokus im Input. Pfeiltasten verändern die aktive Option im Popup, ohne den Eingabefokus zu verschieben.

Eine Option wird erst übernommen, wenn der jeweilige Vertrag dies vorsieht, typischerweise über Enter oder Pointer-Auswahl.

**Ableitung:** Visuelles Highlight, `aria-activedescendant` und tatsächlich committed value dürfen nicht als derselbe Zustand implementiert werden.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role

## 4. Manual Selection ist der verständlichste Ausgangspunkt

APG unterscheidet mehrere Autocomplete-Modelle:

- none,
- list with manual selection,
- list with automatic selection,
- list with inline completion.

Bei **list autocomplete with manual selection** wird keine Option allein durch das Filtern automatisch ausgewählt. Verlässt der Nutzer das Feld, bleibt bei Freitext-Policy der eingegebene Text bestehen.

**Ableitung:** Die generische how-to-web Referenz nutzt manual selection als Baseline. Automatic Selection und Inline Completion sind eigenständige Verhaltensentscheidungen, keine kosmetischen Varianten.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/

## 5. Keyboard Contract

Für eine editable Combobox mit Listbox-Popup gehören unter anderem zum erwartbaren Vertrag:

- normale Texteingabe bleibt normale Texteingabe,
- Down Arrow kann in die Vorschläge navigieren,
- Up Arrow bewegt sich rückwärts,
- Enter übernimmt die aktive Option,
- Escape schließt den Popup ohne unbeabsichtigte Auswahl,
- Tab bleibt Teil der normalen Seitenfokusreihenfolge.

APG warnt ausdrücklich davor, browsernative Text-Editing-Kommandos durch JavaScript zu überschreiben.

**Ableitung:** Keine globale Pfeiltastenlogik und kein Abfangen von Home/End/Zeichen-Eingaben, wenn dies native Textbearbeitung beschädigt.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

## 6. Sichtbarkeit der aktiven Option ist unsere Verantwortung

Browser scrollen Elemente mit echtem DOM-Fokus automatisch in den sichtbaren Bereich. Bei `aria-activedescendant` passiert das nicht automatisch.

APG-Beispiele scrollen deshalb die aktive Option explizit in den sichtbaren Listbox-Ausschnitt.

**Ableitung:** `active_option` muss nicht nur visuell markiert und per ARIA referenziert, sondern bei Tastaturnavigation auch sichtbar gehalten werden.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-none/
- https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/

## 7. Popup-Semantik

Für unsere Referenz ist das Popup eine `listbox`; Vorschläge sind `option`-Elemente im ARIA-Sinn.

Der Input:

- trägt `role="combobox"`,
- hat einen zugänglichen Namen,
- pflegt `aria-expanded`,
- verweist über `aria-controls` auf die Listbox,
- verwendet `aria-autocomplete="list"`,
- setzt `aria-activedescendant`, solange eine aktive Option existiert.

**Ableitung:** Wir behandeln keine Grid- oder Dialog-Popups in diesem Feature.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role

## 8. Freitext vs. Restricted Selection ist eine fachliche Entscheidung

APG-Beispiele zeigen beide zugrunde liegenden Modelle:

- der eingegebene Text darf selbst Wert werden,
- oder der Task kann verlangen, dass nur ein unterstützter Wert akzeptiert wird.

**Ableitung:** `value_policy` muss explizit in der Build DNA stehen. Eine Combobox darf nicht stillschweigend aus Vorschlägen Pflichtwerte machen oder umgekehrt beliebigen Text akzeptieren.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

## 9. Keine ARIA-Demo ungeprüft in Produktion kopieren

APG weist bei seinen Combobox-Beispielen ausdrücklich darauf hin, dass mobile/touch Browser- und Assistive-Technology-Kombinationen Support-Lücken haben können und reale Tests nötig sind.

**Ableitung:** Die Referenz ist ein Vertrags- und Lernmodell, kein „copy this exact JS“-Versprechen.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/

## Vorgeschlagene Varianten

### 1. Free Text Suggestions

Manual list autocomplete. Vorschläge helfen, aber beliebiger Text bleibt zulässig.

Lernpunkt: **Query und Selection sind getrennt.**

### 2. Restricted Selection

Die Eingabe filtert eine bekannte Menge, aber ein gültiger Wert muss explizit aus der Liste übernommen werden.

Lernpunkt: **Value Policy ist fachlicher Vertrag, nicht UI-Detail.**

### 3. Rich Suggestions

Weiterhin Listbox-Popup, aber Optionen enthalten zusätzliche sekundäre Information.

Lernpunkt: **Mehr Darstellung ändert nicht automatisch die Popup-Semantik.** Wenn die Interaktion mehrere unabhängige Zellen/Aktionen verlangt, wäre ein Grid oder anderes Pattern nötig.

## Decision Comparison

Der Vergleich `<select>` vs. `<datalist>` vs. Combobox hat hier fachlichen Mehrwert und ist direkt aus der Vorrecherche ableitbar.

Er soll deshalb auf der Human Reference erscheinen.

Kein pauschales „Combobox ist besser“:

- `select` gewinnt bei einfacher geschlossener Auswahl,
- `datalist` kann bei einfachen freien Vorschlägen ausreichen, muss aber gegen seine Support-/Accessibility-Grenzen geprüft werden,
- eine eigene Combobox gewinnt erst, wenn der zusätzliche Zustands- und Interaktionsvertrag tatsächlich benötigt wird.
