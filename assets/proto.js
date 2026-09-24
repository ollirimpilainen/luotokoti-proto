/* ==========================================================================
   Luotokoti — prototyypin toiminnallisuus (v2)
   Ei riippuvuuksia, ei build-vaihetta.

   Latausjärjestys sivulla:
     1  asetukset.js        heti <body>-elementin sisällä, ennen sisältöä
     2  talo-data.js        talo, index, kohteet, kohde, oma-tontti
     3  kohteet-data.js     kohteet.html, kohde.html, talo.html
        copy-data.js        kaikki sivut
        copy-data-sv.js     kaikki sivut, heti copy-data.js:n jälkeen
     4  tonttikriteerit.js  vain oma-tontti.html
     5  proto.js            lopussa

   00 Copy                 COPY / COPY_SV → [data-copy], ajetaan ensimmäisenä
   01 Muistiinpanotila     sessionStorage, oletuksena pois
   02 Mobiilinavigaatio
   03 Globaalit vaihtimet  omistusmalli + sisältö, säilyvät sivujen yli
                           (hintamalli poistettu v4:ssä — D2 ratkesi)
   04 Kohteet              KOHTEET → listaus tai tyhjä tila
   04b Kohteen alasivu     kohde.html?kohde=… → yksi kohde
   05 Tonttitarkistuslista TONTTIKRITEERIT → kolme tulosta
   06 Lomake ja kiitos-tila
   07 Kielenvaihtaja       FI/SV, ?lang= + sessionStorage
   08 Kelluva CTA-palkki
   09 Sisääntuloliike
   10 Mittarointi          konsolilokitus + scroll-syvyys
   ========================================================================== */

