# 3. Homepage-layout — desktop én mobiel gedrag

Volgorde volgt de briefing. Per sectie: doel, inhoud, desktopgedrag, mobiel gedrag, en het
SEO-effect. De H-niveaus hieronder zijn bindend: **exact één H1**, daarna H2 per sectie.

Referentiebreedtes waarop elke sectie is uitgewerkt: **390 px**, **430 px**, **768 px**,
**1024 px**, **1440 px**.

---

## 0. Skip-link + utility bar

Skip-link (`Naar hoofdinhoud`) is het eerste focusbare element, zichtbaar zodra hij focus krijgt.

**Utility bar** — 36 px hoog, `--mb-navy-900`, 14 px tekst:
levertijdbelofte links · telefoon · Contact · Mijn account · taalkiezer (NL / FR / EN).

- **Desktop:** volledige balk.
- **Mobiel:** de balk krimpt tot alleen de levertijdbelofte, gecentreerd, 13 px, één regel
  met `text-overflow: ellipsis`. Taal, account en bestellingen verhuizen naar de onderkant
  van de mobiele drawer. Dit voorkomt dat er drie balken boven de hero staan.

---

## 1. Header

Desktop, twee rijen binnen één `<header>`:
1. Logo (links) · zoekbalk (midden, groeit mee) · telefoonblok · account · winkelmandje.
2. Hoofdnavigatie.

**Hoofdnavigatie:** `Tenten` · `Marktmateriaal` · `Toepassingen` · `Advies` · `Contact`.

> "Verhuur" uit de briefing is **weggelaten** — zie `docs/01-analyse.md` §5.2. Zodra
> bevestigd is dat Marketbase verhuurt, schuift het er als zesde item bij; het menu is
> daarop gedimensioneerd.

**Mega-menu (`Tenten`)** — één paneel over de volle containerbreedte, vier kolommen:

| Type tent | Op toepassing | Onderdelen & accessoires | Uitgelicht |
|---|---|---|---|
| Vouwtenten · Stretchtenten · Pagodetenten · Stertenten · Opblaasbare tenten · Automatische daktenten | Markt & ambulante handel · Horeca · Events & festivals · Bedrijven · Sportclubs | Zijwanden · Betongewichten · Grondankers · Tentonderdelen · Transporttassen | Kaart met foto + "Niet zeker welk model? Start de keuzehulp" |

Opent op hover **én** op klik/Enter, sluit op `Esc` of focusverlies. `aria-expanded` +
`aria-controls`. Openingsanimatie: 250 ms fade + 4 px omhoog, verder niets.
Het volledige assortiment staat bewust **niet** in de balk.

**Mobiel (< 900 px):** één rij van 56 px — hamburger · logo · zoek-icoon · winkelmandje.
- Zoek-icoon klapt een volledige-breedte zoekbalk uit onder de header (focus springt erin).
- Hamburger opent een drawer die van links inschuift, 100% hoogte, `inert` op de
  achtergrond, scroll-lock, focus trap, `Esc` sluit.
- In de drawer: accordeon per hoofditem, rijen van 52 px, chevron rechts. Onderaan
  telefoon, contact, account, taal.
- De header is `position: sticky` en blijft 56 px hoog — hij krimpt niet en verandert niet
  bij scroll (dat kost alleen maar CLS en jank).

---

## 2. Hero — de enige H1

**H1:** *Professionele tenten en marktmateriaal voor elke toepassing*

**Sub:** *Van professionele vouwtenten tot stretchtenten op maat — hoogwaardige oplossingen,
persoonlijk advies en levering aan huis. Al meer dan 15 jaar de Belgische specialist.*

**CTA 1 (primary):** Bekijk alle tenten → `/tenten`
**CTA 2 (secondary):** Vind de juiste tent → `#keuzehulp`

Daaronder een dunne bewijsregel: *Tot 5 jaar garantie · Eigen productie en ontwikkeling ·
4,6/5 op Reviews.io*.

- **Desktop:** split 52/48. Links tekst op wit, rechts een echte projectfoto in `16/9`,
  full-bleed naar de rechterrand. **Geen tekst over de foto** — dat lost meteen het
  contrastprobleem van de huidige site op.
