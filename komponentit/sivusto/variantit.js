/* ==========================================================================
   Luotokoti — lohkojen designvariantit

   Ladataan lohkot.js:n jälkeen ja ennen lk.js:ää. lohkot.js kertoo mitä
   sivustolla ON; tämä kertoo miltä sama lohko näyttää muualla: designsuunnissa
   (design/) ja blokkilaboratoriossa (komponentit/, kirjasto.js). lk.js tekee
   jokaisesta variantista lohkolle storyn, joten Docs näyttää sivuston version
   ja suuntien versiot allekkain.

   Periaate on sama kuin lohkot.js:ssä: variantteja EI kopioida. Rivi kertoo
   millä sivulla variantti on ja millä valitsimella, ja canvas eristää sen.
   Suuntien osiot on merkitty lähteeseen data-lohko-attribuutilla, joka on
   sama kuin tämän kirjaston lohkon tunnus (design/src/*.html ja koostetut
   design/*.html), jotta valitsin ei riipu osion järjestysnumerosta.

   VAIN ELOSSA OLEVAT (Olli 30.9.2026). Hylätty variantti ei ole täällä,
   vaikka se on yhä vaihtimessa: sen perustelu on suunnan CSS-kommentissa
   (esim. B · iso kuva, osiot 32–34). Siksi täältä puuttuvat
     - suunnat C · Ritning ja D · Egen tomt: pois Miro-boardilta 28.8.2026
       (design/README.md). Palaavat yhdellä rivillä SUUNNAT-listaan.
     - B · iso kuva: porras jokaisessa kenttärajassa, suora lohkon kulma
       (?block=skarp) ja hiusviiva sen kanssa (?block=linje), aalto (kurva),
       ja siirtymät lutning, mark ja rak, jotka hopp korvasi (Olli 30.9.2026).

   KENTÄT
     SUUNNAT     tunnus → { nimi, sivu, kuvaus, lohkot, muunnelmat? }
                 lohkot: lohkojen tunnukset joille suunnassa on osio
                 (valitsin [data-lohko="…"]); header ja footer omilla
                 valitsimillaan
                 muunnelmat: suunnan vaihtimen vaihtoehdot storyina
                 { lohko, nimi, haku, tila } — haku on osoitteen kysely
     tila        'hyvaksytty' = Olli valitsi tämän (oletus suunnassa)
                 'auki'       = näytetty, ei vielä palautetta
   ========================================================================== */

