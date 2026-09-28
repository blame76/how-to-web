# Navbar – Recherche

Stand: 2026-09-28

## Scope

Diese Referenz behandelt die **globale primäre Website-Navigation** als Organismus.

Enthalten:

- Home-/Brand-Link
- primäre globale Links
- Current-State
- optionale Disclosure-Gruppen
- optionaler Mobile-Trigger
- optionale Utility-Links

Nicht Bestandteil der Navbar:

- Promo-/Announcement-Bar
- vollständiges Suchsystem
- Warenkorb-/Checkout-Zustände
- Account-Workflows
- Sprachumschalter als eigener komplexer Workflow
- Mega Menu mit großer Informationsarchitektur
- kompletter Site Header

Diese Bausteine dürfen im späteren Header neben der Navbar stehen, sind aber nicht Teil ihres Kernvertrags.

## Befunde und Ableitungen

### 1. Typische Website-Navigation ist kein ARIA-Menü

WAI-ARIA APG weist ausdrücklich darauf hin, dass typische Site Navigation normalerweise keine `menu`- oder `menubar`-Rollen benötigt. Diese Rollen erzeugen Erwartungen an komplexes Widget-Keyboard-Verhalten.

**Ableitung:** Navbar verwendet native Links, Listen und bei aufklappbaren Gruppen native Buttons.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/

### 2. Disclosure-Zustand muss programmatisch exponiert sein

Buttons, die Untergruppen öffnen, verwenden `aria-expanded`; `aria-controls` kann die Beziehung zum kontrollierten Bereich explizit machen. `Tab` und `Shift+Tab` bleiben die Baseline. Optionale Pfeiltasten dürfen normales Tabbing nicht ersetzen.

**Ableitung:** Die Build DNA verlangt Disclosure-Buttons, Zustand und Escape-Verhalten, aber keine Pfeiltasten-Navigation.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

### 3. Navigation-Landmark und Listenstruktur erhalten Hierarchie

Das native `nav`-Element erzeugt ein Navigation-Landmark. Gibt es mehrere Navigation-Landmarks auf einer Seite, sollten sie eindeutig benannt sein.

**Ableitung:** Referenzbeispiele verwenden `nav aria-label="Hauptnavigation"` und Listen für die Linkstruktur.

Quelle:
- https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/landmarks/examples/navigation.html

### 4. Aktuelle Seite sichtbar und programmatisch markieren

`aria-current="page"` markiert innerhalb zusammengehöriger Links genau die aktuell dargestellte Seite.

**Ableitung:** Current-State ist Teil des Daten- und Accessibility-Vertrags, nicht nur CSS-Dekoration.

Quelle:
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current
- https://www.w3.org/WAI/tutorials/menus/structure/

### 5. Mobile ist eine Transformation, keine neue Informationsarchitektur

WAI empfiehlt, Wortlaut, Reihenfolge und Ziele über Responsive-Zustände konsistent zu halten. USWDS betont ebenfalls konsistente Header-Inhalte in Mobile-Ansichten.

**Ableitung:** Mobile ist keine eigene how-to-web Variante. Jede Variante besitzt einen Narrow-State mit derselben Informationsarchitektur.

Quelle:
- https://www.w3.org/WAI/tutorials/menus/structure/
- https://designsystem.digital.gov/components/header/accessibility-tests/

### 6. Navigation nach Nutzeraufgaben, nicht Organisation

USWDS empfiehlt, Navigation nach häufig benötigten Aufgaben und Informationen zu strukturieren, nicht nach interner Organisationsstruktur. Häufiger benötigte Links sollen priorisiert werden.

**Ableitung:** Reihenfolge und Hierarchie sind Produktentscheidungen. Coding-Agenten dürfen keine Kategorien erfinden oder nach technischer Bequemlichkeit umsortieren.

Quelle:
- https://designsystem.digital.gov/components/header/

### 7. Wiederkehrende Navigation muss überspringbar sein

WCAG Bypass Blocks verlangt einen Mechanismus, wiederkehrende Inhaltsblöcke zu umgehen. USWDS nennt für Header explizit einen Skip-Link vor der Navigation.

**Ableitung:** Der Skip-Link gehört zur Seitenintegration, nicht in die Navbar-DNA als internes Kind. Die Navbar-DNA verlangt aber, dass der Host-Kontext einen Bypass-Mechanismus bereitstellt.

Quelle:
- https://designsystem.digital.gov/components/header/
- https://designsystem.digital.gov/components/header/accessibility-tests/

### 8. Fokus darf durch sticky/overlay Navigation nicht verschwinden

WCAG 2.2 SC 2.4.11 verlangt, dass fokussierte Komponenten nicht vollständig durch author-created content verdeckt werden.

**Ableitung:** Sticky ist kein Default. Wird es gewählt, muss das Projekt Fokus-Obscuring an allen relevanten Viewports testen und gegebenenfalls mit Scroll-Padding o. Ä. verhindern.

Quelle:
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum

### 9. Pointer-Ziele brauchen Mindestgröße oder Abstand

WCAG 2.2 SC 2.5.8 definiert 24×24 CSS-Pixel als Mindestzielgröße mit dokumentierten Ausnahmen.

**Ableitung:** Trigger und kompakte Utility-Aktionen werden im Review explizit gegen Target Size Minimum geprüft.

Quelle:
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

## Varianten

### Simple

Wenige globale Links ohne Unterebenen. Narrow-State: ein Button zeigt dieselben Links vertikal.

### With Disclosures

Einige globale Bereiche besitzen Untergruppen. Linkgruppen öffnen per Button, nicht Hover. Narrow-State verwendet dieselben Disclosure-Gruppen im vertikalen Flow.

### Utility + Primary

Primäre Navigation und ergänzende Service-Links sind im selben Organismus vorhanden, aber visuell und strukturell unterscheidbar. Narrow-State führt beide Gruppen in derselben Reihenfolge weiter.

## Produktionshinweis

WAI-ARIA APG bezeichnet seine Beispiele ausdrücklich als illustrative Referenzen und weist auf mögliche Browser-/Assistive-Technology-Lücken hin. Die how-to-web Beispiele sind deshalb ebenfalls Referenzimplementierungen; ein Produktionsprojekt muss im eigenen Zielstack und mit relevanten Browser-/AT-Kombinationen testen.
