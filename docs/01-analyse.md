# 1. Analyse van de huidige Marketbase-homepage

> Bron: de vijf screenshots van `marketbase.be/en/` (EN-versie) plus het logobeeld die bij de
> briefing zijn meegeleverd. De gedownloade HTML stond **niet** in de repository en
> `marketbase.be` is vanuit deze omgeving niet bereikbaar (egress geblokkeerd). Alle citaten
> hieronder zijn letterlijk overgenomen uit de screenshots. Wat ik niet kon zien, staat
> expliciet in §5 als open punt — er is niets bijverzonnen.

## 1.1 Wat er nu op de pagina staat

| Zone | Huidige inhoud |
|---|---|
| Utility bar | "We ship packages as soon as possible after you place your order and make payment" · Contact · Orders · My Account · taalkiezer (English) |
| Header | Logo · leeg zoekveld · telefoon-icoon "Contact us: +(32) 475-35-04-23" · winkelmandje "€ 0,00" |
| Navigatie | Home · Tents · Flags · Shade cloths · Market Vendors' Supplies · Automatic roof tents · CHR Patio Umbrellas |
| Hero | Foto zwarte vouwtent op terras + tekstblok: "Professional folding tents for every occasion, designed with an eye for quality, ease of use, and durability, with up to a 5-year warranty" + CTA "Discover them here" |
| USP-balk | In-house production and development · Customized advice and support · + 15 years of experience · High-quality, sustainable materials · REVIEWS.io 4.6 / 5 |
| Categorieblok | "The online specialist in tents, tarps, and market supplies" + 8 tegels: Folding tents, Stretch tents, Automatic roof tents, Inflatable tents, Pagoda tents, Shade cloths, Star Tents, Concrete Weights |
| Reviews | Horizontale carrousel, 4+ kaarten (Karel Verhaerd, Benoit Massin, Anonymous, "The Co…") |
| Why Choose MarketBase | Foto-carrousel + bullet-lijst: Personalized service · Top quality · Flexibility · In-house distribution |
| New products / Best Sellers | Twee koppen met **lege** inhoud in de screenshot |
| Sfeerblok | "Your vision, our solutions." / "Discover how our tents and tarps blend seamlessly into any unique outdoor setting." — witte tekst op witte achtergrond, onleesbaar |
| Projecten | "View our clients' successful projects here" + fotocarrousel |

## 1.2 Structurele problemen

1. **Geen H1-hiërarchie.** De hero-tekst is een lange volzin, geen kop. De sterkste
   commerciële boodschappen ("The online specialist in tents, tarps, and market supplies",
   "Why Choose MarketBase", "Best Sellers") staan als gelijkwaardige koppen naast elkaar.
   Google krijgt geen enkel signaal wat de pagina *primair* is.
2. **De hero verkoopt één product, niet het bedrijf.** De hero gaat volledig over vouwtenten
   met 5 jaar garantie. Wie een stretchtent, schaduwdoek of marktmateriaal zoekt, ziet in de
   eerste viewport niets dat hem aanspreekt.
3. **Geen enkele CTA-hiërarchie.** "Discover them here" is de enige knop boven de vouw, en
   het label zegt niet waarheen. Verderop is er letterlijk geen enkele knop meer — alle
   navigatie verloopt via kaarten en carrousels.
4. **Acht categorietegels naast elkaar.** Dat is geen keuze aanbieden, dat is de
   productboom uitklappen. Bovendien zijn de tegels visueel zwak: kleine uitgeknipte
   productrenders op wit, zonder beschrijving, zonder CTA, met een 4×2-grid dat op tablet
   en mobiel onvermijdelijk breekt.
5. **Lege secties.** "New products" en "Best Sellers" renderen als kop zonder inhoud. Of dat
   nu lazy loading of een gebroken feed is: het is een dood blok in het midden van de
   belangrijkste pagina, en het is exact de plek waar conversie hoort te gebeuren.
6. **Onleesbaar sfeerblok.** "Your vision, our solutions." staat wit op wit. Dit is
   tegelijk een contrast- (WCAG-fail) en een CLS-/renderprobleem.
7. **Carrousels als hoofdmechanisme.** Reviews, "Why Choose", projecten — drie carrousels op
   één pagina. Op mobiel betekent dat drie keer horizontaal swipen om content te zien die
   Google grotendeels niet als prominent leest, met kaarten die halverwege afgesneden
   worden (zichtbaar bij "The Co…" en "Highly recommen…").
