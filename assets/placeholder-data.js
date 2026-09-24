/* ==========================================================================
   Luotokoti — PLACEHOLDER-SISÄLTÖ
   Ladataan datatiedostojen jälkeen, ennen proto.js:ää.

   ⚠  KAIKKI TÄMÄN TIEDOSTON LUVUT JA NIMET OVAT KUVITTEELLISIA.
      Ne eivät ole Luotokodin tietoja. Ne ovat täällä yhdestä syystä: layoutin
      ja typografian arviointi onnistuu huonosti hakasulkeilla, koska
      "[XXX XXX €]" ei vie saman verran tilaa kuin "289 000 €" eikä rivitys
      käyttäydy samoin.

   TÄRKEÄ: sisältötila on kytkin, ei pysyvä muutos.
       Sisältö: Aukot        → hakasulkeet, rehellinen tila (oletus asiakkaalle)
       Sisältö: Placeholder  → kuvitteelliset arvot, layoutin arviointiin
   Vaihdin on prototyypin ohjauspalkissa. Placeholder-tilassa palkki näyttää
   varoituksen, jottei kuvitteellisia lukuja luettaisi faktoina.

   Kun oikeat tiedot saadaan, tämä tiedosto poistetaan ja arvot menevät
   talo-data.js:ään ja kohteet-data.js:ään.
   ========================================================================== */

