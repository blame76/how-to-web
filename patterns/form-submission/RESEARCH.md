# Form Submission – Recherche

Stand: 2026-09-28

## Forschungsfrage

Nicht: „Wie baut man ein Kontaktformular?“

Sondern:

> Welcher Vertrag entsteht zwischen Nutzer, Browser und Server, wenn ein Formular abgeschickt wird – von der Eingabe über Validierung und Pending bis zu Erfolg, Fehler und Recovery?

Ziel ist zunächst **kein fertiger Scope**. Diese Recherche soll klären, ob `patterns/form-submission` als eigenständiges Pattern trägt und welche Teile eventuell eigene Patterns oder Concerns werden sollten.

---

## 1. Ein Formular ist mehr als eine Sammlung von Inputs

HTML bringt bereits einen vollständigen Submission-Mechanismus mit:

- `<form action method>`
- native Submit-Controls
- Constraint Validation
- Submitter-spezifische Attribute
- Form Data Construction
- Request / Navigation

`requestSubmit()` verhält sich wie ein echter Submit-Button: Constraint Validation läuft und das `submit`-Event wird ausgelöst. `form.submit()` umgeht dagegen interaktive Constraint Validation und feuert kein `submit`-Event.

**Ableitung:** Ein JavaScript-Formular sollte nicht aus Versehen den nativen Submission-Vertrag umgehen. Progressive Enhancement ist ein sinnvoller Ausgangspunkt, wenn der Task dies erlaubt.

Quellen:

- https://html.spec.whatwg.org/multipage/forms.html
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form

---

## 2. GET und POST sind eine fachliche Entscheidung

HTML unterscheidet Submission-Methoden semantisch:

- `GET` eignet sich für Formulare ohne Side Effects; Daten werden Teil der URL.
- `POST` sendet Daten im Request Body und wird typischerweise für zustandsverändernde Vorgänge verwendet.

HTTP definiert POST nicht als idempotent. Zwei gleiche POST-Requests können zwei Effekte erzeugen.

**Ableitung:** `method` ist kein technisches Default-Detail. Der Pattern-Vertrag muss kennen, ob der Vorgang lediglich navigiert/sucht oder tatsächlich Zustand verändert.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
- https://www.rfc-editor.org/rfc/rfc9110.html

---

## 3. Client-Validation ist UX; Server-Validation bleibt Autorität

HTML bietet native Constraints wie:

- `required`
- semantische Input-Typen
- `min`, `max`
- `minlength`, `maxlength`
- `pattern`

Die Constraint Validation API ergänzt `checkValidity()`, `reportValidity()` und `setCustomValidity()`.

Aber Client-Validation kann umgangen werden. MDN, WAI und OWASP verlangen deshalb weiterhin serverseitige Validierung.

**Ableitung:** Der Pattern-Vertrag darf Client-Validation nicht mit Datenintegrität oder Security verwechseln.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation
- https://www.w3.org/WAI/tutorials/forms/validation/
- https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html

---

## 4. Es gibt nicht die eine richtige Client-Validation-Strategie

Hier widersprechen sich seriöse Quellen nicht wirklich – sie setzen unterschiedliche Prioritäten.

WAI zeigt native HTML-Validation als sinnvolle Baseline und beschreibt zusätzliche zugängliche Fehlermeldungen.

GOV.UK schaltet native HTML5-Validation in seinen Services bewusst ab und setzt auf serverseitige, vollständig kontrollierte Fehlerdarstellung. Begründung: konsistente Sprache, Platzierung und Accessibility über Browser hinweg.

GOV.UK empfiehlt außerdem, bei typischen Service-Formularen nicht bei jedem Blur zu validieren, sondern grundsätzlich erst, wenn der Nutzer den nächsten Schritt bzw. Submit auslöst – außer Nutzerforschung zeigt einen klaren Vorteil von Live-Validation.

**Ableitung:** „native“, „server-rendered controlled“ und eventuell „enhanced live validation“ sind **Produkt-/Plattformentscheidungen**, keine Styling-Varianten.

Quellen:

- https://www.w3.org/WAI/tutorials/forms/validation/
- https://design-system.service.gov.uk/patterns/validation/

---

## 5. Validierungsfehler und Servicefehler sind verschiedene Fehlerklassen

Ein Validierungsfehler bedeutet:

> Die Eingabe kann vom Nutzer korrigiert werden.