- **Tablet (768 px):** tekst boven, foto eronder, beide volle breedte.
- **Mobiel:** tekst eerst (eyebrow, H1, sub, twee CTA's op volle breedte, bewijsregel),
  foto daaronder in `4/3` en maximaal 46 vh. Deze volgorde is bewust anders dan
  beeld-eerst: **op 390 px staat de primaire CTA “Bekijk alle tenten” daardoor volledig
  boven de vouw** (gemeten op 390 × 844). De H1 blijft op mobiel 32 px en beslaat daar
  vijf regels — groter zou hem laten domineren, kleiner kost hem zijn kracht.

*SEO:* de H1 bevat de kerntermen (professionele tenten, marktmateriaal, toepassing) in een
zin die een mens ook echt zou schrijven. De hero-afbeelding is het LCP-element:
`fetchpriority="high"`, niet lazy, expliciete afmetingen.

---

## 3. USP-balk

Vier items met icoon + korte tekst, direct onder de hero:
in-house productie en ontwikkeling · advies op maat · 15+ jaar ervaring · hoogwaardige,
duurzame materialen. Alle vier letterlijk overgenomen van de huidige site.

- **Desktop:** vier gelijke kolommen, dunne verticale scheidingslijn.
- **Mobiel:** 2 × 2 grid, icoon boven de tekst, gecentreerd. **Geen horizontale scroll.**

---

## 4. Belangrijkste categorieën (H2)

**H2:** *Onze belangrijkste categorieën* — met introzin die de huidige positionering behoudt:
"de online specialist in tenten, zeilen en marktmateriaal".

Zes kaarten in plaats van acht tegels: Vouwtenten · Stretchtenten · Pagodetenten ·
Marktmateriaal · Schaduwdoeken · Betongewichten & accessoires.

Elke kaart: foto (`4/3`) · H3 categorienaam · één zin · ghost-CTA. De hele kaart is één
klikbaar `<a>` (stretched link), zodat het raakvlak maximaal is.

- **Desktop (≥1200 px):** 3 × 2.
- **Tablet:** 2 × 3.
- **Mobiel:** 1 kolom, gestapeld. Bewust géén carrousel — gestapelde kaarten zijn beter
  voor scanbaarheid, voor SEO en voor het aantal categorieën dat daadwerkelijk gezien wordt.

*SEO:* zes interne links naar de belangrijkste categoriepagina's, met de categorienaam als
anchor text. Voorzien van `ItemList` structured data.

---

## 5. Shop op toepassing (H2)

**H2:** *Waarvoor heb je het nodig?*

Zeven ingangen: Markt & ambulante handel · Horeca · Events & festivals · Bedrijven ·
Sportclubs · Privé · Professionele verhuur.

- **Desktop:** grid van 4 + 3 met lifestyle-foto's, tekst in een leesbare gradient-overlay
  onderaan de kaart (niet gecentreerd over het beeld).
- **Mobiel:** 2 kolommen, compacte kaarten met `1/1` beeld en label eronder — geen overlay,
  want overlay-tekst op een klein beeld is niet betrouwbaar leesbaar.

Dit is de sectie die de filosofie *behoefte → oplossing → categorie → product* draagt.

---

## 6. Waarom Marketbase (H2)

Vijf USP's met icoon + H3 + één zin. Uitsluitend geverifieerde claims: persoonlijk advies ·
eigen productie en ontwikkeling · tot 5 jaar garantie · 100% Europese distributie ·
onderdelen en accessoires blijven beschikbaar.

- **Desktop:** donkere sectie (`--mb-navy-900`), 5 kolommen. Het donkere blok geeft de
  pagina ritme en zet het merk visueel neer.
- **Mobiel:** 1 kolom, icoon links, tekst rechts. Compact, geen enkele paragraaf.

De lange bullet-lijst van de huidige site verdwijnt hiermee.

---

## 7. Keuzehulp-CTA (H2)

**H2:** *Niet zeker welke tent je nodig hebt?*
**Sub:** *Beantwoord enkele korte vragen en ontdek welk model het best bij jouw toepassing past.*
**CTA:** Start de keuzehulp

Visueel het opvallendste blok van de pagina: blauw vlak, drie stappen (Toepassing →
Formaat → Gebruiksintensiteit) als genummerde chips.

- **Desktop:** tekst links, stappen rechts.
- **Mobiel:** gestapeld, stappen als horizontale rij van drie chips, CTA op volle breedte.

Nog niet functioneel — de visuele component en het anker `#keuzehulp` bestaan wel.

---

## 8. Populaire producten (H2)

Vier producten. Kaart: `1/1` foto · naam · belangrijkste variant · prijs vanaf · één
USP-regel · CTA.

- **Desktop:** 4 kolommen.
- **Mobiel:** **2 per rij**, niet swipen. Productnamen krijgen twee regels
  (`-webkit-line-clamp: 2`) zodat ze niet midden in een woord afbreken.

Alle vier zijn placeholders — de "Best Sellers"-sectie van de huidige site was leeg, dus er
zijn geen echte namen of prijzen om over te nemen.

---

## 9. Productvergelijking (H2)

**H2:** *Welke vouwtent past bij jou?* — drie niveaus: instap / licht gebruik ·
professioneel · heavy duty. Vier vergelijkingsrijen (frame, doek, gebruik, garantie).
Het middelste model is gemarkeerd als meest gekozen.
**CTA:** Vergelijk alle vouwtenten.

- **Desktop:** drie kolommen naast elkaar, gedeelde rijhoogtes.
- **Mobiel:** drie gestapelde kaarten waarin elk kenmerk zijn eigen label meekrijgt
  (label links, waarde rechts). **Geen horizontaal scrollende tabel** — dat is op 390 px
  altijd onleesbaar.

*SEO + conversie:* dit blok vangt "welke vouwtent"-zoekintentie op de homepage zelf op.

---

## 10. Advies van onze specialisten (H2)

Drie artikelkaarten: *Welke vouwtent heb ik nodig?* · *PVC of polyester?* ·
*Hoe veranker je een tent veilig?* Elk met leestijd en categorie.
**CTA:** Bekijk alle adviezen.

- **Desktop:** 3 kolommen. **Mobiel:** gestapeld.

Positioneert Marketbase als expert en vormt het anker voor de latere SEO-contentlaag.

---

## 11. Projecten (H2)

**H2:** *Projecten van onze klanten* — drie echte projectfoto's met bijschrift
(type tent + toepassing). De sterke fotografie die nu onderaan in een carrousel verstopt zit,
krijgt hier ruimte.

- **Desktop:** asymmetrisch grid — één grote (2/3) + twee kleine.
- **Mobiel:** gestapeld, `3/2`, bijschrift onder het beeld.

---

## 12. Reviews (H2)

**H2:** *Wat klanten over ons zeggen* — het gemiddelde (4,6/5, Reviews.io) plus **drie**
reviews. Geen carrousel, geen dubbele reviews.

- **Desktop:** 3 kolommen. **Mobiel:** gestapeld, alleen de eerste twee zichtbaar met een
  "Toon meer"-knop, zodat de sectie mobiel niet drie schermen lang wordt.

Reviewteksten staan letterlijk zoals gevonden; het aantal reviews is niet vermeld omdat ik
dat niet kon verifiëren.

---

## 13. Contact / showroom (H2)

**H2:** *Persoonlijk advies nodig?* — telefoon (`tel:`), e-mail, adres, openingsuren,
routelink, contact-CTA.

- **Desktop:** contactgegevens links, kaart/foto rechts.
- **Mobiel:** gestapeld; telefoon en e-mail als twee knoppen van volle breedte bovenaan,
  want dat is op mobiel de daadwerkelijke actie.

Adres en openingsuren staan als `TODO` in de HTML en zijn **niet ingevuld**. Zodra ze
bekend zijn, vullen ze meteen ook de `LocalBusiness` structured data en de Local SEO-laag.

---

## 14. Footer

Zes kolommen: Producten · Toepassingen · Advies · Service · Bedrijf · Contact.
Daaronder een balk met bedrijfsgegevens, voorwaarden, privacy, cookies, sociale kanalen en
de taalkiezer.

- **Desktop:** 6 kolommen. **Tablet:** 3 × 2.
- **Mobiel:** de vijf linkkolommen worden `<details>`-accordeons (native, geen JS), het
  contactblok blijft altijd open. Zo blijft de footer op 390 px ± 1,5 scherm in plaats van 5.

---

## Mobiele controlelijst (expliciet getest)

| Punt | 390 px | 430 px | 768 px |
|---|---|---|---|
| Horizontale overflow | geen | geen | geen |
| Primaire CTA boven de vouw | ja | ja | ja |
| Minimale raakvlakgrootte | 48 px | 48 px | 48 px |
| Grootste H1 | 32 px | 32 px | 40 px |
| Aantal carrousels | 0 | 0 | 0 |
| Tekst over beeld | alleen sectie 5, met overlay ≥ 4,5:1 | idem | idem |
| Kleinste tekst | 14 px | 14 px | 14 px |

`html, body { overflow-x: clip }` staat er als vangnet, maar geen enkele sectie heeft het nodig.

Gemeten met Playwright/Chromium op 390, 430, 768 en 1440 px: `document.scrollWidth` is op
elke breedte exact gelijk aan `window.innerWidth`, geen enkel element steekt buiten de
viewport, en er treedt geen JS-fout op. De schermafbeeldingen staan in `docs/screenshots/`.

## Performance-aanpak

- Eén CSS-bestand, geen framework, geen CSS-in-JS. Ongeveer 20 kB ongecomprimeerd.
- Eén JS-bestand, vanilla, ± 4 kB, `defer`. Alleen: mega-menu, mobiele drawer, mobiele zoek,
  "toon meer" bij reviews. Geen enkele dependency.
- Nul webfont-requests in deze versie (systeemstack) → geen FOIT/FOUT, geen font-CLS.
- Kritieke CSS staat inline in de `<head>`; de rest wordt niet-blokkerend geladen.
- Elke `<img>` heeft `width`/`height` + `aspect-ratio` → CLS ≈ 0.
- Hero-beeld: `fetchpriority="high"`, `preload`, AVIF/WebP → snelle LCP.
- Alles onder de vouw: `loading="lazy"` + `decoding="async"`.
- `content-visibility: auto` op de zware secties onderaan.
