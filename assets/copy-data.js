/* ==========================================================================
   Luotokoti — copy
   Ladataan datatiedostojen joukossa, ennen placeholder-data.js:ää.

   Jokainen asiakkaalle näkyvä lause on täällä kerran. Markupissa on vain
   viittaus:  <h2 data-copy="yhteinen.luottamusOtsikko"></h2>

   MIKSI TÄMÄ TIEDOSTO ON OLEMASSA. v4:ssä 32 lausetta esiintyi useammalla
   sivulla kovakoodattuna kopiona. Kun lause korjattiin yhdeltä sivulta,
   kolme muuta jäivät väärin — ja sivusto luki epäloogisena, vaikka jokainen
   sivu erikseen oli järkevä. Kun lause on olemassa kerran, se ei voi
   eriytyä.

   null tarkoittaa "tietoa ei ole" ja renderöityy merkittynä aukkona,
   täsmälleen kuten talo-data.js:ssä. Älä täytä arvaamalla.

   MITÄ TÄÄLLÄ EI OLE:
     · muistiinpanot (aside.note) — ne ovat työkalu, ja ne kuuluvat sen
       sektion viereen jota ne koskevat
     · talon faktat — talo-data.js
     · kohteiden tiedot — kohteet-data.js
     · hintaluvut — ne ovat markupin aukkoja (<span class="gap">), koska
       placeholder-tila paikkaa ne samaa reittiä kuin muutkin luvut. Kaksi
       rinnakkaista aukkomekanismia olisi yksi liikaa.
   NAVIGAATIO SIIRTYI TÄNNE 20.8.2026. Tässä luki aiemmin, että navigaation
   nimikkeet jäävät markupiin: lyhyitä, kerran per sivu, ei ristiriitariskiä.
   Perustelu piti niin kauan kuin kieliä oli yksi. Kaksikielisenä nimike
   "Kohteet" esiintyy seitsemällä sivulla kahdella kielellä — neljätoista
   kopiota, joista yhden korjaaminen jättää kolmetoista väärin. Sama
   perustelu kuin muullakin copylla, vain isompi.

   Sivun <title> ja meta description ovat samasta syystä täällä
   sivukohtaisissa osioissa: ne ovat sivun kieltä siinä missä leipätekstikin,
   ja ruotsinkielinen sivu jonka välilehti lukee suomeksi on käännetty
   puolittain.

   HINTALOGIIKKA — LUE TÄMÄ ENNEN KUIN MUUTAT HINTACOPYA.
   Hinta ei ole yksi luku vaan kolme, ja jokainen kuuluu eri sivulle:

     Taso 1  talo.html        Talo, lupa ja maatyöt. EI TONTTIA
     Taso 2  kohteet, kohde   Talo + tontti + kaikki
     Taso 3  oma-tontti.html  Talo + maatyöt, tontti on jo asiakkaan

   Kolme sääntöä:
     1. talo.html ei koskaan väitä sisältävänsä tonttia. Tuotesivu ei tiedä
        sijainnista mitään, ja tontin hinta vaihtelee kohteittain — yksi
        tuotesivun luku ei voi sisältää tonttia.
     2. Sana "kokonaishinta" on varattu tasoille 2 ja 3. Tasolla 1 sanotaan
        "talon hinta".
     3. "Kokonaishinta viikossa" -lupaus kuuluu VAIN oma-tontti.html:lle.
        Kohteissa hinta on jo laskettu, joten siellä lupaus on tarpeeton ja
        herättää epäilyn siitä ettei hintaa tiedetä.

   Mitä EI pehmennetä: "kiinteä hinta ensimmäisestä tarjouksesta" on totta
   ja se on brändin asiakaslupaus. Maaperätutkimus tehdään ENNEN tarjousta,
   joten ensimmäinen tarjous todella on kiinteä.
   ========================================================================== */

/* Energialuokka esiintyy kahdessa paikassa: luottamuslukuna (viisi sivua)
   ja talon avainlukuna (talo.html sektio 02). Yksi vakio, jotta ne eivät
   voi eriytyä — jos luokka vahvistuu joksikin muuksi, muutos on tässä
   yhdessä rivissä.

   AUKKO 5.10.2026. Arvo oli 'A' — ehdotus 20.8.2026, ei lähdeaineistosta.
   Asiakas vastasi 5.10.2026 teknisiin tietoihin: "Energiklass: Återkommer
   ännu med denna info." Eli luokkaa EI ole vahvistettu, ja sivusto väitti
   sitä viidessä paikassa. Merkitty aukoksi kunnes asiakas kertoo luokan;
   silloin muutos on tässä yhdessä rivissä. Ks. AVOIMET.md 6, 25, 132. */
var ENERGIALUOKKA = null;

