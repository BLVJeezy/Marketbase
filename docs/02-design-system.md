# 2. Design system — Marketbase

Uitgangspunt: het bestaande logo en de bestaande site. Het merk wordt **strakker**, niet
vervangen. Alle tokens staan als CSS custom properties in `assets/css/style.css` onder
`:root`, zodat ze één bron van waarheid vormen.

## 2.1 Kleur

Afgeleid uit het **aangeleverde logo**: helder blauw wordmerk `MARKET` (`#29ABE2`),
navyblauw `BASE` (`#1F4A78`), witte outline, blauw vouwtent-icoon en een blauwe onderbalk.
Die twee blauwtinten zijn letterlijk uit het logo overgenomen; de rest van de schaal is
eromheen gebouwd.

### Merkkleuren

| Token | Hex | Herkomst / gebruik |
|---|---|---|
| `--mb-navy-900` | `#0E2540` | Donkere variant van het logonavy — bodytekst, footer, donkere secties |
| `--mb-navy-800` | `#16385C` | Overlays, randen op donker |
| `--mb-navy-700` | `#1F4A78` | **Logonavy, exact** — accenten, lijnen op donkere vlakken |
| `--mb-blue-600` | `#0D74AC` | **Primaire interactiekleur** — knoppen, links, focus |
| `--mb-blue-500` | `#29ABE2` | **Logoblauw, exact** — iconen, accenten, hover op donker |
| `--mb-blue-100` | `#CFEAF9` | Badges, zachte vlakken |
| `--mb-blue-050` | `#EBF6FD` | Sectieachtergrond, mega-menu-promo |

Het logoblauw `#29ABE2` haalt op wit maar 2,6:1. Het wordt daarom **nooit** voor tekst of
knoppen op wit gebruikt — alleen als merkaccent, en als tekstkleur uitsluitend op de donkere
navy-achtergrond (5,9:1). Voor alles wat klikbaar is op licht, geldt `--mb-blue-600`.

### Neutralen

| Token | Hex | Gebruik |
|---|---|---|
| `--mb-white` | `#FFFFFF` | Basis |
| `--mb-grey-050` | `#F6F8FA` | Afwisselende sectieachtergrond |
| `--mb-grey-100` | `#EDF1F5` | Kaartvlak, skeleton |
| `--mb-grey-200` | `#DDE3EA` | Randen |
| `--mb-grey-400` | `#98A4B2` | Uitgeschakeld |
| `--mb-grey-600` | `#5A6875` | Secundaire bodytekst |

### Signaalkleuren

| Token | Hex | Gebruik |
|---|---|---|
| `--mb-green-600` | `#0A7350` | Op voorraad, geverifieerde review, sterren |
| `--mb-amber-500` | `#A8650A` | Levertijd, "op bestelling" |

**Regel:** het felle groen van Reviews.io wordt vervangen door één donkerder, toegankelijk
groen dat uitsluitend *verificatie- en voorraadsignalen* aanduidt. Alles wat klikbaar is,
is blauw. Zo houdt de pagina één interactiekleur.

### Contrast — narekenbaar

| Combinatie | Ratio | Eis |
|---|---|---|
| `--mb-navy-900` op wit | **15,5:1** | ✅ tekst |
| `--mb-blue-600` op wit | **5,1:1** | ✅ tekst |
| `--mb-blue-600` op `--mb-grey-050` | **4,8:1** | ✅ tekst |
| `--mb-blue-600` op `--mb-blue-050` | **4,7:1** | ✅ tekst |
| wit op `--mb-blue-600` (primaire knop) | **5,1:1** | ✅ tekst |
| `--mb-grey-600` op wit | **5,7:1** | ✅ tekst |
| `#E8F5FD` op `--mb-blue-600` (keuzehulpblok) | **4,6:1** | ✅ tekst |
| `#B9C6D3` op `--mb-navy-900` (donkere sectie) | **8,9:1** | ✅ tekst |
| `--mb-blue-500` op `--mb-navy-900` | **5,9:1** | ✅ tekst |
| `--mb-green-600` op wit | **5,9:1** | ✅ tekst |
| `--mb-blue-500` op wit | 2,6:1 | ⛔ nooit als tekst — enkel als vlak/accent |

Alle waarden zijn berekend met de WCAG 2.1 relatieve-luminantieformule, niet geschat.

## 2.2 Typografie

De huidige site gebruikt een geometrische, licht afgeronde sans (in de richting van Poppins /
Museo Sans Rounded). Dat is herkenbaar en mag blijven — maar niet ten koste van LCP.

**Aanpak in deze versie:** een systeemfont-stack, zodat er **nul** blocking font requests
zijn en de LCP-tekst direct rendert.

```
--mb-font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif;
```

**Aanbeveling voor livegang:** wil je het merklettertype behouden, host dan één variabele
WOFF2 (bv. Poppins variable, subset `latin`), laad die met `font-display: swap`, een
`<link rel="preload">` en een `size-adjust`-fallback in `@font-face` zodat de swap geen CLS
veroorzaakt. Eén bestand, twee gewichten via de variabele as. Nooit vier losse statische
gewichten.

### Schaal (fluid, `clamp()`)

| Rol | Mobiel → desktop | Gewicht | Line-height |
|---|---|---|---|
| Display / H1 | 32 → 56 px | 700 | 1.08 |
| H2 | 26 → 40 px | 700 | 1.15 |
| H3 | 20 → 24 px | 650 | 1.25 |
| H4 / kaarttitel | 17 → 18 px | 650 | 1.3 |
| Body L | 17 → 19 px | 400 | 1.6 |
| Body | 16 → 16 px | 400 | 1.65 |
| Small / meta | 14 px | 500 | 1.5 |
| Label / eyebrow | 13 px, `letter-spacing: .08em`, uppercase | 700 | 1.2 |

