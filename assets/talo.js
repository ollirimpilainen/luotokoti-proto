/* ==========================================================================
   Luotokoti — talomallin tiedot ja kokovalinta
   Ei riippuvuuksia. Ladataan talo-data.js:n jälkeen, ennen proto.js:ää.

   v3: tiedosto ei ole enää pelkkä talosivun renderöijä. Talo ei ole yksi
   kokoonpano vaan kolme kokoa, ja valittu koko seuraa käyttäjää sivulta
   toiselle. Siksi tämä ladataan viidellä sivulla: talo.html, index.html,
   kohteet.html, kohde.html ja oma-tontti.html.

   01 Kokovalinta      sivukohtainen tila, säilyy sessionStoragessa
   02 Renderöinti      data-talo -paikat ja talosivun listat
   03 Kokoporrastus    hintablokin variantti A

   Renderöinnin sääntö: null ja tyhjä taulukko eivät renderöidy tyhjänä
   tilana vaan merkittynä aukkona. Sivun tehtävä on näyttää aukkonsa.

   Kokovalinta EI ole prototyypin ohjausvaihdin. Ohjauspalkin vaihtimet ovat
   suunnittelijan päätöksiä joita asiakas katselmoi; koko on käyttäjän oma
   valinta. Siksi se ei ole asetukset.js:ssä eikä ohjauspalkissa.
   ========================================================================== */

