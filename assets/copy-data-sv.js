
/* ==========================================================================
   Luotokoti — copy, ruotsi
   Ladataan HETI copy-data.js:n jälkeen kaikilla sivuilla.

   RAKENNE ON SAMA KUIN copy-data.js:SSÄ. Sama avainpolku, sama järjestys.
   Yksi sääntö: jos avain on suomessa, se on täällä samalla polulla.

   MIKSI ERILLINEN TIEDOSTO. Vaihtoehto oli { fi: '…', sv: '…' } jokaisen
   avaimen kohdalla samassa tiedostossa. Se olisi vienyt suomen perustelut ja
   käännöksen samaan riviin — ja copy-editori.js jäsentää copy-data.js:n
   kommentteineen, joten perustelu olisi hajonnut kesken lauseen. Erillinen
   tiedosto pitää suomen tiedoston koskemattomana ja tekee kääntämättömän
   lauseen näkyväksi: puuttuva avain renderöityy merkintänä
   [översättning saknas: polku], ei suomenkielisenä lauseena.

   ÄLÄ TEE FALLBACKIA SUOMEEN. Suomenkielinen lause ruotsinkielisellä sivulla
   on hiljainen virhe: se näyttää valmiilta eikä kukaan huomaa korjata sitä.
   Merkitty aukko huomataan. Sama sääntö kuin puuttuvalla tiedolla
   (AGENTS.md sääntö 3), vain eri merkintä.

   Jos suomen arvo on null (tietoa ei ole), avainta EI kirjoiteta tänne:
   aukko tulee suomen puolelta ja on sama molemmilla kielillä. Puuttuvaa
   tietoa ei voi kääntää.

   ÄLÄ KÄÄNNÄ HAKASULKEISSA OLEVIA SELITTEITÄ. Kun lauseen sisällä on aukko
   (<span class="gap">[x arkipäivän]</span>), selite pysyy SUOMENKIELISENÄ
   myös täällä. Se ei ole copya vaan avain: placeholder-tila etsii
   kuvitteellisen arvon juuri sillä selitteellä, ja käännetty selite
   jättäisi aukon paikkaamatta ruotsinkielisellä sivulla. Selitteen käännös
   on sanat-sanakirjassa tämän tiedoston lopussa, ja proto.js kääntää sen
   sivulle sen jälkeen kun placeholder on ajettu (kaannaAukot).

   ==========================================================================
   LÄHDE. Ruotsi ei ole käännös suomesta vaan päinvastoin: sivuston copy on
   kirjoitettu Luotokodin ruotsinkielisen sisältöstrategian
   (Luotokoti_innehållsstrategi.docx) pohjalta ja käännetty suomeksi. Siksi
   jokaisen lauseen kohdalla on merkintä siitä mistä ruotsi tulee:

     LÄHDE      sanamuoto on sisältöstrategiasta sellaisenaan
     LÄHDE (m)  sisältöstrategiasta, muokattu — lyhennetty, taivutettu tai
                jaettu useaan lauseeseen sivun rakenteen mukaan
     KÄÄNNÖS    käännetty suomesta, ei alkuperäistä sanamuotoa olemassa

   Merkintä ei ole kirjanpitoa vaan työjono: KÄÄNNÖS-merkityt lauseet ovat ne
   joita kukaan ei ollut vielä kirjoittanut ruotsiksi, ja copy-editori näyttää
   ne omana ryhmänään.

   ==========================================================================
   COPYWRITER. Ruotsinkielinen copywriter kävi tiedoston läpi editorissa
   21.–25.8.2026 ja kirjoitti 152 lausetta ja 15 sanakirjan arvoa uusiksi.
   Ne lauseet on merkitty:

     COPYWRITER <pvm>   copywriter kirjoitti tämän lauseen ruotsiksi
                        editorissa; ruotsi on sen jälkeen alkuperäinen
                        riippumatta siitä mikä LÄHDE/KÄÄNNÖS-merkintä
                        rivillä lukee

   KAKSI ERI ASIAA SAMALLA RIVILLÄ. LÄHDE/KÄÄNNÖS kertoo mistä lause tuli
   kun tiedosto kirjoitettiin; COPYWRITER kertoo että se on sen jälkeen
   kirjoitettu uusiksi. Molemmat pidetään, koska vanha merkintä on historiaa
   eikä valhetta vasta kun sen viereen on kirjoitettu mitä tapahtui. Käytännön
   seuraus: 126 lausetta joiden merkintä on KÄÄNNÖS ei enää ole käännös
   suomesta, ja 26 lausetta joiden merkintä on LÄHDE tai LÄHDE (m) ei enää
   ole sisältöstrategian sanamuoto.

   COPYWRITER EI PERIYDY LOHKOSTA. LÄHDE/KÄÄNNÖS periytyy lohkokommentista
   seuraaville avaimille (ks. copy-editori.js), koska se on lohkon
   ominaisuus. COPYWRITER on aina sen avaimen omassa kommentissa jota se
   koskee: yksi lause kerrallaan on juuri se mitä editorissa muokataan.

   MERKINTÄ EI PÄIVITY ITSESTÄÄN. copy-tuo.js kirjoittaa arvot eikä kommentteja
   — se on tarkoitus, koska perustelut eivät saa hävitä tuonnissa. Sivuvaikutus
   on että tuonti jättää rivin merkinnän kertomaan edellisestä versiosta.
   Siksi copy-tuo.js luettelee ajon lopuksi ne polut joiden merkintä jäi
   vanhentuneeksi, ja ne käydään käsin läpi ennen committia.

   MITÄ EI TIEDETÄ. 254 lausetta on yhä KÄÄNNÖS-merkittyjä ilman COPYWRITER-
   merkintää. Se ei kerro kävikö copywriter ne läpi ja hyväksyi vai jäivätkö
   ne väliin: editorin tila ei erottele "katsottu, kelpaa" ja "ei avattu".
   Jos ero on tarpeen, se on kysyttävä copywriterilta eikä pääteltävä täältä.

   ==========================================================================
   TERMIPÄÄTÖKSET. Nämä ovat käännöksen omia päätöksiä eivätkä seuraa
   suomesta. Jokainen on kirjattu AVOIMET.md:hen, koska ne ovat brändin
   sanastoa eivätkä kielioppia:

     kohde            → objekt
                        Sisältöstrategia käyttää sanaa "grynderprojekt", joka
                        on toimialan termi. Navigaatiossa se on liian pitkä ja
                        liian tekninen, ja strategia itse sanoo että termi on
                        avattava kävijälle. Siksi navigaatio ja leipäteksti
                        sanovat "objekt" (Suomen ruotsissa vakiintunut
                        kiinteistösana), ja "grynderprojekt" esiintyy siellä
                        missä termi selitetään — UKK-vastauksessa.
     talon hinta      → huspris / priset för huset
     kokonaishinta    → totalpris
                        Hintalogiikan kolme tasoa erottuvat ruotsissa samoilla
                        sanoilla kuin suomessa. ÄLÄ käytä sanaa totalpris
                        tuotesivulla (talo.*) — ks. copy-data.js:n
                        hintalogiikka, sääntö 2.
     tontti           → tomt
     maatyöt          → markarbete
     kiinteä hinta    → fast pris
     elementtitalo    → elementhus
     Luoto (kunta)    → Larsmo
                        Kunnan ruotsinkielinen nimi. Suomenkielinen Luoto
                        esiintyy ruotsinkielisellä sivulla vain silloin kun
                        nimitarina selittää sanan merkityksen.
   ========================================================================== */

