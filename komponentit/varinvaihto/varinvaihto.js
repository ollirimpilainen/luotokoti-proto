/* ==========================================================================
   Luotokoti — julkisivun värinvaihto (itsenäinen komponentti, haara
   `varinvaihto`)

   EI VIELÄ OSA PROTOTYYPPIÄ. Komponentti iteroidaan tässä kansiossa ja
   liitetään talo.html:n heroon vasta kun siirtymätapa on päätetty. Siksi:

     · kävijälle näkyvät tekstit ovat alla TEKSTIT-oliossa eivätkä
       copy-data.js:ssä. Liitettäessä ne siirtyvät avaimiin `talo.vari*`
       molempiin kielitiedostoihin (AGENTS.md, sääntö 2).
     · talon data luetaan sieltä missä se jo on: värien kuvaukset ja
       nimet TALO.julkisivut-listasta, alt-tekstit ja Havainnekuva-merkintä
       KUVAT-oliosta. Komponentti ei kahdenna niitä.

   DEMO ON KAKSI VÄRIÄ (29.9.2026): pihan puolen musta ja punainen, jotka
   ovat sama kohtaus samasta kamerasta. Vaalea puuttuu, koska siitä on kuva
   vain sisäänkäynnin puolelta, eikä sitä voi vaihtaa samaan kuvaan.
   Arkkitehdiltä tulee lisää kuvia; uusi väri on yksi rivi VARIKUVAT-
   listaan ja yksi ajo valmistele.py:lle. Käyttöliittymä on tehty N:lle
   värille, ei kahdelle — kahden värin kytkin olisi pitänyt purkaa heti
   kun kolmas tulee.

   MITEN VAIHTO TOIMII. Kaksi kuvakerrosta päällekkäin. Uusi väri ladataan
   ylempään, ja kun se on piirrettävissä, ylempi paljastetaan valitulla
   siirtymällä. Lopuksi kerrokset vaihtavat roolia — kuvaa ei ladata
   uudelleen alempaan, joten loppuun ei tule välähdystä.

   SIIRTYMÄ on data-attribuutti: `data-siirtyma` = hayvytys · pyyhkaisy ·
   paljastus · vertailu. Liike on CSS:ssä; JS antaa suunnan, lähtöpisteen
   ja keston (--vv-kesto), jolla myös näytteen edistymisviiva kulkee.

   ES5 ja IIFE kuten muu prototyyppi.
   ========================================================================== */

