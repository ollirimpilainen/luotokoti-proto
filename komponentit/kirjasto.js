/* ==========================================================================
   Luotokoti — blokkikirjaston luettelo

   Yksi rivi per blokki. Hakemistosivu (komponentit/index.html) renderöi
   tämän, joten blokki on kirjastossa silloin kun sillä on rivi täällä —
   ei silloin kun sille on kansio. Kansio ilman riviä on keskeneräinen työ,
   rivi ilman kansiota on virhe (hakemisto merkitsee sen).

   TILA kertoo missä blokki on elinkaarellaan, ja se on ainoa kenttä joka
   muuttuu päätöksistä:
     luonnos   iteroidaan kirjastossa, ei yhdelläkään sivulla
     valittu   asiakas on valinnut muodon, odottaa liittämistä
     liitetty  käytössä sivustolla (`sivut`), kirjaston kansio on nyt
               lähde ja sivun kopio sen johdannainen — tai kansio poistuu,
               jos blokki siirtyi styles.css:ään ja proto.js:ään

   LOHKO ja VALITSIN kytkevät blokin lohkokirjastoon (komponentit/sivusto/):
   blokki näkyy siellä sen sivuston lohkon varianttina, jonka ehdokas se on,
   ja valitsin osuu laboratoriosivulla (`lab`) itse blokkiin, ei kytkimiin.
   ========================================================================== */

var KIRJASTO = [
  {
    tunnus:   'varinvaihto',
    nimi:     'Julkisivun värinvaihto',
    tila:     'luonnos',
    kuvaus:   'Talon väri vaihtuu samassa kuvassa: materiaalinäytteet, iso ' +
              'nimi ja neljä siirtymätapaa (häivytys, pyyhkäisy, paljastus, ' +
              'vertailu). Demo mustalla ja punaisella.',
    sivut:    [],
    tarkoitus: 'talo.html · hero',
    lohko:    'hero',
    valitsin: 'section[aria-labelledby="hero-h"]',
    avoinna:  'Onko väri ostajan valinta (AVOIMET.md 200) · värien nimet · ' +
              'lisää värejä samasta kuvakulmasta',
    kuva:     'varinvaihto/kuvat/piha-punainen-800.webp',
    lab:      'varinvaihto/index.html',
    readme:   'varinvaihto/README.md',
    artifact: 'https://claude.ai/artifact/S9t58hon18GBUhD2gBfao6',
    paivitetty: '29.9.2026'
  }
];
