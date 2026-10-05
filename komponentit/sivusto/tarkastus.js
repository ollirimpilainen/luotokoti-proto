/* Lohkojen UI- ja UX-tarkastus. Kirjoitettu tarkastuksen tuloksista 30.9.2026.
   Havainto poistetaan täältä, kun se on korjattu ja mitattu uudelleen (kuvaa.py);
   korjauksen voi kirjata myös kentällä korjattu: "pvm, commit". */
window.LK_TARKASTUS = {
 "pvm": "30.9.2026",
 "kuvaus": "Kaikki 41 lohkoa käytiin läpi 30.9.2026: mittaus renderöidystä DOMista (kontrasti, kosketusalueet, ylivuoto, rivipituus, otsikot) jokaiselle storylle 1440 ja 375 px, ja visuaalinen UI- ja UX-arvio (impeccable, Krug ja Nielsen) jokaisen lohkon oletusstorysta molemmilla leveyksillä. Vakavimmat väitteet tarkistettiin kuvista ja copy-lähteestä. Vakavuusasteikko on sama kuin TARKASTUS.md:ssä.",
 "yhteiset": [
  {
   "vakavuus": "V",
   "teksti": "Nuolilinkki (.link-arrow) on 29–34 px korkea kaikkialla, missä sitä käytetään. Se on yksittäisistä havainnoista yleisin: kymmenen lohkoa ja sama syy.",
   "korjaus": "Yksi CSS-korjaus komponenttiin: min-height 44px tai pystytäyte, ei lohko kerrallaan.",
   "lohkot": [
    "talotiivistelma",
    "laajennus",
    "saatavilla",
    "yhteyshenkilo",
    "ei-sovi",
    "ukk",
    "toimialue",
    "suorat",
    "kohdelistaus",
    "hero"
   ],
   "korjattu": "30.9.2026 · styles.css §61.1 — alle rajan 62 → 30, loput ovat ylätunniste, murupolku ja valintaruudut"
  },
  {
   "vakavuus": "V",
   "teksti": "Kolmen varustetason malli (commit d465320, 30.9.2026) ei ole levinnyt koko copyyn: pohjaratkaisu sanoo yhä \"Sama talo kolmessa koossa\", talotiivistelmän ingressi puhuu makuuhuoneista talon päädyssä, ja \"Vakio\" tarkoittaa pohjaratkaisussa taloa ilman lisärakennusta mutta saunarakennuksessa rakennusta ilman saunaa. Copy korjattu osin commitissa 000563f (pohjaratkaisu ja talotiivistelmä puhuvat nyt varustetasoista); piirustus näyttää yhä lisärakennuksen Vakio-tasolla.",
   "korjaus": "Copywriterille yksi termipäätös: mitä tasot ovat ja mikä on saunarakennuksen perustason nimi. Sen jälkeen pohjaratkaisun piirustus Vakio-tilassa ilman lisärakennusta.",
   "lohkot": [
    "pohjaratkaisu",
    "talotiivistelma",
    "saunarakennus",
    "hinta"
   ]
  },
  {
   "vakavuus": "V",
   "teksti": "Merkkilistan ontto ympyrä luetaan rastittamattomaksi valintaruuduksi silloin, kun lista kertoo jo tehdyistä tai sisältyvistä asioista. Viesti kääntyy päinvastaiseksi.",
   "korjaus": "Merkkilistakomponenttiin (styles.css §52) täytetty merkki tai rasti \"tehty/sisältyy\"-listoille. Ontto rengas jää tehtävälistoille.",
   "lohkot": [
    "sisaltyy",
    "ratkaistu",
    "hoidamme"
   ],
   "korjattu": "30.9.2026 · styles.css §61.2 .ticks--tehty viidessä listassa; ontto jää \"Sinulta tarvitsemme\"- ja \"Kaksi hintaa\" -listoille"
  },
  {
   "vakavuus": "P",
   "teksti": "Listausrivi (kohde, saatavilla, toteutunut) on kolmessa lohkossa sama komponentti, ja sillä on kolme samaa puutetta: ei kuvaa, kaksi linkkiä samaan kohteeseen ja hinta heikoimpana metatietona.",
   "korjaus": "Korjaus yhteen listauskomponenttiin: pikkukuva tai kuvapaikka, koko rivi yhtenä linkkinä ja hinta omalle vahvemmalle rivilleen.",
   "lohkot": [
    "kohdelistaus",
    "saatavilla",
    "toteutuneet"
   ],
   "korjattu": "30.9.2026 · osin: hinta omalle riville (§61.3). \"Kaksi linkkiä\" oli tarkastajan virhe. Kuva puuttuu yhä."
  },
  {
   "vakavuus": "P",
   "teksti": "Taulukot eivät mahdu 375 px:iin: sarake leikkautuu ilman vierityksen vihjettä, ja yksiköt katkeavat (279 000 / €, k- / m²).",
   "korjaus": "Mobiiliin korttirakenne taulukon tilalle tai lukittu ensimmäinen sarake ja näkyvä vihje. Yksiköille nowrap.",
   "lohkot": [
    "talot-kohteessa",
    "talotiivistelma"
   ],
   "korjattu": "30.9.2026 · styles.css §61.4: vieritysvarjo ja nowrap. Korttirakenne mobiiliin yhä harkittavissa."
  },
  {
   "vakavuus": "V",
   "teksti": "CTA-johdonmukaisuus: TARKASTUS.md:n D-16 (loppu-CTA kolmena rakenteena) ja D-19 (painoarvo vaihtelee) ovat yhä voimassa. Etusivulla on kaksi peräkkäistä samannäköistä \"Pyydä kiinteä hinta\" -pääpainiketta (UKK ja loppu-CTA).",
   "korjaus": "Odottaa yhä rakennepäätöstä (D-16) ja tuotepäätöstä (D-19). Suositus: UKK:n jälkeen haamupainike kaikilla sivuilla ja loppu-CTA yhdeksi rakenteeksi.",
   "lohkot": [
    "loppu-cta",
    "ukk"
   ]
  },
  {
   "vakavuus": "V",
   "teksti": "Sisäistä työkieltä on päätynyt kävijälle näkyvään copyyn: \"nimetön kiitos ei ole referenssi\" (lainaukset) ja \"Rakennuslupa ja hinta on vastattu, ja ne lukevat vastauksina yllä\" (laajennus). Samaa on lomakkeen lupauksessa \"Kolme kenttää riittää\", vaikka lomakkeessa on kahdeksan näkyvää kenttää.",
   "korjaus": "Copywriterille v3-kierrokselle (copy-versiot/v3-ehdotukset.json), ei korjata koodissa.",
   "lohkot": [
    "lainaukset",
    "laajennus",
    "lomake"
   ]
  },
  {
   "vakavuus": "V",
   "teksti": "Mobiilin ylätunnisteesta puuttuu sivuston päätoiminto: Ota yhteyttä on Valikko-painikkeen takana kaikilla sivuilla.",
   "korjaus": "Tiivis Ota yhteyttä -painike Valikon viereen tai kielivalinta valikon sisään.",
   "lohkot": [
    "header"
   ],
   "paatos": "Odottaa päätöstä: 375 px:iin mahtuu vain jos Valikko-teksti tai kielivalinta siirtyy (markupin kirjattu syy CTA:n paikalle valikossa)."
  },
  {
   "vakavuus": "P",
   "teksti": "Eyebrow toistaa h2:n sanasta sanaan (\"Sisältyy talon hintaan\" + \"Tämä sisältyy talon hintaan\", \"Etkö löydä omaa aluettasi\" + \"Etkö löydä kohdetta omalta alueeltasi?\").",
   "korjaus": "Eyebrow on osion luokka (\"Hinta\", \"Aluekysely\"), ei otsikon esilause.",
   "lohkot": [
    "sisaltyy",
    "aluekysely"
   ]
  },
  {
   "vakavuus": "P",
   "teksti": "Hyvä uutinen: kontrasti mitattiin jokaisesta näkyvästä tekstielementistä 83 storyssa kahdella leveydellä (166 mittausta), eikä yksikään alittanut 4,5:1-rajaa (suuret tekstit 3:1). Mittari tarkistettiin positiivisella kontrollilla, joka löysi istutetun 1,87:1-tekstin. Paletin kontrastisäännöt pitävät.",
   "korjaus": "Ei toimenpiteitä. Mittaus kannattaa ajaa uudelleen jokaisen värimuutoksen jälkeen (kuvaa.py).",
   "lohkot": []
  }
 ],
 "lohkot": {
  "header": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Mobiilissa (375) Ota yhteyttä -painike katoaa kokonaan. Yläpalkissa on vain sanamerkki, Valikko ja FI/SV, joten sivuston tärkein toiminto on valikon takana.",
     "korjaus": "Pidä kapealla näkyvissä tiivis Ota yhteyttä -painike tai puhelinkuvake Valikko-painikkeen vieressä, tai siirrä kielivalinta valikon sisään, jotta painike mahtuu.",
     "peruste": "Krug: ilmeinen seuraava toiminto; Nielsen 6 tunnistaminen ennen muistamista"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) kielilinkit FI (28×44) ja SV (34×44) ovat alle 44 px leveitä ja lähellä toisiaan, joten väärä kieli on helppo osua.",
     "korjaus": "Anna linkeille vaakasuuntaista täytettä, jotta kummankin kosketusalue on vähintään 44×44.",
     "peruste": "Kosketusalue ≥ 44 px"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) ylätunnisteen sisältö on välillä x≈96–1344, mutta sisältölohkot ja footer alkavat x≈176:sta ja päättyvät 1264:ään. Sanamerkki ei osu samaan vasempaan reunaan otsikoiden kanssa.",
     "korjaus": "Käytä ylätunnisteessa samaa sisältöleveyttä kuin lohkoissa, tai perustele leveämpi kehys myös footerissa.",
     "peruste": "Yhteinen ruudukko"
    }
   ],
   "hyva": "Navigaatio on selkeä: nykyinen sivu on merkitty alaviivalla, ja pääpainike erottuu linkeistä."
  },
  "footer": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Kummallakin leveydellä footerissa ei ole yhtään yhteystietoa (puhelin, sähköposti, osoite, y-tunnus), vaikka kuvaus lupaa ne. Talokaupassa kävijä etsii puhelinnumeroa juuri footerista.",
     "korjaus": "Lisää sanamerkin alle yhteystietopalsta, jossa on puhelin ja sähköposti klikattavina linkkeinä, tai [yhteystieto]-aukko, jos tieto puuttuu.",
     "peruste": "Nielsen 6 tunnistaminen ennen muistamista; Krug: odotettu sijainti"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) prototyyppihuomautusten erotinviiva ja tekstipalsta päättyvät x≈1104:ään, mutta navigaatiopalstat ulottuvat 1264:ään. Oikea reuna on kahdessa eri kohdassa.",
     "korjaus": "Venytä erotinviiva sisällön täyteen leveyteen (176–1264) ja rajaa vain tekstipalsta erikseen.",
     "peruste": "Yhteinen ruudukko"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) huomautuskappaleiden rivit ovat 124 merkkiä pitkiä, ja pieni teksti tummalla pohjalla on raskas lukea.",
     "korjaus": "Rajaa kappaleet noin 40rem:iin (65–75 merkkiä).",
     "peruste": "Rivin pituus"
    }
   ],
   "hyva": "Navigaatio on ryhmitelty selkeästi kahteen otsikoituun palstaan, ja mobiilissa se pinoutuu luontevasti."
  },
  "hero": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Desktopissa (1440) lohkon korkeus on 1270 px ja kaksi polkulinkkiä ovat noin y≈1100:ssa, eli 800 px:n näkymän alapuolella. Ensimmäisessä näkymässä on vain kuva, ei otsikkoa eikä yhtään toimintoa.",
     "korjaus": "Rajaa kuvan korkeus noin 60vh:hon niin, että otsikko ja molemmat polut näkyvät ensimmäisessä näkymässä ylätunnisteen alla.",
     "peruste": "Krug: tarkoitus 3 sekunnissa; ilmeinen seuraava toiminto"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) alarivi ”Hoidamme kaiken luvasta avaimiin…” on valkoisena tekstinä vaalean, kirjavan sorapihan päällä, ja kirjaimet sulautuvat kiviin.",
     "korjaus": "Lisää tekstin alle paikallinen tumma liukuvärihuntu tai siirrä alarivi beigelle paneelille otsikon viereen.",
     "peruste": "Luettavuus kuvan päällä"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) kuva on vain noin 130 px korkea kaistale, jossa talo jää pieneksi. Lisäksi ensimmäisen polun otsikosta jää ”paketissa” yksin toiselle riville.",
     "korjaus": "Nosta kuvan korkeus noin 45vh:hon ja rajaa se talon mukaan. Tasapainota otsikon rivitys (text-wrap: balance).",
     "peruste": "Kuvan mittakaava; kömpelö rivitys"
    }
   ],
   "hyva": "Otsikko on sivun ainoa iso typografinen hyppy, ja kaksi tasavertaista polkua on esitetty rauhallisesti ilman kilpailevia painikkeita. (Arvioitu vain etusivun variantti.)"
  },
  "polkuvalinta": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Kummallakin leveydellä rivit näyttävät navigaatiolinkeiltä, koska niissä on nuoli eikä valintatilaa. Kuvauksen mukaan valinta kuitenkin segmentoi lomakkeen. Kävijä ei näe, että kyse on valinnasta, eikä sitä, mitä klikkaus tekee.",
     "korjaus": "Tee riveistä radio-tyyppinen valinta, jossa valittu rivi saa selvän tilan (täyttö tai rengas). Korvaa nuoli valintamerkillä tai kerro, että lomake avautuu alle.",
     "peruste": "Nielsen 1 järjestelmän tila; Nielsen 2 vastaavuus odotuksiin"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) rivit ovat 1088 px leveitä, joten nuoli on noin 700 px tekstin oikealla puolella eikä silmä yhdistä niitä.",
     "korjaus": "Rajaa rivien leveys noin 44remiin tai tuo nuoli/valintamerkki otsikon viereen.",
     "peruste": "Läheisyys; skannattavuus"
    }
   ],
   "hyva": "Otsikko kertoo suoraan, miksi valinta pyydetään, ja kahden vaihtoehdon kuvaukset ovat lyhyitä ja erottuvia."
  },
  "lupaukset": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) ensimmäisen lupauksen otsikko rivittyy kahdelle riville ja muut yhdelle. Leipätekstit alkavat siksi eri korkeuksilla (y≈420 ja 395), ja palstat näyttävät vinoilta.",
     "korjaus": "Tasaa otsikot palstoittain (esim. subgrid tai sama min-height), tai lyhennä otsikko copywriterin kanssa yhdelle riville.",
     "peruste": "Yhteinen ruudukko"
    },
    {
     "vakavuus": "P",
     "teksti": "Lupauksen otsikko (noin 18 px lihavoitu) ja leipäteksti (noin 18 px) ovat lähes samankokoisia, joten hierarkia nojaa pelkkään lihavointiin. Numeron ja otsikon väli on myös yhtä iso kuin otsikon ja tekstin väli.",
     "korjaus": "Suurenna otsikkoa yksi askel (noin 22 px) tai pienennä leipätekstiä. Tiivistä numeron ja otsikon väliä, jotta numero, otsikko ja teksti muodostavat yhden ryhmän.",
     "peruste": "Hierarkia; välistysrytmi"
    }
   ],
   "hyva": "Kolme lupausta on lyhyitä, konkreettisia ja helposti silmäiltäviä, ja mobiilissa pinoutuminen toimii luontevasti."
  },
  "pohjaratkaisu": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Kummallakin leveydellä kokovalitsimessa on valittuna ”Vakio”, mutta pohjapiirustuksessa näkyy lisärakennus (sauna, pesuhuone, grillipaikka). Se on juuri se, mikä erottaa vaihtoehdon ”Vakio ja lisärakennus”. Valinta ja kuva ovat ristiriidassa.",
     "korjaus": "Näytä Vakio-tilassa piirustus ilman lisärakennusta, tai nimeä vaihtoehdot niin, että lisärakennus kuuluu kaikkiin.",
     "peruste": "Nielsen 1 järjestelmän tila; Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "V",
     "teksti": "Mobiilissa (375) pohjapiirustus kutistuu noin 255 px leveäksi ja on käytännössä lukukelvoton. Huoneiden nimet ovat erillisenä kaksipalstaisena luettelona ilman yhteyttä piirustukseen, joten kävijä ei tiedä, missä ”Makuuhuone 9,5 m²” on.",
     "korjaus": "Numeroi huoneet piirustukseen ja luetteloon, ja lisää ”Avaa piirustus koko näytölle” -toiminto, jossa kuvaa voi zoomata nipistämällä.",
     "peruste": "Nielsen 6 tunnistaminen ennen muistamista; kuvan mittakaava"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) neljä avainlukua on pinottu täysleveiksi riveiksi, noin 80 px kukin. Ne vievät noin 330 px ja työntävät piirustuksen kauas valitsimesta.",
     "korjaus": "Asettele avainluvut 2×2-ruudukkoon kapealla.",
     "peruste": "Mobiili ei saa olla pelkkä pinottu desktop"
    }
   ],
   "hyva": "Desktopissa piirustus on arkkina oikeassa mittakaavassa, ja kolme huomiota sen vieressä kertovat, miksi pohja on hyvä."
  },
  "saunarakennus": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Tässä ”Vakiotaso” tarkoittaa lisärakennuksen sisältöä ilman saunaa. Pohjaratkaisussa ja talotiivistelmässä ”Vakio” taas tarkoittaa taloa ilman lisärakennusta. Sama sana kahdessa merkityksessä, ja lisäksi tekstin väite ”Talon pihalla on erillinen rakennus” sotii kokovaihtoehtoa ”Vakio ja lisärakennus” vastaan.",
     "korjaus": "Nimeä saunarakennuksen perustaso eri sanalla (esim. ”Perusvarasto”) ja kerro yksiselitteisesti, mihin talovaihtoehtoihin rakennus kuuluu.",
     "peruste": "Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) kuusi pohjaa on noin 160 px leveitä eikä niissä ole huonenimiä. Kävijän pitää yhdistää alla oleva luettelo (”Saunaosasto ja wc”) kuvan viivoihin itse.",
     "korjaus": "Lisää pohjiin lyhyet huonetunnukset tai korosta sauna- ja märkätilat vaalealla sävyllä, jotta erot näkyvät yhdellä silmäyksellä.",
     "peruste": "Nielsen 6 tunnistaminen ennen muistamista"
    },
    {
     "vakavuus": "P",
     "teksti": "Kummallakin leveydellä vakiotason pohja on piirretty ohuella harmaalla viivalla ja näyttää keskeneräiseltä tai poistetulta. Amberin korostuksena on vain ohut pystyviiva otsikon vieressä.",
     "korjaus": "Lisää pohjan alle selite (esim. ”kylmä rakennus – ohuet seinät”) ja vahvista amber-merkintä pieneksi tekstitunnisteeksi, kuten ”Ei saunaa”.",
     "peruste": "Hierarkia; Nielsen 2 vastaavuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) vaakanauhassa ei ole sijainnin osoitinta (esim. 1/6). Alaviite ”piirretty vaihtoehtona 4” viittaa korttiin, joka on näkymän ulkopuolella.",
     "korjaus": "Lisää nauhan alle sivuosoitin tai nuolipainikkeet ja merkitse vaihtoehto 4 nauhassa tunnisteella ”Pohjapiirustuksessa”.",
     "peruste": "Nielsen 1 järjestelmän tila; tunnistaminen ennen muistamista"
    }
   ],
   "hyva": "Kuusi vaihtoehtoa samassa mittakaavassa yhtenä nauhana on vahva vertailuratkaisu, ja mobiilissa seuraavan kortin reuna näyttää, että nauhaa voi vierittää."
  },
  "talotiivistelma": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Ingressi sanoo ”yksi talo kolmessa koossa: makuuhuoneet lisätään talon päätyyn”, mutta taulukossa kaikissa kolmessa sarakkeessa on 100 m² ja 4 h + k. Sarakkeet ovat varustetasoja, eivät kokoja, joten kävijä ei ymmärrä, mistä hinta kasvaa.",
     "korjaus": "Muuta ingressi ja taulukko kertomaan samaa: joko ”kolme varustetasoa” tai todelliset kokoerot. Lisää taulukkoon rivi siitä, mitä kukin taso sisältää.",
     "peruste": "Nielsen 4 johdonmukaisuus; Nielsen 2 vastaavuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Kummallakin leveydellä tunnisterivi ”Risö 100+ • Sama pohjaratkaisu… • Elementtitalo” rivittyy niin, että erotinpiste jää rivin loppuun ja viimeinen sana yksin uudelle riville.",
     "korjaus": "Tee tunnisteista rivittyvä lista, jossa välit ovat marginaaleja (flex-wrap, gap), tai sijoita ne allekkain.",
     "peruste": "Kömpelö rivitys"
    }
   ],
   "hyva": "Desktopissa taulukko on selkeä ja rauhallinen, ja hinnat ovat heti vertailtavissa rinnakkain."
  },
  "sisustustyylit": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Kolme sisustustyyliä on kuvattu pelkällä tekstillä. Valinta on visuaalinen ja maksaa jopa +5 900 €, mutta kävijä ei näe, miltä ”Sävy” tai ”Tumma” näyttää. Ainoa kuva on yhteinen materiaalipaletti.",
     "korjaus": "Lisää jokaiselle tyylille oma kuva tai materiaalinäyte (tai Kuvapaikka) kortin yläosaan.",
     "peruste": "Nielsen 6 tunnistaminen ennen muistamista"
    },
    {
     "vakavuus": "P",
     "teksti": "Kummallakin leveydellä hinta, eli päätöksen kannalta tärkein tieto, on noin 13 px harvennetun HINTA-nimikkeen perässä ja pienempi kuin kuvaus.",
     "korjaus": "Nosta hinta vähintään leipätekstin kokoon ja lihavoi se. Pidä nimike pienenä sen yläpuolella.",
     "peruste": "Hierarkia"
    },
    {
     "vakavuus": "P",
     "teksti": "Huomautus ”Koon valitset yllä” viittaa toiseen lohkoon, joka ei ole näkyvissä. Se ei kerro, mikä koko on valittuna.",
     "korjaus": "Näytä tässä valittu koko ja linkki kokovalitsimeen, esim. ”Valittu koko: Vakio – vaihda”.",
     "peruste": "Nielsen 6 tunnistaminen ennen muistamista"
    }
   ],
   "hyva": "Kolme valmista linjaa hintaeroineen tekevät valinnasta rajatun ja helpon, ja materiaalipaletti antaa tunnelman kerralla."
  },
  "tekniset": {
   "havainnot": [],
   "hyva": "Määrittelylista on siisti ja nopea silmäillä, ja kapealla se muuttuu luontevasti nimike–arvo-pinoksi."
  },
  "pohjafilosofia": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Kummallakin leveydellä viimeinen kappale kehottaa ottamaan yhteyttä, mutta ”Ota yhteyttä” on tavallista tekstiä ilman linkkiä tai painiketta. Suostuttelevan lohkon lopussa ei ole mitään toimintoa.",
     "korjaus": "Lisää kappaleen perään linkki tai toissijainen painike, jonka nimi on sama kuin ylätunnisteessa (”Ota yhteyttä”).",
     "peruste": "Krug: ilmeinen seuraava toiminto; Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) lohkossa on neljä samanpituista tekstikappaletta vasemmassa puoliskossa, ja oikea puolisko on tyhjä. Ydinviesti ”pituus muuttuu, pohja ei” ei näy kolmessa sekunnissa, koska otsikko puhuu kustannustehokkuudesta.",
     "korjaus": "Nosta ydinviesti näkyviin (nosto tai pieni kaavio, jossa talo pitenee päädystä) oikealle palstalle, ja pidä leipäteksti lyhyempänä.",
     "peruste": "Krug: tarkoitus 3 sekunnissa; skannattavuus"
    }
   ],
   "hyva": "Leipätekstin palsta pysyy noin 34 remissä, ja kappalejako on luettava."
  },
  "laajennus": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Pienteksti taulukon alla (1440 ja 375) kuulostaa sisäiseltä muistiinpanolta eikä sivun tekstiltä: \"Rakennuslupa ja hinta on vastattu, ja ne lukevat vastauksina yllä\". Kävijä ei tiedä, mitä hänen pitäisi tästä ymmärtää.",
     "korjaus": "Poista meta-lause. Jätä vain asiakkaalle kirjoitettu tieto: takuuvaikutus selvitetään ja kerrotaan tarjouksessa.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen / Krug: poista ylimääräinen puhe"
    },
    {
     "vakavuus": "P",
     "teksti": "Taulukon vasen sarake (1440) vaihtaa muotoa: kaksi ensimmäistä riviä ovat väitteitä, kolmas on kysymys (\"Miten se vaikuttaa takuuseen?\"). Ensimmäinen rivi myös toistaa leipätekstin lauseen sanasta sanaan. Oikean sarakkeen \"+ 21 000 €\" ei kerro, mitä sillä saa (kuinka monta huonetta tai neliötä).",
     "korjaus": "Muotoile kaikki rivit samalla tavalla kysymyksiksi, esim. Tarvitaanko lupa? / Mitä se maksaa? / Vaikuttaako takuuseen? Lisää hintariville, mitä hinta koskee, esim. \"+1 makuuhuone\".",
     "peruste": "Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "V",
     "teksti": "Korttien linkit \"Katso kohteet\" ja \"Tarkista sopiiko tonttisi\" ovat mobiilissa (375) vain 34 px korkeita.",
     "korjaus": "Nosta linkin min-height 44 px:iin pystypaddingilla tai tee koko kortista klikattava.",
     "peruste": "Kosketusalue ≥ 44 px"
    },
    {
     "vakavuus": "P",
     "teksti": "Työpöydällä (1440) taulukko päättyy noin 944 px:n kohdalle ja kortit 1264 px:n kohdalle, joten lohkossa on kaksi eri oikeaa reunaa. Taulukon arvosarake jää irralleen tyhjän tilan keskelle.",
     "korjaus": "Levitä taulukko korttien leveydelle. Toinen vaihtoehto on rajata sekä taulukko että kortit samaan 8/12-sarakkeen leveyteen.",
     "peruste": "UI: yhteinen ruudukko"
    }
   ],
   "hyva": "Kaksi polkukorttia (kohde vs. oma tontti) kertovat selvästi, että laajennuksen ehto riippuu ostotavasta."
  },
  "galleria": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Talosivun havainnekuvat ovat työpöydällä (1440) vain noin 330×185 px:n pikkukuvia. Lohkon koko 520 px on tästä suurimmaksi osaksi tyhjää. Tuotteen tärkein visuaalinen todiste jää postimerkin kokoiseksi.",
     "korjaus": "Tee yksi iso kuva (esim. 8/12 sarakkeesta) ja kaksi pienempää sen viereen pinoon. Kolmen samanlaisen ruudun rivi ei riitä tähän.",
     "peruste": "UI: kuvat väärässä mittakaavassa / laiska identtinen ruudukko"
    },
    {
     "vakavuus": "P",
     "teksti": "Kuvilla ei ole kuvatekstejä (julkisivu, olohuone-keittiö, terassi), eikä niissä näy vihjettä suurentamisesta. Kävijä ei tiedä, voiko kuvia avata isommiksi.",
     "korjaus": "Lisää lyhyt kuvateksti kuvan alle. Jos kuvat aukeavat isoiksi, lisää suurennus-ikoni tai kursorin vihje.",
     "peruste": "Nielsen 6 tunnistaminen muistamisen sijaan"
    }
   ],
   "hyva": "Havainnekuva-merkintä on jokaisessa kuvassa johdonmukaisesti samassa paikassa."
  },
  "hinta": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Väliotsikko \"HINTA KOON MUKAAN\" ei vastaa rivejä (1440 ja 375): rivit ovat lisärakennus ja autokatos, eivät talon kokoja. Lukija etsii turhaan kokovaihtoehtoja.",
     "korjaus": "Vaihda väliotsikoksi esim. \"Perushinta ja lisät\". Jos kokoja on, lisää ne omiksi riveikseen.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen"
    },
    {
     "vakavuus": "P",
     "teksti": "\"Lisärakennus 29 k-m²\": lyhenne k-m² (kerrosneliömetri) on ammattikieltä, eikä sitä selitetä missään.",
     "korjaus": "Käytä muotoa \"29 m²\" tai lisää selite (kerrosala).",
     "peruste": "Nielsen 2 / Krug: ei jargonia"
    },
    {
     "vakavuus": "P",
     "teksti": "Työpöydällä (1440) hintarivit ulottuvat 1088 px:n levyisiksi, joten nimi ja summa ovat lähes metrin päässä toisistaan ja katse eksyy rivien välillä. Rivien summat ovat myös pienempiä ja ohuempia kuin rivien nimet, vaikka ne ovat itse tieto.",
     "korjaus": "Rajaa hintaportaan leveys noin 34–40rem:iin (sama palsta kuin leipätekstillä). Tee summista vähintään nimien kokoisia, tabular-nums-numeroilla.",
     "peruste": "UI: rivinpituus ja hierarkia"
    }
   ],
   "hyva": "Yksi iso hintaluku on sivun selkein typografinen hyppy, ja sitä seuraa yksi selkeä CTA."
  },
  "sisaltyy": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Kuvauksen mukaan sisältyy- ja ei sisälly -raja näytetään merkkilistoina, mutta \"ei sisälly\" on vain leipätekstikappale listan alla (1440 ja 375). Raja ei näy yhdellä silmäyksellä.",
     "korjaus": "Tee ei sisälly -osasta oma merkkilistansa samalla rakenteella ja oma väliotsikko. Työpöydällä listat voivat olla rinnakkain.",
     "peruste": "Krug: silmäiltävyys"
    },
    {
     "vakavuus": "P",
     "teksti": "Työpöydän (1440) kaksipalstaisessa listassa rivien korkeudet heittelevät. \"Talo ja kiinteä sisustus\" -rivissä ei ole kuvausta, joten rivin alle jää tyhjä kaistale. \"Rakennuslupa\"-rivin kuvauksen yläväli on myös eri kuin \"Maatyöt\"-rivillä.",
     "korjaus": "Anna jokaiselle riville yhden rivin kuvaus tai poista kuvaukset kokonaan. Yhtenäistä otsikon ja kuvauksen väli.",
     "peruste": "UI: tasainen rytmi ja kohdistus"
    },
    {
     "vakavuus": "P",
     "teksti": "Väliotsikko \"SISÄLTYY TALON HINTAAN\" toistaa h2:n (\"Tämä sisältyy talon hintaan\") lähes sanasta sanaan. Alimman kappaleen erotinviiva päättyy 720 px:n kohdalle, kun lista ulottuu 1264 px:iin.",
     "korjaus": "Poista toistuva väliotsikko tai muuta se muotoon \"Sisältyy\" vastapariksi \"Ei sisälly\" -otsikolle. Yhtenäistä viivan leveys listan kanssa.",
     "peruste": "UI: toisteisuus ja yhteinen ruudukko"
    }
   ],
   "hyva": "Johdanto ja lista on rajattu lyhyeen palstaan, ja jokaisella sisältyvällä asialla on konkreettinen yhden lauseen perustelu."
  },
  "rahoitus": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Lohkon pitäisi näyttää rahoituksen reitti ja luvut, mutta se on pelkkä leipätekstikappale ilman lukuja, vaiheita tai jatkotoimintoa (1440 ja 375). Kävijä jää umpikujaan juuri siinä kohdassa, jossa hän miettii lainaa.",
     "korjaus": "Lisää 2–3 konkreettista lukua tai vaihetta (esim. kiinteä hinta tarjouksessa → pankkitapaaminen → maksu luovutuksessa) ja yksi linkki, esim. \"Pyydä kiinteä hinta pankkia varten\".",
     "peruste": "Krug: yksi selvä seuraava askel"
    },
    {
     "vakavuus": "P",
     "teksti": "Työpöydällä (1440) teksti päättyy noin 475 px:n kohdalle, mutta kuvapaikka jatkuu 690 px:iin. Vasemman palstan alaosaan jää noin 220 px tyhjää, ja lohko näyttää keskeneräiseltä.",
     "korjaus": "Keskitä teksti pystysuunnassa kuvaa vasten tai täytä tila luvuilla tai CTA:lla (ks. edellinen havainto).",
     "peruste": "UI: tasapaino ja orvot tyhjät alueet"
    }
   ],
   "hyva": "Otsikko ja teksti puhuvat suoraan ostajan todellisesta pelosta (pankkineuvottelu), ja teksti on rajattu hyvän mittaiseen palstaan."
  },
  "ratkaistu": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Työpöydällä (1440) kuvapaikka on noin 330 px korkea, mutta tekstipalsta noin 530 px. Kuvan alle oikealle jää iso tyhjä alue, ja lista roikkuu yksinään kuvan alapuolella.",
     "korjaus": "Venytä kuvapaikka tekstipalstan korkeuteen (align-items: stretch) tai käytä pystymuotoista kuvaa.",
     "peruste": "UI: tasapaino"
    }
   ],
   "hyva": "Neljä lyhyttä ratkaistua asiaa on nopea silmäillä, ja ne tukevat suoraan otsikon lupausta."
  },
  "kohdelistaus": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Listauksessa ei ole kuvaa kohteesta (1440 ja 375). Asuntokohteiden listauksessa kuva on ensimmäinen asia, jolla kävijä tunnistaa ja erottaa kohteet toisistaan. Nyt rivit ovat pelkkää tekstiä.",
     "korjaus": "Lisää jokaiselle riville pikkukuva tai kuvapaikka. Työpöydällä kuva voi olla rivin vasemmassa laidassa, mobiilissa rivin yläpuolella.",
     "peruste": "Krug: silmäiltävyys / tunnistaminen"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) ensimmäisen kohteen valmistumistieto on tilamerkin vieressä, mutta toisen kohteen \"VALMIS 4/2027\" rivittyy omalle rivilleen. Rivien rakenne on siksi erilainen peräkkäin.",
     "korjaus": "Pinoa mobiilissa aina tilamerkki ja valmistumistieto omille riveilleen tai lyhennä tilamerkin tekstiä (esim. \"Ennakko\").",
     "peruste": "Nielsen 4 johdonmukaisuus"
    }
   ],
   "hyva": "Tilamerkit (myynnissä / ennakkomarkkinoinnissa) erottuvat heti ja kertovat kohteen vaiheen yhdellä silmäyksellä."
  },
  "vertailu": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Mobiilissa (375) vertailu on pinottu kahdeksi 9 rivin listaksi, ja lohkosta tulee 1806 px korkea. Rinnakkaisuus katoaa: vaihe 05 \"Tavallisesti\" ja vaihe 05 \"Luotokodilla\" ovat ruudun mitan päässä toisistaan.",
     "korjaus": "Näytä mobiilissa yksi lista, jossa jokaisella rivillä on vaiheen nimi ja tila (esim. \"Me hoidamme\" / \"Sinä\"). Toinen vaihtoehto on välilehdet tai vaihtokytkin.",
     "peruste": "UI: mobiili ei saa olla vain pinottu työpöytä"
    },
    {
     "vakavuus": "P",
     "teksti": "Luotokodin sarakkeessa yliviivaukset ovat kahta eri väriä, osa harmaita ja osa amberia. Jakauma on eri työpöydällä ja mobiilissa, joten värillä ei näytä olevan merkitystä. Yliviivattu teksti on lisäksi vaikea lukea, vaikka juuri se kertoo, mitä Luotokoti tekee.",
     "korjaus": "Käytä yhtä tyyliä. Mieluummin korvaa yliviivaus himmennetyllä tekstillä ja merkillä \"Luotokoti hoitaa\".",
     "peruste": "Nielsen 4 johdonmukaisuus"
    }
   ],
   "hyva": "Otsikko tiivistää vertailun lopputuloksen (kaksi vaihetta vs. seitsemän), ja lohko päättyy yhteen selkeään CTA:han."
  },
  "aluekysely": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Väliotsikko \"ETKÖ LÖYDÄ OMAA ALUETTASI\" ja h2 \"Etkö löydä kohdetta omalta alueeltasi?\" sanovat saman asian peräkkäin (1440 ja 375).",
     "korjaus": "Vaihda väliotsikoksi esim. \"Aluekysely\" tai poista se.",
     "peruste": "Nielsen 8 minimalistinen suunnittelu"
    },
    {
     "vakavuus": "P",
     "teksti": "Painikkeesta \"Kerro alueesi\" ei selviä, mitä seuraavaksi tapahtuu (lomake, sähköposti, puhelu) eikä kuinka paljon tietoja kysytään.",
     "korjaus": "Näytä yksi kenttä (paikkakunta) suoraan lohkossa ja painike sen vieressä. Toinen vaihtoehto on kertoa painikkeen alla, esim. \"Kolme kysymystä, 1 min\".",
     "peruste": "Nielsen 1 järjestelmän tilan näkyvyys / Krug"
    }
   ],
   "hyva": "Yksi CTA ja kaksi riskiä pienentävää lupausta sen alla tekevät konversiopisteestä matalan kynnyksen."
  },
  "toteutuneet": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Referenssikohteessa ei ole valokuvaa (1440 ja 375), vaikka valmis ja rakennettu kohde on juuri se todiste, jonka kävijä haluaa nähdä. Rivi on ulkoasultaan sama kuin myynnissä olevien kohteiden listauksessa.",
     "korjaus": "Lisää valokuva (tai kuvapaikka), jossa näkyy valmis kohde. Erota referenssit myynnissä olevista esim. kuvapainotteisella kortilla.",
     "peruste": "Krug: tarkoitus 3 sekunnissa / uskottavuus"
    }
   ],
   "hyva": "Ajatus siitä, että myydyt kohteet jäävät sivustolle referensseiksi, on selvä ja rakentaa luottamusta."
  },
  "saatavilla": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Talosivulla näkyy hintahaarukka \"279 000 € – 329 000 €\" ilman selitettä (1440 ja 375). Samalla sivulla talon hinta on 237 000 €, joten kävijä ei tiedä, onko ero tontti vai eri talo.",
     "korjaus": "Lisää hinnan eteen tarkenne, esim. \"Talo ja tontti\" tai \"Tontin kanssa\". Sana \"kokonaishinta\" on varattu listaussivuille.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen / hintalogiikka"
    },
    {
     "vakavuus": "P",
     "teksti": "Listausrivissä ei ole kuvaa (sama komponentti kuin kohdelistauksessa). Hinta on korjattu omalle rivilleen (§61.3); \"kaksi linkkiä\" oli virhe, rivi on yksi linkki.",
     "korjaus": "Pikkukuva tai kuvapaikka riville: kuvatarve KUVATARPEET.md:hen ennen kuin kuvapaikkaa lisätään.",
     "peruste": "Nielsen 4 johdonmukaisuus"
    }
   ],
   "hyva": "Lohko vie talosivulta luontevasti kohteisiin ja kertoo yhdellä lauseella, mitä kohteessa on jo valmiina."
  },
  "talot-kohteessa": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) taulukko ei mahdu näytölle. TILA-sarake leikkautuu oikeasta reunasta (näkyy vain \"V…\"/\"M…\") ja POHJA-sarake jää kokonaan pois. Mikään ei vihjaa, että taulukkoa voi vierittää sivulle. Käyttäjä ei näe, mikä talo on vapaana, vaikka se on lohkon tärkein tieto. (Tarkistettu: taulukko on vierivässä säiliössä, joten tieto on saavutettavissa, mutta vierityksestä ei ole vihjettä. Siksi V eikä E.) KORJATTU OSIN 30.9.2026 (§61.4): vieritysvarjo näyttää nyt, että taulukko jatkuu. Korttirakenne olisi yhä parempi.",
     "korjaus": "Tee mobiiliin talokohtaiset rivikortit: koko ja m² otsikkona, alle hinta ja tilamerkki, pohjapiirustuslinkki omalle rivilleen. Toinen vaihtoehto on piilottaa mobiilissa Koko-sarake ja siirtää Pohja rivin alle.",
     "peruste": "Nielsen 1 järjestelmän tilan näkyvyys; responsiivisuus"
    },
    {
     "vakavuus": "V",
     "teksti": "Kummallakaan leveydellä vapaan talon riviltä ei pääse eteenpäin. Riveillä ei ole varaus- eikä tiedustelutoimintoa, joten käyttäjän pitää itse etsiä yhteydenottotapa muualta sivulta.",
     "korjaus": "Lisää VAPAA-tilaisille riveille rivikohtainen toiminto, esim. \"Kysy tästä talosta\" -linkki, joka esitäyttää talon yhteydenottolomakkeeseen. VARATTU- ja MYYTY-riveille ei toimintoa.",
     "peruste": "Krug: yksi selvä seuraava askel"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopilla (1440) KOKO-sarakkeessa on kaikilla riveillä sama \"3 makuuhuonetta\", joten sarake ei erottele vaihtoehtoja. Otsikko \"Koko\" myös sekoittuu Pinta-alaan.",
     "korjaus": "Nimeä sarake \"Huoneet\" tai yhdistä se pinta-alaan, jolloin koko on m²-luku ja sen alla huoneluku.",
     "peruste": "Nielsen 8 minimalistinen suunnittelu"
    }
   ],
   "hyva": "Tilamerkit (vapaa/varattu/myyty) ja himmennetyt ei-saatavilla-rivit kertovat desktopilla heti, mikä on ostettavissa."
  },
  "aikajana": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Molemmilla leveyksillä nykyinen vaihe on \"Myynnissä · NYT\", mutta viimeisen vaiheen Valmistuminen teksti sanoo \"Muuttovalmis nyt\". Kaksi \"nyt\"-tilaa on ristiriidassa, eikä valmistumiselle ole päivämäärää, vaikka lohkon tehtävä on näyttää vaiheet päivämäärineen.",
     "korjaus": "Näytä jokaisessa vaiheessa ajankohta (esim. \"Syksy 2026\", \"Valmis 5/2027\"). Käytä \"nyt\"-sanaa vain aktiivisessa vaiheessa.",
     "peruste": "Nielsen 1 järjestelmän tilan näkyvyys"
    },
    {
     "vakavuus": "P",
     "teksti": "Aktiivinen vaihe erottuu muista vain hieman tummemmalla yläviivalla ja pienellä NYT-tekstillä. Mobiilissa (375), jossa vaiheet ovat allekkain, eroa tuskin huomaa, eikä ohitettuja ja tulevia vaiheita voi erottaa toisistaan.",
     "korjaus": "Vahvista aktiivinen vaihe paksummalla olive-viivalla tai pisteellä, ja merkitse ohitetut vaiheet valmiiksi (esim. rastilla tai himmennyksellä).",
     "peruste": "Nielsen 6 tunnistaminen ennen muistamista"
    }
   ],
   "hyva": "Kolmen vaiheen rakenne on kevyt ja vastaa otsikon kysymykseen yhdellä silmäyksellä."
  },
  "lahipalvelut": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Molemmilla leveyksillä etäisyyksissä on pelkkä metrimäärä ilman kulkutapaa. Ingressissä sanotaan \"kävelymatkan päässä\" ja \"vartti autolla\", mutta listasta ei voi tarkistaa, kumpaa lukua tarkoitetaan.",
     "korjaus": "Lisää etäisyyksiin kulkutapa tai aika (esim. \"900 m · 12 min kävellen\"). Näytä keskustasta autoaika, jotta se vastaa ingressiä.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen"
    }
   ],
   "hyva": "Selkeä kaksipalstainen lista, jossa nimet ovat vasemmalla ja luvut oikealle tasattuina, silmäillään nopeasti kummallakin leveydellä."
  },
  "yhteyshenkilo": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Puhelinnumero on korostettu nuolilinkiksi, mutta sähköpostiosoite näkyy tavallisena tekstinä. Lisäksi myynti@luotokoti.fi on yleisosoite, vaikka lohko lupaa kohteen vastaavan suorat yhteystiedot.",
     "korjaus": "Tee sähköpostista mailto-linkki samalla tyylillä kuin puhelinnumerosta. Käytä henkilön omaa osoitetta tai kerro, että viesti ohjautuu Mikaelille.",
     "peruste": "Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopilla (1440) kolme tietoa on kaksipalstaisessa ruudukossa: Sähköposti jää yksin toiselle riville ja sen oikealle puolelle jää tyhjä solu. Yhteystiedot vievät noin 250 px ja kasvokuva lähes 600 px, joten kuva hallitsee lohkoa.",
     "korjaus": "Pinoa tiedot yhteen palstaan ja pienennä kasvokuva noin 1/3-leveyteen tai muotokuvaksi yhteystietojen viereen. Mobiilissa siirrä kuva otsikon alle pienenä ennen yhteystietoja.",
     "peruste": "Impeccable: orvot elementit, kuvan mittakaava"
    }
   ],
   "hyva": "Lohkon tehtävän ymmärtää heti: yksi nimetty ihminen, rooli ja suora puhelinnumero."
  },
  "tarkistuslista": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Mobiilissa (375) tulos on vasta kaikkien kuuden kohdan alla, noin 1 300 px listan alusta. Käyttäjä merkitsee kohtia näkemättä, että \"tulos päivittyy heti\". Desktopillakin tulospalsta vierittyy pois näkyvistä listan loppua kohti.",
     "korjaus": "Mobiiliin kiinteä alapalkki, jossa on \"x / 6 merkitty\" ja linkki tulokseen. Desktopille position: sticky tulospalstalle.",
     "peruste": "Nielsen 1 järjestelmän tilan näkyvyys"
    },
    {
     "vakavuus": "V",
     "teksti": "Valintaruudut ovat 20×20 px molemmilla leveyksillä (6 kpl). Jos label ei ympäröi koko riviä, osuma mobiilissa on liian pieni.",
     "korjaus": "Tee koko kohta (otsikko ja kuvaus) klikattavaksi labeliksi, jonka korkeus on vähintään 44 px, tai kasvata inputin osuma-aluetta.",
     "peruste": "WCAG 2.5.5 / kosketusalueet"
    },
    {
     "vakavuus": "P",
     "teksti": "Kohdan 1 kuvauksessa lukee \"95 k-m²\" ilman selitystä. Kerrosneliömetri on ammattisanastoa juuri sille kohderyhmälle, joka ei tunne rakennusalaa.",
     "korjaus": "Avaa lyhenne ensimmäisellä kerralla, esim. \"95 k-m² (kerrosalaa)\", tai lisää lyhyt selite.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen"
    },
    {
     "vakavuus": "P",
     "teksti": "Sama varaus (\"ehdotuksia… ei lupaus eikä tarjous\") toistuu kahdesti: reunaviivallisena huomiolaatikkona listan yllä ja Huomio-tekstinä tuloksessa. Mobiilissa huomiolaatikko työntää listan alun noin 200 px alemmas.",
     "korjaus": "Pidä varaus vain yhdessä paikassa, mieluiten lyhyenä tuloksen yhteydessä CTA:n yläpuolella.",
     "peruste": "Nielsen 8 minimalistinen suunnittelu"
    }
   ],
   "hyva": "Tuloksessa on yksi selkeä CTA (\"Pyydä arvio tontistasi\"), ja rauhoittava tulosteksti madaltaa kynnystä ottaa yhteyttä."
  },
  "hoidamme": {
   "havainnot": [],
   "hyva": "Otsikko ja lista vastaavat heti kysymykseen, mitä Luotokoti tekee oman tontin polulla."
  },
  "selvitys": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Palstassa \"Sinulta tarvitsemme\" luetellaan, mitä asiakkaan pitää toimittaa, mutta lohkosta ei pääse lähettämään niitä. Seuraava askel jää arvattavaksi.",
     "korjaus": "Lisää palstan alle linkki, joka vie samaan toimintoon kuin tarkistuslistan \"Pyydä arvio tontistasi\", ja käytä samaa nimeä.",
     "peruste": "Krug: selvä seuraava askel"
    }
   ],
   "hyva": "Jako \"me selvitämme\" / \"sinulta tarvitsemme\" tekee työnjaon selväksi yhdellä silmäyksellä."
  },
  "ei-sovi": {
   "havainnot": [],
   "hyva": "Yksi selkeä viesti ja yksi toiminto: umpikujan sijaan tarjotaan valmiit kohteet."
  },
  "prosessi": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Mobiilissa (375) tontti-illustraation ja ensimmäisen vaihekortin väliin jää noin 480 px tyhjää. 900 px:n ikkunassa vaiheen 01 teksti ei näy lainkaan, ja näkyvissä on vain kortin yläreuna. Käyttäjä voi luulla lohkoa tyhjäksi tai rikkinäiseksi. (Kuvassa näkyy vain vierityslohkon ensimmäinen näkymä.)",
     "korjaus": "Kiinnitä vaihekortti mobiilissa heti illustraation alle tai sen päälle alareunaan, jotta 01-otsikko ja teksti näkyvät samassa näkymässä kuvan kanssa.",
     "peruste": "Impeccable: mobiili ei saa olla huonosti pinottu desktop"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopilla (1440) näkyy vain vaihe 01. Mikään ei kerro, että vaiheita on neljä ja että niitä edetään vierittämällä.",
     "korjaus": "Lisää vaiheilmaisin (01–04, aktiivinen korostettuna) vaihetekstin viereen tai illustraation alle.",
     "peruste": "Nielsen 1 järjestelmän tilan näkyvyys"
    }
   ],
   "hyva": "Otsikko lupaa selkeästi neljä askelta, ja desktopilla illustraatio ja vaiheteksti ovat tasapainossa."
  },
  "luottamus": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Luku \"100+ toteutettua kotia\" rajataan vasta lukujen alla pienellä harmaalla tekstillä (\"tiimi on ollut mukana…\"). Rajaus jää helposti huomaamatta, joten luku antaa ymmärtää Luotokodin toteuttaneen itse yli 100 kotia. Suhde 80+ elementtitaloon jää myös epäselväksi.",
     "korjaus": "Tuo rajaus lukuun itseensä, esim. selitteeksi \"kotia tiimin toteuttamana\", ja kerro, sisältyvätkö 80 elementtitaloa sataan kotiin.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen; luottamus"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) kolme lyhyttä lukua on pinottu täysleveiksi riveiksi, joiden välissä on isot yhtä suuret välit. Lukurivi vie noin 300 px ja on yksitoikkoinen.",
     "korjaus": "Näytä luvut mobiilissa rinnakkain kolmessa kapeassa palstassa tai 2+1-ruudukossa.",
     "peruste": "Impeccable: yksitoikkoinen välistys"
    }
   ],
   "hyva": "Desktopin lukurivi antaa yhden vahvan typografisen hypyn, ja energialuokka tulee samasta vakiosta kuin faktarivillä."
  },
  "lainaukset": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Ingressin toinen virke (\"Nimi ja paikkakunta kuuluvat jokaiseen: nimetön kiitos ei ole referenssi\") kuulostaa sisäiseltä sisältöohjeelta, joka on vuotanut asiakkaalle näkyvään tekstiin molemmilla leveyksillä.",
     "korjaus": "Pyydä copywriteria korvaamaan virke asiakkaalle suunnatulla tekstillä tai poistamaan se. Periaate kuuluu sisältöohjeisiin.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) lainausmerkki on erotettu lainauksesta noin 20 px:n välillä, ja lainausten välissä on noin 60 px. Merkit näyttävät irrallisilta koristeilta, eivätkä lainaukset erotu omiksi kokonaisuuksikseen.",
     "korjaus": "Tuo lainausmerkki kiinni lainauksen ensimmäiseen riviin tai sen viereen, ja käytä lainausten välissä erotinviivaa tai suurempaa rytmieroa.",
     "peruste": "Impeccable: välistyksen rytmi"
    }
   ],
   "hyva": "Kolme eripituista lainausta nimineen ja paikkakuntineen luetaan desktopilla ilman korttilaatikoita."
  },
  "ukk": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Kysymyslistan jälkeinen kehotus ”Jäikö jokin auki? Kysy suoraan…” päättyy painikkeeseen ”Pyydä kiinteä hinta” (molemmat leveydet). Teksti lupaa mahdollisuuden kysyä, mutta painike vie hintapyyntöön. Kävijä, jolta jäi kysymys auki, ei tunnista painiketta omakseen.",
     "korjaus": "Vaihda painikkeeksi kysymiseen sopiva kohde, esim. ”Kysy meiltä”, joka vie yhteystietoihin tai lomakkeeseen. Toinen vaihtoehto on muuttaa saateteksti hintapyyntöön sopivaksi.",
     "peruste": "Nielsen 2 vastaavuus käyttäjän odotuksiin; Krug: selkeät linkkitekstit"
    },
    {
     "vakavuus": "V",
     "teksti": "Etusivulla ukk-lohkon jälkeinen painike on täytetty pääpainike (primary). D-19 pitää siis edelleen paikkansa: muilla sivuilla sama kohta on ghost-painike. Etusivulla tulee näin kaksi peräkkäistä samannäköistä ”Pyydä kiinteä hinta” -pääpainiketta (ukk ja loppu-cta), jolloin kumpikaan ei erotu sivun päätoimintona.",
     "korjaus": "Käytä ukk:n jälkeisessä kehotuksessa kaikilla sivuilla ghost-painiketta tai tekstilinkkiä. Jätä pääpainike ainoastaan loppu-cta:han.",
     "peruste": "Nielsen 4 johdonmukaisuus; Krug: yksi ilmeinen seuraava askel"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) painike on irrallaan tekstistä noin 730 px:n kohdalla. Se ei asetu tekstin jatkoksi eikä lohkon oikeaan reunaan, joten se näyttää leijuvan.",
     "korjaus": "Sijoita painike tekstin alle vasempaan reunaan, kuten mobiilissa, tai tasaa se sisältöalueen oikeaan reunaan (1264 px).",
     "peruste": "Impeccable: yhteinen ruudukko ja tasaus"
    }
   ],
   "hyva": "Kysymykset ovat lyhyitä käyttäjän omia kysymyksiä selkein ”+”-merkein, ja rivitys toimii mobiilissa siististi."
  },
  "toimialue": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Otsikko ja leipäteksti lupaavat ”koko Suomeen”, mutta kartan kaikki neljä merkintää (Luoto, Kokkola, Vaasa, Seinäjoki) ovat Pohjanmaan rannikolla. Lupaus ja kartta ovat ristiriidassa, ja kävijä muualta Suomesta päättelee, ettei hänen alueelleen rakenneta.",
     "korjaus": "Tee kartasta lupausta tukeva: esim. koko maan kattava kevyt merkintä tai selite ”kohteita nyt” erotettuna kotipaikasta. Vaihtoehtoisesti täsmennä otsikko vastaamaan todellista toimialuetta.",
     "peruste": "Nielsen 2 vastaavuus todellisuuteen; luottamus"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) nimet Vaasa ja Seinäjoki ovat lähes päällekkäin, ja ”KOTIPAIKKA”-teksti tunkeutuu rantaviivan päälle. Mittakaavan ”100 KM” osuu saaristoon, ja kuvatekstissä on alle 12 px:n tekstiä.",
     "korjaus": "Siirrä mobiilissa nimiä erilleen tai lyhennä ne (esim. vain Luoto korostettuna, muut pisteinä). Siirrä mittakaava tyhjälle merialueelle ja nosta kuvatekstin koko vähintään 12 px:iin.",
     "peruste": "Impeccable: ahtaat elementit mobiilissa"
    },
    {
     "vakavuus": "P",
     "teksti": "”Rakennamme koko Suomeen” toistuu kolmesti: otsikossa, leipätekstin ensimmäisenä lauseena ja kuvatekstissä. Leipätekstin aloitus ei tuo otsikkoon mitään uutta.",
     "korjaus": "Pyydä copywriteria aloittamaan leipäteksti kotipaikasta ja poistamaan toisto kuvatekstistä.",
     "peruste": "Krug: karsi puolet sanoista"
    },
    {
     "vakavuus": "P",
     "teksti": "Linkit ”Katso kohteet” ja ”Lue meistä” (sekä meista.html:n ”Kerro alueesi”) ovat 33–34 px korkeita. Mobiilissa (375) ne jäävät alle kosketusrajan.",
     "korjaus": "Anna .link-arrow-luokalle min-height: 44px.",
     "peruste": "Kosketusalue ≥ 44 px"
    }
   ],
   "hyva": "Tarkka, generoitu kartta ja kapea tekstipalsta antavat alueelle uskottavan, rauhallisen ilmeen."
  },
  "nimen-tarina": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Kappaleet 1 ja 2 alkavat lihavoidulla avainsanalla (”Koti”, ”Luoto”), mutta kolmannen kappaleen avausfraasi ”Harkittua laatua järkevään hintaan.” on tavallista tekstiä. Se myös toistuu heti seuraavassa lauseessa. Luettelon rakenne katkeaa ja loppu näyttää irralliselta (molemmat leveydet).",
     "korjaus": "Lihavoi kolmannen kappaleen avainsana samaan tapaan tai erota kappale omaksi päätöslauseekseen. Pyydä copywriteria poistamaan toisto.",
     "peruste": "Nielsen 4 johdonmukaisuus"
    }
   ],
   "hyva": "Sivuston ainoa tumma osio erottuu tarinalohkona luontevasti, ja tekstipalstan rivipituus on miellyttävä."
  },
  "arvot": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Numerot 01–03 viittaavat järjestykseen tai prosessiin, vaikka arvot ovat rinnakkaisia. Mobiilissa (375) numero, viiva, otsikko ja teksti ovat pinossa lähes yhtä suurin välein, jolloin rytmi on yksitoikkoinen ja lohko venyy 790 px:iin.",
     "korjaus": "Poista numerot tai pienennä numeron ja otsikon väliä niin, että ne muodostavat yhden ryhmän. Kasvata sen sijaan korttien välistä väliä.",
     "peruste": "Impeccable: tasainen välistys on virhe; Gestalt läheisyys"
    },
    {
     "vakavuus": "P",
     "teksti": "Ensimmäisen kortin teksti ”Ei säätöä asiakkaalle. Otamme / koko vastuun.” katkeaa lyhyeksi riviksi sekä desktopissa että mobiilissa, vaikka tilaa olisi enemmän. Rivitys näyttää pakotetulta.",
     "korjaus": "Poista tekstistä kiinteä rivinvaihto tai liian kapea max-width, jotta teksti täyttää palstan kuten muut kortit.",
     "peruste": "Impeccable: kömpelöt rivitykset"
    }
   ],
   "hyva": "Kolme lyhyttä arvoa ilman korttilaatikoita pysyvät kevyinä ja nopeasti silmäiltävinä."
  },
  "ihmiset": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Nimi ja rooli on sijoitettu kuvapaikan sisään. Kun kasvokuvat tulevat, teksti jää kuvan päälle. Desktopissa (1440) jo nyt ensimmäisen kortin kaksirivinen nimi nostaa sen KUVAPAIKKA-sirun eri korkeudelle kuin muiden korttien sirut.",
     "korjaus": "Siirrä nimi ja rooli kuvan alle omaksi kuvatekstikseen, jolloin tekstit asettuvat samalle perusviivalle kaikissa korteissa.",
     "peruste": "Impeccable: tasaus; kestävä rakenne"
    },
    {
     "vakavuus": "P",
     "teksti": "Johdanto luettelee roolit järjestyksessä myynti, rakennuspäällikkö, työnjohtaja, mutta kortit ovat järjestyksessä rakennuspäällikkö, myynti, työnjohtaja.",
     "korjaus": "Järjestä kortit samaan järjestykseen kuin tekstissä, eli asiakkaan kohtaamisjärjestykseen.",
     "peruste": "Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) kolme neliön muotoista kuvapaikkaa on pinottu päällekkäin täysleveinä, ja lohko venyy 1419 px:iin. Kyse on desktopin asettelusta pinottuna.",
     "korjaus": "Käytä mobiilissa matalampaa kuvasuhdetta (esim. 4:3) tai vaakariviä, jossa pieni kasvokuva on nimen vieressä.",
     "peruste": "Impeccable: mobiili ei ole pinottu desktop"
    }
   ],
   "hyva": "Otsikko ja lyhyt johdanto kertovat heti konkreettisesti, ketkä kolme ihmistä kulkevat asiakkaan mukana."
  },
  "lomake": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Johdanto lupaa ”Kolme kenttää riittää”, mutta lomakkeessa on kahdeksan kenttää. Pakollisia kenttiä ei ole merkitty. Osa kentistä on merkitty ”Vapaaehtoinen”, mutta alue, nimi, sähköposti ja ”Muuta kerrottavaa” ovat ilman merkintää. Kävijä ei tiedä, mitkä kolme kenttää riittävät (molemmat leveydet).",
     "korjaus": "Merkitse kolme pakollista kenttää yksiselitteisesti (esim. ”pakollinen”), tai merkitse kaikki muut kentät vapaaehtoisiksi. Ryhmittele vapaaehtoiset omaksi osiokseen, esim. ”Jos haluat, kerro lisää”.",
     "peruste": "Nielsen 5 virheiden ehkäisy; lomakkeiden pakollisuusmerkinnät"
    },
    {
     "vakavuus": "V",
     "teksti": "Tekstikentät (alue, nimi, sähköposti, puhelin) ovat pelkkiä alaviivoja noin 60 px otsikon alapuolella. Valikot ja tekstialue taas ovat laatikoita. Alaviiva näyttää erotinviivalta, eikä sitä tunnista kirjoituskentäksi. Otsikko myös irtoaa kentästään.",
     "korjaus": "Käytä kaikissa kentissä samaa laatikkotyyliä kuin valikoissa ja tuo otsikko 6–8 px:n päähän kentästä.",
     "peruste": "Nielsen 6 tunnistettavuus; Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Lähetyspainike on ”Pyydä kiinteä hinta”, vaikka otsikko on ”Otamme yhteyttä” ja valittuna on ”En tiedä vielä”. Painikkeen teksti ei vastaa valintaa, ja segmentoivan lomakkeen luonteva kohta muuttaa sitä jää käyttämättä.",
     "korjaus": "Vaihda painikkeen tekstiä polkuvalinnan mukaan (esim. ”Pyydä hinta tontillesi” / ”Lähetä tiedot”).",
     "peruste": "Nielsen 2 vastaavuus; selkeät CTA-tekstit"
    },
    {
     "vakavuus": "P",
     "teksti": "Desktopissa (1440) polkuvalinnan rivit ja viivat ulottuvat koko 1088 px:n levyiseksi, kun kaikki muut kentät ovat 544 px levyisiä. Lomakkeella on kaksi eri leveyttä.",
     "korjaus": "Rajaa radioryhmä samaan 544 px:n palstaan kuin muut kentät.",
     "peruste": "Impeccable: yhteinen ruudukko"
    }
   ],
   "hyva": "Vapaaehtoisuuden merkinnät, ”En osaa vielä sanoa” -oletusarvot ja lupaukset painikkeen alla madaltavat yhteydenoton kynnystä hyvin."
  },
  "suorat": {
   "havainnot": [
    {
     "vakavuus": "P",
     "teksti": "Käyntiosoite näkyy kahdesti, ylärivillä ja heti alla ”Voit myös tulla käymään” -paneelissa. Myös ”Käynti sovitaan etukäteen” toistuu kahdesti: leipätekstissä ja aukioloaikojen otsikkona. Mobiilissa toisto pidentää lohkoa selvästi.",
     "korjaus": "Poista osoite ylärivistä, tai tee paneelista osoitteen jatke. Anna aukioloajoille otsikoksi ”Aukioloajat”.",
     "peruste": "Krug: karsi toisto; Nielsen 8 minimalismi"
    }
   ],
   "hyva": "Yhteystavat on jaettu selkeiksi nimetyiksi riveiksi, ja käyntiehdotuksella on oma selkeä toimintonsa (”Sovi käyntiaika”)."
  },
  "loppu-cta": {
   "havainnot": [
    {
     "vakavuus": "V",
     "teksti": "Etusivun loppu-CTA on edelleen täytetty beige paneeli, vaikka lohkon oma periaate on ”erotettu rakenteella, ei värillä (§50)”. D-16 pitää siis yhä paikkansa. Mittauksen mukaan talo.html:n versiossa ei ole yhtään painiketta, eli se on yhä polkukorttirakenne. Sama lohko on eri sivuilla kolmena eri rakenteena.",
     "korjaus": "Yhtenäistä kaikki kuusi esiintymää yhdeksi rakenteeksi: rakenteellinen erotus, yksi pääpainike ja yksi ghost-painike. Lisää talo.html:iin pääpainike.",
     "peruste": "Nielsen 4 johdonmukaisuus"
    },
    {
     "vakavuus": "P",
     "teksti": "Mobiilissa (375) ghost-painike ”Katso talo ja pohjaratkaisu” on noin 60 px leveämpi kuin pääpainike ”Pyydä kiinteä hinta”. Toissijainen toiminto näyttää näin visuaalisesti suuremmalta.",
     "korjaus": "Tee mobiilissa molemmista painikkeista täysleveät tai anna niille yhtenäinen leveys.",
     "peruste": "Impeccable: visuaalinen hierarkia"
    },
    {
     "vakavuus": "P",
     "teksti": "Leipätekstin ja painikkeiden väli (noin 20 px) on selvästi pienempi kuin otsikon ja tekstin väli (noin 50 px). Painikkeet painuvat tekstiin kiinni, kun taas otsikko jää irralleen (molemmat leveydet).",
     "korjaus": "Pienennä otsikon ja tekstin väliä ja kasvata tekstin ja painikkeiden väliä noin 32 px:iin.",
     "peruste": "Impeccable: välistyksen rytmi"
    },
    {
     "vakavuus": "P",
     "teksti": "Otsikko ja teksti puhuvat keskustelusta (”Yksi keskustelu riittää alkuun”, ”Kerro missä haluaisit asua”), mutta pääpainike on ”Pyydä kiinteä hinta”. Kävijä ei tiedä, pyytääkö hän keskustelua vai tarjousta.",
     "korjaus": "Tuo otsikko ja painike samalle viestille, esim. ”Pyydä kiinteä hinta – aloitamme keskustelulla”. Päätä sanamuoto yhdessä copywriterin kanssa.",
     "peruste": "Nielsen 2 vastaavuus; selkeät CTA-tekstit"
    }
   ],
   "hyva": "Etusivulla on yksi selvä pääpainike ja sen vieressä rauhallinen vaihtoehto, ja lupausrivi painikkeiden alla madaltaa kynnystä."
  }
 }
};
