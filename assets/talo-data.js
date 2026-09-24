/* ==========================================================================
   Luotokoti — talomallin tiedot
   Yksi tiedosto, yksi objekti. Kaikki talon faktat ovat täällä.

   Miksi näin: sivustolla on tällä hetkellä yksi tuotesivu, ja siitä on
   olemassa yhden sektion copy yhdeksästä. Kun D1 (talomallin tiedot)
   ratkeaa, muuttuu vain tämä tiedosto — talo.html ei muutu lainkaan.
   Jos D1 tuottaa yllätyksen (useampi malli), muutos kohdistuu rakenteeseen
   eikä kymmeneen kovakoodattuun kohtaan sivulla.

   v3: talo ei ole enää yksi kokoonpano. Pinta-ala ja huoneistotyyppi ovat
   siirtyneet juuresta kokokohtaisiksi (koot-taulukko), koska taloon voi
   lisätä makuuhuoneita päätyyn — 2, 3 tai 4. Kokojen tiedot ovat vain
   täällä, eivät missään sivun markupissa.

   Tämä tiedosto ladataan nyt neljällä sivulla eikä yhdellä: hintablokin
   kokoporrastus tarvitsee koot myös etusivulla ja ostopolkusivuilla.

   Arvojen merkitys renderöinnissä:
     null            tietoa ei ole  → sivulle merkitty aukko, ei tyhjä tila
     []              listaa ei ole  → sivulle merkitty aukko, ei tyhjä tila
     {}              tietoja ei ole → sivulle merkitty aukko, ei tyhjä tila

   Yhtään lukua, ominaisuutta tai materiaalia ei ole täytetty arvaamalla.
   Katso AVOIMET.md.
   ========================================================================== */

/* Kolmen makuuhuoneen pohjapiirustus. Ainoa koko jolla piirustus on.

   LÄHDE on Walltecin arkkitehtipiirustus (Nordhem Röd, Vesslevägen 9,
   Jakobstad; ARK A-02, 1:50, Julia Lindell, 05/03/26). Piirustus saatiin
   valokuvana paperista, joten geometria on piirretty uudelleen ja kalibroitu
   piirustuksen omilla päämitoilla — ks. tyokalut/pohja.py, joka tuottaa
   kuvatiedoston. Tarkkuus on ±100 mm seinille ja ±150 mm oville, joten kuva
   on HAVAINNEKUVA eikä mittapiirustus. Siksi kuvan alla on varaus
   (copy: talo.pohjaVaraus) — sitä ei saa poistaa niin kauan kuin geometria
   on valokuvasta luettu. AVOIMET.md kohta 165.

   huoneet ovat piirustuksen omat pinta-alat sellaisenaan. Niitä EI ole
   laskettu geometriasta, koska rekonstruktion ala poikkeaisi merkitystä
   parilla prosentilla ja sivulle kuuluu arkkitehdin luku eikä minun.

   x ja y ovat prosentteja kuvan alasta ja tulevat samasta generaattorista
   kuin geometria. Jos kuvaa muutetaan, aja generaattori ja päivitä nämä
   samalla — muuten nimi valuu väärään huoneeseen.

   ulkotilat ovat nimiä ilman pinta-alaa: piirustus ei ilmoita terassin
   eikä kuistin alaa. Sitä ei lasketa tässä.

   HUOM: asuinpinta-ala ja huoneistotyyppi eivät ratkea tästä. Merkityt
   huoneet summautuvat 97,8 m²:iin ja bruttoala on 13,0 × 8,9 m, mutta
   kumpaakaan lukua ei ole piirustuksessa — ne ovat yhä aukkoja (neliot,
   huoneistotyyppi). Ks. AVOIMET.md kohta 166.                            */