var PLACEHOLDER = {

  /* -- Yksinkertaiset aukot: hakasulkeen sisältö → arvo ------------------
     Avain on aukon teksti ilman hakasulkeita, pienellä. */
  arvot: {
    'mallin nimi':      'Luoto',
    /* 'm²' on tonttikoon ja rakennusoikeuden aukko, ei enää talon
       pinta-alan: pinta-ala ja huoneistotyyppi tulevat TALO.koot:sta. */
    'm²':               '860 m²',
    'k-m²':             '95 k-m²',
    'kerrokset':        '1 kerros',
    '?':                'Energialuokka A',
    'kokonaiskesto':    '7–9 kuukautta',
    'x arkipäivän':     'kahden arkipäivän',
    'x taloa':          '24 taloa',
    'x vuotta':         '10 vuotta',
    /* Yksikkö ei ole enää arvossa: [lkm] on sekä talojen että tonttien
       lukumäärä, ja yksikkö tulee ympäröivästä tekstistä. */
    'lkm':              '6',
    'kunta':            'Vaasa',
    'alue':             'Sundom',
    'etäisyys':         '900 m',
    'kuvaus alueesta, 2–3 lausetta':
      'Rauhallinen pientaloalue meren läheisyydessä. Palvelut ovat ' +
      'kävelymatkan päässä ja keskustaan on vartti autolla.',
    'puhelinnumero':    '+358 40 123 4567',
    'sähköposti':       'myynti@luotokoti.fi',
    'osoite':           'Luodontie 12, 68570 Luoto',
    'y-tunnus':         '3312345-7',
    '€ / m² tai kiinteä':                'noin 38 €/m²',
    'liittymät — sisältyykö?':           'Vesi, viemäri, sähkö ja kuitu sisältyvät',
    'muut asiakirjat — täydennettävä':   'Kiinteistörekisteriote ja kaavakartta',
    'purkutyöt — sisältyykö, ja millä ehdoilla?':
      'Purku onnistuu erillisellä sopimuksella',
    'kuka hakee rakennusluvan?':         'Luotokoti hakee luvan puolestasi',
    'kuka vastaa maatöistä ja liittymistä?':
      'Luotokoti vastaa maatöistä ja liittymistä',
    'kunnan prosessi ja linkki':         'Vaasan kaupungin tonttihaku',
    'prosessi vahvistettava':            'Varaus tehdään kunnan sähköisessä palvelussa.',
    'omistuksen siirtymisen kuvaus puuttuu':
      'Tontti siirtyy nimellesi kauppakirjan allekirjoituksessa, ennen rakentamisen aloitusta.',
    'vahvistettava':    'Kyllä',
    'termivalinta':     'talo ja tontti pakettina',
    'täydennettävä':    'Sisustus- ja pintamateriaalivalinnat',
    'tietosuojaseloste puuttuu': 'Lue tietosuojaseloste',
    'nimi ja rooli':    'Mikael Sundqvist, rakennuspäällikkö',

    /* talo.js:n renderöimät tekniset tiedot */
    'lämmitysmuoto':    'Maalämpö',
    'energialuokka':    'A',
    'ilmanvaihto':      'Koneellinen tulo- ja poisto, lämmöntalteenotto',
    'rakennetyyppi':    'Puurunkoinen elementtirakenne',
    'takuuaika':        '10 vuotta',
    'materiaalit':      'Lautaparketti, laatoitetut märkätilat'
  },

  /* Useampi eri arvo samalle aukolle, jotta kolme henkilökorttia eivät ole
     identtisiä. Kulutetaan järjestyksessä. */
  sarjat: {
    'nimi ja rooli': [
      'Mikael Sundqvist, rakennuspäällikkö',
      'Anna Björk, myynti',
      'Jukka Rantala, työnjohtaja'
    ],
    /* talo.js §04: "ei sisälly" -sarake. Nämä ovat kuvitteellisia
       rajauksia, mutta juuri tämä sarake on layoutin kannalta tärkein
       nähdä.

       Avain oli aiemmin '…', jota käytti tosiasiassa §05:n valintakortit
       — poissulkulista vuoti siis valintoihin ja sivulla luki, että
       kodinkoneet ovat asia jonka voi valita. Avain on nyt sama kuin
       aukon nimi talo.js:ssä. */
    'ei sisälly — täydennettävä': [
      'Piha-alueen viimeistely ja istutukset',
      'Kodinkoneet',
      'Autokatos tai erillinen varasto'
    ],

    /* talo.js §05: kolme sisustustyyliä (R6). Nimet ja kuvaukset ovat
       kuvitteellisia — arkkitehdin speksit puuttuvat. Ne ovat täällä
       siksi, että kolmen kortin rivitys ja korkeusero on nähtävä
       oikeanmittaisilla teksteillä. */
    'sisustustyylin nimi': ['Vaalea', 'Sävy', 'Tumma'],
    'sisustustyylin kuvaus': [
      'Vaaleat puupinnat, valkoiset kalusteovet ja vaalea laatta märkätiloissa.',
      'Lämmin puu keittiössä, syvä sävy kalusteovissa, tummempi laatta.',
      'Tummat kalusteovet, tammilattia ja graafinen laatoitus märkätiloissa.'
    ],
    /* talo.js §05: tyylien hintapaikat. Ensimmäinen sisältyy, kaksi muuta
       ovat lisiä — porrastus tekee hintapaikan rakenteen näkyväksi. */
    '€ tai sisältyy': ['Sisältyy', '+ 2 400 €', '+ 5 900 €'],

    /* Asiakaslainaukset. Kolme eri PITUUTTA tarkoituksella: kahden rivin,
       kolmen rivin ja neljän rivin lainaus. Sitä varten nämä ovat täällä —
       kolme samanmittaista lainausta ei kerro miten lohko käyttäytyy kun
       yksi asiakas on niukkasanainen ja toinen ei.

       ⚠ Nimet, paikkakunnat ja lauseet ovat kuvitteellisia. Yhtään
       asiakaslainausta ei ole aineistossa — ks. AVOIMET.md kohta 133. */
    'lainaus': [
      'Saimme hinnan ensimmäisessä tarjouksessa, ja se piti loppuun asti.',
      'Emme joutuneet kilpailuttamaan yhtään urakoitsijaa itse. Se oli ' +
        'meille tärkeintä, koska kumpikaan meistä ei ole rakennusalalta.',
      'Muutimme sisään aikataulussa ja maksoimme vasta silloin. ' +
        'Pohjaratkaisu tuntui ensin pieneltä paperilla, mutta talossa ' +
        'ei ole yhtään huonetta jota emme käyttäisi päivittäin.'
    ],
    'nimi': [
      'Sanna ja Petri Koskinen',
      'Marika Ojala',
      'Tuomas ja Elina Vuorinen'
    ],
    'paikkakunta': ['Sundom', 'Koivuhaka', 'Seinäjoki']
  },

  /* -- Lohkotason sisällöt ----------------------------------------------
     Nämä korvaavat kokonaisen gap--block -lohkon, koska asiakassitaatti ja
     henkilöesittely vaikuttavat layoutiin eri tavalla kuin yksi hakasulje. */
  lohkot: {
    'asiakassitaatti':
      '<blockquote class="sitaatti">' +
      '<p>&rdquo;Saimme hinnan ensimmäisessä tarjouksessa, ja se piti loppuun ' +
      'asti. Emme joutuneet kilpailuttamaan yhtään urakoitsijaa itse.&rdquo;</p>' +
      '<footer>Sanna ja Petri Koskinen, Sundom</footer>' +
      '</blockquote>',
    'ihmiset':
      '<p class="measure">Meitä on kymmenen, ja jokainen talo kulkee saman ' +
      'kolmen ihmisen käsien kautta: myynti, rakennuspäällikkö ja ' +
      'työnjohtaja. Sama porukka alusta loppuun.</p>'
  },

  /* -- Hinnat ------------------------------------------------------------
     Paketti = tontti + maatyöt + lupa + talo. Summat täsmäävät, jotta
     variantti B:n rakenne on uskottava katsottavaksi.
       52 000 + 34 500 + 8 500 + 194 000 = 289 000                        */
  hinnat: {
    paketti:    '289 000 €',
    omaTontti:  '237 000 €',        /* paketti − tontti */
    tontti:     '52 000 €'
  },

  /* Variantti B:n neljä osaa järjestyksessä: tontti, maatyöt, lupa, talo */
  hintaOsat: ['52 000 €', '34 500 €', '8 500 €', '194 000 €'],

  /* -- Kokovertailun hintarivi -------------------------------------------
     Kolme lukua kolmelle koolle, kaksi hintatasoa. Luvut on JOHDETTU yllä
     olevista, jotta sama sivu ei näytä kahta eri tarinaa:

       tontteineen  = hinnat.paketti   (289 000 €) + koot[].hintaero
       ilmanTonttia = hinnat.omaTontti (237 000 €) + koot[].hintaero

     Perusrivi täsmää siis sivun hintablokin yksittäiseen lukuun ja lisät
     hintaportaan lisiin (+ 18 500 € ja + 34 000 €). Jos porrastus muuttuu,
     muuta molemmat: taulukko ja hintaporras ovat samalla sivulla, ja niiden
     ristiriita on ensimmäinen asia joka huomataan.

     Kumpi sarja renderöityy, ratkeaa sivun mukaan proto.js:ssä — tontti on
     mukana vain kohdetason sivuilla (kohteet.html, kohde.html). Etusivu ja
     Oma tontti -sivu näyttävät hinnan ilman tonttia, kuten niiden oma copy
     sanoo. Ks. copy-data.js:n hintalogiikka.                              */
  kokoHinnat: {
    tontteineen:  ['289 000 €', '307 500 €', '323 000 €'],
    ilmanTonttia: ['237 000 €', '255 500 €', '271 000 €']
  },

  /* -- Talomallin tiedot (korvaa talo-data.js:n nullit) -------------------
     Nimeksi pelkkä "Luoto", ei "Luoto 118". Neliömäärä nimessä ei toimi kun
     kokoja on kolme: nimi olisi väärä kahdessa kolmesta tilasta. */
  talo: {
    nimi:      'Luoto',
    kerrokset: '1 kerros',
    kenelle:   'Suunniteltu perheelle joka haluaa toimivat neliöt ilman ' +
               'ylimääräistä — ja varaa elää hyvin myös muuton jälkeen.',
    takuu:     '10 vuotta'
  },

  /* -- Koot (korvaa TALO.koot:n nullit) -----------------------------------
     Järjestys on sama kuin talo-data.js:ssä: 2, 3, 4 makuuhuonetta.
     Perusmalli on pienin koko, joten lisä kasvaa alaspäin.

     Porrastus on tietoisesti epätasainen: kaksi lisämakuuhuonetta eivät ole
     samanhintaisia. Se on rakentamisessa realistista ja tekee layoutista
     rehellisemmän katsottavaksi kuin tasavälinen sarja. Jos oikea hinta on
     kiinteä per makuuhuone, se on hyvä uutinen — ks. AVOIMET.md kohta 108. */
  koot: [
    /* Perusrivin hintaero on datassa 0 eikä null, joten paikkaus ei koske
       sitä — perushinta renderöityy omana aukkonaan ja saa arvonsa
       'xxx xxx €' -avaimesta. Huoneistotyyppi laskee olohuoneen mukaan:
       2 makuuhuonetta = 3 h + k. */
    { neliot: '86 m²',  huoneistotyyppi: '3 h + k' },
    { neliot: '104 m²', huoneistotyyppi: '4 h + k', hintaero: '+ 18 500 €' },
    { neliot: '118 m²', huoneistotyyppi: '5 h + k', hintaero: '+ 34 000 €' }
  ],

  /* -- Laajennus muuton jälkeen ------------------------------------------
     Vain hinta ja kesto ovat täällä. lupaMukana ja takuuvaikutus jätetään
     tietoisesti täyttämättä myös placeholder-tilassa: kuvitteellinen
     "Kyllä" lupakysymykseen olisi prototyypin vaarallisin yksittäinen
     keksitty arvo, koska se kääntäisi estävän kysymyksen lupaukseksi.
     Ks. talo.html sektio 06b ja AVOIMET.md kohta 106.

     kesto ei renderöidy sivulle lainkaan: aikataulua ei saa luvata ennen
     kuin lupakysymys on selvä. Arvo on täällä siksi, että datarakenne
     vastaa briefiä ja kenttä on valmiina kun aikataulu vahvistetaan. */
  laajennus: {
    hinta: '+ 21 000 €',
    kesto: 'noin 6 viikkoa'
  },

  /* -- Kohteet (korvaa kohteet-data.js:n nullit) --------------------------
     suurinKoko: kohteen kaava voi rajata suurimman mahdollisen koon. Kaksi
     kohdetta sallii kaikki kolme, yksi rajaa kolmeen makuuhuoneeseen — jotta
     rajoituksen merkintä on nähtävissä listauksessa eikä vain rakenteessa.

     valmistuminen on muotoa 'YYYY-MM'. Ensimmäinen on menneisyydessä, jotta
     merkintä "Muuttovalmis nyt" on nähtävissä; toinen tulevaisuudessa, jotta
     "Valmis 4/2027" on nähtävissä. Kolmas on toteutunut.

     hintaMin ja hintaMax ovat muotoiltuja merkkijonoja, koska ne
     renderöityvät sellaisenaan. Suodattimen numerovertailu siivoaa
     välilyönnit ja euromerkin.                                            */
  kohteet: [
    { nimi: 'Sundomin rantakaava', kunta: 'Vaasa', alue: 'Sundom',
      valmistuminen: '2026-05', taloja: '6', vapaana: '4',
      hintaMin: '279 000 €', hintaMax: '329 000 €',
      suurinKoko: 'mh4', laajennus: true, lat: 63.0951, lon: 21.6165,
      huomio: 'Kuusi taloa meren puoleisella rinteellä, kaikki samalla kaavalla.' },
    { nimi: 'Kirkkorinne', kunta: 'Kokkola', alue: 'Koivuhaka',
      valmistuminen: '2027-04', taloja: '4', vapaana: '4',
      hintaMin: '269 000 €', hintaMax: '309 000 €',
      suurinKoko: 'mh3', laajennus: false, lat: 63.8384, lon: 23.1307,
      huomio: 'Neljä taloa kävelymatkan päässä koulusta ja päiväkodista.' },
    { nimi: 'Peltolan laita', kunta: 'Seinäjoki', alue: 'Peltola',
      valmistuminen: '2025-09', taloja: '5', vapaana: '0',
      hintaMin: '262 000 €', hintaMax: '298 000 €',
      suurinKoko: 'mh4', laajennus: true, lat: 62.7903, lon: 22.8403,
      huomio: 'Ensimmäinen valmistunut kohde. Kaikki viisi taloa myyty.' }
  ],

  /* Talokohtaiset rivit. Sama kolmen rivin sarja kaikille kohteille: rivien
     tehtävä on näyttää taulukon rytmi ja tilamerkinnät, ei väittää mitään
     kohteiden eroista. */
  talot: [
    { tunnus: 'talo-a', koko: 'mh2', neliot: '86 m²',  hinta: '279 000 €', tila: 'vapaa'   },
    { tunnus: 'talo-b', koko: 'mh3', neliot: '104 m²', hinta: '298 000 €', tila: 'varattu' },
    { tunnus: 'talo-c', koko: 'mh4', neliot: '118 m²', hinta: '329 000 €', tila: 'myyty'   }
  ],

  /* -- Valokuvat --------------------------------------------------------
     Kolme rajattua valokuvaa YHDESTÄ valmistuneesta talosta, kolmesta
     kuvakulmasta. Rajaukset ja niiden perustelut ovat
     `tyokalut/kuvat.py`:ssä; lähdekuvat eivät ole repossa.

     NÄMÄ EIVÄT OLE KUVAMAAILMAN PÄÄTÖS. Brändikirjan "Fotostil" on tyhjä
     (AVOIMET.md kohta 15), joten kuvat ovat täällä samasta syystä kuin
     kuvitteelliset hinnat: layoutia ei voi arvioida tyhjästä laatikosta.
     Suora auringonpaiste ja kesken oleva piha eivät ole se tyyli jota
     KUVATARPEET.md ehdottaa.

     KUVA EI TULE JOKA KUVAPAIKKAAN. Vain ne paikat joiden otsikko on
     talon julkisivu saavat kuvan (markupissa `data-ph-kuva`). Asukkaat,
     sisätilat, kasvokuvat, kartat ja työmaa jäävät aukoiksi myös
     placeholder-tilassa — kuva joka vastaa väärään kysymykseen on
     pahempi kuin tyhjä laatikko, koska tyhjä laatikko sanoo mitä
     puuttuu. Ks. KUVATARPEET.md.

     Aukkotila (oletus) ei näytä näitä lainkaan. */
  kuvat: {
    julkisivu: {
      tiedosto: 'assets/kuvat/talo-julkisivu.webp',
      alt: 'Punaiseksi maalattu yksikerroksinen puutalo, jyrkkä harjakatto ' +
           'mustaa konesaumapeltiä. Pääty vasemmalla, pitkä julkisivu ' +
           'ikkunoineen keskellä ja sisäänkäynnin katos oikealla.'
    },
    sisaankaynti: {
      tiedosto: 'assets/kuvat/talo-sisaankaynti.webp',
      alt: 'Saman talon sisäänkäyntipuoli: puuterassi ja katos vasemmalla, ' +
           'vaalea ulko-ovi ja korkea punainen pääty oikealla. Piha on ' +
           'vielä sorapinnalla.'
    },
    paaty: {
      tiedosto: 'assets/kuvat/talo-paaty.webp',
      alt: 'Saman talon takajulkisivu: parvekeovi ja kolme ikkunaa ' +
           'pitkällä seinällä, pääty vastavalossa oikealla, metsä ' +
           'ympärillä.'
    }
  }
};

