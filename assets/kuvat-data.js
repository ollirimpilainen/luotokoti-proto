/* ==========================================================================
   Luotokoti — talomallin omat kuvat

   TÄMÄ EI OLE PLACEHOLDER-TIEDOSTO. `placeholder-data.js` sisältää
   kuvitteellisia arvoja, jotka näkyvät vain ohjauspalkin sisältötilassa
   `placeholder`. Tämän tiedoston kuvat ovat Luotokodin oman arkkitehdin
   omia kuvia tästä talosta, joten ne näkyvät AINA — samoin kuin
   pohjapiirustus ja talon pinta-ala. Kytkin ei koske niitä.

   LÄHDE. HELST Arkkitehdit Oy, *Luotokoti - RISÖ 100 +*, SKEDE 2,
   25.9.2026. Kuvat on purettu aineistosta skriptillä `tyokalut/riso.py`,
   joka kertoo mitkä sivut ja miksi.

   NE OVAT VISUALISOINTEJA, EIVÄT VALOKUVIA, JA SE SANOTAAN SIVULLA.
   Talosta ei ole rakennettu yhtäkään kappaletta, joten jokainen kuva on
   mallinnus. Merkintä (`lahde`) renderöityy kuvan päälle eikä sitä saa
   poistaa ennen kuin kuva on valokuva. Perustelu on sivuston oma lupaus:
   *hinta jonka sanomme on se joka pätee*. Mallinnus joka esitetään
   valokuvana on sama virhe kuin hinta jota ei voi taata — ja se on
   helpompi huomata jälkikäteen kuin ennen julkaisua.

   MIHIN KUVA SAA MENNÄ. Sama sääntö kuin placeholder-valokuvilla, yhtä
   lisäystä lukuun ottamatta:

     · saa   kuvapaikkaan, jonka aihe on TALO ITSE — julkisivu, sisätila,
             terassi, pohja
     · ei saa kuvapaikkaan, jonka aihe on ihmiset, valmistunut
             referenssikohde, tontti, kartta tai työmaa

   Toinen kohta on se tärkeä, ja se koski 28.9.2026 asti myös
   `kohde.html`:n kuvapaikkoja *Kohdekuva* ja *Valmis talo ulkoa*: ne
   olivat todisteita siitä että talo on rakennettu, eikä visualisointi voi
   olla todiste. Sääntö oli oikea, mutta sen seuraus ei ollut.

   MITÄ SEURASI (29.9.2026). Todistepaikkoihin jäi asiakkaan oma valokuva
   valmistuneesta talosta — aito kuva, mutta EI Risö 100+:sta. Kohdesivu,
   jonka otsikko lupaa *sama talo eri kokoina*, näytti siis toista mallia
   valokuvana. Väärä malli valokuvana on pahempi väärennös kuin oikea
   malli mallinnuksena, koska valokuva ei kerro olevansa mallinnus.

   RATKAISU EI OLLUT VAIHTAA KUVAA VAAN PAIKAN TEHTÄVÄ. Kuvapaikat eivät
   enää väitä että talo on rakennettu: ne näyttävät mitä tontille tulee.
   Silloin visualisointi on oikea kuva eikä väärennös, ja
   Havainnekuva-merkintä sanoo sen ääneen. Kun ensimmäinen Risö 100+
   valmistuu, paikat muuttuvat takaisin todisteiksi ja saavat valokuvan —
   ja se on yhä kuvaussuunnitelman tärkein kohta.
   Ks. KUVATARPEET.md ja AVOIMET.md kohta 199.

   KAKSI KOKOA. `tiedosto` on 1600 px ja `pieni` 800 px. Markup valitsee
   kumman lataa kuvapaikan leveyden mukaan (`data-kuva-koko="pieni"`);
   oletus on iso. Kolmanneksen levyiseen galleriapaikkaan ei ladata
   1,4 megapikselin kuvaa.

   ALT-TEKSTIT ovat datan arvoja kuten huoneiden nimet, joten ne kääntyvät
   `sanat`-sanakirjan kautta (`copy-data-sv.js`). Kuvaus kertoo mitä
   kuvassa näkyy — ei mitä siitä pitäisi ajatella.
   ========================================================================== */