var COPY = {

  /* ======================================================================
     NAVIGAATIO JA SIVUN KROMI — samat nimikkeet kaikilla sivuilla
     Siirretty markupista 20.8.2026 kaksikielisyyden takia (ks. tiedoston
     alku). Nimikkeet ovat lyhyitä, mutta ne ovat sivuston rakenteen nimet:
     jos "Oma tontti" on navigaatiossa eri sana kuin sivun otsikossa, kävijä
     luulee niitä eri sivuiksi.

     Kielinimikkeet FI ja SV EIVÄT ole täällä: kielen nimi kirjoitetaan
     kielen itsensä mukaan eikä sivun kielen mukaan, joten se on molemmilla
     kielillä sama ja jää markupiin.
     ====================================================================== */
  navi: {
    ohita:      'Siirry sisältöön',
    valikko:    'Valikko',
    paavalikko: 'Päänavigaatio',
    etusivu:    'Etusivu',
    talo:       'Talo',
    kohteet:    'Kohteet',
    omaTontti:  'Oma tontti',
    meista:     'Meistä',
    /* Sama nimike navigaatiossa, headerin painikkeessa ja
       yhteystiedot.html:n yläotsikossa (yhteys.heroYlaotsikko) — sama
       toiminto, sama sana. */
    yhteys:     'Ota yhteyttä',
    sivukartta: 'Sivukartta',
    footerSivut: 'Sivut',
    /* Kielenvaihtimen saavutettava nimi. Ruudunlukija lukee kaksi linkkiä
       "FI" ja "SV" ilman kontekstia, jos ryhmää ei nimetä. */
    kieliValinta: 'Kieli'
  },

  /* ======================================================================
     YHTEINEN — esiintyy useammalla sivulla, kirjoitettu kerran
     ====================================================================== */
  yhteinen: {

    /* -- Sektioiden yläotsikot (eyebrow) --------------------------------
       Pieni versaalilabel jokaisen sektion yllä. Ne ovat sivuston
       sisällysluettelo: sama tietolaji samalla sanalla joka sivulla. Siksi
       ne ovat yhdessä ryhmässä eivätkä sivukohtaisina — "Hinta" esiintyy
       neljällä sivulla ja "Luottamus" viidellä, ja jos yksi niistä on eri
       sana, kävijä lukee lohkoja eri asioina.

       Sivukohtaiset yläotsikot (esim. "Missä rakennamme") ovat sivun omassa
       osiossa: ne nimeävät yhden sivun yhden sektion eikä toistuvaa
       lohkoa.                                                            */
    yla: {
      hinta:          'Hinta',
      talo:           'Talo',
      rahoitus:       'Rahoitus',
      prosessi:       'Näin se etenee',
      luottamus:      'Luottamus',
      asukkaat:       'Asukkaat',
      ukk:            'Usein kysytyt',
      kuvat:          'Kuvat',
      nimiTarina:     'Nimen tarina',
      seuraavaAskel:  'Seuraava askel'
    },

    /* -- Footer ---------------------------------------------------------
       Vanha kuvaus alkoi "Turvallinen ja helppo tapa rakentaa uutta",
       joka on brändikirjan slogan ruotsista käännettynä eikä toimi
       yrityskuvauksena. Nyt kuvaus kertoo mitä yritys tekee, ja lupaus
       tulee perässä.                                                     */
    footerKuvaus:
        'Muuttovalmis talo ja tontti samassa paketissa. Kiinteä hinta ' +
        'ensimmäisestä tarjouksesta, ja maksat vasta, kun muutat sisään.',

    /* -- Luottamusosio --------------------------------------------------
       Luvut ovat JRT:n, eivät Luotokodin. Ks. luottamusLahde.            */
    luottamusOtsikko: 'Harkittua laatua järkevään hintaan',
    /* SUOMENNOS 24.9.2026. Copywriter korvasi ruotsissa maakunnan
       määreen kvantifioijalla (österbottnisk → lite). Suomessa sama
       tehdään poistamalla määre: "ripaus sisukkuutta" olisi kömpelö, ja
       pelkkä sisukkuus sanoo saman ilman paikannusta. */
    luottamusIngressi:
        'Haluamme näyttää, että hyvin suunniteltu ja laadukas talo ei ' +
        'vaadi suurta budjettia. Taustalla on kokemus, maalaisjärki ja ' +
        'sisu.',

    /* Selitteet ovat monikon partitiivissa, koska luvun perässä se on
       oikea muoto: "100+ rakennettua asuntoa". Aiempi "Rakennettuja
       asuntoja / 100+" luki kahtena irrallisena palana. */
    luvut: [
      /* Selite muuttui 24.9.2026: asiakas valitsi termin toteutettu koti
         eikä toimitettu talo (vastaus 4.2). Luku on yhä JRT:n — selitteen
         alla oleva luottamusLahde kertoo kenen. */
      { arvo: '100+', selite: 'toteutettua kotia' },
      { arvo: '80+',  selite: 'elementtitaloa' },
      /* Kolmas luku, ehdotus 20.8.2026: energialuokka. Ehdokkaat olivat
         rakennusaika, "0 lisälaskua sopimuksen jälkeen" ja takuuvuodet —
         energialuokka voitti kahdesta syystä. Se on Luotokodin OMA luku
         eikä JRT:n, joten se on ainoa kolmesta joka ei tarvitse
         suhteen selitystä (ks. luottamusLahde). Ja se on tarkistettavissa
         oikein, kun kaksi muuta ovat lupauksia.

         VAHVISTA: luokka A on ehdotus. Energialuokka on AVOIMET.md kohdassa
         25 yhä PUUTTUU-tilassa eikä sitä ole missään lähdeaineistossa.
         Jos oikea luokka on jokin muu, muutos on tässä yhdessä paikassa —
         se näkyy viidellä sivulla. Ks. AVOIMET.md kohta 132. */
      { arvo: ENERGIALUOKKA, selite: 'energialuokka' }
    ],

    /* ÄLÄ POISTA TÄTÄ AUKKOA. Luvut yllä ovat JRT:n. Uusi brändi, joka
       esittää ne omissa nimissään ilman selitystä, on haavoittuva heti kun
       joku tarkistaa Y-tunnuksen — ja rakennusalalla se tarkistetaan.
       Muotoilu on Johannalla työn alla. AVOIMET.md kohta 131. */
    energialuokka: ENERGIALUOKKA,

    /* RATKENNUT 23.9.2026 (asiakkaan vastaus, kohdat 1.8 ja 4.2). Aukko oli
       auki koska luvut yllä ovat JRT:n, eikä uusi brändi voi esittää niitä
       omissa nimissään ilman selitystä. Asiakas antoi muotoilun: kokemus
       kerrotaan TIIMIN nimissä, ja termi on toteutettu koti eikä toimitettu
       talo.

       SUOMI ON TÄSSÄ KÄÄNNÖS. Ruotsi on lause jonka copywriter hyväksyi
       24.9.2026 (copy-data-sv.js); tämä on sen suomennos, kirjoitettu
       ennen varsinaista suomennoskierrosta siitä syystä että TYHJÄ SUOMEN
       ARVO ON AUKKO MYÖS RUOTSIKSI (proto.js, copyArvo) — ilman tätä
       hyväksytty lause ei näkyisi kummallakaan kielellä.

       Numeroiden ja tämän lauseen suhde on yhä auki: numeromuoto lukee
       brändin omana saavutuksena riippumatta siitä mitä alla lukee.
       Ks. AVOIMET.md kohta 131. */
    luottamusLahde:
        'Luotokodin takana oleva tiimi on ollut mukana toteuttamassa yli ' +
        '100 kotia – omakotitaloja, paritaloja ja rivitaloasuntoja.',

    /* -- Asiakaslainaukset ----------------------------------------------
       Irrotettu omaksi lohkoksi 20.8.2026. Lainaukset olivat
       luottamusblokin oikeassa palstassa kuvapaikan alla, ja koska sekä
       luvut, kuvapaikka että kolme lainausta olivat pelkkiä aukkoja,
       lohkosta ei saanut selvää mikä kohta odottaa mitä sisältöä.

       Otsikko on kysymys ilman kysymysmerkkiä: se kertoo mitä lohkossa
       tulee olemaan silloinkin kun sisältöä ei vielä ole. Ingressi kertoo
       miksi nimet ovat pakollisia — se on lohkon oma perustelu eikä
       muistiinpano.                                                      */
    lainauksetOtsikko: 'Mitä asukkaat sanovat',
    lainauksetIngressi:
        'Kolme lainausta ihmisiltä, jotka ovat jo muuttaneet Luotokotiin.',

    /* -- Talotiivistelmä (4 sivua) --------------------------------------
       Otsikko vaihtelee sivuittain paitsi etusivulla ja Kohteet-sivulla,
       joilla se on sama.                                                  */
    taloOtsikkoTontille: 'Talo, joka tontille tulee',
    /* Ingressi 20.8.2026: kaksi kappaletta yhdeksi.

       POISTETTU loppulause "mutta jaat kustannuksen muiden kanssa."
       Asiakkaan päätös. Huomaa mitä sen mukana lähti: se oli ainoa paikka
       jossa sanottiin ÄÄNEEN miksi arkkitehtitalo on tässä hinnassa
       mahdollinen — vakiointi jakaa suunnittelukustannuksen. Argumentti on
       yhä implisiittisesti läsnä ("Sama kaikissa koossa", kiinteä hinta),
       mutta sitä ei enää perustella. Jos hintaa joskus epäillään liian
       halvaksi laadulle, tämä lause on se joka vastaa siihen.

       TILALLE nostettiin mekaniikkalause, joka oli aiemmin taulukon yllä
       omana kappaleenaan: mihin makuuhuone lisätään ja mikä pysyy samana.
       Se on nyt ingressin toinen virke, joten lohkossa on yksi tekstipalsta
       eikä kahta lyhyttä. Määrät, mitat ja hinta ovat kokovertailussa
       (`.koko-vertailu`), joten lause johdattaa taulukkoon eikä toista sitä.

       AIEMMIN POISTETTU (samana päivänä): "Pinta-ala ja huoneistotyyppi
       yllä ovat perusmallin." Se korjasi jälkikäteen väitteen jota ei olisi
       pitänyt esittää — *perusmalli* ei ole mikään kolmesta ostettavasta
       koosta vaan pienin niistä. Ks. AVOIMET.md kohdat 158 ja 176.       */
    taloTiivistelmaIngressi:
        'Arkkitehdin suunnittelema talo, jossa jokainen neliö on mietitty ' +
        'käyttöön. Talomalli on yksi ja varustetasoja kolme. Tasot eroavat ' +
        'piharakennuksessa ja autokatoksessa, joten talon runko ja ' +
        'pohjaratkaisu pysyvät samoina.',

    /* Vakio, joka on nimenomaan se mikä EI muutu koon mukana — ja se on
       kolmen koon uskottavuuden perusta: sama pohjaratkaisu on syy siihen,
       ettei hinta hajoa.

       20.8.2026: arvo kantaa nyt sanan "pohjaratkaisu" itse. Vakiot olivat
       aiemmin faktanauhassa, jossa labeli kertoi mistä on kyse; nauha
       purettiin yhdeksi riviksi ja labelit lähtivät sen mukana. Ilman sanaa
       rivillä lukisi pelkkä "Sama kaikissa koossa" — mikä on sama? */
    taloPohjaratkaisuVakio: 'Sama pohjaratkaisu kaikilla varustetasoilla',

    /* -- Kokovertailu (4 sivua) -----------------------------------------
       Taulukon rivi- ja saraketekstit. Sarakeotsikot EIVÄT ole täällä: ne
       johdetaan makuuhuoneiden määrästä kokoNimi()-funktiolla, jotta
       nimeämissääntö pysyy yhdessä paikassa (ks. talo-data.js).

       Hintarivin otsikko on SIVUKOHTAINEN eikä täällä: hintataso vaihtuu
       sivun mukaan (taso 1/2/3, ks. hintalogiikka tämän tiedoston alussa).
       Jos rivin otsikkoa ei anneta, hintariviä ei renderöidä lainkaan.     */
    /* Seloste on 20.8.2026 alkaen RUUDUNLUKIJALLE, ei näkyville:
       kävijä näkee kolme saraketta ja niiden otsikot, joten teksti toisti
       sen minkä taulukko jo sanoo. Se on silti taulukon nimi, ja sivulla
       on useampi taulukko — nimetön taulukko on ruudunlukijalla pelkkä
       "taulukko". Markupissa <caption class="visually-hidden">. */
    taloVertailuSeloste: 'Kolme varustetasoa vertailtuna',
    taloVertailuPintaAla: 'Pinta-ala',
    taloVertailuHuoneistotyyppi: 'Huoneistotyyppi',

    /* KERROSALA ON ERI LUKU KUIN PINTA-ALA, ja ero on ostajalle rahaa:
       rakennusoikeus lasketaan kerrosalasta, asuminen pinta-alasta.
       Arkkitehdin aineisto ilmoittaa molemmat samalla rivillä
       (*100 m² / 119 v-m²*), joten rivi ei ole prototyypin lisäys vaan
       lähteen oma tieto. Ilman sitä kävijä laskee tontin
       rakennusoikeuden väärällä luvulla — ja juuri se selviää vasta
       lupavaiheessa. Lisätty 28.9.2026. */
    taloVertailuKerrosala: 'Kerrosala',

    /* Hintaportaan otsikko. Neljällä sivulla sama lause, ja se kertoo mitä
       lista on: portaikko koon mukaan, ei valintalista. Ks. AGENTS.md
       sääntö 4 — portaassa ei ole valintamerkintää. */
    kokoHintaOtsikko: 'Hinta varustetason mukaan',

    /* -- Prosessiaskeleet ----------------------------------------------
       Neljä askelta esiintyivät kolmella sivulla eri sanamuodoin.
       Yhtenäistetty. Sivukohtainen otsikko on sivun omassa osiossa.      */
    prosessi: [
      { otsikko: 'Kerro tilanteesi',
        teksti:
          'Onko sinulla jo tontti, vai etsitkö valmista kohdetta? Alkuun ' +
          'riittää yksi keskustelu.' },
      { otsikko: 'Saat kiinteän hinnan',
        teksti:
          'Tutkimme maaperän ja annamme koko projektille yhden hinnan. ' +
          'Toista tarjousta ei tule.' },
      { otsikko: 'Rakennamme talosi',
        teksti:  'Haemme rakennusluvan, teemme maatyöt ja asennamme ' +
                 'elementtitalon. Rakennusvaihe kestää noin neljä ' +
                 'kuukautta.' },
      { otsikko: 'Maksat kun muutat sisään',
        teksti:  'Et maksa mitään rakennusaikana. Nostat pankkilainan ' +
                 'vasta kun talo on loppukatselmoitu ja avaimet ovat ' +
                 'sinun.' }
    ],
    /* Koko prosessin kesto ensimmäisestä keskustelusta muuttoon.
       AVOIMET.md D9 — rakennusvaihe on neljä kuukautta, mutta koko
       prosessin kestoa ei ole vahvistettu.

       Lause aukon ympärillä on oma avain, koska se esiintyy etusivulla
       kahdesti (prosessisektio ja UKK-vastaus) ja aukko itse on markupissa
       <span class="gap">-elementtinä — placeholder-tila paikkaa sen samaa
       reittiä kuin muutkin aukot. */
    /* Prosessilohkon mittari (etusivu, 30.9.2026). Lupaus on sivuston
       oma ja toistuu neljässä lauseessa: "Et maksa mitään rakennusaikana."
       Mittari sanoo saman luvulla, kun talo rakentuu sen vieressä. 0 € on
       copya eikä dataa, koska se ei ole hinta vaan lupauksen sisältö. */
    prosessiMittari:     'Olet maksanut rakennusaikana',
    prosessiMittariArvo: '0 €',
    prosessiKestoOtsikko:
      'Koko prosessin kesto ensimmäisestä keskustelusta muuttoon:',
    prosessiKesto: null,

    /* -- Rahoitus -------------------------------------------------------
       Kolme kappaletta tiivistetty yhdeksi. Vanha toisti saman asian
       kolmesti eri sanoin, mikä on tone of voicen vastaista: rakenna
       luottamus, älä väsytä.                                             */
    rahoitusOtsikko: 'Pankin kanssa on helppo puhua',
    rahoitusTeksti:
        'Talonrakentaminen tarkoittaa pankille yleensä epävarmoja ' +
        'laskelmia. Luotokodin kanssa tilanne on toinen: saat kiinteän ' +
        'loppuhinnan jo ensimmäisessä tarjouksessa, joten pankki tietää ' +
        'tarkalleen, mitä talo maksaa. Lainan nostat vasta, kun talo on ' +
        'valmis. Pankissa puhutaan lähinnä lyhennyksistä.',

    /* -- CTA-mikrocopy -------------------------------------------------- */
    ctaEiSido:       'Sitoutumatta mihinkään',
    /* Vastausaika on lause aukon ympärillä, ei pelkkä aukko: "Vastaamme" ja
       "kuluessa" toistuivat kuudella sivulla. Aukko renderöityy sisällä
       normaalisti, joten placeholder-tila paikkaa sen samaa reittiä kuin
       muutkin. Siksi tämä on data-copy-html eikä data-copy. */
    ctaVastausaikaHtml:
      'Vastaamme <span class="gap">[x arkipäivän]</span> kuluessa',
    ctaKerroAlue:    'Kerro alueesi',
    ctaPyydaHinta:   'Pyydä kiinteä hinta',
    ctaKatsoTalo:    'Katso talo ja pohjaratkaisu',
    ctaKatsoKohteet: 'Katso kohteet',
    /* Sama linkki etusivun ja talo-sivun hintablokissa: hintablokki on
       jaettu komponentti, joten sen linkkikin on. */
    ctaKohteetJaHinnat: 'Katso kohteet ja hinnat',
    /* Toissijainen polku talo-sivun ja Kohteet-sivun tyhjässä tilassa. */
    ctaOmaTontti: 'Minulla on oma tontti',
    /* Sama linkki kahdella sivulla (etusivu, talo.html). Sanamuoto on
       tarkoituksella eri kuin oma-tontti.html:n oma CTA "Tarkista tonttisi
       — 6 kysymystä": tämä on viittaus toiselle sivulle, se on sivun oma
       tekokehotus. Eri kohde, eri teksti — ks. TARKASTUS.md muutos 1. */
    ctaTarkistaTontti: 'Tarkista, sopiiko tonttisi',

    /* -- Aluekysely (R9) ------------------------------------------------
       Sivuston tehtävä versiossa 1 ei ole myydä vaan mitata kysyntää.    */
    alueOtsikko: 'Etkö löydä kohdetta omalta alueeltasi?',
    alueTeksti:
        'Kerro, mistä etsit kotia. Kartoitamme alueen tontit ja kerromme, ' +
        'mikä on mahdollista. Rakennamme koko Suomeen.',

    /* -- Polkuvalinta (etusivu + yhteystiedot) -------------------------- */
    polkuPakettiOtsikko: 'Osta talo ja tontti samassa paketissa',
    polkuPakettiKuvaus:  'Tontti, kaava ja rakennuslupa on jo hoidettu.',
    polkuOmaOtsikko:     'Rakenna talo omalle tontille',
    polkuOmaKuvaus:      'Tarkista muutamassa minuutissa, sopiiko tonttisi.',

    /* -- Loppu-CTA (etusivu + yhteystiedot + meistä) -------------------- */
    ctaOtsikko:  'Yksi keskustelu riittää alkuun',
    ctaIngressi:
        'Kerro, missä haluaisit asua, niin katsotaan, onko se mahdollista. ' +
        'Keskustelu ei sido sinua mihinkään, eikä siitä seuraa ' +
        'myyntisoittoja.',

    /* -- Nimen tarina (etusivu + meistä) -------------------------------- */
    nimiOtsikko: 'Koti lujalla pohjalla',
    nimiKoti:
        'ei ole pelkkä talo. Se on paikka, jonne haluat palata ja jossa ' +
        'viihdyt vuosia.',
    nimiLuoto:
        'on kotikuntamme nimi, ruotsiksi Larsmo. Luoto sijaitsee ' +
        'Pohjanmaan rannikolla, ja täällä saaristossa puurakentaminen ja ' +
        'käsityö ovat hioutuneet sukupolvien ajan. Sana luoto tarkoittaa ' +
        'myös kalliosaarta tai karia: jotain kiinteää ja turvallista, joka ' +
        'kestää kaikki säät.',

    /* -- Pohjaratkaisun perustelu (etusivu UKK + talo §06) -------------- */
    pohjaPerustelu:
        'Jo WC-istuimen tai kantavan seinän siirtäminen vaatii uudet ' +
        'piirustukset ja lisätyötä. Kun pohjaratkaisu pysyy samana, hinta ' +
        'pysyy alhaalla – ja sinulle jää varaa elää hyvin myös sen ' +
        'jälkeen, kun talo on maksettu.',

    /* -- Kartta (etusivu + meistä) -------------------------------------- */
    /* Etusivun toimialuesektio. Oli kovakoodattuna index.html:n markupissa,
       siirretty tänne 20.8.2026.

       VANHA OTSIKKO OLI VÄÄRÄ: "Toimimme siellä missä tunnemme maaperän"
       lukee ehtona ja rajauksena — kävijä päättelee siitä, että toimialue
       on jokin rajattu alue, ja sivun oma ingressi sanoi samaan aikaan
       "rakennamme koko Suomeen". Kartta näyttää neljä merkintää Pohjanmaan
       rannikolla, joten rajaava otsikko sai kartan näyttämään
       toimialuekartalta eikä esimerkkikartalta. R5: toimialue on koko
       Suomi.

       Uusi otsikko sanoo saman asian toisin päin: laajuus on lupaus,
       paikallisuus on menetelmä. "Alue kerrallaan" kertoo miksi kartalla on
       vain neljä merkintää — ei sitä että muualle ei tulla. Sama sisältö on
       Meistä-sivun otsikossa "Rakennamme koko Suomeen"; tämä on saman
       väitteen etusivuversio, jossa menetelmä on mukana. */
    /* SUOMENNOS 24.9.2026. "alue kerrallaan" poistettiin otsikosta: se
       lukee vaiheittaisena laajentumisena, ja asiakkaan päätös on koko
       Suomi nyt (vastaus 8.3).

       INGRESSI ON SAMA KUIN meista.toimialueIngressi, kuten ruotsissakin.
       Se kertoo että avaimia on yksi liikaa — lohko kuuluisi yhdeksi
       jaetuksi avaimeksi. Yhdistäminen on rakennemuutos eikä copya. */
    toimialueOtsikko: 'Rakennamme koteja koko Suomeen',
    toimialueIngressi:
        'Kotipaikkamme on Luoto, ja siellä olemme oppineet, mitä kiinteä ' +
        'hinta vaatii: kunta, urakoitsijat ja maaperä on tunnettava ennen ' +
        'kuin hinnan voi antaa. Jos olet jo löytänyt mieluisan ' +
        'paikkakunnan, autamme löytämään sieltä tontin Luotokoti-talolle.',

    /* Kartan kiinteät merkinnät. Kotipaikan nimi on COPY:ssa eikä
       markupissa nimenomaan siksi, että se on eri sana eri kielillä:
       kunnan suomenkielinen nimi on Luoto ja ruotsinkielinen Larsmo.
       Kovakoodattuna markupissa ruotsinkielisellä sivulla olisi kartalla
       suomenkielinen kunnan nimi — ja se on paikkakunta jossa yritys
       sijaitsee, eli juuri se sana joka on pakko olla oikein.

       Mittakaava on molemmilla kielillä sama, mutta se on täällä samasta
       syystä kuin muutkin kartan tekstit: kartta on yksi komponentti eikä
       puoliksi markupissa. */
    karttaKotipaikka:      'Luoto',
    karttaKotipaikkaRooli: 'kotipaikka',
    karttaMitta:           '100 km',

    karttaSeloste: 'Kartta Suomesta. Rakennamme koko maahan.',
    karttaLahde:
      'Rakennamme koko Suomeen. Kartalla merkittyinä kotipaikkamme ja ' +
      'kohteiden paikkakunnat. Kartta-aineisto: Natural Earth ' +
      '1:10 m, public domain.',

    /* -- Kuvapaikkojen selosteet ---------------------------------------- */
    phValmisTalo: 'Valmistunut talo ja asukkaat',
    phFotostil:
        'Brändikirjan ”Fotostil” on tyhjä – kuvamaailmaa ei ole määritelty',
    phRakennustapa: 'Elementtitalo',
    phLuoto:     'Luoto, kallioranta – tai puun vuosirenkaat',
    phLuotoMeta: 'Logotyypin O viittaa molempiin, ks. brändikirja'
  },

  /* ======================================================================
     PROTO — prototyypin oma teksti, joka näkyy sivulla
     Ei ohjauspalkkia eikä muistiinpanoja: ne jäävät markupiin. Nämä ovat
     täällä vain siksi, että ne esiintyvät identtisinä seitsemällä sivulla.
     ====================================================================== */
  proto: {
    /* Nämä kolme olivat kovakoodattuina seitsemällä sivulla kukin.
       Ne eivät ole asiakascopya vaan prototyypin omaa kromia, mutta
       eriytymisriski on sama kuin millä tahansa toistuvalla lauseella:
       21 kopiota, joista yhden korjaaminen jättää kaksikymmentä väärin.
       Muistiinpanot jäävät markupiin, koska ne ovat sivukohtaisia — nämä
       eivät ole. */
    varoitusLuvut:      'Luvut ovat kuvitteellisia',

    /* Sama varoitus footerissa. Ohjauspalkki on piilotettu 20.8.2026, ja
       placeholder on oletustila — ilman tätä sivulla olisi kuvitteellisia
       hintoja ilman yhtään merkintää siitä mistä ne ovat. Footerissa se on
       hiljainen mutta löydettävissä, ja se on nimenomaan se paikka josta
       lukija etsii vastuuvapautuksen. */
    varoitusLuvutOtsikko: 'Luvut ovat kuvitteellisia.',
    varoitusLuvutFooter:
      'Hinnat, pinta-alat ja nimet ovat esimerkkejä, joilla layoutia ja ' +
      'rivitystä voi arvioida oikeanmittaisilla teksteillä. Ne eivät ole ' +
      'Luotokodin tietoja.',
    footerRautalankaOtsikko: 'Prototyyppi.',
    footerFontitOtsikko:     'Fontit ovat sijaisia.',
    footerAvoimetAlku: 'Avoimet kysymykset on koottu tiedostoon',
    footerRautalanka:
      'Klikattava rautalanka rakenteen testaamiseen — ei valmis sivusto. ' +
      'Hakasulkeissa oleva sisältö puuttuu. Harmaat kehykset ovat ' +
      'kuvapaikkoja, valokuvia ei ole.',
    footerFontit:
      'Otsikot: Quicksand (lopullinen Cocon Pro). Leipäteksti: Nunito ' +
      'Sans (lopullinen Filson Soft). Cocon Pro ja Filson Soft ovat ' +
      'Adobe Fonts -fontteja eivätkä käytettävissä prototyypissä.',
    /* Muistiinpanotilan kytkin oli ohjauspalkissa, joka on piilotettu
       20.8.2026. Vanha lause kehotti kytkemään päälle jotain mitä ei enää
       näy — juuri se vanhentunut ohje jota AGENTS.md:n sääntö tarkoittaa. */
    footerAvoimet:
      '. Sivun muistiinpanot ja copy-statukset ovat prototyypin ' +
      'ohjauspalkin takana, ja palkki on tässä versiossa piilotettu.'

    /* kieliviesti POISTETTU 20.8.2026. Lause kertoi, ettei ruotsinkielinen
       sisältö kuulu prototyypin laajuuteen — AVOIMET.md kohta 36 avattiin
       uudelleen ja SV on nyt oikea kieliversio, joten viesti oli juuri se
       vanhentunut ohje jota AGENTS.md:n sääntö tarkoittaa. Markupista
       poistui samalla .lang__msg. */
  },

  /* ======================================================================
     SIVUKOHTAINEN
     ====================================================================== */

  etusivu: {

    /* -- Hero -----------------------------------------------------------
       Otsikko ja alarivi tulevat brändin asiakaslupauksesta: "Ett nytt hem
       till ett fast pris från första offert. Du betalar först när du
       flyttar in." Otsikko on lupauksen alkuosa, alarivi sen loppuosa. */
    heroOtsikko: 'Muuttovalmis koti kiinteällä hinnalla.',
    heroAlarivi:
        'Hoidamme kaiken rakennusluvasta avaimiin. Maksat vasta, kun ' +
        'muutat sisään.',

    /* -- Kolme lupausta -------------------------------------------------
       Sisältöstrategian kolme USP:tä sellaisenaan, sisältöä ei muutettu.
       Taulukkona eikä erillisinä avaimina, koska ne ovat yksi lohko ja
       niiden järjestys on osa argumenttia: hinta ensin (se on brändin
       lupaus), paketti toisena (se on tuote), maksuhetki kolmantena (se on
       se joka poistaa riskin).                                          */
    lupaukset: [
      { otsikko: 'Kiinteä hinta ensimmäisestä tarjouksesta',
        teksti:
          'Talonrakentamisessa budjetti pettää yleensä maatöissä. ' +
          'Luotokoti kantaa sen riskin. Kun tiedämme, mihin talo tulee, ' +
          'saat hinnan – ja siinä hinnassa pysytään.' },
      { otsikko: 'Avaimet käteen, kaikki samassa paketissa',
        teksti:
          'Tontti, rakennuslupa, maatyöt ja talo kiintokalusteineen. Sinun ' +
          'ei tarvitse toimia projektipäällikkönä eikä soitella ' +
          'alihankkijoiden perään.' },
      { otsikko: 'Maksat vasta, kun talo on valmis',
        teksti:
          'Vältät kaksinkertaiset asumiskulut rakennusaikana ja nostat ' +
          'pankkilainan vasta, kun saat avaimet.' }
    ],
    lupauksetYlaotsikko: 'Kolme lupausta',
    /* Sivun otsikko ja kuvaus. Markupin <title> sisältää latauksen ajan vain
       sanan "Luotokoti" — ei kahdennettua lausetta vaan brändinimi, joka on
       molemmilla kielillä sama. Koko otsikko tulee täältä, joten välilehden
       kieli seuraa sivun kieltä.

       Sivut ovat noindex, nofollow (AGENTS.md sääntö 7), joten kuvaus ei ole
       hakukonetekstiä. Se on täällä siksi, että linkin esikatselu
       (Slack, Teams, sähköposti) näyttää sen — ja prototyyppi kiertää
       nimenomaan linkkinä.                                                */
    sivuOtsikko: 'Luotokoti – muuttovalmis talo ja tontti kiinteällä hinnalla',
    sivuKuvaus:
        'Muuttovalmis talopaketti avaimet käteen: talo, tontti, ' +
        'rakennuslupa ja maatyöt kiinteään hintaan. Maksat vasta, kun ' +
        'muutat sisään.',

    lupauksetOtsikko: 'Näin talon ostaminen on helppoa',

    /* Etusivun hintanosto esittää TALON hinnan (taso 1). Se ei voi
       sisältää tonttia, koska etusivu ei tiedä sijainnista mitään.
       Aiempi copy väitti toisin ja lupasi kokonaishinnan ehdoitta. */
    hintaOtsikko:  'Yksi hinta, joka pitää',
    hintaIngressi:
      'Talon hinta on kiinteä. Kohteissa näet suoraan kokonaishinnan ' +
      'tontteineen.',
    /* VARUSTETASOT 30.9.2026. Lause puhui makuuhuonekokoista, jotka
       asiakkaan hinnoittelu poisti (AVOIMET.md 195). Faktakorjaus. */
    hintaSelite:
        'Hinta koskee vakiotasoa. Siihen sisältyvät rakennuslupa, maatyöt ' +
        'ja talo kiintokalusteineen. Tontin hinta vaihtelee kohteittain.',
    /* hintaLinkki SIIRRETTY 20.8.2026 → yhteinen.ctaKohteetJaHinnat.
       Sama lause oli myös talo.html:n hintablokissa kovakoodattuna, ja
       hintablokki on jaettu komponentti. */

    /* Kokovertailun hintarivi. Etusivulla luku on TALON hinta ilman tonttia
       — sama taso kuin sivun hintablokissa, jonka selite sanoo että tontin
       hinta vaihtelee kohteittain. Sana "kokonaishinta" ei kuulu tälle
       sivulle. Ks. hintalogiikka tiedoston alussa.                        */
    taloVertailuHinta: 'Talon hinta alkaen',

    faqOtsikko: 'Ensimmäiset kysymykset',

    /* -- UKK ------------------------------------------------------------
       Kuusi kysymystä, jokaiselle vastaus aineistosta. Yhtään kysymystä ei
       ole keksitty. Vastaukset ovat sisältöstrategian blokeista 1, 2 ja 4
       sekä USP-listasta.

       Kysymys ja vastaus ovat eri avaimet eikä yhtä HTML-lohkoa, koska
       <summary> ja vastauksen runko ovat eri elementtejä ja vastaus voi
       sisältää linkin tai aukon. Nimeäminen on aiheen mukaan (faqPaketti,
       faqMaksu, …) eikä numeroin: numerointi menee rikki heti kun
       kysymysten järjestys muuttuu, ja järjestys on UX-päätös.          */
    faqPakettiK: 'Mitä talo ja tontti samassa paketissa tarkoittaa?',
    faqPakettiV:
        'Tavallisesti talopaketti tarkoittaa pelkkää taloa, ja tontti, ' +
        'luvat ja maatyöt jäävät ostajan hoidettaviksi. Meillä ne kuuluvat ' +
        'samaan pakettiin: olemme jo ostaneet tontin, kaavoittaneet ' +
        'alueen, suunnitelleet talon ja hakeneet rakennusluvan. Sinä saat ' +
        'muuttovalmiin kodin kiinteään hintaan ilman paperitöitä.',
    /* Väite "oman terassin" on pehmennetty ja aukko on lauseen sisällä:
       lähde on aito (blokki 2, "egen trädgård och altan"), mutta terassi ei
       esiinny yhdessäkään talomallin ominaisuuslistassa. Siksi
       data-copy-html — aukko renderöityy lauseen sisällä ja
       placeholder-tila paikkaa sen samaa reittiä kuin muut. */
    /* TERASSIT RATKESIVAT 30.9.2026. Asiakas vastasi Miro-lapulla:
       *Talopaketin hintaan kuuluu 2 terassia + pergola. Lisärakennuksen
       hintaan kuuluu yksi terassi. Tämä pitää olla selkeää.* Aukko
       [terassi vahvistettava] on ollut auki elokuusta, koska brief ja
       lähdeaineisto olivat eri mieltä (AVOIMET.md 113). */
    faqPakettiV2Html:
        'Ostaminen muistuttaa uuden asunnon ostamista – paitsi että saat ' +
        'oman erillisen talon ja oman pihan. Talon hintaan kuuluvat kaksi ' +
        'terassia ja pergola.',
    faqPakettiLinkki: 'Katso, miten paketti toimii',

    faqMaksuK: 'Milloin maksan, ja mitä maksan rakennusaikana?',
    faqMaksuV:
        'Et maksa mitään rakennusaikana. Nostat pankkilainan vasta, kun ' +
        'talo on loppukatselmoitu ja avaimet ovat sinulla. Näin vältät ' +
        'kaksinkertaiset asumiskulut.',

    faqPohjaK: 'Voinko muuttaa pohjaratkaisua?',
    faqPohjaV:
        'Emme muuta pohjaratkaisua, ja se on tarkoituksellista. Talomalli ' +
        'on suunniteltu viimeistä yksityiskohtaa myöten niin, että se on ' +
        'nopea ja edullinen rakentaa. Jokainen putki ja seinä on ' +
        'paikallaan syystä.',

    faqOmaTonttiK: 'Mitä jos minulla on jo tontti?',
    faqOmaTonttiV:
        'Rakennamme myös omalle tontille. Talomalli on aina sama, joten ' +
        'tontin pitää sopia sille. Aloita tarkistuslistasta.',

    faqKestoK: 'Kauanko rakentaminen kestää?',
    faqKestoV:
        'Rakennusvaihe kestää noin neljä kuukautta. Talo rakennetaan ' +
        'tilauksesta, joten koko prosessin kesto riippuu tontista, luvasta ' +
        'ja omasta aikataulustasi.',

    faqHintaK: 'Onko hinta todella kiinteä?',
    faqHintaV:
        'On. Talonrakentamisessa budjetti pettää yleensä maatöissä, ja ' +
        'Luotokoti kantaa sen riskin. Kun tiedämme, mihin talo tulee, saat ' +
        'hinnan. Siinä hinnassa pysytään – toista tarjousta ei tule.',

    ukkCtaTeksti:
        'Jäikö jotain epäselväksi? Kysy suoraan – vastaamme hankaliinkin ' +
        'kysymyksiin.',

    /* -- Toimialue ja nimen tarina -------------------------------------- */
    ylaMissaRakennamme: 'Missä rakennamme',
    ctaLueMeista:       'Lue meistä',

    /* Nimitarinan päätöskappale. HUOM: sanoo lähes saman kuin
       yhteinen.luottamusIngressi ("Rakennamme näyttääksemme, että
       harkittua laatua voi toimittaa järkevään hintaan…") — sama
       alkuperäinen lause on sisältöstrategiassa blokin 5 lopussa ja
       brändikirjan arvoissa. Kaksi lähes identtistä lausetta samalla
       sivulla on copykysymys eikä koodikysymys, ja se on kirjattu
       AVOIMET.md:hen. Älä yhdistä niitä omin päin: nimitarinan versio
       päättyy sanoihin "luomme Luotokodin", mikä on tarinan loppu eikä
       luottamusväite. */
    /* SUOMENNOS 24.9.2026 — sama loppu kuin yhteinen.luottamusIngressissä,
       koska ruotsissakin ne ovat sama lause kahdessa muodossa. */
    nimiPaatos:
        'Haluamme näyttää, että laadukas talo ei vaadi suurta budjettia. ' +
        'Kokemuksella, maalaisjärjellä ja sisulla rakennamme Luotokodin.',

    /* Vanha versio sanoi "yhden, kahden tai kolmen makuuhuoneen kodin".
       Koot ovat 2/3/4.

       20.8.2026: avain oli faqPohjaKoot ja se alkoi keskeltä lausetta —
       markupissa luki "Talon <em>pituus</em>" ja copy jatkoi sanalla "sen
       sijaan". Puolikas lause ei ole käännettävissä: ruotsin sanajärjestys
       on eri, eikä kääntäjä voi siirtää korostusta jos se on markupissa.
       Nyt lause on kokonainen ja korostus sen sisällä (data-copy-html). */
    /* KASVUTAPA ON LISÄRAKENNUS, EI PÄÄTY (Olli 2.10.2026). Lause myi
       makuuhuoneiden lisäämistä talon päätyyn. Se oli vanhan kokomallin
       mekaniikka, jonka asiakkaan hinnoittelu korvasi 30.9.2026: kolme
       riviä ovat kolme varustetasoa SAMAAN taloon, ja lisätila tulee
       29 k-m²:n lisärakennuksesta. Isompi talo on eri malli.
       AVOIMET.md 261. */
    faqPohjaPituusHtml:
        'Lisätilaa saat sen sijaan <em>lisärakennuksesta</em>: erillinen ' +
        '29 kerrosneliön rakennus pihalle, omalla rakennusluvallaan. ' +
        'Talomalli itse pysyy samana — jos tarvitset isomman talon, se on ' +
        'eri malli.',

    prosessiOtsikko: 'Neljä vaihetta, ja me hoidamme ne puolestasi'
  },

  talo: {

    /* -- Sektioiden yläotsikot ------------------------------------------
       Tämän sivun omat: ne nimeävät tuotesivun sektioita eivätkä toistuvia
       lohkoja, joten ne eivät kuulu yhteinen.yla-ryhmään.

       "Arkkitehtioptimoitu konseptitalo" on heron yläotsikko ja sivun ainoa
       vahvistettu sisältö: termi on päätetty ja perusteltu
       sisältöstrategiassa (arkkitehti on ollut mukana kehittämässä mallia).
       Älä pehmennä sitä muotoon "arkkitehdin suunnittelema" — perustelu on
       nimenomaan siinä, että optimointi on tehty rakennettavuuden ehdoilla. */
    ylaKonseptitalo:     'Arkkitehtioptimoitu konseptitalo',
    ylaPohjaratkaisu:    'Pohjaratkaisu',
    ylaSauna:            'Saunarakennus',
    ylaValinnat:         'Valinnat',
    ylaTekniset:         'Tekniset tiedot',
    ylaMiksiEiMuuteta:   'Miksi emme muuta pohjaratkaisua',
    ylaMyohemmin:        'Myöhemmin',
    ylaTalonHinta:       'Talon hinta',
    ylaSaatavuus:        'Saatavuus',

    /* -- Kokovalitsin ---------------------------------------------------
       Painikkeiden tekstit EIVÄT ole täällä: ne johdetaan makuuhuoneiden
       määrästä kokoNimi()-funktiolla (talo-data.js). Vain valitsimen oma
       otsikko ja sen alahuomio ovat copya.                               */
    kokoValitsinOtsikko: 'Valitse varustetaso',
    /* VARUSTETASOT 30.9.2026 — sarakkeet eivät ole enää kokoja. */
    kokoValitsinHuomio:
        'Sama talo kolmella varustetasolla. Valintasi näkyy myös muiden ' +
        'sivujen hintatiedoissa.',

    /* Avainlukujen selitteet. Arvot tulevat talo-data.js:stä ja ovat
       aukkoja; selitteet ovat copya. HUOM: "Pinta-ala" on myös
       kokovertailun rivinä (yhteinen.taloVertailuPintaAla) — sama sana, eri
       paikka, eikä sama avain: vertailussa se on taulukon rivi ja täällä
       yhden koon avainluku. Jos toinen niistä joskus muuttuu, toinen ei
       muutu mukana. */
    faktaPintaAla:      'Pinta-ala',
    faktaHuoneet:       'Huoneet',
    faktaKerrokset:     'Kerrokset',
    faktaEnergialuokka: 'Energialuokka',

    /* -- Pohjaratkaisun kolme perustelua --------------------------------
       Nämä eivät ole talon ominaisuuksia vaan suunnitteluperiaatteita:
       jokainen kertoo mitä on ajateltu ennen kuin piirrettiin. Siksi ne
       ovat copya eivätkä talo-data.js:n faktoja — mitään mittaa tai
       materiaalia ei väitetä.                                            */
    pohjaKortit: [
      { otsikko: 'Ikkunat ilmansuunnan mukaan',
        teksti:
          'Ikkunoita ei ole sijoitettu julkisivun ehdoilla. Jokainen on ' +
          'siinä ilmansuunnassa, josta valo tulee silloin, kun huonetta ' +
          'käytetään.' },
      { otsikko: 'Säilytystila suunniteltiin ensin',
        teksti:
          'Säilytystila on ollut osa pohjaratkaisua alusta asti. Sitä ei ' +
          'ole ahdettu siihen, mikä jäi jäljelle huoneiden jälkeen.' },
      { otsikko: 'Kulkureitit arjen mukaan',
        teksti:
          'Kulku ulko-ovelta keittiöön ja huoneesta toiseen on mitoitettu ' +
          'sen mukaan, miten talossa oikeasti liikutaan päivän aikana.' }
    ],

    /* -- Tekniset tiedot ------------------------------------------------ */
    teknisetOtsikko: 'Tekniset tiedot ja takuut',
    /* Varaus PDF:stä. Tiedostoa ei ole, joten latauslinkkiä ei ole
       rakennettu — ja se sanotaan ääneen sen sijaan että sivulla olisi
       linkki joka ei lataa mitään. */
    teknisetPdf:
      'Laajemmat tekniset tiedot tulevat ladattavaksi PDF:nä. Tiedostoa ei ' +
      'ole vielä olemassa, joten latauslinkkiä ei ole rakennettu.',

    /* -- Miksi pohjaa ei muuteta ----------------------------------------
       Sisältöstrategian blokki 4 sellaisenaan. Kolmas kappale on
       yhteinen.pohjaPerustelu (sama teksti on etusivun UKK-vastauksessa),
       joten se ei ole täällä.                                            */
    miksiOtsikko:
        'Laadukas talo, joka on edullinen rakentaa',
    miksiKappale1:
        'Luotokodissa on laadukkaat materiaalit, kestävät lattiat ja ' +
        'harkitut yksityiskohdat. Kun rakennamme fiksusti ja pysymme ' +
        'suunnitelmassa, voimme tarjota laatutalon yllättävän edullisesti.',
    miksiKappale2:
        'Talomalli on suunniteltu viimeistä yksityiskohtaa myöten niin, ' +
        'että rakennustiimi voi tehdä työnsä mahdollisimman tehokkaasti. ' +
        'Jokainen putki ja seinä on paikallaan syystä.',
    /* Lisätty kappale, joka ratkaisee näennäisen ristiriidan: sivulla on
       kokovalitsin ja samalla sivulla sanotaan ettei pohjaa muuteta.
       Lukija huomaa sen, joten se sanotaan ääneen. */
    /* SUOMENNOS 24.9.2026. Copywriter kirjoitti ruotsin uusiksi: loppu ei
       enää päätä väittelyä kompromissista vaan ohjaa yhteydenottoon.
       Tämä on se lause jonka hän tyhjensi elokuussa. */
    /* KASVUTAPA ON LISÄRAKENNUS, EI PÄÄTY (Olli 2.10.2026). Lause myi
       makuuhuoneiden lisäämistä talon päätyyn. Se oli vanhan kokomallin
       mekaniikka, jonka asiakkaan hinnoittelu korvasi 30.9.2026: kolme
       riviä ovat kolme varustetasoa SAMAAN taloon, ja lisätila tulee
       29 k-m²:n lisärakennuksesta. Isompi talo on eri malli.
       AVOIMET.md 261. */
    miksiKappale4:
        'Seiniä emme siirrä, eikä talon pituus muutu. Lisätilan saat ' +
        'lisärakennuksesta, ja jos tarvitset isomman talon, se on eri ' +
        'malli. Ota yhteyttä, niin selvitämme, mikä sinun tontillesi sopii.',

    galleriaOtsikko: 'Miltä talo näyttää',

    /* -- Kierros talossa (29.9.2026) ------------------------------------
       Scrollytelling-lohko heron jälkeen: katto nousee pois, pohja näkyy,
       ja vyöhykkeet korostuvat askel kerrallaan. Kuva on tyokalut/
       riso3d.py:n malli arkkitehdin pohjapiirustuksesta.

       Askelten lauseet kertovat vain sen minkä piirustus näyttää:
       huoneiden paikat, ovet ja naapuruudet. EI mittoja (ne ovat
       POHJA_RISO:ssa ja nimikkeissä kuvan päällä), EI lupauksia
       äänieristyksestä, valosta tai tuulensuojasta — niistä piirustus ei
       kerro mitään. Piharakennuksen vakiotaso sanotaan samoin kuin
       saunasektiossa: siinä ei ole saunaa.                              */
    ylaKierros:     'Kierros talossa',
    kierrosOtsikko: 'Talo kerros kerrallaan',
    kierrosIngressi:
      'Vieritä alaspäin, niin katto nousee pois ja näet, miten talo on ' +
      'jaettu.',
    /* Talon heron värinvaihdin (1.10.2026). Värien kuvaukset ovat datan
       arvoja (TALO.julkisivut) ja kääntyvät sanakirjan kautta. */
    variOtsikko: 'Valitse julkisivun väri',
    kierrosUlkoOtsikko: 'Yksi kerros, yksi harjakatto',
    kierrosUlkoTeksti:
        'Risö 100+ on yksikerroksinen harjakattoinen omakotitalo. Pihalla ' +
        'on erillinen piharakennus, ja niiden välissä on terassi pergolan ' +
        'alla.',
    kierrosPohjaOtsikko: 'Katon alla',
    kierrosPohjaTeksti:
      'Kun katto nostetaan pois, koko pohja näkyy kerralla. Kaikki huoneet ' +
      'ovat samassa tasossa.',
    kierrosYhteinenOtsikko: 'Yhteinen tila keskellä',
    kierrosYhteinenTeksti:
      'Olohuone ja keittiö ovat talon keskellä yhtenä tilana. Pariovi ' +
      'avautuu suoraan terassille.',
    kierrosMakuuOtsikko: 'Makuuhuoneet päädyissä',
    kierrosMakuuTeksti:
      'Makuuhuoneet ovat talon päädyissä, erillään yhteisestä tilasta: ' +
      'toisessa päädyssä yksi, toisessa kaksi.',
    kierrosMarkaOtsikko: 'Arjelle oma ovi',
    kierrosMarkaTeksti:
      'Kodinhoitohuoneella on oma ulko-ovi, ja kylpyhuone ja WC ovat sen ' +
      'vieressä. Kuraiset vaatteet eivät kulje olohuoneen kautta.',
    kierrosPihaOtsikko: 'Terassi talon ja piharakennuksen välissä',
    kierrosPihaTeksti:
        'Terassia rajaavat kahdelta sivulta talo ja piharakennus. ' +
        'Piharakennuksen käytön valitset itse: vakiotasossa se on kylmä ' +
        'varasto ja harrastetila.',
    /* Nimilappu kuvan päällä. Huoneiden nimet tulevat POHJA_RISO:sta;
       piharakennuksella ei ole siellä omaa riviä, koska piirustus nimeää
       vain sen huoneet. */
    kierrosPiha: 'Piharakennus',
    /* Varaus kuvan alla. Sama periaate kuin pohjaVarauksessa: täsmennys,
       ei markkinointia. Värit on sanottava, koska julkisivun väri on auki
       (AVOIMET.md 200) ja malli on piirretty brändipaletilla. */
    kierrosVaraus:
      'Malli on piirretty arkkitehdin konseptivaiheen pohjapiirustuksesta. ' +
      'Korkeudet on arvioitu visualisoinneista, eivätkä kuvan värit ole ' +
      'julkisivuvaihtoehto.',

    /* -- Laajennus muuton jälkeen ---------------------------------------
       Copy on tarkoituksella varovainen: se kertoo mahdollisuuden ja siitä
       seuraavan hyödyn, mutta ei sano sanaa vaivattomuudesta,
       aikataulusta eikä hinnasta. Nämä kolme ovat juuri ne joita ei voi
       luvata ennen kuin lupakysymys on selvä (AVOIMET.md 106–110).       */
    /* SUOMENNOS 24.9.2026. Otsikko oli lupaus, nyt se on mahdollisuus:
       asiakas vahvisti ettei laajennus sisälly alkuperäiseen lupaan eikä
       perustusta rakenneta valmiiksi (vastaukset 1.3 ja 1.4). */
    /* KASVUTAPA ON LISÄRAKENNUS, EI PÄÄTY (Olli 2.10.2026). Lause myi
       makuuhuoneiden lisäämistä talon päätyyn. Se oli vanhan kokomallin
       mekaniikka, jonka asiakkaan hinnoittelu korvasi 30.9.2026: kolme
       riviä ovat kolme varustetasoa SAMAAN taloon, ja lisätila tulee
       29 k-m²:n lisärakennuksesta. Isompi talo on eri malli.
       AVOIMET.md 261. */
    /* Suomi seuraa nyt ruotsia, joka päivitettiin copywriterin 29.9.
       työssä lisärakennusmalliin. Ennen tätä sama lohko kertoi eri
       tarinan kielittäin (AVOIMET.md 262). */
    laajennusOtsikko: 'Lisärakennus myöhemmässä vaiheessa',
    laajennusTeksti:
        'Mahdollisuus valita lisärakennus eri sisällöillä on tapamme antaa ' +
        'sinulle liikkumavaraa. Voit rakentaa sen heti tai myöhemmin, kun ' +
        'perhe tarvitsee lisää tilaa. Myöhemmin rakennettava lisärakennus ' +
        'vaatii oman rakennusluvan.',
    /* Kolme estävää kysymystä. Nämä EIVÄT ole puuttuvaa copya vaan
       päätöksiä, joista riippuu onko yllä oleva kappale lupaus vai vihje.
       Kysymysmuoto on tarkoituksellinen — älä käännä niitä väitteiksi. */
    /* SUOMENNOS 24.9.2026. Kaksi kolmesta kysymyksestä on vastattu ja
       muuttuu vastaukseksi; takuu jää kysymykseksi. */
    laajennusKysymysLupa:  'Myöhempi laajennus vaatii oman rakennusluvan',
    laajennusKysymysHinta: 'Saat laajennukselle kiinteän hinnan kun se on ajankohtainen',
    laajennusKysymysTakuu: 'Miten se vaikuttaa takuuseen?',
    /* SUOMENNOS 24.9.2026. */
    laajennusVaraus:
      'Takuukysymys on yhä vastaamatta: sitä, miten myöhempi laajennus ' +
      'vaikuttaa alkuperäisen talon takuuseen, ei ole ratkaistu. ' +
      'Rakennuslupa ja hinta on vastattu, ja ne lukevat vastauksina yllä.',
    /* Erottelu polkujen välillä: epävarmuus merkitään vain siihen polkuun
       johon se kuuluu. Yleinen "ehkä" tekisi tiedossa olevasta
       vastauksesta epävarman. */
    laajennusKohdeOtsikko: 'Jos ostat kohteesta',
    laajennusKohdeTeksti:
        'Tontti on meidän, joten tiedämme etukäteen, mitä kaava sallii. ' +
        'Laajennusmahdollisuus näkyy kohteen tiedoissa, eikä sitä tarvitse ' +
        'selvittää erikseen.',
    laajennusOmaOtsikko: 'Jos rakennat omalle tontille',
    laajennusOmaTekstiHtml:
        'Laajennusmahdollisuus riippuu tontin koosta, kaavasta ja ' +
        'rakennusoikeudesta. Selvitämme sen ennen kuin sitoudut mihinkään. ' +
        /* RATKESI 5.10.2026: "Utredningens längd ca 2 veckor." */
        'Selvitys kestää noin kaksi viikkoa.',

    /* Listan otsikko. Pari "mitä sisältyy / mihin raja menee" on sektion
       otsikossa (sisaltyyOtsikko); tämä nimeää vain listan. */
    sisaltyyLabel: 'Sisältyy talon hintaan',

    /* -- Saatavuus ------------------------------------------------------ */
    saatavuusOtsikko:  'Missä tämä talo on nyt saatavilla',
    saatavuusIngressi:
        'Sama talo eri paikkakunnilla. Kohteissa tontti, kaava ja ' +
        'rakennuslupa ovat jo valmiina.',
    ctaKaikkiKohteet: 'Katso kaikki kohteet',
    /* Tyhjä tila EI ole tyhjä osio vaan aluekysely: jos kohteita ei ole,
       oikea kysymys kävijälle on "missä haluaisit asua" — ja se on juuri se
       tieto jota R9 tarvitsee. */
    tyhjaOtsikko: 'Missä haluaisit asua?',
    tyhjaTeksti:
        'Juuri nyt avoimia kohteita ei ole. Kerro, millä alueella etsit ' +
        'kotia, niin kartoitamme alueen tontit ja kerromme, mikä on ' +
        'mahdollista. Rakennamme koko Suomeen.',

    /* -- Loppu-CTA ------------------------------------------------------
       Tuotesivulta ei ohjata suoraan yhteydenottoon vaan ostopolulle:
       kävijä ei vielä tiedä kumpaan tilanteeseen hän kuuluu.
       1.10.2026: painikkeita on kaksi (kohteet, kiinteä hinta) — oma tontti
       -painike poistui (Olli), joten otsikko ei enää oleta kahta tilannetta.
       Kiinteän hinnan pyyntö kattaa oman tontin tapauksen. */
    ctaOtsikko:  'Mistä aloitetaan?',
    ctaIngressi:
      'Katso kohteet, joissa tontti on jo valmiina. Jos sinulla on oma ' +
      'tontti, pyydä kiinteä hinta.',
    polkuKohdeKuvaus:
        'Talo ja tontti samassa paketissa. Kaava ja rakennuslupa on jo ' +
        'hoidettu.',
    polkuOmaOtsikko: 'Rakennamme omalle tontillesi',
    polkuOmaKuvaus:
        'Tarkista muutamassa minuutissa, sopiiko tonttisi talomallille.',
    sivuOtsikko: 'Talomalli Risö 100+ – Luotokoti',
    sivuKuvaus:
        'Muuttovalmis omakotitalo avaimet käteen: pohjaratkaisu, ' +
        'varustetasot, talon hintaan sisältyvät asiat ja syy siihen, miksi ' +
        'pohjaa ei muuteta.',

    /* TASO 1. Sana "kokonaishinta" ei esiinny tällä sivulla hintaa
       kuvaamassa — tuotesivu hinnoittelee tuotteen, ei pakettia. */
    hintaOtsikko:  'Talon hinta',
    hintaIngressi:
        'Yksi hinta, joka kattaa talon, rakennusluvan ja maatyöt. Toista ' +
        'tarjousta ei tule.',
    /* VARUSTETASOT 30.9.2026. Lause puhui makuuhuonekokoista, jotka
       asiakkaan hinnoittelu poisti (AVOIMET.md 195). Faktakorjaus. */
    hintaSelite:
        'Perushinta koskee vakiotasoa. Lisärakennus ja autokatos maksavat ' +
        'erikseen. Tontti ei sisälly tähän hintaan: kohteissa näet ' +
        'kokonaishinnan tontteineen, ja omalle tontille rakennettaessa ' +
        'tontti on jo sinun.',

    /* §02 · Pohjaratkaisu. Otsikko ja ingressi olivat kovakoodattuina
       markupissa, ja ingressi oli kahdessa palassa kahdessa sektiossa:
       "piirretty arjelle" pohjasektiossa ja "suunniteltu laajennettavaksi"
       heron huomautuslaatikossa. Ne ovat sama argumentti — pohja on
       piirretty elämiselle, ja siihen kuuluu että elämä muuttuu — joten ne
       on yhdistetty yhdeksi kappaleeksi 20.8.2026.

       Ehdollisuus (kannattaako suurempi koko juuri sinun tontillasi) on
       kappaleen sisällä eikä omassa huomautuslaatikossaan: laatikko nosti
       ehdon lupaustasolle, vaikka se on nimenomaan varaus. */
    pohjaOtsikko: 'Pohja on suunniteltu arkea varten',

    /* Varaus pohjapiirustuksen alla. EI markkinointia vaan täsmennys.

       SYY VAIHTUI 28.9.2026. Aiemmin varaus koski MITTATARKKUUTTA: kuva
       oli piirretty uudelleen valokuvasta ±100 mm:n tarkkuudella, joten
       siitä ei voinut mitata. Nyt kuva on arkkitehdin oma vektoripiirustus
       eikä poikkeamaa ole — mutta piirustus on KONSEPTIVAIHEEN kuva
       (HELST, SKEDE 2, 25.9.2026) eikä rakennuslupakuva. Varaus jää siis
       paikalleen ja sanoo nyt sen mikä on totta: yksityiskohdat
       tarkentuvat, mitat eivät ole arvioita. Ks. AVOIMET.md kohta 165. */
    pohjaVaraus:
      'Arkkitehdin konseptivaiheen pohjapiirustus. Huoneiden pinta-alat ' +
      'ovat piirustuksen omia; yksityiskohdat tarkentuvat ' +
      'rakennussuunnitelmissa.',
    pohjaIngressi:
        'Pohja on piirretty arkea varten: missä huoneessa ollaan mihinkin ' +
        'aikaan päivästä, minne tavarat menevät ja miten talon läpi ' +
        'kuljetaan. Voit rakentaa talon nyt ja lisärakennuksen myöhemmin, ' +
        'kun tarvitsette lisää tilaa. Sopiiko lisärakennus juuri sinun ' +
        'tontillesi, riippuu tontin koosta ja rakennusoikeudesta – ' +
        'kerromme sen ennen kuin sitoudut mihinkään.',

    /* Kaksi polkua, yksi ero. Talon hinta on kiinteä molemmissa —
       kokonaishinta ei ole sama asia, ja sekaannus siinä on tämän sivun
       helpoin väärinymmärrys. Kohteessa maaperä on tutkittu ja tontti
       meidän, joten kokonaishinta on tiedossa heti. Omalla tontilla
       maaperä on tuntematon, ja maatöiden osuus on juuri se mikä puuttuu.

       Maaperätutkimus on asiakkaalle maksuton ja me tilaamme sen (R4,
       workshop 18.8.2026). Ilman sitä lause lukisi ehtona; sen kanssa se
       lukee palveluna.

       Sana "kokonaishinta" esiintyy tässä, mutta EI tämän sivun hintaa
       kuvaamassa — se kuvaa mitä muualla saa. Sääntö 2 pitää. */
    hintaPolut:
        'Talon hinta on kiinteä kummassakin tapauksessa. Kokonaishinta ' +
        'riippuu tontista. Kohteissa tontti on jo meidän ja maaperä ' +
        'tutkittu, joten saat kokonaishinnan heti. Omalle tontille ' +
        'rakennettaessa kokonaishinta vahvistuu, kun maaperä on tutkittu. ' +
        'Tilaamme tutkimuksen itse, eikä se maksa sinulle mitään.',

    /* SUOMENNOS 24.9.2026. Painopiste siirtyi rajasta sisältöön
       (asiakkaan vastaukset 1.1 ja 3.1). */
    sisaltyyOtsikko: 'Tämä sisältyy talon hintaan',
    sisaltyyIngressi:
        'Kiinteä hinta merkitsee jotain vain, jos tiedät, mitä siihen ' +
        'kuuluu. Siksi kerromme suoraan, mitä talon hintaan sisältyy – ' +
        'ilman epämääräisiä muotoiluja ja pienellä painettuja poikkeuksia. ' +
        'Tiedät, mitä rahalla saat, ennen kuin lapio osuu maahan.',

    /* Raja yhtenä lauseena listan alla, ei tyhjänä sarakkeena listan
       vierellä. Aukko on tässä yhden lauseen mittainen: se kertoo mitä
       puuttuu ilman että puolet lohkosta on tyhjää.

       ÄLÄ täytä aukkoa arvaamalla. Väärä poissulkulista on pahempi kuin
       tyhjä: se on lupaus jota ei ole tarkistettu, ja juuri siihen
       kilpailijat ovat kompastuneet. Ks. AVOIMET.md kohdat 22 ja 170. */
    sisaltyyRajaHtml:
        'Talon hintaan eivät sisälly <span class="gap">[rajaus — ' +
        'täydennettävä]</span>. Tontti ei kuulu kumpaankaan listaan, koska ' +
        'se riippuu siitä, rakennetaanko talo kohteeseen vai omalle ' +
        'tontille.',

    /* §05 · R6 (workshop 18.8.2026). Sektio oli aiemmin kysymys — "onko
       valintoja lainkaan" — ja on nyt sisältöä. Valinta tehdään valmiin
       linjan tasolla, ei komponentti kerrallaan; tyylien nimet ja
       kuvaukset ovat talo-data.js:n TALO.tyylit-taulukossa. */
    valinnatOtsikko: 'Kolme sisustustyyliä',
    valinnatIngressi:
        'Pohjaratkaisu on kaikille sama. Sisustuksen valitset kolmesta ' +
        'arkkitehdin kokoamasta kokonaisuudesta: et valitse jokaista ' +
        'materiaalia erikseen, vaan yhden valmiin linjan.',
    /* "Sivun alusta" oli totta kun kokovalitsin oli herossa. Valitsin on
       nyt edellisessä sektiossa, joten viittaus on "yllä". */
    valinnatAlahuomio:
      'Varustetason valitset yllä. Tämä valinta koskee pintoja ja ' +
      'kalusteita.',

    /* Materiaalipaletti. Se EI ole neljäs tyyli eikä valinta: aineistossa
       on yksi paletti, joka toistuu kaikissa sisäkuvissa samanlaisena.
       Kuva on tässä sektiossa siksi että sektio kertoo mistä talo on
       tehty — ja sana *alustava* on aineiston oma (`Preliminär färg- och
       materialpalett`). Sitä ei saa pudottaa pois: paletti joka esitetään
       päätettynä on lupaus jota kukaan ei ole antanut. */
    palettiOtsikko: 'Talon materiaalimaailma',
    palettiSeloste:
      'Arkkitehti on koonnut talolle yhden väri- ja materiaalipaletin: ' +
      'vaaleaa puuta, savenpunaista laattaa, vaaleaa kiveä ja pehmeää ' +
      'vihreää. Paletti on alustava, ja kolme sisustustyyliä rakentuvat ' +
      'sen päälle.',

    /* §02b · SAUNARAKENNUS (28.9.2026). Uusi sektio. Arkkitehdin aineisto
       ratkaisi kysymyksen joka oli auki koko prototyypin ajan
       (AVOIMET.md 19): sauna on olemassa, mutta se on ERILLINEN
       29 kerrosneliön rakennus eikä osa talon sataa neliötä.

       OTSIKKO ON LÄHTEEN OMA LAUSE. Aineiston oma teksti on
       "från kallt förråd till lyxig bastu, enligt eget behov" — ruotsiksi
       se on lähde, suomeksi käännös.

       VAKIOTASO ON SANOTTAVA ÄÄNEEN. Sana *saunaoptio* luetaan niin että
       sauna kuuluu hintaan. Vakiotasossa on kylmä varasto ja kylmä
       harrastetila, eikä saunaa ole — ja se on oma lauseensa omalla
       rivillään, ei alaviite. */
    saunaOtsikko: 'Kylmävarastosta saunaan, tarpeen mukaan',
    saunaIngressi:
        'Talon pihalla on erillinen 29 kerrosneliön rakennus. Sen koko on ' +
        'aina sama, mutta käytön valitset kuudesta vaihtoehdosta pelkästä ' +
        'varastosta vierashuoneen ja saunaosaston yhdistelmään. ' +
        'Rakennuksen neliöt eivät sisälly talon asuinpinta-alaan eivätkä ' +
        'talon hintaan.',
    saunaVakioHuomio:
        'Vakiotasossa ei ole saunaa. Rakennuksessa on kylmä ulkovarasto ja ' +
        'kylmä harrastetila, joihin on tehty viemärivaraus. Saunan voi ' +
        'siis rakentaa myöhemmin ilman rakenteellisia muutoksia.',
    saunaAlahuomio:
      'Pohjapiirustuksessa yllä rakennus on piirretty vaihtoehtona 4.'
  },

  kohteet: {

    /* -- Hero, kaksi omistusmallia --------------------------------------
       Sivulla on kaksi versiota jokaisesta hero-lauseesta, koska
       omistusmalli on yhä auki (ohjauspalkin vaihdin A/B). A = Luotokoti
       omistaa tontin, B = varaus kunnan tontteihin. Avainten pääte kertoo
       kumpi: kun päätös tehdään, toinen sarja poistetaan kokonaan.       */
    heroOtsikkoA: 'Kohteet, joissa kaikki on jo ratkaistu',
    heroAlariviA:
      'Kohde on alue, jolla tontti on ostettu, kaava tehty, talo piirretty ' +
      'ja rakennuslupa hoidettu. Sinulle jää kaksi asiaa: valinta ja ' +
      'sopimus.',
    ctaSelaaKohteita: 'Selaa kohteita',

    heroOtsikkoB: 'Varaa kunnan tontti, me rakennamme talon',
    heroAlariviBHtml:
      'Kunta kaavoittaa alueen ja jakaa tontit. Me hoidamme talon, luvan ja ' +
      'maatyöt. <span class="gap">[vahvistettava]</span>',
    ctaKatsoAlueet: 'Katso alueet',

    /* -- Mitä on jo ratkaistu (A ja B) ---------------------------------- */
    ylaRatkaistu: 'Mitä on jo ratkaistu',
    ratkaistuOtsikkoA: 'Hankalat asiat on hoidettu valmiiksi',
    /* Terassiväite on pehmennetty ja aukko on lauseen sisällä — sama
       ratkaisu kuin etusivun UKK-vastauksessa (etusivu.faqPakettiV2Html).
       Lähde on aito (blokki 2, "egen trädgård och altan"), mutta terassi ei
       esiinny yhdessäkään talomallin ominaisuuslistassa. */
    ratkaistuTekstiAHtml:
        'Ostaminen muistuttaa uuden asunnon ostamista – paitsi että saat ' +
        'oman erillisen talon ja oman pihan. Sinun ei tarvitse hakea ' +
        'rakennuslupaa eikä sovittaa talomallia hankalalle tontille. Talon ' +
        'hintaan kuuluvat kaksi terassia ja pergola.',
    ratkaistuTicksA: [
      'Tontti ostettu', 'Alue kaavoitettu', 'Talo piirretty',
      'Rakennuslupa hoidettu'
    ],

    ratkaistuOtsikkoB: 'Kunta hoitaa alueen, me hoidamme talon',
    ratkaistuTekstiB:
      'Työnjako on selvä: kunta kaavoittaa ja jakaa tontit, me vastaamme ' +
      'talosta ja rakentamisesta.',
    /* B-mallin lista on kahta riviä lyhyempi kuin A:n, ja loput kaksi riviä
       ovat aukkoja markupissa: kaavoittaja on tiedossa, luvan hakija ja
       maatöiden vastuu eivät. Sulkeissa oleva toimija on osa riviä. */
    ratkaistuTicksBHtml: [
      'Alue kaavoitettu <span class="small">(kunta)</span>',
      'Talo piirretty <span class="small">(Luotokoti)</span>'
    ],

    /* -- Listaus (A) ja alueet (B) -------------------------------------- */
    ylaKohteet:      'Kohteet',
    listausOtsikko:  'Myynnissä olevat kohteet',
    listausIngressi: 'Jokaisessa kohteessa rakennuslupa on jo hoidettu ja hinta on kiinteä.',
    /* Tyhjä tila ei ole tyhjä osio vaan kysyntämittari (R9): jos kohteita ei
       ole, kysytään aluetta. */
    tyhjaOtsikko: 'Uudet kohteet avautuvat erissä',
    tyhjaTeksti:
        'Rakennamme kohteen, kun tiedämme, että sille on kysyntää. Kerro, ' +
        'millä alueella etsit kotia, niin kartoitamme alueen tontit – tai ' +
        'katso, onnistuisiko rakentaminen omalle tontillesi.',

    ylaAlueet:       'Alueet',
    alueetOtsikko:   'Alueet, joilla tontin voi varata',
    alueetIngressiHtml:
      'Tontin varaus tehdään kuntaan. Me tulemme mukaan siitä eteenpäin. ' +
      '<span class="gap">[prosessi vahvistettava]</span>',
    /* B-mallin esimerkkirivin selitteet. Arvot ovat aukkoja markupissa. */
    alueetTontteja: 'Tontteja:',
    alueetVaraus:   'Varaus:',
    alueetTaloHinta: 'Talon hinta:',

    /* -- Vertailu: yhdeksän vaihetta ------------------------------------
       Sivun vahvin yksittäinen argumentti, ja se on rakenteeltaan
       herkkä: kaksi saraketta, joissa on SAMAT yhdeksän vaihetta samassa
       järjestyksessä. Yliviivaus oikeassa sarakkeessa on se mikä kertoo
       tarinan, ja se toimii vain jos rivit vastaavat toisiaan rivi riviltä.

       Siksi vaiheet ovat YKSI taulukko eikä kaksi: jos vasen ja oikea
       sarake olisivat eri avaimissa, käännöksessä (tai copy-editorissa)
       niistä tulisi eri sanamuotoja — ja koko vertailu hajoaisi.

       Oikean sarakkeen kaksi jäljelle jäävää vaihetta ovat eri lauseita
       kuin vasemman vastaavat: "Valitse talomalli ja sovita se tonttiin"
       on ostajan työ, "Valitse talo ja tontti" on valinta. Ne ovat siksi
       omat avaimet.                                                      */
    vertailuYla:      'Vertailu',
    vertailuOtsikko:  'Kaksi vaihetta sinulle, seitsemän meille',
    vertailuIngressi:
        'Näin uuden talon rakentaminen yleensä etenee – ja näin se etenee ' +
        'Luotokodilla.',
    vertailuVaiheet: [
      'Etsi ja vertaile tontteja',
      'Tarkista kaava ja rakennusoikeus',
      'Osta tontti ja järjestä sen rahoitus',
      'Valitse talomalli ja sovita se tonttiin',
      'Teetä pääpiirustukset',
      'Hae rakennuslupa',
      'Kilpailuta maatyöt ja liittymät',
      'Kilpailuta ja koordinoi rakentaminen',
      'Hoida rahoitus vaiheittain rakennusaikana'
    ],
    vertailuTavallisesti:       'Tavallisesti',
    vertailuTavallisestiSelite: 'Yhdeksän vaihetta, jotka ostaja koordinoi ' +
                                'itse.',
    vertailuTavallisestiTulos:  'Yhdeksän vaihetta, useita ' +
                                'sopimuskumppaneita.',
    vertailuMeilla:       'Luotokodilla',
    vertailuMeillaSelite: 'Samat yhdeksän vaihetta. Seitsemän niistä on ' +
                          'meidän työtämme.',
    /* Ruudunlukijalle: yliviivaus on visuaalinen ja sen merkitys pitää
       sanoa ääneen. */
    vertailuMeillaSeloste:
      'Yliviivatut kohdat ovat vaiheita, joita sinun ei tarvitse tehdä.',
    vertailuJaljella4: 'Valitse talo ja tontti',
    vertailuJaljella9: 'Allekirjoita sopimus',
    vertailuMeillaTulos: 'Kaksi vaihetta jäljellä: valitse ja allekirjoita.',
    vertailuCta:
        'Nämä seitsemän vaihetta hoidamme me. Haluatko tietää, mitä se ' +
        'maksaa sinun tapauksessasi?',

    /* -- Hinta ---------------------------------------------------------- */
    ctaHintaKohteesta: 'Pyydä hinta tästä kohteesta',
    hintaPysyyOtsikko: 'Miksi hinta pysyy',
    hintaPysyyTeksti:
        'Talonrakentamisessa budjetti pettää yleensä maatöissä. Kun tontti ' +
        'on meidän, olemme tutkineet maaperän jo ennen kuin saat hinnan. ' +
        'Riski on otettu ennen tarjousta, ei sen jälkeen.',
    /* B-malli: kaksi hintaa. Tämä ei ole ristiriidassa pääväitteen kanssa —
       kunnan tontti on hintatason 3 muunnelma (talon hinta meiltä kiinteä,
       tontti ei ole siinä). Ks. hintalogiikka tiedoston alussa. */
    kaksiHintaaOtsikko: 'Kaksi hintaa: tontti kunnalta, talo meiltä',
    kaksiHintaaTekstiHtml:
      'Tontin hinnan määrää kunta. Talon, luvan ja maatöiden hinta on ' +
      'meiltä kiinteä. <span class="gap">[vahvistettava]</span>',
    kaksiHintaaTonttiLabel: 'Tontti, kunnan hinnasto:',
    kaksiHintaaTaloLabel:   'Talo, lupa ja maatyöt:',
    /* Prototyypin oma huomautus, joka näkyy sivulla eikä
       muistiinpanotilassa: se on varaus keskeneräisestä päätöksestä eikä
       sivun väite. Näkyy vain B-mallissa. */
    kaksiHintaaHuomioOtsikko: 'Huomio prototyypissä:',
    kaksiHintaaHuomio:
        'kahden hinnan malli ei ole enää ristiriidassa pääväitteen kanssa. ' +
        'v5 erotti hintatasot toisistaan, ja kunnan tontti on tason 3 ' +
        'muunnelma – sama rakenne kuin omalla tontilla: talon hinta on ' +
        'meiltä kiinteä, tontti ei ole siinä. Auki jää vain se, kuka ' +
        'kunnan hinnaston viestii ja missä.',

    /* Prosessin kesto on tällä sivulla lyhyempi lause kuin etusivulla
       ("Koko prosessin kesto:"), koska sektio on jo nimetty prosessiksi. */
    prosessiKestoOtsikko: 'Koko prosessin kesto:',

    /* -- UKK ------------------------------------------------------------ */
    faqOtsikko: 'Kohteista',
    faqOmistusK: 'Onko tontti minun nimissäni?',
    /* RATKESI 5.10.2026. Asiakas: "Tomtens arrendekontrakt övergår till
       ditt namn när köpebrevet skrivs under." Vastaus oli merkitty
       aukoksi 18.8.2026 asti (AVOIMET.md 83), ja se oli kaupallisesti ja
       juridisesti keskein puuttuva tieto. HUOM: tontti on VUOKRATONTTI,
       ei ostettu — se muuttaa muitakin lauseita, ks. AVOIMET.md. */
    faqOmistusV:
        'Tontin vuokrasopimus siirtyy sinun nimiisi, kun kauppakirja ' +
        'allekirjoitetaan.',
    /* Vastaus on aukko markupissa: omistuksen siirtymistä ei kuvata
       missään aineistossa. Tämä on lisäys aukon alle eikä vastaus. */
    faqOmistusHuomio:
      'Tämä on ostajan kannalta keskeinen kysymys eikä aineisto vastaa ' +
      'siihen.',
    faqErikseenK: 'Voinko valita tontin ja talon erikseen?',
    faqVarattuK:  'Mitä jos haluamani talo on varattu?',
    faqVarattuV:
        'Kohteen talot myydään erissä, ja uusia kohteita avataan sitä ' +
        'mukaa, kun tiedämme, millä alueilla on kysyntää. Kerro alueesi, ' +
        'niin kerromme sinulle ensimmäisenä, kun jotain vapautuu.',
    ukkCtaTeksti: 'Kysyttävää kohteesta tai sopimuksesta? Kerromme suoraan.',

    ylaAluekysely: 'Etkö löydä omaa aluettasi?',

    /* -- Toteutuneet ---------------------------------------------------- */
    ylaToteutuneet:      'Toteutuneet',
    toteutuneetIngressi: 'Myydyt kohteet jäävät tänne nähtäviksi.',
    toteutuneetTyhjaOtsikko: 'Ensimmäinen kohde on vielä rakenteilla',
    toteutuneetTyhjaTeksti:
        'Kun ensimmäinen kohde on valmis ja myyty, se esitellään täällä.',

    /* -- Loppu-CTA ------------------------------------------------------ */
    ctaOtsikko:  'Katsotaan, mikä kohde sopii sinulle',
    ctaIngressi: 'Alkuun riittää yksi keskustelu. Se ei sido sinua mihinkään.',
    sivuOtsikko: 'Kohteet: talo ja tontti samassa kaupassa – Luotokoti',
    sivuKuvaus:
        'Muuttovalmiit talot valmiilla tonteilla. Tontti, kaava ja ' +
        'rakennuslupa on jo hoidettu, ja kokonaishinta on kiinteä.',

    /* TASO 2. Täällä "kokonaishinta" on oikea sana: tontti on mukana. */
    hintaOtsikko:  'Kokonaishinta, joka sisältää tontin',
    hintaIngressi:
        'Kohteessa tontti on jo meidän ja maaperä tutkittu. Siksi hinta on ' +
        'tiedossa jo ennen kuin kysyt.',
    /* SUOMENNOS 24.9.2026 — VAIN SISÄLTÖLISTA. Asiakas luetteli mitä
       kokonaishintaan sisältyy (vastaus 1.6): tontti, tonttityöt, perustus,
       sähkö- ja vesiliittymä, valmis talo. Rakennuslupa ei ole asiakkaan
       luettelossa, joten se poistui täältäkin.

       MAKUUHUONELUKU ON RISTIRIITA EIKÄ KÄÄNNÖSASIA. Suomi sanoo kaksi,
       ruotsi sanoo kolme. Copywriter palautti ruotsiin "tre sovrum" ja
       kysyi samalla Miro-boardilla, onko perusmallissa kolme vai viisi
       makuuhuonetta ja voiko talon tilata neljällä — eli hän ei tiedä
       vastausta sen paremmin kuin me. Suomen luku jätetään ennalleen
       kunnes asiakas vastaa; ks. AVOIMET.md 112. */
    hintaSelite:
        'Hinta sisältää tontin, tonttityöt, perustuksen, sähkö- ja ' +
        'vesiliittymän sekä muuttovalmiin talon kohteen kuvauksen ' +
        'mukaisesti. Hinta koskee vakiotasoa.',

    /* Kokovertailun hintarivi. Taso 2: tontti on mukana, joten sana
       "kokonaishinta" on oikea. "Alkaen" on välttämätön — tontin hinta
       vaihtelee kohteittain, eikä listaussivu voi väittää yhtä lukua.     */
    taloVertailuHinta: 'Kokonaishinta alkaen',

    faqSamaTalo:
        'Talo on sama kaikilla tonteilla, ja siksi hinta pysyy kiinteänä: ' +
        'talomallia ei sovitella tontille, vaan tontit valitaan ' +
        'talomallille.',

    toteutuneetOtsikko: 'Kohteet, jotka on jo rakennettu',
    prosessiOtsikko:    'Valinnasta avaimiin',

    /* Askel 1 poikkeaa yhteisestä: kävijä on jo kohdesivulla, joten
       kysymys "onko sinulla jo tontti" on tässä väärä. Askeleet 2–4 ovat
       yhteisiä. */
    prosessi1Otsikko: 'Valitse kohde ja talo',
    prosessi1Teksti:  'Katsotaan yhdessä mikä kohde ja mikä talo sopii ' +
                      'sinulle.',
    /* Otsikko "Talo, joka tontille tulee" on yhteinen etusivun kanssa. */
  },

  kohde: {

    /* -- Prototyypin oletus ---------------------------------------------
       Kohde valitaan osoiteparametrilla. Tuntematon tai puuttuva tunnus →
       ensimmäinen kohde + tämä huomautus. EI virhesivu: tuplaklikkaamalla
       avattu sivu ei saa parametria lainkaan, ja sen pitää silti näyttää
       jotain. Huomautus on prototyypin omaa ääntä, mutta se näkyy sivulla
       eikä muistiinpanotilassa — siksi se on copyssa ja käännetään.      */
    oletusOtsikko: 'Prototyypin oletus:',
    oletusSyyPuuttuu:
      'osoitteessa ei ollut kohteen tunnusta, joten näytetään ensimmäinen ' +
      'kohde.',
    oletusSyyTuntematon:
      'osoitteen kohdetunnusta ei löytynyt, joten näytetään ensimmäinen ' +
      'kohde.',
    oletusLoppuHtml:
      'Tämä ei ole virhesivu. Kohde valitaan osoitteella ' +
      '<code>kohde.html?kohde=kohde-1</code>.',

    /* -- Hero ------------------------------------------------------------
       Otsikko, kunta ja huomio tulevat KOHTEET-datasta. Vain avainlukujen
       selitteet ja painikkeet ovat copya.                                */
    faktaTaloja:       'Taloja kohteessa',
    faktaVapaana:      'Vapaana',
    faktaKokonaishinta: 'Kokonaishinta',
    faktaValmistuminen: 'Valmistuminen',
    /* Kohdesivun ensisijainen CTA on kevyempi kuin muualla: kävijä ei osta
       vielä vaan ilmoittaa kiinnostuksen. Ks. kohde.ctaTeksti. */
    ctaIlmoitaKiinnostus: 'Ilmoita kiinnostuksesi',

    /* -- Talot ----------------------------------------------------------- */
    ylaTalot:       'Talot',
    talotOtsikko:   'Talot tässä kohteessa',
    /* Kaksi ingressiä, koska myyty kohde on eri sivu kuin myynnissä oleva:
       hintoja ei näytetä toteutuneesta. Variantti valitaan CSS:llä
       (body[data-kohde-tila]). */
    talotIngressiMyynti:
        'Sama talo eri varustetasoilla. Hinta on kokonaishinta, johon ' +
        'sisältyvät talo, tontti ja maatyöt.',
    talotIngressiToteutunut:
      'Kohteeseen rakennetut talot. Kohde on myyty, joten hintoja ei ' +
      'näytetä.',

    /* -- Aikataulu ------------------------------------------------------
       Vaiheiden nimet ovat samat sanat kuin kohteen statusmerkinnässä
       (kohteet-data.js: KOHDE_STATUS_TEKSTI), jotta merkintä ja aikajana
       eivät voi kertoa eri tarinaa. Ne ovat silti copya eivätkä samaa
       avainta: merkintä on tila ("Myynnissä"), aikajanan rivi on vaihe. */
    ylaAikataulu:      'Aikataulu',
    aikajanaOtsikko:   'Missä vaiheessa kohde on',
    aikajanaEnnakko:      'Ennakkomarkkinointi',
    aikajanaEnnakkoTeksti: 'Kysyntä kartoitetaan ennen rakentamista.',
    aikajanaMyynti:        'Myynnissä',
    aikajanaMyyntiTeksti:  'Talot ovat varattavissa ja hinta on kiinteä.',
    aikajanaValmis:        'Valmistuminen',

    /* -- Kuvat ----------------------------------------------------------- */
    galleriaOtsikko: 'Kohde kuvina',
    galleriaToteutunut:
        'Kuvat valmiista kohteesta – ei havainnekuvia.',

    /* -- Alue ja lähipalvelut -------------------------------------------
       Etäisyydet ovat aukkoja: yhtään kohdetta ei ole, joten yhtään
       etäisyyttä ei voi tietää. Palveluiden nimet ovat copya.           */
    ylaAlue:      'Alue',
    alueOtsikko:  'Mitä lähellä on',
    palveluKoulu:      'Koulu',
    palveluPaivakoti:  'Päiväkoti',
    palveluKauppa:     'Ruokakauppa',
    palveluPysakki:    'Joukkoliikenteen pysäkki',
    palveluKeskusta:   'Keskusta',

    /* -- Talo tässä kohteessa -------------------------------------------- */
    suurinKokoLabel:  'Suurin mahdollinen koko tässä kohteessa:',
    laajennusLabel:   'Laajennus muuton jälkeen:',

    /* -- Yhteyshenkilö --------------------------------------------------- */
    ylaYhteyshenkilo: 'Yhteyshenkilö',
    henkiloOtsikko:   'Tästä kohteesta vastaa',
    henkiloNimi:      'Nimi ja rooli',
    henkiloPuhelin:   'Puhelin',
    henkiloSahkoposti: 'Sähköposti',

    /* -- Loppu-CTA, toteutunut kohde ------------------------------------
       Myyty kohde ei ohjaa yhteydenottoon vaan aluekyselyyn: kävijä katsoo
       referenssiä, eikä referenssistä voi ostaa. Tämä on R9:n mukainen
       kevyt konversio.                                                   */
    toteutunutOtsikko: 'Tämä kohde on rakennettu ja myyty',
    toteutunutTeksti:
        'Kerro, millä alueella etsit kotia, niin kartoitamme alueen tontit ' +
        'ja kerromme, mikä on mahdollista. Rakennamme koko Suomeen.',
    ctaMuutKohteet: 'Katso muut kohteet',
    sivuOtsikko: 'Kohde – Luotokoti',
    sivuKuvaus:
      'Yhden kohteen tiedot: talot, aikataulu, alue ja lähipalvelut.',

    taloOtsikko: 'Talo, joka tähän kohteeseen tulee',

    /* HINTARIVIÄ EI OLE kohdesivun kokovertailussa, eikä se ole unohdus.
       Sivulla on jo talokohtainen taulukko, jossa lukevat tämän kohteen
       todelliset talot hintoineen ja tiloineen. Kokovertailun "alkaen"-luku
       olisi rinnakkainen ja yleisempi hinta samasta talosta samalla sivulla,
       ja kahdesta luvusta kävijä ei tiedä kumpi pätee häneen. Vertailu vastaa
       tällä sivulla kysymykseen "mikä koko", talotaulukko kysymykseen
       "mikä talo ja mitä se maksaa".

       Toteutus: kokovertailun hintarivi renderöityy vain jos taulukon
       markupissa on data-vertailu-hinta. Kohdesivulla sitä ei ole.          */

    /* Kohteen kaava voi rajata suurimman koon. Rajattu sarake ei katoa
       taulukosta — se merkitään, koska koko on olemassa tuotteessa vaikkei
       tällä tontilla. null suurimmassa koossa ei tarkoita "ei rajoitusta",
       joten merkintä tulee vain kun rajoitus on tiedossa.                  */
    taloVertailuRajattu: 'Ei tällä tontilla',
    ctaOtsikko:  'Kiinnostaako tämä kohde?',
    ctaTeksti:
        'Ilmoita kiinnostuksesi, niin kerromme sinulle ensimmäisenä, kun ' +
        'talo vapautuu tai kohteen rakentaminen alkaa. Ilmoitus ei sido ' +
        'sinua mihinkään.'
  },

  omaTontti: {

    /* -- Hero ------------------------------------------------------------
       Yläotsikko on prototyypin nimilappu ("Ostopolku 2") ja se on
       tarkoituksella jäljellä vain täällä: kohteet.html:n vastaava
       poistettiin 20.8.2026, koska kävijä ei tiedä olevansa ostopolulla
       numero yksi. Sama perustelu pätee tähänkin — kirjattu AVOIMET.md:hen
       eikä korjattu tässä yhteydessä, koska se on copypäätös.            */
    ylaOstopolku: 'Ostopolku 2 · Oma tontti',
    heroOtsikko:  'Onko sinulla jo tontti?',
    heroAlarivi:
        'Rakennamme muuttovalmiin talon myös omalle tontillesi. Talomalli ' +
        'on aina sama, joten tontin pitää sopia sille. Sen tarkistaminen ' +
        'vie muutaman minuutin.',
    /* Sivun oma tekokehotus. Eri sanamuoto kuin yhteinen.ctaTarkistaTontti,
       joka on viittaus TÄLLE sivulle muilta sivuilta — eri kohde, eri
       teksti. Ks. TARKASTUS.md muutos 1. */
    ctaTarkistaKuusi: 'Tarkista tonttisi – 5 kysymystä',

    /* -- Tarkistuslista -------------------------------------------------- */
    ylaTarkistuslista: 'Tarkistuslista',
    listaOtsikko:      'Sopiiko tonttisi talomallille?',
    listaIngressi:
        'Merkitse kohdat, jotka tiedät varmasti. Tulos päivittyy heti. ' +
        'Asiakirjoja et tarvitse – riittää, mitä muistat.',
    /* ÄLÄ POISTA. Kriteerit ovat Generon ehdotuksia rautalankavaiheesta,
       eikä Luotokoti ole vahvistanut niitä. Varaus on sivulla kahdesti:
       tässä ennen listaa ja jokaisessa tuloksessa (tulosVarausHtml). */
    listaVaraus:
      'Luotokoti ei ole vahvistanut niitä, eivätkä ne ole tekninen ' +
      'vaatimuslista. Ne on kirjoitettu rautalankavaiheessa siksi, että ' +
      'tarkistuslistan rakenne ja hyödyllisyys voidaan arvioida. Tulos ei ' +
      'ole lupaus eikä tarjous.',
    listaVarausOtsikko: 'Nämä kohdat ovat ehdotuksia.',
    tulosOtsikko:       'Tulos',

    /* -- Mitä hoidamme --------------------------------------------------- */
    ylaHoidamme:      'Mitä hoidamme',
    /* SUOMENNOS 24.9.2026. Asiakkaan muotoilussa on "kan": me VOIMME
       hoitaa loput. Ero on tarkoituksellinen eikä tyyliä. */
    hoidammeOtsikko:  'Tontti on sinun, me hoidamme loput',
    hoidammeTeksti:
        'Sinun ei tarvitse toimia projektipäällikkönä eikä soitella ' +
        'alihankkijoiden perään. Haemme rakennusluvan, teemme maatyöt ja ' +
        'pystytämme elementtitalosi.',
    hoidammeTicks: [
      'Rakennuslupa ja pääpiirustukset',
      'Maatyöt ja perustus',
        'Talo kiintokalusteineen, valmiiksi asennettuna'
    ],
    hoidammeTontti: 'Tontti on jo sinun, joten se ei sisälly hintaan.',

    /* -- Talo ------------------------------------------------------------
       Rakennusoikeus on tällä polulla se, joka määrää koon — kohteissa sen
       tekee kaava. Sama asia, eri lähde, ja siksi eri lause. */
    taloRakennusoikeus: 'Rakennusoikeus määrittää suurimman mahdollisen ' +
                        'koon.',

    /* -- Hinta ------------------------------------------------------------ */
    ctaHintaTontille: 'Pyydä hinta tontillesi',

    /* -- Selvitys -------------------------------------------------------- */
    ylaSelvitys:      'Selvitys',
    selvitysOtsikko:  'Selvitystyö kuuluu meille',
    selvitysIngressi:
        'Tarkistuslista antaa karkean suunnan. Varsinaisen selvityksen ' +
        'teemme me, ja se tehdään ennen kuin annamme hinnan.',
    selvitysMeOtsikko: 'Selvitämme puolestasi',
    selvitysMe: [
      'Kaava ja rakennusoikeus',
      'Maaperän kantavuus',
      'Liittymien saatavuus',
      'Kulkuyhteys työmaalle'
    ],
    selvitysSinaOtsikko: 'Sinulta tarvitsemme',
    selvitysSina: [
      'Osoitteen tai kiinteistötunnuksen',
        'Tiedon siitä, omistatko tontin jo'
    ],

    /* -- UKK -------------------------------------------------------------- */
    faqOtsikko:  'Omasta tontista',
    faqPurkuK:   'Tontillani on vanha rakennus. Voiko sen purkaa?',
    faqPohjaK:   'Voinko muuttaa pohjaratkaisua omalla tontilla?',
    faqPohjaV:
      'Emme muuta pohjaratkaisua, ja se on tarkoituksellista. Talomalli on ' +
      'optimoitu pienintä teknistä yksityiskohtaa myöten, ja juuri se pitää ' +
      'hinnan kiinteänä.',
    faqEiSoviK:  'Mitä jos tonttini ei sovi?',
    /* Aukko on lauseen sisällä: veloittamattomuus on lupaus jota ei ole
       vahvistettu, ja juuri se sana on se joka pitää tarkistaa. */
    faqEiSoviVHtml:
        'Kerromme sen suoraan, emmekä laskuta selvityksestä <span ' +
        'class="gap">[vahvistettava]</span>. Silloin voimme katsoa yhdessä ' +
        'valmiita tontteja.',
    ukkCtaTeksti: 'Epäselvä kohta tontissasi? Selvitämme sen puolestasi.',

    /* -- Jos tontti ei sovi ----------------------------------------------
       Tämä sektio on syy siihen, ettei tarkistuslista torju ketään: alin
       tulostaso ei sano "ei onnistu", ja sivun loppu tarjoaa toisen polun. */
    ylaEiSovi:     'Jos tontti ei sovi',
    eiSoviOtsikko: 'Silloinkin on vaihtoehto',
    eiSoviTeksti:
        'Talomalli on aina sama, joten kaikille tonteille sitä ei voi ' +
        'rakentaa. Jos tonttisi ei sovi, se ei ole umpikuja: meillä on ' +
        'valmiita tontteja, joissa kaava, rakennuslupa ja maaperä on jo ' +
        'selvitetty.',

    /* -- Loppu-CTA -------------------------------------------------------- */
    ctaOtsikko:  'Kerro tontistasi, niin katsotaan',
    ctaIngressi:
      'Riittää osoite tai kiinteistötunnus. Keskustelu ei sido sinua ' +
      'mihinkään, eikä siitä seuraa myyntisoittoja.',

    /* -- Tarkistuslistan tulos ------------------------------------------
       Tuloslaatikon oma copy. Tulostasojen otsikot, tekstit ja CTA:t ovat
       tonttikriteerit.js:ssä datana (kolme tasoa, kynnysarvot samassa
       tiedostossa) — nämä kaksi ovat lauseita, jotka kuuluvat copyyn.

       Pisteluku on lause eikä pelkkä laskuri: "3 / 6 kohtaa merkitty" on eri
       asia kuin "3/6". Luvut sijoitetaan paikanvaraajiin, jottei lause ole
       koottu palasista — ruotsissa sanajärjestys on eri. */
    tulosPisteet: '{n} / {kaikki} kohtaa merkitty',
    /* Alkutila ennen ensimmäistä rastia (1.10.2026). Alin tulostaso
       ("Muutama kohta on vielä auki") näkyi heti latauksessa, vaikka kävijä
       ei ollut vielä vastannut mihinkään. */
    tulosAlkuOtsikko: 'Merkitse kohdat, jotka tiedät',
    tulosAlkuTeksti:
        'Tulos päivittyy sitä mukaa, kun merkitset kohtia. Jos et tiedä ' +
        'vastauksia, ei haittaa – me selvitämme ne.',

    /* ÄLÄ POISTA. Kriteerit ovat rautalankavaiheen ehdotuksia eikä
       Luotokoti ole vahvistanut niitä; ilman tätä varausta tulos lukee
       lupauksena. Ks. tonttikriteerit.js:n alku ja AVOIMET.md. */
    tulosVarausHtml:
      '<strong>Huomio:</strong> kohdat ovat rautalankavaiheen ehdotuksia. ' +
      'Luotokoti ei ole vahvistanut niitä, eikä tulos ole lupaus tai ' +
      'tarjous.',
    sivuOtsikko: 'Talopaketti omalle tontille – Luotokoti',
    sivuKuvaus:
        'Muuttovalmis talopaketti omalle tontillesi kiinteällä hinnalla. ' +
        'Tarkista muutamassa minuutissa, sopiiko tonttisi talomallille.',

    /* TASO 3. Tänne "Kokonaishinta viikossa" kuuluu — ja vain tänne.
       Maaperä on tuntematon, joten maatöiden osuus on se mikä puuttuu. */
    hintaOtsikko:  'Kokonaishinta viikossa',
    hintaIngressi:
        'Talon hinta on kiinteä heti. Maatöiden osuus riippuu maaperästä, ' +
        'ja sen selvitämme viikossa ilman, että sinun tarvitsee tehdä ' +
        'mitään.',
    /* VARUSTETASOT 30.9.2026. Lause puhui makuuhuonekokoista, jotka
       asiakkaan hinnoittelu poisti (AVOIMET.md 195). Faktakorjaus. */
    hintaSelite:
        'Hinta koskee vakiotasoa. Siihen sisältyvät rakennuslupa, maatyöt ' +
        'ja talo kiintokalusteineen. Tontti on jo sinun, joten se ei ' +
        'sisälly hintaan.',
    viikkoOtsikko: 'Kokonaishinta viikossa – etkä tee sen eteen mitään',
    viikkoTeksti:
        'Emme anna lopullista hintaa ennen kuin tiedämme, millainen ' +
        'maaperä tontilla on. Siksi tilaamme maaperätutkimuksen. Sinun ei ' +
        'tarvitse tehdä mitään, eikä tutkimus maksa sinulle mitään. Viikon ' +
        'sisällä saat kokonaishinnan, johon sisältyvät talo, perustukset, ' +
        'liittymät ja maarakennustyöt. Siinä hinnassa pysytään.',

    taloOtsikko:     'Talo, joka tontillesi tulee',

    /* Kokovertailun hintarivi. Taso 3: tontti on jo asiakkaan, joten
       kokonaishinta on talo, lupa ja maatyöt. "Alkaen" kantaa tällä sivulla
       myös maaperäepävarmuuden — sama asia jonka viikkolupaus ratkaisee.   */
    taloVertailuHinta: 'Kokonaishinta alkaen',
    prosessiOtsikko: 'Tontista avaimiin',

    /* Oma prosessi, ei yhteinen. Tällä polulla maaperätutkimus on oma
       askeleensa, koska se on juuri se mikä erottaa polun kohdepolusta:
       kohteessa maaperä on jo tutkittu, omalla tontilla ei. Sama asia on
       sivun hintasektion R4-lupauksessa, ja askel vahvistaa sen.
       Askeleet 3 ja 4 on kirjoitettu samalla sanastolla kuin yhteiset. */
    prosessi: [
      { otsikko: 'Kerro tontistasi',
        teksti:  'Riittää osoite tai kiinteistötunnus. Katsomme kaavan ja ' +
                 'rakennusoikeuden itse.' },
      { otsikko: 'Tutkimme maaperän',
        teksti:
          'Talonrakentamisessa budjetti pettää yleensä maaperän takia. Me ' +
          'kannamme sen riskin, ja siksi tutkimme maaperän ennen kuin ' +
          'annamme hinnan.' },
      { otsikko: 'Saat kiinteän hinnan',
        teksti:  'Yksi hinta koko projektille. Toista tarjousta ei tule.' },
      { otsikko: 'Rakennamme, sinä muutat',
        teksti:
          'Rakennusvaihe kestää noin neljä kuukautta. Rakennusaikana et ' +
          'maksa mitään – maksat vasta, kun muutat sisään.' }
    ]
  },

  meista: {

    /* -- Hero ------------------------------------------------------------
       Alarivi on brändikirjan arvolause. HUOM: sama lause on
       yhteinen.luottamusIngressissä ja etusivun nimitarinan
       päätöskappaleessa (etusivu.nimiPaatos) — kolme lähes identtistä
       esiintymää, jotka tulevat samasta alkuperäisestä. Se on copykysymys
       eikä koodikysymys ja kirjattu AVOIMET.md:hen. */
    ylaMeista:   'Meistä',
    heroAlarivi:
        'Haluamme näyttää, että laadukas talo ei vaadi suurta budjettia. ' +
        'Taustalla on kokemus, maalaisjärki ja pohjalainen sisu.',

    /* -- Arvot -----------------------------------------------------------
       Brändikirjan kolme kärnvärde sellaisenaan: Enkelt, Ärligt,
       Jordnära. Kolmas on käännetty muotoon "Rakennamme paljon taloa
       rahalle" — kömpelöä suomea, mutta se ON brändikirjan arvo eikä
       otsikko, joten alkuperäinen muotoilu säilyy. Otsikkotasolla sama asia
       sanotaan luontevammin (meista.heroOtsikko). Ks. AVOIMET.md 141. */
    ylaArvot:            'Arvot',
    arvoYksinkertainen:      'Yksinkertaista',
    arvoYksinkertainenTeksti: 'Asiakkaan ei tarvitse säätää mitään. Kannamme koko vastuun.',
    arvoRehellinenOtsikko:   'Rehellistä',
    arvoMaanlaheinen:        'Maanläheistä',
    arvoMaanlaheinenTeksti:
        'Painopiste on laadussa ja toimivuudessa. Rahalle saa paljon taloa.',

    /* -- Toimialue -------------------------------------------------------- */
    ylaToimialue: 'Toimialue',
    /* Kartan alla oleva lause. Se on tärkeä siksi, että kartalla on neljä
       merkintää ja toimialue on koko Suomi (R5): ilman tätä lausetta kartta
       lukee rajauksena. */
    /* 1.10.2026: kartta poistui toimialueesta, joten lause viittaa nyt
       kohdekortteihin. Avaimen nimi jäi ennalleen. */
    toimialueEiKartalla:
        'Etkö näe omaa aluettasi kohteiden joukossa? Se ei tarkoita, ' +
        'ettemme rakentaisi sinne.',

    /* -- Ihmiset ---------------------------------------------------------
       TYHJÄ TARKOITUKSELLA. Aineistossa ei ole yhtään nimeä, roolia,
       valokuvaa eikä vuosilukua. Kohderyhmä ostaa luottamusta ja nimetyt
       ihmiset ovat halvin tapa osoittaa se — mutta keksittyjä henkilöitä ei
       laiteta prototyyppiin. Aukon nimi ja selite ovat copya, koska ne
       näkyvät sivulla lauseina. */
    ylaIhmiset:      'Ihmiset',
    ihmisetOtsikko:  'Ketkä talosi rakentavat',
    /* Hakasulkeet ovat osa arvoa: .gap--block ei ole <span class="gap">
       vaan lohko, jonka sisältö kirjoitetaan sellaisenaan. */
    ihmisetAukkoHtml: '[Ihmiset – tyhjä tarkoituksella]',
    ihmisetSelite:
        'Aineistossa ei ole yhtään nimeä, roolia, valokuvaa eikä ' +
        'vuosilukua. Kohderyhmä ostaa luottamusta, ja nimetyt ihmiset ovat ' +
        'halvin tapa osoittaa se – mutta keksittyjä henkilöitä ei laiteta ' +
        'prototyyppiin.',

    /* -- Loppu-CTA -------------------------------------------------------
       Lyhin loppu-CTA sivustolla: Meistä-sivun kävijä ei ole ostopolulla
       vaan tarkistamassa keitä me olemme, ja kutsu on siksi kevyt.
       Ingressi on lyhyempi versio yhteinen.ctaIngressistä — ilman
       myyntisoittojen mainintaa, koska se ei ole tämän sivun huoli. */
    ctaOtsikko:  'Jutellaan',
    ctaIngressi:
        'Kerro, missä haluaisit asua, niin katsotaan, onko se mahdollista. ' +
        'Keskustelu ei sido sinua mihinkään.',
    sivuOtsikko: 'Meistä – Luotokoti',
    sivuKuvaus:
      'Rakennamme koteja koko Suomeen. Kotipaikkamme on Luoto.',

    /* PÄÄTÖS, AVOIMET.md 141. Brändikirjan arvo on "vi bygger mycket hus
       för pengarna". Suora käännös "Rakennamme paljon taloa rahalle" on
       kömpelöä suomea otsikkona; tämä sanoo saman luontevammin. Arvot-
       sektiossa alkuperäinen muotoilu säilyy, koska se on brändikirjan
       arvo sellaisenaan eikä otsikko. */
    heroOtsikko: 'Enemmän taloa samalla rahalla',

    /* SUOMENNOS 24.9.2026. Sama teksti kuin yhteinen.toimialue* — ks.
       perustelu sieltä. */
    toimialueOtsikko: 'Rakennamme koteja koko Suomeen',
    toimialueIngressi:
        'Kotipaikkamme on Luoto, ja siellä olemme oppineet, mitä kiinteä ' +
        'hinta vaatii: kunta, urakoitsijat ja maaperä on tunnettava ennen ' +
        'kuin hinnan voi antaa. Jos olet jo löytänyt mieluisan ' +
        'paikkakunnan, autamme löytämään sieltä tontin Luotokoti-talolle.',

    arvotOtsikko:   'Kolme asiaa, joiden varaan rakennamme',
    arvoRehellinen:
      'Hinta, jonka kerromme, on hinta, jonka maksat. Ei ikäviä yllätyksiä ' +
      'matkan varrella.'
  },

  yhteys: {

    /* -- Polkuvalinta ---------------------------------------------------- */
    ylaKummasta:  'Kummasta on kysymys',
    polkuOtsikko: 'Valitse lähtökohta, niin osaamme vastata tarkemmin',

    /* -- Lomake ----------------------------------------------------------
       Kentät ovat kysymysmuodossa eivätkä kenttänimiä ("Millä alueella
       etsit kotia?" eikä "Alue"): lomake on keskustelun alku eikä
       rekisteröinti, ja kysymys kertoo miksi tietoa kysytään.

       KOLME PAKOLLISTA KENTTÄÄ: alue, nimi, sähköposti. Loput ovat
       valinnaisia ja se sanotaan jokaisen kohdalla ääneen — jokainen
       pakollinen kenttä maksaa konversiossa.                             */
    ylaJataTiedot: 'Jätä tietosi',
    lomakeOtsikko: 'Otamme yhteyttä',
    lomakeIngressi:
        'Emme tarvitse paljon. Kolme kenttää riittää, loput selviävät ' +
        'keskustelussa.',
    lomakePolkuLegend: 'Mitä etsit?',
    lomakePolkuPaketti: 'Haluan ostaa talon ja tontin',
    lomakePolkuOma:     'Haluan rakentaa omalle tontilleni',
    lomakePolkuAlue:    'En tiedä vielä',
    /* Kohteesta tullut kävijä näkee mistä kohteesta on kysymys. Piilokenttä
       yksin ei riitä: jos lomake ei kerro sitä ääneen, kävijä ei tiedä
       lähteekö tieto mukaan. */
    lomakeKohdeLabel:  'Kohde',
    lomakeKohdeVaihda: 'Vaihda kohdetta',

    lomakeAlue:    'Millä alueella etsit kotia?',
    lomakeAlueApu: 'Paikkakunta riittää. Rakennamme koko Suomeen.',
    /* VARUSTETASOT 30.9.2026. Kysymys ja vaihtoehdot olivat eri mieltä:
       valinnat vaihdettiin varustetasoiksi mutta kysymys jäi kysymään
       makuuhuoneita. */
    lomakeKoko:    'Mikä varustetaso?',
    /* Valikon vaihtoehdot: tyhjä arvo ensin, koska "en osaa sanoa" on
       rehellinen vastaus eikä puuttuva tieto. Kokojen nimet EIVÄT ole
       täällä — ne johdetaan kokoNimi()-funktiolla samasta säännöstä kuin
       muualla (talo-data.js). */
    lomakeEnTieda:      'En osaa vielä sanoa',
    lomakeVapaaehtoinen: 'Vapaaehtoinen.',
    lomakeAikataulu:    'Milloin haluaisit muuttaa?',
    lomakeAikaAlleVuosi: 'Alle vuoden sisällä',
    lomakeAika12:        '1–2 vuoden sisällä',
    lomakeAikaYli2:      'Yli kahden vuoden päästä',
    lomakeNimi:      'Nimi',
    lomakeEmail:     'Sähköposti',
    lomakePuhelin:   'Puhelin',
    lomakePuhelinApu: 'Vapaaehtoinen. Soitamme vain jos pyydät.',
    lomakeViesti:    'Muuta kerrottavaa',
    lomakeViestiApu: 'Jos sinulla on tontti, kerro osoite tai ' +
                     'kiinteistötunnus.',
    lomakeSoitto:    'Soitamme vain jos pyydät',
    /* Prototyypin oma varaus: lomaketta ei lähetetä mihinkään. Näkyy
       sivulla, joten se on copya ja käännetään. */
    lomakeProtoVaraus:
      'Prototyypissä lomaketta ei lähetetä mihinkään. Painike näyttää ' +
      'kiitos-tilan, jotta konversion loppu on nähtävissä.',

    /* -- Kiitos-tila ------------------------------------------------------
       Vastausaika on aukko lauseen sisällä (yhteinen.ctaVastausaikaHtml on
       eri lause: se on CTA:n tuki, tämä on kiitossivun lause).           */
    kiitosOtsikko: 'Kiitos – viestisi on vastaanotettu',
    kiitosTekstiHtml:
      'Vastaamme <span class="gap">[x arkipäivän]</span> kuluessa. Sillä ' +
      'välin voit katsoa talon tai avoimet kohteet.',
    kiitosAlusta:      'Näytä lomake uudelleen',
    kiitosAlustaVaraus:
      'Paluupainike on prototyypin työkalu, ei osa julkaistavaa sivustoa.',

    /* -- Suorat yhteystiedot ---------------------------------------------- */
    ylaSuoraan:     'Suoraan',
    suoratOtsikko:  'Tai ota yhteyttä suoraan',
    suoratPuhelin:  'Puhelin',
    suoratEmail:    'Sähköposti',
    suoratOsoite:   'Käyntiosoite',
    /* ASIAKKAAN YHTEYSTIEDOT 5.10.2026. Nämä olivat merkittyjä aukkoja
       seitsemällä sivulla; nyt ne ovat copyssa yhtenä paikkana, koska sama
       arvo toistuu footerissa joka sivulla.

       VAIN YKSI PUHELINNUMERO JA YKSI SÄHKÖPOSTI. Asiakas: "All mail
       konversation skall ske med myynti@luotokoti.fi. Så inga personliga
       mailadresser" ja "Endast Tommy Tupeli tfn nummer skall vara synlig".
       Ks. AVOIMET.md 251 ja 252: henkilökohtaiset osoitteet olivat
       julkisessa peilissä, ja asiakas sanoi itse ettei niitä pidä olla. */
    puhelin: '+358 50 4386 693',
    email:   'myynti@luotokoti.fi',
    osoite:  'Kopparvägen 1, 68570 Larsmo',
    aukiolo:
        'Ma–pe 7.00–15.30. Jos tarvitset ajan aukioloaikojen ' +
        'ulkopuolella, ota yhteyttä.',

    suoratYtunnus:  'Y-tunnus',
    kayntiOtsikko:  'Voit myös tulla käymään',
    /* SUOMENNOS 24.9.2026. Kutsu spontaaniin käyntiin poistui: asiakas
       päätti että käynti tapahtuu ajanvarauksella eikä sivusto ilmoita
       drop-in-aikoja (vastaus 7.2). */
    kayntiTeksti:
        'Tule toimistollemme katsomaan piirustuksia ja ' +
        'materiaalinäytteitä. Sovi käynnistä etukäteen, niin paikalla on ' +
        'varmasti joku meistä vastaamassa kysymyksiisi.',
    /* SUOMENNOS 24.9.2026. Aukioloaikoja ei ilmoiteta (vastaus 7.2). */
    kayntiAukiolo:  'Käynti sovitaan etukäteen',
    ctaSoviAika:    'Sovi käyntiaika',

    /* -- Mitä tapahtuu seuraavaksi ---------------------------------------
       Neljä askelta, jotka eivät ole sama asia kuin yhteinen.prosessi:
       nämä kuvaavat mitä tapahtuu YHTEYDENOTON jälkeen, kun prosessi
       kuvaa rakentamista. Ensimmäinen askel sisältää vastausaika-aukon,
       joten se on HTML-avain.                                            */
    ylaSeuraavaksi:    'Mitä tapahtuu seuraavaksi',
    seuraavaksiOtsikko: 'Sinä päätät, miten jatketaan',
    seuraavaksi1:      'Vastaamme',
    seuraavaksi1Html:
      'Otamme yhteyttä sinun valitsemallasi tavalla, ' +
      '<span class="gap">[x arkipäivän]</span> kuluessa.',
    seuraavaksi2:      'Katsotaan tilanne',
    seuraavaksi2Teksti:
        'Yksi keskustelu: missä haluaisit asua, onko sinulla tontti ja ' +
        'mikä on aikataulusi.',
    seuraavaksi3:      'Selvitämme',
    seuraavaksi3Teksti: 'Tutkimme tontin ja maaperän. Se on meidän työtämme.',
    seuraavaksi4:      'Saat kiinteän hinnan',
    seuraavaksi4Teksti: 'Yksi hinta koko projektille. Vasta sitten päätät.',
    sivuOtsikko: 'Yhteystiedot – Luotokoti',
    sivuKuvaus:
        'Kerro, missä haluaisit asua. Keskustelu ei sido sinua mihinkään.',

    /* Navigaation nimike on "Ota yhteyttä"; sivun yläotsikko sanoi
       "Yhteystiedot". Yhtenäistetty. */
    heroYlaotsikko: 'Ota yhteyttä',
    heroOtsikko:    'Yksi keskustelu riittää alkuun'
  }
};