8. **Alles is product, niets is begeleiding.** De pagina beantwoordt nergens de vraag
   "welke tent heb ik nodig?" — terwijl dat de vraag is waarmee vrijwel elke bezoeker binnenkomt.
9. **Geen toepassings-ingang.** Markt, horeca, events, bedrijven, sportclubs: nul
   zichtbare ingangen, terwijl dat de taal is die de klant zelf gebruikt.
10. **Geen lokale verankering.** Nergens België/Limburg, geen adres, geen openingsuren,
    geen afhaal-/showroominfo op de homepage. Local SEO ligt volledig braak.

## 1.3 Visuele problemen

- **Typografie zonder schaal.** Sectiekoppen ("New products", "Best Sellers") zijn even
  groot als de hero-tekst. Er is geen ritme van groot → klein.
- **Reviewsterren in Reviews.io-groen** botsen met het blauw van het logo. De pagina heeft
  daardoor twee accentkleuren die niets met elkaar te maken hebben.
- **Witruimte wordt verkeerd besteed.** Enorme lege verticale gaten rond de lege secties,
  terwijl de categorietegels tegen elkaar aan geperst staan.
- **Het merk is alleen in het logo aanwezig.** Het diepe marineblauw en het heldere blauw
  uit het logo komen nergens terug in vlakken, knoppen of accenten. De pagina had van elke
  webshop kunnen zijn.
- **Fotografie wordt niet benut.** Er zijn duidelijk sterke echte projectfoto's (de witte
  pagodetent bij zonsondergang, de stretchtent bij het historische pand). Die staan
  onderaan, klein, in een carrousel — in plaats van de pagina te dragen.

## 1.4 Wat sterk is en behouden moet blijven

Dit zijn de elementen die Marketbase-eigen zijn. Ze gaan mee naar het nieuwe ontwerp,
alleen scherper geformuleerd en beter gepositioneerd:

- Het logo: **MARKET** in helder blauw (`#29ABE2`) boven **BASE** in navyblauw (`#1F4A78`),
  met witte outline, een blauw vouwtent-icoon rechts en een blauwe onderbalk. Beide
  blauwtinten zijn exact overgenomen in het design system.
- De positionering **"de online specialist in tenten, zeilen en marktmateriaal"**.
- De vier USP's: in-house productie en ontwikkeling · advies op maat · 15+ jaar ervaring ·
  hoogwaardige, duurzame materialen.
- **Tot 5 jaar garantie** op de professionele vouwtenten.
- **4,6/5 op Reviews.io** met echte, inhoudelijke klantreviews.
- **100% Europese, eigen distributie.**
- De echte projectfotografie.
- Het brede assortiment inclusief onderdelen, betongewichten en accessoires — dat is
  precies wat Marketbase onderscheidt van dropshippers.

## 1.5 Open punten — nodig vóór livegang

Deze gegevens kon ik niet verifiëren en zijn daarom **niet** ingevuld. In `index.html` staan
ze als `TODO`-comment gemarkeerd:

1. **Adres, openingsuren, showroom/afhaallocatie, BTW-nummer.** De contactsectie en de
   `LocalBusiness`-structured data zijn opgebouwd maar bewust leeg gelaten. Geen verzonnen
   adres.
2. **Verhuur.** De briefing vraagt "Verhuur" in de hoofdnavigatie. Op de huidige site vond
   ik geen enkele aanwijzing dat Marketbase verhuurt. Het menu-item staat er daarom **niet**
   in — bevestig of dit een bestaande dienst is voordat we het toevoegen.
3. **Producten en prijzen.** "New products" en "Best Sellers" waren leeg. De productkaarten
   in sectie 7 zijn daarom structureel af maar gevuld met duidelijk gemarkeerde placeholders.
4. **Reviewteksten in het Nederlands.** Ik heb alleen de Engelse versies gezien. Die staan
   nu letterlijk in de pagina met een comment; haal de originelen uit Reviews.io.
   Ook het **aantal** reviews achter de 4,6/5 is onbekend en dus niet vermeld.
5. **Beeldmateriaal.** Alle foto's zijn placeholders met een beschrijving van de exact
   benodigde foto (zie `assets/img/placeholders/`).
6. **Het merklettertype.** Zie `docs/02-design-system.md` §2.2.
7. **Het logo als vectorbestand.** Ik heb het logo als afbeelding gekregen en
   `assets/img/logo-marketbase.svg` als reconstructie nagebouwd — kleuren exact, lettervorm
   benaderd met een systeemfont. Lever het officiële SVG/EPS aan om dat bestand te vervangen.
