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

  function lueKoko() {
    var arvo = null;
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
          kokoNimi(koko.makuuhuoneita) +
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
      if (koko) btn.textContent = kokoNimi(koko.makuuhuoneita);

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
        th.textContent = kokoNimi(koko.makuuhuoneita);
        otsikkoRivi.appendChild(th);
      });

      thead.appendChild(otsikkoRivi);
      taulukko.appendChild(thead);

      vertailuRivi(tbody, 'yhteinen.taloVertailuPintaAla',
        function (koko) { return koko.neliot; }, 'm²');
      vertailuRivi(tbody, 'yhteinen.taloVertailuHuoneistotyyppi',
        function (koko) { return koko.huoneistotyyppi; }, 'huoneistotyyppi');

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

       data-pohja-tila="kuva"     piirustus on olemassa (mh3)
       data-pohja-tila="puuttuu"  piirustusta ei ole (mh2, mh4)

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
    /* Huoneiden nimet ovat datan arvoja (POHJA_3MH), joten käännös tulee
       sanakirjasta. Piirustus on alkujaan ruotsinkielinen, joten ruotsissa
       palataan lähteen omiin nimiin. */
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
    var nimi  = koko ? kokoNimi(koko.makuuhuoneita) : null;
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
  function renderTyylit() {
    var host = $('[data-talo-lista="tyylit"]');
    if (!host) return;
    host.textContent = '';

    var rivit = (data && data.tyylit && data.tyylit.length) ? data.tyylit : [];
    if (!rivit.length) {
      var tyhjaLi = document.createElement('li');
      tyhjaLi.className = 'opt';
      tyhjaLi.appendChild(gap('sisustustyylit puuttuvat'));
      host.appendChild(tyhjaLi);
      return;
    }

    var puuttuvia = 0;

    rivit.forEach(function (rivi) {
      var li = document.createElement('li');
      li.className = 'opt';
      li.setAttribute('data-tyyli', rivi.tunnus || '');

      var h = document.createElement('h3');
      if (rivi.nimi) {
        h.textContent = sana(rivi.nimi);
      } else {
        h.appendChild(gap('sisustustyylin nimi'));
        puuttuvia++;
      }
      li.appendChild(h);

      var p = document.createElement('p');
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
            document.createTextNode(', ' + kokoNimi(koko.makuuhuoneita)));
        } else {
          nimi.textContent = lisaysNimi(koko.makuuhuoneita);
        }
        li.appendChild(nimi);

        var arvo = document.createElement('span');
        arvo.className = 'koko-hinta__arvo';

        if (koko.perus) {
          /* Perushinta on kokonaisluku, ei lisä. Itse luku puuttuu edelleen,
             joten se on merkitty aukko — mutta aukko kokonaishinnasta, ei
             aukko lisästä. Ero on kävijälle olennainen. */
          arvo.appendChild(gap('XXX XXX €'));
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
    renderTyylit();
    renderTekniset();

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
