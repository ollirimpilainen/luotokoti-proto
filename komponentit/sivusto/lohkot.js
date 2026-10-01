/* ==========================================================================
   Luotokoti — sivuston lohkot: luettelo siitä MITÄ ON JO OLEMASSA

   Rinnakkainen luettelo komponentit/kirjasto.js:lle (haara varinvaihto,
   29.9.2026). Ero on suunta:

     kirjasto.js   uusi blokki iteroidaan ENNEN sivua (luonnos → liitetty)
     lohkot.js     sivuilla jo olevat lohkot, luettuina sivuilta itseltään

   Lohkoa EI kopioida tänne. Rivi kertoo millä sivulla lohko on ja millä
   valitsimella se löytyy, ja katselin (index.html) lataa oikean sivun ja
   eristää lohkon siitä. Näin lohko ei voi eriytyä sivustosta: kirjaston
   lohko ON sivun lohko. Sama periaate kuin copyssa (AGENTS.md, sääntö 2).

   KENTÄT
     tunnus      pysyvä, osoitteessa (#lohko=tunnus)
     nimi        ihmisen nimi lohkolle
     ryhma       sivupalkin ryhmä
     kuvaus      mitä lohko tekee ja miksi se on olemassa — yksi kappale
     jaettu      true = sama lohko usealla sivulla samasta datasta
                 (prototyypin kommenteissa "jaettu komponentti")
     esiintymat  [{ sivu, valitsin, nimi?, asetukset? }]
                 valitsin osuu sivun markupiin; asetukset kirjoitetaan
                 sessionStorageen (luotokoti:<avain>) ennen latausta
     muunnelmat  [{ nimi, asetukset }] — kytkimet jotka koskevat vain tätä
                 lohkoa (omistusmalli, koko, kohde). Kieli, sisältötila ja
                 leveys ovat katselimen yleiskytkimiä, eivät tässä.
     kattaa      'kaikki' = sama lohko jokaisella sivulla (header, footer):
                 yksi esiintymä riittää, kattavuus hyväksyy sen kaikkialla
     css         styles.css-osiot joissa lohkon ulkoasu on (vapaaehtoinen)
     js          funktio joka renderöi lohkon (vapaaehtoinen)

   KATTAVUUS. Katselin lukee kaikki seitsemän sivua ja vertaa niiden
   sektioita näihin valitsimiin. Sektio jota mikään rivi ei kata näkyy
   sivupalkissa kohdassa *Keräämättä*, ja valitsin joka ei osu mihinkään
   näkyy virheenä. Kumpikaan ei saa jäädä hiljaiseksi: luettelo jossa on
   aukko näyttää täydeltä.
   ========================================================================== */

function sek(id) { return 'section[aria-labelledby="' + id + '"]'; }

