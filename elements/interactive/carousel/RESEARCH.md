# Carousel – Recherche

Stand: 2026-09-28

## Scope

Carousel bedeutet hier: eine kontrollierbare Sequenz zusammengehöriger Inhalte, von denen jeweils ein Teil sichtbar ist.

Drei Varianten testen unterschiedliche Verträge:

- **Editorial / Visual Story** – genau ein großer Story-Slide sichtbar.
- **Content Rail** – mehrere Cards gleichzeitig sichtbar, horizontal verschiebbar.
- **Media Gallery** – ein großes Medium plus direkte Auswahl.

Nicht automatisch Teil eines Carousels:

- Autoplay
- unendliche Rotation
- Drag-only-Navigation
- Gesten als einziger Bedienweg
- komplizierte 3D-Transitions

## Befunde

### 1. Kontrolle ist Kern des Patterns

WAI beschreibt Prev/Next als zentrale Carousel-Controls. Controls bleiben im normalen Tab-Flow; Aktivierung soll Fokus nicht unerwartet bewegen.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- https://www.w3.org/WAI/tutorials/carousels/functionality/

### 2. Autoplay ist optional und teuer

Wenn automatische Rotation existiert, verlangt APG eine Stop/Start-Kontrolle. Rotation stoppt bei Tastaturfokus und soll nicht selbstständig wieder starten.

**Ableitung:** how-to-web nutzt **kein Autoplay als Default**. Die drei Referenzvarianten sind manuell gesteuert.

Quellen:
- https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- https://www.w3.org/WAI/tutorials/carousels/animations/

### 3. Versteckte Slides müssen wirklich aus dem Kontext verschwinden

APG warnt vor Screenreader-Verwirrung, wenn visuell versteckte Slides semantisch weiterhin „sichtbar“ bleiben.

**Ableitung:** Bei Single-Slide-Varianten werden inaktive Slides mit dem nativen `hidden`-Attribut aus Darstellung und Accessibility Tree entfernt. Die Controls bleiben fokussiert.

Quelle:
- https://www.w3.org/WAI/ARIA/apg/patterns/carousel/

### 4. Slide-Wechsel braucht Orientierung

WAI zeigt eine polite Live Region für „Item x of y“. Fokus sollte bei Prev/Next nicht automatisch auf den neuen Slide springen.

**Ableitung:** Editorial Story und Media Gallery aktualisieren eine kurze polite Statusmeldung; der Fokus bleibt auf dem auslösenden Control.

Quelle:
- https://www.w3.org/WAI/tutorials/carousels/functionality/

### 5. Reduced Motion ist Teil des Vertrags

`prefers-reduced-motion` ist browserübergreifend etabliert und signalisiert, dass nicht notwendige Motion reduziert oder entfernt werden soll.

**Ableitung:** Referenztransitions werden bei `reduce` deaktiviert; Funktion bleibt identisch.

Quelle:
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion

### 6. Scroll Snap eignet sich für Rails

CSS Scroll Snap definiert native Snap-Positionen in scrollbaren Containern.

**Ableitung:** Content Rail nutzt native horizontale Scrollbarkeit plus Scroll Snap; Prev/Next sind zusätzliche Controls, nicht die einzige Möglichkeit.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap/Basic_concepts

## Produktionshinweis

WAI-ARIA-APG-Beispiele sind Referenzen, keine Garantie für jede Browser-/Assistive-Technology-Kombination. Produktionscode muss im eigenen Zielstack getestet werden.
