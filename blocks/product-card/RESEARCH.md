# Product Card – Recherche

Stand: 2026-09-26

## Fragestellung

Welche Informationen und Interaktionen braucht eine moderne Produktkarte, damit Menschen Produkte in einer Liste schnell vergleichen können, ohne aus der Karte bereits eine komplette Produktdetailseite zu machen?

## Aktuelle Leitplanken

### 1. Produktinformationen müssen Vergleich ermöglichen

Baymards Product-List-Forschung nennt fünf Informationen, die für sehr viele Produktlisten entscheidend sind: Preis, Produktname/-typ, Thumbnail, durchschnittliche Bewertung samt Anzahl und Produktvariationen.

Ableitung für how-to-web:

- Produktname und Preis sind Pflicht im Showcase.
- Bewertungsdaten werden nur gezeigt, wenn sie vorhanden sind; im Demo sind sie ausdrücklich fiktive Beispieldaten.
- Varianten werden als Cue gezeigt, nicht als duplizierte Listeneinträge.

Quelle:
- https://baymard.com/research-articles/product-listing-information

### 2. Apparel braucht mehrere visuelle Ansichten

Baymard empfiehlt für visuell getriebene Produkte inzwischen mindestens drei zugängliche Thumbnails in Produktlisten; bei Apparel können deutlich mehr Ansichten sinnvoll sein.

Ableitung:

- Thumbnail-Wechsel ist Bestandteil des Premium-Retail-Beispiels.
- Der aktuelle Demo-Stand mit zwei Bildern wird nicht als Best Practice ausgegeben, sondern als bekannte Lücke.
- Eine dritte Detailansicht ist bereits als Bildprompt im README definiert.

Quellen:
- https://baymard.com/research-articles/secondary-hover-information
- https://baymard.com/research-articles/current-state-product-list-and-filtering

### 3. Varianten zusammenhalten

Aktuelle Baymard-Auswertungen empfehlen, Produktvariationen nicht unnötig als separate Produkte zu vervielfachen.

Ableitung:

- Der Hoodie bleibt ein Listeneintrag.
- Größen/Varianten erscheinen als kompakte Information in derselben Karte.

Quelle:
- https://baymard.com/research-articles/current-state-product-list-and-filtering

### 4. Responsive Bilder sind Teil des Blocks

MDN dokumentiert `srcset` und `sizes` als Browsermechanismus, um aus mehreren Bildgrößen die passende Ressource auszuwählen. Explizite `width`- und `height`-Attribute helfen dem Browser außerdem, Platz vor dem Laden zu reservieren und Layout Shift zu vermeiden.

Ableitung:

- Das Beispiel nutzt AVIF mit WebP-Fallback.
- 480/960/1440/1920 werden als `srcset` angeboten.
- `width` und `height` sind gesetzt.
- `sizes` beschreibt die reale Kartenbreite.

Quellen:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img

### 5. Thumbnail-Controls sind echte Controls

WCAG 2.2 SC 2.5.8 fordert für Pointer-Ziele grundsätzlich mindestens 24×24 CSS-Pixel oder ausreichend Abstand, soweit keine Ausnahme greift. WAI empfiehlt zudem kurze, zweckbezogene und unterscheidbare Accessible Names.

Ableitung:

- Thumbnails sind `button`-Elemente, keine klickbaren `div`.
- Sie sind größer als das WCAG-Minimum.
- Jeder Button beschreibt die Ansicht, die er aktiviert.
- Der aktive Button wird programmatisch mit `aria-pressed` angezeigt.

Quellen:
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/

### 6. Eine Card braucht nicht automatisch eine riesige Link-Fläche

Das W3C Design System zeigt Cards mit einem klar identifizierten Hauptlink. WAI-Technik H2 behandelt außerdem benachbarte Bild- und Textlinks zum selben Ziel als Fall, der sinnvoll zusammengeführt werden sollte.

Ableitung:

- Im Showcase gibt es genau einen klaren Produktlink.
- Thumbnail-Buttons bleiben unabhängige Controls.
- Die gesamte Karte wird nicht per JavaScript zu einem pseudo-interaktiven Container gemacht.

Quellen:
- https://design-system.w3.org/components/cards.html
- https://www.w3.org/WAI/WCAG22/Techniques/html/H2.html

### 7. Quick Add ist eine Produktentscheidung, kein Standardfeature

Shopifys aktuelles Horizon-Theme trennt Product Card und Quick Add und entscheidet anhand von Verfügbarkeit und Variantensituation, ob direkt hinzugefügt oder zunächst Optionen gewählt werden können.

Ableitung:

- Das erste how-to-web-Beispiel implementiert noch keinen Quick Add.
- Eine spätere Variante darf ihn nur einführen, wenn das Produktmodell eindeutig genug ist.

Quelle:
- https://github.com/Shopify/horizon/blob/main/snippets/quick-add.liquid

## Bewusste Entscheidungen im ersten Showcase

- Ein Hoodie, keine Produktliste mit mehreren Produkten.
- Zwei vorhandene Bildansichten; dritte Ansicht bleibt als dokumentierte Lücke.
- Schwarz/weiß für UI und Rahmen; die Bildassets dürfen ihre eigene Bildwelt behalten.
- Kein Wishlist-Icon, kein Sale-Badge, kein künstlicher Countdown.
- Kein Quick Add.
- Kein Hover-only-Verhalten.
- Ein primärer Link zur Produktdetailseite.
- JSON als Quelle für Beispielinhalt und Asset-Zuordnung.

## Review-Gate

PASS erst, wenn:

- JSON ohne HTML-Änderung austauschbar ist,
- beide Bilder mit Tastatur umschaltbar sind,
- Focus sichtbar bleibt,
- Bildwechsel den Accessible Name/Alt-Text korrekt aktualisiert,
- keine horizontalen Überläufe bei 320 CSS-Pixeln entstehen,
- 200-%-Zoom sinnvoll bleibt,
- responsive Bildquellen korrekt aufgelöst werden,
- die dritte für Apparel empfohlene Ansicht entweder vorhanden oder bewusst als Ausnahme dokumentiert ist.