(function () {
  'use strict';

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  function log(name, extra) {
    var line = '[luotokoti-proto] ' + name;
    if (extra) { console.log(line, extra); } else { console.log(line); }
  }

  /* Datan ja koodin arvot kulkevat kieliapurin läpi: huoneiden nimet,
     aukkojen selitteet ja listojen tekstit ovat suomenkielisiä arvoja eikä
     copy-avaimia, joten niiden käännös haetaan COPY_SV.sanat-sanakirjasta.
     Ks. asetukset.js, Kieliapurit. */
  var sana = (typeof ASETUKSET !== 'undefined' && ASETUKSET.sana)
    ? ASETUKSET.sana : function (t) { return t; };

  /* TALO puuttuu vain jos talo-data.js ei ole latautunut. Kaatuminen olisi
     huonompi kuin tyhjä sivu, joten varmistetaan. */
  var data = (typeof TALO !== 'undefined' && TALO) ? TALO : null;
  var koot = (data && data.koot && data.koot.length) ? data.koot : [];

  /* Merkitty aukko. Ei koskaan tyhjä merkkijono, ei koskaan arvattu arvo. */
  function gap(label) {
    var el = document.createElement('span');
    el.className = 'gap';
    el.textContent = '[' + sana(label) + ']';
    /* Ks. proto.js, kaannaAukot: merkintä estää toisen käännöskerroksen. */
    el.setAttribute('data-aukko-lahde', 'js');
    return el;
  }

  function setSlot(el, value, label) {
    el.textContent = '';
    if (value === null || value === undefined || value === '') {
      el.appendChild(gap(label));
      el.setAttribute('data-tyhja', 'true');
    } else {
      el.textContent = sana(value);
      el.setAttribute('data-tyhja', 'false');
    }
  }

  /* == 01 Kokovalinta ===================================================== */

  /* Yksi kysymys, kolme vastausta. Ei konfiguraattori: kävijä valitsee koon,
     ei sadan yksityiskohdan joukosta. Kokoja on 2, 3 tai 4 makuuhuonetta
     (R2, workshop 18.8.2026).

     kelpaa() hylkää tuntemattoman tunnuksen, joten vanha sessionStoragessa
     oleva 'mh1' palautuu oletukseen eikä jätä sivua tyhjäksi.

     Tila säilyy sessionStoragessa, jotta valinta seuraa käyttäjää talo-sivulta
     hintablokkeihin muilla sivuilla. Ilman sitä kävijä valitsisi koon kolme
     kertaa saman istunnon aikana. */
  var KOKO_KEY = 'luotokoti:koko';

  function kelpaa(tunnus) {
    for (var i = 0; i < koot.length; i++) {
      if (koot[i].tunnus === tunnus) return true;
    }
    return false;
  }

  /* Oletuskoko tulee datasta (oletus:true), ei koodista. Jos lippua ei ole,
     otetaan keskimmäinen — sama perusteltu arvaus kuin talo-data.js:ssä. */
  function oletusKoko() {
    for (var i = 0; i < koot.length; i++) {
      if (koot[i].oletus) return koot[i].tunnus;
    }
    return koot.length ? koot[Math.floor(koot.length / 2)].tunnus : null;
  }

  /* ?koko= osoitteessa voittaa istunnon valinnan (1.10.2026): etusivun
     talolohkon sarakeotsikot linkittävät talo.html?koko=… , jotta kävijä
     pääsee suoraan valitsemaansa varustetasoon. Valinta tallentuu istuntoon
     kuten valitsimen klikki. Ei URLSearchParamsia (ES5). */
  function kokoOsoitteesta() {
    var m = /[?&]koko=([^&#]*)/.exec(location.search || '');
    return m ? decodeURIComponent(m[1]) : null;
  }

  function lueKoko() {
    var arvo = kokoOsoitteesta();
    if (kelpaa(arvo)) {
      try { window.sessionStorage.setItem(KOKO_KEY, arvo); } catch (e) { /* ei mitään */ }
      return arvo;
    }
    try { arvo = window.sessionStorage.getItem(KOKO_KEY); }
    catch (e) { /* private mode — valinta toimii, tila ei säily */ }
    return kelpaa(arvo) ? arvo : oletusKoko();
  }

  var valittu = lueKoko();

  function aktiivinenKoko() {
    for (var i = 0; i < koot.length; i++) {
      if (koot[i].tunnus === valittu) return koot[i];
    }
    return null;
  }

  /* Attribuutti bodyyn heti, ennen ensimmäistä renderöintiä. Sen varassa CSS
     merkitsee aktiivisen rivin hintaporrastuksessa ja pohjapiirustuksen
     tilan — ilman että JavaScript renderöi niitä uudelleen joka klikillä. */
  /* HUOM 20.8.2026: hintaportaan valintamerkintä on poistettu kokonaan.
     Porras on hintaportaikko, ei valintatila — ks. styles.css osio 33.
     data-koko jää: pinta-ala, huoneistotyyppi ja pohjapiirustus
     renderöityvät aina jostakin koosta. */
  function bodyAttribuutti() {
    if (document.body && valittu) document.body.setAttribute('data-koko', valittu);
  }

  function asetaKoko(tunnus, ilmoita) {
    if (!kelpaa(tunnus) || tunnus === valittu) return;
    valittu = tunnus;
    try { window.sessionStorage.setItem(KOKO_KEY, tunnus); }
    catch (e) { /* ei mitään — valinta toimii silti tällä sivulla */ }

    bodyAttribuutti();
    paivitaPainikkeet();
    renderSlots();
    renderPohjapiirustus();

    /* Ruudunlukija ei huomaa neliömäärän vaihtumista ilman ilmoitusta, ja
       neliömäärä on juuri se mikä valinnassa muuttuu. Ensimmäisellä
       latauksella ei ilmoiteta — se olisi pelkkää melua. */
    if (ilmoita) {
      var live = $('[data-koko-status]');
      var koko = aktiivinenKoko();
      if (live && koko) {
        live.textContent = sana('Valittu koko:') + ' ' +
          kokoOtsikko(koko) +
          (koko.neliot ? ', ' + koko.neliot : '') + '.';
      }
    }

    log('taso1_kokovalinta', {
      koko: tunnus,
      makuuhuoneita: aktiivinenKoko() ? aktiivinenKoko().makuuhuoneita : null,
      sivu: location.pathname.split('/').pop() || 'index.html'
    });
  }

  function paivitaPainikkeet() {
    $$('[data-koko-nappi]').forEach(function (btn) {
      var on = btn.getAttribute('data-koko-nappi') === valittu;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* Painikkeiden tekstit tulevat datasta, jotta nimeämissääntö on yhdessä
     paikassa. Markupissa on kolme tyhjää painiketta ja niiden tunnukset. */
  function initKokovalitsin() {
    var host = $('[data-kokovalitsin]');
    if (!host) return;

    $$('[data-koko-nappi]', host).forEach(function (btn) {
      var tunnus = btn.getAttribute('data-koko-nappi');
      var koko = null;
      for (var i = 0; i < koot.length; i++) {
        if (koot[i].tunnus === tunnus) koko = koot[i];
      }
      if (koko) btn.textContent = kokoOtsikko(koko);

      btn.addEventListener('click', function () { asetaKoko(tunnus, true); });
    });

    paivitaPainikkeet();
  }

  /* == 02 Renderöinti ===================================================== */

  /* Kokokohtaiset kentät. data-talo="neliot" ja data-talo="huoneet" eivät ole
     enää TALO:n juuressa vaan valitussa koossa — markup ei muuttunut, mutta
     lähde muuttui. huoneet → huoneistotyyppi, koska suomalainen ostaja hakee
     muodossa "3h+k" jossa olohuone lasketaan mukaan.

     20.8.2026: näitä paikkoja on enää talo.html:ssä, jossa koko valitaan.
     Jaetulla talotiivistelmällä (4 sivua) ei ole valitsinta, joten yhden koon
     luku luettiin siellä talon faktana — kolme kokoa ovat nyt taulukkona
     rinnakkain (renderKokoVertailu). Ks. AVOIMET.md kohta 158. */
  var KOKO_KENTAT = { neliot: 'neliot', huoneet: 'huoneistotyyppi' };

  function taloArvo(key) {
    if (KOKO_KENTAT[key]) {
      var koko = aktiivinenKoko();
      return koko ? koko[KOKO_KENTAT[key]] : null;
    }
    /* Piste-notaatio laajennuksen kentille: data-talo="laajennus.hinta" */
    if (key.indexOf('.') > -1) {
      var osat = key.split('.');
      var kohde = data;
      for (var i = 0; i < osat.length && kohde; i++) kohde = kohde[osat[i]];
      return kohde === undefined ? null : kohde;
    }
    return data ? data[key] : null;
  }

  /* Yksinkertaiset tekstipaikat: <span data-talo="nimi" data-gap="Mallin nimi"> */
  function renderSlots() {
    $$('[data-talo]').forEach(function (el) {
      var key = el.getAttribute('data-talo');
      var label = el.getAttribute('data-gap') || key;
      setSlot(el, taloArvo(key), label);
    });
  }

  /* HAUTAKIVI: renderKoot() ja [data-talo-koot] poistettu 20.8.2026.

     Rivi kertoi kokojen MÄÄRÄT yhtenä lauseena ("2, 3 tai 4 makuuhuonetta")
     faktanauhassa. Se oli olemassa siksi, että nauhan Pinta-ala ja Huoneet
     kertoivat yhden koon tiedot eikä talon modulaarisuus näkynyt mistään.

     Nyt kolme kokoa on kokovertailutaulukossa omina sarakkeinaan mittoineen,
     joten määrälause toistaisi taulukon otsikkorivin. Perustelu ei kuollut:
     modulaarisuus on tuotteen idea eikä sivuhuomautus — se vain näkyy nyt
     lukuina eikä lauseena. Ks. AVOIMET.md kohdat 150 ja 158.

     Älä palauta riviä taulukon rinnalle. */

  /* Kokovertailu: kolme kokoa RINNAKKAIN, ei yhtä valittua.

     HAVAINTO 20.8.2026 (etusivu, kohteet, kohde, oma tontti): talotiivistelmän
     faktarivi sekoitti kaksi eri asiaa. *Malli* ja *Rakennustapa* ovat samoja
     koosta riippumatta, mutta *Pinta-ala* ja *Huoneet* tulivat yhdestä koosta
     (`data-koko`) — ja koska ne olivat samassa rivissä samannäköisinä, "118 m²"
     ja "5 h + k" luettiin talon faktoina vaikka ne pätevät yhteen kolmesta.
     Alaviite yritti korjata sen jälkikäteen sanalla *perusmalli*, joka ei ole
     mikään kolmesta ostettavasta koosta.

     Korjaus on kaksi tasoa yhden rivin sijaan: faktalista kertoo vain sen mikä
     EI muutu, tämä taulukko sen mikä muuttuu. Kolme saraketta vastaa suoraan
     kysymykseen "mikä koko sopii minulle" — ja se on tuoteblokin oma kysymys,
     ei jotain jota varten pitäisi siirtyä tuotesivulle.

     MIKSI TAULUKKO EIKÄ VAIHTOKYTKIN: kytkin piilottaa kaksi kolmesta
     vaihtoehdosta, vaatii vuorovaikutuksen ennen kuin mitään näkyy eikä näy
     hakukoneelle. Vertailu on tässä se sisältö joka myy — modulaarisuus on etu,
     ei tekninen yksityiskohta jota pitäisi kierrellä.

     EI VALINTAMERKINTÄÄ. Taulukko ei korosta `data-koko`-arvoa millään tavalla:
     se on vertailu, ei valintatila. Sama sääntö kuin hintaportaassa (AVOIMET.md
     kohta 149) — valinnan tila kuuluu kokovalitsimeen ja vain talo.html:lle.
     Älä palauta korostusta ehdollisenakaan.

     Rivien otsikot tulevat copy-data.js:stä data-copy-attribuutin kautta:
     proto.js:n renderCopy() ajetaan tämän jälkeen, joten dynaamisesti luodut
     paikat täyttyvät samaa reittiä kuin markupissa olevat. Sarakeotsikoita EI
     oteta copysta — ne johdetaan kokoNimi()-funktiolla, jotta nimeämissääntö
     pysyy yhdessä paikassa. */
  function vertailuRivi(tbody, copyPolku, arvoFn, aukkoNimi) {
    var tr = document.createElement('tr');

    var th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.setAttribute('data-copy', copyPolku);
    tr.appendChild(th);

    koot.forEach(function (koko) {
      var td = document.createElement('td');
      /* Sarakkeen tunnus soluun asti: kohdesivu merkitsee tästä ne koot jotka
         kaava rajaa pois (proto.js), eikä merkintä silloin osu väärään
         sarakkeeseen jos kokojen järjestys joskus muuttuu. */
      td.setAttribute('data-koko', koko.tunnus);
      setSlot(td, arvoFn(koko), aukkoNimi);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  function renderKokoVertailu() {
    var taulukot = $$('[data-koko-vertailu]');
    if (!taulukot.length) return;

    taulukot.forEach(function (taulukko) {
      /* Vain thead ja tbody rakennetaan uudelleen. Caption on markupissa ja
         se on copy-paikka — sitä ei kosketa. */
      $$('thead,tbody', taulukko).forEach(function (el) {
        el.parentNode.removeChild(el);
      });

      var tbody = document.createElement('tbody');

      if (!koot.length) {
        /* Kokoja ei ole datassa. Tyhjä taulukko ei kerro puutteesta mitään,
           joten puute merkitään yhdellä aukolla. */
        var tyhjaRivi = document.createElement('tr');
        var tyhjaSolu = document.createElement('td');
        tyhjaSolu.appendChild(gap('kokojen tiedot'));
        tyhjaRivi.appendChild(tyhjaSolu);
        tbody.appendChild(tyhjaRivi);
        taulukko.appendChild(tbody);
        return;
      }

      var thead = document.createElement('thead');
      var otsikkoRivi = document.createElement('tr');

      /* Kulmasolu on tyhjä td eikä th: rivi- ja sarakeotsikoiden risteys ei
         ole otsikko kummallekaan suunnalle. */
      var kulma = document.createElement('td');
      kulma.className = 'koko-vertailu__kulma';
      otsikkoRivi.appendChild(kulma);

      koot.forEach(function (koko) {
        var th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.setAttribute('data-koko', koko.tunnus);
        /* data-vertailu-linkki: sarakeotsikko vie talosivulle tämä taso
           valittuna (etusivu). Muualla otsikko on pelkkä teksti. */
        var linkki = taulukko.getAttribute('data-vertailu-linkki');
        if (linkki) {
          var a = document.createElement('a');
          a.href = linkki + '?koko=' + encodeURIComponent(koko.tunnus) + '#pohja-h';
          a.setAttribute('data-event', 'taso1_talo_katselu');
          a.textContent = kokoOtsikko(koko);
          th.appendChild(a);
        } else {
          th.textContent = kokoOtsikko(koko);
        }
        otsikkoRivi.appendChild(th);
      });

      thead.appendChild(otsikkoRivi);
      taulukko.appendChild(thead);

      vertailuRivi(tbody, 'yhteinen.taloVertailuPintaAla',
        function (koko) { return koko.neliot; }, 'm²');
      vertailuRivi(tbody, 'yhteinen.taloVertailuHuoneistotyyppi',
        function (koko) { return koko.huoneistotyyppi; }, 'huoneistotyyppi');

      /* KERROSALA ON ERI LUKU KUIN PINTA-ALA (28.9.2026). Arkkitehti
         ilmoittaa molemmat samalla rivillä — 100 m² asuinpinta-alaa,
         119 k-m² kerrosalaa — ja rakennusoikeus lasketaan jälkimmäisestä.
         Ilman riviä kävijä vertaa tontin rakennusoikeutta väärään lukuun,
         ja se selviää vasta lupavaiheessa. Yksikkö on datan arvossa eikä
         renderöinnissä — sama sopimus kuin placeholder-arvoilla.

         AUKON NIMI ON 'kerrosala' EIKÄ 'k-m²'. Placeholder-tilassa aukon
         nimi on hakuavain (`PLACEHOLDER.arvot`), ja 'k-m²' on siellä jo
         varattu TONTIN rakennusoikeudelle ('95 k-m²'). Yksikkönimi
         aukkona täyttäisi talon kerrosalan tontin luvulla eikä mikään
         huomaisi sitä. Sama ansa on yhä auki pinta-alarivillä, jonka
         aukko on 'm²' ja jonka arvo placeholderissa on tontin koko
         '860 m²' — ks. AVOIMET.md 206. */
      vertailuRivi(tbody, 'yhteinen.taloVertailuKerrosala',
        function (koko) { return koko.kerrosala; }, 'kerrosala');

      /* HINTARIVI ON SIVUKOHTAINEN. Se renderöidään vain jos markup antaa
         rivin otsikolle copy-polun — hintataso vaihtuu sivun mukaan (taso
         1/2/3, ks. copy-data.js:n hintalogiikka), joten yhtä yhteistä otsikkoa
         ei ole olemassa. Kohdesivulla riviä ei ole lainkaan: siellä hinnat ovat
         kohteen omassa talotaulukossa.

         Arvo on merkitty aukko eikä laskettu luku. Perushinta + lisä olisi
         laskettavissa TALO.koot:sta, mutta sitä EI lasketa: hintaporras on
         portaikko eikä konfiguraattori, eikä sivusto näytä laskettua hintaa
         jota ei voi taata. Kokokohtainen hinta on avoin kohta — AVOIMET.md
         kohdat 108, 111 ja 159 — ja placeholder-tila paikkaa sen sarakkeittain
         sivun hintatason mukaan. */
      var hintaPolku = taulukko.getAttribute('data-vertailu-hinta');
      if (hintaPolku) {
        vertailuRivi(tbody, hintaPolku, function () { return null; }, 'XXX XXX €');
      }

      taulukko.appendChild(tbody);
    });
  }

  /* Pohjapiirustus on YKSI kuvapaikka, jolla on nyt KAKSI tilaa kolmen
     koon sijasta:

       data-pohja-tila="kuva"     piirustus on olemassa (Risö 100+)
       data-pohja-tila="puuttuu"  piirustusta ei ole

       30.9.2026: kaikilla kolmella varustetasolla on sama piirustus,
       joten puuttuu-tila ei tällä hetkellä esiinny. Se jää koodiin,
       koska lisärakennuksen oma piirustus voi vielä tulla.

     Tila tulee datasta (koko.pohja), ei valinnasta. Kolmen makuuhuoneen
     pohja on olemassa; kaksi muuta ovat yhä merkittyjä aukkoja, ja niiden
     laatikon pitää edelleen tuntua epämukavalta. Ulkoasu on kokonaan
     CSS:ssä (§47) — tämä funktio asettaa attribuutin ja sisällön, ei
     tyyliä.

     role="img" POISTETAAN kuvatilassa. Se on markupissa aukkotilaa varten,
     jossa koko laatikko on yksi selostettava kuvapaikka. Kuvatilassa
     huoneiden nimet ovat oikeaa tekstiä, ja role="img" piilottaisi ne
     ruudunlukijalta. */
  function nimilappu(nimi, ala) {
    var el = document.createElement('span');
    el.className = 'pohja__nimi';

    var n = document.createElement('b');
    /* Huoneiden nimet ovat datan arvoja (POHJA_RISO), joten käännös tulee
       sanakirjasta. Risö 100+ -piirustus merkitsee huoneet SUOMEKSI
       lyhenteinä (mh, oh,k, khh/arki-et), joten tässä suunta on toisin päin
       kuin edeltäjässä: suomi on lähde ja ruotsi käännös. */
    n.textContent = sana(nimi);
    el.appendChild(n);

    if (ala) {
      var a = document.createElement('span');
      a.textContent = ala + ' m\u00b2';
      el.appendChild(a);
    }
    return el;
  }

  /* Kaksi esitystä samasta listasta, ei kahta listaa. Kapealla ruudulla
     nimet eivät mahdu piirustuksen sisään: 2,7 metriä leveä makuuhuone on
     puhelimessa noin 70 pikseliä, eikä sanaan "Makuuhuone" ole tilaa. CSS
     näyttää lapun leveällä ja luettelon kapealla — sama data, joten ne
     eivät voi eriytyä. */
  function pohjaSisalto(host, pohja, nimi) {
    var kuva = document.createElement('img');
    kuva.className = 'pohja__kuva';
    kuva.src = pohja.kuva;
    kuva.alt = nimi ? 'Pohjapiirustus, ' + nimi : 'Pohjapiirustus';
    host.appendChild(kuva);

    var lista = document.createElement('ul');
    lista.className = 'pohja__lista';

    function lisaa(rivi, ala) {
      var lappu = nimilappu(rivi.nimi, ala);
      lappu.style.left = rivi.x + '%';
      lappu.style.top  = rivi.y + '%';
      host.appendChild(lappu);

      var li = document.createElement('li');
      li.appendChild(nimilappu(rivi.nimi, ala));
      lista.appendChild(li);
    }

    (pohja.huoneet   || []).forEach(function (h) { lisaa(h, h.ala); });
    (pohja.ulkotilat || []).forEach(function (u) { lisaa(u, null); });

    host.appendChild(lista);
  }

  function renderPohjapiirustus() {
    var fig = $('[data-pohja]');
    if (!fig) return;

    var koko  = aktiivinenKoko();
    var nimi  = koko ? kokoOtsikko(koko) : null;
    var pohja = (koko && koko.pohja) ? koko.pohja : null;
    var host  = $('[data-pohja-kuva]', fig);

    fig.setAttribute('data-koko', valittu || '');
    if (host) host.textContent = '';

    if (pohja && pohja.kuva && host) {
      fig.setAttribute('data-pohja-tila', 'kuva');
      fig.removeAttribute('role');
      fig.removeAttribute('aria-label');
      pohjaSisalto(host, pohja, nimi);
      log('pohjapiirustus', { koko: valittu, tila: 'kuva' });
      return;
    }

    fig.setAttribute('data-pohja-tila', 'puuttuu');
    fig.setAttribute('role', 'img');

    var what = $('[data-pohja-what]', fig);
    if (what) {
      what.textContent = nimi
        ? 'Pohjapiirustus, ' + nimi + ' — kuvasuhde 4:3'
        : 'Pohjapiirustus — kuvasuhde 4:3';
    }

    fig.setAttribute('aria-label', nimi
      ? 'Kuvapaikka: pohjapiirustus, ' + nimi + ' — puuttuu prototyypistä. ' +
        'Sama runko, kasvava pääty.'
      : 'Kuvapaikka: talomallin pohjapiirustus. Puuttuu prototyypistä.');
  }

  /* Sisältyy-lista. Aineistosta koottu, mutta jokaisen kohdan varmuus
     merkitään: "epavarma" tarkoittaa että kohta löytyy vain
     luottamuksellisesta brändistrategiasta, ei julkisesta USP-listasta. */
  function renderSisaltyy() {
    var host = $('[data-talo-lista="sisaltyy"]');
    if (!host) return;
    host.textContent = '';

    var rivit = (data && data.sisaltyy) || [];
    if (!rivit.length) {
      host.appendChild(tyhjaListaViesti(sana('Sisältyy-listaa ei ole aineistossa.')));
      return;
    }

    rivit.forEach(function (rivi) {
      var li = document.createElement('li');

      var t = document.createElement('span');
      t.className = 'ticks__t';
      t.textContent = sana(rivi.teksti);
      li.appendChild(t);

      if (rivi.tarkennus) {
        var d = document.createElement('span');
        d.className = 'ticks__d';
        d.textContent = sana(rivi.tarkennus);
        li.appendChild(d);
      }

      if (rivi.varmuus === 'epavarma') {
        var q = document.createElement('span');
        q.className = 'ticks__d ticks__d--q';
        q.textContent = sana('Vahvistettava — mainitaan vain sisäisessä aineistossa.');
        li.appendChild(q);
      }

      host.appendChild(li);
    });
  }

  /* Poissulkulistan renderöinti POISTETTU 20.8.2026. "Ei sisälly" -sarake
     purettiin sektiosta 08: se oli kolme kysymysmerkkiriviä ja selittävä
     kappale, eli puolet lohkosta kertoi ettei tietoa ole. Raja sanotaan nyt
     yhtenä lauseena listan alla (copy-data.js: talo.sisaltyyRajaHtml).

     TALO.eiSisally jää datatiedostoon tyhjänä taulukkona: se on yhä sivun
     tärkein puuttuva sisältö, ja kun lista saadaan, se on valmis paikka.
     Ks. AVOIMET.md kohdat 22 ja 170. */

  function tyhjaListaViesti(teksti) {
    var li = document.createElement('li');
    li.className = 'ticks__tyhja';
    li.textContent = teksti;
    return li;
  }

  /* Sisustustyylit. Kolme kokonaisuutta, ei kolmea komponenttivalintaa —
     R6 (workshop 18.8.2026). Rivit tulevat TALO.tyylit-taulukosta, joten
     nimet ja kuvaukset eivät ole missään sivun markupissa.

     Sektion olemassaolo ei ole enää kysymys, sisältö on: kaikki kolme
     tyyliä renderöityvät merkittyinä aukkoina kunnes arkkitehdin speksit
     saadaan.

     AUKKOJEN NIMEÄMINEN — ÄLÄ PALAUTA GENEERISIÄ NIMIÄ. Aiemmin tämä
     funktio käytti aukkoa gap('…'), ja placeholder-tilassa siihen osui
     sarja joka oli kirjoitettu sektion 04 "ei sisälly" -saraketta varten.
     Lopputulos: valintakorteissa luki "Piha-alueen viimeistely ja
     istutukset", "Kodinkoneet" ja "Autokatos tai erillinen varasto" — eli
     kolme asiaa joita talo nimenomaan EI sisällä, esitettynä asioina joita
     voi valita. Aukon nimi on siksi oma ja kuvaava. */
  /* SAUNARAKENNUS. Kuusi vaihtoehtoa samasta 29 kerrosneliön rakennuksesta
     (TALO.sauna). Vaihtoehto ei kasvata rakennusta vaan jakaa sen toisin,
     joten ala on sektion ingressissä kerran eikä jokaisella kortilla.

     NIMI JOHDETAAN, EI KIRJOITETA DATAAN. Sama sääntö kuin kokojen
     nimissä (kokoNimi): aineiston omat "vakiotaso" ja "variaatio 1–5"
     ovat arkkitehdin työnimiä eivätkä tuotenimiä. Jos tuotenimet joskus
     tulevat, ne menevät rivin `nimi`-kenttään ja voittavat johdetun.

     JÄRJESTYSTÄ EI SAA MUUTTAA. Vakiotaso on ensimmäinen, koska siinä ei
     ole saunaa: jos sauna olisi ensin, sektio lupaisi saunan ja peruisi
     sen alaviitteessä. Sama järjestys kuin aineistossa.

     Hinta on jokaisella merkitty aukko. Sitä EI lasketa neliöistä eikä
     päätellä muista vaihtoehdoista — ks. talo-data.js. */
  function saunaNimi(rivi, jarjestys) {
    if (rivi.nimi) return sana(rivi.nimi);
    if (rivi.vakio) return sana('Vakiotaso');
    return sana('Vaihtoehto') + ' ' + jarjestys;
  }

  function renderSauna() {
    var host = $('[data-sauna-lista]');
    if (!host) return;
    host.textContent = '';

    var sauna = data && data.sauna;
    var rivit = (sauna && sauna.vaihtoehdot && sauna.vaihtoehdot.length)
      ? sauna.vaihtoehdot : [];

    if (!rivit.length) {
      var tyhja = document.createElement('p');
      tyhja.appendChild(gap('saunan vaihtoehdot puuttuvat'));
      host.appendChild(tyhja);
      return;
    }

    var numero = 0;

    rivit.forEach(function (rivi) {
      if (!rivi.vakio) numero++;

      var kortti = document.createElement('figure');
      kortti.className = 'sauna-kortti';
      kortti.setAttribute('data-sauna', rivi.tunnus || '');
      if (rivi.vakio) kortti.setAttribute('data-sauna-vakio', '1');

      /* Kuva on pohjakaavio eikä valokuva, joten se ei kanna
         havainnekuvamerkintää — piirustus ei voi esittää olevansa
         valokuva. Alt kertoo mitä kaaviossa on, koska tilaluettelo on
         kortissa erikseen eikä ruudunlukijan tarvitse kuulla sitä kahdesti. */
      if (rivi.kuva) {
        var kuva = document.createElement('img');
        kuva.className = 'sauna-kortti__kuva';
        kuva.src = rivi.kuva;
        kuva.alt = '';
        kuva.setAttribute('aria-hidden', 'true');
        kuva.loading = 'lazy';
        kortti.appendChild(kuva);
      }

      var teksti = document.createElement('figcaption');

      var h = document.createElement('h3');
      h.className = 'sauna-kortti__nimi';
      h.textContent = saunaNimi(rivi, numero);
      teksti.appendChild(h);

      var lista = document.createElement('ul');
      lista.className = 'sauna-kortti__tilat';
      (rivi.tilat || []).forEach(function (tila) {
        var li = document.createElement('li');
        li.textContent = sana(tila);
        lista.appendChild(li);
      });
      teksti.appendChild(lista);

      var hinta = document.createElement('p');
      hinta.className = 'sauna-kortti__hinta';
      setSlot(hinta, rivi.hinta, 'vaihtoehdon hinta');
      teksti.appendChild(hinta);

      kortti.appendChild(teksti);
      host.appendChild(kortti);
    });
  }

  function renderTyylit() {
    var host = $('[data-talo-lista="tyylit"]');
    if (!host) return;
    host.textContent = '';

    var rivit = (data && data.tyylit && data.tyylit.length) ? data.tyylit : [];
    if (!rivit.length) {
      var tyhjaLi = document.createElement('li');
      tyhjaLi.className = 'opt kohta';
      tyhjaLi.appendChild(gap('sisustustyylit puuttuvat'));
      host.appendChild(tyhjaLi);
      return;
    }

    var puuttuvia = 0;

    rivit.forEach(function (rivi) {
      /* Numeroitu kohta ilman numeroa (styles.css §76, §79): tyylit eivät ole
         järjestys. Viivan väri kortin omasta datasta, oletus amber. */
      var li = document.createElement('li');
      li.className = 'opt kohta';
      li.setAttribute('data-tyyli', rivi.tunnus || '');
      li.setAttribute('data-viiva', rivi.viiva || 'amber');

      /* Kuvapaikka kortin alussa (Olli 1.10.2026). Kuva tulee KUVAT-datasta
         suoraan, koska proto.js:n initKuvat on jo ajettu kun tyylit
         renderöidään uudelleen sisältötilan vaihtuessa. */
      var fig = document.createElement('figure');
      fig.className = 'ph kohta__kuva';
      var kuva = (rivi.kuva && typeof KUVAT !== 'undefined') ? KUVAT[rivi.kuva] : null;
      if (kuva && kuva.tiedosto) {
        var img = document.createElement('img');
        img.className = 'ph__kuva';
        img.src = kuva.pieni || kuva.tiedosto;
        img.alt = sana(kuva.alt || '');
        img.loading = 'lazy';
        fig.setAttribute('data-ph-tila', 'kuva');
        fig.appendChild(img);
      } else {
        fig.setAttribute('role', 'img');
        // Kuvapaikan merkinnät ovat prototyypin työkalu ja suomeksi kaikilla
        // kielillä, kuten markupin kuvapaikoissa.
        fig.setAttribute('aria-label', 'Kuvapaikka: sisustustyyli. Kuva puuttuu prototyypistä.');
        var tag = document.createElement('span');
        tag.className = 'ph__tag';
        tag.textContent = 'Kuvapaikka';
        fig.appendChild(tag);
      }
      li.appendChild(fig);

      var h = document.createElement('h3');
      h.className = 'kohta__t';
      if (rivi.nimi) {
        h.textContent = sana(rivi.nimi);
      } else {
        h.appendChild(gap('sisustustyylin nimi'));
        puuttuvia++;
      }
      li.appendChild(h);

      var p = document.createElement('p');
      p.className = 'kohta__d';
      if (rivi.kuvaus) {
        p.textContent = sana(rivi.kuvaus);
      } else {
        p.appendChild(gap('sisustustyylin kuvaus'));
      }
      li.appendChild(p);

      /* Hintapaikka on rakenteessa alusta asti — ks. talo-data.js.
         Etiketti on "Hinta" eikä "Lisähinta": kun arvo on "Sisältyy",
         etiketti "Lisähinta" kumoaa itsensä. */
      var hinta = document.createElement('p');
      hinta.className = 'opt__hinta';
      var k = document.createElement('span');
      k.className = 'opt__k';
      k.textContent = sana('Hinta');
      hinta.appendChild(k);
      if (rivi.hinta) {
        hinta.appendChild(document.createTextNode(sana(rivi.hinta)));
      } else {
        hinta.appendChild(gap('€ tai sisältyy'));
      }
      li.appendChild(hinta);

      host.appendChild(li);
    });

    if (puuttuvia === rivit.length) host.setAttribute('data-tyhja', 'true');
  }

  /* Tekniset tiedot. Avainlista on rakenteellinen: rivit ovat sivulla
     vaikka TALO.tekniset on tyhjä. Takuu tulee omasta kentästään. */
  var TEKNISET_RIVIT = [
    { avain: 'lammitys',      otsikko: 'Lämmitys',      gap: 'lämmitysmuoto' },
    { avain: 'energialuokka', otsikko: 'Energialuokka', gap: 'energialuokka' },
    { avain: 'rakenteet',     otsikko: 'Rakenteet',     gap: 'rakennetyyppi' },
    { avain: 'ilmanvaihto',   otsikko: 'Ilmanvaihto',   gap: 'ilmanvaihto' }
  ];

  function renderTekniset() {
    var host = $('[data-talo-lista="tekniset"]');
    if (!host) return;
    host.textContent = '';

    var tekniset = (data && data.tekniset) || {};

    TEKNISET_RIVIT.forEach(function (rivi) {
      var dt = document.createElement('dt');
      dt.textContent = sana(rivi.otsikko);
      var dd = document.createElement('dd');
      setSlot(dd, tekniset[rivi.avain], rivi.gap);
      host.appendChild(dt);
      host.appendChild(dd);
    });

    var dtT = document.createElement('dt');
    dtT.textContent = sana('Takuu');
    var ddT = document.createElement('dd');
    setSlot(ddT, data ? data.takuu : null, 'takuuaika');
    host.appendChild(dtT);
    host.appendChild(ddT);
  }

  /* == 03 Kokoporrastus =================================================== */

  /* Lisärivin nimi. "Kolmas makuuhuone", ei "3 makuuhuonetta": rivi kertoo
     mitä lisätään, ei mikä lopputulos on. Ilman tätä porras luetaan kolmena
     rinnakkaisena hintana ja perushinnan ehdottomuus katoaa.

     Järjestysluvut on kirjoitettu auki kahteen asti eteenpäin siitä mitä
     dataa nyt on. Tuntematon määrä palaa numeromuotoon eikä kaadu. */
  var JARJESTYSLUKU = {
    3: 'Kolmas makuuhuone',
    4: 'Neljäs makuuhuone',
    5: 'Viides makuuhuone'
  };

  function lisaysNimi(makuuhuoneita) {
    return JARJESTYSLUKU[makuuhuoneita]
      ? sana(JARJESTYSLUKU[makuuhuoneita])
      : (makuuhuoneita + '. ' + sana('makuuhuone'));
  }

  /* Hinta esitetään portaikkona, ei kolmena hintana.

       [Mallin nimi], 2 makuuhuonetta      [XXX XXX €]
       Kolmas makuuhuone                        + [XX XXX €]
       Neljäs makuuhuone                        + [XX XXX €]

     perus:true on lähtöhinta ja ehdoton. Muut ovat lisiä ja ehdollisia,
     koska laajennus riippuu tontin koosta ja rakennusoikeudesta — se ero
     pitää näkyä renderöinnissä eikä vain copyssa.

     TÄMÄ EI OLE KONFIGURAATTORI. Yhteissummaa ei lasketa: sivusto ei saa
     näyttää laskettua hintaa jota ei voi taata.

     Miksi tämä on tärkeää: jos jokaisella lisämakuuhuoneella on hinta,
     syntyy radikaali läpinäkyvyys myös lisistä — suora vastalääke
     Kannustalon dokumentoituun virheeseen, jossa valinnat maksoivat
     20 000 € enemmän kuin viestittiin.

     Ja miksi se on riski: jos hintaa ei ole, kokovalinta lukee lisämyyntinä.
     Siksi puuttuva hinta on merkitty aukko eikä jätetty pois.

     Rivit tulevat TALO.koot:sta myös etusivulla ja ostopolkusivuilla —
     kokojen tiedot eivät ole missään sivun markupissa. */
  /* KOON NIMI TULEE DATASTA JOS SE ON SIELLÄ. 30.9.2026 alkaen rivit ovat
     varustetasoja eivätkä makuuhuonemääriä, ja nimi on TALO.koot[].nimi.
     kokoNimi() jää varareitiksi: se on yhä oikea sääntö jos data joskus
     palaa makuuhuonemääriin, eikä nimeäminen saa hajota siihen väliin. */
  function kokoOtsikko(koko) {
    if (!koko) return null;
    if (koko.nimi) return sana(koko.nimi);
    return kokoNimi(koko.makuuhuoneita);
  }

  function renderKokoPorras() {
    var listat = $$('[data-koko-porras]');
    if (!listat.length) return;

    listat.forEach(function (host) {
      host.textContent = '';

      if (!koot.length) {
        var tyhja = document.createElement('li');
        tyhja.appendChild(gap('kokojen hinnat'));
        host.appendChild(tyhja);
        return;
      }

      koot.forEach(function (koko) {
        var li = document.createElement('li');
        li.setAttribute('data-koko', koko.tunnus);
        li.setAttribute('data-perus', koko.perus ? 'true' : 'false');

        var nimi = document.createElement('span');
        nimi.className = 'koko-hinta__nimi';
        /* Perusrivi kantaa mallin nimen, lisärivit vain sen mitä lisätään.
           Näin porras luetaan portaana eikä kolmena rinnakkaisena hintana. */
        if (koko.perus) {
          if (data && data.nimi) {
            nimi.appendChild(document.createTextNode(sana(data.nimi)));
          } else {
            nimi.appendChild(gap('mallin nimi'));
          }
          nimi.appendChild(
            document.createTextNode(', ' + kokoOtsikko(koko)));
        } else if (koko.lisays) {
          nimi.textContent = sana(koko.lisays);
        } else {
          nimi.textContent = lisaysNimi(koko.makuuhuoneita);
        }
        li.appendChild(nimi);

        var arvo = document.createElement('span');
        arvo.className = 'koko-hinta__arvo';

        if (koko.perus) {
          /* Perushinta on kokonaisluku, ei lisä. Se saatiin 30.9.2026
             asiakkaalta (237 000 €); jos se joskus puuttuu, aukko on
             aukko KOKONAISHINNASTA eikä lisästä. Ero on kävijälle
             olennainen. */
          if (koko.hinta) arvo.textContent = koko.hinta;
          else arvo.appendChild(gap('XXX XXX €'));
        } else if (koko.hintaero) {
          arvo.textContent = koko.hintaero;
        } else {
          arvo.appendChild(gap('+ XX XXX €'));
        }
        li.appendChild(arvo);

        host.appendChild(li);
      });
    });
  }

  /* == Kierros talossa ====================================================
     Scrollytelling talo.html:n sektiossa 01b. Tämä funktio tekee kolme
     asiaa eikä muuta:

       1. käynnistää mallin (RISO_KIERROS, generaattori tyokalut/riso3d.py;
          piirtäjä assets/kierros3d.js)
       2. lisää huoneiden nimilaput mallin ankkureihin — nimet ja alat
          POHJA_RISO:sta, joten ne ovat samat kuin pohjapiirustuksessa
       3. vaihtaa kuvan data-vaihe-attribuutin sen askeleen mukaan, joka on
          ruudun keskellä, ja käskee kameran ulos tai pohjaan

     Kamera, katon nousu ja ulkonäkymän häivytys ovat kierros3d.js:ssä,
     koska ne ovat saman liikkeen osia. Vyöhykkeet, laput ja upotteet ovat
     CSS:ssä, styles.css §58. Ilman IntersectionObserveria askeleet ovat
     tavallinen lista ja kuva näyttää talon ulkoa. */
  /* VÄRINVAIHDIN talon herossa (1.10.2026, Ollin havainnekuva). Kolme
     laattaa TALO.julkisivut.varit-datasta; valinta vaihtaa heron kuvan
     häivyttäen. Laatta on rajaus samasta kuvasta, ei väriruutu: puun ja
     katon pinta kertoo enemmän kuin sävy (sama periaate kuin
     komponentit/varinvaihto). Valinta ei tallennu: väri ei ole tilaus
     vaan katselu (AVOIMET.md 200). */
  function renderVarinvaihto() {
    var host = $('[data-varinvaihto]');
    var laatat = host && $('[data-vari-laatat]', host);
    var nimi = host && $('[data-vari-nimi]', host);
    var fig = $('.hero__bild');
    var varit = (data && data.julkisivut && data.julkisivut.varit) || [];
    if (!host || !laatat || !fig || varit.length < 2) return;

    var nykyinen = null;
    var oletusKuva = fig.getAttribute('data-kuva');
    var oletus = varit.filter(function (v) {
      return v.kuva && v.kuva.indexOf(oletusKuva) !== -1;
    })[0] || varit[0];

    function valitse(vari, alussa) {
      if (nykyinen === vari.tunnus) return;
      nykyinen = vari.tunnus;
      $$('button', laatat).forEach(function (b) {
        var on = b.getAttribute('data-vari') === vari.tunnus;
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      if (nimi) nimi.textContent = sana(vari.kuvaus || '');
      if (alussa) return;
      /* Uusi kuva vanhan päälle ja häivytys sisään; vanha poistuu kun uusi
         on näkyvissä. Ei välähdystä, koska tausta on koko ajan kuva. */
      var vanha = $('img.ph__kuva', fig);
      var uusi = document.createElement('img');
      uusi.className = 'ph__kuva vari__uusi';
      uusi.alt = vanha ? vanha.alt : '';
      uusi.onload = function () {
        fig.appendChild(uusi);
        window.requestAnimationFrame(function () { uusi.classList.add('on'); });
        window.setTimeout(function () {
          $$('img.ph__kuva', fig).forEach(function (k) { if (k !== uusi) k.parentNode.removeChild(k); });
          uusi.classList.remove('vari__uusi', 'on');
        }, 650);
      };
      uusi.src = vari.kuva;
    }

    laatat.textContent = '';
    varit.forEach(function (vari, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'vari__laatta';
      b.setAttribute('role', 'radio');
      b.setAttribute('data-vari', vari.tunnus);
      b.setAttribute('aria-label', sana(vari.kuvaus || vari.tunnus));
      var img = document.createElement('img');
      if (vari.nayte) b.className += ' vari__laatta--nayte';
      img.src = vari.nayte || vari.kuva.replace(/\.webp$/, '-800.webp');
      img.alt = '';
      img.setAttribute('data-vari-kuva', vari.tunnus);
      b.appendChild(img);
      var n = document.createElement('span');
      n.className = 'vari__n';
      n.setAttribute('aria-hidden', 'true');
      n.textContent = String(i + 1);
      b.appendChild(n);
      b.addEventListener('click', function () { valitse(vari); });
      b.addEventListener('keydown', function (ev) {
        var k = ev.key, j = varit.indexOf(vari);
        if (k !== 'ArrowRight' && k !== 'ArrowLeft') return;
        ev.preventDefault();
        var seur = varit[(j + (k === 'ArrowRight' ? 1 : varit.length - 1)) % varit.length];
        valitse(seur);
        $('[data-vari="' + seur.tunnus + '"]', laatat).focus();
      });
      laatat.appendChild(b);
    });
    host.hidden = false;
    valitse(oletus, true);
  }

  /* == Kierroksen kortti kuvan alla (kapea ruutu) ==========================
     Olli 1.10.2026: puhelimessa askelkortit vierivät kiinnitetyn kuvan
     päälle ja peittivät sen puolet vierityksestä. Nyt kortti kiinnittyy
     kuvan alle (styles.css §58), ja vain aktiivinen askel näkyy.

     Kuvan korkeus riippuu leveydestä ja kuvasuhteesta, joten kehyksen
     alareuna mitataan ja annetaan CSS:lle muuttujana --kehys-ala.

     Askel vaihtuu, kun seuraava askel ylittää viivan. Leveällä ruudulla
     viiva on ruudun keskellä. Kapealla se on vähän kuvan alareunan alla:
     seuraava kortti työntää edellisen kuvan alle, ja kuva vaihtuu kun
     uusi kortti on noussut melkein paikalleen. */
  function kiinnitaKehys(kierros) {
    var kehys = kierros && $('.kierros__kehys', kierros);
    if (!kehys) return;
    function mittaa() {
      var yla = parseFloat(window.getComputedStyle(kehys).top) || 0;
      kierros.style.setProperty('--kehys-ala', Math.round(yla + kehys.offsetHeight) + 'px');
    }
    mittaa();
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(mittaa).observe(kehys);
    else window.addEventListener('resize', mittaa);
  }

  function vaihtoviiva(kierros) {
    var ala = parseFloat(kierros.style.getPropertyValue('--kehys-ala'));
    if (ala && window.matchMedia('(max-width:63.999rem)').matches) {
      return ala + (window.innerHeight - ala) * 0.25;
    }
    return window.innerHeight / 2;
  }

  function renderKierros() {
    var kuva = $('[data-kierros-kuva]');
    var piirros = $('[data-kierros-piirros]');
    if (!kuva || !piirros) return;
    if (typeof RISO_KIERROS === 'undefined' || !RISO_KIERROS ||
        typeof Kierros3D === 'undefined') {
      console.warn('[luotokoti-proto] riso-kierros.js tai kierros3d.js ei ' +
        'latautunut — kierroksen kuva puuttuu');
      return;
    }

    /* Malli on mallinnus samoin kuin arkkitehdin visualisoinnit, joten sama
       merkintä samalla komponentilla (kuvat-data.js, proto.js initKuvat). */
    var merkinta = document.createElement('span');
    merkinta.className = 'ph__lahde kierros__lahde';
    merkinta.textContent = sana('Havainnekuva');
    piirros.appendChild(merkinta);

    var laput = {};
    var huoneet = (typeof POHJA_RISO !== 'undefined' && POHJA_RISO.huoneet) || [];
    var ulkotilat = (typeof POHJA_RISO !== 'undefined' && POHJA_RISO.ulkotilat) || [];
    var terassi = ulkotilat.filter(function (u) { return u.nimi === 'Terassi'; })[0];

    Object.keys(RISO_KIERROS.ankkurit).forEach(function (avain) {
      var a = RISO_KIERROS.ankkurit[avain];
      var lappu;
      if (/^h\d+$/.test(avain)) {
        var h = huoneet[+avain.slice(1)];
        if (!h) return;
        lappu = nimilappu(h.nimi, h.ala);
      } else if (avain === 'terassi' && terassi) {
        lappu = nimilappu(terassi.nimi, null);
      } else if (avain === 'piha') {
        lappu = document.createElement('span');
        lappu.className = 'pohja__nimi';
        var b = document.createElement('b');
        b.setAttribute('data-copy', 'talo.kierrosPiha');
        lappu.appendChild(b);
      } else {
        return;
      }
      lappu.className += ' kierros__nimi';
      lappu.setAttribute('data-vyo', a.vyo);
      lappu.setAttribute('data-ankkuri', avain);
      piirros.appendChild(lappu);
      laput[avain] = lappu;
    });

    var malli = Kierros3D.luo(piirros, RISO_KIERROS, laput);

    var askeleet = $$('[data-askel]');
    if (!askeleet.length || !window.requestAnimationFrame) return;
    var kierros = kuva.closest('.kierros');

    /* Aktiivinen askel on viimeinen, jonka yläreuna on ylittänyt
       vaihtoviivan. Ennen ensimmäistä askelta mikään ei ole aktiivinen, ja
       viimeisen jälkeen viimeinen jää voimaan. */
    var nykyinen = null, odottaa = false;
    function laske() {
      odottaa = false;
      var raja = vaihtoviiva(kierros), osuma = null;
      for (var i = 0; i < askeleet.length; i++) {
        if (askeleet[i].getBoundingClientRect().top > raja) break;
        osuma = askeleet[i];
      }
      if (!osuma) return;
      var vaihe = osuma.getAttribute('data-askel');
      if (vaihe === nykyinen) return;
      nykyinen = vaihe;
      kuva.setAttribute('data-vaihe', vaihe);
      malli.siirry(vaihe === 'ulko' ? 0 : 1);
      askeleet.forEach(function (a) {
        a.classList.toggle('on-aktiivinen', a === osuma);
      });
    }
    function pyyda() {
      if (odottaa) return;
      odottaa = true;
      requestAnimationFrame(laske);
    }

    document.documentElement.classList.add('kierros-kaytossa');
    kiinnitaKehys(kierros);
    VIERITYS.kohde().addEventListener('scroll', pyyda, { passive: true });
    window.addEventListener('resize', pyyda);
    laske();
    log('kierros_valmis', { askelia: askeleet.length });
  }

  /* == Prosessi rakentuu (etusivu) =========================================
     Sama malli kuin kierroksessa, eri koreografia: kuva seuraa
     vieritystä suoraan eikä askeleen vaihtumista. Luku p kulkee askelten
     läpi (0 tilanne … 3 muutto, desimaali = kuinka pitkällä askel on), ja
     Kierros3D.prosessi() piirtää sen. Tämä funktio vain laskee p:n.

     prefers-reduced-motion: p pyöristetään askeleen lopputilaan, joten
     kuva vaihtuu askel kerrallaan eikä liiku vierityksen mukana. */
  function renderProsessi() {
    var kuva = $('[data-prosessi-kuva]');
    var piirros = $('[data-prosessi-piirros]');
    if (!kuva || !piirros) return;
    if (typeof RISO_PROSESSI === 'undefined' || typeof Kierros3D === 'undefined') {
      console.warn('[luotokoti-proto] riso-prosessi.js tai kierros3d.js ei ' +
        'latautunut — prosessin kuva puuttuu');
      return;
    }
    var askeleet = $$('[data-prosessi] [data-askel]');
    if (!askeleet.length || !window.requestAnimationFrame) return;

    /* Ei Havainnekuva-merkintää (Ollin päätös 30.9.2026). Kuva on
       kaavio rakentumisen vaiheista eikä väite siitä miltä talo näyttää,
       joten sitä ei lueta valokuvana. Talosivun kierroksessa merkintä on
       yhä, koska siellä kuva esittää juuri tätä taloa. */
    var malli = Kierros3D.prosessi(piirros, RISO_PROSESSI);
    var kierros = kuva.closest('.kierros');
    document.documentElement.classList.add('kierros-kaytossa');
    kiinnitaKehys(kierros);

    var odottaa = false, vaihe = null;
    function laske() {
      odottaa = false;
      var keski = vaihtoviiva(kierros), p = 0;
      /* Kapealla kortti asettuu paikalleen heti askeleen alussa, joten kuvan
         on ehdittävä perässä: askeleen kuva valmistuu jo askeleen
         ensimmäisellä 55 %:lla (Olli 1.10.2026: "laahaa hieman perässä,
         rakennamme talosi näyttää vain pohjaa"). Leveällä kortti on
         pystysuunnassa askeleen keskellä, joten kuva valmistuu askeleen
         puolivälissä, kun kortti on ruudun keskellä (Olli 1.10.2026:
         "tässä vaiheessa pitäisi olla jo katto päällä"). */
      var tahti = window.matchMedia('(max-width:63.999rem)').matches ? .55 : .5;
      /* Aktiivinen askel on se, jonka kohdalla vieritys todella on. Tahti
         nopeuttaa vain kuvaa: askeleen kuva on valmis ennen askeleen loppua,
         mutta se ei saa aktivoida seuraavaa askelta etuajassa (Olli
         1.10.2026: "teksti vaalenee liian nopeasti" — kortti himmeni kun se
         oli vielä keskellä ruutua). */
      var aktiivinen = 0;
      for (var i = 0; i < askeleet.length; i++) {
        var r = askeleet[i].getBoundingClientRect();
        if (r.top > keski) break;
        aktiivinen = i;
        p = i + Math.min(.999, (keski - r.top) / (r.height * tahti));
      }
      if (Kierros3D.vahempiLiike()) p = aktiivinen + .999;
      malli.piirra(p);
      var uusi = askeleet[aktiivinen].getAttribute('data-askel');
      if (uusi !== vaihe) {
        vaihe = uusi;
        kuva.setAttribute('data-vaihe', uusi);
        askeleet.forEach(function (a, j) {
          a.classList.toggle('on-aktiivinen', j === aktiivinen);
        });
      }
    }
    function pyyda() {
      if (odottaa) return;
      odottaa = true;
      requestAnimationFrame(laske);
    }
    VIERITYS.kohde().addEventListener('scroll', pyyda, { passive: true });
    window.addEventListener('resize', pyyda);
    laske();
    log('prosessi_valmis', { askelia: askeleet.length });
  }

  /* == Käynnistys ========================================================= */

  function init() {
    if (!data) {
      console.warn('[luotokoti-proto] talo-data.js ei latautunut — sivu ' +
        'renderöityy pelkkinä aukkoina');
    }

    bodyAttribuutti();
    initKokovalitsin();
    renderSlots();
    renderKokoVertailu();
    renderPohjapiirustus();
    renderKokoPorras();
    renderSisaltyy();
    renderSauna();
    renderTyylit();
    renderTekniset();
    renderKierros();
    renderVarinvaihto();
    renderProsessi();

    /* v2: kelluva CTA-palkki ja scroll-syvyys ovat siirtyneet jaetuiksi
       komponenteiksi proto.js:ään, koska palkki on käytössä myös molemmilla
       ostopolkusivuilla. Niitä ei kutsuta enää täältä — muuten sama
       tapahtuma lokittuisi kaksi kertaa. */

    var puuttuu = $$('[data-tyhja="true"]').length;
    log('talotiedot_aukot', {
      merkittyja_aukkoja: puuttuu,
      koko: valittu,
      sivu: location.pathname.split('/').pop() || 'index.html'
    });
  }

  /* data-koko bodyyn jo ennen DOMContentLoadedia, jotta CSS ei ehdi maalata
     väärää riviä aktiiviseksi. Sama syy kuin asetukset.js:ssä. */
  bodyAttribuutti();

  /* KORJAUS 20.8.2026 (T-11): renderöinti ei enää käynnistä itseään.

     Tässä oli oma DOMContentLoaded-kuuntelija. Koska talo.js ladataan ennen
     proto.js:ää, kuuntelijat laukesivat latausjärjestyksessä ja tämän
     tiedoston init() ajettiin ennen proto.js:n renderCopy():ta. Järjestys
     oli oikea, mutta se oli oikea vahingossa — kukaan ei ollut päättänyt
     sitä, eikä sitä voinut lukea mistään.

     Järjestys on oikea siksi, että vertailuRivi() LUO uusia
     <th data-copy="...">-elementtejä. renderCopy() ei voi täyttää
     elementtejä joita ei vielä ole. Riippuvuus menee siis näin:

         taloRender()  luo DOMin  →  renderCopy()  täyttää sen

     Kutsu on nyt proto.js:n init-listassa, jossa koko järjestys on
     luettavissa kerralla. Ks. proto.js == Käynnistys. */
  window.taloRender = init;
})();