Beispiele:

- Pflichtwert fehlt.
- Format ist nicht verwertbar.
- Kombination von Werten ist widersprüchlich.

Ein Service-/Systemfehler bedeutet dagegen:

> Die Eingabe ist möglicherweise korrekt, aber der Vorgang konnte technisch nicht verarbeitet werden.

Beispiele:

- Server nicht erreichbar.
- interner Fehler.
- Abhängigkeit ausgefallen.
- Timeout / unbekannter Request-Ausgang.

GOV.UK weist ausdrücklich darauf hin, solche Serviceprobleme nicht als Eingabe-Validation darzustellen.

**Ableitung:** Das Pattern braucht mindestens zwei Fehlerkanäle:

- `validation_error`
- `submission_error`

Sie haben unterschiedliche Recovery-Wege.

Quellen:

- https://design-system.service.gov.uk/patterns/validation/
- https://design-system.service.gov.uk/components/error-message/
- https://www.w3.org/WAI/tutorials/forms/notifications/

---

## 6. Fehler müssen auffindbar, verständlich und korrigierbar sein

WCAG 3.3.1 verlangt bei automatisch erkannten Eingabefehlern, dass das betroffene Element identifiziert und der Fehler textlich beschrieben wird.

WCAG/WAI verlangt keine einzige konkrete UI-Form. Mögliche Lösungen sind unter anderem:

- Fehler direkt am Feld,
- Error Summary,
- Fokus auf erstes fehlerhaftes Feld,
- für serverseitige Flows eine neue Seite mit klarer Hauptüberschrift.

GOV.UK verwendet Error Summary + Inline Error Message und setzt Fokus auf die Summary.

**Ableitung:** „Error Summary immer“ wäre für how-to-web zu absolut. Der Vertrag sollte stattdessen sicherstellen:

- Fehler ist wahrnehmbar,
- betroffenes Feld ist identifizierbar,
- konkrete Korrektur ist verständlich,
- Fokus-/Navigationsstrategie ist bewusst definiert.

Für Gesamtfeedback nach einem Submit nennt WAI eine aussagekräftige Seiten- oder Abschnittsüberschrift als etablierten Weg. Bei einem korrigierbaren Feldfehler kann dagegen der Fokus direkt auf das betroffene Feld gesetzt werden.

Quellen:

- https://www.w3.org/WAI/WCAG22/Understanding/error-identification
- https://www.w3.org/WAI/tutorials/forms/notifications/
- https://design-system.service.gov.uk/components/error-summary/

---

## 7. Eingaben bei Fehlern erhalten

GOV.UK fordert bei Validation Errors ausdrücklich, die bereits eingegebenen Werte zu erhalten – sowohl gültige als auch fehlerhafte.

Das reduziert Wiederholung und lässt den Nutzer direkt korrigieren.

WCAG 2.2 ergänzt mit SC 3.3.7 „Redundant Entry“ für Informationen, die innerhalb desselben Prozesses erneut verlangt würden: Sie sollen grundsätzlich vorausgefüllt oder auswählbar sein, sofern keine Ausnahme greift.

**Ableitung:** Ein fehlgeschlagener Submit darf nicht reflexartig das Formular leeren.

Quellen:

- https://design-system.service.gov.uk/patterns/validation/
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

---

## 8. Erfolg ist ein eigener Zustand und braucht Bestätigung

WAI fordert eindeutiges Feedback darüber, ob die Submission erfolgreich war oder Fehler auftraten.

Für servergerenderte POST-Flows ist `303 See Other` ein etablierter Weg:

```text
POST /contact
→ server processes
→ 303 See Other
→ GET /contact/sent
```

Dadurch wird die Bestätigungsdarstellung über GET geladen, statt die POST-Response direkt als dauerhafte Seite zu behandeln.

**Ableitung:** Ein erfolgreicher Submit endet nicht bei „Request hatte 200“. Der Nutzer braucht einen eindeutigen Task-Abschluss.

Quellen:

- https://www.w3.org/WAI/tutorials/forms/notifications/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303

---

## 9. Asynchroner Submit erzeugt zusätzliche Zustände

Wenn JavaScript die native Navigation mit `preventDefault()` übernimmt und via `fetch()` sendet, entsteht ein neuer UI-Vertrag.

Mindestens:

- submit requested
- pending
- HTTP response
- network failure
- success
- validation response
- service failure