var POHJA_3MH = {
  kuva: 'assets/pohjapiirustus-3mh.svg',
  huoneet: [
    { nimi:'Makuuhuone',         ala:'9,0',  x:12.95, y:34.82 },
    { nimi:'Varasto',            ala:'2,1',  x: 9.66, y:52.75 },
    { nimi:'Makuuhuone',         ala:'9,0',  x:12.95, y:70.47 },
    { nimi:'Olohuone + keittiö', ala:'48,5', x:44.30, y:50.72 },
    { nimi:'Makuuhuone',         ala:'10,8', x:76.98, y:35.54 },
    { nimi:'WC',                 ala:'2,0',  x:70.13, y:56.85 },
    { nimi:'Kylpyhuone',         ala:'4,1',  x:80.87, y:56.85 },
    { nimi:'Eteinen',            ala:'4,5',  x:58.56, y:74.20 },
    { nimi:'Apukeittiö',         ala:'7,8',  x:76.98, y:73.84 }
  ],
  ulkotilat: [
    { nimi:'Terassi', x:33.89, y:11.23 },
    { nimi:'Kuisti',  x:61.54, y:92.03 }
  ]
};

var TALO = {

  /* -- Perustiedot ------------------------------------------------------
     Molemmat puuttuvat aineistosta kokonaan. Sisältöstrategia puhuu
     talomallista yksikössä ("vår husmodell"), mutta ei nimeä sitä eikä
     anna yhtään mittaa. Brändistrategia antaa markkinatiedon "3, 4 tai 5
     huonetta, n. 100 m²" — se on tieto siitä mitä ostajat kysyvät, ei
     tieto siitä mitä Luotokoti toimittaa. Sitä ei ole käytetty tässä.

     HUOM: pinta-ala ja huoneistotyyppi eivät ole enää täällä. Talo ei ole
     yksi kokoonpano vaan kolme kokoa, joten ne kuuluvat koot-taulukkoon.
     Nimi on silti yksikössä ja ilman neliömäärää: "Luoto", ei "Luoto 118".
     Neliömäärä nimessä ei toimi kun kokoja on kolme.

     v4 / R1: malleja on yksi, ja sama nimi kattaa kaikki koot. Perusmalli
     ja laajennus eivät ole eri tuotteita eivätkä eri nimiä.              */
  nimi:      null,
  kerrokset: null,

  /* Yksi lause: kenelle talo on suunniteltu. Puuttuu. */
  kenelle:   null,

  /* -- Koot -------------------------------------------------------------
     v4: kokoja on 2, 3 tai 4 makuuhuonetta. Aiempi 1–3 oli virhe datassa,
     ei tulkintakysymys — workshop 18.8.2026 vahvisti oikean määrän (R2).
     Yksikään mitta ei ole edelleenkään tiedossa.

     perus: true on lähtökoko ja EHDOTON. Muut ovat lisiä ja EHDOLLISIA,
     koska laajennus riippuu tontin koosta ja rakennusoikeudesta. Ero näkyy
     renderöinnissä: perushinta on kokonaisluku, muut esitetään +-merkillä.
     Siksi lippu on datassa eikä pääteltävissä indeksistä — jos kokoja
     joskus tulee lisää tai järjestys muuttuu, indeksipäättely hajoaisi
     hiljaa.

     hintaero: 0 perusrivillä tarkoittaa "ei lisää", ei "hintaa ei tiedetä".
     Perushinta itsessään on eri kenttä ja se puuttuu edelleen.

     Nimeäminen: koot nimetään makuuhuoneiden määrällä, ei kirjaimilla,
     malleilla eikä tuotenimillä. Nimi johdetaan makuuhuoneiden määrästä
     kokoNimi()-funktiolla eikä kirjoiteta dataan — sääntö on brändipäätös
     eikä sisältöä, ja se ei saa eriytyä sivujen välillä.

     huoneistotyyppi on suomalaisen ostajan hakutermi ("3h+k"), jossa
     olohuone lasketaan mukaan. Kolmen makuuhuoneen pohja on nyt nähty,
     mutta täsmällinen vastaavuus ei silti ratkea siitä: lasketaanko
     apukeittiö khh:ksi on nimeämispäätös eikä pohjan ominaisuus. Kenttä
     pysyy siis aukkona kaikilla kokoilla — ks. AVOIMET.md kohta 166.

     pohja on kokokohtainen pohjapiirustus tai null. Vain kolmen
     makuuhuoneen koolla on piirustus; muiden kuvapaikka on yhä merkitty
     aukko. Ks. POHJA_3MH tämän tiedoston alussa.

     perus ja oletus ovat ERI ASIA, ja 20.8.2026 alkaen eri koolla.
     perus:true on hintaportaan lähtöhinta — se on mh2, koska perushinta
     lasketaan pienimmästä koosta. oletus:true on koko jonka kävijä näkee
     ensin — se on mh3, koska se on ainoa jolla on pohjapiirustus.
     Oletuksena mh2 avasi sivun tärkeimmän sektion tyhjänä kuvapaikkana,
     ja kävijä näki piirustuksen vasta jos arvasi vaihtaa kokoa. Kun mh2:n
     ja mh4:n piirustukset saadaan (AVOIMET.md 7), oletus palautetaan
     perusmalliin — silloin syytä poikkeamaan ei enää ole.               */
  koot: [
    { tunnus:'mh2', makuuhuoneita:2, neliot:null, huoneistotyyppi:null,
      hintaero:0,    perus:true,  oletus:false, pohja:null       },
    { tunnus:'mh3', makuuhuoneita:3, neliot:null, huoneistotyyppi:null,
      hintaero:null, perus:false, oletus:true,  pohja:POHJA_3MH  },
    { tunnus:'mh4', makuuhuoneita:4, neliot:null, huoneistotyyppi:null,
      hintaero:null, perus:false, oletus:false, pohja:null       }
  ],

  /* -- Laajennus muuton jälkeen -----------------------------------------
     mahdollista: true on ainoa vahvistettu tieto. Kaikki muut ovat auki,
     ja ne ratkaisevat onko tämä lupaus vai vihje.

     ÄLÄ täytä null-arvoja arvaamalla. Jos laajennus ei ole alkuperäisessä
     rakennusluvassa, asiakas kohtaa oman lupaprosessinsa — eikä lupaus
     vaivattomuudesta ulotu siihen. Ks. AVOIMET.md kohdat 106–110.       */
  laajennus: {
    mahdollista:      true,
    lupaMukana:       null,   /* onko laajennus alkuperäisessä luvassa?  */
    perustusValmiina: null,   /* rakennetaanko perustus täyteen mittaan? */
    takuuvaikutus:    null,
    hinta:            null,
    kesto:            null
  },

  /* -- Mitä TALON hintaan sisältyy --------------------------------------
     Koottu olemassa olevasta aineistosta. varmuus-kenttä kertoo onko
     kohta julkisessa vai luottamuksellisessa lähteessä — sitä ei näytetä
     asiakkaalle, mutta se ohjaa muistiinpanotilan merkintöjä.

     v5: rivi "Tontti" POISTETTU. Tämä lista renderöityy tuotesivulla, ja
     tuotesivun hinta ei sisällä tonttia — tontin hinta vaihtelee
     kohteittain, eikä tuotesivu tiedä sijainnista mitään. Tontti mainitaan
     siellä missä se on totta: kohteet.html:n hintaselitteessä (taso 2) ja
     oma-tontti.html:ssä siltä osin ettei se ole hinnassa (taso 3).
     Ks. copy-data.js, hintalogiikka. */
  sisaltyy: [
    {
      teksti:    'Rakennuslupa ja paperityöt',
      tarkennus: 'Haemme luvan puolestasi.',
      varmuus:   'vahvistettu'
    },
    {
      teksti:    'Maatyöt',
      tarkennus: 'Talonrakentamisessa yleensä pettävät maatyöt. Luotokoti ottaa sen riskin.',
      varmuus:   'vahvistettu'
    },
    {
      teksti:    'Talo ja kiinteä sisustus',
      tarkennus: null,
      varmuus:   'vahvistettu'
    },
    {
      teksti:    'Liittymät',
      tarkennus: null,
      varmuus:   'epavarma'   /* vain luottamuksellisessa aineistossa */
    },
    {
      teksti:    'Avaimenluovutus',
      tarkennus: 'Hoidamme prosessin luvasta avaimeen.',
      varmuus:   'vahvistettu'
    }
  ],

  /* -- Mitä kokonaishintaan EI sisälly ----------------------------------
     Tyhjä. Tätä listaa ei ole missään aineistossa — ei sisältöstrategiassa,
     ei brändistrategiassa, ei brändikirjassa. Sivuston uskottavuuden
     kannalta tämä on tärkein yksittäinen puuttuva sisältö, ja se
     renderöityy sivulle tyhjänä ja merkittynä. Älä täytä arvaamalla. */
  eiSisally: [],

  /* -- Sisustustyylit ---------------------------------------------------
     R6 (workshop 18.8.2026): valintoja ON, ja ne ovat kolme arkkitehdin
     esivalitsemaa sisustustyyliä. Sektio 05 lakkasi olemasta kysymys.

     Valinta tehdään VALMIIN LINJAN tasolla, ei komponentti kerrallaan:
     erillisiä kodinkone-, autokatos- tai pintamateriaalivalintoja ei ole.
     Se on sama logiikka kuin pohjaratkaisussa — vakiointi on kiinteän
     hinnan perusta, ja komponenttitason valinta murtaisi sen.

     Nimet, kuvaukset ja mahdollinen hintaero tulevat arkkitehdin speksien
     mukana. SEKTION OLEMASSAOLO EI OLE ENÄÄ AUKI, SISÄLTÖ ON.
     Ks. AVOIMET.md kohta 21.

     hinta pysyy rakenteessa vaikka tyylit olisivat keskenään
     samanhintaisia. Kannustalon dokumentoitu virhe on, että
     sisustusvalinnat koettiin 20 000 € kalliimmiksi kuin viestittiin —
     hintapaikka kuuluu rakenteeseen alusta asti, ei jälkikäteen. */
  tyylit: [
    { tunnus: 'tyyli-1', nimi: null, kuvaus: null, hinta: null },
    { tunnus: 'tyyli-2', nimi: null, kuvaus: null, hinta: null },
    { tunnus: 'tyyli-3', nimi: null, kuvaus: null, hinta: null }
  ],

  /* -- Tekniset tiedot --------------------------------------------------
     Lähes tyhjä. Odotetut avaimet: lammitys, energialuokka, rakenteet,
     ilmanvaihto.

     Rakennetyyppi on ainoa vahvistettu tekninen tieto koko aineistossa:
     sisältöstrategian blokki 1, askel 3 sanoo "monterar ditt elementhus".
     Sitä ei siksi näytetä aukkona — tiedossa oleva fakta ei kuulu
     hakasulkeisiin. Seinärakenne, eristys ja materiaalit puuttuvat silti. */
  tekniset: {
    rakenteet: 'Elementtitalo'
  },

  /* -- Takuu ------------------------------------------------------------
     Puuttuu. Takuuvuosia ei mainita missään aineistossa. */
  takuu: null
};

