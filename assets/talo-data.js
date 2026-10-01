/* ==========================================================================
   Luotokoti — talomallin tiedot
   Yksi tiedosto, yksi objekti. Kaikki talon faktat ovat täällä.

   Miksi näin: sivustolla on tällä hetkellä yksi tuotesivu, ja siitä on
   olemassa yhden sektion copy yhdeksästä. Kun D1 (talomallin tiedot)
   ratkeaa, muuttuu vain tämä tiedosto — talo.html ei muutu lainkaan.
   Jos D1 tuottaa yllätyksen (useampi malli), muutos kohdistuu rakenteeseen
   eikä kymmeneen kovakoodattuun kohtaan sivulla.

   v6 (28.9.2026): D1 ratkesi. Arkkitehdin aineisto *Luotokoti - RISÖ 100 +*
   (HELST, SKEDE 2, 25.9.2026) toi mallin nimen, kerrosluvun, pinta-alan,
   huoneistotyypin, pohjapiirustuksen, saunarakennuksen kuutena
   vaihtoehtona ja kolme julkisivuvisualisointia. Ennuste piti: sivujen
   markup ei muuttunut näiltä osin lainkaan, vain tämä tiedosto. Se mikä
   EI ratkennut on merkitty yhä aukkona — hinnat, sisustustyylit,
   tekniset tiedot ja kahden muun koon mitat.

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

/* Risö 100+ -pohjapiirustus. Talomallin ainoa piirustus.

   LÄHDE on HELST Arkkitehdit Oy:n konseptiaineisto *Luotokoti - RISÖ 100 +*,
   SKEDE 2, 25.9.2026 — Luotokodin oman arkkitehdin oma piirustus tästä
   talosta. Kuva on arkkitehdin vektoripiirustus sellaisenaan, ei
   uudelleenpiirretty: teksti ja mittaketjut on poistettu, muuta ei.
   Generaattori tyokalut/riso.py kertoo miten ja miksi.

   EDELTÄJÄ POISTETTU. Tässä oli 20.8.–28.9.2026 POHJA_3MH, joka oli
   piirretty Walltecin talosta (Nordhem Röd, Jakobstad) valokuvatun
   paperipiirustuksen pohjalta ±100 mm:n tarkkuudella. Se oli sijainen:
   Luotokodin omaa piirustusta ei ollut, ja jonkin talon pohja kertoi
   pohjaratkaisusta enemmän kuin tyhjä laatikko. Nyt oikea piirustus on
   olemassa, joten sijainen on poistettu — myös tiedostot
   assets/pohjapiirustus-3mh.svg ja tyokalut/pohja.py. Kaksi pohjaa
   samasta talosta on pahempi kuin ei pohjaa: kumpi niistä on se joka
   rakennetaan. AVOIMET.md kohta 196.

   huoneet ovat piirustuksen omat pinta-alat sellaisenaan.

   x ja y ovat prosentteja kuvan alasta ja tulevat samasta generaattorista
   kuin kuva — ne ovat piirustuksen omien huonemerkintöjen keskipisteitä.
   Jos kuva muuttuu, aja generaattori ja päivitä nämä samalla, muuten nimi
   valuu väärään huoneeseen.

   NIMET OVAT KÄÄNNÖS LYHENTEISTÄ. Piirustus merkitsee huoneet arkkitehdin
   työkielellä (mh, oh,k, khh/arki-et, kph, s, var), eivätkä ne ole sanoja
   joita ostaja hakee. Purku on prototyypin ehdotus ja se on vahvistettava:
   khh/arki-et → **Kodinhoitohuone**, saunarakennuksen kph → **Pesuhuone**
   (päätalon kph 3,5 on **Kylpyhuone**, siinä on amme). AVOIMET.md 164.

   Seitsemän nimeä on tarkoituksella samoja merkkijonoja kuin poistetussa
   POHJA_3MH:ssa (Makuuhuone, Varasto, Olohuone + keittiö, WC, Kylpyhuone,
   Eteinen, Terassi). Sanakirjan avain on suomenkielinen arvo itse, joten
   samana pysyvä nimi pitää ruotsinnoksensa — vaihdettu nimi pudottaisi sen.
   Ks. AGENTS.md, Kieli.

   SAUNARAKENNUS ON KUVASSA VARIAATIONA 4. Piirustus näyttää lisärakennuksen
   yhdessä kuudesta kokoonpanosta (vierashuone + saunaosasto + ulkovarasto).
   Se ei ole oletus eikä suositus, se on se jonka arkkitehti piirsi
   pääkuvaan. Kaikki kuusi ovat TALO.sauna.vaihtoehdot-listassa omina
   kuvinaan.                                                              */