Wichtig: `fetch()` rejected nicht bei HTTP-Fehlerstatus wie 400 oder 500. Ein Request mit HTTP-Fehler liefert normalerweise trotzdem ein erfolgreich aufgelöstes Promise; Code muss `response.ok` oder `response.status` prüfen.

**Ableitung:** „catch = Fehler“ ist kein vollständiger Async-Submission-Vertrag.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_forms_through_JavaScript

---

## 10. Pending ist nicht „disable alles“

Der HTML-`disabled`-Zustand hat starke Semantik:

- Control ist nicht fokussierbar.
- Control ist nicht editierbar.
- Wert wird nicht mit dem Formular submitted.
- Disabled Controls sind auch nicht Teil von `FormData`.

**Ableitung:** Ein komplettes `fieldset disabled` als pauschaler Pending-State kann Daten und Fokusverhalten verändern. Wenn während Pending ein zweiter Submit verhindert werden soll, muss gezielt entschieden werden, was tatsächlich deaktiviert oder anderweitig gesperrt wird.

Wenn ein gerade fokussierter Submit-Button während Pending auffindbar bleiben soll, kann `aria-disabled="true"` eine Alternative sein. Das erhält die Fokusierbarkeit, unterdrückt aber **nicht** automatisch Klick oder Submit. Die Anwendung muss die erneute Aktion dann selbst blockieren.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects

---

### Pending und Request-Snapshot

Bei asynchronem Submit wird der Request aus einem konkreten Datenstand gebaut. `new FormData(form)` übernimmt die zu diesem Zeitpunkt submitbaren Werte des Formulars in ein eigenes `FormData`-Objekt.

**Ableitung:** Wenn Nutzer während eines laufenden Requests weiter editieren können, darf die UI nicht so wirken, als würden diese Änderungen den bereits erzeugten Request nachträglich verändern. Der Pending-Vertrag muss deshalb festlegen, ob relevante Felder temporär eingefroren werden, ob Änderungen für einen späteren Submit gelten oder ob ein echtes Cancel/Replace-Modell existiert.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects

---

## 11. Duplicate Submit und Retry sind nicht nur Frontend-Fragen

POST ist grundsätzlich nicht idempotent. RFC 9110 sagt deshalb, dass Clients nicht-idempotente Requests nicht automatisch erneut senden sollen, außer sie wissen, dass die Semantik tatsächlich idempotent ist oder dass der erste Request nicht angewendet wurde.

Das ist besonders relevant bei:

- Timeout nach dem Senden,
- Verbindung bricht nach Request aber vor Response ab,
- Nutzer klickt erneut,
- Browser-/App-Retry,
- Back/Refresh-Situationen.

Ein deaktivierter Submit-Button verhindert lediglich einen Teil der möglichen Doppelverarbeitung.

**Ableitung:** Der Pattern-Vertrag braucht eine **duplicate/retry policy**, aber wie genau sie technisch gelöst wird, hängt vom Risiko und Backend-Vertrag ab.

Mögliche Entscheidungen:

- Wiederholungen sind fachlich harmlos.
- Server erkennt Duplikate.
- Idempotency Token / Request Identifier.
- Nutzer erhält bei unbekanntem Ausgang keine falsche Aussage „nicht gesendet“.

Für eine generische Referenz darf keine bestimmte Idempotency-Key-API erfunden werden.

Quellen:

- https://www.rfc-editor.org/rfc/rfc9110.html
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST

---

## 12. „Network Error“ kann einen unbekannten fachlichen Ausgang bedeuten

Bei einem asynchronen Request kann der Client die Verbindung verlieren, nachdem der Server die Anfrage bereits erhalten oder verarbeitet hat.

Damit sind mindestens zwei verschiedene Aussagen möglich:

- **definitiv fehlgeschlagen**
- **Ergebnis unbekannt**

**Ableitung:** Für folgenreiche Submissions darf das UI nicht automatisch „Submission fehlgeschlagen – versuche erneut“ behaupten, wenn ein Retry eine Doppelwirkung erzeugen könnte.

Dies ist eher ein Domain-/Backend-Vertrag als eine reine Frontend-Regel und könnte für ein einfaches Kontaktformular overkill sein. Für `form-submission` als generisches Pattern muss diese Grenze aber dokumentiert werden.

Grundlage:

- HTTP-Idempotenz- und Retry-Semantik in RFC 9110.