Body wordt nooit kleiner dan 16 px. Meta-tekst nooit kleiner dan 14 px.
Maximale regellengte voor lopende tekst: `65ch`.

## 2.3 Ruimte

Basis 4 px. Tokens `--mb-space-1` t/m `--mb-space-16` (4, 8, 12, 16, 20, 24, 32, 40, 48, 64,
80, 96, 120 px).

Verticale sectieruimte is fluid: `clamp(56px, 7vw, 104px)`. Zo krijgt desktop de
premium-ademruimte die de briefing vraagt, terwijl mobiel niet eindeloos lang wordt.

## 2.4 Grid en container

- `--mb-container: 1320px` totaal, met `--mb-gutter` van 20 px (mobiel) → 40 px (desktop).
- Contentbreedte blijft daarmee ± 1240 px: breed genoeg voor 4 kolommen, smal genoeg om
  niet uitgerekt aan te voelen op 1440 px+.
- Lopende tekstblokken zijn beperkt tot 65ch, ook op 1440px.
- Kolommen: 12 op desktop, 8 op tablet, 4 op mobiel.

**Breakpoints**

| Naam | Vanaf | Gedrag |
|---|---|---|
| `xs` | 320 px | 1 kolom |
| `sm` | 390 px | referentiepunt mobiel |
| `md` | 640 px | 2 kolommen kaarten |
| `lg` | 900 px | desktopnavigatie verschijnt, 3 kolommen |
| `xl` | 1200 px | 4 kolommen, volledige hero-split |
| `2xl` | 1440 px | container maxt uit, extra gutter |

## 2.5 Vorm en diepte

- Radius: `--mb-radius-sm: 6px`, `--mb-radius: 10px`, `--mb-radius-lg: 16px`, pill voor badges.
- Randen doen het werk, niet schaduwen: `1px solid var(--mb-grey-200)`.
- Eén schaduwtoken voor zwevende elementen (mega-menu, mobiele drawer):
  `0 12px 32px -8px rgba(11,27,43,.18)`.
- Kaarten in rust: geen schaduw. Bij hover: rand naar `--mb-blue-500` + 1 px omhoog. Meer niet.

Dit is bewust industrieel: rechte vlakken, duidelijke lijnen, geen glow, geen glasmorphism.

## 2.6 Knoppen

| Variant | Uiterlijk | Gebruik |
|---|---|---|
| Primary | Vlak `--mb-blue-600`, witte tekst | Eén per sectie, de gewenste volgende stap |
| Secondary | Wit, 1,5 px rand `--mb-navy-900`, navy tekst | Alternatieve actie naast primary |
| Ghost | Alleen tekst + chevron, blauw | Tertiair, "Bekijk alles" |
| Op donker | Wit vlak, navy tekst | Enkel binnen donkere secties |

- Hoogte: 48 px desktop, **52 px mobiel**. Horizontale padding 24 px.
- Elke knop is minstens 44 × 44 px raakvlak (WCAG 2.5.8 / iOS-richtlijn).
- Focus: `outline: 3px solid var(--mb-blue-500); outline-offset: 2px` — zichtbaar op elke
  achtergrond, nooit `outline: none`.

## 2.7 Iconen

Inline SVG, 24 px, `stroke-width: 1.75`, `currentColor`, `stroke-linecap: round`. Geen
icon-font, geen icoonbibliotheek als dependency. Elk decoratief icoon krijgt
`aria-hidden="true"`; betekenisdragende iconen krijgen een `<title>`.

## 2.8 Beeld

- Vaste aspect ratios per gebruik: hero `16/9` (desktop) en `4/3` (mobiel),
  categoriekaart `4/3`, projectkaart `3/2`, productkaart `1/1`.
- `aspect-ratio` in CSS + `width`/`height` op elke `<img>` → **CLS = 0**.
- `loading="lazy"` + `decoding="async"` op alles behalve de hero-afbeelding, die
  `fetchpriority="high"` krijgt en niet lazy is.
- `<picture>` met AVIF → WebP → JPG, en `srcset` op 480/768/1200/1800 px.
- Alt-tekst beschrijft wat er staat plus het product: *"Zwarte professionele vouwtent 3×3 m
  opgesteld op een horecaterras"* — niet *"tent"*, niet *"marketbase-tent-1"*.

## 2.9 Beweging

Toegestaan: 150–200 ms fade en 1 px verplaatsing bij hover; 250 ms voor het openen van het
mega-menu en de mobiele drawer. Verder niets. Geen scroll-parallax, geen reveal-on-scroll,
geen auto-roterende carrousels.

`@media (prefers-reduced-motion: reduce)` zet alle transitions en animaties op ~0 ms.

## 2.10 Toegankelijkheid — vaste regels

- Semantische landmarks: `header`, `nav`, `main`, `section` met `aria-labelledby`, `footer`.
- Eén `<h1>`, daarna een ononderbroken H2/H3-hiërarchie.
- Skip-link naar `#main` als eerste focusbare element.
- Mega-menu en mobiele drawer zijn volledig toetsenbordbedienbaar (`Esc` sluit, focus keert
  terug naar de trigger, `aria-expanded` wordt bijgewerkt).
- Elk formulierveld heeft een echt `<label>` (visueel verborgen mag, `placeholder` niet).
- Raakvlakken minimaal 44 × 44 px met minstens 8 px tussenruimte.
- Contrast overal ≥ 4,5:1 voor tekst en ≥ 3:1 voor UI-randen en iconen.