(function () {
  'use strict';

  var store = {
    get: function (k) {
      try { return window.sessionStorage.getItem(k); } catch (e) { return null; }
    },
    set: function (k, v) {
      try { window.sessionStorage.setItem(k, v); } catch (e) { /* private mode */ }
    }
  };

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  /* Datan ja koodin arvot kulkevat kieliapurin läpi. Sivuston omat lauseet
     eivät: ne haetaan copyArvo():lla, joka merkitsee puuttuvan käännöksen
     aukkona. Ks. asetukset.js, Kieliapurit — perustelu erolle on siellä. */
  var sana = (typeof ASETUKSET !== 'undefined' && ASETUKSET.sana)
    ? ASETUKSET.sana : function (t) { return t; };

  /* Valmiin HTML-lohkon tekstisolmut kieliapurin läpi. Käytössä
     placeholder-lohkoissa, joiden sisältö on HTML-merkkijono datassa. */
  function kaannaTekstisolmut(juuri) {
    if (kieli() === 'fi') return;
    var kavelija = document.createTreeWalker(juuri, NodeFilter.SHOW_TEXT, null);
    var solmut = [], n;
    while ((n = kavelija.nextNode())) solmut.push(n);
    solmut.forEach(function (solmu) {
      var teksti = solmu.nodeValue.replace(/\s+/g, ' ').trim();
      if (!teksti) return;
      var kaannos = sana(teksti);
      if (kaannos !== teksti) solmu.nodeValue = kaannos;
    });
  }

  /* Merkitty aukko. Ei koskaan tyhjä merkkijono, ei koskaan arvattu arvo. */
  function aukko(teksti) {
    var el = document.createElement('span');
    el.className = 'gap';
    el.textContent = '[' + sana(teksti) + ']';
    /* Merkintä siitä, että selite on jo kulkenut kieliapurin läpi. Ilman
       tätä kaannaAukot() kääntäisi sen toistamiseen ja kirjaisi valmiin
       ruotsinkielisen selitteen kääntämättömäksi. */
    el.setAttribute('data-aukko-lahde', 'js');
    return el;
  }

  /* Arvo tai merkitty aukko. Tämä on koko datavetoisen osan ydinsääntö. */
  function arvoTaiAukko(arvo, label) {
    if (arvo === null || arvo === undefined || arvo === '') return aukko(label);
    return document.createTextNode(sana(String(arvo)));
  }

  /* Sama, mutta arvo on JO käännetty. Kohteen merkinnät tulevat
     kohteenMerkinta():stä, joka kääntää ne itse — toinen käännöskerros ei
     muuttaisi tulosta mutta kirjaisi ruotsinkielisen arvon kääntämättömäksi
     ja hukuttaisi oikeat puutteet raporttiin. */
  function valmisArvoTaiAukko(arvo, label) {
    if (arvo === null || arvo === undefined || arvo === '') return aukko(label);
    return document.createTextNode(String(arvo));
  }

  function log(nimi, extra) {
    var rivi = '[luotokoti-proto] ' + nimi;
    if (extra) { console.log(rivi, extra); } else { console.log(rivi); }
  }

  /* == 00 Copy ============================================================ */

  /* Täyttää kaikki [data-copy]-elementit COPY-objektista. Ajetaan
     ENSIMMÄISENÄ, ennen initPlaceholderia: placeholder korvaa aukkoja,
     joten copyn on oltava paikallaan sitä ennen.

     Polku on pistenotaatio ja se kestää myös taulukkoindeksit:
       data-copy="yhteinen.luottamusOtsikko"
       data-copy="yhteinen.prosessi.0.otsikko"

     Kolme sääntöä:
       · null → merkitty aukko. Sama gap-apufunktio kuin muualla.
       · avainta ei ole → aukko + konsolivaroitus. Kirjoitusvirhe polussa
         ei saa näkyä tyhjänä elementtinä, koska sitä ei huomaa.
       · elementin oma sisältö on varasisältö. Jos avain löytyy, avain
         voittaa. Näin migraation voi tehdä vaiheittain ilman että sivu
         hajoaa väliin.

     data-copy asettaa textContentin. Jos lauseessa on korostuksia,
     käytetään data-copy-html -attribuuttia — se on erillinen nimenomaan
     siksi, ettei innerHTML ole oletus. */

  /* Sivun kieli. Attribuutti on asetukset.js:n asettama ja se on paikallaan
     ennen ensimmäistä maalausta, joten tätä voi kysyä milloin tahansa. */
  function kieli() {
    return document.body.getAttribute('data-kieli') === 'sv' ? 'sv' : 'fi';
  }

  /* Polun haku annetusta puusta. Kahdelle kielelle sama funktio, jotta
     hakusääntö (pistenotaatio, taulukkoindeksit) ei voi eriytyä. */
  function haePolku(juuri, polku) {
    if (!juuri) return { loytyi: false, arvo: null };
    var osat = polku.split('.');
    var kohde = juuri;
    for (var i = 0; i < osat.length; i++) {
      if (kohde === null || kohde === undefined) return { loytyi: false, arvo: null };
      /* hasOwnProperty ei kelpaa taulukkoindekseille, joten tarkistetaan
         avaimen olemassaolo in-operaattorilla. */
      if (!(osat[i] in Object(kohde))) return { loytyi: false, arvo: null };
      kohde = kohde[osat[i]];
    }
    return { loytyi: true, arvo: kohde };
  }

  /* KOLME ERI PUUTETTA, KOLME ERI MERKINTÄÄ. Tämä on tämän funktion koko
     tarkoitus, ja järjestys on tarkka:

       1  avainta ei ole suomen puussa          → koodivirhe
       2  suomen arvo on null                   → tietoa ei ole (aukko)
       3  suomi on, ruotsi puuttuu              → käännös puuttuu

     Kohta 2 tarkistetaan ennen kohtaa 3, koska puuttuvaa tietoa ei voi
     kääntää: jos hintaa ei tiedetä, se on aukko molemmilla kielillä eikä
     kääntäjälle kuuluva tehtävä. Ja kohta 3 ei koskaan putoa takaisin
     suomeen — suomenkielinen lause ruotsinkielisellä sivulla on hiljainen
     virhe, jota kukaan ei huomaa korjata. Merkitty aukko huomataan. */
  function copyArvo(polku) {
    if (typeof COPY === 'undefined' || !COPY) return { loytyi: false, arvo: null };

    var fi = haePolku(COPY, polku);
    if (!fi.loytyi) return { loytyi: false, arvo: null };
    if (kieli() === 'fi') return { loytyi: true, arvo: fi.arvo };

    /* Tyhjä suomen arvo on aukko, ei käännöstehtävä. */
    if (fi.arvo === null || fi.arvo === undefined || fi.arvo === '') {
      return { loytyi: true, arvo: fi.arvo };
    }

    var sv = haePolku(typeof COPY_SV !== 'undefined' ? COPY_SV : null, polku);
    if (sv.loytyi && sv.arvo !== null && sv.arvo !== undefined && sv.arvo !== '') {
      return { loytyi: true, arvo: sv.arvo };
    }
    return { loytyi: true, arvo: null, kaannosPuuttuu: true };
  }

  /* Sisällön kirjoitus. Kolme kohdetta, koska sivulla on kolme paikkaa
     joissa lause näkyy: elementin sisältö, <meta>-elementin content ja
     saavutettava nimi (aria-label). Kaikki kolme kulkevat saman haun
     kautta, jottei kieli voi vaihtua vain osalle sivusta.

     <meta> ja <title> ovat sivun kieltä siinä missä leipätekstikin:
     ruotsinkielinen sivu, jonka välilehti lukee suomeksi, on käännetty
     puolittain. */
  function kirjoitaCopy(el, arvo, html) {
    if (el.tagName === 'META') { el.setAttribute('content', arvo); return; }
    if (html) { el.innerHTML = arvo; return; }
    el.textContent = arvo;
  }

  /* Merkitty aukko samoihin kohteisiin. <title> ja <meta> eivät voi sisältää
     elementtiä: span title-elementin sisällä tyhjentää document.titlen, ja
     silloin välilehdellä lukee osoite. Merkintä menee siis tekstinä, samoilla
     hakasulkeilla joilla span sen näyttäisi. */
  function kirjoitaAukko(el, teksti) {
    if (el.tagName === 'META') { el.setAttribute('content', '[' + teksti + ']'); return; }
    if (el.tagName === 'TITLE') { el.textContent = '[' + teksti + ']'; return; }
    el.textContent = '';
    el.appendChild(aukko(teksti));
  }

  function renderCopy() {
    var elementit = $$('[data-copy],[data-copy-html],[data-copy-aria]');
    if (!elementit.length) return;

    var taytetty = 0, aukkoja = 0, puuttuvia = [], kaantamattomia = [];

    /* Saavutettava nimi on oma attribuutti, koska sen arvo ei ole sama kuin
       elementin sisältö — kuvapaikan aria-label kertoo mitä kuvassa pitäisi
       olla, ja sisältö kertoo mitä puuttuu. */
    elementit.forEach(function (el) {
      if (el.hasAttribute('data-copy-aria')) {
        var ap = el.getAttribute('data-copy-aria');
        var at = copyArvo(ap);
        if (at.loytyi && at.arvo) { el.setAttribute('aria-label', at.arvo); }
        else if (at.kaannosPuuttuu) { kaantamattomia.push(ap); }
        else if (!at.loytyi) { puuttuvia.push(ap); }
      }
    });

    elementit.forEach(function (el) {
      var html = el.hasAttribute('data-copy-html');
      var polku = el.getAttribute(html ? 'data-copy-html' : 'data-copy');
      if (!polku) return;
      var tulos = copyArvo(polku);

      /* Käännös puuttuu. Merkintä on ruotsiksi, koska se näkyy
         ruotsinkielisellä sivulla ruotsinkieliselle lukijalle — ja se on eri
         merkintä kuin puuttuva tieto, jotta kääntämätön lause ei naamioidu
         avoimeksi kysymykseksi. */
      if (tulos.kaannosPuuttuu) {
        kirjoitaAukko(el, 'översättning saknas: ' + polku);
        kaantamattomia.push(polku);
        return;
      }

      if (!tulos.loytyi) {
        /* Tuntematon avain on koodivirhe, ei puuttuvaa tietoa. Se
           merkitään sivulle eri sanoin kuin tiedon puute, jottei
           kirjoitusvirhe naamioidu avoimeksi kysymykseksi. */
        kirjoitaAukko(el, 'copy puuttuu: ' + polku);
        puuttuvia.push(polku);
        return;
      }

      if (tulos.arvo === null || tulos.arvo === undefined || tulos.arvo === '') {
        /* Tieto puuttuu. Aukon nimi tulee data-gap-attribuutista jos se on
           annettu — silloin placeholder-tila osaa paikata sen samalla
           avaimella kuin muutkin aukot. */
        kirjoitaAukko(el, el.getAttribute('data-gap') || polku);
        aukkoja++;
        return;
      }

      kirjoitaCopy(el, tulos.arvo, html);
      taytetty++;
    });

    log('proto_copy', { kieli: kieli(), taytetty: taytetty, aukkoja: aukkoja,
                        tuntemattomia: puuttuvia.length,
                        kaantamattomia: kaantamattomia.length });
    if (puuttuvia.length) {
      console.warn('[luotokoti-proto] tuntematon data-copy-polku: ' +
                   puuttuvia.join(', '));
    }
    if (kaantamattomia.length) {
      console.warn('[luotokoti-proto] käännös puuttuu (sv): ' +
                   kaantamattomia.join(', '));
    }
    if (kieli() === 'sv' && typeof COPY_SV === 'undefined') {
      console.error('[luotokoti-proto] copy-data-sv.js puuttuu sivulta — ' +
                    'koko sivu renderöityy käännösaukkoina');
    }
  }

  /* == 01 Muistiinpanotila ================================================ */

  function initNotes() {
    var toggle = $('[data-notes-toggle]');
    if (!toggle) return;
    var KEY = 'luotokoti:notes';

    function apply(on) {
      document.body.classList.toggle('notes', on);
      toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
      var label = $('.notes-toggle__label', toggle);
      if (label) label.textContent = 'Muistiinpanot';
      toggle.setAttribute('aria-label', on ? 'Piilota muistiinpanot' : 'Näytä muistiinpanot');
    }

    apply(store.get(KEY) === 'on');

    toggle.addEventListener('click', function () {
      var on = toggle.getAttribute('aria-pressed') !== 'true';
      apply(on);
      store.set(KEY, on ? 'on' : 'off');
      log(on ? 'proto_muistiinpanot_paalle' : 'proto_muistiinpanot_pois');
    });
  }

  /* == 02 Mobiilinavigaatio =============================================== */

  function initNav() {
    var toggle = $('[data-nav-toggle]');
    var nav = $('#site-nav');
    if (!toggle || !nav) return;

    function apply(open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    apply(false);

    toggle.addEventListener('click', function () {
      apply(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { apply(false); toggle.focus(); }
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { apply(false); });
    });
  }

  /* == 03 Globaalit vaihtimet ============================================= */

  /* Näkyvyys on jo hoidettu CSS:llä ja asetukset.js on asettanut
     body-attribuutit ennen ensimmäistä maalausta. Täällä kytketään vain
     painikkeet ja kerrotaan ruudunlukijalle mikä vaihtui. */
  function initAsetukset() {
    if (typeof ASETUKSET === 'undefined') return;

    ['omistusmalli'].forEach(function (nimi) {
      ASETUKSET.paivitaPainikkeet(nimi, ASETUKSET.hae(nimi));
    });

    $$('[data-asetus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nimi = btn.getAttribute('data-asetus');
        var arvo = btn.getAttribute('data-arvo');
        ASETUKSET.aseta(nimi, arvo);

        var live = $('[data-asetus-status]');
        if (live) {
          live.textContent = (nimi === 'omistusmalli' ? 'Omistusmalli' : 'Sisältö') +
            ': ' + (btn.getAttribute('data-selite') || arvo);
        }
      });
    });
  }

  /* == 03b Placeholder-sisältö ============================================ */

  /* Korvaa hakasulkeiset aukot kuvitteellisilla arvoilla, jotta layoutia ja
     typografiaa voi arvioida oikeanmittaisilla teksteillä. "[XXX XXX €]" ei
     vie saman verran tilaa kuin "289 000 €" eikä rivity samoin.

     Alkuperäinen aukko talletetaan data-aukko-attribuuttiin, joten mitään ei
     menetetä ja muistiinpanotila voi näyttää sen. Vaihdin on ohjauspalkissa.

     ⚠ Kaikki arvot ovat kuvitteellisia. Ne eivät ole Luotokodin tietoja. */
  function initPlaceholder() {
    if (document.body.getAttribute('data-sisalto') !== 'placeholder') return;
    if (typeof PLACEHOLDER === 'undefined') return;

    var sarjaLaskurit = {};

    /* HINTATASO SIVUN MUKAAN. Tontti on mukana vain kohdetason sivuilla:
       kohteet.html ja kohde.html (taso 2). Etusivulla ja Oma tontti -sivulla
       luku on ilman tonttia — etusivun oma selite sanoo sen ääneen (*tontin
       hinta vaihtelee kohteittain*) ja Oma tontti -sivulla tontti on jo
       asiakkaan. Ks. copy-data.js:n hintalogiikka.

       KORJAUS 20.8.2026: ehto oli aiemmin pelkkä /oma-tontti/, joten etusivu
       sai paketin hinnan (tontteineen) vaikka sivun copy lupaa hinnan ilman
       tonttia. Ristiriita ei näkynyt niin kauan kuin luku oli yksi; kolmen
       koon vertailu näyttää sen heti otsikon alla. Ks. AVOIMET.md kohta 160. */
    var tontinKanssa = /kohteet\.html|kohde\.html/.test(location.pathname);

    function ratkaise(label, el) {
      var key = label.toLowerCase();

      /* Hinnan neljä osaa: arvo riippuu sijainnista listassa. */
      if (key === '€ tai %') {
        var li = el.closest('li');
        var lista = li && li.parentNode;
        var i = lista ? Array.prototype.indexOf.call(lista.children, li) : 0;
        return PLACEHOLDER.hintaOsat[i] || PLACEHOLDER.hintaOsat[0];
      }

      /* Hinta. Kokovertailussa arvo riippuu SARAKKEESTA (kolme kokoa), muualla
         se on sivun yksi luku. Sama avain molemmissa, koska aukko lukee
         sivulla samoin: [XXX XXX €]. Sarjat on johdettu samoista luvuista
         kuin yksittäinen hinta, joten taulukko ja hintaporras eivät voi
         kertoa eri tarinaa samalla sivulla. */
      if (key === 'xxx xxx €') {
        /* Puuttuva sarja ei kaada koko paikkausta: prototyyppiä avataan myös
           tuplaklikkaamalla ja sähköpostin liitteestä, ja silloin selaimen
           välimuistissa voi olla eri-ikäisiä tiedostoja. Ilman tätä yksi
           puuttuva avain jättäisi KAIKKI aukot paikkaamatta. */
        var sarjat = PLACEHOLDER.kokoHinnat || {};
        var sarja = (tontinKanssa ? sarjat.tontteineen : sarjat.ilmanTonttia) || [];
        var solu = el.closest ? el.closest('.koko-vertailu td') : null;
        if (solu && sarja.length) {
          /* Rivin ensimmäinen solu on rivin otsikko (th), joten sarakkeen
             indeksi on solun indeksi miinus yksi. */
          var sarake = Array.prototype.indexOf.call(solu.parentNode.children, solu) - 1;
          return sarja[sarake] || sarja[0];
        }
        return tontinKanssa ? PLACEHOLDER.hinnat.paketti : PLACEHOLDER.hinnat.omaTontti;
      }

      /* Sarjat: kolme henkilöä eivät ole identtisiä. */
      if (PLACEHOLDER.sarjat[key]) {
        var s = PLACEHOLDER.sarjat[key];
        var n = sarjaLaskurit[key] || 0;
        sarjaLaskurit[key] = n + 1;
        return s[n % s.length];
      }

      return PLACEHOLDER.arvot[key] || null;
    }

    var korvattu = 0, jaljella = 0;

    /* Lohkotason aukot ensin: asiakassitaatti ja henkilöesittely
       vaikuttavat layoutiin eri tavalla kuin yksi hakasulje. */
    $$('.gap--block').forEach(function (el) {
      if (el.closest('.note')) return;
      var eka = (el.textContent || '').trim().split('\n')[0]
                  .replace(/^\[|\]$/g, '').split('—')[0].trim().toLowerCase();
      var sisalto = PLACEHOLDER.lohkot[eka];
      if (!sisalto) return;
      el.setAttribute('data-aukko', '[' + eka + ']');
      el.classList.add('gap--demo-lohko');
      el.innerHTML = sisalto;
      /* Lohkon sisältö on HTML:ää, joten käännös tehdään tekstisolmuille
         insertoinnin JÄLKEEN: sanakirjan avaimet ovat lauseita eivätkä
         HTML-merkkijonoja. */
      kaannaTekstisolmut(el);
      korvattu++;
    });

    $$('.gap').forEach(function (el) {
      /* Muistiinpanojen sisällä olevat aukot jätetään rauhaan: ne ovat
         dokumentaatiota, eivät sivun sisältöä. */
      if (el.closest('.note')) return;
      if (el.classList.contains('gap--demo-lohko')) return;

      var teksti = (el.textContent || '').trim();
      var label = teksti.replace(/^\[|\]$/g, '').trim();
      var arvo = ratkaise(label, el);

      if (arvo === null) { jaljella++; return; }

      /* Käännös ENNEN sitovaa välilyöntiä: sanakirjan avaimissa on
         tavallinen välilyönti, ja sidottu välilyönti ei osuisi avaimeen.
         Kuvitteelliset arvot ovat käännettävää sisältöä siinä missä
         muukin — niiden tehtävä on näyttää rivitys oikeanmittaisella
         tekstillä, ja ruotsin rivipituus on eri kuin suomen. */
      arvo = sana(String(arvo));

      /* Numeron jälkeinen välilyönti sidotaan: "8 500 €" ja "118 m²" eivät
         saa katketa yksikön tai tuhaterottimen kohdalta. Yleissääntö, jotta
         yksikään tuleva placeholder-arvo ei riko rivitystä. */
      arvo = String(arvo).replace(/(\d)\u0020/g, '$1\u00a0');

      el.setAttribute('data-aukko', teksti);
      el.classList.add('gap--demo');
      el.textContent = arvo;
      korvattu++;
    });

    log('proto_placeholder_kaytossa', {
      korvattuja: korvattu,
      ilman_arvoa: jaljella
    });

    placeholderKuvat();
  }

  /* VALOKUVAT KUVAPAIKKOIHIN. Sama kytkin kuin muullakin
     placeholder-sisällöllä: kuvat näkyvät vain `data-sisalto="placeholder"`
     -tilassa, ja aukkotila on yhä prototyypin oletus.

     Kuvapaikka valitaan markupista (`data-ph-kuva="julkisivu"`) eikä
     täältä: kuvan sopivuus on sisältöpäätös, ja se kuuluu sen sektion
     viereen jota se koskee. Avaimet ovat PLACEHOLDER.kuvat.

     Tuntematon avain on koodivirhe eikä puuttuva kuva, joten se jättää
     aukon näkyviin ja varoittaa konsolissa — sama sääntö kuin
     data-copy-poluilla.

     role="img" ja aria-label kuvailevat markupissa PUUTTUVAA kuvaa
     ("Kuvapaikka: … Kuva puuttuu prototyypistä"). Kuvatilassa ne
     valehtelisivat ruudunlukijalle, joten ne poistetaan ja <img> kantaa
     alt-tekstin itse. Sama ratkaisu kuin pohjapiirustuksessa
     (talo.js, data-pohja-tila). */
  function placeholderKuvat() {
    var kuvat = PLACEHOLDER.kuvat;
    if (!kuvat) return;

    var lisatty = 0, tuntemattomia = [];

    $$('[data-ph-kuva]').forEach(function (fig) {
      var avain = fig.getAttribute('data-ph-kuva');
      var kuva = kuvat[avain];

      if (!kuva || !kuva.tiedosto) { tuntemattomia.push(avain); return; }
      /* Kahdesti ajettu init ei tuplaa kuvaa. */
      if (fig.getAttribute('data-ph-tila') === 'kuva') return;

      var img = document.createElement('img');
      img.className = 'ph__kuva';
      img.src = kuva.tiedosto;
      /* Alt-teksti on datan arvo kuten muutkin: ruotsinkielisellä sivulla
         suomenkielinen kuvaus on ruudunlukijalle yhtä väärin kuin
         suomenkielinen otsikko silmälle. */
      img.alt = sana(kuva.alt || '');

      fig.removeAttribute('role');
      fig.removeAttribute('aria-label');
      fig.setAttribute('data-ph-tila', 'kuva');
      fig.appendChild(img);
      lisatty++;
    });

    if (tuntemattomia.length) {
      console.warn('[Luotokoti] tuntematon data-ph-kuva: ' +
                   tuntemattomia.join(', '));
    }
    if (lisatty || tuntemattomia.length) {
      log('proto_placeholder_kuvat', {
        lisattyja: lisatty,
        tuntemattomia: tuntemattomia.length
      });
    }
  }

  /* == 04 Kohteet ========================================================= */

  /* v4: sektio käsitteli tontteja (ALUEET), nyt kohteita (KOHTEET). Kohde on
     hanke jossa on taloja, ei yksittäinen tontti.

     Tyhjä tila renderöityy automaattisesti kun KOHTEET on tyhjä. Kaikki
     kentät kulkevat arvoTaiAukko-funktion läpi, joten puuttuva tieto näkyy
     merkittynä aukkona eikä tyhjänä rivinä. */

  /* Osoiteparametri. Yksi apufunktio, jota käyttävät sekä kohde.html että
     yhteystiedot.html:n esitäyttö — ilman tätä sama parsinta olisi kahdessa
     paikassa ja ehtisi eriytyä.

     Ei URLSearchParamsia: se ei ole ES5:ää, ja prototyypin pitää avautua
     myös vanhemmassa selaimessa. */
  function haeParametri(nimi) {
    var haku = location.search || '';
    if (haku.charAt(0) === '?') haku = haku.slice(1);
    var osat = haku.split('&');
    for (var i = 0; i < osat.length; i++) {
      if (!osat[i]) continue;
      var pari = osat[i].split('=');
      if (decodeURIComponent(pari[0]) === nimi) {
        return decodeURIComponent((pari[1] || '').replace(/\+/g, ' '));
      }
    }
    return null;
  }

  /* Hintahaarukka: "339 000 – 389 000 €". EI "alkaen" — brändistrategia
     kieltää sen erikseen, ja haarukka on eri asia: siinä ei jää mitään
     piiloon. Jos vain toinen pää on tiedossa, näytetään se ja toinen on
     merkitty aukko. */
  function hintaHaarukka(kohde) {
    var frag = document.createDocumentFragment();
    var min = kohde ? kohde.hintaMin : null;
    var max = kohde ? kohde.hintaMax : null;

    if (min === null && max === null) {
      frag.appendChild(aukko('XXX XXX – XXX XXX €'));
      return frag;
    }
    /* Sama luku molemmissa päissä ei ole haarukka vaan hinta. */
    if (min !== null && max !== null && String(min) === String(max)) {
      frag.appendChild(document.createTextNode(String(min)));
      return frag;
    }
    frag.appendChild(arvoTaiAukko(min, 'XXX XXX €'));
    frag.appendChild(document.createTextNode(' – '));
    frag.appendChild(arvoTaiAukko(max, 'XXX XXX €'));
    return frag;
  }

  /* Merkintä: tila + valmius. Säännöt ovat kohteet-data.js:n
     kohteenMerkinta()-funktiossa, ei täällä — sama merkintä tarvitaan
     listauksessa ja kohteen alasivulla.

     v5c: tila ja valmius ovat omia elementtejään, ja merkintä täytetään
     yhdellä funktiolla molemmissa paikoissa. Kaksi syytä:

     1. Silmäiltävyys. Koko merkintä oli yksi versaalirivi hiusviivan
        värisenä, ja kolmesta kohteesta ei nähnyt yhdellä vilkaisulla mikä
        on myynnissä ja mikä ennakkomarkkinoinnissa. Tila on nyt
        merkkilappu, valmius sen vieressä hiljaisena.

     2. Kaksoiskirjanpito. Sama merkintä rakennettiin kahdesti — täällä
        listaukselle ja initKohdessa alasivulle — ja rakenteet ehtivät jo
        eriytyä toisistaan. Nyt niitä on yksi. */
  function taytaMerkinta(host, kohde) {
    host.textContent = '';
    host.setAttribute('data-status', (kohde && kohde.status) || '');

    var m = (typeof kohteenMerkinta === 'function')
      ? kohteenMerkinta(kohde) : { status: null, valmius: null };

    var tila = document.createElement('span');
    tila.className = 'kohde-merkinta__tila';
    tila.appendChild(valmisArvoTaiAukko(m.status, 'tila'));
    host.appendChild(tila);

    /* Toteutuneella ei ole valmiusmerkintää — kohde on ohi. Muilla puuttuva
       valmistuminen on aukko eikä oletus. */
    if (!kohde || kohde.status === 'myyty') return;

    var valmius = document.createElement('span');
    valmius.className = 'kohde-merkinta__valmius';
    valmius.appendChild(valmisArvoTaiAukko(m.valmius, 'valmistuminen'));
    host.appendChild(valmius);
  }

  function merkintaElementti(kohde) {
    var span = document.createElement('span');
    span.className = 'kohde-merkinta';
    taytaMerkinta(span, kohde);
    return span;
  }

  /* Yksi kohdekortti. Sama kortti sekä listauksessa että
     referenssikirjastossa: toteutuneesta jätetään pois hinta ja
     vapaana-luku, koska myydystä kohteesta ei osteta mitään ja mennyt hinta
     olisi väärä lupaus tulevasta. */
  function kohdeKortti(kohde) {
    var toteutunut = kohde.status === 'myyty';

    var li = document.createElement('li');

    var a = document.createElement('a');
    a.className = 'alue alue--kohde';
    a.href = 'kohde.html?kohde=' + encodeURIComponent(kohde.tunnus || '');
    a.setAttribute('data-tila', kohde.status || '');
    a.setAttribute('data-event', 'taso2_kohde_katselu');
    a.setAttribute('data-kohdetunnus', kohde.tunnus || '');

    a.appendChild(merkintaElementti(kohde));

    var h3 = document.createElement('h3');
    h3.className = 'alue__nimi';
    h3.appendChild(arvoTaiAukko(kohde.nimi, 'kohteen nimi'));
    a.appendChild(h3);

    var go = document.createElement('span');
    go.className = 'alue__go';
    go.setAttribute('aria-hidden', 'true');
    go.textContent = '→';
    a.appendChild(go);

    var meta = document.createElement('p');
    meta.className = 'alue__meta';

    var sijainti = document.createElement('span');
    sijainti.appendChild(arvoTaiAukko(kohde.kunta, 'kunta'));
    sijainti.appendChild(document.createTextNode(' · '));
    sijainti.appendChild(arvoTaiAukko(kohde.alue, 'alue'));
    meta.appendChild(sijainti);

    var maara = document.createElement('span');
    maara.appendChild(arvoTaiAukko(kohde.taloja, 'lkm'));
    maara.appendChild(document.createTextNode(' ' + sana('taloa')));
    if (!toteutunut) {
      maara.appendChild(document.createTextNode(' · '));
      maara.appendChild(arvoTaiAukko(kohde.vapaana, 'lkm'));
      maara.appendChild(document.createTextNode(' ' + sana('vapaana')));
    }
    meta.appendChild(maara);

    if (!toteutunut) {
      var hinta = document.createElement('span');
      hinta.appendChild(hintaHaarukka(kohde));
      meta.appendChild(hinta);
    }
    a.appendChild(meta);

    var huomio = document.createElement('p');
    huomio.className = 'alue__huomio';
    huomio.appendChild(arvoTaiAukko(kohde.huomio, 'yksi lause kohteesta'));
    a.appendChild(huomio);

    var cta = document.createElement('span');
    cta.className = 'alue__cta';
    cta.textContent = sana(toteutunut ? 'Katso toteutunut kohde' : 'Katso kohde');
    a.appendChild(cta);

    /* Suodatuksen tarvitsemat arvot attribuutteina. Suodatus tapahtuu
       CSS:llä ja attribuuteilla, ei DOMia uudelleen rakentamalla — muuten
       listaus välähtäisi ja näyttökerta lokittuisi uudelleen. */
    a.setAttribute('data-kunta', kohde.kunta || '');
    a.setAttribute('data-suurinkoko', kohde.suurinKoko || '');
    if (kohde.hintaMin !== null && kohde.hintaMin !== undefined) {
      a.setAttribute('data-hintamin', String(kohde.hintaMin));
    }

    li.appendChild(a);
    return li;
  }

  function initKohteet() {
    var lista  = $('[data-kohteet]');
    var tyhja  = $('[data-kohteet-tyhja]');
    var refLista = $('[data-toteutuneet]');
    var refTyhja = $('[data-toteutuneet-tyhja]');
    if (!lista && !tyhja && !refLista) return;

    var data = (typeof KOHTEET !== 'undefined' && KOHTEET) ? KOHTEET : [];

    /* Myydyt eivät ole listalla lainkaan vaan referenssikirjastossa. */
    var myynnissa = data.filter(function (k) { return k.status !== 'myyty'; });
    var myydyt    = data.filter(function (k) { return k.status === 'myyty'; });

    if (typeof kohteetJarjestyksessa === 'function') {
      myynnissa = kohteetJarjestyksessa(myynnissa);
    }

    var onTyhja = myynnissa.length === 0;
    if (lista) lista.hidden = onTyhja;
    if (tyhja) tyhja.hidden = !onTyhja;

    if (lista && !onTyhja) {
      myynnissa.forEach(function (k) { lista.appendChild(kohdeKortti(k)); });
    }

    if (refLista) {
      refLista.hidden = myydyt.length === 0;
      myydyt.forEach(function (k) { refLista.appendChild(kohdeKortti(k)); });
    }
    if (refTyhja) refTyhja.hidden = myydyt.length > 0;

    log('proto_kohteet_' + (onTyhja ? 'tyhja_tila' : 'listaus_' + myynnissa.length),
        { toteutuneita: myydyt.length });

    initKohderiviNaytto();
  }

  /* == 04c Suodattimet — POISTETTU v5c ==================================== */

  /* Kohdelistauksen neljä suodatinta (sijainti · status · koko · hinta)
     poistettiin 20.8.2026. Kohteita on kolme: rajaus lupaa että jotain jää
     piiloon, eikä tässä mittakaavassa jää. Toteutus oli attribuutti- ja
     CSS-pohjainen (valinta kirjoitti data-attribuutin sektioon, CSS
     piilotti rivit), joten palautus on suoraviivainen kun kohteita on
     kymmeniä. Silloin myös tyhjä suodatustulos on aito tila.
     Ks. AVOIMET.md kohta 152. */

  /* taso1_kohderivi — kohderivin näyttökerta, ei klikkaus. Klikkaus on
     taso2_kohde_katselu ja se on jo merkitty data-event-attribuutilla.

     Miksi näyttökerta on oma tapahtuma: kohdelistaus on tämän sivun tärkein
     elementti, mutta konversioita voi olla kuukaudessa nolla tai yksi.
     Näyttökerta kertoo mitkä kohteet ylipäätään nähdään, ja se tuottaa
     signaalia myös silloin kun klikkejä ei ole. */
  function initKohderiviNaytto() {
    if (!('IntersectionObserver' in window)) return;
    var rivit = $$('a.alue[data-kohdetunnus]');
    if (!rivit.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        log('taso1_kohderivi', {
          kohde: entry.target.getAttribute('data-kohdetunnus') || null,
          tila: entry.target.getAttribute('data-tila') || null,
          sivu: location.pathname.split('/').pop() || 'kohteet.html'
        });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    rivit.forEach(function (rivi) { io.observe(rivi); });
  }

  /* Koon tunnus → luettava nimi. Nimeämissääntö tulee kokoNimi()-funktiosta
     talo-data.js:stä, jotta se ei eriydy sivujen välillä. */
  function kokoRajaTeksti(tunnus) {
    if (!tunnus) return aukko('suurin koko');
    if (typeof TALO === 'undefined' || !TALO || !TALO.koot) return aukko('suurin koko');
    for (var i = 0; i < TALO.koot.length; i++) {
      if (TALO.koot[i].tunnus === tunnus) {
        return document.createTextNode(kokoNimi(TALO.koot[i].makuuhuoneita));
      }
    }
    return aukko('suurin koko');
  }

  /* Kokovertailun rajatut sarakkeet (vain kohde.html).

     Kohteen kaava voi rajata suurimman mahdollisen koon, ja kokovertailu
     näyttää talon kaikki kolme kokoa. Ilman merkintää taulukko väittäisi
     saatavuutta jonka sivu itse kumoaa yhtä riviä alempana — ja rivi *Suurin
     mahdollinen koko tässä kohteessa* on helppo lukea taulukon jälkeen eikä
     ennen sitä.

     Sarake EI katoa: koko on olemassa tuotteessa, se ei vain mahdu tälle
     tontille. Piilotettu sarake tekisi kolmesta koosta kaksi ja veisi
     kävijältä tiedon siitä, mitä hän voisi saada toisessa kohteessa.

     null suurimmassa koossa ei tarkoita "ei rajoitusta" vaan "ei tiedossa",
     joten ilman kaavatietoa ei merkitä mitään. Merkinnän teksti tulee
     copystä; renderCopy() on jo ajettu tässä vaiheessa, joten arvo luetaan
     COPY:sta suoraan eikä data-copy-attribuutilla. */
  function merkitseRajatutKoot(kohde) {
    var taulukko = $('.koko-vertailu');
    if (!taulukko) return;
    if (!kohde || !kohde.suurinKoko) return;
    if (typeof TALO === 'undefined' || !TALO || !TALO.koot) return;

    var rajaIndeksi = -1;
    TALO.koot.forEach(function (koko, i) {
      if (koko.tunnus === kohde.suurinKoko) rajaIndeksi = i;
    });
    if (rajaIndeksi < 0) return;

    var rajatut = {};
    TALO.koot.forEach(function (koko, i) {
      if (i > rajaIndeksi) rajatut[koko.tunnus] = true;
    });

    var teksti = copyArvo('kohde.taloVertailuRajattu');

    $$('[data-koko]', taulukko).forEach(function (solu) {
      if (!rajatut[solu.getAttribute('data-koko')]) return;
      solu.setAttribute('data-rajattu', 'true');

      /* Merkintä vain sarakeotsikkoon: sama teksti joka solussa toistaisi
         saman tiedon kolmesti samassa sarakkeessa. */
      if (solu.tagName === 'TH' && teksti.loytyi && teksti.arvo) {
        var lisa = document.createElement('span');
        lisa.className = 'koko-vertailu__rajattu';
        lisa.textContent = teksti.arvo;
        solu.appendChild(lisa);
      }
    });
  }

  /* Talo-sivun nosto: enintään kolme kohdetta samassa järjestyksessä kuin
     Kohteet-sivun listaus. Tyhjä tila on aluekysely eikä tyhjä osio — jos
     kohteita ei ole, oikea kysymys kävijälle on missä hän haluaisi asua. */
  var TALO_KOHTEITA_ENINTAAN = 3;

  function initTaloKohteet() {
    var lista = $('[data-talo-kohteet]');
    if (!lista) return;

    var tyhja  = $('[data-talo-kohteet-tyhja]');
    var linkki = $('[data-talo-kohteet-linkki]');

    var data = (typeof KOHTEET !== 'undefined' && KOHTEET) ? KOHTEET : [];
    var avoimet = data.filter(function (k) { return k.status !== 'myyty'; });
    if (typeof kohteetJarjestyksessa === 'function') {
      avoimet = kohteetJarjestyksessa(avoimet);
    }

    var naytetaan = avoimet.slice(0, TALO_KOHTEITA_ENINTAAN);

    lista.hidden = naytetaan.length === 0;
    if (tyhja)  tyhja.hidden  = naytetaan.length > 0;
    if (linkki) linkki.hidden = naytetaan.length === 0;

    naytetaan.forEach(function (k) { lista.appendChild(kohdeKortti(k)); });

    /* Nosto on rajattu kolmeen. Jos kohteita on enemmän, se sanotaan ääneen
       eikä jätetä katkaisua näkymättömäksi. */
    if (avoimet.length > naytetaan.length && linkki) {
      var a = $('a', linkki);
      /* Lause on sanakirjassa kokonaisena ja luku sijoitetaan siihen:
         ruotsissa sanajärjestys on eri, eikä palasista koottu lause ole
         käännettävissä. */
      if (a) a.textContent = sana('Katso kaikki {n} kohdetta')
        .replace('{n}', String(avoimet.length));
    }

    log('proto_talo_kohdenosto', {
      naytetty: naytetaan.length,
      avoimia: avoimet.length
    });

    initKohderiviNaytto();
  }

  /* Toimialuekartan paikkakuntamerkinnät. Aiemmin nämä olivat kovakoodattua
     markupia neljälle paikkakunnalle; nyt ne tulevat KOHTEET-datasta, joten
     kartta ei voi vanhentua suhteessa listaukseen.

     ⚠ IKKUNA ON SIDOTTU tyokalut/kartta.py:hyn. Nämä neljä lukua ovat samat
     kuin skriptin build()-kutsussa. Jos rajaus muuttuu, molemmat on
     päivitettävä — muuten merkinnät liukuvat pois paikoiltaan. Sidosta ei
     voi purkaa lukematta SVG:tä ajonaikana, ja se olisi turha pyyntö
     pelkkien neljän luvun vuoksi. */
  var KARTTA_IKKUNA = { lat0: 59.60, lat1: 70.30, lon0: 18.50, lon1: 32.00 };

  function initKartta() {
    var host = $('[data-kartta-kohteet]');
    if (!host) return;

    var data = (typeof KOHTEET !== 'undefined' && KOHTEET) ? KOHTEET : [];

    /* Yksi merkintä per paikkakunta, ei per kohde: kaksi kohdetta samassa
       kunnassa piirtäisi kaksi nimeä päällekkäin. */
    var nahdyt = {};
    var merkinnat = [];
    data.forEach(function (k) {
      if (!k.kunta || k.lat === null || k.lon === null) return;
      if (nahdyt[k.kunta]) return;
      nahdyt[k.kunta] = true;
      merkinnat.push(k);
    });

    var w = KARTTA_IKKUNA;
    merkinnat.forEach(function (k) {
      var x = (k.lon - w.lon0) / (w.lon1 - w.lon0) * 100;
      var y = (w.lat1 - k.lat) / (w.lat1 - w.lat0) * 100;
      if (x < 0 || x > 100 || y < 0 || y > 100) return;

      var span = document.createElement('span');
      span.className = 'kartta__nimi kartta__nimi--oikea';
      span.setAttribute('style', '--x:' + x.toFixed(2) + '%;--y:' + y.toFixed(2) + '%');

      var piste = document.createElement('i');
      piste.className = 'kartta__piste';
      piste.setAttribute('aria-hidden', 'true');
      span.appendChild(piste);

      var teksti = document.createElement('span');
      teksti.className = 'kartta__teksti';
      teksti.textContent = k.kunta;
      span.appendChild(teksti);

      host.parentNode.insertBefore(span, host);
    });

    var seloste = $('[data-kartta-seloste]');
    if (seloste && merkinnat.length) {
      /* Alkuosa on copyssa (yhteinen.karttaSeloste) eikä toisena kopiona
         täällä: sama lause on kartan selosteena myös silloin kun kohteita ei
         ole, ja kaksi kopiota ehtii eriytyä ensimmäisessä muutoksessa. */
      var pohja = copyArvo('yhteinen.karttaSeloste');
      seloste.textContent = (pohja.loytyi && pohja.arvo ? pohja.arvo + ' ' : '') +
        sana('Merkityt kohdepaikkakunnat:') + ' ' +
        merkinnat.map(function (k) { return sana(k.kunta); }).join(', ') + '.';
    }

    log('proto_kartta_merkinnat', { paikkakuntia: merkinnat.length });
  }

  /* == 04b Kohteen alasivu ================================================ */

  /* Yksi tiedosto renderöi minkä tahansa kohteen. Tuntematon tai puuttuva
     tunnus → ensimmäinen kohde + näkyvä huomautus. Se EI ole virhesivu:
     kohde.html avattuna tuplaklikkaamalla (file://) ei saa osoiteparametria
     lainkaan, ja sivun pitää silti näyttää jotain. */
  function initKohde() {
    if (!$('[data-kohde-talot]')) return;

    var data = (typeof KOHTEET !== 'undefined' && KOHTEET) ? KOHTEET : [];
    if (!data.length) {
      log('proto_kohde_ei_dataa');
      return;
    }

    var tunnus = haeParametri('kohde');
    var kohde = (tunnus && typeof kohdeTunnuksella === 'function')
      ? kohdeTunnuksella(tunnus) : null;

    var oletuksella = !kohde;
    if (oletuksella) kohde = data[0];

    /* Oletukseen päädytään kahdesta syystä, ja huomautus kertoo kumpi:
       tunnusta ei ollut lainkaan, vai eikö annettua tunnusta löytynyt.
       Attribuutti valitsee variantin, teksti on markupissa. (T-8) */
    var huom = $('[data-kohde-oletus]');
    if (huom) {
      huom.hidden = !oletuksella;
      huom.setAttribute('data-kohde-oletus', tunnus ? 'tuntematon' : 'puuttuu');
    }

    /* Variantin valinta on CSS:llä: attribuutti bodyyn, säännöt tyylitiedostoon.
       Sama sääntö kuin ohjauspalkin vaihtimissa. */
    document.body.setAttribute('data-kohde-tila', kohde.status || '');

    /* Yksinkertaiset tekstipaikat. Sama kuvio kuin talo.js:n data-talo. */
    $$('[data-kohde]').forEach(function (el) {
      var key = el.getAttribute('data-kohde');
      var label = el.getAttribute('data-gap') || key;
      el.textContent = '';
      el.appendChild(arvoTaiAukko(kohde[key], label));
    });

    var merkinta = $('[data-kohde-merkinta]');
    if (merkinta) taytaMerkinta(merkinta, kohde);

    $$('[data-kohde-hintahaarukka]').forEach(function (el) {
      el.textContent = '';
      el.appendChild(hintaHaarukka(kohde));
    });

    $$('[data-kohde-valmistuminen]').forEach(function (el) {
      el.textContent = '';
      var m = (typeof kohteenMerkinta === 'function')
        ? kohteenMerkinta(kohde) : { valmius: null };
      el.appendChild(valmisArvoTaiAukko(m.valmius, 'valmistuminen'));
    });

    var suurin = $('[data-kohde-suurinkoko]');
    if (suurin) {
      suurin.textContent = '';
      suurin.appendChild(kokoRajaTeksti(kohde.suurinKoko));
    }

    merkitseRajatutKoot(kohde);

    /* Laajennus on kohteissa tiedossa, koska tontti on Luotokodin. null ei
       ole "ei onnistu" vaan "ei tiedossa" — epävarmuus merkitään vain siihen
       polkuun johon se kuuluu. */
    var laaj = $('[data-kohde-laajennus]');
    if (laaj) {
      laaj.textContent = '';
      if (kohde.laajennus === true) {
        laaj.appendChild(document.createTextNode(sana('onnistuu tällä tontilla')));
      } else if (kohde.laajennus === false) {
        laaj.appendChild(document.createTextNode(sana('ei onnistu tällä tontilla')));
      } else {
        laaj.appendChild(aukko('selvitettävä'));
      }
    }

    /* Kohteen tunnus mukaan lomakelinkkeihin, jotta lomake tietää mistä
       kohteesta on kysymys. Sama parametri luetaan yhteystiedot.html:ssä. */
    $$('[data-kohde-linkki]').forEach(function (a) {
      var href = a.getAttribute('href') || 'yhteystiedot.html';
      a.setAttribute('href', href + '&kohde=' + encodeURIComponent(kohde.tunnus || ''));
    });

    renderKohteenTalot(kohde);
    renderAikajana(kohde);

    document.title = (kohde.nimi ? sana(kohde.nimi) : sana('Kohde')) +
      ' — Luotokoti';

    log('taso2_kohde_katselu', {
      kohde: kohde.tunnus,
      tila: kohde.status,
      oletuksella: oletuksella,
      sivu: 'kohde.html'
    });
  }

  /* Talot taulukkona: kävijä vertailee rivejä keskenään, ja vertailu on
     taulukon tehtävä. Tyhjä taulukko on merkitty aukko eikä tyhjä tila —
     kohde ilman taloja on puuttuva tieto, ei tyhjä kohde. */
  var TALOT_SARAKKEET = ['Koko', 'Pinta-ala', 'Hinta', 'Tila', 'Pohja'];

  function renderKohteenTalot(kohde) {
    var host = $('[data-kohde-talot]');
    if (!host) return;
    host.textContent = '';

    var caption = document.createElement('caption');
    caption.className = 'visually-hidden';
    caption.textContent = sana('Kohteen talot: koko, pinta-ala, hinta ja tila');
    host.appendChild(caption);

    var thead = document.createElement('thead');
    var hrow = document.createElement('tr');
    TALOT_SARAKKEET.forEach(function (otsikko) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.textContent = sana(otsikko);
      hrow.appendChild(th);
    });
    thead.appendChild(hrow);
    host.appendChild(thead);

    var tbody = document.createElement('tbody');
    var talot = (kohde && kohde.talot) || [];
    var huomio = $('[data-kohde-talot-huomio]');

    if (!talot.length) {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.colSpan = TALOT_SARAKKEET.length;
      td.appendChild(aukko('talokohtaiset tiedot puuttuvat'));
      tr.appendChild(td);
      tbody.appendChild(tr);
      host.appendChild(tbody);
      if (huomio) {
        huomio.textContent = sana('Talokohtaisia tietoja ei ole vielä. ' +
          'Rakenne on olemassa, sisältö ei.');
      }
      return;
    }

    talot.forEach(function (talo) {
      var tr = document.createElement('tr');
      tr.setAttribute('data-tila', talo.tila || '');

      var koko = document.createElement('th');
      koko.scope = 'row';
      koko.appendChild(kokoRajaTeksti(talo.koko));
      tr.appendChild(koko);

      [[talo.neliot, 'm²'], [talo.hinta, 'XXX XXX €']].forEach(function (pari) {
        var td = document.createElement('td');
        td.appendChild(arvoTaiAukko(pari[0], pari[1]));
        tr.appendChild(td);
      });

      var tila = document.createElement('td');
      var merkki = document.createElement('span');
      merkki.className = 'talo-tila';
      merkki.textContent = sana(talo.tila === 'varattu' ? 'Varattu'
                              : talo.tila === 'myyty'   ? 'Myyty'
                              : 'Vapaa');
      tila.appendChild(merkki);
      tr.appendChild(tila);

      var pohja = document.createElement('td');
      pohja.appendChild(aukko('pohjapiirustus'));
      tr.appendChild(pohja);

      tbody.appendChild(tr);
    });

    host.appendChild(tbody);
    if (huomio) huomio.textContent = '';
  }

  /* Aikajana. Vaiheiden tunnukset ovat samat kuin datan status-arvot, jotta
     merkintä ja aikajana eivät voi kertoa eri tarinaa. */
  function renderAikajana(kohde) {
    var host = $('[data-kohde-aikajana]');
    if (!host) return;

    var jarjestys = ['ennakkomarkkinointi', 'myynti', 'valmis'];
    var nyt = kohde.status === 'myyty' ? 'valmis' : kohde.status;
    var i = jarjestys.indexOf(nyt);

    /* Valmistuminen on eri akseli kuin status: kohde voi olla myynnissä ja
       valmis yhtä aikaa, ja juuri se yhdistelmä on paras myyntiargumentti
       ("muuttovalmis nyt"). Ilman tätä aikajana väittäisi valmistumista
       tulevaksi silloin kun se on jo tapahtunut. */
    var aika = (typeof kohdeValmistumisAika === 'function')
      ? kohdeValmistumisAika(kohde.valmistuminen) : null;
    var valmisOhi = kohde.status === 'myyty' || !!(aika && aika.mennyt);

    $$('li', host).forEach(function (li) {
      var vaihe = li.getAttribute('data-vaihe');
      var j = jarjestys.indexOf(vaihe);
      var tila = j < i ? 'ohi' : j === i ? 'nyt' : 'tulossa';
      if (vaihe === 'valmis' && valmisOhi && tila !== 'nyt') tila = 'ohi';
      li.setAttribute('data-tila', tila);
    });
  }

  /* == 05 Tonttitarkistuslista ============================================ */

  /* Kuusi valintaruutua, kolme tulostasoa, eikä yksikään torju kävijää.
     Kriteerit ovat vahvistamattomia ehdotuksia — merkitty sekä
     käyttöliittymässä että jokaisessa tuloksessa. */
  function initChecklist() {
    var host = $('[data-checklist]');
    var out = $('[data-checklist-result]');
    if (!host || !out) return;
    if (typeof TONTTIKRITEERIT === 'undefined') return;

    /* Kuusi toisiinsa liittyvää valintaruutua kuuluu fieldsettiin, jolla on
       legend. Ilman sitä ruudunlukija lukee kuusi irrallista valintaa ilman
       tietoa siitä mihin kysymykseen ne vastaavat. Visuaalinen ulkoasu ei
       muutu: fieldsetin oma kehys ja marginaalit nollataan CSS:ssä. */
    var fs = document.createElement('fieldset');
    fs.className = 'checklist-fs';

    var lg = document.createElement('legend');
    lg.className = 'checklist-fs__legend';
    /* Sama lause on etusivun ja talo-sivun linkkinä (yhteinen.ctaTarkistaTontti),
       joten se luetaan copysta eikä kirjoiteta tänne toista kertaa. */
    var lgCopy = copyArvo('yhteinen.ctaTarkistaTontti');
    lg.textContent = (lgCopy.loytyi && lgCopy.arvo) ? lgCopy.arvo
                                                    : sana('Tarkista sopiiko tonttisi');
    fs.appendChild(lg);

    var ul = document.createElement('ul');
    ul.className = 'checklist';

    TONTTIKRITEERIT.forEach(function (k, i) {
      var li = document.createElement('li');
      var label = document.createElement('label');

      var input = document.createElement('input');
      input.type = 'checkbox';
      input.name = k.tunnus;
      label.appendChild(input);

      var wrap = document.createElement('span');
      wrap.className = 'checklist__text';

      var t = document.createElement('span');
      t.className = 'checklist__t';
      t.textContent = (i + 1) + '. ' + sana(k.otsikko);
      wrap.appendChild(t);

      var h = document.createElement('span');
      h.className = 'checklist__h';
      h.appendChild(document.createTextNode(sana(k.apu)));
      if (k.aukko) {
        /* Aukko jatkaa apulausetta, ei ole erillinen etiketti: apu päättyy
           sanaan "vähintään" ja aukko on sen puuttuva luku. */
        h.appendChild(document.createTextNode(' '));
        h.appendChild(aukko(k.aukko));
        h.appendChild(document.createTextNode('.'));
      }
      wrap.appendChild(h);

      label.appendChild(wrap);
      li.appendChild(label);
      ul.appendChild(li);
    });

    fs.appendChild(ul);
    host.appendChild(fs);

    var boxes = $$('input[type="checkbox"]', ul);

    function render() {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      var r = n >= TONTTIKYNNYS.high ? TONTTITULOKSET.high
            : n >= TONTTIKYNNYS.mid  ? TONTTITULOKSET.mid
            :                          TONTTITULOKSET.low;

      /* Pisteluku ja varaus ovat sivuston omia lauseita, joten ne tulevat
         copysta. Tuloksen otsikko, teksti ja CTA ovat datan arvoja
         (tonttikriteerit.js) ja kulkevat sanakirjan läpi. */
      var pisteet = copyArvo('omaTontti.tulosPisteet');
      var varaus  = copyArvo('omaTontti.tulosVarausHtml');
      out.setAttribute('data-level', r.taso);
      /* COPY-POLKU MERKITÄÄN MYÖS JS:STÄ RENDERÖITYYN. Ilman merkintää
         copy-editori ei näe näitä lauseita sivulla: se etsii polkuja
         attribuuteista. data-copy-html kelpaa varauslauseelle, joka on
         kokonainen lause. Pisteluku sen sijaan on kaava ({n} / {kaikki}),
         jonka renderCopy ylikirjoittaisi laskurin päälle — sille on
         data-copy-lahde, joka kertoo lähteen mutta ei renderöi. */
      out.innerHTML =
        '<p class="result__score" data-copy-lahde="omaTontti.tulosPisteet">' +
        ((pisteet.loytyi && pisteet.arvo) ? pisteet.arvo : '{n} / {kaikki}')
          .replace('{n}', String(n)).replace('{kaikki}', String(boxes.length)) +
        '</p>' +
        '<h3>' + sana(r.otsikko) + '</h3>' +
        '<p>' + sana(r.teksti) + '</p>' +
        '<p class="small" data-copy-html="omaTontti.tulosVarausHtml">' +
        ((varaus.loytyi && varaus.arvo) ? varaus.arvo : '') + '</p>' +
        '<p><a class="btn btn--primary" href="yhteystiedot.html" ' +
        'data-event="taso3_yhteydenotto_tulos" data-tulostaso="' + r.taso + '">' +
        sana(r.cta) + '</a></p>';
      return r.taso;
    }

    /* taso2_tarkistuslista_valmis — lokitetaan kertaalleen jokaisesta
       saavutetusta tulostasosta, ei jokaisesta rastista.

       Miksi näin: rastikohtainen tapahtuma (proto_tonttilista_muutos) on
       kehittäjän diagnostiikkaa ja tuottaisi analytiikassa kuutta
       tapahtumaa yhdestä käyttäjästä. Tulostaso on se mikä myyntiä
       kiinnostaa, ja jos kävijä kulkee low → mid → high, jokainen taso on
       oma signaalinsa. Tämä on niistä tapahtumista joka tuottaa dataa myös
       kuukausina joina konversioita on nolla tai yksi. */
    var tasotNahty = {};

    function lokitaTaso(taso, merkittyja) {
      if (tasotNahty[taso]) return;
      tasotNahty[taso] = true;
      log('taso2_tarkistuslista_valmis', {
        tulostaso: taso,
        merkittyja: merkittyja,
        kohtia: boxes.length,
        sivu: location.pathname.split('/').pop() || 'oma-tontti.html'
      });
    }

    boxes.forEach(function (b) {
      b.addEventListener('change', function () {
        var taso = render();
        var merkittyja = boxes.filter(function (x) { return x.checked; }).length;
        log('proto_tonttilista_muutos', {
          kohta: b.name,
          merkitty: b.checked,
          tulostaso: taso
        });
        /* Nollasta ei lokiteta: koskematon lista on aina "low" eikä se ole
           käyttäjän vastaus vaan sivun lähtötila. */
        if (merkittyja > 0) lokitaTaso(taso, merkittyja);

        /* Tulostaso talteen, jotta yhteydenoton yhteydessä tiedetään että
           lomake kantaa tonttitietoja. Ks. initLomake. */
        store.set('luotokoti:tonttitulos', taso);
      });
    });

    render();
  }

  /* == 06 Lomake ja kiitos-tila =========================================== */

  /* Lomaketta ei lähetetä mihinkään. Kiitos-tila on olemassa jotta
     konversion loppu on nähtävissä workshopissa ja mittarointi voidaan
     todentaa ennen kuin backend on olemassa. */
  /* Esitäyttö osoiteparametrilla. Yksi lomake, useita sisääntuloja:

       ?polku=alue                      aluekysely     → "en tiedä vielä"
       ?polku=paketti&kohde=kohde-1     kohteen sivu   → polku + piilokenttä
       ?polku=oma-tontti                talo, tontti   → polku

     Parametrit luetaan samalla apufunktiolla kuin kohde.html — funktio on
     kirjoitettu kerran osiossa 04.

     Tuntematon polkuarvo ei muuta mitään: oletus on "en tiedä vielä", ja se
     on turvallisin lähtötila. */
  var POLKU_ARVOT = { alue: 1, paketti: 1, 'oma-tontti': 1 };

  function initLomakkeenEsitaytto() {
    var form = $('[data-lomake]');
    if (!form) return;

    var polku = haeParametri('polku');
    if (polku && POLKU_ARVOT[polku]) {
      var radio = $('[data-polku="' + polku + '"]', form);
      if (radio) radio.checked = true;
    }

    var kohde = haeParametri('kohde');
    var piilo = $('[data-lomake-kohde]', form);
    if (kohde && piilo) piilo.value = kohde;

    /* Kohteesta tullut kävijä näkee mistä kohteesta on kysymys. Piilokenttä
       yksin ei riitä: jos lomake ei kerro sitä ääneen, kävijä ei tiedä
       lähteekö tieto mukaan. */
    var nakyva = $('[data-lomake-kohde-nakyva]', form);
    if (nakyva) {
      nakyva.hidden = !kohde;
      var arvo = $('[data-lomake-kohde-arvo]', nakyva);
      if (arvo && kohde) {
        var k = (typeof kohdeTunnuksella === 'function') ? kohdeTunnuksella(kohde) : null;
        arvo.textContent = '';
        arvo.appendChild(arvoTaiAukko(k && k.nimi, 'kohteen nimi'));
      }
    }

    log('proto_lomake_esitaytto', { polku: polku, kohde: kohde });
  }

  function initLomake() {
    var form = $('[data-lomake]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      document.body.setAttribute('data-lomake', 'lahetetty');

      /* Polku ja kohde mukaan tapahtumaan. Ilman polkua liidejä ei voi
         erotella, ja juuri erottelu on lomakkeen uusi tehtävä (R9). */
      var valittuPolku = $('input[name="polku"]:checked', form);
      var kohdeKentta = $('[data-lomake-kohde]', form);
      log('taso3_yhteydenotto_lahetetty', {
        polku: valittuPolku ? valittuPolku.value : null,
        kohde: kohdeKentta && kohdeKentta.value ? kohdeKentta.value : null,
        huom: 'prototyyppi — ei lähetystä'
      });

      /* taso3_tonttitiedot_lahetys — sama lähetys, mutta eri tapahtuma kun
         kävijä on täyttänyt tonttitarkistuslistan tässä istunnossa. Silloin
         yhteydenotto kantaa tonttitietoja eikä ole pelkkä kysely, ja myynti
         voi erotella nämä liidit.

         VAHVISTETTAVA: prototyypissä tulostaso kulkee sessionStoragessa,
         mutta itse vastaukset eivät kulje lomakkeeseen. Jos ne kulkisivat,
         myyjä tietäisi heti mistä keskustellaan — ks. oma-tontti.html
         sektion 02 muistiinpano. */
      var tonttitulos = store.get('luotokoti:tonttitulos');
      if (tonttitulos) {
        log('taso3_tonttitiedot_lahetys', {
          tulostaso: tonttitulos,
          huom: 'prototyyppi — vastaukset eivät kulje lomakkeeseen'
        });
      }

      var otsikko = $('.kiitos h2, .kiitos h3');
      if (otsikko) { otsikko.setAttribute('tabindex', '-1'); otsikko.focus(); }
    });

    var uusi = $('[data-lomake-alusta]');
    if (uusi) {
      uusi.addEventListener('click', function () {
        document.body.removeAttribute('data-lomake');
        form.reset();
        log('proto_lomake_alustettu');
      });
    }
  }

  /* == 06b Lomakkeen kokovalinnat ========================================= */

  /* Kokojen nimet tulevat kokoNimi()-funktiosta samasta säännöstä kuin
     kokovalitsin ja kokovertailu. Markupissa olevat arvot ovat vain
     lähtöarvoja: jos JS ei aja, valikko on silti käyttökelpoinen.

     Arvo (mh2/mh3/mh4) pysyy ennallaan — vain nimike vaihtuu. */
  function initKokoValinnat() {
    var valikko = $('[data-koko-valinnat]');
    if (!valikko || typeof TALO === 'undefined' || !TALO || !TALO.koot) return;
    TALO.koot.forEach(function (koko) {
      var opt = $('option[value="' + koko.tunnus + '"]', valikko);
      if (opt && typeof kokoNimi === 'function') {
        opt.textContent = kokoNimi(koko.makuuhuoneita);
      }
    });
  }

  /* == 06d Markupin aukkojen kieli ========================================
     Aukot syntyvät kolmella tavalla: JS luo ne aukko()-funktiolla (käännetty
     jo silloin), placeholder-tila korvaa ne arvolla (käännetty
     initPlaceholderissa), tai ne ovat markupissa kirjoitettuina
     <span class="gap">[selite]</span>. Kolmas ryhmä on tämä funktio.

     AJOJÄRJESTYS ON PAKOTETTU: tämä ajetaan initPlaceholderin JÄLKEEN,
     koska placeholder etsii arvon aukon SUOMENKIELISELLÄ selitteellä
     (PLACEHOLDER.arvot). Jos selite käännettäisiin ensin, jokainen
     kuvitteellinen arvo jäisi löytymättä. */
  function kaannaAukot() {
    if (kieli() === 'fi') return;

    $$('.gap').forEach(function (el) {
      /* Muistiinpanot ovat työryhmän kerros eivätkä käänny. */
      if (el.closest('.note')) return;
      /* JS:n luoma tai placeholderin korvaama — käännetty jo. */
      if (el.getAttribute('data-aukko-lahde') === 'js') return;
      if (el.classList.contains('gap--demo') ||
          el.classList.contains('gap--demo-lohko')) return;

      /* Lohkotason aukossa (.gap--block) on selitteen lisäksi oma
         perustelunsa omana elementtinä, joten koko sisältöä ei voi korvata.
         Käännetään vain ensimmäinen tekstisolmu, joka on itse selite. */
      if (el.classList.contains('gap--block')) {
        var eka = el.firstChild;
        while (eka && eka.nodeType !== 3) eka = eka.nextSibling;
        if (!eka) return;
        var lohkoTeksti = eka.nodeValue.replace(/\s+/g, ' ').trim();
        var lohkoOsuma = /^\[(.+)\]$/.exec(lohkoTeksti);
        if (!lohkoOsuma) return;
        var lohkoKaannos = sana(lohkoOsuma[1]);
        if (lohkoKaannos !== lohkoOsuma[1]) {
          eka.nodeValue = '[' + lohkoKaannos + ']';
        }
        return;
      }

      var teksti = (el.textContent || '').replace(/\s+/g, ' ').trim();
      var osuma = /^\[(.+)\]$/.exec(teksti);
      if (!osuma) return;
      var kaannos = sana(osuma[1]);
      if (kaannos !== osuma[1]) el.textContent = '[' + kaannos + ']';
    });
  }

  /* == 06c Kuvapaikkojen kieli ============================================= */

  /* KUVAPAIKAT EIVÄT OLE COPYA. Ne ovat prototyypin oma kerros: harmaa
     laatikko, joka kertoo mikä kuva paikasta puuttuu. Siksi niiden tekstit
     ovat markupissa eivätkä copy-data.js:ssä (poikkeus on muutama selite,
     joka toistuu monella sivulla — ne ovat copyssa ja tämä funktio jättää
     ne rauhaan).

     Mutta ne NÄKYVÄT sivulla, ja ruotsinkielisellä sivulla suomenkielinen
     harmaa laatikko on yhtä väärin kuin suomenkielinen otsikko. Käännös
     tulee sanakirjasta, joten markupia ei tarvitse muuttaa: sama selite
     ("Kuvapaikka") esiintyy kolmellakymmenellä paikalla ja käännetään
     kertaalleen.

     aria-label kootaan käännetyistä osista eikä käännetä erikseen. Se on
     kuvapaikan saavutettava nimi, ja sen sisältö on sama kuin näkyvän
     laatikon: kolmekymmentä pitkää lausetta sanakirjassa olisi
     kolmekymmentä lausetta jotka kertovat sen minkä laatikko jo sanoo. */
  function initKuvapaikat() {
    if (kieli() === 'fi') return;

    $$('.ph').forEach(function (ph) {
      var osat = [];
      ['.ph__tag', '.ph__what', '.ph__meta'].forEach(function (valitsin) {
        var el = $(valitsin, ph);
        if (!el) return;
        /* Copysta tuleva selite on jo käännetty — älä koske siihen. */
        if (!el.hasAttribute('data-copy') && !el.hasAttribute('data-copy-html')) {
          var teksti = el.textContent.replace(/\s+/g, ' ').trim();
          if (teksti) el.textContent = sana(teksti);
        }
        if (el.textContent) osat.push(el.textContent.trim());
      });

      /* Saavutettava nimi vain jos se oli olemassa: kuvatilassa (valokuva
         paikallaan) role ja label poistetaan talo.js:ssä, eikä niitä
         palauteta täällä. */
      if (ph.hasAttribute('aria-label') && osat.length) {
        ph.setAttribute('aria-label', osat.join('. ') + '.');
      }
    });
  }

  /* == 07 Kielenvaihtaja ================================================== */

  /* OLI RAKENNE-ELEMENTTI, ON NYT TOIMINNALLINEN (20.8.2026). Vaihdin näytti
     aiemmin viestin siitä ettei ruotsinkielinen sisältö kuulu prototyypin
     laajuuteen; AVOIMET.md kohta 36 avattiin uudelleen ja SV on nyt oikea
     kieliversio. Viestin copy (proto.kieliviesti) ja .lang__msg-markup
     poistettiin samalla — vanhentunut ohje on pahempi kuin ei ohjetta.

     Vaihdin on LINKKI eikä painike, ja se on tarkoituksellista:
       · kieli on osoitteessa (?lang=sv), joten sivu on jaettavissa
       · linkki avautuu uuteen välilehteen selaimen omilla eleillä
       · vaihto on sivunlataus, koska copy ja datan tekstit renderöidään
         kertaalleen latauksessa — puolittainen vaihto ei ole vaihto

     Muut parametrit säilyvät, joten kohde.html?kohde=kohde-2 pysyy samassa
     kohteessa kieltä vaihdettaessa. */

  function osoiteKielella(arvo) {
    var haku = String(window.location.search || '').replace(/^\?/, '');
    var osat = haku ? haku.split('&') : [];
    var ulos = [];
    for (var i = 0; i < osat.length; i++) {
      if (osat[i] && !/^lang=/.test(osat[i])) ulos.push(osat[i]);
    }
    ulos.push('lang=' + arvo);
    /* Tiedostonimi mukaan: prototyyppi avataan myös tuplaklikkaamalla, ja
       file://-osoitteessa pelkkä "?lang=sv" on eri sivu kuin hakemisto. */
    var tiedosto = window.location.pathname.split('/').pop() || 'index.html';
    return tiedosto + '?' + ulos.join('&');
  }

  function initLang() {
    var linkit = $$('[data-kieli-linkki]');
    if (!linkit.length) return;
    var nyt = kieli();

    linkit.forEach(function (a) {
      var arvo = a.getAttribute('data-kieli-linkki');
      a.setAttribute('href', osoiteKielella(arvo));
      if (arvo === nyt) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
        a.addEventListener('click', function () { log('proto_kieli_' + arvo); });
      }
    });
  }

  /* == 08 Kelluva CTA-palkki — POISTETTU v5c ============================== */

  /* Minipalkki poistettiin koko sivustolta 20.8.2026 (asiakkaan päätös).
     Numero jää tyhjäksi, jotta poisto näkyy poistona eikä unohduksena.
     Palkki peitti mobiilissa sisältöä 60 pikselin korkeudelta ja toisti
     CTA:ta jonka joka toinen sektio jo esittää. Jos se palautetaan,
     päätöksen on auettava uudelleen — ks. AVOIMET.md kohta 140.
     Poistettu samalla: .minibar-tyylit (styles.css), markup viideltä
     sivulta ja tapahtuma taso3_yhteydenotto_minibar. */

  /* == 09 Sisääntuloliike ================================================= */

  /* Piilotus on kytketty html.js-reveal -luokkaan, jonka tämä funktio
     lisää. Ilman sitä koko sivusto olisi näkymätön aina kun JS ei aja
     animaatiota. Lisäksi varmistusajastin: IntersectionObserver ei laukea
     kaikissa ympäristöissä, eikä sisältöä saa koskaan jäädä piiloon. */
  function initReveal() {
    var reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var blocks = [];
    $$('main > section').forEach(function (section) {
      var wrap = $('.wrap', section) || section;
      Array.prototype.slice.call(wrap.children).forEach(function (child) {
        if (child.classList.contains('note')) return;
        blocks.push(child);
      });
    });
    if (!blocks.length) return;

    blocks.forEach(function (el) { el.setAttribute('data-reveal', ''); });
    document.documentElement.classList.add('js-reveal');

    function revealAll() {
      blocks.forEach(function (el) { el.setAttribute('data-reveal', 'in'); });
    }
    var failsafe = window.setTimeout(revealAll, 900);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentNode.children)
          .filter(function (n) { return n.hasAttribute('data-reveal'); });
        el.style.setProperty('--reveal-delay',
          Math.min(siblings.indexOf(el), 4) * 70 + 'ms');
        el.setAttribute('data-reveal', 'in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

    blocks.forEach(function (el) { io.observe(el); });

    requestAnimationFrame(function () {
      var anyVisible = false;
      blocks.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.setAttribute('data-reveal', 'in');
          io.unobserve(el);
          anyVisible = true;
        }
      });
      if (anyVisible) { window.clearTimeout(failsafe); window.setTimeout(revealAll, 2500); }
    });
  }

  /* == 10 Mittarointi ===================================================== */

  /* Prototyypissä ei ole analytiikkaa, mutta rakenne on valmis. Jokainen CTA
     on merkitty data-event -attribuutilla mikrokonversioportaikon mukaan
     (taso1_ kiinnostus · taso2_ harkinta · taso3_ sitoutuminen).
     Konsolilokitus todentaa että suunnitelma kattaa kaiken ennen GTM:ää. */
  function initTracking() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest ? e.target.closest('[data-event]') : null;
      if (!el) return;
      var tiedot = {
        teksti: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
        kohde: el.getAttribute('href') || null,
        sivu: location.pathname.split('/').pop() || 'index.html'
      };
      /* Parametrit jotka brief vaatii mukaan tapahtumaan */
      if (el.hasAttribute('data-tulostaso')) tiedot.tulostaso = el.getAttribute('data-tulostaso');
      if (el.hasAttribute('data-tonttitunnus')) tiedot.tontti = el.getAttribute('data-tonttitunnus');
      if (typeof ASETUKSET !== 'undefined') {
        tiedot.omistusmalli = ASETUKSET.hae('omistusmalli');
      }
      log(el.getAttribute('data-event'), tiedot);
    });

    var events = $$('[data-event]');
    var missing = $$('a.btn, a.link-arrow, a.path-card, a.alue').filter(function (a) {
      return !a.hasAttribute('data-event');
    });
    log('mittarointi: ' + events.length + ' merkittyä tapahtumaa tällä sivulla');
    if (missing.length) {
      console.warn('[luotokoti-proto] merkitsemättömiä CTA:ita: ' + missing.length, missing);
    }
  }

  /* Scroll-syvyys. Brief vaatii sen Talo-sivulla; mitataan siellä missä
     sivu on merkitty data-scroll-syvyys -attribuutilla. */
  function initScrollDepth() {
    if (!document.body.hasAttribute('data-scroll-syvyys')) return;
    var rajat = [25, 50, 75, 100];
    var nahty = {};

    function mittaa() {
      var doc = document.documentElement;
      var matka = doc.scrollHeight - window.innerHeight;
      if (matka <= 0) return;
      var pros = Math.min(100, Math.round((window.scrollY / matka) * 100));
      rajat.forEach(function (raja) {
        if (pros >= raja && !nahty[raja]) {
          nahty[raja] = true;
          log('scroll_syvyys_' + raja, { sivu: location.pathname.split('/').pop() });
        }
      });
    }
    mittaa();
    window.addEventListener('scroll', mittaa, { passive: true });
  }

  /* == Käynnistys ========================================================= */

  function init() {
    /* JÄRJESTYS ON MITATTU, EI OLETETTU (T-11, korjattu 20.8.2026).

       talo.js EI ole pelkkä datan täyttäjä: vertailuRivi() luo uusia
       <th data-copy="...">-elementtejä. Ne eivät ole olemassa ennen kuin
       taloRender() on ajettu, joten renderCopy() ei voi täyttää niitä jos
       se ajetaan ensin.

       Aiemmin talo.js käynnisti itsensä omalla DOMContentLoaded-
       kuuntelijallaan, ja koska se ladataan ennen proto.js:ää, järjestys
       osui vahingossa oikein. Kutsu on nyt tässä eikä siellä, jotta
       järjestys on luettavissa yhdestä paikasta — mutta se on SAMA
       järjestys kuin ennen, ei uusi.

       Kun tämä käännettiin hetkeksi toisin päin, seuraus oli mitattavissa:
       kolme tyhjää rivinimikettä kokovertailutaulukossa neljällä sivulla.
       Älä siirrä renderCopy():ta tämän edelle.

       typeof-vahti, koska talo.js ei ole kaikilla sivuilla — sama kuvio
       kuin TONTTIKRITEERIT- ja kohdeTunnuksella-tarkistuksissa. */
    if (typeof window.taloRender === 'function') window.taloRender();
    renderCopy();
    initNotes();
    initNav();
    initAsetukset();
    initKohteet();
    initKohde();
    initTaloKohteet();
    initKartta();
    initChecklist();
    /* Placeholder viimeisenä datan jälkeen: initKohteet, initKohde ja
       initChecklist luovat uusia .gap-elementtejä, ja nekin pitää korvata. */
    initPlaceholder();
    initKokoValinnat();
    /* Kuvapaikat käännetään placeholderin jälkeen: placeholder-tila voi
       vaihtaa kuvapaikan sisällön valokuvaksi, ja käännös koskee vain
       niitä paikkoja jotka jäävät laatikoksi. */
    initKuvapaikat();
    kaannaAukot();
    initLomakkeenEsitaytto();
    initLomake();
    initLang();
    initReveal();
    initTracking();
    initScrollDepth();

    /* Kääntämättömät datan arvot yhtenä listana konsoliin. Ajetaan
       viimeisenä, jotta kaikki renderöijät ovat ehtineet kysyä sanansa. */
    if (typeof ASETUKSET !== 'undefined' && ASETUKSET.kieliRaportti) {
      ASETUKSET.kieliRaportti();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
