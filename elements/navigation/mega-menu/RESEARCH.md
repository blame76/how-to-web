# Mega Menu – Recherche

Stand: 2026-09-28

## Scope

Diese Referenz behandelt **großflächige Website-Navigation**, die mehrere Linkgruppen in einem aufklappbaren Panel organisiert.

Nicht Teil dieses Features:

- App-Menüs mit `role="menu"` / `menubar`
- Command Palettes
- Kontextmenüs
- Drawer / Off-canvas Navigation als eigener Organismus
- vollständige Site Header
- Suchdialoge oder komplexe Widgets innerhalb des Panels

## Quellenbasis

Primär:

- WAI-ARIA Authoring Practices (APG)
- WCAG 2.2 Understanding Documents
- MDN Web Docs

Ergänzend:

- Baymard Institute 2025 Homepage & Category Navigation research
- Nielsen Norman Group Mega Menu guidance

## Befunde und Ableitungen

### 1. Ein Website-Mega-Menu ist normalerweise kein ARIA-Menü

WAI weist ausdrücklich darauf hin, dass gewöhnliche Website-Navigation trotz des Wortes „Menu“ nicht automatisch das ARIA-`menu`-/`menubar`-Pattern verwenden sollte. Diese Rollen bringen einen wesentlich komplexeren Tastaturvertrag mit, den typische Linknavigation nicht braucht.

**Ableitung:** how-to-web baut Mega Menus als semantische Navigation mit Links, Listen und Disclosure-Buttons. Kein `role="menu"`, kein `role="menuitem"`, kein künstliches Menubar-Verhalten.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/

### 2. Link und Disclosure sind unterschiedliche Aufgaben

Wenn die Top-Level-Kategorie selbst navigiert, kann sie als echter Link erhalten bleiben und ein separater Button das Untermenü öffnen. Wenn die Kategorie nur Container ist, reicht ein Disclosure-Button.

**Ableitung:** Die Build DNA trennt:
- `top-level-link` → navigiert
- `disclosure-trigger` → zeigt/versteckt Panel

Ein einzelnes Element soll nicht gleichzeitig Navigation und Disclosure semantisch vermischen.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/

### 3. Click/Tap ist der verlässliche Basispfad

Disclosure-Buttons funktionieren mit Enter/Space und Touch. Hover kann Desktop-Navigation beschleunigen, darf aber nicht die einzige Möglichkeit sein.

**Ableitung:** Referenzvarianten öffnen zuverlässig per Click/Tap. Hover wird höchstens als optionale Enhancement-Entscheidung dokumentiert.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

### 4. Wenn Hover öffnet, muss er kontrolliert sein

WCAG 1.4.13 fordert bei zusätzlichem Inhalt auf Hover/Fokus: dismissible, hoverable und persistent. Baymards 2025 Navigation Research beschreibt weiterhin starke Probleme durch sofort reagierende Hover-Menüs und nennt 300–500 ms Delay als typische Größenordnung gegen versehentliches „Flickern“.

**Ableitung:** how-to-web setzt Hover nicht als Default um. Falls ein Projekt Hover ergänzt:
- Click/Tap bleibt funktionsfähig.
- Panel bleibt beim Wechsel vom Trigger in das Panel offen.
- Escape kann schließen.
- Kein sofortiges Umschalten beim bloßen Überfahren.
- 300–500 ms ist eine begründete Ausgangsgröße, kein universeller Hardcode.

Quellen:
- https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus
- https://baymard.com/research-articles/ecommerce-navigation-best-practice
- https://baymard.com/research-articles/dropdown-menu-flickering-issue

### 5. Escape und Focus-Leaving gehören zum Disclosure-Verhalten

Das aktuelle WAI-Beispiel schließt offene Navigation bei Escape und gibt Fokus zum auslösenden Button zurück. Verlässt Fokus die Navigation, wird ein offenes Dropdown ebenfalls geschlossen.

**Ableitung:** Unsere Desktop-Varianten:
- Escape schließt und fokussiert den zugehörigen Trigger.
- Wenn Fokus vollständig aus dem Navigation-Landmark läuft, schließt das offene Panel.
- Ein neuer Disclosure-Trigger schließt den vorherigen: maximal ein Mega Panel gleichzeitig.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

### 6. Tab bleibt der Hauptweg

WAI zeigt optionale Arrow/Home/End-Unterstützung, betont aber, dass diese normales Tab/Shift+Tab nicht ersetzt.