var KUVAT = {

  /* -- Julkisivut -------------------------------------------------------
     Kolme väriä samasta talosta. Onko väri kävijän valinta, ei ole
     tiedossa — ks. TALO.julkisivut ja AVOIMET.md 200. Siksi nämä ovat
     täällä yksittäisinä kuvina eivätkä valikkona.                       */
  'julkisivu-vaalea': {
    tiedosto: 'assets/kuvat/riso-julkisivu-vaalea.webp',
    pieni:    'assets/kuvat/riso-julkisivu-vaalea-800.webp',
    alt: 'Risö 100+ sisäänkäynnin puolelta: yksikerroksinen harjakattoinen ' +
         'talo, vaaleaksi kuultokäsitelty pystyrimapuujulkisivu, musta ' +
         'konesaumakatto ja katettu sisäänkäyntisyvennys. Mäntymetsä ja ' +
         'sorakäytävä.',
    lahde: 'Havainnekuva'
  },
  'julkisivu-musta': {
    tiedosto: 'assets/kuvat/riso-julkisivu-musta.webp',
    pieni:    'assets/kuvat/riso-julkisivu-musta-800.webp',
    alt: 'Sama talo sisäänkäynnin puolelta mustaksi käsiteltynä: musta ' +
         'pystyrimapuujulkisivu, vihreä konesaumakatto ja vaalea ' +
         'puusäleikkö sisäänkäynnin edessä.',
    lahde: 'Havainnekuva'
  },
  'piha-musta': {
    tiedosto: 'assets/kuvat/riso-piha-musta.webp',
    pieni:    'assets/kuvat/riso-piha-musta-800.webp',
    alt: 'Talon pihanpuoleinen julkisivu: lattiaan asti ulottuvat ikkunat, ' +
         'katettu terassi pergolapilareineen ja umpinainen pääty oikealla. ' +
         'Nurmikko ja perennaistutus.',
    lahde: 'Havainnekuva'
  },
  'piha-punainen': {
    tiedosto: 'assets/kuvat/riso-piha-punainen.webp',
    pieni:    'assets/kuvat/riso-piha-punainen-800.webp',
    alt: 'Sama pihajulkisivu punaiseksi maalattuna, katto samaa punaista. ' +
         'Katettu terassi ja ruokailuryhmä lasiseinän takana.',
    lahde: 'Havainnekuva'
  },
  'pitkasivu-punainen': {
    tiedosto: 'assets/kuvat/riso-pitkasivu-punainen.webp',
    pieni:    'assets/kuvat/riso-pitkasivu-punainen-800.webp',
    alt: 'Talon pitkä pihajulkisivu punaisena: yhtenäinen ikkunarivi, ' +
         'pergolan kannattamat pilarit koko matkalla ja kivetty terassi. ' +
         'Peltoaukea ja järvi taustalla.',
    lahde: 'Havainnekuva'
  },

  /* -- Sisätilat --------------------------------------------------------
     Kaikissa sama materiaalimaailma: vaalea puu, luonnonvalkoinen
     kaapisto, terrakottalaatta ja tammilattia. Ks. TALO.tyylit — paletti
     on yksi eikä kolme linjaa.                                          */
  'eteinen': {
    tiedosto: 'assets/kuvat/riso-eteinen.webp',
    pieni:    'assets/kuvat/riso-eteinen-800.webp',
    alt: 'Eteinen: lattiasta kattoon ulottuva vaalea kaapistorivi oikealla, ' +
         'avohylly vaatteille, terrakottalaattalattia ja lasiseinä ' +
         'terassille vasemmalla.',
    lahde: 'Havainnekuva'
  },
  'keittio-ruokailu': {
    tiedosto: 'assets/kuvat/riso-keittio-ruokailu.webp',
    pieni:    'assets/kuvat/riso-keittio-ruokailu-800.webp',
    alt: 'Keittiö ja ruokailutila: puinen ruokapöytä ja kuusi tuolia, ' +
         'vaalea kaapistoseinä, keittiösaareke ja terrakottalaatta ' +
         'välitilassa.',
    lahde: 'Havainnekuva'
  },
  'keittio-kaapisto': {
    tiedosto: 'assets/kuvat/riso-keittio-kaapisto.webp',
    pieni:    'assets/kuvat/riso-keittio-kaapisto-800.webp',
    alt: 'Keittiön kaapistoseinä, jossa aamiaiskaappi on auki: ' +
         'tammiverhoiltu syvennys, kahvinkeitin ja astiat hyllyllä.',
    lahde: 'Havainnekuva'
  },
  'olohuone-keittio': {
    tiedosto: 'assets/kuvat/riso-olohuone-keittio.webp',
    pieni:    'assets/kuvat/riso-olohuone-keittio-800.webp',
    alt: 'Näkymä olohuoneesta keittiöön: matala puinen taso television alla, ' +
         'ruokapöytä keskellä ja keittiö perällä. Oikealla lasiovet ' +
         'terassille.',
    lahde: 'Havainnekuva'
  },
  'olohuone': {
    tiedosto: 'assets/kuvat/riso-olohuone.webp',
    pieni:    'assets/kuvat/riso-olohuone-800.webp',
    alt: 'Olohuone: tummanvihreä kulmasohva, matala sohvapöytä ja ' +
         'jutemattoja. Neljä lattiaan ulottuvaa ikkunaa avautuu ' +
         'terassille ja pihalle.',
    lahde: 'Havainnekuva'
  },
  'keittio-terassi': {
    tiedosto: 'assets/kuvat/riso-keittio-terassi.webp',
    pieni:    'assets/kuvat/riso-keittio-terassi-800.webp',
    alt: 'Keittiön työtaso ja avoin pariovi terassille: kiviset tasot, ' +
         'terrakottalaatta välitilassa ja katettu ulkoruokailu oven takana.',
    lahde: 'Havainnekuva'
  },
  'sauna-ilta': {
    tiedosto: 'assets/kuvat/riso-sauna-ilta.webp',
    pieni:    'assets/kuvat/riso-sauna-ilta-800.webp',
    alt: 'Saunarakennus ja sen väliin jäävä katettu terassi ' +
         'iltavalaistuksessa: pitkä ruokapöytä pergolan alla, ' +
         'nojatuolit ja valaistu ovi saunaosastolle.',
    lahde: 'Havainnekuva'
  },

  /* -- Materiaalit ------------------------------------------------------
     Ei tila vaan näyte. Aineisto nimeää sen itse *alustavaksi*
     (`Preliminär färg- och materialpalett`), ja se merkintä kulkee kuvan
     mukana — paletti joka esitetään päätettynä on lupaus jota ei ole
     annettu.                                                            */
  'materiaalipaletti': {
    tiedosto: 'assets/kuvat/riso-materiaalipaletti.webp',
    pieni:    'assets/kuvat/riso-materiaalipaletti.webp',
    alt: 'Väri- ja materiaalinäytteet vierekkäin: kaksi sävyä vihreää, ' +
         'tammiviilu, travertiini, terrakottalaatta, harmaa kivi ja ' +
         'kaksi pellavakudosta. Oliivinoksa näytteiden päällä.',
    lahde: 'Alustava materiaalipaletti'
  }
};
