# Marketbase — homepage redesign (fase 1)

Herontwerp van de homepage van [marketbase.be](https://marketbase.be/). Deze repository bevat
de analyse, het design system, de volledige layoutspecificatie en een **werkende
designversie** van de nieuwe homepage.

## Bekijken

```bash
git clone <deze repo> && cd Marketbase
python3 -m http.server 8080
# open http://localhost:8080
```

`index.html` opent ook rechtstreeks vanaf schijf — er is geen build, geen dependency en geen
package manager. Schermafbeeldingen op 390, 430, 768 en 1440 px staan in `docs/screenshots/`.

## Documentatie

| Bestand | Inhoud |
|---|---|
| [`docs/01-analyse.md`](docs/01-analyse.md) | Analyse van de huidige homepage: wat er staat, wat structureel en visueel beter kan, wat behouden blijft, en de open punten |
| [`docs/02-design-system.md`](docs/02-design-system.md) | Kleur (afgeleid uit het logo), typografie, ruimte, grid, knoppen, beeld, beweging, toegankelijkheid — met narekenbare contrastwaarden |
| [`docs/03-homepage-layout.md`](docs/03-homepage-layout.md) | Alle 14 secties met desktop- én mobielgedrag, mobiele controlelijst en performance-aanpak |

## Structuur

```
index.html                  volledige homepage, semantisch, met structured data
assets/css/style.css        het volledige design system (~23 kB, geen framework)
assets/js/main.js           ~6 kB vanilla JS: mega-menu, drawer, zoek, accordeons
assets/img/logo-marketbase.svg
assets/img/placeholders/    26 gelabelde placeholders die benoemen welke foto nodig is
docs/                       analyse, design system, layoutspec, screenshots
```

## Wat er gebeurd is

**SEO** — precies één `<h1>`, een ononderbroken H2/H3-hiërarchie zonder sprongen, semantische
landmarks, interne links met beschrijvende anchor text, alt-teksten die het product benoemen,
canonical + hreflang (NL/FR/EN), OpenGraph, en `Organization` / `WebSite` + `SearchAction` /
`ItemList` structured data.

**Conversie** — de pagina volgt *behoefte → oplossing → categorie → product*: een hero die in
één zin zegt wat Marketbase doet, zes categorieën in plaats van acht tegels, een sectie "shop
op toepassing", een keuzehulp-CTA en een vouwtentvergelijking op drie niveaus.

**Mobiel** — geen enkele carrousel, geen horizontale overflow op 390/430/768 px (gemeten),
raakvlakken van 48 px, primaire CTA boven de vouw, en een footer die op mobiel inklapt.

**Performance** — geen framework, geen webfont, geen dependency. CLS-veilige afbeeldingen met
vaste `width`/`height` en `aspect-ratio`, `fetchpriority` op het LCP-beeld, lazy loading
daaronder en `content-visibility` op de zware secties.

## Nog nodig vóór livegang

Deze punten zijn bewust **niet** ingevuld in plaats van gegokt. Ze staan als `TODO` in de code:

1. **Adres, openingsuren, showroom/afhaallocatie en BTW-nummer** — contactsectie, footer en de
   `LocalBusiness` structured data staan klaar maar leeg.
2. **Verhuur** — de briefing vroeg dit menu-item, maar op de huidige site vond ik geen enkele
   aanwijzing dat Marketbase verhuurt. Bevestig dit voor we het toevoegen.
3. **Producten en prijzen** — "New products" en "Best Sellers" waren leeg op de huidige site,
   dus er zijn geen echte namen of prijzen om over te nemen.
4. **Reviewteksten in het Nederlands** — de teksten in de pagina staan letterlijk zoals ze op
   de Engelstalige versie stonden. Het aantal reviews achter de 4,6/5 is niet vermeld omdat
   dat cijfer niet te verifiëren was.
5. **Beeldmateriaal** — 26 placeholders, elk met een beschrijving van de exact benodigde foto.
6. **Het officiële logobestand** — `assets/img/logo-marketbase.svg` is een reconstructie:
   de kleuren (`#29ABE2`, `#1F4A78`) zijn exact, de lettervorm is benaderd.
7. **Het merklettertype** — nu een systeemfont-stack voor maximale snelheid; zie
   `docs/02-design-system.md` §2.2 voor hoe je het merkfont terugbrengt zonder CLS.