var COPY_SV = {

  /* ======================================================================
     NAVIGAATIO JA SIVUN KROMI
     ====================================================================== */
  navi: {
    /* KÄÄNNÖS */
    ohita:      'Till innehållet',
    /* KÄÄNNÖS */
    valikko:    'Meny',
    /* KÄÄNNÖS */
    paavalikko: 'Huvudnavigering',
    /* LÄHDE — sajtstruktur, luku 5 */
    etusivu:    'Startsida',
    /* LÄHDE (m) — "Våra hus" */
    talo:       'Huset',
    /* Ks. termipäätös yllä: objekt eikä grynderprojekt. */
    /* KÄÄNNÖS */
    kohteet:    'Objekt',
    /* LÄHDE (m) — "Bygg på egen tomt" */
    omaTontti:  'Egen tomt',
    /* LÄHDE — sajtstruktur, luku 5 */
    meista:     'Om oss',
    /* LÄHDE (m) — "Kontakt" */
    yhteys:     'Kontakta oss',
    /* KÄÄNNÖS */
    sivukartta: 'Webbkarta',
    /* KÄÄNNÖS */
    footerSivut: 'Sidor',
    /* KÄÄNNÖS */
    kieliValinta: 'Språk'
  },

  /* ======================================================================
     YHTEINEN
     ====================================================================== */
  yhteinen: {

    yla: {
      /* KÄÄNNÖS */
      hinta:         'Pris',
      /* KÄÄNNÖS */
      talo:          'Huset',
      /* LÄHDE — Block 3 */
      rahoitus:      'Finansiering',
      /* LÄHDE (m) — "så enkelt är det" */
      prosessi:      'Så går det till',
      /* KÄÄNNÖS */
      luottamus:     'Förtroende',
      /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
      asukkaat:      'bli en av våra nöjda kunder',
      /* KÄÄNNÖS */
      ukk:           'Vanliga frågor',
      /* KÄÄNNÖS */
      kuvat:         'Bilder',
      /* LÄHDE — Block 5 */
      nimiTarina:    'Historien bakom namnet',
      /* LÄHDE — dokumentin otsikko */
      seuraavaAskel: 'Nästa steg'
    },

    /* LÄHDE — "Hus och tomt i ett paket – med fast pris från första offert"
       ja kundlöfte "Du betalar först när du flyttar in."
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    footerKuvaus:
        'Hus och tomt i ett paket. Du får ett fast pris från första ' +
        'offert, och betalar först när du flyttar in.',

    /* LÄHDE (m) — Block 4:n rubrik "Genomtänkta kvalitetshus som byggs
       kostnadseffektivt" tiivistettynä otsikoksi. Suomen "Harkittua laatua
       järkevään hintaan" on saman ajatuksen lyhennys. */
    luottamusOtsikko: 'Genomtänkt kvalitet till ett rimligt pris',
    /* LÄHDE — Block 5:n päätöskappale sellaisenaan, ilman viimeistä
       lausetta ("skapar vi Luotokoti…"), joka on nimitarinan loppu.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    luottamusIngressi:
        'Vi bygger inte för att imponera, vi bygger för att visa att det ' +
        'går att leverera välgenomtänkt kvalitet till ett rimligt pris. ' +
        'Det är möjligt med gedigen byggerfarenhet, sunt förnuft och ' +
        'lite envishet.',

    luvut: [
      /* Selite muuttui 24.9.2026: asiakas valitsi termin förverkligade hem
         eikä levererade hus (vastaus 4.2). Rivin merkintä koskee SELITETTÄ
         eikä lukua — taulukkoalkio on yhdellä rivillä, joten kommentti ei
         voi osoittaa toiseen avaimeen kahdesta. */
      { arvo: '100+', selite: 'förverkligade hem' },  /* KÄÄNNÖS · selite COPYWRITER 24.9.2026 */
      { arvo: '80+',  selite: 'elementhus' },           /* KÄÄNNÖS */
      { arvo: 'A',    selite: 'energiklass' }           /* KÄÄNNÖS */
    ],
    energialuokka: 'A',

    /* KÄÄNNÖS — avain lisätty 23.9.2026. Puuttui ruotsista kokonaan, vaikka
       suomessa se on ollut merkittynä aukkona alusta asti: luvut yllä ovat
       JRT:n, ja uusi brändi joka esittää ne omissa nimissään on haavoittuva
       heti kun joku tarkistaa Y-tunnuksen.

       Asiakas vastasi 23.9.2026 (kohdat 1.8 ja 4.2): kokemus kerrotaan
       TIIMIN nimissä eikä brändin, ja termi on förverkligade hem eikä
       levererade hus. Arvo on yhä null, koska lauseen kirjoittaa
       copywriter — editorissa tällä rivillä on ehdotus. */
    /* COPYWRITER 24.9.2026 */
    luottamusLahde:
      'Teamet bakom Luotokoti har varit med och förverkligat över 100 hem ' +
      '– egnahemshus, parhus och radhusbostäder.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    lainauksetOtsikko: 'De som bor i hus som vi har byggt',
    /* COPYWRITER 25.8.2026 */
    lainauksetIngressi:
          /* COPYWRITER 24.9.2026 */
          'Bakom varumärket Luotokoti står ett team som har varit med och ' +
          'förverkligat över 100 hem: egnahemshus, parhus och ' +
          'radhusbostäder. Vi vet vad som krävs för att skapa ett prisvärt ' +
          'kvalitetshus.',

    /* KÄÄNNÖS */
    taloOtsikkoTontille: 'Huset som byggs på tomten',
    /* LÄHDE (m) — "arkitektoptimerat koncepthus" on strategian oma termi ja
       sen perustelu on luvun 3 kommentissa: "Du får en arkitekts expertis
       och smarta planlösning". Kolmen koon mekaniikka on suomesta.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    taloTiivistelmaIngressi:
        'Ett arkitektoptimerat koncepthus. Du får ta del av arkitektens ' +
        'expertis och kan lita på att planlösningen är välgenomtänkt. Du ' +
        'kan köpa huset i tre storlekar: stomme och planlösning förändras ' +
        'inte men fler sovrum kan läggas till i husets gavel.',
    /* KÄÄNNÖS */
    taloPohjaratkaisuVakio: 'Samma planlösning i alla storlekar',

    /* KÄÄNNÖS */
    taloVertailuSeloste:       'Tre storlekar jämförda',
    /* COPYWRITER 21.8.2026 */
    taloVertailuPintaAla:      'Boyta',
    taloVertailuHuoneistotyyppi: 'Bostadstyp',

    /* KÄÄNNÖS */
    kokoHintaOtsikko: 'Pris enligt storlek',

    /* LÄHDE — Block 1, neljä askelta. Askel 1:n kysymys on strategian oma
       ("Vill du köpa tomt och hus i ett färdigt paket, eller har du redan
       en egen tomt?"); suomessa se on tiivistetty. */
    prosessi: [
      { otsikko: 'Berätta om din situation',
        teksti:  'Har du redan en egen tomt, eller letar du efter ett ' +
                 'färdigt objekt? Ett samtal räcker för att komma igång.' },
      { otsikko: 'Du får ett fast pris',
        teksti:  'Vi undersöker marken och ger dig ett fast pris för hela ' +
                 'projektet. Det kommer ingen andra offert.' },
      { otsikko: 'Vi bygger ditt hus',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Vi söker bygglovet, gör markarbetet och monterar elementhuset. ' +
          'Byggskedet tar cirka fyra månader.' },
      /* COPYWRITER 25.8.2026 */
      { otsikko: 'Betala när du flyttar in',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Du betalar ingenting under byggtiden. Du lyfter ditt banklån ' +
          'och betalar först när huset är slutgranskat.' }
    ],
    /* KÄÄNNÖS */
    prosessiKestoOtsikko:
      'Hela processen från första samtalet till inflyttning:',

    /* LÄHDE — Block 3 kokonaisuudessaan. Otsikko on strategian toinen
       ehdotus ("Enkelt att prata med banken"); ensimmäinen oli "Banken
       kommer att älska ditt nya hem", joka on sävyltään myyvempi ja jätetty
       pois samasta syystä kuin suomessa. */
    rahoitusOtsikko: 'Enkelt att prata med banken',
    /* COPYWRITER 25.8.2026 */
    rahoitusTeksti:
        'Att bygga hus brukar betyda krångliga och osäkra kalkyler för ' +
        'banken. Med Luotokoti är det precis tvärtom: du får ett fast ' +
        'slutpris redan i första offerten, så att banken vet exakt hur ' +
        'mycket huset kommer att kosta. Bolånet lyfter du inte förrän ' +
        'huset står klart. Ditt bankmöte handlar främst om att lägga upp ' +
        'en amorteringsplan som passar dig.',

    /* KÄÄNNÖS — CTA-mikrocopy */
    ctaEiSido:       'Utan att binda dig',
    ctaVastausaikaHtml:
      'Vi svarar inom <span class="gap">[x arkipäivän]</span>',
    /* COPYWRITER 25.8.2026 */
    ctaKerroAlue:    'Berätta var du vill ha ditt hus',
    ctaPyydaHinta:   'Begär ett fast pris',
    ctaKatsoTalo:    'Se huset och planlösningen',
    /* COPYWRITER 25.8.2026 */
    ctaKatsoKohteet: 'Inflyttningsklart hus med tomt',
    ctaKohteetJaHinnat: 'Se objekt och priser',
    ctaOmaTontti:    'Jag har en egen tomt',
    ctaTarkistaTontti: 'Kolla om din tomt passar',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    alueOtsikko: 'Hittar du inget som passar på din egen ort?',
    /* COPYWRITER 25.8.2026 */
    alueTeksti:
        'Berätta var du vill bo så kartlägger vi tomterna på orten och ' +
        'undersöker om det är möjligt att bygga ett Luotokoti just där.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    polkuPakettiOtsikko: 'Köpa hus och tomt i ett paket',
    /* COPYWRITER 21.8.2026 */
    polkuPakettiKuvaus:  'Vi har redan fixat tomten, planen och bygglovet.',
    /* COPYWRITER 25.8.2026 */
    polkuOmaOtsikko:     'Bygga ett hus på din egen tomt',
    /* COPYWRITER 21.8.2026 */
    polkuOmaKuvaus:      'På några minuter kan du kolla om din tomt passar.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaOtsikko:  'Ett första samtal – på dina villkor',
    /* COPYWRITER 25.8.2026 */
    ctaIngressi:
        'När du kontaktar oss väntar ingen snårig djungel av val och ' +
        'otydliga kalkyler. Vi kör igång direkt och ser till att vägen ' +
        'till ditt nya hem blir underbart kort och rak.',

    /* LÄHDE — Block 5. HUOM: tässä ruotsi on ALKUPERÄINEN ja suomi on
       muokattu versio. Alkuperäinen selittää ruotsinkieliselle lukijalle
       mitä suomen sana koti tarkoittaa; suomeksi se on kehäpäätelmä, joten
       suomen kappale on kirjoitettu uudelleen (AVOIMET.md 45). Ruotsiksi
       alkuperäinen palautuu sellaisenaan, ja se on syy siihen että sanat
       Koti ja Luoto ovat markupissa eivätkä copyssa: ne ovat suomen sanoja
       molemmilla kielillä. */
    nimiOtsikko: 'En fast punkt att kalla hem',
    nimiKoti:
      'är det finska ordet för hem. Inte bara själva huset, utan platsen ' +
      'du längtar tillbaka till och där du ska trivas i många år framöver.',
    nimiLuoto:
      'är det finska namnet på vår hemort Larsmo i Österbotten på Finlands ' +
      'västkust. Här i skärgården har det gedigna träbyggandet och ' +
      'hantverket förfinats under generationer. På finska betyder ordet ' +
      'luoto dessutom klippa eller skär — något fast och tryggt som klarar ' +
      'alla väder.',

    /* LÄHDE — Block 4, kolmas ja neljäs virke sellaisenaan. */
    pohjaPerustelu:
      'Att flytta en toalettstol eller en bärande vägg kräver nya ' +
      'ritningar, omplanering och tilläggsarbete. Genom att hålla fast vid ' +
      'vår planlösning kan vi hålla priset nere — och ge dig ett hem där ' +
      'du har råd att leva gott, även efter att räkningarna är betalda.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    toimialueOtsikko: 'Vi bygger hem i hela Finland',
    /* COPYWRITER 25.8.2026 */
    /* ERIYTYMÄ KORJATTU 24.9.2026. Toimialuelohko on olemassa kahdesti:
       tämä etusivulla, meista.toimialue* Meistä-sivulla. Copywriter korjasi
       24.9. vain jälkimmäisen, koska ehdotus oli vain siinä — tämä avain jäi
       ehdotuslistalta pois. Sanamuoto on siis hänen, ei uusi: se on kopioitu
       meista.toimialueIngressistä sellaisenaan (Ollin päätös 24.9.).

       HUOM: lauseet ovat nyt sanasta sanaan identtiset kahdella sivulla.
       Se on tarkoituksellista mutta kertoo, että avaimia on yksi liikaa —
       jos teksti pysyy samana, lohko kuuluu yhdeksi jaetuksi avaimeksi.
       Suomessa nämä kaksi ovat edelleen eri tekstit, joten yhdistäminen on
       suomennoskierroksen päätös eikä tämän. */
    toimialueIngressi:
        'Vi bygger i hela Finland. Vår hemort är Larsmo, och där har vi ' +
        'lärt oss vad ett fast pris kräver: kommunen, entreprenörerna och ' +
        'marken måste vara kända innan siffran ges. Har du hittat din ' +
        'plats på jorden hjälper vi gärna till med att hitta en passande ' +
        'tomt för ett Luotokoti-hus i den kommunen.',

    /* Kunnan ruotsinkielinen nimi. Ks. termipäätökset tiedoston alussa. */
    karttaKotipaikka:      'Larsmo',
    karttaKotipaikkaRooli: 'hemort',
    karttaMitta:           '100 km',

    /* KÄÄNNÖS */
    karttaSeloste: 'Karta över Finland. Vi bygger i hela landet.',
    karttaLahde:
      'Vi bygger i hela Finland. På kartan finns vår hemort och objektens ' +
      'orter utmärkta. Kartmaterial: Natural Earth 1:10 m, public domain.',

    /* KÄÄNNÖS — kuvapaikkojen selitteet */
    phValmisTalo: 'Färdigt hus och de som bor där',
    /* COPYWRITER 25.8.2026 */
    phFotostil:
        'Modell: Risö, elementhus, 102 kvm, 4 rum + kök',
    phRakennustapa: 'Elementhus',
    /* COPYWRITER 25.8.2026 */
    phLuoto:     'Ordet Luoto betyder klippa eller skär',
    /* COPYWRITER 25.8.2026 */
    phLuotoMeta:
      'En fast punkt som klarar alla väder, ett hem som känns tryggt och ' +
      'trivsamt.'
  },

  /* ======================================================================
     PROTO — prototyypin oma teksti, joka näkyy sivulla
     Käännetään, koska se näkyy sivulla ruotsinkieliselle lukijalle.
     Muistiinpanot (aside.note) EIVÄT ole täällä eikä niitä käännetä:
     ne ovat työryhmän oma kerros ja piilossa oletuksena.
     ====================================================================== */
  proto: {
    varoitusLuvut:        'Siffrorna är fiktiva',
    varoitusLuvutOtsikko: 'Siffrorna är fiktiva.',
    varoitusLuvutFooter:
      'Priser, areor och namn är exempel som gör det möjligt att bedöma ' +
      'layout och radbrytning med texter av rätt längd. De är inte ' +
      'Luotokotis uppgifter.',
    footerRautalankaOtsikko: 'Prototyp.',
    footerFontitOtsikko:     'Fonterna är provisoriska.',
    footerAvoimetAlku: 'De öppna frågorna är samlade i filen',
    footerRautalanka:
      'En klickbar prototyp för att testa strukturen — inte en färdig ' +
      'webbplats. Innehåll inom hakparenteser saknas. De gråa ramarna är ' +
      'bildplatser, fotografier finns inte.',
    footerFontit:
      'Rubriker: Quicksand (slutlig Cocon Pro). Brödtext: Nunito Sans ' +
      '(slutlig Filson Soft). Cocon Pro och Filson Soft är Adobe ' +
      'Fonts-fonter och kan inte användas i prototypen.',
    /* KÄÄNNÖS */
    footerAvoimet:
      '. Sidans anteckningar och copy-status finns bakom prototypens ' +
      'kontrollpanel, och panelen är dold i den här versionen.'
  },

  /* ======================================================================
     SIVUKOHTAINEN
     ====================================================================== */

  etusivu: {
    /* KÄÄNNÖS — sivun otsikko ja kuvaus */
    sivuOtsikko: 'Luotokoti — ett nytt hem till ett fast pris',
    sivuKuvaus:
      'Hus och tomt i ett paket, fast pris från första offert. Du betalar ' +
      'först när du flyttar in.',

    /* LÄHDE — kundlöfte: "Ett nytt hem till ett fast pris från första
       offert. Du betalar först när du flyttar in." Otsikko on lupauksen
       alkuosa, alarivi sen loppuosa. Missio antaa alarivin ensimmäisen
       virkkeen ("från bygglov till nyckelöverlämning"). */
    heroOtsikko: 'Ett nytt hem till ett fast pris.',
    heroAlarivi:
      'Vi sköter allt från bygglov till nyckelöverlämning. Du betalar ' +
      'först när du flyttar in.',

    /* LÄHDE — luku 4, kolme USP:tä sellaisenaan. Tämä on koko sivuston
       tarkin kohta suhteessa alkuperäiseen: otsikot ovat USP-listan omat ja
       tekstit ovat "Vad det betyder för kunden" -kappaleet. */
    lupaukset: [
      { otsikko: 'Fast pris från första offert',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Det som brukar spräcka budgeten för husbygget är markarbetet. ' +
          'Luotokoti tar den risken. När vi vet var huset ska stå, får du ' +
          'ett fast pris för huspaketet.' },
      { otsikko: 'Allt ingår i ett paket',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Tomt, bygglov, markarbete och hus med fast inredning. Du ' +
          'behöver inte vara projektledare och slipper krångel med att ' +
          'koordinera underleverantörer.' },
      { otsikko: 'Betala när det är klart',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Du slipper dubbla boendekostnader under byggtiden och lyfter ' +
          'bolånet först när du får nycklarna i handen. På så vis tar ' +
          'banken också en mindre risk.' }
    ],
    /* KÄÄNNÖS */
    lupauksetYlaotsikko: 'Tre löften',
    /* LÄHDE (m) — Block 1:n rubrik "Inflyttning fyra månader efter
       byggstart – så enkelt är det" on sama argumentti (ostaminen on
       yksinkertaista), mutta se lupaa neljä kuukautta muuttoon eikä
       rakennusaikaan — juuri se epäselvyys jonka dokumentti itse merkitsi
       auki. Otsikko on siksi kirjoitettu ilman lukua, kuten suomessa.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    lupauksetOtsikko: 'Det enklaste sättet att köpa hus',

    /* KÄÄNNÖS */
    hintaOtsikko:  'Ett pris, och det håller',
    /* COPYWRITER 25.8.2026 */
    hintaIngressi:
        'Vi erbjuder ett välgenomtänkt kvalitetshus där du har råd att ' +
        'leva gott.',
    /* COPYWRITER 25.8.2026 */
    hintaSelite:
        'Ett hus med tre sovrum. Innehåller bygglov, markarbete och huset ' +
        'med fast inredning. Tomtens pris varierar beroende på objekt.',

    /* Kokovertailun hintarivi. Taso 1: EI sanaa totalpris. */
    /* KÄÄNNÖS */
    taloVertailuHinta: 'Huspris från',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    faqOtsikko: 'Samlade svar på vanliga byggfrågor',

    /* LÄHDE — Block 2 ("Vad är ett grynderprojekt?") kokonaisuudessaan.
       Tämä on se vastaus jossa toimialan termi selitetään, ja siksi sana
       grynderprojekt esiintyy tässä vaikka muualla puhutaan objekteista.
       Ks. termipäätökset tiedoston alussa. */
    faqPakettiK: 'Vad betyder hus och tomt i ett paket?',
    faqPakettiV:
      'Det betyder att vi redan har köpt tomten, planerat området, ritat ' +
      'huset och fixat bygglovet. Vi säljer huset och tomten i ett färdigt ' +
      'paket, och för dig är det troligen det enklaste sättet att köpa ' +
      'hus. Du slipper pappersarbetet och får ett hem till ett fast pris.',
    faqPakettiV2Html:
      'Att köpa ett grynderhus påminner om att köpa en ny lägenhet — fast ' +
      'du får ett eget fristående hus med egen gård. ' +
      '<span class="gap">[terassi vahvistettava]</span>',
    faqPakettiLinkki: 'Se hur paketet fungerar',

    /* LÄHDE (m) — Block 1, askel 4 vastauksena. */
    faqMaksuK: 'När betalar jag, och vad betalar jag under byggtiden?',
    faqMaksuV:
      'Du betalar ingenting under byggtiden. Du lyfter ditt banklån först ' +
      'när huset är slutgranskat och nycklarna är dina. Så slipper du ' +
      'dubbla boendekostnader.',

    /* LÄHDE — Block 4, toinen kappale sellaisenaan. */
    faqPohjaK: 'Kan jag ändra planlösningen?',
    faqPohjaV:
      'Vi ändrar inte planlösningen, och det är medvetet. Vår husmodell är ' +
      'optimerad in i minsta tekniska detalj för att byggteamet och ' +
      'teknikerna ska kunna jobba så kostnadseffektivt som möjligt. Varje ' +
      'rör och varje vägg är placerade just där av en orsak.',
    /* KÄÄNNÖS — korostus on lauseen sisällä, koska ruotsin sanajärjestys on
       eri kuin suomen. */
    faqPohjaPituusHtml:
      'Husets <em>längd</em> är däremot planerad för att ändras: du kan ' +
      'välja ett hem med två, tre eller fyra sovrum. Det är inte att ändra ' +
      'planlösningen, utan att förlänga samma stomme.',

    /* KÄÄNNÖS */
    faqOmaTonttiK: 'Vad om jag redan har en tomt?',
    /* COPYWRITER 25.8.2026 */
    faqOmaTonttiV:
        'Vi bygger också på egen tomt. Husmodellen är fast, så tomten ' +
        'måste passa för husmodellen — det lönar sig att börja med ' +
        'checklistan.',

    /* LÄHDE (m) — Block 1, askel 3 ja dokumentin oma kommentti siitä, että
       kokonaisprosessin kestoa ei ole vahvistettu. */
    faqKestoK: 'Hur länge tar byggandet?',
    faqKestoV:
      'Byggskedet tar cirka fyra månader. Huset byggs på beställning, så ' +
      'hela processens längd beror på tomten, bygglovet och tidtabellen.',

    /* LÄHDE — USP 1 sellaisenaan, kysymysmuodossa. */
    faqHintaK: 'Är priset verkligen fast?',
    /* COPYWRITER 25.8.2026 */
    faqHintaV:
        'Ja. Det som brukar spräcka budgeten för husbygget är markarbetet, ' +
        'och Luotokoti tar den risken. När vi vet var huset ska stå, får ' +
        'du ett fast pris. Den siffran gäller — det kommer ingen andra ' +
        'offert.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ukkCtaTeksti:
        'Blev något oklart? Vi svarar gärna på dina frågor.',

    /* KÄÄNNÖS */
    ylaMissaRakennamme: 'Var vi bygger',
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaLueMeista:       'Läs mer om oss',

    /* LÄHDE — Block 5:n päätöskappale sellaisenaan, mukaan lukien viimeinen
       lause jota luottamusIngressissä ei ole. */
    nimiPaatos:
        /* COPYWRITER 24.9.2026 */
        'Vi bygger inte för att imponera, vi bygger för att visa att det ' +
        'går att leverera välgenomtänkt kvalitet till ett rimligt pris. ' +
        'Med gedigen byggerfarenhet, sunt förnuft och lite envishet skapar ' +
        'vi Luotokoti.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    prosessiOtsikko: 'Vi bygger ditt hus i fyra steg'
  },

  talo: {
    /* KÄÄNNÖS */
    sivuOtsikko: 'Huset — Luotokoti',
    sivuKuvaus:
      'Ett arkitektoptimerat koncepthus. Planlösningen, vad som ingår i ' +
      'huspriset och varför vi inte ändrar planlösningen.',

    /* Taso 1: sana totalpris ei esiinny tällä sivulla hintaa kuvaamassa. */
    /* KÄÄNNÖS */
    hintaOtsikko:  'Priset för huset',
    hintaIngressi:
      'En siffra som täcker huset, bygglovet och markarbetet. Det kommer ' +
      'ingen andra offert.',
    /* COPYWRITER 25.8.2026 */
    hintaSelite:
        'Grundmodellen har tre sovrum. Vill du ha ett fjärde eller femte ' +
        'sovrum läggs det till på grundpriset.',

    /* KÄÄNNÖS */
    pohjaOtsikko: 'Planlösningen är gjord för hur människor faktiskt lever',
    /* COPYWRITER 25.8.2026 */
    pohjaVaraus:
        'Illustration av planlösningen. Rumsytan är tagen från ' +
        'arkitektritningen; mått och detaljer preciseras i byggplanerna.',
    /* COPYWRITER 25.8.2026 */
    pohjaIngressi:
        'Vår planlösning är inte skapad för att imponera. Den är ritad för ' +
        'vardagen: för vilken tid på dygnet man är i vilket rum, var ' +
        'sakerna ska vara och hur man rör sig genom huset. Samma gäller ' +
        'storleken — planlösningen är gjord för att huset ska kunna växa i ' +
        'takt med din familj. Om du vill kunna bygga ut ditt hus i ' +
        'framtiden, behöver du kontrollera tomtens storlek och byggrätt ' +
        'för att veta om det är möjligt. Fråga oss, vi hjälper dig.',

    /* KÄÄNNÖS. HUOM: sana totalpris esiintyy tässä, mutta EI tämän sivun
       hintaa kuvaamassa — se kuvaa mitä muualla saa. Sääntö 2 pitää.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    hintaPolut:
        'Huset har alltid ett fast pris. Vad det totala priset blir beror ' +
        'på tomten: Våra färdiga paket: Tomten ingår och marken är redan ' +
        'undersökt. Du får det slutgiltiga totalpriset direkt. Bygg på ' +
        'egen tomt: Huset har samma fasta pris. Totalpriset spikas så fort ' +
        'vi har undersökt din mark. Marken undersöker vi åt dig, helt utan ' +
        'kostnad.',

    /* KÄÄNNÖS
       COPYWRITER 24.9.2026 */
    sisaltyyOtsikko: 'Det här ingår i huspriset',
    /* COPYWRITER 25.8.2026 */
    sisaltyyIngressi:
          /* COPYWRITER 24.9.2026 */
          'Ett fast pris är bara så mycket värt som löftet bakom det. ' +
          'Därför säger vi rakt ut vad som ingår i huspriset. Inga ' +
          'svävande formuleringar, inga finstilta undantag. Du vet vad du ' +
          'får för pengarna innan vi sätter spaden i marken.',
    /* COPYWRITER 25.8.2026 */
    sisaltyyRajaHtml:
        'I huspriset ingår inte <span class="gap">[rajaus — ' +
        'täydennettävä]</span> — Observera att tomten räknas separat ' +
        'enligt hur du vill bygga. Köper du ett av våra färdiga huspaket ' +
        'ingår tomten i totalpriset. Har du redan en egen tomt räknar vi ' +
        'bara på huset och markarbetet.',

    /* KÄÄNNÖS */
    valinnatOtsikko: 'Tre inredningsstilar',
    /* COPYWRITER 25.8.2026 */
    valinnatIngressi:
        'Planlösningen är samma för alla. När det gäller färger och fast ' +
        'inredning kan du välja mellan tre olika inredningsstilar som ' +
        'arkitekten har planerat så att allt passar ihop.',
    /* COPYWRITER 25.8.2026 */
    valinnatAlahuomio:
        'Storleken på huset väljer du högre upp. Det här valet gäller ytor ' +
        'och inredning.',

    /* LÄHDE — luvun 3 kommentti: termi on päätetty ja perusteltu. */
    ylaKonseptitalo:   'Arkitektoptimerat koncepthus',
    /* KÄÄNNÖS */
    ylaPohjaratkaisu:  'Planlösning',
    /* KÄÄNNÖS */
    ylaValinnat:       'Val',
    /* KÄÄNNÖS */
    ylaTekniset:       'Tekniska uppgifter',
    /* LÄHDE (m) — Block 4:n otsikkoehdotus "Varför vi inte låter dig flytta
       toalettstolen / Varför vi inte ändrar planlösningen". Käytössä on
       jälkimmäinen, kuten suomessa. */
    ylaMiksiEiMuuteta: 'Varför vi inte ändrar planlösningen',
    /* KÄÄNNÖS */
    ylaMyohemmin:      'Senare',
    /* KÄÄNNÖS */
    ylaTalonHinta:     'Priset för huset',
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaSaatavuus:      'Tillgängliga hus just nu',

    /* KÄÄNNÖS */
    kokoValitsinOtsikko: 'Välj storlek',
    kokoValitsinHuomio:
      'Samma hus i tre storlekar. Valet följer med dig också till ' +
      'prisuppgifterna på de andra sidorna.',

    /* KÄÄNNÖS */
    faktaPintaAla:      'Boarea',
    /* KÄÄNNÖS */
    faktaHuoneet:       'Rum',
    /* KÄÄNNÖS */
    faktaKerrokset:     'Våningar',
    /* KÄÄNNÖS */
    faktaEnergialuokka: 'Energiklass',

    /* KÄÄNNÖS */
    pohjaKortit: [
      { otsikko: 'Fönstren efter väderstreck',
        teksti:  'Fönstren är inte dekoration på fasaden. Varje fönster ' +
                 'sitter i det väderstreck där ljuset kommer in när rummet ' +
                 'används.' },
      { otsikko: 'Förvaringen är planerad först',
        teksti:  'Förvaringen är en del av planlösningen från början. Den ' +
                 'är inte placerad i det som blev över när rummen var ' +
                 'ritade.' },
      /* COPYWRITER 25.8.2026 */
      { otsikko: 'Plats att röra sig på',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Vi har ritat vägarna genom huset – från hallen till köket och ' +
          'rummen – så att vardagen flyter på utan att ni går på varandra.' }
    ],

    /* KÄÄNNÖS */
    teknisetOtsikko: 'Tekniska uppgifter och garantier',
    teknisetPdf:
      'Mer omfattande tekniska uppgifter kommer att finnas som PDF. Filen ' +
      'finns inte ännu, så någon nedladdningslänk är inte byggd.',

    /* LÄHDE — Block 4:n rubrik ja kaksi ensimmäistä kappaletta
       sellaisenaan. Kolmas kappale on yhteinen.pohjaPerustelu. */
    miksiOtsikko: 'Genomtänkta kvalitetshus som byggs kostnadseffektivt',
    miksiKappale1:
      'I ett Luotokoti hittar du gedigna kvalitetsmaterial, slitstarka ' +
      'golv och genomtänkta detaljer. Genom att bygga smart och hålla oss ' +
      'till planen kan vi erbjuda ett kvalitetshus till ett förvånansvärt ' +
      'bra pris.',
    miksiKappale2:
      'Vår husmodell är optimerad in i minsta tekniska detalj för att ' +
      'byggteamet och teknikerna ska kunna jobba så kostnadseffektivt som ' +
      'möjligt. Varje rör och varje vägg är placerade just där av en ' +
      'orsak.',
    /* KÄÄNNÖS — lisätty kappale, joka ratkaisee näennäisen ristiriidan
       kokovalitsimen ja tämän sektion välillä. */
    miksiKappale4:
        /* COPYWRITER 24.9.2026 */
        'Vi flyttar inte väggar, eftersom varje vägg står där av en orsak. ' +
        'Husets längd är däremot planerad så att den kan ändras om ' +
        'familjen växer och ni behöver flera sovrum. Hör av dig om du vill ' +
        'veta mer om det, så hjälper vi dig ta reda på om det är möjligt ' +
        'på din tomt.',

    /* KÄÄNNÖS */
    galleriaOtsikko: 'Så ser huset ut',

    /* KÄÄNNÖS · COPYWRITER 24.9.2026 */
    laajennusOtsikko: 'Huset kan byggas ut senare',
    /* COPYWRITER 25.8.2026 */
    laajennusTeksti:
          /* COPYWRITER 24.9.2026 */
          'Huset är planerat så att fler sovrum kan läggas till i gaveln i ' +
          'ett senare skede. Du kan alltså börja med den storlek du ' +
          'behöver och har råd med just nu. En senare utbyggnad kräver ett ' +
          'eget bygglov, och grunden byggs enligt den storlek du väljer ' +
          'nu.',
    laajennusKysymysLupa:
        /* COPYWRITER 24.9.2026 */
        'En senare utbyggnad kräver ett eget bygglov',
    /* COPYWRITER 24.9.2026 */
    laajennusKysymysHinta: 'Du får ett fast pris på utbyggnaden när den blir aktuell',
    laajennusKysymysTakuu: 'Hur påverkar den garantin?',
    laajennusVaraus:
        /* COPYWRITER 24.9.2026 */
        'Garantifrågan är fortfarande obesvarad: hur en senare utbyggnad ' +
        'påverkar garantin på det ursprungliga huset är inte avgjort. ' +
        'Bygglov och pris är besvarade och står som svar ovan.',
    /* COPYWRITER 25.8.2026 */
    laajennusKohdeOtsikko: 'Om du köper ett av våra objekt',
    /* COPYWRITER 25.8.2026 */
    laajennusKohdeTeksti:
        'Om du köper en av våra tomter, så vet vi på förhand vad planen ' +
        'tillåter. Svaret om utbyggnad finns i objektets uppgifter — det ' +
        'behöver inte utredas separat.',
    laajennusOmaOtsikko: 'Om du bygger på egen tomt',
    /* COPYWRITER 25.8.2026 */
    laajennusOmaTekstiHtml:
        'Möjligheten att bygga ut huset i ett senare skede beror på ' +
        'tomtens storlek, planen och byggrätten. Vi kan utreda det innan ' +
        'du fattar beslut. <span class="gap">[selvityksen kesto]</span>',

    /* KÄÄNNÖS */
    sisaltyyLabel: 'Ingår i huspriset',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    saatavuusOtsikko:  'Samma hus, men på olika platser',
    /* COPYWRITER 25.8.2026 */
    saatavuusIngressi:
        'Här hittar du våra aktuella projekt där tomt, bygglov och ' +
        'planering redan är klara. Det är bara för dig att välja var du ' +
        'vill bo.',
    ctaKaikkiKohteet: 'Se alla objekt',
    tyhjaOtsikko: 'Var skulle du vilja bo?',
    tyhjaTeksti:
      'Just nu finns inget öppet objekt. Berätta på vilken ort du söker ' +
      'ett hem, så kartlägger vi tomterna där och berättar vad som är ' +
      'möjligt. Vi bygger i hela Finland.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaOtsikko:  'Vilket alternativ passar dig bäst?',
    /* COPYWRITER 25.8.2026 */
    ctaIngressi: 'Samma genomtänkta hus, två sätt att köpa.',
    /* COPYWRITER 25.8.2026 */
    polkuKohdeKuvaus:
        'För dig som vill köpa tomt och hus i ett paket.',
    polkuOmaOtsikko: 'Vi bygger på din egen tomt',
    /* COPYWRITER 25.8.2026 */
    polkuOmaKuvaus:
        'Kolla på några minuter om husmodellen passar på din tomt.'
  },

  kohteet: {
    /* KÄÄNNÖS */
    sivuOtsikko: 'Objekt — Luotokoti',
    sivuKuvaus:
      'Objekt där tomten, planen och bygglovet redan är skötta. Du väljer ' +
      'huset och platsen.',

    /* Taso 2: "totalpris" on oikea sana, tontti on mukana. */
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    hintaOtsikko:  'Ett totalpris där allt ingår – även tomten',
    /* COPYWRITER 25.8.2026 */
    hintaIngressi:
        'När du köper ett av våra färdiga objekt har vi redan köpt tomten ' +
        'och undersökt marken. Därför kan vi ge dig ett fast pris direkt.',
    /* COPYWRITER 25.8.2026 */
    hintaSelite:
          /* COPYWRITER 24.9.2026 */
          'Priset innehåller tomten, tomtarbetet, grunden, el- och ' +
          'vattenanslutningen samt ett färdigt hus enligt projektets ' +
          'specifikation. Grundmodellen har tre sovrum.',
    taloVertailuHinta: 'Totalpris från',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    faqSamaTalo:
        'Huset är detsamma på alla tomter. Det är orsaken till att priset ' +
        'håller: modellen anpassas inte till tomten, utan tomterna väljs ' +
        'utgående från husmodellen.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    toteutuneetOtsikko: 'Hus som vi redan har levererat',
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    prosessiOtsikko:    'Från första val till inflyttningsklart hus',
    /* LÄHDE (m) · COPYWRITER 25.8.2026 */
    prosessi1Otsikko:   'Välj tomt och hus',
    /* COPYWRITER 25.8.2026 */
    prosessi1Teksti:    'Vi ser tillsammans vilken tomt och vilket hus som passar dig.',

    /* LÄHDE (m) — Block 2:n ensimmäinen virke otsikkotasolla.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    heroOtsikkoA: 'Områden där allt redan är löst',
    /* COPYWRITER 25.8.2026 */
    heroAlariviA:
        'Vad sägs om ett hus i ett bostadsområde där tomten redan är köpt, ' +
        'planen gjord, huset ritat och bygglovet beviljat? För dig ' +
        'återstår bara två saker: valet och avtalet.',
    /* KÄÄNNÖS */
    ctaSelaaKohteita: 'Bläddra bland objekten',

    /* KÄÄNNÖS — omistusmalli B */
    heroOtsikkoB: 'Boka en kommunal tomt, vi bygger huset',
    heroAlariviBHtml:
      'Kommunen planlägger området och delar ut tomterna. Vi sköter huset, ' +
      'bygglovet och markarbetet. <span class="gap">[vahvistettava]</span>',
    ctaKatsoAlueet: 'Se områdena',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaRatkaistu: 'det enklaste sättet att köpa hus',
    /* LÄHDE (m) — Block 2:n viimeinen virke "Vi har redan optimerat allt". */
    ratkaistuOtsikkoA: 'Vi har redan optimerat allt',
    /* LÄHDE — Block 2, toinen kappale sellaisenaan.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    ratkaistuTekstiAHtml:
        'Att köpa ett grynderhus påminner om att köpa en ny lägenhet — ' +
        'fast du får ett eget fristående hus med egen trädgård. Inget ' +
        'krångel med att söka bygglov eller matcha husmodeller mot ' +
        'konstiga tomter. <span class="gap">[terassi vahvistettava]</span>',
    ratkaistuTicksA: [
      /* COPYWRITER 25.8.2026 */
      'Tomten är köpt',
      /* COPYWRITER 25.8.2026 */
      'Området är planlagt',
      /* COPYWRITER 25.8.2026 */
      'Huset är ritat',
      /* COPYWRITER 25.8.2026 */
      'Bygglovet är beviljat'
    ],

    /* KÄÄNNÖS */
    ratkaistuOtsikkoB: 'Kommunen sköter området, vi sköter huset',
    ratkaistuTekstiB:
      'Arbetsfördelningen är klar: kommunen planlägger och delar ut ' +
      'tomterna, vi ansvarar för huset och byggandet.',
    ratkaistuTicksBHtml: [
      'Området planlagt <span class="small">(kommunen)</span>',
      'Huset ritat <span class="small">(Luotokoti)</span>'
    ],

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaKohteet:      'Pågående projekt',
    /* COPYWRITER 25.8.2026 */
    listausOtsikko:  'Kolla vad vi har på gång',
    /* COPYWRITER 25.8.2026 */
    listausIngressi: 'Bygglovet är fixat och priset är fast – är det du som flyttar in?',
    tyhjaOtsikko: 'Nya objekt öppnas i etapper',
    tyhjaTeksti:
      'Vi bygger ett objekt när vi vet att det finns efterfrågan. Berätta ' +
      'på vilken ort du söker ett hem, så kartlägger vi tomterna där — ' +
      'eller se om det skulle gå att bygga på en egen tomt.',

    ylaAlueet:       'Områden',
    alueetOtsikko:   'Områden där en bokning är möjlig',
    alueetIngressiHtml:
      'Tomten bokas hos kommunen. Vi kommer med därifrån och framåt. ' +
      '<span class="gap">[prosessi vahvistettava]</span>',
    alueetTontteja:  'Tomter:',
    alueetVaraus:    'Bokning:',
    alueetTaloHinta: 'Huspris:',

    /* KÄÄNNÖS — vertailu. Vaiheet ovat sama taulukko molemmissa
       sarakkeissa, joten sanamuodon on kestettävä sekä normaali että
       yliviivattu esitys. */
    vertailuYla:     'Jämförelse',
    vertailuOtsikko: 'Två steg för dig, sju för oss',
    /* COPYWRITER 25.8.2026 */
    vertailuIngressi:
        'I listan till vänster ser du hur det brukar gå till när man ' +
        'bygger ett nytt hus — och till höger ser du processen med ' +
        'Luotokoti.',
    vertailuVaiheet: [
      'Sök och jämför tomter',
      'Kontrollera plan och byggrätt',
      /* COPYWRITER 25.8.2026 */
      'Köp tomt och ordna finansiering för den',
      'Välj husmodell och anpassa den till tomten',
      /* COPYWRITER 25.8.2026 */
      'Anlita någon för att göra huvudritningarna',
      'Ansök om bygglov',
      'Konkurrensutsätt markarbete och anslutningar',
      /* COPYWRITER 25.8.2026 */
      'Konkurrensutsätt byggandet och koordinera entreprenörer',
      'Sköt finansieringen i etapper under byggtiden'
    ],
    /* COPYWRITER 25.8.2026 */
    vertailuTavallisesti:       'Traditionell byggprocess',
    /* COPYWRITER 25.8.2026 */
    vertailuTavallisestiSelite: 'Nio steg som köparen koordinerar själv.',
    vertailuTavallisestiTulos:  'Nio steg, flera avtalsparter.',
    /* COPYWRITER 25.8.2026 */
    vertailuMeilla:       'Husbygge med Luotokoti',
    vertailuMeillaSelite: 'Samma nio steg. Sju av dem är vårt arbete.',
    vertailuMeillaSeloste:
      'De överstrukna punkterna är steg som du inte behöver göra.',
    /* KÄÄNNÖS */
    vertailuJaljella4: 'Välj hus och tomt',
    /* KÄÄNNÖS */
    vertailuJaljella9: 'Skriv under avtalet',
    /* KÄÄNNÖS */
    vertailuMeillaTulos: 'Två steg återstår: välj och skriv under.',
    /* COPYWRITER 25.8.2026 */
    vertailuCta:
        'Vi gör sju av nio steg. Vill du veta vad det skulle kosta för dig?',

    /* KÄÄNNÖS */
    ctaHintaKohteesta: 'Begär pris för det här objektet',
    hintaPysyyOtsikko: 'Varför priset håller',
    /* COPYWRITER 25.8.2026 */
    hintaPysyyTeksti:
        'Markarbetet är en riskfaktor som ofta spräcker budgeten för ' +
        'husbygget redan i början. Eftersom tomten är vår har vi undersökt ' +
        'marken redan innan vi ger dig en offert. Du slipper oroa dig för ' +
        'om budgeten håller.',
    kaksiHintaaOtsikko: 'Två priser: tomten från kommunen, huset från oss',
    kaksiHintaaTekstiHtml:
      'Tomtens pris bestäms av kommunen. Priset för huset, bygglovet och ' +
      'markarbetet är fast från oss. ' +
      '<span class="gap">[vahvistettava]</span>',
    kaksiHintaaTonttiLabel: 'Tomten, kommunens prislista:',
    kaksiHintaaTaloLabel:   'Hus, bygglov och markarbete:',
    kaksiHintaaHuomioOtsikko: 'Observera i prototypen:',
    kaksiHintaaHuomio:
      'modellen med två priser står inte längre i konflikt med ' +
      'huvudbudskapet. v5 skilde prisnivåerna från varandra, och en ' +
      'kommunal tomt är en variant av nivå 3 — samma struktur som på egen ' +
      'tomt: priset för huset är fast från oss, tomten ingår inte. Öppet ' +
      'är bara vem som kommunicerar kommunens prislista och var.',

    /* KÄÄNNÖS */
    prosessiKestoOtsikko: 'Hela processens längd:',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    faqOtsikko: 'Om våra färdiga objekt',
    faqOmistusK: 'Står tomten i mitt namn?',
    faqOmistusHuomio:
      'Det här är en central fråga för köparen och materialet svarar inte ' +
      'på den.',
    faqErikseenK: 'Kan jag välja tomten och huset separat?',
    faqVarattuK:  'Vad om huset jag vill ha är bokat?',
    /* COPYWRITER 25.8.2026 */
    faqVarattuV:
        'Husen i våra bostadsområden säljs i etapper, och vi startar nya ' +
        'projekt i takt med att vi ser var efterfrågan finns. Berätta ' +
        'vilken ort du vill bo på, så hör vi av oss så fort vi släpper nya ' +
        'hus och tomter i ditt område.',
    ukkCtaTeksti: 'Frågor om objektet eller avtalet? Vi svarar direkt.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaAluekysely: 'kartläggning',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaToteutuneet:      'färdigställda hus',
    /* COPYWRITER 25.8.2026 */
    toteutuneetIngressi:
      'Sålda hus försvinner inte från webbplatsen. Vi låter dem stå kvar ' +
      'som referenser.',
    toteutuneetTyhjaOtsikko: 'Det första objektet är fortfarande under ' +
                             'byggnad',
    toteutuneetTyhjaTeksti:
      'När det första objektet är färdigt och sålt stannar det här som ' +
      'referens. Tills vidare är den här sektionen tom.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaOtsikko:  'Låt oss hitta ett hus som passar dig',
    /* COPYWRITER 25.8.2026 */
    ctaIngressi:
      'Hör av dig, så kollar vi vad som är möjligt. Ett första samtal ' +
      'binder dig inte till någonting – vi svarar på dina frågor, hjälper ' +
      'dig vidare och låter dig fundera i lugn och ro.'
  },

  kohde: {
    /* KÄÄNNÖS */
    sivuOtsikko: 'Objekt — Luotokoti',
    sivuKuvaus:
      'Uppgifter om ett enskilt objekt: husen, tidtabellen, området och ' +
      'servicen i närheten.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    taloOtsikko: 'Huset som byggs i det här området',
    /* KÄÄNNÖS */
    taloVertailuRajattu: 'Inte på den här tomten',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaOtsikko:  'Är du intresserad av det här området?',
    /* COPYWRITER 25.8.2026 */
    ctaTeksti:
        'Anmäl ditt intresse, så berättar vi först av allt när ett hus ' +
        'blir ledigt eller när byggandet inleds på det område du är ' +
        'intresserad av. Anmälan binder dig inte till något.',

    /* KÄÄNNÖS — prototyypin oletus */
    oletusOtsikko: 'Prototypens antagande:',
    oletusSyyPuuttuu:
      'adressen innehöll ingen objektkod, så det första objektet visas.',
    oletusSyyTuntematon:
      'objektkoden i adressen hittades inte, så det första objektet visas.',
    oletusLoppuHtml:
      'Det här är ingen felsida. Objektet väljs med adressen ' +
      '<code>kohde.html?kohde=kohde-1</code>.',

    /* KÄÄNNÖS */
    faktaTaloja:        'Hus i objektet',
    faktaVapaana:       'Lediga',
    faktaKokonaishinta: 'Totalpris',
    faktaValmistuminen: 'Färdigställande',
    ctaIlmoitaKiinnostus: 'Anmäl ditt intresse',

    /* KÄÄNNÖS */
    ylaTalot:     'Husen',
    /* COPYWRITER 25.8.2026 */
    talotOtsikko: 'Husen i det här området',
    talotIngressiMyynti:
      'Samma hus, olika storlekar. Priset är ett totalpris: hus, tomt, ' +
      'bygglov och markarbete.',
    talotIngressiToteutunut:
      'Husen som byggts i objektet. Objektet är sålt, så priserna visas ' +
      'inte.',

    /* KÄÄNNÖS. Vaiheiden nimet ovat samat sanat kuin statusmerkinnässä
       (sanat-sanakirja), jotta merkintä ja aikajana eivät kerro eri
       tarinaa. */
    ylaAikataulu:          'Tidtabell',
    /* COPYWRITER 25.8.2026 */
    aikajanaOtsikko:       'Pågående projekt i olika skeden',
    aikajanaEnnakko:       'Förhandsmarknadsföring',
    aikajanaEnnakkoTeksti: 'Efterfrågan kartläggs före byggandet.',
    aikajanaMyynti:        'Till salu',
    aikajanaMyyntiTeksti:  'Husen kan bokas och priset är fast.',
    /* COPYWRITER 25.8.2026 */
    aikajanaValmis:        'Färdigställda hus',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    galleriaOtsikko: 'Bekanta dig med huset och platsen',
    galleriaToteutunut:
      'Bilderna av ett genomfört objekt är dess bästa referens — de är ' +
      'bevis och inte illustrationer.',

    /* KÄÄNNÖS */
    ylaAlue:     'Området',
    /* COPYWRITER 25.8.2026 */
    alueOtsikko: 'Avstånd till service',
    palveluKoulu:     'Skola',
    palveluPaivakoti: 'Daghem',
    palveluKauppa:    'Matbutik',
    palveluPysakki:   'Hållplats för kollektivtrafik',
    palveluKeskusta:  'Centrum',

    /* KÄÄNNÖS */
    suurinKokoLabel: 'Största möjliga storlek i det här objektet:',
    laajennusLabel:  'Utbyggnad efter inflyttning:',

    /* KÄÄNNÖS */
    ylaYhteyshenkilo: 'Kontaktperson',
    /* COPYWRITER 25.8.2026 */
    henkiloOtsikko:   'Hör av dig till vår specialist på det här området',
    henkiloNimi:      'Namn och roll',
    henkiloPuhelin:   'Telefon',
    henkiloSahkoposti: 'E-post',

    /* KÄÄNNÖS */
    toteutunutOtsikko: 'Det här objektet är byggt och sålt',
    toteutunutTeksti:
      'Berätta på vilken ort du söker ett hem, så kartlägger vi tomterna ' +
      'där och berättar vad som är möjligt. Vi bygger i hela Finland.',
    ctaMuutKohteet: 'Se de övriga objekten'
  },

  omaTontti: {
    /* KÄÄNNÖS */
    sivuOtsikko: 'Bygg på egen tomt — Luotokoti',
    sivuKuvaus:
      'Har du redan en tomt? Kolla på några minuter om den passar ' +
      'husmodellen.',

    /* Taso 3: "totalpris inom en vecka" kuuluu VAIN tälle sivulle. */
    /* KÄÄNNÖS */
    hintaOtsikko:  'Totalpris inom en vecka',
    /* COPYWRITER 25.8.2026 */
    hintaIngressi:
        'Priset för huset är fast. Markarbetets andel beror på tomten — ' +
        'och den undersöker vi inom en vecka. Du behöver inte göra ' +
        'någonting åt saken.',
    /* COPYWRITER 25.8.2026 */
    hintaSelite:
        'Grundmodellen har tre sovrum. Priset innehåller bygglovet, ' +
        'markarbetet och huset med fast inredning. Tomten är redan din, så ' +
        'den ingår inte i priset.',
    /* COPYWRITER 25.8.2026 */
    viikkoOtsikko: 'Vi står för markundersökningen, du får totalpris inom en vecka',
    viikkoTeksti:
      'Vi ger inget slutgiltigt pris innan vi vet hur marken på tomten ser ' +
      'ut. Därför beställer vi markundersökningen. Du behöver inte göra ' +
      'någonting, och den kostar dig ingenting. Inom en vecka får du ' +
      'totalpriset: hus, grund, anslutningar och markarbeten. Det priset ' +
      'håller.',

    /* KÄÄNNÖS */
    taloOtsikko:       'Huset som byggs på din tomt',
    /* KÄÄNNÖS */
    taloVertailuHinta: 'Totalpris från',
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    prosessiOtsikko:   'Från egen tomt till inflyttningsklart hus',

    /* KÄÄNNÖS — oma prosessi, jossa maaperätutkimus on oma askeleensa. */
    prosessi: [
      { otsikko: 'Berätta om din tomt',
        teksti:  'Adressen eller fastighetsbeteckningen räcker. Planen och ' +
                 'byggrätten kollar vi själva.' },
      { otsikko: 'Vi undersöker marken',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Kostnaden för markarbetet kan skena iväg. Därför undersöker vi ' +
          'tomten innan vi ger dig ett pris.' },
      { otsikko: 'Du får ett fast pris',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'En summa för hela projektet. Det kommer ingen andra offert, och ' +
          'inga dolda kostnader på vägen.' },
      { otsikko: 'Vi bygger, du flyttar in',
        /* COPYWRITER 25.8.2026 */
        teksti:
          'Byggskedet tar cirka fyra månader. Du betalar ingenting under ' +
          'byggtiden, utan först när du flyttar in.' }
    ],

    /* KÄÄNNÖS */
    tulosPisteet: '{n} / {kaikki} punkter markerade',
    tulosVarausHtml:
      '<strong>Observera:</strong> punkterna är förslag från ' +
      'prototypskedet. Luotokoti har inte bekräftat dem, och resultatet är ' +
      'inte ett löfte eller en offert.',

    /* KÄÄNNÖS */
    ylaOstopolku: 'Köpväg 2 · Egen tomt',
    heroOtsikko:  'Har du redan en tomt?',
    /* COPYWRITER 25.8.2026 */
    heroAlarivi:
        'Vi bygger också på egen tomt. Husmodellen är fast, så tomten ' +
        'måste passa den — men den saken kollar du på några minuter.',
    ctaTarkistaKuusi: 'Kolla din tomt — 6 frågor',

    /* KÄÄNNÖS */
    ylaTarkistuslista: 'Checklista',
    /* COPYWRITER 25.8.2026 */
    listaOtsikko:      'Passar husmodellen på din tomt?',
    /* COPYWRITER 25.8.2026 */
    listaIngressi:
        'Markera de punkter som du vet säkert. Resultatet uppdateras ' +
        'genast, och du behöver inga dokument för det här — det räcker med ' +
        'vad du kommer ihåg.',
    listaVarausOtsikko: 'De här punkterna är förslag.',
    listaVaraus:
      'Luotokoti har inte bekräftat dem, och de är ingen teknisk ' +
      'kravlista. De är skrivna i prototypskedet för att checklistans ' +
      'struktur och nytta ska kunna bedömas. Resultatet är inte ett löfte ' +
      'eller en offert.',
    tulosOtsikko:       'Resultat',

    /* LÄHDE (m) — USP 2:n "Du behöver inte vara projektledare eller ringa
       arga samtal till underleverantörer" ja missio.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    ylaHoidamme:     'Vår del av jobbet',
    /* COPYWRITER 24.9.2026 */
    hoidammeOtsikko: 'Du äger tomten, vi kan sköta resten',
    /* COPYWRITER 25.8.2026 */
    hoidammeTeksti:
        'Du behöver inte vara projektledare och koordinera ' +
        'underleverantörer. Vi söker bygglovet, gör markarbetet och ' +
        'monterar ditt elementhus.',
    hoidammeTicks: [
      'Bygglov och huvudritningar',
      'Markarbete och grund',
      /* COPYWRITER 25.8.2026 */
      'Huset med fast inredning, monterad'
    ],
    hoidammeTontti: 'Tomten är din, så den ingår naturligtvis inte i ' +
                    'priset.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    taloRakennusoikeus: 'Byggrätten avgör den största möjliga storleken.',

    /* KÄÄNNÖS */
    ctaHintaTontille: 'Begär pris för din tomt',

    /* KÄÄNNÖS */
    ylaSelvitys:     'Utredning',
    /* COPYWRITER 25.8.2026 */
    selvitysOtsikko: 'Vi gör utredningsarbetet',
    selvitysIngressi:
      'Checklistan är en grov riktlinje. Den egentliga utredningen är vårt ' +
      'arbete, och den görs innan vi ger ett pris.',
    selvitysMeOtsikko: 'Vi utreder för dig',
    selvitysMe: [
      'Plan och byggrätt',
      'Markens bärighet',
      'Tillgången till anslutningar',
      'Vägförbindelsen till byggplatsen'
    ],
    selvitysSinaOtsikko: 'Av dig behöver vi',
    selvitysSina: [
      'Adressen eller fastighetsbeteckningen',
      /* COPYWRITER 25.8.2026 */
      'Information om att du redan äger tomten'
    ],

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    faqOtsikko: 'Om att bygga huspaket på egen tomt',
    faqPurkuK:  'Det finns en gammal byggnad på min tomt. Kan den rivas?',
    faqPohjaK:  'Kan jag ändra planlösningen på min egen tomt?',
    /* COPYWRITER 25.8.2026 */
    faqPohjaV:
        'Vi ändrar inte planlösningen, av goda skäl. Husmodellen är ' +
        'optimerad in i minsta tekniska detalj, och det är just därför vi ' +
        'kan erbjuda dig ett fast pris.',
    faqEiSoviK: 'Vad om min tomt inte passar?',
    /* COPYWRITER 25.8.2026 */
    faqEiSoviVHtml:
        'Vi meddelar direkt om tomten som du har tänkt dig inte passar för ' +
        'huset, och vi tar inte betalt för utredningen <span ' +
        'class="gap">[vahvistettava]</span>. Om du vill kan vi hjälpa dig ' +
        'att hitta en annan tomt.',
    /* COPYWRITER 25.8.2026 */
    ukkCtaTeksti: 'Något oklart med din tomt? Vi svarar gärna på dina frågor.',

    /* KÄÄNNÖS */
    ylaEiSovi:     'Om tomten inte passar',
    /* COPYWRITER 25.8.2026 */
    eiSoviOtsikko: 'Vi hjälper dig hitta en fin tomt som fungerar',
    /* COPYWRITER 25.8.2026 */
    eiSoviTeksti:
        'Husmodellen är fast, och den passar på många tomter – men inte ' +
        'alla. Om det visar sig att din egen tomt inte passar är det ingen ' +
        'återvändsgränd: vi har färdiga tomter som redan är förberedda för ' +
        'just den här husmodellen.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaOtsikko:  'Låt oss kolla din tomt',
    /* COPYWRITER 25.8.2026 */
    ctaIngressi:
        'Adressen eller fastighetsbeteckningen räcker. Samtalet binder dig ' +
        'inte till något. Om vår husmodell inte passar på din tomt och du ' +
        'inte vill kolla andra alternativ med oss så är det helt okej.'
  },

  meista: {
    /* KÄÄNNÖS */
    sivuOtsikko: 'Om oss — Luotokoti',
    /* COPYWRITER 24.9.2026 */
    sivuKuvaus:  'Vi bygger hem i hela Finland. Vår hemort är Larsmo.',

    /* LÄHDE — brändikirjan arvo "vi bygger mycket hus för pengarna"
       otsikkotasolla. Suomessa sama asia on sanottu luontevammin, koska
       suora käännös on kömpelöä suomea (AVOIMET.md 141). Ruotsiksi
       alkuperäinen toimii otsikkona sellaisenaan. */
    heroOtsikko: 'Mycket hus för pengarna',
    /* LÄHDE — Block 5:n päätöskappaleen kaksi ensimmäistä virkettä.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    heroAlarivi:
        'På Luotokoti tycker vi att ett nytt hem ska kännas rejält och ' +
        'vara byggt med omsorg – utan att kosta skjortan. Genom att skala ' +
        'bort det onödiga och bygga smartare gör vi det möjligt för fler ' +
        'att bo riktigt bra och samtidigt ha råd att leva gott.',
    ylaMeista: 'Om oss',

    /* KÄÄNNÖS · COPYWRITER 24.9.2026 */
    toimialueOtsikko: 'Vi bygger hem i hela Finland',
    /* COPYWRITER 25.8.2026 */
    toimialueIngressi:
          /* COPYWRITER 24.9.2026 */
          'Vi bygger i hela Finland. Vår hemort är Larsmo, och där har vi ' +
          'lärt oss vad ett fast pris kräver: kommunen, entreprenörerna ' +
          'och marken måste vara kända innan siffran ges. Har du hittat ' +
          'din plats på jorden hjälper vi gärna till med att hitta en ' +
          'passande tomt för ett Luotokoti-hus i den kommunen.',

    /* LÄHDE — brändikirjan kolme kärnvärde sellaisenaan: Enkelt, Ärligt,
       Jordnära. Tässä ruotsi on alkuperäinen ja suomi käännös.
       COPYWRITER 25.8.2026 — copywriter kirjoitti lauseen uusiksi
       editorissa; yllä oleva perustelu on edellisen version eikä sitä ole
       tarkistettu tätä vastaan. */
    arvotOtsikko:   'Så här bygger vi',
    arvoRehellinen: 'Priset vi säger är det som gäller. Inga otrevliga ' +
                    'överraskningar på vägen.',
    ylaArvot:                'Kärnvärden',
    arvoYksinkertainen:      'Enkelt',
    arvoYksinkertainenTeksti: 'Inget krångel för kunden, vi tar hela ' +
                             'ansvaret.',
    arvoRehellinenOtsikko:   'Ärligt',
    arvoMaanlaheinen:        'Jordnära',
    arvoMaanlaheinenTeksti:
      'Fokus på kvalitet och funktion, vi bygger mycket hus för pengarna.',

    /* KÄÄNNÖS */
    ylaToimialue: 'Verksamhetsområde',
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    toimialueEiKartalla:
        'Ser du inte din egen ort på kartan? Det betyder inte att vi inte ' +
        'bygger där.',

    /* KÄÄNNÖS */
    ylaIhmiset:      'Människorna',
    /* COPYWRITER 25.8.2026 */
    ihmisetOtsikko:  'Teamet bakom Luotokoti',
    ihmisetAukkoHtml: '[Ihmiset — tyhjä tarkoituksella]',
    ihmisetSelite:
      'Materialet innehåller inte ett enda namn, en roll, ett fotografi ' +
      'eller ett årtal. Målgruppen köper förtroende, och namngivna ' +
      'människor är det billigaste sättet att visa det — men påhittade ' +
      'personer sätts inte in i en prototyp.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ctaOtsikko:  'Hör av dig, vi är redo att hjälpa dig',
    /* COPYWRITER 25.8.2026 */
    ctaIngressi:
        'Berätta var du skulle vilja bo, så kollar vi om det är möjligt ' +
        'att hitta en tomt där som passar för ett Luotokoti. Samtalet ' +
        'binder dig inte till något.'
  },

  yhteys: {
    /* KÄÄNNÖS */
    sivuOtsikko: 'Kontakta oss — Luotokoti',
    sivuKuvaus:  'Berätta var du skulle vilja bo. Samtalet binder dig inte ' +
                 'till något.',

    /* KÄÄNNÖS */
    heroYlaotsikko: 'Kontakta oss',
    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    heroOtsikko:    'Kort startsträcka, inga krångliga omvägar',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaKummasta:  'Vilket alternativ väljer du?',
    /* COPYWRITER 25.8.2026 */
    polkuOtsikko: 'Välj utgångspunkt, så vet vi vad du vill',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaJataTiedot: 'Lämna kontaktbegäran',
    /* COPYWRITER 25.8.2026 */
    lomakeOtsikko: 'Svara på några frågor så hör vi av oss',
    /* COPYWRITER 25.8.2026 */
    lomakeIngressi:
        'Du behöver inte ha koll på byggtermer, ritningar eller tillstånd. ' +
        'Den biten fixar vi.',
    lomakePolkuLegend:  'Vad söker du?',
    lomakePolkuPaketti: 'Jag vill köpa ett hus och en tomt',
    lomakePolkuOma:     'Jag vill bygga på min egen tomt',
    lomakePolkuAlue:    'Jag vet inte ännu',
    lomakeKohdeLabel:   'Förfrågan gäller objektet',
    lomakeKohdeVaihda:  'Byt objekt',

    lomakeAlue:    'På vilken ort söker du ett hem?',
    lomakeAlueApu: 'Orten räcker. Vi bygger i hela Finland.',
    lomakeKoko:    'Hur många sovrum?',
    lomakeEnTieda: 'Jag kan inte säga ännu',
    lomakeVapaaehtoinen: 'Frivilligt.',
    lomakeAikataulu:     'När skulle du vilja flytta in?',
    lomakeAikaAlleVuosi: 'Inom ett år',
    lomakeAika12:        'Inom 1–2 år',
    lomakeAikaYli2:      'Om mer än två år',
    lomakeNimi:      'Namn',
    lomakeEmail:     'E-post',
    lomakePuhelin:   'Telefon',
    lomakePuhelinApu: 'Frivilligt. Vi ringer bara om du ber om det.',
    lomakeViesti:    'Något annat du vill berätta',
    lomakeViestiApu: 'Har du en tomt, berätta adressen eller ' +
                     'fastighetsbeteckningen.',
    lomakeSoitto:    'Vi ringer bara om du ber om det',
    lomakeProtoVaraus:
      'I prototypen skickas formuläret ingenstans. Knappen visar ' +
      'tack-läget, så att slutet av konverteringen går att se.',

    /* KÄÄNNÖS */
    kiitosOtsikko: 'Tack — ditt meddelande är mottaget',
    kiitosTekstiHtml:
      'Vi svarar inom <span class="gap">[x arkipäivän]</span>. Under tiden ' +
      'kan du se huset eller de öppna objekten.',
    kiitosAlusta:      'Visa formuläret igen',
    kiitosAlustaVaraus:
      'Returknappen är prototypens verktyg, inte en del av den webbplats ' +
      'som publiceras.',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaSuoraan:    'kontakta oss Direkt',
    /* COPYWRITER 25.8.2026 */
    suoratOtsikko: 'Vill du hellre ringa upp? Passar utmärkt!',
    suoratPuhelin: 'Telefon',
    suoratEmail:   'E-post',
    suoratOsoite:  'Besöksadress',
    suoratYtunnus: 'FO-nummer',
    /* COPYWRITER 25.8.2026 */
    kayntiOtsikko: 'Välkommen på besök till vårt kontor!',
    /* COPYWRITER 25.8.2026 */
    kayntiTeksti:
          /* COPYWRITER 24.9.2026 */
          'Kom in till vårt kontor för att kolla ritningar och känna på ' +
          'material. Besöket sker enligt överenskommelse – boka tid i ' +
          'förväg, så att någon av oss säkert är på plats och kan svara på ' +
          'dina frågor.',
    /* COPYWRITER 24.9.2026 */
    kayntiAukiolo: 'Besök enligt överenskommelse',
    ctaSoviAika:   'Boka en besökstid',

    /* KÄÄNNÖS · COPYWRITER 25.8.2026 */
    ylaSeuraavaksi:     'Vad händer sedan?',
    seuraavaksiOtsikko: 'Du bestämmer hur vi går vidare',
    seuraavaksi1:       'Vi svarar',
    /* COPYWRITER 25.8.2026 */
    seuraavaksi1Html:
        'Vi kontaktar dig på det sätt som du valt, inom <span ' +
        'class="gap">[x arkipäivän]</span>. Du behöver inte förbereda dig, ' +
        'vi ställer inga svåra frågor.',
    /* COPYWRITER 25.8.2026 */
    seuraavaksi2:       'Vi klargör',
    /* COPYWRITER 25.8.2026 */
    seuraavaksi2Teksti:
        'Vi tar en diskussion för att höra var du skulle vilja bo, om du ' +
        'har en egen tomt, och vilken tidtabell du önskar för husbygget.',
    seuraavaksi3:       'Vi utreder',
    /* COPYWRITER 25.8.2026 */
    seuraavaksi3Teksti:
      'Vi undersöker tomten och marken för att kunna avgöra vad ' +
      'markarbetet kommer att kosta. Vi står för den kostnaden.',
    seuraavaksi4:       'Du får ett fast pris',
    /* COPYWRITER 25.8.2026 */
    seuraavaksi4Teksti:
      'Vi ger dig en offert med ett fast pris för hela projektet. Det ' +
      'kommer ingen andra offert och inga dolda kostnader på vägen heller.'
  },

  /* ======================================================================
     SANAT — datan ja koodin arvot
     ======================================================================
     Avain on suomenkielinen arvo itse, koska näillä ei ole copy-avainta:
     talo-data.js:ssä on 'Elementtitalo', ei 'tekniset.rakenteet'. Haku on
     asetukset.js:n sana()-funktiossa, ja sen perustelu on siellä.

     KAKSI ERO COPYYN:
       1. puuttuva käännös palauttaa suomen eikä aukkoa — arvo joka on
          väärällä kielellä on luettava, aukko ei
       2. suomen muuttaminen pudottaa käännöksen pois, koska avain on suomen
          arvo. Se on tarkoituksellista: muutettu lause ei ole enää sama
          lause, ja kääntäjän pitää nähdä se uudelleen.

     Kääntämättömät arvot luetellaan konsolissa (kieliRaportti) ja ne saa
     listana kutsulla ASETUKSET.kieliRaportti().
     ====================================================================== */
  sanat: {

    /* -- Aukkojen selitteet ---------------------------------------------
       Näkyvät sivulla hakasulkeissa: [ort] eikä [paikkakunta]. Hakasulkeet
       tulevat koodista, joten tässä on vain sana. */
    'paikkakunta':          'ort',
    'kunta':                'kommun',
    'alue':                 'område',
    'kaupunginosa tai alue': 'stadsdel eller område',
    'lainaus':              'citat',
    'nimi':                 'namn',
    'nimi ja rooli':        'namn och roll',
    'etäisyys':             'avstånd',
    'osoite':               'adress',
    'sähköposti':           'e-post',
    'puhelinnumero':        'telefonnummer',
    'y-tunnus':             'FO-nummer',
    'aukioloajat':          'öppettider',
    'lkm':                  'antal',
    'luku':                 'siffra',
    'vahvistettava':        'bekräftas',
    'valmistuminen':        'färdigställande',
    'kokonaiskesto':        'total längd',
    'x arkipäivän':         'x vardagar',
    'kahden arkipäivän':    'två vardagar',
    'terassi vahvistettava': 'altan bekräftas',
    'takuu vahvistettava':  'garantin bekräftas',
    'lupa vahvistettava':   'bygglovet bekräftas',
    'prosessi vahvistettava': 'processen bekräftas',
    'selvityksen kesto':    'utredningens längd',
    'termivalinta':         'termval',
    'takuuaika':            'garantitid',
    'huoneistotyyppi':      'bostadstyp',
    'energialuokka':        'energiklass',
    'kerrokset':            'våningar',
    'lämmitysmuoto':        'uppvärmningsform',
    'rakennetyyppi':        'konstruktionstyp',
    'ilmanvaihto':          'ventilation',
    'pohjapiirustus':       'planlösning',
    'suurin koko':          'största storlek',
    'selvitettävä':         'utreds',
    'mallin nimi':          'modellens namn',
    'Mallin nimi':          'Modellens namn',
    'kohteen nimi':         'objektets namn',
    'kolmas luku — mikä?':  'tredje siffran — vilken?',
    'JRT-suhteen muotoilu': 'formuleringen om relationen till JRT',
    'yksi lause kohteesta': 'en mening om objektet',
    'kuvaus alueesta, 2–3 lausetta': 'beskrivning av området, 2–3 meningar',
    'Yksi lause: kenelle talo on suunniteltu':
      'En mening: för vem huset är planerat',
    'kokojen hinnat':       'priser för storlekarna',
    'kokojen tiedot':       'uppgifter om storlekarna',
    'sisustustyylin nimi':  'inredningsstilens namn',
    'sisustustyylin kuvaus': 'inredningsstilens beskrivning',
    'sisustustyylit puuttuvat': 'inredningsstilarna saknas',
    'talokohtaiset tiedot puuttuvat': 'husspecifika uppgifter saknas',
    'liittymät — sisältyykö?': 'anslutningar — ingår de?',
    'kuka hakee rakennusluvan?': 'vem söker bygglovet?',
    'kuka vastaa maatöistä ja liittymistä?':
      'vem ansvarar för markarbete och anslutningar?',
    'kunnan prosessi ja linkki': 'kommunens process och länk',
    'omistuksen siirtymisen kuvaus puuttuu':
      'beskrivningen av äganderättens övergång saknas',
    'muut asiakirjat — täydennettävä': 'övriga dokument — kompletteras',
    'purkutyöt — sisältyykö, ja millä ehdoilla?':
      'rivningsarbete — ingår det, och på vilka villkor?',
    'tietosuojaseloste puuttuu': 'dataskyddsbeskrivningen saknas',
    'rajaus — täydennettävä': 'avgränsning — kompletteras',
    'k-m²':                 'v-m²',
    '€ tai sisältyy':       '€ eller ingår',
    '€ / m² tai kiinteä':   '€ / m² eller fast',
    'Ihmiset — tyhjä tarkoituksella': 'Människorna — tom med avsikt',

    /* -- Kokojen nimet ---------------------------------------------------
       kokoNimi() kokoaa nimen makuuhuoneiden määrästä. Ruotsissa yksikkö ja
       monikko ovat sama sana, joten molemmat avaimet osoittavat samaan. */
    'makuuhuone':           'sovrum',
    'makuuhuonetta':        'sovrum',
    'Kolmas makuuhuone':    'Tredje sovrummet',
    'Neljäs makuuhuone':    'Fjärde sovrummet',
    'Viides makuuhuone':    'Femte sovrummet',

    /* -- Talon tiedot (talo-data.js) ------------------------------------- */
    'Rakennuslupa ja paperityöt': 'Bygglov och pappersarbete',
    'Haemme luvan puolestasi.':
      'Vi söker bygglovet för dig och tar hand om pappersarbetet under ' +
      'byggprocessen.',
    'Maatyöt':                    'Markarbete',
    'Talonrakentamisessa yleensä pettävät maatyöt. Luotokoti ottaa sen riskin.':
        'Kostnaden för markarbetet kan bli överraskande hög i husprojekt. ' +
        'En riskfaktor som du kan strunta i eftersom Luotokoti tar den ' +
        'risken.',
    'Talo ja kiinteä sisustus':   'Huset och den fasta inredningen',
    'Liittymät':                  'Anslutningar',
    'Avaimenluovutus':            'Nyckelöverlämning',
    'Hoidamme prosessin luvasta avaimeen.':
        'Vi sköter processen från bygglov tills att du får husnycklarna i ' +
        'din hand.',
    'Elementtitalo':              'Elementhus',
    'Lämmitys':                   'Uppvärmning',
    'Energialuokka':              'Energiklass',
    'Rakenteet':                  'Konstruktion',
    'Ilmanvaihto':                'Ventilation',
    'Takuu':                      'Garanti',
    'Hinta':                      'Pris',
    'Valittu koko:':              'Vald storlek:',
    'Vahvistettava — mainitaan vain sisäisessä aineistossa.':
      'Bekräftas — nämns bara i internt material.',
    'Sisältyy-listaa ei ole aineistossa.':
      'Någon lista över vad som ingår finns inte i materialet.',

    /* -- Pohjapiirustuksen huoneet --------------------------------------
       Piirustus on alkujaan ruotsinkielinen (Walltec, Nordhem Röd), joten
       nämä ovat piirustuksen omia nimiä eivätkä käännöksiä. Suomennokset
       ovat prototyypin ehdotuksia (AVOIMET.md 164) — ruotsiksi palataan
       lähteeseen. */
    'Makuuhuone':          'Sovrum',
    'Varasto':             'Förråd',
    'Olohuone + keittiö':  'Vardagsrum + kök',
    'WC':                  'WC',
    'Kylpyhuone':          'Badrum',
    'Eteinen':             'Tambur',
    'Apukeittiö':          'Hjälpkök',
    'Terassi':             'Terrass',
    'Kuisti':              'Veranda',

    /* -- Kohteiden merkinnät (kohteet-data.js) --------------------------- */
    'Ennakkomarkkinoinnissa': 'Förhandsmarknadsföring',
    'Myynnissä':              'Till salu',
    'Toteutunut':             'Genomfört',
    'Muuttovalmis nyt':       'Inflyttningsklart nu',
    'Valmis':                 'Klart',
    'Vapaa':                  'Ledigt',
    'Varattu':                'Bokat',
    'Myyty':                  'Sålt',
    'taloa':                  'hus',
    'vapaana':                'lediga',
    'Katso kohde':            'Se objektet',
    'Katso toteutunut kohde': 'Se det genomförda objektet',
    'Katso kaikki {n} kohdetta': 'Se alla {n} objekt',
    'Merkityt kohdepaikkakunnat:': 'Utmärkta orter med objekt:',
    'Kohde':                  'Objekt',
    'onnistuu tällä tontilla':    'är möjlig på den här tomten',
    'ei onnistu tällä tontilla':  'är inte möjlig på den här tomten',
    'Koko':                   'Storlek',
    'Pinta-ala':              'Boarea',
    'Tila':                   'Status',
    'Pohja':                  'Planlösning',
    'Kohteen talot: koko, pinta-ala, hinta ja tila':
      'Objektets hus: storlek, boarea, pris och status',
    'Talokohtaisia tietoja ei ole vielä. Rakenne on olemassa, sisältö ei.':
      'Husspecifika uppgifter finns inte ännu. Strukturen finns, ' +
      'innehållet inte.',
    'Tarkista sopiiko tonttisi': 'Kolla om din tomt passar',

    /* -- Tonttikriteerit (tonttikriteerit.js) ---------------------------
       Kuusi kriteeriä ja kolme tulostasoa. Nämä ovat lauseita mutta datassa,
       koska niillä on tunnus ja logiikka (kynnysarvot) — ks. asetukset.js.
       TÄRKEÄÄ: alin tulostaso ei torju kävijää, ja käännöksen on pidettävä
       sama sävy. Se on hyväksymiskriteeri, ei tyylikysymys. */
    'Rakennusoikeus riittää vähintään pienimpään kokoon':
      'Byggrätten räcker minst till den minsta storleken',
    'Rakennusoikeus määrittää minkä kokoisena talo rakennetaan. Pienin koko tarvitsee vähintään':
      'Byggrätten avgör i vilken storlek huset byggs. Den minsta storleken ' +
      'kräver minst',
    'Vesi ja viemäri ovat liitettävissä':
      'Vatten och avlopp går att ansluta',
    'Tontti on liitettävissä kunnalliseen vesi- ja viemäriverkkoon, tai vaihtoehto on jo selvitetty.':
      'Tomten går att ansluta till det kommunala vatten- och avloppsnätet, ' +
      'eller ett alternativ är redan utrett.',
    'Tieyhteys kestää raskaan kaluston':
      'Vägförbindelsen håller för tung utrustning',
    'Elementtirekka ja nosturi pääsevät tontille asti.':
      'Elementtrailern och kranen kommer fram till tomten.',
    'Maaperä on rakennettavissa': 'Marken går att bygga på',
    'Tiedossa ei ole tarvetta paalutukselle tai muille erityisperustuksille.':
      'Det finns inget känt behov av pålning eller andra ' +
      'specialgrundläggningar.',
    'Tontti on riittävän tasainen': 'Tomten är tillräckligt jämn',
    'Tontilla ei ole jyrkkää rinnettä tai suurta korkeuseroa.':
      'Tomten har ingen brant sluttning eller stor höjdskillnad.',
    'Tontti on toimialueellamme': 'Tomten ligger inom vårt område',
    'Rakennamme Vaasan, Kokkolan, Seinäjoen ja Porin seudulla.':
      'Vi bygger i Vasa-, Karleby-, Seinäjoki- och Björneborgsregionen.',

    'Tonttisi täyttää kaikki kuusi ehdotettua kohtaa':
      'Din tomt uppfyller alla sex föreslagna punkter',
    'Tämä on paras lähtötilanne. Seuraava askel on että katsomme tontin tiedot läpi ja tutkimme maaperän — sen jälkeen saat kiinteän hinnan koko projektille.':
      'Det här är det bästa utgångsläget. Nästa steg är att vi går igenom ' +
      'tomtens uppgifter och undersöker marken — efter det får du ett fast ' +
      'pris för hela projektet.',
    'Pyydä hinta tontillesi': 'Begär pris för din tomt',
    'Suurin osa kohdista on kunnossa': 'Största delen av punkterna är i skick',
    'Rakentaminen on hyvin todennäköisesti mahdollista. Muutama kohta pitää selvittää tarkemmin ennen kuin voimme antaa kiinteän hinnan, ja se selvitys on meidän työtämme, ei sinun.':
      'Att bygga är med stor sannolikhet möjligt. Ett par punkter måste ' +
      'utredas närmare innan vi kan ge ett fast pris, och den utredningen ' +
      'är vårt arbete, inte ditt.',
    'Muutama kohta on vielä auki': 'Ett par punkter är fortfarande öppna',
    'Tämä ei tarkoita ettei tontille voisi rakentaa. Useimmat näistä kohdista selviävät yhdellä puhelulla tai yhdellä asiakirjalla, eikä sinun tarvitse tietää vastauksia etukäteen — me selvitämme ne.':
      'Det betyder inte att det inte går att bygga på tomten. De flesta av ' +
      'de här punkterna klarnar med ett telefonsamtal eller ett dokument, ' +
      'och du behöver inte veta svaren på förhand — vi utreder dem.',
    'Pyydä arvio tontistasi': 'Begär en bedömning av din tomt',

    /* -- Kuvapaikat -----------------------------------------------------
       Prototyypin oma kerros: harmaa laatikko kertoo mikä kuva puuttuu.
       Käännetään koska se näkyy sivulla. Ks. proto.js, initKuvapaikat. */
    'Kuvapaikka':   'luotokoti',
    'Kuvapaikka 1': 'Bildplats 1',
    'Kuvapaikka 2': 'Bildplats 2',
    'Kuvapaikka 3': 'Bildplats 3',
    'Pohjapiirustus puuttuu': 'Planlösningen saknas',
    'Pohjapiirustus, kuvasuhde 4:3': 'Planlösning, bildförhållande 4:3',
    'Sama runko, kasvava pääty. Tuotesivun tärkein yksittäinen kuva — ilman sitä kävijä ei voi arvioida sopiiko talo hänelle.':
      'Samma stomme, växande gavel. Produktsidans viktigaste enskilda bild ' +
      '— utan den kan besökaren inte bedöma om huset passar hen.',
    'Päävalokuva: talo ulkoa, ihmisiä pihalla':
        'Hus och tomt i ett paket',
    'Päävalokuva: talomalli ulkoa, kuvasuhde 3:2':
      'Huvudbild: husmodellen utifrån, bildförhållande 3:2',
    'Sivun tärkein kuva. Valokuvia ei ole aineistossa.':
      'Sidans viktigaste bild. Fotografier finns inte i materialet.',
    'Asiakastilanne: papereita pöydällä, ei studiokuva':
        'Bolånet lyfter du först när huset står klart.',
    'Talomallin julkisivu':  'Husmodellens fasad',
    'Asemakaava tai ilmakuva kohdealueesta':
      'Detaljplan eller flygbild över objektområdet',
    'Kunnan asemakaava tonttijaolla':
      'Kommunens detaljplan med tomtindelning',
    'Kartta tai ilmakuva kohdealueesta':
        'Karta eller flygbild över området',
    'Ei AI:lla — kuva esittää olemassa olevaa aluetta':
      'Inte med AI — bilden visar ett område som finns',
    'Elementtiasennus: nosturi, työmaa, tekijät':
      'Elementmontage: kran, byggplats, de som gör jobbet',
    'Tämä kuva myy prosessia, ei taloa':
      'Den här bilden säljer processen, inte huset',
    'Julkisivu':             'Fasad',
    'Koko rakennus, päivänvalo': 'Hela byggnaden, dagsljus',
    'Keittiö ja olohuone':   'Kök och vardagsrum',
    'Kiinteä sisustus näkyvissä': 'Den fasta inredningen syns',
    'Kolmas kuva odottaa päätöstä, ks. muistiinpano':
      'Den tredje bilden väntar på ett beslut, se anteckningen',
    'Sisätila':              'Interiör',
    'Piha tai lähiympäristö': 'Gård eller närmiljö',
    'Valmis talo ulkoa':     'Färdigt hus utifrån',
    'Kohdekuva: alue tai valmis talo, kuvasuhde 3:2':
      'Objektbild: området eller ett färdigt hus, bildförhållande 3:2',
    'Kohdekohtainen kuva. Sama kuva ei kelpaa kahdelle kohteelle.':
      'En objektspecifik bild. Samma bild duger inte för två objekt.',
    'Kasvokuva':             'Porträtt',

    /* -- Placeholder-arvot ----------------------------------------------
       KUVITTEELLISIA. Nämä eivät ole Luotokodin tietoja, ja ne poistuvat
       kokonaan kun oikeat tiedot saadaan (placeholder-data.js). Ne ovat
       silti käännettävä: niiden tehtävä on näyttää miltä layout näyttää
       oikeanmittaisella tekstillä, ja ruotsin rivipituus on eri kuin
       suomen — kääntämätön placeholder mittaa väärää kieltä.

       Paikannimet ovat kaksikielisiä kuntia, joten niillä on virallinen
       ruotsinkielinen nimi. Henkilönimet eivät käänny. */
    /* 'Luoto' EI ole täällä kuntana vaan TALOMALLIN nimenä
       (placeholder-data.js: 'mallin nimi'). Tuotenimi ei käänny, ja kunnan
       ruotsinkielinen nimi tulee omasta copy-avaimestaan
       (yhteinen.karttaKotipaikka = Larsmo). Tämä on esimerkki siitä miksi
       arvopohjainen sanakirja vaatii tarkkuutta: sama merkkijono voi olla
       kaksi eri asiaa. Identtinen käännös on kirjoitettu auki, jotta
       tiedetään että se on tarkistettu eikä unohtunut. */
    'Luoto':            'Risö',
    'Vaasa':            'Vasa',
    'Kokkola':          'Karleby',
    'Seinäjoki':        'Seinäjoki',
    'Sundom':           'Sundom',
    'Koivuhaka':        'Björkhagen',
    'Peltola':          'Peltola',
    'Sundomin rantakaava': 'Sundom strandplan',
    'Kirkkorinne':      'Kyrkobacken',
    'Peltolan laita':   'Peltola kant',
    'Luodontie 12, 68570 Luoto': 'Larsmovägen 12, 68570 Larsmo',
    'Kuusi taloa meren puoleisella rinteellä, kaikki samalla kaavalla.':
      'Sex hus på sluttningen mot havet, alla med samma plan.',
    'Neljä taloa kävelymatkan päässä koulusta ja päiväkodista.':
      'Fyra hus på gångavstånd från skola och daghem.',
    'Ensimmäinen valmistunut kohde. Kaikki viisi taloa myyty.':
      'Det första färdiga objektet. Alla fem hus sålda.',
    'Rauhallinen pientaloalue meren läheisyydessä. Palvelut ovat kävelymatkan päässä ja keskustaan on vartti autolla.':
      'Ett lugnt småhusområde nära havet. Servicen finns på gångavstånd och ' +
      'till centrum är det en kvart med bil.',
    'Tontti siirtyy nimellesi kauppakirjan allekirjoituksessa, ennen rakentamisen aloitusta.':
      'Tomten övergår i ditt namn när köpebrevet skrivs under, före ' +
      'byggstarten.',
    'Suunniteltu perheelle joka haluaa toimivat neliöt ilman ylimääräistä — ja varaa elää hyvin myös muuton jälkeen.':
        'Planerat för en familj som vill ha funktionella ytor utan lyx — ' +
        'och råd att leva gott också efter flytten.',
    '1 kerros':         '1 våning',
    '10 vuotta':        '10 år',
    '24 taloa':         '24 hus',
    '7–9 kuukautta':    '7–9 månader',
    'noin 6 viikkoa':   'cirka 6 veckor',
    'noin 38 €/m²':     'cirka 38 €/m²',
    'Maalämpö':         'Jordvärme',
    'Energialuokka A':  'Energiklass A',
    'Puurunkoinen elementtirakenne': 'Elementkonstruktion med träregelstomme',
    'Koneellinen tulo- ja poisto, lämmöntalteenotto':
      'Mekanisk till- och frånluft med värmeåtervinning',
    'Lautaparketti, laatoitetut märkätilat':
      'Lamellparkett, kaklade våtrum',
    'Vesi, viemäri, sähkö ja kuitu sisältyvät':
      'Vatten, avlopp, el och fiber ingår',
    'Kyllä':            'Ja',
    'Sisältyy':         'Ingår',
    'Vaalea':           'Ljus',
    'Sävy':             'Ton',
    'Tumma':            'Mörk',
    'Vaaleat puupinnat, valkoiset kalusteovet ja vaalea laatta märkätiloissa.':
      'Ljusa träytor, vita luckor och ljust kakel i våtrummen.',
    'Lämmin puu keittiössä, syvä sävy kalusteovissa, tummempi laatta.':
      'Varmt trä i köket, en djup ton på luckorna, mörkare kakel.',
    'Tummat kalusteovet, tammilattia ja graafinen laatoitus märkätiloissa.':
      'Mörka luckor, ekgolv och grafiskt kakel i våtrummen.',
    'Piha-alueen viimeistely ja istutukset':
      'Finish på gården och planteringar',
    'Kodinkoneet':      'Hushållsmaskiner',
    'Autokatos tai erillinen varasto': 'Carport eller separat förråd',
    'Sisustus- ja pintamateriaalivalinnat':
      'Val av inredning och ytmaterial',
    'Kiinteistörekisteriote ja kaavakartta':
      'Fastighetsregisterutdrag och plankarta',
    'Purku onnistuu erillisellä sopimuksella':
        'Ja, vi kan hjälpa till med rivningen. Eftersom rivningsbehovet ' +
        'ser olika ut från tomt till tomt gör vi ett separat avtal för det ' +
        'arbetet.',
    'Luotokoti hakee luvan puolestasi':
      'Luotokoti söker bygglovet för dig',
    'Luotokoti vastaa maatöistä ja liittymistä':
      'Luotokoti ansvarar för markarbete och anslutningar',
    'Vaasan kaupungin tonttihaku': 'Vasa stads tomtsökning',
    'Varaus tehdään kunnan sähköisessä palvelussa.':
      'Bokningen görs i kommunens e-tjänst.',
    'Lue tietosuojaseloste': 'Läs dataskyddsbeskrivningen',
    'talo ja tontti pakettina': 'hus och tomt som paket',
    'Mikael Sundqvist, rakennuspäällikkö':
        'Tommy Tupeli, VD, +358 50 4386 693, tommy.tupeli@jrtbygg.fi',
    'Anna Björk, myynti':
      'Robert Olsen, arbetsledare, +358 50 3751 083 ' +
      'robert.olsen@jrtbygg.fi',
    'Jukka Rantala, työnjohtaja':
      'Staffan Åkerlund, försäljning, +358 50 5224 965 ' +
      'staffan.akerlund@jrtbygg.fi',
    'Saimme hinnan ensimmäisessä tarjouksessa, ja se piti loppuun asti.':
      'Vi fick priset i den första offerten, och det höll ända till slutet.',
    'Emme joutuneet kilpailuttamaan yhtään urakoitsijaa itse. Se oli meille tärkeintä, koska kumpikaan meistä ei ole rakennusalalta.':
      'Vi behövde inte konkurrensutsätta en enda entreprenör själva. Det ' +
      'var det viktigaste för oss, eftersom ingen av oss jobbar med ' +
      'byggande.',
    'Muutimme sisään aikataulussa ja maksoimme vasta silloin. Pohjaratkaisu tuntui ensin pieneltä paperilla, mutta talossa ei ole yhtään huonetta jota emme käyttäisi päivittäin.':
      'Vi flyttade in enligt tidtabellen och betalade först då. ' +
      'Planlösningen kändes först liten på papperet, men i huset finns ' +
      'inte ett rum som vi inte använder dagligen.',
    'Punaiseksi maalattu yksikerroksinen puutalo, jyrkkä harjakatto mustaa konesaumapeltiä. Pääty vasemmalla, pitkä julkisivu ikkunoineen keskellä ja sisäänkäynnin katos oikealla.':
      'Ett rödmålat trähus i en våning, brant sadeltak av svart ' +
      'bandtäckt plåt. Gaveln till vänster, den långa fasaden med fönster ' +
      'i mitten och entréns skärmtak till höger.',
    'Saman talon sisäänkäyntipuoli: puuterassi ja katos vasemmalla, vaalea ulko-ovi ja korkea punainen pääty oikealla. Piha on vielä sorapinnalla.':
      'Samma hus från entrésidan: träterrass och skärmtak till vänster, en ' +
      'ljus ytterdörr och den höga röda gaveln till höger. Gården är ännu ' +
      'grusbelagd.',
    'Saman talon takajulkisivu: parvekeovi ja kolme ikkunaa pitkällä seinällä, pääty vastavalossa oikealla, metsä ympärillä.':
      'Samma hus från baksidan: altandörr och tre fönster på den långa ' +
      'väggen, gaveln i motljus till höger, skog runtom.',
    '3 h + k':          '3 r + k',
    '4 h + k':          '4 r + k',
    '5 h + k':          '5 r + k',
    'myynti@luotokoti.fi': 'myynti@luotokoti.fi',

    /* Lohkotason placeholder-sisällöt: nämä ovat kokonaisia lauseita, ja
       käännös tehdään tekstisolmuittain insertoinnin jälkeen
       (proto.js, kaannaTekstisolmut). */
    '”Saimme hinnan ensimmäisessä tarjouksessa, ja se piti loppuun asti. Emme joutuneet kilpailuttamaan yhtään urakoitsijaa itse.”':
      '”Vi fick priset i den första offerten, och det höll ända till ' +
      'slutet. Vi behövde inte konkurrensutsätta en enda entreprenör ' +
      'själva.”',
    'Sanna ja Petri Koskinen, Sundom': 'Sanna och Petri Koskinen, Sundom',
    'Meitä on kymmenen, ja jokainen talo kulkee saman kolmen ihmisen käsien kautta: myynti, rakennuspäällikkö ja työnjohtaja. Sama porukka alusta loppuun.':
        'Luotokoti startades inte på ett kontor, utan ute på ' +
        'byggarbetsplatserna. Konceptet är utvecklat av oss på JRT Bygg – ' +
        'ett österbottniskt byggföretag med gedigen erfarenhet. Genom åren ' +
        'har vi sett hur onödigt krånglig och osäker husresan kan vara för ' +
        'kunden. Kostnaderna drar iväg utan att egentligen ge kunden något ' +
        'mervärde. Därför skapade vi Luotokoti. Vi har paketerat vår ' +
        'byggkunskap, känsla för kvalitet och vårt sunda förnuft i ett ' +
        'färdigt koncept. När du bygger med Luotokoti får du det bästa av ' +
        'två världar: tryggheten i en erfaren byggentreprenör och ' +
        'enkelheten i ett nyckelfärdigt huspaket till fast pris.',

    /* Kuvitteellisia arvoja, joissa vain yksikkö tai muoto muuttuu.
       Identtinen käännös on kirjoitettu auki sen sijaan että se jäisi
       raportin varaan: näin tiedetään että arvo on TARKISTETTU eikä
       unohtunut. */
    '860 m²':         '860 m²',
    '95 k-m²':        '95 v-m²',
    '900 m':          '900 m',
    '6':              '6',
    '+358 40 123 4567': '+358 50 4386693',
    '3312345-7':      '3312345-7',
    'Sanna ja Petri Koskinen': 'Sanna och Petri Koskinen',
    'Marika Ojala':   'Marika Ojala',
    'Tuomas ja Elina Vuorinen': 'Tuomas och Elina Vuorinen'
  }
};