/* -------------------------------------------------------------------------
   Datatiedostojen paikkaus. Tehdään heti, koska talo.js ja proto.js lukevat
   näitä objekteja vasta DOMContentLoadedissa. Jos sisältötila on "aukot",
   tässä ei tehdä mitään ja sivusto näyttää rehelliset hakasulkeet.
   ------------------------------------------------------------------------- */
(function () {
  'use strict';
  if (!document.body || document.body.getAttribute('data-sisalto') !== 'placeholder') return;

  /* Yleiskäyttöinen paikkaus: vain null ja undefined korvataan, joten
     vahvistettu tieto (esim. TALO.tekniset.rakenteet) ei koskaan katoa. */
  function paikkaa(kohde, demo) {
    if (!kohde || !demo) return;
    Object.keys(demo).forEach(function (k) {
      if (kohde[k] === null || kohde[k] === undefined) kohde[k] = demo[k];
    });
  }

  if (typeof TALO !== 'undefined' && TALO) {
    paikkaa(TALO, PLACEHOLDER.talo);

    /* Koot paikataan indeksin mukaan, ei tunnuksen: järjestys 1 → 2 → 3
       makuuhuonetta on sama molemmissa tiedostoissa ja se on tarkistettava
       silmällä jos kokoja joskus tulee lisää. makuuhuoneita ja tunnus eivät
       ole nulleja, joten paikkaus ei koske niitä. */
    if (TALO.koot && PLACEHOLDER.koot) {
      TALO.koot.forEach(function (koko, i) {
        paikkaa(koko, PLACEHOLDER.koot[i]);
      });
    }

    /* Laajennuksesta paikataan vain hinta ja kesto. lupaMukana,
       perustusValmiina ja takuuvaikutus jäävät nulleiksi myös
       placeholder-tilassa — ne renderöityvät aukkoina, koska ne ovat
       estäviä kysymyksiä eivätkä layout-ongelmia. */
    paikkaa(TALO.laajennus, PLACEHOLDER.laajennus);
  }

  if (typeof KOHTEET !== 'undefined' && KOHTEET && KOHTEET.length) {
    KOHTEET.forEach(function (kohde, i) {
      paikkaa(kohde, PLACEHOLDER.kohteet[i % PLACEHOLDER.kohteet.length]);

      /* Talot on tyhjä taulukko eikä null, joten paikkaa() ei koske siihen.
         Talokohtainen taulukko on kohde.html:n toiseksi tärkein layout, ja
         viisi tyhjää saraketta ei kerro rivityksestä mitään. */
      if (kohde.talot && !kohde.talot.length) {
        /* Kaava rajaa: jos kohteen suurin koko on tiedossa, sitä suuremmat
           talot jätetään pois. Muuten sivu väittäisi kahta asiaa yhtä aikaa —
           kokovertailu merkitsee neljän makuuhuoneen sarakkeen sanoin "ei
           tällä tontilla", ja talotaulukko listaisi silti sen kokoisen talon.
           Rajoitus on aitoa dataa (KOHTEET[].suurinKoko), joten paikkauksen
           on noudatettava sitä. */
        var sallitut = null;
        if (kohde.suurinKoko && typeof TALO !== 'undefined' && TALO && TALO.koot) {
          sallitut = {};
          var ohi = false;
          TALO.koot.forEach(function (k) {
            if (!ohi) sallitut[k.tunnus] = true;
            if (k.tunnus === kohde.suurinKoko) ohi = true;
          });
        }

        PLACEHOLDER.talot.forEach(function (talo) {
          if (sallitut && !sallitut[talo.koko]) return;
          /* Toteutuneessa kohteessa kaikki talot ovat myytyjä — muuten
             referenssikortti väittäisi vapaita taloja myydystä kohteesta. */
          var kopio = {};
          Object.keys(talo).forEach(function (k) { kopio[k] = talo[k]; });
          if (kohde.status === 'myyty') kopio.tila = 'myyty';
          kohde.talot.push(kopio);
        });
      }
    });
  }
})();
