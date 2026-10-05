/* ==========================================================================
   Luotokodin lohkokirjasto — katselin

   Ladataan lohkot.js → lk.js → mittaus.js (vapaaehtoinen) → tämä.
   Malli: Snellmanin komponenttikirjasto. Ero on lähde: Snellmanissa
   komponentti on koodia ja story sen argumentit; täällä lohko on sivun
   osa, ja story on sivu + valitsin + asetukset. Siksi "argumentit" ovat
   lohkon tekstit ja muunnelmat, eivät komponentin propseja.

   Osoite: #story=<lohko>--<story> · #docs=<lohko> · #sivu=<perusta>
   ja globaalit perässä (&vp=375&kieli=sv&sisalto=aukot&aariviivat=1).
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, j) { return (j || document).querySelector(s); };
  var $$ = function (s, j) { return Array.prototype.slice.call((j || document).querySelectorAll(s)); };
  function e(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var IKONI = {
    nuoli: '<svg viewBox="0 0 12 12"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    alas: '<svg viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    valikko: '<svg viewBox="0 0 16 16"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.5"/></svg>',
    linkki: '<svg viewBox="0 0 16 16"><path d="M6.5 9.5l3-3M5 7.5L3.5 9a2.5 2.5 0 003.5 3.5L8.5 11M11 8.5L12.5 7A2.5 2.5 0 009 3.5L7.5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    uusi: '<svg viewBox="0 0 16 16"><path d="M9 2h5v5M14 2L7 9M12 10v4H2V4h4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    viivat: '<svg viewBox="0 0 16 16"><rect x="2.5" y="2.5" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="2 1.5"/></svg>',
    lataa: '<svg viewBox="0 0 16 16"><path d="M13.5 8A5.5 5.5 0 1 1 11.8 4M12 1.5V4.5H9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
  };
  var PERUSTA = [
    { id: 'aloitus', nimi: 'Aloitus' },
    { id: 'tarkastus', nimi: 'Tarkastus' },
    { id: 'variantit', nimi: 'Variantit' },
    { id: 'varit', nimi: 'Värit' },
    { id: 'typografia', nimi: 'Typografia' },
    { id: 'valistys', nimi: 'Välistys ja mitat' }
  ];
  var LEVEYDET = [0, 1440, 1024, 768, 375];

  /* -- Tila -------------------------------------------------------------- */
  var tila = {
    reitti: 'sivu', id: 'aloitus',
    vp: 0, kieli: 'fi', sisalto: 'placeholder', aariviivat: false,
    paneeli: 'kontrollit', auki: {}, ryhmaKiinni: {}
  };
  try {
    var muisti = JSON.parse(localStorage.getItem('lk-katselin') || '{}');
    ['paneeli', 'ryhmaKiinni'].forEach(function (k) { if (muisti[k]) tila[k] = muisti[k]; });
    if (muisti.paneelinKorkeus) document.documentElement.style.setProperty('--panel-h', muisti.paneelinKorkeus + 'px');
  } catch (x) {}
  function muista(k, v) {
    try { var m = JSON.parse(localStorage.getItem('lk-katselin') || '{}'); m[k] = v; localStorage.setItem('lk-katselin', JSON.stringify(m)); } catch (x) {}
  }

  function lueOsoite() {
    var p = new URLSearchParams(location.hash.slice(1));
    if (p.get('story') && LK.story(p.get('story'))) { tila.reitti = 'story'; tila.id = LK.tunnus(LK.story(p.get('story'))); }
    else if (p.get('docs') && LK.lohko(p.get('docs'))) { tila.reitti = 'docs'; tila.id = p.get('docs'); }
    else if (p.get('sivu') && PERUSTA.some(function (x) { return x.id === p.get('sivu'); })) { tila.reitti = 'sivu'; tila.id = p.get('sivu'); }
    if (p.get('vp') != null) tila.vp = LEVEYDET.indexOf(+p.get('vp')) >= 0 ? +p.get('vp') : 0;
    if (p.get('kieli')) tila.kieli = p.get('kieli') === 'sv' ? 'sv' : 'fi';
    if (p.get('sisalto')) tila.sisalto = p.get('sisalto') === 'aukot' ? 'aukot' : 'placeholder';
    tila.aariviivat = p.get('aariviivat') === '1';
    var b = nykyinenLohko(); if (b) tila.auki[b.tunnus] = true;
  }
  function osoite() {
    var h = tila.reitti + '=' + tila.id;
    if (tila.vp) h += '&vp=' + tila.vp;
    if (tila.kieli !== 'fi') h += '&kieli=' + tila.kieli;
    if (tila.sisalto !== 'placeholder') h += '&sisalto=' + tila.sisalto;
    if (tila.aariviivat) h += '&aariviivat=1';
    return '#' + h;
  }
  function nykyinenLohko() {
    if (tila.reitti === 'story') return LK.story(tila.id).lohko;
    if (tila.reitti === 'docs') return LK.lohko(tila.id);
    return null;
  }
  function siirry(reitti, id) { tila.reitti = reitti; tila.id = id; piirra(); }

  /* -- Puu ---------------------------------------------------------------- */
  function korosta(t, haku) {
    if (!haku) return e(t);
    var i = t.toLowerCase().indexOf(haku);
    return i < 0 ? e(t) : e(t.slice(0, i)) + '<mark>' + e(t.slice(i, i + haku.length)) + '</mark>' + e(t.slice(i + haku.length));
  }
  function status(b) {
    var v = LK.pahin(b);
    if (!v) return '';
    var nimi = v === 'ok' ? 'Tarkastettu, ei havaintoja' : LK.VAKAVUUS[v].kuvaus;
    return '<span class="status status--' + v + '" title="' + e(nimi) + '">' + (v === 'ok' ? '✓' : v) + '</span>';
  }
  function piirraPuu() {
    var haku = $('#haku').value.trim().toLowerCase();
    var ryhmat = [], kartta = {};
    LOHKOT.forEach(function (b) {
      var osuu = !haku || (b.nimi + ' ' + b.ryhma + ' ' + b.tunnus + ' ' +
        b.storyt.map(function (s) { return s.nimi + ' ' + s.sivu; }).join(' ')).toLowerCase().indexOf(haku) >= 0;
      if (!osuu) return;
      if (!kartta[b.ryhma]) { kartta[b.ryhma] = []; ryhmat.push(b.ryhma); }
      kartta[b.ryhma].push(b);
    });
    var perusta = PERUSTA.filter(function (x) { return !haku || x.nimi.toLowerCase().indexOf(haku) >= 0; });
    var html = '';
    if (perusta.length) html += ryhma('Perusta', perusta.map(function (x) {
      var val = tila.reitti === 'sivu' && tila.id === x.id;
      return '<li><a class="tree__item tree__plain" href="#sivu=' + x.id + '" data-sivu="' + x.id + '"' +
        (val ? ' aria-current="true"' : '') + '><span class="tree__dot"></span>' + korosta(x.nimi, haku) + '</a></li>';
    }).join(''), haku);
    ryhmat.forEach(function (r) {
      html += ryhma(r, kartta[r].map(function (b) {
        var auki = tila.auki[b.tunnus] || !!haku;
        var docs = tila.reitti === 'docs' && tila.id === b.tunnus;
        return '<li><button type="button" class="tree__item tree__comp" aria-expanded="' + auki + '" data-lohko="' + e(b.tunnus) + '">' +
            '<span class="ico">' + IKONI.nuoli + '</span>' + korosta(b.nimi, haku) + status(b) + '</button>' +
          (auki ? '<ul class="tree__stories">' +
            '<li><a class="tree__item tree__story tree__story--docs" href="#docs=' + e(b.tunnus) + '" data-docs="' + e(b.tunnus) + '"' +
              (docs ? ' aria-current="true"' : '') + '><span class="tree__dot"></span>Docs</a></li>' +
            b.storyt.map(function (s, i) {
              var val = tila.reitti === 'story' && tila.id === LK.tunnus(s);
              var eka = s.variantti && !(b.storyt[i - 1] || {}).variantti;
              return (eka ? '<li class="tree__sep">Variantit</li>' : '') +
                '<li><a class="tree__item tree__story" href="#story=' + e(LK.tunnus(s)) + '" data-story="' + e(LK.tunnus(s)) + '"' +
                (val ? ' aria-current="true"' : '') + '><span class="tree__dot"></span>' + korosta(s.nimi, haku) + tilaMerkki(s) + '</a></li>';
            }).join('') + '</ul>' : '') + '</li>';
      }).join(''), haku);
    });
    $('#puu').innerHTML = html || '<p class="tree__empty">Ei osumia haulla “' + e(haku) + '”.</p>';
  }
  /* Variantin tila (variantit.js, ../kirjasto.js). Sivuston omalla storylla
     ei ole merkkiä: se on se mitä sivustolla on. */
  function tilaMerkki(s) {
    if (!s.variantti) return '';
    return '<span class="vtila vtila--' + e(s.variantti.tila) + '" title="' + e(LK.TILA[s.variantti.tila] || s.variantti.tila) + '">' +
      e((LK.TILA[s.variantti.tila] || s.variantti.tila).charAt(0)) + '</span>';
  }
  function lahdeNimi(s) {
    if (!s.variantti) return 'Sivusto';
    return s.variantti.lahde === 'laboratorio' ? 'Blokkilaboratorio' : 'Suunta ' + s.variantti.suuntaNimi;
  }
  function ryhma(nimi, sisalto, haku) {
    var kiinni = !haku && tila.ryhmaKiinni[nimi];
    return '<div class="tree__group' + (kiinni ? ' is-collapsed' : '') + '">' +
      '<button type="button" class="tree__group-title" data-ryhma="' + e(nimi) + '" aria-expanded="' + !kiinni + '">' +
      '<span class="ico">' + IKONI.alas + '</span>' + e(nimi) + '</button><ul class="tree__items">' + sisalto + '</ul></div>';
  }
  $('#puu').addEventListener('click', function (ev) {
    var n = ev.target.closest('[data-ryhma], [data-lohko], [data-docs], [data-story], [data-sivu]');
    if (!n) return;
    ev.preventDefault();
    if (n.hasAttribute('data-ryhma')) {
      var r = n.getAttribute('data-ryhma'); tila.ryhmaKiinni[r] = !tila.ryhmaKiinni[r];
      muista('ryhmaKiinni', tila.ryhmaKiinni); piirraPuu(); return;
    }
    if (n.hasAttribute('data-lohko')) {
      var t = n.getAttribute('data-lohko');
      // Suljetun lohkon klikkaus avaa sen Docsiin; avoimen sulkee.
      if (tila.auki[t] && nykyinenLohko() && nykyinenLohko().tunnus === t) { tila.auki[t] = false; piirraPuu(); return; }
      tila.auki[t] = true; siirry('docs', t); return;
    }
    if (n.hasAttribute('data-docs')) return siirry('docs', n.getAttribute('data-docs'));
    if (n.hasAttribute('data-story')) return siirry('story', n.getAttribute('data-story'));
    siirry('sivu', n.getAttribute('data-sivu'));
  });
  $('#haku').addEventListener('input', piirraPuu);
  $('#haku').addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { this.value = ''; piirraPuu(); this.blur(); }
    if (ev.key === 'Enter') { var eka = $('#puu [data-story], #puu [data-docs], #puu [data-sivu]'); if (eka) eka.click(); }
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.target.matches('input, textarea, select')) return;
    if (ev.key === '/') { ev.preventDefault(); $('#haku').focus(); return; }
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
    // Nuolet kulkevat storyjen välillä kuten Storybookissa.
    var kaikki = []; LOHKOT.forEach(function (b) { b.storyt.forEach(function (s) { kaikki.push(LK.tunnus(s)); }); });
    var i = kaikki.indexOf(tila.reitti === 'story' ? tila.id : '') + (ev.key === 'ArrowDown' ? 1 : -1);
    if (i < 0 || i >= kaikki.length) return;
    ev.preventDefault(); var s = LK.story(kaikki[i]); tila.auki[s.lohko.tunnus] = true; siirry('story', kaikki[i]);
  });

  /* -- Kattavuus ------------------------------------------------------------ */
  var virheet = {}, puuttuvat = [], lahteet = {}, varianttiVirheet = [];
  function lahde(sivu) {
    if (!lahteet[sivu]) lahteet[sivu] = fetch(LK.JUURI + sivu, { cache: 'no-store' }).then(function (r) { return r.text(); })
      .then(function (h) { return new DOMParser().parseFromString(h, 'text/html'); });
    return lahteet[sivu];
  }
  function kattavuus() {
    var kaikki = 0, katetut = 0;
    Promise.all(LK.SIVUT.map(function (s) { return lahde(s).then(function (d) { return { sivu: s, doc: d }; }); }))
      .then(function (sivut) {
        LOHKOT.forEach(function (b) {
          b.esiintymat.forEach(function (x) {
            var d = sivut.filter(function (s) { return s.sivu === x.sivu; })[0];
            if (!d || !d.doc.querySelector(x.valitsin)) virheet[b.tunnus] = true;
          });
        });
        sivut.forEach(function (s) {
          $$('header.site-header, footer.site-footer, main section[aria-labelledby]', s.doc).forEach(function (el) {
            if (el.parentElement && el.parentElement.closest('section[aria-labelledby]')) return;
            kaikki++;
            var osui = LOHKOT.some(function (b) {
              return b.esiintymat.some(function (x) { return (b.kattaa === 'kaikki' || x.sivu === s.sivu) && el.matches(x.valitsin); });
            });
            if (osui) katetut++; else puuttuvat.push(s.sivu + ' · ' + (el.getAttribute('aria-labelledby') || el.className));
          });
        });
        return Promise.all(LOHKOT.reduce(function (a, b) {
          return a.concat(b.storyt.filter(function (s) { return s.variantti; }).map(function (s) {
            return lahde(s.sivu).then(function (d) {
              if (!d.querySelector(s.valitsin)) { virheet[b.tunnus] = true; varianttiVirheet.push(LK.tunnus(s) + ' · ' + s.sivu + ' ' + s.valitsin); }
            }, function () { virheet[b.tunnus] = true; varianttiVirheet.push(LK.tunnus(s) + ' · ' + s.sivu + ' ei lue'); });
          }));
        }, []));
      }).then(function () {
        var n = Object.keys(virheet).length;
        $('#kattavuus').innerHTML = '<b>' + katetut + '/' + kaikki + '</b> sivujen sektiosta kerätty' +
          (puuttuvat.length ? ' · <a href="#sivu=aloitus">' + puuttuvat.length + ' keräämättä</a>' : '') +
          (n ? ' · <b style="color:var(--ui-e-text)">' + n + ' valitsinvirhettä</b>' : '') +
          '<div class="mittari"><span style="width:' + (kaikki ? katetut / kaikki * 100 : 0) + '%"></span></div>';
        if (tila.reitti === 'sivu' && (tila.id === 'aloitus' || tila.id === 'variantit')) piirraSivu();
      }).catch(function (err) {
        $('#kattavuus').textContent = 'Sivuja ei voitu lukea (' + err.message + '). Avaa palvelimen kautta: python3 -m http.server 8900';
      });
  }

  /* -- Canvas --------------------------------------------------------------- */
  var nykyinenKehys = null, kehysAvain = '', loki = [];
  function piirraCanvas(pakota) {
    var s = LK.story(tila.id);
    var avain = [tila.id, tila.vp, tila.kieli, tila.sisalto, tila.aariviivat].join('|');
    $('#main').className = 'main';
    $('#stage').hidden = false; $('#docs').hidden = true;
    if (!pakota && avain === kehysAvain && nykyinenKehys) { piirraPaneeli(); return; }
    kehysAvain = avain; loki = []; paivitaLokiLaskuri();
    var stage = $('#stage');
    stage.className = 'stage' + (tila.vp ? ' is-sized' : '');
    stage.innerHTML = '<div class="stage__frame"' + (tila.vp ? ' style="width:' + tila.vp + 'px"' : '') + '>' +
      '<div class="stage__size">' + tila.vp + ' px</div></div><div class="stage__loading"><span>Ladataan storya…</span></div>';
    var f = document.createElement('iframe');
    f.title = s.lohko.nimi + ' · ' + s.nimi;
    f.src = LK.canvasUrl(s, { kieli: tila.kieli, sisalto: tila.sisalto, upotus: true, aariviivat: tila.aariviivat }) + '&avain=paa';
    $('.stage__frame', stage).appendChild(f);
    nykyinenKehys = f;
    piirraPaneeli();
  }
  window.addEventListener('message', function (ev) {
    var m = ev.data; if (!m || m.lk !== 'canvas') return;
    var kehys = $$('iframe').filter(function (f) { return f.contentWindow === ev.source; })[0];
    if (!kehys) return;
    if (m.korkeus) kehys.style.height = m.korkeus + 'px';
    // Vierityslohko (canvas.html): korkeus riippuu ikkunasta, joten se
    // näytetään kiinteässä 900 px:n ikkunassa ja vieritetään sen sisällä.
    if (m.tyyppi === 'varoitus') {
      var w = document.createElement('p'); w.className = 'stage__huom stage__huom--virhe'; w.textContent = m.teksti;
      kehys.parentElement.insertBefore(w, kehys);
    }
    if (m.vieritys && !kehys.parentElement.querySelector('.stage__huom')) {
      var h = document.createElement('p'); h.className = 'stage__huom';
      h.textContent = 'Vierityslohko: korkeus riippuu ikkunasta, joten se näytetään 900 px:n ikkunassa. Vieritä kehyksen sisällä.';
      kehys.parentElement.insertBefore(h, kehys);
    }
    if (m.avain === 'paa') {
      if (m.tyyppi === 'valmis' || m.tyyppi === 'virhe') $('#stage').classList.add('is-ready');
      if (m.tyyppi === 'valmis') piirraPaneeli();
      if (m.tyyppi === 'toiminto') {
        var t = new Date();
        loki.unshift({ aika: ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2), laji: m.laji, teksti: m.teksti });
        paivitaLokiLaskuri();
        if (tila.paneeli === 'toiminnot') piirraPaneeli();
      }
    }
  });
  function lohkoElementti() {
    try { return nykyinenKehys && nykyinenKehys.contentWindow.LK_LOHKO; } catch (x) { return null; }
  }
  function paivitaLokiLaskuri() { $('#loki-n').textContent = loki.length || ''; }

  /* -- Paneeli -------------------------------------------------------------- */
  $$('#paneeli-tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      tila.paneeli = b.getAttribute('data-paneeli'); muista('paneeli', tila.paneeli);
      $('#panel').classList.remove('is-collapsed'); piirraPaneeli();
    });
  });
  $('#paneeli-kiinni').addEventListener('click', function () {
    var p = $('#panel'); p.classList.toggle('is-collapsed');
    this.setAttribute('aria-expanded', String(!p.classList.contains('is-collapsed')));
  });
  (function () {
    var kahva = $('#panel-resize'), alku = 0, korkeus = 0;
    kahva.addEventListener('pointerdown', function (ev) {
      alku = ev.clientY; korkeus = $('#panel').offsetHeight; kahva.setPointerCapture(ev.pointerId);
      document.body.style.userSelect = 'none'; $$('iframe').forEach(function (f) { f.style.pointerEvents = 'none'; });
    });
    kahva.addEventListener('pointermove', function (ev) {
      if (!kahva.hasPointerCapture(ev.pointerId)) return;
      var h = Math.max(120, Math.min(window.innerHeight - 160, korkeus + alku - ev.clientY));
      document.documentElement.style.setProperty('--panel-h', h + 'px');
    });
    kahva.addEventListener('pointerup', function (ev) {
      kahva.releasePointerCapture(ev.pointerId); document.body.style.userSelect = '';
      $$('iframe').forEach(function (f) { f.style.pointerEvents = ''; });
      muista('paneelinKorkeus', $('#panel').offsetHeight);
    });
  })();

  function piirraPaneeli() {
    if (tila.reitti !== 'story') return;
    $$('#paneeli-tabs button').forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-paneeli') === tila.paneeli)); });
    var s = LK.story(tila.id), b = s.lohko, runko = $('#panel-body'), el = lohkoElementti();
    if (tila.paneeli === 'tiedot') { runko.innerHTML = tiedot(b, s) + havainnot(b) + mittausStory(s); return; }
    if (tila.paneeli === 'toiminnot') {
      runko.innerHTML = '<div class="panel__bar"><span>Linkit ja lähetykset kirjataan tänne, jotta kehys pysyy lohkossa. ' +
        '<b>Mittari</b> on sivun oma data-event.</span><button type="button" class="text-btn" id="loki-tyhjenna"' + (loki.length ? '' : ' disabled') + '>Tyhjennä</button></div>' +
        (loki.length ? '<div class="log" role="log">' + loki.map(function (r) {
          return '<div class="log__row' + (r.laji === 'mittari' ? ' log__row--mittari' : '') + '"><span class="log__time">' + e(r.aika) +
            '</span><span class="log__type">' + e(r.laji) + '</span><span class="log__detail">' + e(r.teksti) + '</span></div>';
        }).join('') + '</div>' : '<p class="panel__empty">Klikkaa lohkossa linkkiä tai painiketta.</p>');
      return;
    }
    if (tila.paneeli === 'koodi') { koodi(s, runko); return; }
    if (!el) { runko.innerHTML = '<p class="panel__empty">Ladataan storya…</p>'; return; }
    if (tila.paneeli === 'muistiot') {
      var notes = $$('aside.note', el);
      runko.innerHTML = notes.length ? notes.map(function (n) { return '<div class="muistio">' + n.innerHTML + '</div>'; }).join('')
        : '<p class="panel__empty">Lohkossa ei ole muistiinpanoja.</p>';
      return;
    }
    kontrollit(s, el, runko);
  }

  /* KONTROLLIT: storyn valinta ja lohkon tekstit (data-copy). Muutos on
     kokeilu tässä kehyksessä, kuten Storybookin args — copy muutetaan
     copy-editorissa. Samalla polulla voi olla useampi elementti. */
  function kontrollit(s, el, runko) {
    var b = s.lohko, rivit = [];
    if (b.storyt.length > 1) {
      rivit.push('<tr class="ctrl__group"><td colspan="3">Story</td></tr><tr><td class="ctrl__name"><b>Esiintymä / muunnelma</b><code>' +
        b.storyt.length + ' storya</code></td><td><div class="radios" role="radiogroup" aria-label="Story">' +
        b.storyt.map(function (x) {
          return '<label><input type="radio" name="lk-story" value="' + e(LK.tunnus(x)) + '"' + (x === s ? ' checked' : '') + '><span>' + e(x.nimi) + '</span></label>';
        }).join('') + '</div></td><td class="ctrl__default">' + e(b.storyt[0].nimi) + '</td></tr>');
    }
    var nahty = {}, polut = [];
    $$('[data-copy]', el).forEach(function (x) {
      if (x.closest('aside.note')) return;
      var p = x.getAttribute('data-copy'); if (nahty[p]) return; nahty[p] = true;
      polut.push({ polku: p, el: x, html: x.children.length > 0 });
    });
    if (polut.length) rivit.push('<tr class="ctrl__group"><td colspan="3">Tekstit · ' + polut.length + '</td></tr>');
    polut.forEach(function (x) {
      var arvo = x.html ? x.el.innerHTML.trim() : x.el.textContent.trim();
      var vanha = alkuarvot[x.polku] != null ? alkuarvot[x.polku] : (alkuarvot[x.polku] = arvo);
      rivit.push('<tr' + (arvo !== vanha ? ' class="is-changed"' : '') + '><td class="ctrl__name"><b>' + e(nimike(x.polku)) + '</b><code>' + e(x.polku) + (x.html ? ' · html' : '') + '</code></td>' +
        '<td><textarea rows="' + Math.min(4, Math.max(1, Math.ceil(arvo.length / 80))) + '" data-polku="' + e(x.polku) + '"' +
        (x.html ? ' data-html' : '') + ' aria-label="' + e(nimike(x.polku)) + '">' + e(arvo) + '</textarea></td>' +
        '<td class="ctrl__default">' + e(vanha.replace(/<[^>]+>/g, '').slice(0, 140)) + '</td></tr>');
    });
    runko.innerHTML = '<div class="panel__bar"><span>Muutokset näkyvät vain tässä kehyksessä. Copy muutetaan copy-editorissa.</span>' +
      '<button type="button" class="text-btn" id="palauta">Palauta tekstit</button></div>' +
      '<table class="ctrl"><thead><tr><th>Nimi</th><th>Kontrolli</th><th>Tarinassa</th></tr></thead><tbody>' +
      (rivit.join('') || '<tr><td colspan="3" class="panel__empty">Lohkossa ei ole muokattavia tekstejä.</td></tr>') + '</tbody></table>';
  }
  var alkuarvot = {};
  function nimike(polku) {
    var v = polku.split('.').filter(function (o) { return !/^\d+$/.test(o); }).pop() || polku;
    return v.replace(/([a-zäö])([A-ZÄÖ])/g, '$1 $2').toLowerCase().replace(/^./, function (c) { return c.toUpperCase(); });
  }
  $('#panel-body').addEventListener('input', function (ev) {
    var t = ev.target, el = lohkoElementti();
    if (t.name === 'lk-story') return;
    if (!t.hasAttribute('data-polku') || !el) return;
    $$('[data-copy="' + t.getAttribute('data-polku') + '"]', el).forEach(function (x) {
      if (t.hasAttribute('data-html')) x.innerHTML = t.value; else x.textContent = t.value;
    });
    t.closest('tr').classList.toggle('is-changed', t.value !== alkuarvot[t.getAttribute('data-polku')]);
  });
  $('#panel-body').addEventListener('change', function (ev) {
    if (ev.target.name === 'lk-story') siirry('story', ev.target.value);
  });
  $('#panel-body').addEventListener('click', function (ev) {
    if (ev.target.id === 'palauta') {
      $$('#panel-body textarea[data-polku]').forEach(function (t) {
        t.value = alkuarvot[t.getAttribute('data-polku')]; t.dispatchEvent(new Event('input', { bubbles: true }));
      });
      ilmoita('Tekstit palautettu');
    }
    if (ev.target.id === 'loki-tyhjenna') { loki = []; paivitaLokiLaskuri(); piirraPaneeli(); }
  });

  /* KOODI: lohkon lähdemarkup sivun tiedostosta (ennen JS:ää), koska se on
     se mitä muokataan. Renderöity DOM on eri asia: siinä ovat copy ja
     data paikallaan, ja se näytetään erikseen avattavana. */
  function korostaKoodi(html) {
    return e(html)
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tk-cm">$1</span>')
      .replace(/(&lt;\/?)([a-z0-9-]+)/gi, '$1<span class="tk-tag">$2</span>')
      .replace(/ ([a-z-:]+)=(&quot;[^&]*?&quot;)/gi, ' <span class="tk-attr">$1</span>=<span class="tk-str">$2</span>');
  }
  function sisenna(html) {
    var rivit = html.split('\n'), min = Infinity;
    rivit.slice(1).forEach(function (r) { if (r.trim()) min = Math.min(min, r.match(/^ */)[0].length); });
    return rivit.map(function (r, i) { return i ? r.slice(min === Infinity ? 0 : min) : r; }).join('\n');
  }
  function koodi(s, runko) {
    runko.innerHTML = '<p class="panel__empty">Luetaan lähdettä…</p>';
    lahde(s.sivu).then(function (d) {
      var el = d.querySelector(s.valitsin);
      if (!el) { runko.innerHTML = '<p class="panel__empty">Valitsin ei osu lähteeseen.</p>'; return; }
      var html = sisenna('  ' + el.outerHTML);
      var elava = lohkoElementti();
      runko.innerHTML =
        '<div class="code"><div class="code__head"><span>Lähde · ' + e(s.sivu) + ' · ' + html.split('\n').length + ' riviä</span>' +
        '<button type="button" class="text-btn" data-kopioi="lahde">Kopioi</button></div><pre>' + korostaKoodi(html) + '</pre></div>' +
        (elava ? '<details class="code"><summary class="code__head" style="padding-bottom:8px;cursor:pointer">Renderöity DOM (copy ja data paikallaan)</summary><pre>' +
          korostaKoodi(elava.outerHTML.replace(/ data-sb-(lohko|esi)=""/g, '')) + '</pre></details>' : '');
      $('[data-kopioi]', runko).addEventListener('click', function () { kopioi(html, 'Lähdekoodi kopioitu'); });
    });
  }

  function tiedot(b, s) {
    var esi = '<ul>' + b.esiintymat.map(function (x) {
      var id = (x.valitsin.match(/aria-labelledby="([^"]+)"/) || [])[1];
      return '<li><a href="' + LK.JUURI + x.sivu + (id ? '#' + id : '') + '" target="_blank" rel="noopener">' + e(x.sivu) + '</a> <code>' + e(x.valitsin) + '</code></li>';
    }).join('') + '</ul>';
    return '<dl class="info">' +
      (s ? '<dt>Story</dt><dd>' + e(s.nimi) + ' <code>' + e(LK.tunnus(s)) + '</code></dd>' : '') +
      (s && s.variantti ? '<dt>Variantti</dt><dd>' + e(lahdeNimi(s)) + tilaMerkki(s) + (s.variantti.kuvaus ? '<br>' + e(s.variantti.kuvaus) : '') +
        '<br><a href="' + e(LK.sivuUrl(s)) + '" target="_blank" rel="noopener">' + e(s.sivu + (s.haku ? '?' + s.haku : '')) + '</a> <code>' + e(s.valitsin) + '</code></dd>' : '') +
      '<dt>Esiintymät</dt><dd>' + esi + '</dd>' +
      (b.muunnelmat ? '<dt>Muunnelmat</dt><dd>' + b.muunnelmat.map(function (m) { return e(m.nimi); }).join(' · ') + '</dd>' : '') +
      (b.css ? '<dt>Tyylit</dt><dd>' + b.css.map(function (c) { return '<code>styles.css ' + e(c) + '</code>'; }).join(' ') + '</dd>' : '') +
      (b.js ? '<dt>Renderöinti</dt><dd><code>' + e(b.js) + '</code></dd>' : '') +
      '<dt>Jaettu</dt><dd>' + (b.jaettu ? 'Kyllä — sama lohko usealla sivulla samasta datasta' : 'Ei') + '</dd>' +
      '</dl>';
  }
  function havainnot(b) {
    var h = b.havainnot || [];
    if (!h.length) return b.tarkastettu ? '<div class="notes" style="background:var(--ui-ok-bg);border-color:#bfd6bb;color:var(--ui-ok-text)"><b>Tarkastettu ' + e(b.tarkastettu) + '</b> · ei havaintoja</div>' : '';
    var jarj = { E: 0, V: 1, P: 2 };
    return '<div class="notes"><b>Avoimet ja poikkeamat' + (b.tarkastettu ? ' · tarkastettu ' + e(b.tarkastettu) : '') + '</b><ul>' +
      h.slice().sort(function (x, y) { return jarj[x.vakavuus] - jarj[y.vakavuus]; }).map(function (x) {
        return '<li><span class="status status--' + e(x.vakavuus) + '" title="' + e(LK.VAKAVUUS[x.vakavuus].kuvaus) + '">' + e(x.vakavuus) + '</span>' +
          '<span>' + e(x.teksti) + (x.korjaus ? '<small>Korjaus: ' + e(x.korjaus) + '</small>' : '') +
          (x.peruste ? '<small>' + e(x.peruste) + '</small>' : '') + '</span></li>';
      }).join('') + '</ul></div>';
  }

  /* MITTAUS (mittaus.js, kuvaa.py): renderöidystä DOMista mitatut arvot. */
  function mittaukset(s) {
    return (window.LK_MITTAUKSET || []).filter(function (m) { return m.story === LK.tunnus(s); });
  }
  function mittaKortti(m) {
    if (m.virhe) return '<div class="mitta"><b>' + m.vp + ' px</b><ul><li>Mittaus epäonnistui: ' + e(m.virhe) + '</li></ul></div>';
    var rivit = [];
    if (m.kontrasti.length) rivit.push(m.kontrasti.length + ' kontrastia alle rajan (heikoin ' + Math.min.apply(null, m.kontrasti.map(function (k) { return k.suhde; })) + ':1)');
    if (m.kohteet.length) rivit.push(m.kohteet.length + ' kosketusaluetta alle rajan');
    if (m.ylivuoto.length) rivit.push('Vaakaylivuoto: ' + e(m.ylivuoto[0].el));
    if (m.pienet.length) rivit.push(m.pienet.length + ' tekstiä alle 12 px');
    if (m.rivit.length) rivit.push(m.rivit.length + ' palstaa yli 85 merkkiä');
    if (m.kuvat.length) rivit.push(m.kuvat.length + ' kuvaa ilman alt-määritettä');
    if (m.painikkeet.length > 2) rivit.push(m.painikkeet.length + ' painiketta samassa lohkossa');
    return '<div class="mitta' + (rivit.length ? '' : ' mitta--ok') + '"><b>' + m.vp + ' px <span style="font-weight:400;color:var(--ui-text-3)">' + m.korkeus + ' px korkea' +
      (m.aukot ? ' · ' + m.aukot + ' aukkoa' : '') + '</span></b>' + (rivit.length ? '<ul><li>' + rivit.join('</li><li>') + '</li></ul>' : '') + '</div>';
  }
  function mittausStory(s) {
    var m = mittaukset(s);
    if (!m.length) return '<p class="panel__empty">Ei mittausta. Aja <code>python3 komponentit/sivusto/kuvaa.py</code>.</p>';
    return '<div style="padding:0 16px 16px"><div class="mitat">' + m.map(mittaKortti).join('') + '</div></div>';
  }

  /* -- Docs ----------------------------------------------------------------- */
  var docsAjo = 0;
  function piirraDocs() {
    var b = LK.lohko(tila.id), oma = ++docsAjo;
    $('#main').className = 'main is-docs';
    $('#stage').hidden = true; $('#docs').hidden = false;
    nykyinenKehys = null; kehysAvain = '';
    var mitat = b.storyt.map(function (s) { return mittaukset(s); }).reduce(function (a, x) { return a.concat(x); }, []);
    $('#docs').innerHTML = '<div class="docs__inner">' +
      '<div class="docs__eyebrow">' + e(b.ryhma) + '</div><h1>' + e(b.nimi) + '</h1>' +
      // Lohko ensin, metatiedot sen jälkeen (Ollin palaute 30.9.2026): Docsia
      // luetaan lohkon takia, ja tiedot selittävät sen mitä juuri näki.
      '<div id="docs-paa" class="docs__paa"></div>' +
      '<div class="docs__chips"><code>' + e(b.tunnus) + '</code>' + (b.jaettu ? '<span class="status status--jaettu">Jaettu</span>' : '') + status(b) + '</div>' +
      '<p class="docs__lead">' + e(b.kuvaus) + '</p>' + tiedot(b) + havainnot(b) +
      (b.hyva ? '<p class="docs__lead" style="font-size:13px"><b style="color:var(--ui-ok-text)">Mikä toimii:</b> ' + e(b.hyva) + '</p>' : '') +
      (mitat.length ? '<h2>Mittaus</h2><p class="docs__lead" style="font-size:13px">Renderöidystä DOMista, jokainen story 1440 ja 375 px. Kontrasti lasketaan lasketuista väreistä, kosketusalue laatikosta.</p>' +
        b.storyt.map(function (s) { var m = mittaukset(s); return m.length ? '<h3 style="font-size:13px;margin:12px 0 6px">' + e(s.nimi) + '</h3><div class="mitat">' + m.map(mittaKortti).join('') + '</div>' : ''; }).join('') : '') +
      (b.storyt.length - LK.varianttiLkm(b) > 1 ? '<h2>Muut tarinat (' + (b.storyt.length - LK.varianttiLkm(b) - 1) + ')</h2>' : '') + '<div id="docs-storyt"></div>' +
      (LK.varianttiLkm(b) ? '<h2>Variantit (' + LK.varianttiLkm(b) + ')</h2><p class="docs__lead" style="font-size:13px">Sama lohko designsuunnissa ja blokkilaboratoriossa, luettuna niiden omilta sivuilta. Vain elossa olevat: hylätyn perustelu on suunnan CSS-kommentissa. <a href="#sivu=variantit" style="color:var(--ui-accent)">Kaikki variantit →</a></p><div id="docs-variantit"></div>' : '') +
      '<h2>Muistiinpanot</h2><div id="docs-muistiot"><p style="color:var(--ui-text-3)">Luetaan…</p></div></div>';
    var isanta = $('#docs-storyt'), jono = Promise.resolve();
    // Kehykset ladataan PERÄKKÄIN: asetukset ovat jaetussa sessionStoragessa,
    // ja rinnakkain ladattu story lukisi naapurinsa omistusmallin.
    b.storyt.forEach(function (s, i) {
      var osa = document.createElement('section');
      osa.className = 'story';
      if (s.variantti) isanta = $('#docs-variantit');
      osa.innerHTML = '<div class="story__head"><h3>' + e(s.nimi) + tilaMerkki(s) + '</h3><a href="#story=' + e(LK.tunnus(s)) + '">Avaa canvasissa →</a></div>' +
        (s.variantti && s.variantti.kuvaus ? '<p class="story__kuvaus">' + e(lahdeNimi(s)) + ' · ' + e(s.variantti.kuvaus) + '</p>' : '') +
        '<div class="story__frame"></div><details class="story__code"><summary>Koodi</summary><pre>Luetaan…</pre></details>';
      (i === 0 ? $('#docs-paa') : isanta).appendChild(osa);
      $('details', osa).addEventListener('toggle', function () {
        if (!this.open) return; var pre = $('pre', this);
        lahde(s.sivu).then(function (d) { var el = d.querySelector(s.valitsin); pre.innerHTML = el ? korostaKoodi(sisenna('  ' + el.outerHTML)) : 'Valitsin ei osu.'; });
      });
      jono = jono.then(function () {
        if (oma !== docsAjo) return;
        return new Promise(function (valmis) {
          var f = document.createElement('iframe');
          f.title = b.nimi + ' · ' + s.nimi;
          f.src = LK.canvasUrl(s, { kieli: tila.kieli, sisalto: tila.sisalto, upotus: true }) + '&avain=docs' + i;
          if (tila.vp) { f.style.width = tila.vp + 'px'; f.style.margin = '0 auto'; }
          $('.story__frame', osa).appendChild(f);
          function kuuntele(ev) {
            if (ev.source !== f.contentWindow || !ev.data || ev.data.lk !== 'canvas') return;
            if (ev.data.tyyppi === 'valmis' || ev.data.tyyppi === 'virhe') {
              window.removeEventListener('message', kuuntele);
              if (i === 0) muistiotDocsiin(f);
              valmis();
            }
          }
          window.addEventListener('message', kuuntele);
          setTimeout(valmis, 15000);
        });
      });
    });
  }
  function muistiotDocsiin(f) {
    var el; try { el = f.contentWindow.LK_LOHKO; } catch (x) {}
    var notes = el ? $$('aside.note', el) : [];
    $('#docs-muistiot').innerHTML = notes.length ? notes.map(function (n) { return '<div class="muistio" style="padding-left:0">' + n.innerHTML + '</div>'; }).join('')
      : '<p style="color:var(--ui-text-3)">Lohkossa ei ole muistiinpanoja.</p>';
  }

  /* -- Perusta ja aloitus -------------------------------------------------- */
  var tokenit = null;
  function lueTokenit() {
    if (!tokenit) tokenit = fetch(LK.JUURI + 'assets/styles.css', { cache: 'no-store' }).then(function (r) { return r.text(); }).then(function (css) {
      var juuri = css.match(/:root\s*\{([\s\S]*?)\n\}/);
      var t = [], re = /--([a-z0-9-]+)\s*:\s*([^;]+);[ \t]*(?:\/\*([\s\S]*?)\*\/)?/g, m;
      while ((m = re.exec(juuri ? juuri[1] : ''))) t.push({ nimi: '--' + m[1], arvo: m[2].trim(), kuvaus: (m[3] || '').replace(/\s+/g, ' ').trim() });
      return t;
    });
    return tokenit;
  }
  function hexRgb(h) {
    h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function lum(c) { return c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce(function (a, v, i) { return a + v * [0.2126, 0.7152, 0.0722][i]; }, 0); }
  function suhde(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }

  function piirraSivu() {
    $('#main').className = 'main is-page';
    $('#stage').hidden = true; $('#docs').hidden = false;
    nykyinenKehys = null; kehysAvain = '';
    var d = $('#docs');
    if (tila.id === 'aloitus') return aloitus(d);
    if (tila.id === 'tarkastus') return tarkastus(d);
    if (tila.id === 'variantit') return variantit(d);
    d.innerHTML = '<div class="docs__inner fd"><p style="color:var(--ui-text-3)">Luetaan styles.css…</p></div>';
    lueTokenit().then(function (t) {
      if (tila.id === 'varit') varit(d, t);
      else if (tila.id === 'typografia') typografia(d, t);
      else valistys(d, t);
    });
  }
  function aloitus(d) {
    var n = { E: 0, V: 0, P: 0 }, tark = 0;
    LOHKOT.forEach(function (b) { (b.havainnot || []).forEach(function (h) { n[h.vakavuus]++; }); if (b.tarkastettu) tark++; });
    var ryhmat = [];
    LOHKOT.forEach(function (b) { if (ryhmat.indexOf(b.ryhma) < 0) ryhmat.push(b.ryhma); });
    d.innerHTML = '<div class="docs__inner"><div class="docs__eyebrow">Luotokoti · sivustoprototyyppi</div><h1>Lohkokirjasto</h1>' +
      '<p class="docs__lead">Sivuston jokainen lohko omana komponenttinaan. Lohkoa ei ole kopioitu tänne: story on oikea sivu, josta kaikki muu on piilotettu, joten kirjasto näyttää aina sen mikä sivulla on nyt. ' +
      LOHKOT.length + ' lohkoa, ' + LOHKOT.reduce(function (a, b) { return a + b.storyt.length - LK.varianttiLkm(b); }, 0) + ' storya ja ' +
      LOHKOT.reduce(function (a, b) { return a + LK.varianttiLkm(b); }, 0) + ' <a href="#sivu=variantit" style="color:var(--ui-accent)">designvarianttia</a>.</p>' +
      '<div class="home__legend"><span><span class="status status--E">E</span> estää julkaisun · ' + n.E + '</span><span><span class="status status--V">V</span> vaikuttaa merkittävästi · ' + n.V +
      '</span><span><span class="status status--P">P</span> parannus · ' + n.P + '</span><span><span class="status status--ok">✓</span> tarkastettu ' + tark + '/' + LOHKOT.length + '</span>' +
      '<a href="#sivu=tarkastus" style="color:var(--ui-accent);font-weight:600">Kaikki havainnot →</a></div>' +
      (puuttuvat.length ? '<div class="notes" style="margin:0 0 24px"><b>Keräämättä</b><ul>' + puuttuvat.map(function (p) {
        return '<li><span class="status status--P">?</span><span>' + e(p) + ' — sektio jota mikään lohko ei kata. Lisää rivi lohkot.js:ään.</span></li>'; }).join('') + '</ul></div>' : '') +
      ryhmat.map(function (r) {
        return '<h2>' + e(r) + '</h2><div class="home__grid">' + LOHKOT.filter(function (b) { return b.ryhma === r; }).map(function (b) {
          var v = LK.varianttiLkm(b);
          return '<a class="home__card" href="#docs=' + e(b.tunnus) + '"><b>' + e(b.nimi) + status(b) + '</b><span>' + (b.storyt.length - v) + ' storya' + (v ? ' · ' + v + ' varianttia' : '') + ' · ' +
            b.esiintymat.map(function (x) { return LK.SIVUNIMI[x.sivu]; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).join(', ') + '</span></a>';
        }).join('') + '</div>';
      }).join('') + '</div>';
  }
  function tarkastus(d) {
    var rivit = [], jarj = { E: 0, V: 1, P: 2 };
    LOHKOT.forEach(function (b) { (b.havainnot || []).forEach(function (h) { rivit.push({ b: b, h: h }); }); });
    rivit.sort(function (x, y) { return jarj[x.h.vakavuus] - jarj[y.h.vakavuus] || x.b.ryhma.localeCompare(y.b.ryhma); });
    d.innerHTML = '<div class="docs__inner"><div class="docs__eyebrow">Perusta</div><h1>Tarkastus</h1>' +
      '<p class="docs__lead">' + (window.LK_TARKASTUS ? e(window.LK_TARKASTUS.kuvaus) : 'Lohkojen UI- ja UX-havainnot.') + '</p>' +
      (window.LK_TARKASTUS && window.LK_TARKASTUS.yhteiset ? '<h2>Järjestelmätason havainnot</h2><div class="notes" style="margin:0"><ul>' +
        window.LK_TARKASTUS.yhteiset.map(function (h) {
          return '<li><span class="status status--' + (h.korjattu ? 'ok' : e(h.vakavuus)) + '">' + (h.korjattu ? '✓' : e(h.vakavuus)) + '</span><span>' + e(h.teksti) +
            (h.korjattu ? '<small><b>Korjattu ' + e(h.korjattu) + '</b></small>' : (h.korjaus ? '<small>Korjaus: ' + e(h.korjaus) + '</small>' : '')) +
            (h.paatos ? '<small><b>' + e(h.paatos) + '</b></small>' : '') +
            (h.lohkot && h.lohkot.length ? '<small>Lohkot: ' + e(h.lohkot.join(', ')) + '</small>' : '') + '</span></li>';
        }).join('') + '</ul></div>' : '') +
      '<h2>Lohkokohtaiset havainnot (' + rivit.length + ')</h2>' +
      (rivit.length ? '<table class="hav"><thead><tr><th>Vakavuus</th><th>Lohko</th><th>Havainto</th><th>Peruste</th></tr></thead><tbody>' + rivit.map(function (r) {
        return '<tr><td><span class="status status--' + e(r.h.vakavuus) + '">' + e(r.h.vakavuus) + '</span></td><td><a href="#docs=' + e(r.b.tunnus) + '">' + e(r.b.nimi) + '</a><small>' + e(r.b.ryhma) + '</small></td>' +
          '<td>' + e(r.h.teksti) + (r.h.korjaus ? '<small>Korjaus: ' + e(r.h.korjaus) + '</small>' : '') + '</td><td><small style="color:var(--ui-text-2)">' + e(r.h.peruste || '') + '</small></td></tr>';
      }).join('') + '</tbody></table>' : '<p>Ei havaintoja.</p>') + '</div>';
  }
  /* VARIANTIT: lohko × lähde. Sarakkeet tulevat datasta (sivusto, jokainen
     suunta, laboratorio), joten uusi suunta variantit.js:ssä tuo uuden
     sarakkeen. Solussa on lähteen storyt linkkeinä; tyhjä solu = lähteessä
     ei ole tätä lohkoa. */
  function variantit(d) {
    var sarakkeet = [{ id: 'sivusto', nimi: 'Sivusto' }];
    (window.SUUNNAT || []).forEach(function (u) { sarakkeet.push({ id: 'suunta:' + u.tunnus, nimi: u.nimi, kuvaus: u.kuvaus, sivu: u.sivu }); });
    sarakkeet.push({ id: 'laboratorio', nimi: 'Laboratorio', kuvaus: 'komponentit/ — uudet blokit ennen sivua', sivu: 'komponentit/index.html' });
    function sarake(s) { return !s.variantti ? 'sivusto' : s.variantti.lahde === 'laboratorio' ? 'laboratorio' : 'suunta:' + s.variantti.suunta; }
    var mukana = LOHKOT.filter(function (b) { return LK.varianttiLkm(b); });
    var n = { hyvaksytty: 0, auki: 0, muu: 0 };
    mukana.forEach(function (b) { b.storyt.forEach(function (s) { if (s.variantti) n[n[s.variantti.tila] != null ? s.variantti.tila : 'muu']++; }); });
    d.innerHTML = '<div class="docs__inner docs__inner--leve"><div class="docs__eyebrow">Perusta</div><h1>Variantit</h1>' +
      '<p class="docs__lead">Jokainen lohko sivustolla, designsuunnissa ja blokkilaboratoriossa. Variantteja ei ole kopioitu: suunnan osio luetaan suunnan omalta sivulta sen <code>data-lohko</code>-merkinnällä, laboratorion blokki laboratoriosta. ' +
      'Vain elossa olevat (30.9.2026): hylätyt ovat suunnan CSS-kommenteissa perusteluineen, ja C · Ritning sekä D · Egen tomt ovat pois Miro-boardilta.</p>' +
      '<div class="home__legend"><span><span class="vtila vtila--hyvaksytty">H</span> hyväksytty · ' + n.hyvaksytty + '</span><span><span class="vtila vtila--auki">A</span> auki · ' + n.auki + '</span>' +
      (n.muu ? '<span><span class="vtila vtila--luonnos">L</span> luonnos · ' + n.muu + '</span>' : '') + '</div>' +
      (varianttiVirheet.length ? '<div class="notes" style="margin:0 0 24px;border-color:#e0b4a4"><b>Valitsin ei osu</b><ul>' + varianttiVirheet.map(function (v) {
        return '<li><span class="status status--E">!</span><span>' + e(v) + '</span></li>'; }).join('') + '</ul></div>' : '') +
      '<div class="vmatriisi"><table><thead><tr><th>Lohko</th>' + sarakkeet.map(function (c) {
        return '<th scope="col" title="' + e(c.kuvaus || '') + '">' + (c.sivu ? '<a href="' + e(LK.JUURI + c.sivu) + '" target="_blank" rel="noopener">' + e(c.nimi) + '</a>' : e(c.nimi)) + '</th>';
      }).join('') + '</tr></thead><tbody>' + mukana.map(function (b) {
        return '<tr><th scope="row"><a href="#docs=' + e(b.tunnus) + '">' + e(b.nimi) + '</a><small>' + e(b.ryhma) + '</small></th>' + sarakkeet.map(function (c) {
          var st = b.storyt.filter(function (s) { return sarake(s) === c.id; });
          if (c.id === 'sivusto') return '<td><a href="#story=' + e(LK.tunnus(st[0])) + '">' + e(st.length === 1 ? 'Oletus' : st.length + ' storya') + '</a></td>';
          return '<td>' + st.map(function (s) {
            var nimi = s.nimi.indexOf(c.nimi + ' · ') === 0 ? s.nimi.slice(c.nimi.length + 3) : (s.variantti.lahde === 'laboratorio' ? s.nimi.replace('Laboratorio · ', '') : 'Oletus');
            return '<a href="#story=' + e(LK.tunnus(s)) + '">' + e(nimi) + tilaMerkki(s) + '</a>';
          }).join('') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></div>';
  }
  function varit(d, t) {
    var PAPERI = hexRgb('#faf8f3'), MUSTE = hexRgb('#2b2822');
    var varit = t.filter(function (x) { return /^#[0-9a-f]{3,6}$/i.test(x.arvo); });
    var brandi = ['--beige', '--olive', '--charcoal', '--amber', '--seafoam'];
    function kortti(x) {
      var c = hexRgb(x.arvo), p = suhde(c, PAPERI), m = suhde(c, MUSTE), tumma = lum(c) < 0.3;
      return '<div class="fd-sw"><div class="fd-sw__chip" style="background:' + x.arvo + ';color:' + (tumma ? '#faf8f3' : '#2b2822') + '">' +
        '<span>' + (tumma ? 'Aa paperi' : 'Aa muste') + '</span><span class="fd-aa' + ((tumma ? p : m) < 4.5 ? ' fd-aa--fail' : '') + '">' + (tumma ? p : m).toFixed(2) + ':1</span></div>' +
        '<div class="fd-sw__body"><div class="fd-sw__name">' + e(x.nimi.replace('--', '')) + '</div><div class="fd-sw__var">' + e(x.nimi) + ' · ' + e(x.arvo) + '</div>' +
        '<div class="fd-sw__role">Paperilla ' + p.toFixed(2) + ':1' + (x.kuvaus ? ' · ' + e(x.kuvaus) : '') + '</div></div></div>';
    }
    d.innerHTML = '<div class="docs__inner fd"><div class="docs__eyebrow">Perusta</div><h1>Värit</h1>' +
      '<p class="docs__lead">Luettu styles.css:n :root-lohkosta, joten sivu näyttää sen mitä sivusto käyttää. Viisi brändiväriä ovat lukittuja (AGENTS.md 5), johdetut arvot on laskettu niistä. Kontrasti lasketaan paperia #faf8f3 ja mustetta #2b2822 vasten.</p>' +
      '<h2>Brändivärit · lukittu</h2><div class="fd-swatches">' + varit.filter(function (x) { return brandi.indexOf(x.nimi) >= 0; }).map(kortti).join('') + '</div>' +
      '<h2>Johdetut ja pinnat</h2><div class="fd-swatches">' + varit.filter(function (x) { return brandi.indexOf(x.nimi) < 0; }).map(kortti).join('') + '</div></div>';
  }
  function typografia(d, t) {
    var koot = t.filter(function (x) { return /^--t-/.test(x.nimi); });
    var fontit = t.filter(function (x) { return /^--ff-/.test(x.nimi); });
    d.innerHTML = '<div class="docs__inner fd"><div class="docs__eyebrow">Perusta</div><h1>Typografia</h1>' +
      '<p class="docs__lead">Yksi iso hyppy, sitten hiljaisuus (AGENTS.md 6): hero on suuri, muu asteikko tiivis. Otsikot Quicksand, leipäteksti Nunito Sans. Leipätekstipalsta ei ylitä --measure-arvoa. Koot ovat clamp-lausekkeita: näyte on tämän ikkunan leveydellä.</p>' +
      '<h2>Perheet</h2><table class="fd-table"><tbody>' + fontit.map(function (f) {
        return '<tr><td style="width:160px"><code>' + e(f.nimi) + '</code></td><td style="font-family:' + e(f.arvo) + ';font-size:22px">Risö 100+ · Åbo ja Larsmo 0123456789</td></tr>';
      }).join('') + '</tbody></table>' +
      '<h2>Asteikko</h2><table class="fd-table"><thead><tr><th>Token</th><th>Näyte</th><th>Arvo</th></tr></thead><tbody>' + koot.map(function (k) {
        var otsikko = /hero|h2|h3|figure/.test(k.nimi);
        return '<tr><td style="width:120px"><code>' + e(k.nimi) + '</code></td><td style="font-size:' + e(k.arvo) + ';font-family:' + (otsikko ? 'Quicksand, sans-serif;font-weight:600' : '\'Nunito Sans\', sans-serif') + ';line-height:1.2">' +
          (k.nimi === '--t-hero' ? 'Risö 100+' : 'Talo ja tontti samassa paketissa') + '</td><td><code>' + e(k.arvo) + '</code>' + (k.kuvaus ? '<br><small style="color:var(--ui-text-3)">' + e(k.kuvaus) + '</small>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function valistys(d, t) {
    var s = t.filter(function (x) { return /^--s-/.test(x.nimi) || /^--(section-y|wrap|measure)$/.test(x.nimi); });
    d.innerHTML = '<div class="docs__inner fd"><div class="docs__eyebrow">Perusta</div><h1>Välistys ja mitat</h1>' +
      '<p class="docs__lead">Välistysasteikko --s-1 … --s-10 ja sivun mitat. Pystyrytmi on tokeneissa, ei markupissa (styles.css §50).</p>' +
      '<table class="fd-table"><thead><tr><th>Token</th><th>Arvo</th><th style="width:55%">Näyte</th></tr></thead><tbody>' + s.map(function (x) {
        var leveys = /wrap|measure/.test(x.nimi) ? 'min(100%, ' + x.arvo + ')' : x.arvo;
        return '<tr><td><code>' + e(x.nimi) + '</code></td><td><code>' + e(x.arvo) + '</code>' + (x.kuvaus ? '<br><small style="color:var(--ui-text-3)">' + e(x.kuvaus) + '</small>' : '') +
          '</td><td><div class="fd-bar" style="width:' + e(leveys) + '"></div></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* -- Työkalupalkki -------------------------------------------------------- */
  function piirraPalkki() {
    var story = tila.reitti === 'story', docs = tila.reitti === 'docs';
    var b = nykyinenLohko();
    $('#tab-canvas').setAttribute('aria-selected', String(story));
    $('#tab-docs').setAttribute('aria-selected', String(docs));
    $('#tab-canvas').disabled = $('#tab-docs').disabled = !b;
    $('#tyokalut').hidden = tila.reitti === 'sivu';
    $$('#vp button').forEach(function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-vp') === tila.vp)); });
    $$('#kieli button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-arvo') === tila.kieli)); });
    $$('#sisalto button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-arvo') === tila.sisalto)); });
    $('#aariviivat').setAttribute('aria-pressed', String(tila.aariviivat));
    $('#aariviivat').hidden = $('#avaa').hidden = !story;
    var polku = '';
    if (b) {
      polku = '<span class="crumb__ryhma">' + e(b.ryhma) + ' ›</span> ' +
        (story ? '<a href="#docs=' + e(b.tunnus) + '">' + e(b.nimi) + '</a> › <b>' + e(LK.story(tila.id).nimi) + '</b>' : '<b>' + e(b.nimi) + '</b>');
    } else {
      polku = '<b>' + e(PERUSTA.filter(function (x) { return x.id === tila.id; })[0].nimi) + '</b>';
    }
    $('#murupolku').innerHTML = polku;
    if (story) $('#avaa').href = LK.canvasUrl(LK.story(tila.id), { kieli: tila.kieli, sisalto: tila.sisalto, aariviivat: tila.aariviivat });
  }
  $('#tab-canvas').addEventListener('click', function () { var b = nykyinenLohko(); if (b) siirry('story', LK.tunnus(b.storyt[0])); });
  $('#tab-docs').addEventListener('click', function () { var b = nykyinenLohko(); if (b) siirry('docs', b.tunnus); });
  $('#vp').addEventListener('click', function (ev) { var x = ev.target.closest('button'); if (x) { tila.vp = +x.getAttribute('data-vp'); piirra(); } });
  $('#kieli').addEventListener('click', function (ev) { var x = ev.target.closest('button'); if (x) { tila.kieli = x.getAttribute('data-arvo'); piirra(); } });
  $('#sisalto').addEventListener('click', function (ev) { var x = ev.target.closest('button'); if (x) { tila.sisalto = x.getAttribute('data-arvo'); piirra(); } });
  $('#aariviivat').addEventListener('click', function () { tila.aariviivat = !tila.aariviivat; piirra(); });
  $('#lataa').addEventListener('click', function () { if (tila.reitti === 'story') { piirraCanvas(true); } else piirra(); ilmoita('Ladattu uudelleen'); });
  $('#kopioi').addEventListener('click', function () { kopioi(location.href, 'Linkki kopioitu'); });
  $('#sivupalkki').addEventListener('click', function () {
    var app = $('#app'); app.classList.toggle('is-side-hidden');
    this.setAttribute('aria-expanded', String(!app.classList.contains('is-side-hidden')));
  });

  function kopioi(teksti, viesti) {
    // Epäonnistuminen kerrotaan: hiljainen epäonnistuminen näyttää
    // onnistumiselta (ux-heuristiikka 1, 9).
    if (!navigator.clipboard) { ilmoita('Kopiointi ei ole käytettävissä tässä selaimessa'); return; }
    navigator.clipboard.writeText(teksti).then(function () { ilmoita(viesti); }, function () { ilmoita('Kopiointi epäonnistui — valitse ja kopioi käsin'); });
  }
  var ajastin;
  function ilmoita(t) {
    var el = $('#toast'); el.textContent = t; el.classList.add('is-on');
    clearTimeout(ajastin); ajastin = setTimeout(function () { el.classList.remove('is-on'); }, 1800);
  }

  /* -- Piirto --------------------------------------------------------------- */
  function piirra() {
    var h = osoite();
    if (location.hash !== h) history.replaceState(null, '', h);
    var b = nykyinenLohko();
    document.title = (tila.reitti === 'sivu' ? PERUSTA.filter(function (x) { return x.id === tila.id; })[0].nimi
      : b.nimi + (tila.reitti === 'docs' ? ' · Docs' : ' · ' + LK.story(tila.id).nimi)) + ' — Luotokodin lohkot';
    piirraPuu(); piirraPalkki();
    if (tila.reitti === 'story') piirraCanvas();
    else if (tila.reitti === 'docs') piirraDocs();
    else piirraSivu();
    var val = $('#puu [aria-current="true"]'); if (val && val.scrollIntoViewIfNeeded) val.scrollIntoViewIfNeeded(false);
  }
  window.addEventListener('hashchange', function () { lueOsoite(); piirra(); });

  lueOsoite();
  piirra();
  kattavuus();
})();