/* -------------------------------------------------------------------------
   Koon nimi. Johdetaan makuuhuoneiden määrästä eikä kirjoiteta dataan:
   nimeämissääntö on brändipäätös, ei sisältöä. Kirjaimet ("koko A"),
   mallinimet tai tuotenimet tekisivät yhdestä talosta malliston ja
   rikkoisivat vakiointiviestin, joka on koko hinnan perusta.

   Yksi funktio, jotta sääntö ei ehdi eriytyä talo.js:n ja proto.js:n
   välillä. Molemmat käyttävät tätä.
   ------------------------------------------------------------------------- */
function kokoNimi(makuuhuoneita) {
  /* Yksikkö ja monikko ovat eri sanoja suomessa mutta sama ruotsissa
     ("1 sovrum", "2 sovrum"). Kumpikin kulkee kieliapurin läpi omana
     arvonaan, joten kielisääntö on sanakirjassa eikä tässä funktiossa.
     Ks. asetukset.js, Kieliapurit. */
  var sana = (typeof ASETUKSET !== 'undefined' && ASETUKSET.sana)
    ? ASETUKSET.sana : function (t) { return t; };
  if (makuuhuoneita === 1) return '1 ' + sana('makuuhuone');
  return makuuhuoneita + ' ' + sana('makuuhuonetta');
}

/* Perusmallin koko. Yksi paikka, jotta "perusmalli" ei tarkoita eri asiaa
   hintaportaikossa ja copyssa. Palauttaa null jos lippua ei ole. */
function perusKoko() {
  var koot = (typeof TALO !== 'undefined' && TALO && TALO.koot) ? TALO.koot : [];
  for (var i = 0; i < koot.length; i++) {
    if (koot[i].perus) return koot[i];
  }
  return koot.length ? koot[0] : null;
}