var POHJA_RISO = {
  kuva: 'assets/pohjapiirustus-riso.webp',
  huoneet: [
    /* Päätalo, 100 m² */
    { nimi:'Makuuhuone',         ala:'12,5', x:16.4, y:53.5 },
    { nimi:'Olohuone + keittiö', ala:'42,0', x:68.5, y:55.1 },
    { nimi:'Makuuhuone',         ala:'9,5',  x:89.5, y:56.7 },
    { nimi:'Makuuhuone',         ala:'9,5',  x:89.8, y:72.3 },
    { nimi:'Kylpyhuone',         ala:'3,5',  x:22.1, y:72.9 },
    { nimi:'WC',                 ala:'2,0',  x:35.4, y:73.4 },
    { nimi:'Kodinhoitohuone',    ala:'8,5',  x:16.5, y:80.8 },
    { nimi:'Eteinen',            ala:'9,0',  x:46.6, y:81.6 },
    { nimi:'Varasto',            ala:'2,5',  x:66.5, y:92.5 },

    /* Saunarakennus, 29 k-m². Piirustuksessa variaatio 4. */
    { nimi:'Varasto, vierashuone tai työhuone', ala:'10,0', x:29.6, y:11.7 },
    { nimi:'Pesuhuone',          ala:'3,0',  x:21.8, y:19.5 },
    { nimi:'Sauna',              ala:'3,5',  x:22.0, y:29.2 },
    { nimi:'Varasto',            ala:'5,0',  x:30.6, y:29.2 }
  ],

  /* Ulkotilat ovat nimiä ilman pinta-alaa: piirustus ei ilmoita terassin
     alaa. Sitä ei lasketa tässä. Luiskavaraus on arkkitehdin oma merkintä
     (1:20) eikä prototyypin lisäys — ja se on tälle kohderyhmälle
     olennaisempi tieto kuin moni huone. */
  ulkotilat: [
    { nimi:'Terassi',      x:70.0, y:38.0 },
    { nimi:'Grillipaikka', x:42.0, y: 2.9 },
    { nimi:'Luiskavaraus', x:21.9, y:91.6 }
  ]
};