var SUUNNAT = [
  {
    tunnus: 'a', nimi: 'A · Papper', sivu: 'design/riktning-a-papper.html', tila: 'auki',
    kuvaus: 'Vaalea paperi ja kehystetyt vedokset: kuvat kuin seinälle ripustettuja.',
    lohkot: ['header', 'hero', 'lupaukset', 'galleria', 'hinta', 'rahoitus', 'talotiivistelma', 'prosessi',
             'luottamus', 'lainaukset', 'ukk', 'toimialue', 'nimen-tarina', 'loppu-cta', 'footer'],
    // Miro-varianttiboard 1.10.2026: galleria etusivulle, rahoitus (media ja
    // teksti) etusivulle. Toteutettu: styles.css §70 ja §71.
    oletustila: { galleria: 'hyvaksytty', rahoitus: 'hyvaksytty' }
  },
  {
    tunnus: 'b', nimi: 'B · Fält', sivu: 'design/riktning-b-falt.html', tila: 'auki',
    kuvaus: 'Kuva upotettuna värikenttään; kentät vaihtuvat sivun edetessä.',
    lohkot: ['header', 'hero', 'lupaukset', 'galleria', 'hinta', 'talotiivistelma', 'rahoitus', 'prosessi',
             'luottamus', 'lainaukset', 'ukk', 'toimialue', 'nimen-tarina', 'loppu-cta', 'footer'],
    // Miro-varianttiboard 1.10.2026. Toteutettu sivustolle: talotiivistelmä
    // 2 × 2 (§69), galleria kohdesivulle (§70), rahoituksen muoto kohteen
    // alueosioon (§71), toimialue ilman karttaa (§73), nimen tarina (§74),
    // loppu-CTA etusivulle (§75). Lainauksiin vain B:n tyylit (§72), joten
    // B:n lainausvariantti ei ole voittaja: asettelu on sivuston.
    oletustila: { talotiivistelma: 'hyvaksytty', galleria: 'hyvaksytty', rahoitus: 'hyvaksytty',
                  toimialue: 'hyvaksytty', 'nimen-tarina': 'hyvaksytty', 'loppu-cta': 'hyvaksytty' }
  },
  {
    // Muu sivu on B:n kopio (design/README.md), joten vain hero on oma
    // varianttinsa. Vaihtimen muunnelmat koskevat lohkoja joissa muoto näkyy.
    tunnus: 'b-iso', nimi: 'B · iso kuva', sivu: 'design/riktning-b-falt-stor-bild.html', tila: 'auki',
    kuvaus: 'B:n herovariantti: kuva vie lähes koko ensinäkymän, beige kenttä ja pyöristetty lohko ' +
            '(Ollin valinta 29.9.2026). Siirtymä hopp = porras vain palstanvaihdossa.',
    lohkot: ['hero', 'hinta', 'loppu-cta'],
    muunnelmat: [
      { lohko: 'hero',      nimi: 'B · iso kuva · Över',   haku: 'block=over', tila: 'auki',
        kuvaus: 'Otsikko ylittää kuvan alareunan (CSS-osio 36).' },
      // Kenttävärit: auki (Olli 30.9.2026). Beige on oletus ja hyväksytty.
      { lohko: 'hero', nimi: 'B · iso kuva · kenttä oliv',     haku: 'kentta=oliv',     tila: 'auki' },
      { lohko: 'hero', nimi: 'B · iso kuva · kenttä djup',     haku: 'kentta=djup',     tila: 'auki' },
      { lohko: 'hero', nimi: 'B · iso kuva · kenttä charcoal', haku: 'kentta=charcoal', tila: 'auki' },
      { lohko: 'hero', nimi: 'B · iso kuva · kenttä seafoam',  haku: 'kentta=seafoam',  tila: 'auki' },
      { lohko: 'hero', nimi: 'B · iso kuva · kenttä amber',    haku: 'kentta=amber',    tila: 'auki' },
      { lohko: 'hero', nimi: 'B · iso kuva · kenttä papper',   haku: 'kentta=papper',   tila: 'auki' },
      { lohko: 'hero',      nimi: 'B · iso kuva · Flik',   haku: 'lapp=flik',  tila: 'auki',
        kuvaus: 'Heron muoto toistuu kuvan lapussa (CSS-osio 36).' },
      { lohko: 'hero',      nimi: 'B · iso kuva · Hörn',   haku: 'knapp=horn', tila: 'auki',
        kuvaus: 'Painikkeessa heron kulma pillerin sijaan (CSS-osio 36).' },
      { lohko: 'loppu-cta', nimi: 'B · iso kuva · Flik',   haku: 'lapp=flik',  tila: 'auki',
        kuvaus: 'CTA:n lappu isompana: laatan oma pinta menee kuvaan.' },
      { lohko: 'loppu-cta', nimi: 'B · iso kuva · Hörn',   haku: 'knapp=horn', tila: 'auki' }
    ],
    oletustila: { hero: 'hyvaksytty' }
  },
  {
    tunnus: 'd', nimi: 'D · Bord', sivu: 'design/riktning-d-bord.html', tila: 'auki',
    kuvaus: 'Rikkoo A:n, B:n ja C:n rangan: tumma pöytä, paperiarkit päällä, hinta ensin.',
    lohkot: ['header', 'hero', 'lupaukset', 'hinta', 'rahoitus', 'talotiivistelma', 'prosessi',
             'luottamus', 'lainaukset', 'ukk', 'toimialue', 'nimen-tarina', 'loppu-cta', 'footer']
  }
];

/* SIVUSTON VERSIO VOITTI (Miro-board 1.10.2026), muutoksin: hero 2 × 2
   (§65), lupaukset brändivärein (§67), footer ilman metakommentteja (§68),
   luottamus palstan korkuisella kuvalla (§72), lainaukset B:n tyyleillä
   (§72), usein kysytyt sellaisenaan ("paras"). Ylätunniste, hinta ja
   prosessi: ei lappua, ei päätöstä. */

// Suunnan header ja footer eivät ole osioita, joten niillä on omat valitsimet.
var SUUNTAVALITSIN = { header: 'header.head', footer: 'footer.foot' };