var LOHKOT = [

  /* -- Runko ------------------------------------------------------------ */
  {
    tunnus: 'header', nimi: 'Ylätunniste ja navigaatio', ryhma: 'Runko', jaettu: true, kattaa: 'kaikki',
    kuvaus: 'Sanamerkki, päänavigaatio, kielenvaihdin (kaksi linkkiä, ei ' +
            'painike) ja yhteydenoton painike. Kapealla valikko avautuu painikkeesta.',
    esiintymat: [{ sivu: 'index.html', valitsin: 'header.site-header' }],
    css: ['§51 Kielenvaihdin']
  },
  {
    tunnus: 'footer', nimi: 'Alatunniste', ryhma: 'Runko', jaettu: true, kattaa: 'kaikki',
    kuvaus: 'Tumma footer: kuvaus, navigaatio, yhteystiedot ja some. ' +
            'Prototyypin metakommentit poistettiin 1.10.2026 (AVOIMET.md 222).',
    esiintymat: [{ sivu: 'index.html', valitsin: 'footer.site-footer' }]
  },

  /* -- Avaus ------------------------------------------------------------ */
  {
    tunnus: 'hero', nimi: 'Hero', ryhma: 'Avaus',
    kuvaus: 'Sivun avaus: typografian ainoa iso hyppy. Etusivulla kaksi polkua ' +
            '(valmis kohde / oma tontti), muilla sivuilla otsikko, ingressi ja kuva.',
    esiintymat: [
      { sivu: 'index.html',        valitsin: sek('hero-h'), nimi: 'Etusivu · kaksi polkua' },
      { sivu: 'talo.html',         valitsin: sek('hero-h'), nimi: 'Talo · havainnekuva' },
      { sivu: 'kohteet.html',      valitsin: sek('hero-h'), nimi: 'Kohteet · malli A', asetukset: { omistusmalli: 'a' } },
      { sivu: 'kohteet.html',      valitsin: sek('hero-h'), nimi: 'Kohteet · malli B', asetukset: { omistusmalli: 'b' } },
      { sivu: 'kohde.html',        valitsin: sek('hero-h'), nimi: 'Kohde · murupolku ja tila' },
      { sivu: 'oma-tontti.html',   valitsin: sek('hero-h'), nimi: 'Oma tontti' },
      { sivu: 'meista.html',       valitsin: sek('hero-h'), nimi: 'Meistä' },
      { sivu: 'yhteystiedot.html', valitsin: sek('hero-h'), nimi: 'Yhteystiedot' }
    ]
  },
  {
    tunnus: 'polkuvalinta', nimi: 'Polkuvalinta', ryhma: 'Avaus', jaettu: true,
    kuvaus: 'Kävijä valitsee kumpaa hän tekee: valmis kohde vai oma tontti. ' +
            'Segmentoi lomakkeen, joten valinta ei ole koriste.',
    esiintymat: [{ sivu: 'yhteystiedot.html', valitsin: sek('polku-h') }]
  },
  {
    // Tunnus pysyy 'lupaukset', koska designsuuntien variantit (variantit.js)
    // ovat lupausten. Lohko on nyt numeroidut kohdat (1.10.2026, §76).
    tunnus: 'lupaukset', nimi: 'Numeroidut kohdat', ryhma: 'Avaus', jaettu: true,
    kuvaus: 'Viiva, iso numero, otsikko ja teksti 3–4 palstassa. Jokaisen kortin ' +
            'hiusviivan väri valitaan (data-viiva). Yhdisti 1.10.2026 lupaukset, ' +
            'arvot, prosessin askeleet ja aikajanan; sisustustyylit samalla ' +
            'lohkolla ilman numeroita.',
    esiintymat: [
      { sivu: 'index.html',        valitsin: sek('lupaukset-h'),   nimi: 'Etusivu · lupaukset' },
      { sivu: 'meista.html',       valitsin: sek('arvot-h'),       nimi: 'Meistä · arvot' },
      { sivu: 'oma-tontti.html',   valitsin: sek('prosessi-h'),    nimi: 'Oma tontti · prosessi' },
      { sivu: 'yhteystiedot.html', valitsin: sek('seuraavaksi-h'), nimi: 'Yhteystiedot · seuraavaksi' },
      { sivu: 'kohde.html',        valitsin: sek('aikajana-h'),    nimi: 'Kohde · aikajana', asetukset: { kohde: 'kohde-1' } }
    ],
    css: ['§76 Numeroidut kohdat']
  },

  /* -- Talo ------------------------------------------------------------- */
  {
    tunnus: 'kierros', nimi: 'Kierros talossa', ryhma: 'Talo',
    kuvaus: 'Vieritykseen sidottu 3D-malli: katto nousee ja huoneet esitellään ' +
            'askel kerrallaan. Sama piirtäjä kuin etusivun prosessissa ' +
            '(kierros3d.js). Kirjastossa vain alkuruutu.',
    esiintymat: [{ sivu: 'talo.html', valitsin: sek('kierros-h') }],
    css: ['§58 Kierros talossa'],
    js: 'talo.js · renderKierros'
  },
  {
    tunnus: 'pohjaratkaisu', nimi: 'Pohjaratkaisu', ryhma: 'Talo',
    kuvaus: 'Tasovalitsin, avainluvut ja pohjapiirustus arkkina: piirustus ' +
            'musteena paperilla, kolme huomiota palstana. Nimet HTML:nä kuvan ' +
            'päällä, kapealla luettelona. Kolme varustetasoa (30.9.2026), ' +
            'kaikilla sama piirustus.',
    esiintymat: [{ sivu: 'talo.html', valitsin: sek('pohja-h') }],
    muunnelmat: [
      /* Tunnukset ovat TALO.koot[].tunnus. talo.js hylkää tuntemattoman
         tunnuksen hiljaa, joten väärä tunnus näyttäisi oletuksen eikä
         virhettä: tarkista tämä kun kokoja muutetaan. */
      { nimi: 'Vakio', asetukset: { koko: 'vakio' } },
      { nimi: 'Vakio ja lisärakennus', asetukset: { koko: 'lisa' } },
      { nimi: 'Vakio, lisärakennus ja autokatos', asetukset: { koko: 'katos' } }
    ],
    css: ['§47 Pohjapiirustus', '§55 Piirustukset paperilla'],
    js: 'talo.js · renderPohja'
  },
  {
    tunnus: 'saunarakennus', nimi: 'Saunarakennus', ryhma: 'Talo',
    kuvaus: 'Kuusi vaihtoehtoa samasta 29 k-m²:n rakennuksesta yhtenä ' +
            'vertailunauhana samassa mittakaavassa. Vakiotasossa ei ole saunaa, ' +
            'ja se on merkitty amberilla. Kapealla nauha vierii vaakaan.',
    esiintymat: [{ sivu: 'talo.html', valitsin: sek('sauna-h') }],
    css: ['§54 Saunarakennuksen vaihtoehdot', '§55 Piirustukset paperilla'],
    js: 'talo.js · renderSauna'
  },
  {
    tunnus: 'talotiivistelma', nimi: 'Talotiivistelmä', ryhma: 'Talo',
    kuvaus: 'Talomalli lyhyesti ja kokovertailutaulukko: kaikki kolme kokoa ' +
            'rinnakkain, ei yhtä data-kokoa (AVOIMET.md 158). Vain kohdesivulla ' +
            '30.9.2026 alkaen: talon esittely on talo.html:llä.',
    esiintymat: [
      { sivu: 'kohde.html',      valitsin: sek('talo-h'), nimi: 'Kohde' },
      { sivu: 'index.html',      valitsin: sek('talo-h'), nimi: 'Etusivu · laaja muoto' }
    ],
    js: 'talo.js · koko-vertailu'
  },
  {
    tunnus: 'sisustustyylit', nimi: 'Sisustustyylit ja materiaalit', ryhma: 'Talo',
    kuvaus: 'Kolme valmista sisustuskokonaisuutta hintoineen ja arkkitehdin ' +
            'materiaalipaletti.',
    esiintymat: [{ sivu: 'talo.html', valitsin: sek('valinnat-h') }],
    js: 'talo.js · renderTyylit'
  },
  {
    tunnus: 'tekniset', nimi: 'Tekniset tiedot', ryhma: 'Talo',
    kuvaus: 'Lämmitys, energialuokka, rakenteet, ilmanvaihto ja takuu ' +
            'määrittelylistana.',
    esiintymat: [{ sivu: 'talo.html', valitsin: sek('tekniset-h') }]
  },
  {
    tunnus: 'laajennus', nimi: 'Laajennus muuton jälkeen', ryhma: 'Talo',
    kuvaus: 'Mitä talolle voi tehdä myöhemmin, ja mikä on sen ehto.',
    esiintymat: [{ sivu: 'talo.html', valitsin: sek('laajennus-h') }]
  },
  {
    tunnus: 'galleria', nimi: 'Kuvagalleria', ryhma: 'Talo',
    kuvaus: 'Kuvaruudukko. Talosivulla havainnekuvat, kohdesivulla ' +
            'rakentamisen todisteet — joille visualisointi on suljettu.',
    esiintymat: [
      { sivu: 'talo.html',  valitsin: sek('galleria-h'), nimi: 'Talo · havainnekuvat' },
      { sivu: 'index.html', valitsin: sek('galleria-h'), nimi: 'Etusivu · kuvasarja' },
      { sivu: 'kohde.html', valitsin: sek('galleria-h'), nimi: 'Kohde · todisteet', asetukset: { kohde: 'kohde-1' } }
    ]
  },

  /* -- Hinta ja rahoitus ------------------------------------------------ */
  {
    tunnus: 'hinta', nimi: 'Hinta', ryhma: 'Hinta', jaettu: true,
    kuvaus: 'Hintaporras: perushinta ja lisät. Hintalogiikka on kolmitasoinen — ' +
            'talosivu ei väitä sisältävänsä tonttia, "kokonaishinta" on vain ' +
            'kohde- ja oma tontti -sivuilla.',
    esiintymat: [
      { sivu: 'index.html',      valitsin: sek('hinta-h'), nimi: 'Etusivu · talon hinta' },
      { sivu: 'talo.html',       valitsin: sek('hinta-h'), nimi: 'Talo · talon hinta' },
      { sivu: 'kohteet.html',    valitsin: sek('hinta-h'), nimi: 'Kohteet · kokonaishinta' },
      { sivu: 'oma-tontti.html', valitsin: sek('hinta-h'), nimi: 'Oma tontti · kokonaishinta viikossa' }
    ]
  },
  {
    tunnus: 'sisaltyy', nimi: 'Merkkilista', ryhma: 'Hinta', jaettu: true,
    kuvaus: 'Merkkilista kahdessa palstassa (.ticks). Talossa mitä hintaan ' +
            'sisältyy, Oma tontissa mitä me selvitämme ja mitä sinulta tarvitaan.',
    esiintymat: [
      { sivu: 'talo.html',       valitsin: sek('sisaltyy-h'), nimi: 'Talo · sisältyy hintaan' },
      { sivu: 'oma-tontti.html', valitsin: sek('selvitys-h'), nimi: 'Oma tontti · selvitys' }
    ]
  },
  {
    // Tunnus pysyy 'rahoitus' variantien takia; lohko on media ja teksti.
    tunnus: 'rahoitus', nimi: 'Media ja teksti', ryhma: 'Hinta', jaettu: true,
    kuvaus: 'Teksti ja kuva rinnakkain kolmessa muodossa: kehys (A, oliivi ' +
            'kenttä), puolikas (B, kuva reunaan asti) ja palsta (kuva palstan ' +
            'korkuinen). Tekstipuolen sisältö vaihtuu: merkkilista, faktat, ' +
            'etäisyydet tai kappaleet. Yhdisti 1.10.2026 rahoituksen, mitä on ' +
            'jo ratkaistu, lähipalvelut, yhteyshenkilön ja pohjafilosofian.',
    esiintymat: [
      { sivu: 'index.html',   valitsin: sek('rahoitus-h'),       nimi: 'Kehys · rahoitus' },
      { sivu: 'kohde.html',   valitsin: sek('alue-h'),           nimi: 'Puolikas · alue ja lähipalvelut', asetukset: { kohde: 'kohde-1' } },
      { sivu: 'kohteet.html', valitsin: sek('ratk-a-h'),         nimi: 'Palsta · mitä on jo ratkaistu (A)', asetukset: { omistusmalli: 'a' } },
      { sivu: 'kohteet.html', valitsin: sek('ratk-b-h'),         nimi: 'Palsta · mitä on jo ratkaistu (B)', asetukset: { omistusmalli: 'b' } },
      { sivu: 'kohde.html',   valitsin: sek('henkilo-h'),        nimi: 'Palsta · yhteyshenkilö', asetukset: { kohde: 'kohde-1' } },
      { sivu: 'talo.html',    valitsin: sek('pohjafilosofia-h'), nimi: 'Palsta · miksi pohja ei muutu' }
    ],
    css: ['§71 Media ja teksti', '§77 Palstamuoto']
  },

  /* -- Kohteet ja tontit ------------------------------------------------ */
  {
    tunnus: 'kohdelistaus', nimi: 'Kohdelistaus', ryhma: 'Kohteet',
    kuvaus: 'Kohdekortit (B, 1.10.2026): myynnissä olevat ja toteutuneet ' +
            'samassa listassa (malli A) tai kunnan tontit (malli B). Sama kortti ' +
            'Meistä-sivun toimialueella.',
    esiintymat: [
      { sivu: 'kohteet.html', valitsin: sek('kohteet-a-h'), nimi: 'Malli A · kohteet', asetukset: { omistusmalli: 'a' } },
      { sivu: 'kohteet.html', valitsin: sek('tontit-b-h'),  nimi: 'Malli B · tontit',  asetukset: { omistusmalli: 'b' } }
    ]
  },
  {
    tunnus: 'vertailu', nimi: 'Vertailu', ryhma: 'Kohteet',
    kuvaus: 'Luotokoti vs. perinteinen reitti rinnakkain.',
    esiintymat: [{ sivu: 'kohteet.html', valitsin: sek('vertailu-h') }]
  },
  {
    tunnus: 'talot-kohteessa', nimi: 'Talot kohteessa', ryhma: 'Kohteet',
    kuvaus: 'Kohteen talot taulukkona: tila, koko, hinta.',
    esiintymat: [{ sivu: 'kohde.html', valitsin: sek('talot-h'), asetukset: { kohde: 'kohde-1' } }],
    muunnelmat: [
      { nimi: 'Kohde 1', asetukset: { kohde: 'kohde-1' } },
      { nimi: 'Kohde 2', asetukset: { kohde: 'kohde-2' } }
    ]
  },

  /* -- Oma tontti ------------------------------------------------------- */
  {
    tunnus: 'tarkistuslista', nimi: 'Tonttitarkistuslista', ryhma: 'Oma tontti',
    kuvaus: 'Datavetoinen tarkistuslista (tonttikriteerit.js) ja tulos. ' +
            'Lopussa "kun tontti ei sovi" (oli oma lohkonsa 1.10.2026 asti).',
    esiintymat: [{ sivu: 'oma-tontti.html', valitsin: sek('lista-h') }],
    js: 'tonttikriteerit.js'
  },

  /* -- Prosessi ja luottamus -------------------------------------------- */
  {
    tunnus: 'prosessi', nimi: 'Näin se etenee (rakentuva talo)', ryhma: 'Luottamus',
    kuvaus: 'Etusivun vieritykseen sidottu 3D-prosessi. Muualla prosessin ' +
            'askeleet ovat numeroidut kohdat.',
    esiintymat: [
      // Oma tontin ja Yhteystietojen askeleet ovat numeroidut kohdat
      // (lupaukset-lohko) 1.10.2026 alkaen; tämä on vain rakentuva talo.
      { sivu: 'index.html',        valitsin: sek('prosessi-h') }
    ]
  },
  {
    tunnus: 'luottamus', nimi: 'Luottamus', ryhma: 'Luottamus',
    kuvaus: 'Luottamusluvut ja perustelut. Sama vakio kuin energialuokka ' +
            'faktarivillä, jotta ne eivät voi eriytyä.',
    esiintymat: [
      { sivu: 'meista.html',       valitsin: sek('luottamus-h'), nimi: 'Meistä' },
      { sivu: 'index.html',        valitsin: sek('luottamus-h'), nimi: 'Etusivu' }
    ]
  },
  {
    tunnus: 'luottamusrivi', nimi: 'Luottamusrivi', ryhma: 'Luottamus', jaettu: true,
    kuvaus: 'Ostopolkujen tiivistelmä Meistä-sivun luottamus- ja lainauslohkosta: ' +
            'kolme lukua, JRT-selite, yksi lainaus ja linkki. Ei omaa copya ' +
            '(AGENTS.md sääntö 8, 1.10.2026).',
    esiintymat: [
      { sivu: 'kohteet.html',    valitsin: sek('luottamusrivi-h') },
      { sivu: 'oma-tontti.html', valitsin: sek('luottamusrivi-h') }
    ],
    css: ['§64 Luottamusrivi ostopoluilla']
  },
  {
    tunnus: 'lainaukset', nimi: 'Asiakaslainaukset', ryhma: 'Luottamus',
    kuvaus: 'Asiakastarinat lainauksina. Kasvokuvat ovat tyhjiä kuvapaikkoja ' +
            'myös placeholder-tilassa.',
    esiintymat: [
      { sivu: 'meista.html',       valitsin: sek('lainaukset-h') }
    ]
  },
  {
    tunnus: 'ukk', nimi: 'Usein kysytyt', ryhma: 'Luottamus', jaettu: true,
    kuvaus: 'Kysymykset avautuvina riveinä (details/summary).',
    esiintymat: [
      { sivu: 'kohteet.html',    valitsin: sek('ukk-h') },
      { sivu: 'oma-tontti.html', valitsin: sek('ukk-h') }
    ]
  },

  /* -- Yritys ----------------------------------------------------------- */
  {
    tunnus: 'toimialue', nimi: 'Toimialue', ryhma: 'Yritys',
    kuvaus: 'Teksti ja kohteet kortteina (suunta B ilman karttaa, 1.10.2026). ' +
            'Kortit KOHTEET-datasta samalla kohdeKortti-funktiolla kuin ' +
            'kohdelistaus; hintapalkki aina oliivi. Kartta (tyokalut/kartta.py) ' +
            'on yhä tiedostona.',
    esiintymat: [
      { sivu: 'meista.html', valitsin: sek('alue-h') }
    ]
  },
  {
    tunnus: 'nimen-tarina', nimi: 'Nimen tarina', ryhma: 'Yritys',
    kuvaus: 'Luoto ja koti. Etusivulla tumma osio — sivuston ainoa.',
    esiintymat: [
      { sivu: 'index.html',  valitsin: sek('nimi-h'), nimi: 'Etusivu · tumma' },
      { sivu: 'meista.html', valitsin: sek('nimi-h'), nimi: 'Meistä' }
    ]
  },
  {
    tunnus: 'ihmiset', nimi: 'Ihmiset', ryhma: 'Yritys',
    kuvaus: 'Tiimi kasvokuvapaikkoineen.',
    esiintymat: [{ sivu: 'meista.html', valitsin: sek('ihmiset-h') }]
  },

  /* -- Yhteydenotto ----------------------------------------------------- */
  {
    tunnus: 'lomake', nimi: 'Segmentoiva lomake', ryhma: 'Yhteydenotto',
    kuvaus: 'Kentät vaihtuvat polkuvalinnan mukaan; kiitostila samassa lohkossa.',
    esiintymat: [{ sivu: 'yhteystiedot.html', valitsin: sek('lomake-h') }]
  },
  {
    tunnus: 'suorat', nimi: 'Suorat yhteystiedot', ryhma: 'Yhteydenotto',
    kuvaus: 'Puhelin ja sähköposti kävijälle joka ei halua lomaketta.',
    esiintymat: [{ sivu: 'yhteystiedot.html', valitsin: sek('suorat-h') }]
  },
  {
    tunnus: 'loppu-cta', nimi: 'Loppu-CTA', ryhma: 'Yhteydenotto', jaettu: true,
    kuvaus: 'Kuva ja teksti paneelissa: sivun lopussa amber, sivun keskellä ' +
            '(aluekysely) beige. Sama lohko kaikilla sivuilla 1.10.2026 alkaen.',
    esiintymat: [
      { sivu: 'index.html',      valitsin: sek('cta-h') },
      { sivu: 'talo.html',       valitsin: sek('cta-h') },
      { sivu: 'kohteet.html',    valitsin: sek('cta-h') },
      { sivu: 'kohde.html',      valitsin: sek('cta-h'), asetukset: { kohde: 'kohde-1' } },
      { sivu: 'oma-tontti.html', valitsin: sek('cta-h') },
      { sivu: 'meista.html',     valitsin: sek('cta-h') },
      { sivu: 'kohteet.html',    valitsin: sek('aluekysely-h'), nimi: 'Kohteet · aluekysely (beige)' }
    ],
    css: ['§75 Loppu-CTA', '§78 Kaikki sivut ja aluekysely']
  }
];