var TALO = {

  /* -- Perustiedot ------------------------------------------------------
     RATKESI 25.9.2026 arkkitehdin aineistossa (HELST, *Luotokoti - RISÖ
     100 +*, SKEDE 2). Aiemmin molemmat puuttuivat: sisältöstrategia puhui
     talomallista yksikössä ("vår husmodell") nimeämättä sitä.

     NIMI ON *Risö 100+* SELLAISENAAN, myös neliömäärineen. Tämä kumoaa
     aiemman säännön "nimi ilman neliömäärää" (AGENTS.md 5, talo-data.js
     v3), joka kirjoitettiin siksi että kokoja on kolme eikä yksi luku voi
     kattaa niitä. Perustelu on yhä pätevä — ja juuri siksi ratkaisu on
     toinen: jos malleja tulee lisää, ne ovat *Risö 80+* ja *Risö 120+*,
     eli luku nimessä erottaa mallit toisistaan. Päätös 28.9.2026, Olli.
     Seuraus kokoihin on kirjattu koot-taulukon kommenttiin ja
     AVOIMET.md:n kohtaan 195.

     kerrokset: 1. Piirustuksen otsikko on *1. Kerros* eikä toista kerrosta
     ole. Tämä sulkee AVOIMET.md:n kohdan 20 ristiriidan, jossa
     eläkeläiscopy väitti yhtä tasoa ilman että data tiesi siitä.         */
  nimi:      'Risö 100+',
  kerrokset: 1,

  /* Yksi lause: kenelle talo on suunniteltu. PUUTTUU EDELLEEN.
     Aineiston oma lause on *Maximal funktionalitet - förmånligt pris* —
     se on positiointi eikä vastaus kysymykseen kenelle. Ks. AVOIMET.md 5. */
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

     NIMEÄMINEN MUUTTUI 30.9.2026. Aiemmin koot nimettiin makuuhuoneiden
     määrällä ja nimi johdettiin kokoNimi()-funktiolla. Nyt nimi on
     datassa (nimi-kenttä), koska rivit eivät ole enää eri kokoja vaan
     saman talon varustetasoja — makuuhuoneiden määrä on kaikilla sama.
     kokoNimi() on yhä olemassa, mutta renderöinti käyttää nimi-kenttää
     kun se on. Nimi on suomenkielinen arvo ja kulkee sanakirjan kautta
     ruotsiin (ASETUKSET.sana), kuten muutkin datan arvot.

     huoneistotyyppi on suomalaisen ostajan hakutermi ("4h+k"), jossa
     olohuone lasketaan mukaan. Kolmen makuuhuoneen kohdalla se ratkesi
     25.9.2026: arkkitehti merkitsee pohjan itse muotoon **4 r + k**, joten
     kodinhoitohuonetta EI lasketa huoneeksi eikä kysymys ole enää
     prototyypin tulkinta. Kahdella muulla koolla kenttä on yhä aukko.

     KOLME MAKUUHUONEKOKOA ON PURETTU 30.9.2026. Asiakas vastasi
     Miro-boardilla suoraan kysymykseen *Vilka prislappar gäller här?*:

       Istället för 2 sovrum: Risö 4 r + k, 100 m² / 119 v-m² → 237 000 €
       Istället för 3 sovrum: … med förråd / bastu 29 v-m²    → + 18 500 €
       Istället för 4 sovrum: … med förråd / bastu och carport → + 34 000 €

     Kolme saraketta ovat siis SAMA TALO kolmella varustetasolla, eivät
     kolme eri kokoa. Se vahvistaa sen mitä arkkitehdin aineisto jo
     implikoi (AVOIMET.md 195): aineiston oma muunnosakseli on 29 k-m²:n
     lisärakennus, ei makuuhuoneiden määrä. Workshopin 18.8.2026 (R2)
     päätös kolmesta koosta on tällä kumottu — asiakkaan oma hinnoittelu
     on vahvempi kuin sitä edeltänyt oletus.

     LISÄRAKENNUSTA EI NIMETÄ SAUNAKSI. Asiakas kirjoittaa *förråd /
     bastu*, mutta aineiston vakiotaso on kylmä varasto ja harrastetila
     ilman saunaa (ks. TALO.sauna) — sauna tulee vasta variaatiosta 2.
     Kumpaa +18 500 € koskee, ei selviä lapusta. Sarake on siksi
     *lisärakennus* eikä *saunarakennus*, ja kysymys on AVOIMET.md:n
     kohdassa 210.

     pohja on kokokohtainen pohjapiirustus tai null. Vain kolmen
     makuuhuoneen koolla on piirustus; muiden kuvapaikka on yhä merkitty
     aukko. Ks. POHJA_RISO tämän tiedoston alussa.

     kerrosala on eri luku kuin neliot: 100 m² on asuinpinta-ala ja
     119 k-m² kerrosala. Molemmat ovat arkkitehdin omia lukuja samalta
     riviltä (*100 m² / 119 v-m²*), eikä kumpaakaan lasketa toisesta.
     Saunarakennuksen 29 k-m² EI ole tässä luvussa — se on lisärakennus,
     ks. TALO.sauna.

     YKSIKKÖ ON ARVOSSA, EI RENDERÖINNISSÄ. Sama sopimus kuin
     placeholder-data.js:ssä ('86 m²'): arvo on se merkkijono joka sivulle
     tulee. Jos yksikkö liimattaisiin koodissa, sama luku näyttäisi eri
     sivuilla eri muodossa sen mukaan kuka sen renderöi.

     perus ja oletus ovat nyt SAMA rivi. Poikkeus syntyi 20.8.2026 siitä,
     että pohjapiirustus oli vain yhdellä koolla; nyt kaikki kolme ovat
     sama talo ja sama piirustus, joten vakiotaso on sekä hintaportaan
     lähtöhinta että se jonka kävijä näkee ensin.

     hinta on vain perusrivillä: se on koko talon hinta. Muilla riveillä
     on hintaero, joka esitetään +-merkillä. Ero on kävijälle olennainen,
     ja siksi kentät ovat eri kentät eikä yksi kenttä kahdella
     merkityksellä.

     HINTAEROT OVAT PERUSHINTAAN, EIVÄT EDELLISEEN RIVIIN. +34 000 €
     sisältää sekä lisärakennuksen että autokatoksen — se ei ole
     +18 500 €:n päälle. Asiakkaan lappu sanoo sen suoraan
     (*med förråd / bastu 29 v-m² och carport*), ja kumulatiivinen luku
     olisi 52 500 €. Väärin luettuna virhe on 18 500 €.

     lisays on se mitä rivi LISÄÄ perusriviin — hintaportaan rivinimi.
     Perusrivillä se on null, koska perusrivi kantaa mallin nimen.

     kerrosala kasvaa lisärakennuksen mukana (119 → 119 + 29), mutta
     neliot EI: 100 m² on asuinpinta-ala päärakennuksessa, ja lisärakennus
     on kylmää tilaa sen ulkopuolella.                                   */
  koot: [
    { tunnus:'vakio', nimi:'Vakio', lisays:null, makuuhuoneita:3,
      neliot:'100 m²', huoneistotyyppi:'4 h + k',
      kerrosala:'119 k-m²',
      hinta:'237 000 €', hintaero:0,
      perus:true,  oletus:true,  pohja:POHJA_RISO },
    { tunnus:'lisa', nimi:'Vakio ja lisärakennus',
      lisays:'Lisärakennus 29 k-m²', makuuhuoneita:3,
      neliot:'100 m²', huoneistotyyppi:'4 h + k',
      kerrosala:'119 + 29 k-m²',
      hinta:null, hintaero:'+ 18 500 €',
      perus:false, oletus:false, pohja:POHJA_RISO },
    { tunnus:'katos', nimi:'Vakio, lisärakennus ja autokatos',
      lisays:'Lisärakennus ja autokatos', makuuhuoneita:3,
      neliot:'100 m²', huoneistotyyppi:'4 h + k',
      kerrosala:'119 + 29 k-m²',
      hinta:null, hintaero:'+ 34 000 €',
      perus:false, oletus:false, pohja:POHJA_RISO }
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

  /* -- Saunarakennus ----------------------------------------------------
     RATKESI 25.9.2026. AVOIMET.md kohta 19 kysyi "onko talossa sauna", ja
     vastaus on: talossa ei, pihalla kyllä — **erillisenä 29 k-m²:n
     rakennuksena, joka on osa taloa mutta ei osa 100 m²:ä**. Ero on
     olennainen eikä saa sekaantua hintapuheessa: saunarakennus on lisä,
     ja sen hinta on oma lukunsa jota ei ole.

     VAKIOTASO EI OLE SAUNA. Lähtökokoonpano on kylmä ulkovarasto ja kylmä
     harrastetila, joissa on viemärivaraus. Sauna tulee variaatiosta 2
     eteenpäin. Tämä on syytä sanoa sivulla suoraan: "saunaoptio" luetaan
     helposti niin että sauna kuuluu hintaan.

     Rakennus on kaikissa kuudessa saman kokoinen (29 k-m²) — vaihtoehto
     ei kasvata rakennusta vaan jakaa sen toisin. Siksi ala on tässä
     kerran eikä jokaisella rivillä.

     hinta on jokaisella null. Aineisto ei hinnoittele yhtäkään
     vaihtoehtoa, eikä hintaa lasketa neliöistä. Kenttä on rakenteessa
     alusta asti samasta syystä kuin sisustustyyleissä: hintapaikka
     jälkikäteen lisättynä on se tapa jolla lisät koetaan yllätyksinä.

     kuva on generoitu arkkitehdin omasta variaatiokaaviosta
     (tyokalut/riso.py, aineiston sivu 15). tilat on sivun oma luettelo
     sanasta sanaan — sitä ei ole täydennetty eikä yhtenäistetty, koska
     luettelon erot ovat sisältöä: variaatiossa 2 on "saunaosasto, wc" ja
     variaatiossa 4 pelkkä "saunaosasto".                                */
  sauna: {
    kerrosala: '29',
    vaihtoehdot: [
      { tunnus:'vakio', nimi:null, vakio:true,
        tilat:['Kylmä ulkovarasto', 'Kylmä harrastetila', 'Viemärivaraus'],
        kuva:'assets/sauna-vakio.webp', hinta:null },
      { tunnus:'v1', nimi:null, vakio:false,
        tilat:['Vierashuone', 'Ulkovarasto'],
        kuva:'assets/sauna-v1.webp', hinta:null },
      { tunnus:'v2', nimi:null, vakio:false,
        tilat:['Ulkovarasto', 'Saunaosasto ja wc'],
        kuva:'assets/sauna-v2.webp', hinta:null },
      { tunnus:'v3', nimi:null, vakio:false,
        tilat:['Vierashuone', 'Saunaosasto ja wc'],
        kuva:'assets/sauna-v3.webp', hinta:null },
      { tunnus:'v4', nimi:null, vakio:false, piirustuksessa:true,
        tilat:['Vierashuone', 'Saunaosasto', 'Ulkovarasto'],
        kuva:'assets/sauna-v4.webp', hinta:null },
      { tunnus:'v5', nimi:null, vakio:false,
        tilat:['Puulämmitteinen sauna', 'Ulkovarasto'],
        kuva:'assets/sauna-v5.webp', hinta:null }
    ]
  },

  /* -- Julkisivun värivaihtoehdot ---------------------------------------
     Arkkitehdin aineistossa sama talo on visualisoitu kolmessa värissä.
     SE EI OLE SAMA ASIA KUIN VALIKOIMA, eikä sivusto saa väittää että
     kävijä valitsee värin: kolme kuvaa voi olla myös arkkitehdin tapa
     näyttää massoittelu eri sävyissä. Siksi lista on olemassa mutta
     `valittavissa` on null — kunnes asia vahvistetaan, kuvat ovat kuvia
     samasta talosta eivätkä vaihtoehtoja joita klikataan.
     AVOIMET.md kohta 200.

     Kuvaukset ovat sitä mitä kuvassa näkyy, eivät maalisävyjen nimiä:
     sävyjä ei ole nimetty aineistossa. */
  julkisivut: {
    valittavissa: null,
    /* nayte = laatan lähikuva pelkästä julkisivun pinnasta (Olli
       1.10.2026: "tähän haluaisin tarkemman kuvan pelkästä väristä").
       Rajattu samoista havainnekuvista seinäverhouksen kohdalta, 144 px.
       Järjestys on talon heron värinvaihtimen järjestys (Ollin
       havainnekuva 1.10.2026): vaalea, punainen, musta. Punaisesta ei ole
       kuvaa sisäänkäynnin puolelta, joten se on pihan puolelta. */
    varit: [
      { tunnus:'vaalea',  nimi:null, kuvaus:'Vaalea kuultokäsitelty puu, musta konesaumakatto',
        kuva:'assets/kuvat/riso-julkisivu-vaalea.webp', nayte:'assets/kuvat/riso-nayte-vaalea.webp' },
      { tunnus:'punainen',nimi:null, kuvaus:'Punainen puujulkisivu, punainen konesaumakatto',
        kuva:'assets/kuvat/riso-piha-punainen.webp', nayte:'assets/kuvat/riso-nayte-punainen.webp' },
      { tunnus:'musta',   nimi:null, kuvaus:'Musta puujulkisivu, vihreä konesaumakatto',
        kuva:'assets/kuvat/riso-julkisivu-musta.webp', nayte:'assets/kuvat/riso-nayte-musta.webp' }
    ]
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
      /* Kuvaus lisätty 1.10.2026 (Olli, mobiili-Miro: "tässäkin olisi hyvä
         olla jokin kuvaus"). Sisältö on talosivun sisustusosiosta: kolme
         arkkitehdin kokoamaa kokonaisuutta. */
      tarkennus: 'Sisustuksen valitset kolmesta arkkitehdin kokoamasta kokonaisuudesta.',
      varmuus:   'vahvistettu'
    },
    {
      /* KUITU RATKESI 30.9.2026 — KAHDEN LUKIJAN YHTEISYMMÄRRYS. Asiakkaan
         vastaus 1.6 oli kirjoitettu kahtena päällekkäisenä versiona
         (*Fiberanslutning ingår / Förberedande rördragning för fiber görs
         fast kunden inte beställer med fiberanslutning*), eikä siitä
         saanut selvää. Copywriter luki sen 29.9. niin että PUTKITUS
         sisältyy mutta liittymä ei, ja päätyi samaan tulkintaan itsenäisesti.
         Kaksi samaa lukutapaa riittää kirjoitettavaksi; ristiriita on
         kirjattu AVOIMET.md:n kohtaan 218 jos asiakas tarkoitti muuta.

         Viemäri puuttuu asiakkaan luettelosta kokonaan, joten se on tässä
         yhä — se on ollut copyssa alusta asti eikä sitä poisteta
         luettelon puutteen perusteella. Ks. sama kohta. */
      teksti:    'Liittymät',
      tarkennus: 'Kuituliittymää varten tehdään putkitus, vaikka et tilaisi liittymää.',
      varmuus:   'vahvistettu'
    },
    {
      /* VAHVISTETTU 30.9.2026 asiakkaan Miro-lapulla: *Talopaketin
         hintaan kuuluu 2 terassia + pergola. Lisärakennuksen hintaan
         kuuluu yksi terassi.* Lisärakennuksen terassi EI ole tässä
         listassa, koska tämä lista on talon hinta — lisärakennus on oma
         rivinsä hintaportaassa. Ks. AVOIMET.md 113. */
      teksti:    'Kaksi terassia ja pergola',
      tarkennus: 'Lisärakennuksen hintaan kuuluu lisäksi yksi terassi.',
      varmuus:   'vahvistettu'
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

     25.9.2026 SAATIIN YKSI PALETTI, EI KOLMEA LINJAA. Arkkitehdin aineisto
     esittää *Preliminär färg- och materialpalett* — yhden paletin (vihreä,
     tammi, travertiini, terrakotta, pellava), joka toistuu kaikissa
     sisäkuvissa samanlaisena. Se on tämän talon materiaalimaailma eikä
     kolme valittavaa linjaa, joten tyylit pysyvät aukkoina. Paletin kuva
     on assets/kuvat/riso-materiaalipaletti.webp ja se kuuluu sinne missä
     kerrotaan mistä talo on tehty — ei tähän sektioon, joka lupaa
     valinnan. Sana *preliminär* on aineistossa itsessään.

     hinta pysyy rakenteessa vaikka tyylit olisivat keskenään
     samanhintaisia. Kannustalon dokumentoitu virhe on, että
     sisustusvalinnat koettiin 20 000 € kalliimmiksi kuin viestittiin —
     hintapaikka kuuluu rakenteeseen alusta asti, ei jälkikäteen. */
  tyylit: [
    /* kuva: KUVAT-avain (kuvat-data.js) tai null = merkitty kuvapaikka.
       Olli 1.10.2026: jokaisessa tyylissä kuvapaikka, ja materiaalipaletti
       toisen tyylin (placeholderissa "Sävy") kuvaksi. Paletti on yksi eikä
       kolme, joten muiden tyylien kuvat puuttuvat aidosti. */
    { tunnus: 'tyyli-1', nimi: null, kuvaus: null, hinta: null, kuva: null },
    { tunnus: 'tyyli-2', nimi: null, kuvaus: null, hinta: null, kuva: 'materiaalipaletti' },
    { tunnus: 'tyyli-3', nimi: null, kuvaus: null, hinta: null, kuva: null }
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