**Ableitung:** Referenzvarianten verwenden normales Tab-Verhalten. Keine zusätzlichen Pfeiltasten, solange kein nachgewiesener Nutzen die zusätzliche Komplexität rechtfertigt.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

### 7. Gruppierung ist der eigentliche Nutzen eines Mega Menus

NN/g beschreibt Mega Menus als große zweidimensionale Panels, deren Nutzen in Gruppierung, scanbarer Typografie und sichtbarer Hierarchie liegt. Baymards 2025 Benchmark zeigt zugleich, dass zu viele ungegliederte Kategorien Nutzer überfordern; die Forschung empfiehlt handhabbare Chunks.

**Ableitung:** Die Build DNA verlangt:
- benannte Gruppen,
- klare Link-Hierarchie,
- begrenzte, kuratierte Mengen pro Gruppe,
- keine Linkwand als Selbstzweck.

Quellen:
- https://www.nngroup.com/articles/mega-menus-work-well/
- https://baymard.com/research-articles/ecommerce-navigation-best-practice

### 8. Featured Content darf Navigation unterstützen, nicht verdrängen

Große Panels bieten Platz für Bild/Teaser-Inhalte. NN/g sieht Bilder als hilfreich, wenn sie Orientierung unterstützen, warnt aber generell vor unnötig komplexen Widgets im Mega Menu.

**Ableitung:** Die Variante Featured Content enthält höchstens einen klar untergeordneten Teaser. Keine Formulare, Slider, Tabs oder App-Widgets im Mega Panel.

Quelle:
- https://www.nngroup.com/articles/mega-menus-work-well/

### 9. Popover API ist eine moderne optionale Plattformtechnik

Die Popover API ist seit Januar 2025 Baseline auf aktuellen Browsern. Eine `popovertarget`-Beziehung kann Fokusreihenfolge und Beziehungen zum Invoker verbessern und bietet Light Dismiss / Escape-Verhalten.

**Ableitung:** Popover ist eine mögliche Implementierung für ein Mega Panel, aber kein Bestandteil des normativen Vertrags. Browserziele und gewünschtes Dismiss-Verhalten entscheiden, ob es eingesetzt wird.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
- https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using

### 10. Overlays dürfen den Tastaturfokus nicht verschlucken

WCAG 2.4.11 verlangt, dass fokussierte Elemente nicht vollständig durch author-created overlays verdeckt werden.

**Ableitung:** Offene Panels dürfen den aktuellen Tastaturpfad nicht hinter sich verdecken. Fokus im Panel bleibt sichtbar; beim Schließen ist der Trigger sichtbar/fokussierbar.

Quelle:
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum

### 11. Pointer-Ziele brauchen ausreichende Größe oder Abstand

WCAG 2.5.8 definiert 24 × 24 CSS px als Mindestzielgröße, sofern keine Ausnahme greift.

**Ableitung:** Disclosure-Buttons und andere kompakte Controls erfüllen mindestens die WCAG-2.2-AA-Anforderung; die Referenz zielt praktisch auf komfortablere Größen.

Quelle:
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

### 12. Mobile ist kein geschrumpftes Desktop-Mega-Menu

Auf schmalen Viewports fehlt Hover und der verfügbare Überblick sinkt. Baymard zeigt, dass mobile Nutzer klare Top-Level-Kategorien brauchen.

**Ableitung:** Die Informationsarchitektur bleibt gleich, aber die Darstellung darf in gestapelte Disclosure-Gruppen wechseln. Kein horizontal gequetschtes Desktop-Panel.

Quelle:
- https://baymard.com/research-articles/main-navigation-product-categories

## Varianten

### Grouped Links
Klassisches Mega Panel: mehrere klar benannte Linkgruppen.

### Task Based
Links werden nach Nutzeraufgaben statt nur nach interner Organisationsstruktur gruppiert.

### Featured Content
Linkgruppen plus ein einzelner visueller Teaser als untergeordnete Navigationshilfe.

## Produktionshinweis

APG-Beispiele sind illustrative Referenzen. Popover ist inzwischen auf aktuellen Browsern breit verfügbar, kann aber je nach Zielgruppe weiterhin Fallback-/Browser-Matrix-Entscheidungen erfordern. Mega Menus müssen im realen Informationsarchitektur-, Touch-, Tastatur- und Assistive-Technology-Kontext getestet werden.
