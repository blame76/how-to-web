# Page Metadata – Recherche

Stand: 2026-09-29

## Forschungsfrage

Nicht:

> Welche Meta-Tags braucht man für SEO?

Sondern:

> Welche Informationen beschreibt eine Seite für Maschinen, obwohl Menschen sie im normalen Seiteninhalt kaum oder gar nicht sehen?

Die Recherche betrachtet Browser, Suchmaschinen, Social-Plattformen, strukturierte Daten und Coding-Agenten gemeinsam.

Arbeitstitel des Lerngegenstands:

> **Invisible Page Contract**

Taxonomisch ist das kein Organismus. Ein Organismus koordiniert sichtbare UI-Komponenten und Interaktionen. Page Metadata wirkt dagegen **querschnittlich** über nahezu jede Seite.

Vorläufiger Pfad:

`concerns/page-metadata`

---

# 1. Der `<head>` ist eine Maschinenoberfläche der Seite

MDN beschreibt den HTML-`<head>` ausdrücklich als Container für maschinenlesbare Informationen über das Dokument.

Dazu gehören unter anderem:

- `<title>`
- `<meta>`
- `<link>`
- Stylesheets
- Scripts
- Icons und weitere Ressourcen

Für diesen Concern interessieren uns nicht beliebige Ressourcen, sondern Informationen, die die **Identität, Auffindbarkeit, Darstellung und maschinelle Interpretation der Seite** beschreiben.

**Ableitung:**

„Nicht sichtbar“ bedeutet nicht „nebensächlich“.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata

---

# 2. Titel und Beschreibung sind keine bloßen SEO-Felder

## `<title>`

Der Dokumenttitel ist:

- Browser-/Tab-Titel,
- Bestandteil vieler Such- und Bookmark-Kontexte,
- Dokumentidentität unabhängig von der sichtbaren `<h1>`.

Titel und sichtbare Hauptüberschrift dürfen ähnlich sein, müssen aber nicht bytegleich sein.

## Meta Description

Google erzeugt Search-Snippets primär aus Seiteninhalt, kann aber die Meta Description verwenden, wenn sie die Seite besser beschreibt.

Es gibt keine garantierte Darstellung und keine feste Zeichenlänge, die Google immer unverändert übernimmt.

**Ableitung:**

Meta Description ist eine **Beschreibung der Seite für mögliche externe Darstellung**, kein garantierter Suchergebnistext.

Quellen:

- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/crawling-indexing/special-tags

---

# 3. Meta Keywords sind ein gutes Anti-Beispiel

Google Search verwendet:

```html
<meta name="keywords" content="...">
```

nicht für Indexierung oder Ranking.

Google führt den Tag ausdrücklich unter nicht unterstützten Meta-Tags.

**Ableitung:**

Der Concern sollte `meta keywords` bewusst zeigen – aber als historische bzw. irreführende Vereinfachung:

> Mehr Metadaten sind nicht automatisch mehr Auffindbarkeit.

Wir sollten keinen `keywords`-Contract in Build DNA verlangen.

Quellen:

- https://developers.google.com/search/docs/crawling-indexing/special-tags
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

---

# 4. Canonical beschreibt bevorzugte Identität, nicht absolute Wahrheit

`rel="canonical"` signalisiert Suchmaschinen die bevorzugte repräsentative URL für gleiche oder sehr ähnliche Inhalte.

Google behandelt diese Angabe als starkes Signal, kann aber eine andere kanonische URL wählen.

**Ableitung:**

Canonical gehört zur **Dokumentidentität**.

Ein Coding-Agent darf die URL nicht aus Beispiel-Domain oder Pfad erraten.

Der Contract muss unterscheiden:

- tatsächliche veröffentlichte URL,
- kanonische URL,
- lokale Demo-/Preview-URL.

Quelle:

- https://developers.google.com/search/docs/crawling-indexing/canonicalization

---

# 5. Robots-Metadaten steuern keine Zugriffsrechte

`<meta name="robots">` kann kooperativen Such-Crawlern Hinweise zur Indexierung und Darstellung geben, etwa:

- `noindex`
- `nofollow`
- `nosnippet`
- `noimageindex`

Das ist keine Sicherheits- oder Zugriffskontrolle.

Crawler müssen die Seite zunächst abrufen können, um die Meta-Regel zu lesen.

`robots.txt` und Robots Meta haben außerdem unterschiedliche Aufgaben:

- `robots.txt` betrifft Crawling,
- Robots Meta betrifft Seitenindexierung und Ergebnisdarstellung.

**Ableitung:**

Ein häufiger falscher Satz wäre:

> „Die Seite ist geheim, wir setzen noindex.“

Das ist technisch kein Schutz.

Quellen:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/robots
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

---

# 6. Social Share Preview ist ein eigener Repräsentationsvertrag

Open Graph beschreibt, wie eine Webseite als Objekt in einem Social Graph repräsentiert werden kann.