(function () {
  'use strict';

  /* -- Tekstit ---------------------------------------------------------
     Siirtyvät copy-data.js:ään liitettäessä.                           */
  var TEKSTIT = {
    variOtsikko:  'Julkisivun väri',
    vertailuOhje: 'Vedä vertaillaksesi',
    vertailuNimi: 'Vertailun jakokohta',
    nimiAukko:    'Värin nimi'
  };

  /* -- Värit joista on kuva samasta kamerasta ---------------------------
     Järjestys tulee TALO.julkisivut-listasta; tämä lista kertoo vain
     mistä väristä on linjattu kuva. `kuva` on KUVAT-olion avain: sieltä
     tulevat alt ja Havainnekuva-merkintä. `pohja` on näytteen väri ennen
     kuin näytekuva on latautunut (valmistele.py mittaa sen).            */
  var VARIKUVAT = {
    musta:    { tiedosto: 'kuvat/piha-musta',    kuva: 'piha-musta',
                nayte: 'kuvat/nayte-musta.webp',    pohja: '#242423' },
    punainen: { tiedosto: 'kuvat/piha-punainen', kuva: 'piha-punainen',
                nayte: 'kuvat/nayte-punainen.webp', pohja: '#752d26' }
  };

  var KESTO = { hayvytys: 700, pyyhkaisy: 1150, paljastus: 950, hiljainen: 160 };

  /* -- Apurit ----------------------------------------------------------- */

  function el(tagi, luokka, attr) {
    var e = document.createElement(tagi);
    if (luokka) e.className = luokka;
    if (attr) for (var k in attr) e.setAttribute(k, attr[k]);
    return e;
  }

  function vahentaaLiiketta() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function suojaa(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function aukko(t) { return '<span class="gap">[' + suojaa(t) + ']</span>'; }

  function isoAlku(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }

  /* Kuvaus on datassa yksi lause: 'Musta puujulkisivu, vihreä
     konesaumakatto'. Julkisivu ja katto ovat sen kaksi osaa pilkulla
     erotettuna. Jos muoto on toinen, lause näytetään kokonaisena
     julkisivun rivillä eikä kattoa arvata. Liitettäessä datan kannattaa
     saada omat kentät (TALO.julkisivut[].seina / .katto). */
  function osat(kuvaus) {
    var p = (kuvaus || '').split(/,\s*/);
    if (p.length === 2) return { seina: isoAlku(p[0]), katto: isoAlku(p[1]) };
    return { seina: kuvaus || null, katto: null };
  }

  function varit() {
    var lista = (typeof TALO !== 'undefined' && TALO.julkisivut &&
                 TALO.julkisivut.varit) || [];
    if (!lista.length) console.warn('[Värinvaihto] TALO.julkisivut puuttuu');
    return lista.filter(function (v) { return VARIKUVAT[v.tunnus]; });
  }

  /* Tiedostopolku tai sen upotettu vastine. Koostettu artifact
     (artifact.py) antaa kuvat data-osoitteina VARINVAIHTO_TIEDOSTOT-
     oliossa, koska artifactin CSP estää kuvien lataamisen. Artifactissa on
     vain 1600 px:n kuvat, joten 800 px:n polku osuu niihin. Lab-sivulla
     oliota ei ole ja polku palautuu sellaisenaan. */
  function polku(p) {
    var t = window.VARINVAIHTO_TIEDOSTOT;
    return (t && (t[p] || t[p.replace('-800', '')])) || p;
  }

  function kaksinumeroinen(n) { return (n < 10 ? '0' : '') + n; }

  /* Odottaa että kuva on piirrettävissä. KILPAILU, EI PELKKÄ decode():
     decode jää ratkeamatta kun sivu ei ole näkyvissä (taustavälilehti,
     piilotettu kehys), ja silloin siirtymä ei käynnistyisi koskaan eikä
     kerroksia vaihdettaisi — valittu väri ja kuva eriytyisivät. Sama ansa
     kuin copy-editorin rAF-riippuvuudessa (AGENTS.md). */
  function puretaan(img) {
    return new Promise(function (valmis) {
      var tehty = false;
      function f() { if (!tehty) { tehty = true; valmis(); } }
      if (img.decode) img.decode().then(f, f);
      if (img.complete && img.naturalWidth) setTimeout(f, 60);
      else {
        img.addEventListener('load', function () { setTimeout(f, 30); });
        img.addEventListener('error', f);
      }
      setTimeout(f, 1500);
    });
  }

  // Käynnistää CSS-animaation uudelleen: luokka pois, pakotettu asettelu,
  // luokka takaisin. Ei requestAnimationFramea (AGENTS.md).
  function uudelleen(e, luokka) {
    e.classList.remove(luokka);
    void e.offsetWidth;
    e.classList.add(luokka);
  }

  var KAPEA = window.matchMedia ? window.matchMedia('(max-width: 47.99rem)') : null;

  /* -- Komponentti ------------------------------------------------------ */

  function Varinvaihto(juuri) {
    this.juuri = juuri;
    this.varit = varit();
    this.vari = juuri.getAttribute('data-vari');
    if (!VARIKUVAT[this.vari]) this.vari = this.varit[0] && this.varit[0].tunnus;
    this.vuoro = 0;
    this.ajastin = null;
    this.rakenna();
    this.esilataa();
  }

  Varinvaihto.prototype.tiedosto = function (vari) {
    return polku(VARIKUVAT[vari].tiedosto + (this.koko === 'pieni' ? '-800' : '') + '.webp');
  };

  Varinvaihto.prototype.rakenna = function () {
    var j = this.juuri, self = this;

    // 800 px riittää kun kehys on alle 900 laitepikseliä (kuten
    // data-kuva-koko muualla sivustolla).
    this.koko = (j.clientWidth || 800) * (window.devicePixelRatio || 1) < 900
      ? 'pieni' : 'iso';

    j.innerHTML = '';
    j.classList.add('vv');

    /* Näyttämö. .ph-luokat tuovat kulmamerkit ja Havainnekuva-merkinnän
       paikan (styles.css §09, §53). */
    var kuva = this.kuvaEl = el('div', 'vv__kuva ph ph--photo', { 'data-ph-tila': 'kuva' });
    this.alla   = el('img', 'ph__kuva vv__kerros vv__kerros--alla');
    this.paalla = el('img', 'ph__kuva vv__kerros vv__kerros--paalla', { alt: '', 'aria-hidden': 'true' });
    kuva.appendChild(this.alla);
    kuva.appendChild(this.paalla);

    // Vertailun jakoviiva on range-kenttä: näppäimistö ja ruudunlukija
    // saavat sen ilmaiseksi, ja kahva on pelkkää tyyliä.
    this.jako = el('input', 'vv__jako', {
      type: 'range', min: '0', max: '100', value: '50', step: '1',
      'aria-label': TEKSTIT.vertailuNimi
    });
    this.jako.addEventListener('input', function () {
      j.style.setProperty('--vv-jako', self.jako.value + '%');
    });
    this.vertailuOhje = el('span', 'vv__jako-ohje');
    this.vertailuOhje.textContent = TEKSTIT.vertailuOhje;
    kuva.appendChild(this.jako);
    kuva.appendChild(this.vertailuOhje);

    this.lahde = el('figcaption', 'ph__lahde');
    kuva.appendChild(this.lahde);

    /* Ohjausnauha: ENSIN valitsin, sitten mikä väri on. Läheisyys:
       ohjaimen on oltava lähimpänä sitä mitä se muuttaa. Ensimmäisessä
       versiossa nimi ja kuvaus olivat kuvan ja laattojen välissä
       kapealla ruudulla, eli valitsin oli kauimpana kuvasta. Nimi on
       valinnan seuraus, joten se tulee valinnan jälkeen. Jako 5/7. */
    var nauha = this.nauha = el('div', 'vv__nauha');
    var tieto = this.tieto = el('div', 'vv__tieto', { 'aria-live': 'polite' });

    var varit = this.varitEl = el('fieldset', 'vv__varit');
    var leg = el('legend', 'vv__otsikko');
    leg.innerHTML = suojaa(TEKSTIT.variOtsikko) +
      ' <span class="vv__maara">' + kaksinumeroinen(this.varit.length) + '</span>';
    varit.appendChild(leg);

    var rivi = el('div', 'vv__laatat');
    var nimi = 'vv-vari-' + Math.random().toString(36).slice(2, 7);
    this.laatat = {};
    this.varit.forEach(function (v, i) {
      var k = VARIKUVAT[v.tunnus], o = osat(v.kuvaus);
      var lbl = el('label', 'vv__laatta');
      var inp = el('input', 'vv__radio', { type: 'radio', name: nimi, value: v.tunnus });
      var pinta = el('span', 'vv__pinta', { 'aria-hidden': 'true' });
      pinta.style.backgroundColor = k.pohja;
      pinta.style.backgroundImage = 'url("' + polku(k.nayte) + '")';
      var cap = el('span', 'vv__laatta-teksti');
      cap.innerHTML = '<span class="vv__nro">' + kaksinumeroinen(i + 1) + '</span>' +
        '<span class="vv__laatta-nimi">' + (v.nimi ? suojaa(v.nimi) : suojaa(o.seina || v.tunnus)) + '</span>';
      var viiva = el('span', 'vv__edistys', { 'aria-hidden': 'true' });
      lbl.appendChild(inp); lbl.appendChild(pinta); lbl.appendChild(cap); lbl.appendChild(viiva);
      inp.addEventListener('change', function () {
        if (inp.checked) self.valitse(v.tunnus, pinta);
      });
      rivi.appendChild(lbl);
      self.laatat[v.tunnus] = { lbl: lbl, inp: inp };
    });
    varit.appendChild(rivi);
    nauha.appendChild(varit);
    nauha.appendChild(tieto);

    j.appendChild(kuva);
    j.appendChild(nauha);

    this.asetaKuva(this.alla, this.vari);
    this.paivita(false);
    this.asetaSijoitus(j.getAttribute('data-sijoitus') || 'alla');
  };

  /* alla · kuvassa. Kuvassa-tilassa laatat ovat pystykiskona kuvan
     oikeassa reunassa; nimi ja pinnat jäävät nauhaan. Alle 48 rem:n
     ruudulla laatat ovat aina kuvan alla, koska kisko peittäisi talon. */
  Varinvaihto.prototype.asetaSijoitus = function (sij) {
    var self = this;
    this.sijoitus = sij;
    this.juuri.setAttribute('data-sijoitus', sij);
    var kuvaan = sij === 'kuvassa' && !(KAPEA && KAPEA.matches);
    this.juuri.setAttribute('data-laatat', kuvaan ? 'kuvassa' : 'alla');
    if (kuvaan) this.kuvaEl.appendChild(this.varitEl);
    else this.nauha.insertBefore(this.varitEl, this.tieto);
    if (KAPEA && !this.kuuntelee) {
      this.kuuntelee = true;
      var f = function () { self.asetaSijoitus(self.sijoitus); };
      if (KAPEA.addEventListener) KAPEA.addEventListener('change', f);
      else if (KAPEA.addListener) KAPEA.addListener(f);
    }
  };

  Varinvaihto.prototype.asetaKuva = function (img, vari) {
    var k = (typeof KUVAT !== 'undefined' && KUVAT[VARIKUVAT[vari].kuva]) || {};
    img.src = this.tiedosto(vari);
    img.alt = k.alt || '';
    // Sama sääntö kuin initKuvat: mallinnus on aina merkitty.
    this.lahde.textContent = k.lahde || 'Havainnekuva';
  };

  Varinvaihto.prototype.esilataa = function () {
    var self = this;
    this.varit.forEach(function (v) {
      var i = new Image(); i.src = self.tiedosto(v.tunnus);
    });
  };

  // Tieto-osa: järjestysnumero, nimi (tai aukko) ja kaksi pintaa.
  Varinvaihto.prototype.paivita = function (animoi) {
    var self = this, i = this.indeksi(this.vari);
    var v = this.varit[i] || {}, o = osat(v.kuvaus);

    Object.keys(this.laatat).forEach(function (t) {
      var l = self.laatat[t];
      l.inp.checked = (t === self.vari);
      l.lbl.classList.toggle('on-valittu', t === self.vari);
    });

    // Nimen paikalla on julkisivu niin kauan kuin nimi puuttuu, katto
    // sen alla, ja puuttuva nimi näkyy aukkona numeron vieressä. Iso rivi
    // ei saa olla aukko: se on heron toiseksi suurin teksti otsikon
    // jälkeen, ja hakasulje sen kokoisena lukisi virheenä eikä
    // merkintänä. Kun nimi tulee, se nousee isoksi ja kuvaus alle.
    var iso, ala;
    if (v.nimi) { iso = suojaa(v.nimi); ala = suojaa(v.kuvaus || ''); }
    else if (o.seina) { iso = suojaa(o.seina); ala = o.katto ? suojaa(o.katto) : ''; }
    else { iso = aukko(TEKSTIT.nimiAukko); ala = ''; }
    this.tieto.innerHTML =
      '<p class="vv__yla"><span class="vv__nro">' + kaksinumeroinen(i + 1) +
        ' / ' + kaksinumeroinen(this.varit.length) + '</span>' +
        (v.nimi ? '' : aukko(TEKSTIT.nimiAukko)) + '</p>' +
      '<p class="vv__nimi">' + iso + '</p>' +
      (ala ? '<p class="vv__ala">' + ala + '</p>' : '');
    if (animoi) uudelleen(this.tieto, 'vv__tieto--vaihtuu');
    this.juuri.setAttribute('data-vari', this.vari);
  };

  Varinvaihto.prototype.indeksi = function (t) {
    for (var i = 0; i < this.varit.length; i++) if (this.varit[i].tunnus === t) return i;
    return 0;
  };

  Varinvaihto.prototype.siirtyma = function () {
    return this.juuri.getAttribute('data-siirtyma') || 'hayvytys';
  };

  Varinvaihto.prototype.valitse = function (vari, lahtoEl) {
    if (vari === this.vari || !VARIKUVAT[vari]) return;
    var ed = this.vari;
    this.vari = vari;
    this.paivita(true);
    this.vaihda(this.siirtyma(), {
      suunta: this.indeksi(vari) > this.indeksi(ed) ? 1 : -1,
      lahto: lahtoEl
    });
  };

  /* Siirtymän ydin. Keskeytys: jos edellinen on kesken, se viedään heti
     loppuun, jotta nopea nuolinäppäimillä selaaminen ei jätä kerroksia
     sekaisin. */
  Varinvaihto.prototype.vaihda = function (tapa, opt) {
    var self = this, j = this.juuri, vuoro = ++this.vuoro;
    this.lopeta();

    if (vahentaaLiiketta() && tapa !== 'vertailu') tapa = 'hiljainen';

    this.asetaKuva(this.paalla, this.vari);

    // Vertailu ei animoi: ylempi kerros on uusi väri, alempi edellinen,
    // ja jakoviiva näyttää molemmat.
    if (tapa === 'vertailu') {
      j.style.setProperty('--vv-kesto', '0ms');
      puretaan(this.paalla).then(function () {
        if (vuoro !== self.vuoro) return;
        j.setAttribute('data-kaynnissa', 'vertailu');
        self.jako.value = 50;
        j.style.setProperty('--vv-jako', '50%');
      });
      return;
    }

    this.paalla.removeAttribute('aria-hidden');

    if (tapa === 'pyyhkaisy') {
      j.setAttribute('data-suunta', opt.suunta < 0 ? 'vasen' : 'oikea');
    }
    if (tapa === 'paljastus') {
      // Lähtöpiste on painetun näytteen kohta kuvan koordinaateissa,
      // rajattuna kuvaan. Väri valuu näytteestä taloon.
      var kr = this.kuvaEl.getBoundingClientRect();
      var x = kr.width / 2, y = kr.height;
      if (opt.lahto) {
        var lr = opt.lahto.getBoundingClientRect();
        x = Math.max(0, Math.min(kr.width, lr.left + lr.width / 2 - kr.left));
        y = Math.max(0, Math.min(kr.height, lr.top + lr.height / 2 - kr.top));
      }
      var r = Math.sqrt(Math.pow(Math.max(x, kr.width - x), 2) +
                        Math.pow(Math.max(y, kr.height - y), 2));
      j.style.setProperty('--vv-x', x + 'px');
      j.style.setProperty('--vv-y', y + 'px');
      j.style.setProperty('--vv-r', Math.ceil(r) + 'px');
    }

    var kesto = KESTO[tapa] || 700;
    j.style.setProperty('--vv-kesto', kesto + 'ms');

    puretaan(this.paalla).then(function () {
      if (vuoro !== self.vuoro) return;
      j.setAttribute('data-kaynnissa', tapa);
      // Ajastin eikä animationend: tapahtuma jää tulematta kehyksessä joka
      // ei komposoi, ja silloin kerrokset jäisivät vaihtamatta.
      self.ajastin = setTimeout(function () { self.valmis(); }, kesto + 40);
    });
  };

  // Vie kesken olevan siirtymän loppuun heti.
  Varinvaihto.prototype.lopeta = function () {
    if (this.ajastin) { clearTimeout(this.ajastin); this.ajastin = null; this.valmis(); }
    else if (this.juuri.getAttribute('data-kaynnissa') === 'vertailu') this.valmis();
  };

  // Roolien vaihto: ylempi kerros on nyt valmis kuva ja siirtyy alas.
  Varinvaihto.prototype.valmis = function () {
    this.ajastin = null;
    var a = this.alla, p = this.paalla;
    a.className = 'ph__kuva vv__kerros vv__kerros--paalla';
    p.className = 'ph__kuva vv__kerros vv__kerros--alla';
    a.setAttribute('aria-hidden', 'true'); a.alt = '';
    p.removeAttribute('aria-hidden');
    this.alla = p; this.paalla = a;
    this.juuri.removeAttribute('data-kaynnissa');
  };

  // Lab-sivun kytkin: siirtymätavan vaihto kesken käytön.
  Varinvaihto.prototype.asetaSiirtyma = function (tapa) {
    this.lopeta();
    this.juuri.setAttribute('data-siirtyma', tapa);
  };

  /* -- Käynnistys ------------------------------------------------------- */

  function init() {
    var solmut = document.querySelectorAll('[data-varinvaihto]');
    for (var i = 0; i < solmut.length; i++) solmut[i].varinvaihto = new Varinvaihto(solmut[i]);
  }

  window.VARINVAIHTO = { VARIKUVAT: VARIKUVAT, TEKSTIT: TEKSTIT };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
