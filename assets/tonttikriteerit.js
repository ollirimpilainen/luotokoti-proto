/* ==========================================================================
   Luotokoti — oman tontin tarkistuslista
   Käytössä oma-tontti.html -sivulla.

   TÄRKEÄ SÄÄNTÖ: nämä kuusi kriteeriä ovat Generon ehdotuksia
   rautalankavaiheessa. Luotokoti ei ole vahvistanut niitä, eivätkä ne ole
   tekninen vaatimuslista. Ne on merkitty ehdotuksiksi sekä sivun
   varoituslaatikossa, jokaisessa tuloksessa että muistiinpanotilassa.

   TULOKSET: kolme tasoa, eikä yksikään torju kävijää. Tämä on
   hyväksymiskriteeri. Alin taso ei sano "ei onnistu" vaan kertoo mitä
   pitää selvittää ja kutsuu keskusteluun — moni kohta selviää yhdellä
   puhelulla, ja väärä torjunta menettää liidin joka olisi ollut hyvä.

   PAINOTUS: kriteerit ovat tällä hetkellä samanarvoisia. Se on melko
   varmasti väärin (maaperä on selvitysasia, tieyhteys on ratkaistavissa) ja
   kirjattu avoimeksi kysymykseksi. Ks. AVOIMET.md.

   v3: rakennusoikeus ei ole enää este vaan mitoitus. Kun kokoja on kolme,
   rakennusoikeus ratkaisee minkä kokoisena talo rakennetaan — ei sitä
   rakennetaanko lainkaan. Käänteinen ja positiivinen viesti, ja myös
   rehellisempi: harvalla tontilla rakennusoikeus on nolla.
   ========================================================================== */

var TONTTIKRITEERIT = [
  {
    /* v3: tämä kriteeri muutti luonnetta. Kun talo oli yksi kokoonpano,
       rakennusoikeus oli este: joko riittää tai ei. Kolmella koolla se on
       mitoitus — pieni tontti ei sulje pois, se määrää minkä kokoisena talo
       rakennetaan. Käänteinen ja positiivinen viesti, ja se on myös
       rehellisempi: harvalla tontilla rakennusoikeus on nolla. */
    tunnus: 'rakennusoikeus',
    otsikko: 'Rakennusoikeus riittää vähintään pienimpään kokoon',
    apu: 'Rakennusoikeus määrittää minkä kokoisena talo rakennetaan. ' +
         'Pienin koko tarvitsee vähintään',
    /* Aukko upotetaan apuriviin renderöitäessä. Pienimmän koon
       kerrosalatarve puuttuu aineistosta — kuten kaikki kolmen koon mitat.
       Ks. AVOIMET.md kohta 111. */
    aukko: 'k-m²'
  },
  {
    tunnus: 'vesi-viemari',
    otsikko: 'Vesi ja viemäri ovat liitettävissä',
    apu: 'Tontti on liitettävissä kunnalliseen vesi- ja viemäriverkkoon, ' +
         'tai vaihtoehto on jo selvitetty.',
    aukko: null
  },
  {
    tunnus: 'tieyhteys',
    otsikko: 'Tieyhteys kestää raskaan kaluston',
    apu: 'Elementtirekka ja nosturi pääsevät tontille asti.',
    aukko: null
  },
  {
    tunnus: 'maapera',
    otsikko: 'Maaperä on rakennettavissa',
    apu: 'Tiedossa ei ole tarvetta paalutukselle tai muille ' +
         'erityisperustuksille.',
    aukko: null
  },
  {
    tunnus: 'tasaisuus',
    otsikko: 'Tontti on riittävän tasainen',
    apu: 'Tontilla ei ole jyrkkää rinnettä tai suurta korkeuseroa.',
    aukko: null
  },
  {
    tunnus: 'sijainti',
    otsikko: 'Tontti on toimialueellamme',
    apu: 'Rakennamme Vaasan, Kokkolan, Seinäjoen ja Porin seudulla.',
    aukko: null
  }
];

/* Kolme tulostasoa. Yksikään ei torju kävijää.
     high  kaikki kuusi rastittu
     mid   vähintään neljä
     low   alle neljä                                                     */
var TONTTITULOKSET = {
  high: {
    taso: 'high',
    otsikko: 'Tonttisi täyttää kaikki kuusi ehdotettua kohtaa',
    teksti: 'Tämä on paras lähtötilanne. Seuraava askel on että katsomme ' +
            'tontin tiedot läpi ja tutkimme maaperän — sen jälkeen saat ' +
            'kiinteän hinnan koko projektille.',
    cta: 'Pyydä hinta tontillesi'
  },
  mid: {
    taso: 'mid',
    otsikko: 'Suurin osa kohdista on kunnossa',
    teksti: 'Rakentaminen on hyvin todennäköisesti mahdollista. Muutama ' +
            'kohta pitää selvittää tarkemmin ennen kuin voimme antaa ' +
            'kiinteän hinnan, ja se selvitys on meidän työtämme, ei sinun.',
    cta: 'Pyydä hinta tontillesi'
  },
  low: {
    taso: 'low',
    otsikko: 'Muutama kohta on vielä auki',
    teksti: 'Tämä ei tarkoita ettei tontille voisi rakentaa. Useimmat ' +
            'näistä kohdista selviävät yhdellä puhelulla tai yhdellä ' +
            'asiakirjalla, eikä sinun tarvitse tietää vastauksia ' +
            'etukäteen — me selvitämme ne.',
    cta: 'Pyydä arvio tontistasi'
  }
};

/* Kynnysarvot yhdessä paikassa, jotta painotuspäätös on helppo toteuttaa
   kun kriteerit on vahvistettu. */
var TONTTIKYNNYS = { high: 6, mid: 4 };