Die vier grundlegenden Open-Graph-Eigenschaften sind:

- `og:title`
- `og:type`
- `og:image`
- `og:url`

Häufig relevante Ergänzungen:

- `og:description`
- `og:site_name`
- `og:locale`
- `og:image:width`
- `og:image:height`
- `og:image:type`
- `og:image:alt`

Die Spezifikation sagt ausdrücklich: Wenn `og:image` gesetzt wird, sollte auch `og:image:alt` vorhanden sein.

**Ableitung:**

Eine Social Preview ist nicht:

> „Nimm einfach irgendein Bild aus der Seite.“

Sie ist eine bewusst definierte externe Repräsentation des Dokuments.

Das passt sehr gut zur how-to-web-Lernidee:

> Die Seite besitzt mehr als eine sichtbare Oberfläche.

Quelle:

- https://ogp.me/

---

# 7. Social Metadata und HTML-Titel dürfen nicht unkontrolliert auseinanderlaufen

Eine Seite kann gleichzeitig besitzen:

- sichtbare `<h1>`
- Dokument-`<title>`
- Meta Description
- `og:title`
- `og:description`
- Share Image
- Structured-Data-Name/Headline

Diese Werte dürfen sich unterscheiden, weil ihre Kontexte verschieden sind.

Sie dürfen aber nicht versehentlich **verschiedene Aussagen über dieselbe Seite** machen.

**Ableitung:**

Der Contract braucht eher eine **Source-of-Truth-/Consistency-Regel** als die Forderung, alle Texte identisch zu machen.

Beispiel:

```text
H1
→ erklärt die Seite im Seitenkontext

<title>
→ identifiziert Dokument/Tab

og:title
→ identifiziert geteiltes Objekt

description
→ beschreibt Seite knapp extern

JSON-LD headline/name
→ beschreibt dieselbe Entität strukturiert
```

---

# 8. Structured Data ist eine zusätzliche semantische Darstellung

Schema.org beschreibt Entitäten und Beziehungen maschinenlesbar.

Google unterstützt für strukturierte Daten unter anderem:

- JSON-LD
- Microdata
- RDFa

Google empfiehlt JSON-LD für seine Rich-Result-Anwendungsfälle.

Wichtig:

- syntaktisch korrekt bedeutet nicht automatisch Rich Result,
- Markup muss zum tatsächlichen Seiteninhalt passen,
- nicht jede Schema.org-Eigenschaft führt zu einer besonderen Suchdarstellung.

**Ableitung:**

Für how-to-web ist JSON-LD interessant als:

> dieselbe Seite, noch einmal als explizites Datenmodell.

Nicht als:

> SEO-Zauber-JSON.

Quellen:

- https://schema.org/
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/structured-data/organization

---

# 9. „JSON Daten“ muss sauber getrennt werden

Mindestens drei verschiedene JSON-Arten können in einem Projekt vorkommen:

## A. Structured Data / JSON-LD

```html
<script type="application/ld+json">...</script>
```

Beschreibt die veröffentlichte Seite bzw. ihre Entitäten für externe Maschinen.

## B. how-to-web Build DNA

```text
build-dna.json
```

Beschreibt den Rekonstruktionsvertrag des Features.

## C. Demo-/Anwendungsdaten

```text
examples/foo.json
```

Enthalten konkrete Beispielinhalte oder Anwendungskonfiguration.

**Ableitung:**

Alle drei sind JSON, aber sie beantworten völlig verschiedene Fragen.

Das sollte wahrscheinlich ein zentraler Lernmoment der Seite werden.

---

# 10. llms.txt ist Agent Discovery – aber derzeit ein Vorschlag, kein HTML-Webstandard

`llms.txt` wurde 2024 als Vorschlag eingeführt und im August 2026 als v2 überarbeitet.

Die Idee:

- eine kompakte Markdown-Datei,
- Kontext zum Projekt bzw. Websitebereich,
- Links zu relevanten maschinenlesbaren oder Markdown-Ressourcen.

v2 ergänzt Discovery aus HTML:

```html
<link rel="alternate" type="text/markdown" href="./index.md">
<link rel="describedby" href="./llms.txt">
```

Das entspricht bereits unserem how-to-web-Modell.

Wichtig für die Darstellung:

- `llms.txt` ist kein WHATWG-/W3C-/IETF-Standard,
- wir sollten ihn als **aktuellen Agent-Discovery-Vorschlag mit wachsender Nutzung** beschreiben,
- nicht als verpflichtenden Bestandteil einer Webseite.

Quellen:

- https://llmstxt.org/
- https://llmstxt.org/changes.html

---

# 11. Agent Discovery und SEO sind nicht dasselbe

Suchmaschinen-, Social- und Agent-Metadaten überschneiden sich teilweise, lösen aber unterschiedliche Aufgaben.

Beispiele:

| Ziel | Mechanismus |
| --- | --- |
| Dokument im Browser identifizieren | `title` |
| Seite knapp beschreiben | meta description |
| bevorzugte URL signalisieren | canonical |
| Indexierungspräferenz | robots meta |
| Social Share repräsentieren | Open Graph |
| Entitäten explizit modellieren | JSON-LD / Schema.org |
| Agenten zu sauberem Kontext führen | llms.txt / Markdown Discovery |
| how-to-web Rekonstruktionsvertrag | Build DNA |

**Ableitung:**

Der Concern sollte nicht „SEO Metadata“ heißen.

Das wäre zu eng und würde genau die falsche Vereinfachung erzeugen.

---

# 12. Die sichtbare Seite darf Kleingedrucktes sein

Der Nutzer schlug vor:

> Die HTML ist nicht leer, sie hat Kleingedrucktes.

Das passt sehr gut.

Die Human Reference könnte absichtlich wie eine beinahe leere Seite starten:

```text
PAGE METADATA

Du siehst fast nichts.

Browser, Suchmaschinen,
Social Platforms und Agenten
sehen deutlich mehr.
```

Darunter eine kleine reale sichtbare Seite / Impressum-artiges Kleingedrucktes.

Daneben oder darunter ein **Inspector**, der dieselbe Seite aus mehreren Maschinenperspektiven zeigt:

1. Browser / Dokument
2. Search
3. Social Share
4. Structured Data
5. Agent Discovery

Damit wird das Unsichtbare erfahrbar, ohne dass wir nur Codeblöcke zeigen.

---

# 13. Vorläufiger Scope

## Core

### Document Identity

- `title`
- meta description
- canonical
- language relationship zur Seite
- published URL

### Crawl / Index Signals

- robots meta
- Abgrenzung zu robots.txt

### Social Representation

- Open Graph Core
- description
- image dimensions/type/alt
- bewusstes Share Image

### Structured Semantics

- JSON-LD
- passender Schema.org-Type
- Daten müssen sichtbaren Inhalt korrekt repräsentieren

### Agent Discovery

- `llms.txt`
- Markdown alternate
- `describedby`
- how-to-web Build DNA link

### Consistency Contract

- alle Repräsentationen beschreiben dieselbe Seite,
- Unterschiede müssen intentional sein,
- keine erfundenen Aussagen.

---

# 14. Bewusst nicht im ersten Scope

Noch nicht automatisch hineinziehen:

- Analytics / Tracking
- Consent Management
- CSP / Security Headers
- komplette `robots.txt`
- Sitemap-Architektur
- PWA Manifest
- Favicons/Icon-Matrix
- RSS/Atom
- hreflang / vollständige Internationalisierung
- Ads-/Marketing-Tags
- Verifikations-Meta-Tags
- jede plattformspezifische Social-Meta-Erweiterung

Diese Dinge sind ebenfalls teilweise unsichtbar, aber sie würden den ersten Concern in eine „alles im Head“-Enzyklopädie verwandeln.

---

# 15. Mögliche Build-DNA-Schwerpunkte

Wenn der Concern trägt, wären denkbar:

## identity_contract

- visible title / H1
- document title
- canonical URL
- public URL

## description_contract

- page summary
- search description
- social description
- deliberate reuse vs adaptation

## social_contract

- Open Graph type
- title
- description
- URL
- image
- image alt
- image dimensions

## indexing_contract

- intended indexability
- robots directives
- canonical relation

## structured_data_contract

- schema type
- represented entity
- required factual consistency
- no invented properties

## agent_discovery_contract

- Markdown reference
- llms.txt
- describedby
- machine-readable contract links

## consistency_contract

- which fields share a source of truth
- which may differ
- what must never contradict

---

# 16. Vorläufige falsche Vereinfachung

Interne Qualitätsfrage:

> **Welche falsche Vereinfachung soll der Leser nach dieser Seite nicht mehr machen?**

Hier:

> **„Was man auf der Seite nicht sieht, ist für die Seite nicht wichtig.“**

Oder etwas konkreter:

> **„Eine Webseite ist nur das, was im Browserfenster sichtbar ist.“**

Das scheint der stärkere Lernkern zu sein.

---

# Vorläufige Empfehlung

`concerns/page-metadata` trägt als erster Concern.

Nicht als Sammlung von Meta-Tags, sondern als:

> **Contract für die unterschiedlichen maschinellen Repräsentationen derselben Seite.**

Die Human Reference sollte die Seite deshalb nicht technisch überfrachten, sondern das Unsichtbare sichtbar machen:

```text
eine kleine Seite
        ↓
┌ Browser ┐
┌ Search  ┐
┌ Social  ┐
┌ JSON-LD ┐
┌ Agents  ┐
```

Der wichtigste Review-Gegenstand wäre dann nicht:

> Sind alle Tags vorhanden?

sondern:

> **Erzählen alle Repräsentationen dieselbe Wahrheit über die Seite?**