---

## 13. Statusmeldungen bei dynamischen Flows

WCAG 4.1.3 verlangt, dass wichtige Statusänderungen programmatisch bestimmbar sind, wenn sie ohne Kontextwechsel erscheinen.

Beispiele aus WAI:

- „Submitting…“
- Erfolgsmeldung
- Zahl der Fehler
- Ergebnis eines Vorgangs

Nicht jede Statusmeldung soll Fokus erhalten; Statusrollen / Live Regions können Änderungen ankündigen, ohne die Arbeit des Nutzers unnötig zu unterbrechen.

**Ableitung:** Async Submission braucht eine explizite Announcement-Strategie für `pending`, `success` und relevante Fehler.

Quelle:

- https://www.w3.org/WAI/WCAG21/Understanding/status-messages

---

## 14. Submitter ist Teil des Contracts

Ein Formular kann mehrere Submit-Buttons haben. Der tatsächliche Submitter kann:

- eigenen `formaction`,
- `formmethod`,
- `formenctype`,
- `formnovalidate`,
- `formtarget`

besitzen.

`SubmitEvent.submitter` zeigt, welches Control die Submission ausgelöst hat.

**Ableitung:** Ein JS-Enhancement darf bei mehreren Submit-Aktionen nicht implizit so tun, als gäbe es nur „den Submit-Button“.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter
- https://html.spec.whatwg.org/multipage/form-elements.html

---

## 15. FormData enthält nicht automatisch „alles Sichtbare“

`FormData(form)` folgt HTML-Submission-Regeln.

Unter anderem werden disabled Controls nicht aufgenommen.

Für File Uploads ist `multipart/form-data` erforderlich. Bei `fetch(FormData)` soll der `Content-Type` nicht manuell gesetzt werden, weil der Browser den Multipart-Boundary korrekt ergänzen muss.

**Ableitung:** Der Data Contract muss sich auf tatsächlich submitbare Controls beziehen, nicht nur auf sichtbare Felder.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form

---

## 16. Formulare sollten nur notwendige Daten erfragen

WAI empfiehlt kurze, einfache Formulare und ausdrücklich nur Informationen abzufragen, die für den Vorgang tatsächlich benötigt werden.

Für bekannte personenbezogene Eingabezwecke können korrekte `autocomplete`-Tokens die Eingabe vereinfachen und unterstützen WCAG 1.3.5.

**Ableitung:** Data Minimization und Input Purpose gehören mindestens als Design-/Data-Entscheidungen in das Pattern, auch wenn sie nicht Kern der Submission-State-Machine sind.

Quellen:

- https://www.w3.org/WAI/tutorials/forms/
- https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose
- https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

---

## 17. State-changing authenticated forms brauchen Security-Vertrag

Für state-changing Requests in authentifizierten Browser-Sessions ist CSRF relevant.

OWASP empfiehlt je nach Architektur geeignete Schutzmechanismen wie Synchronizer Tokens, Double Submit, Origin/Fetch-Metadata-Prüfung oder Framework-Mechanismen. SameSite allein ist nicht generell als vollständiger Ersatz anzusehen.

**Ableitung:** CSRF ist kein visueller Teil des Patterns, aber ein möglicher `security_contract`, sobald eine Submission authentifizierten serverseitigen Zustand verändert.

Quelle:

- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

---

# Vorläufiges Zustandsmodell

Die Recherche legt mindestens folgende fachliche Zustände nahe:

```text
editing
  │
  └─ submit intent
       │
       ├─ invalid
       │    └─ correction
       │         └─ editing
       │
       └─ valid
            └─ submitting
                 ├─ success
                 │
                 ├─ validation_error
                 │    └─ correction
                 │
                 ├─ submission_error
                 │    └─ recovery / retry if safe
                 │
                 └─ outcome_unknown
                      └─ domain-specific recovery
```

Für rein servergerenderte Formulare muss `submitting` nicht als sichtbarer clientseitiger Zustand implementiert werden.

Für asynchrones Enhancement wird er dagegen sichtbar und braucht Status-/Interaction-Regeln.

---

# Vorläufige Vertragsfelder

Falls `form-submission` als Pattern bestehen bleibt, scheinen folgende Felder wichtiger als visuelle Anatomy:

## task_contract

- Zweck der Submission
- Side Effect ja/nein
- Konsequenz/Risiko
- Erfolgskriterium

## data_contract

- tatsächlich benötigte Daten
- required / optional
- client-side constraints
- authoritative server-side validation
- autocomplete/input-purpose
- sensitive fields
- file uploads

## validation_contract

- native / controlled server-side / enhanced
- Zeitpunkt
- Fehlermeldungsstrategie
- Fokus-/Navigation nach Fehler
- Werteerhalt

## submission_contract

- GET / POST
- native navigation / asynchronous enhancement
- submitter behavior
- encoding
- pending behavior

## response_contract

- success
- validation error
- service error
- unknown outcome
- user-visible confirmation

## retry_contract

- duplicate submission policy
- safe retry ja/nein
- server deduplication/idempotency when required
- recovery after ambiguous network result

## accessibility_contract

- labels/instructions
- errors textually identifiable
- error navigation
- dynamic status announcements
- focus policy
- 200% zoom / responsive baseline

## security_contract when relevant

- server validation
- CSRF protection
- sensitive data handling
- no state changes via GET

---

# Wo der Scope wahrscheinlich geschnitten werden muss

## Option A – Ein großes `patterns/form-submission`

Deckt ab:

- Validation
- Submission
- Pending
- Response
- Recovery
- Retry

**Vorteil:** zeigt den vollständigen Task-Vertrag.

**Risiko:** kann schnell zur „Formular-Enzyklopädie“ werden.

## Option B – `patterns/form-submission` + eigene Validation Concern

`form-submission`:

- submit intent
- request lifecycle
- pending
- response
- duplicate/retry
- success/service failure

`concerns/form-validation`:

- constraints
- field errors
- summaries
- timing
- client vs server
- preserving input

**Vorteil:** Validation ist querschnittlich und gilt für viele Form-Patterns.

**Risiko:** der erste Pattern-Eintrag hängt sofort von einem zweiten Artefakt ab.

## Option C – Konkretes `patterns/contact-form`

Ein vollständiges Beispiel mit:

- name
- email
- message
- validation
- POST
- success/failure

**Vorteil:** sehr konkret und erlebbar.

**Risiko:** wir testen damit weniger, ob Build DNA wirklich einen generischen Task Flow ausdrücken kann. Außerdem könnten Contact-spezifische Entscheidungen mit generischer Submission-Logik vermischt werden.

---

# Vorläufige Empfehlung aus der Recherche

Noch **nicht** auf Contact Form verengen.

`patterns/form-submission` trägt als eigener Pattern-Kandidat, wenn wir ihn bewusst als **Submission Lifecycle** schneiden und nicht versuchen, alle Form-Control- oder Validierungsdetails dort vollständig zu lehren.

Ein sinnvoller Kern wäre:

1. native form semantics first,
2. submit intent,
3. validation boundary,
4. submitting/pending,
5. distinguish validation vs service failure,
6. preserve entered data on recoverable failure,
7. explicit success confirmation,
8. safe duplicate/retry policy,
9. progressive enhancement as optional transport mode.

Validation wäre zunächst Teil des Contracts, aber nur soweit sie den Submission-Flow beeinflusst. Wenn beim Bau deutlich wird, dass Fehlerdarstellung/Validation selbst eine eigene Lernseite verdient, kann daraus später `concerns/form-validation` entstehen.

---

# Möglicher Lernkern

> **„Absenden“ ist kein Button-Zustand. Es ist ein Übergang mit einem unbekannten Ausgang.**

Eine zweite mögliche Formulierung:

> **Ein Formular ist erst fertig, wenn Fehler, Erfolg und Wiederholung definiert sind.**

Die erste ist technisch schärfer; die zweite ist für die Zielgruppe zugänglicher.

---

# Offene Entscheidungen vor Implementierung

1. Bleibt der Pattern generisch oder verwenden wir ein konkretes Kontaktformular ausschließlich als Demonstrationsfall?
2. Zeigen wir server-rendered POST/Redirect/GET als Baseline und Async Submit als Enhancement?
3. Wie weit soll `outcome_unknown` im Human Learning Flow sichtbar werden, ohne den Einstieg unnötig zu überladen?
4. Wird Validation nur im Submission-Flow behandelt oder später als eigener Concern vertieft?
5. Braucht das erste Pattern mehrere Varianten – oder ist hier ein einziger Flow mit umschaltbaren Zuständen lehrreicher?
