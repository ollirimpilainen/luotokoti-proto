/* ==========================================================================
   Luotokoti — lohkokirjaston yhteinen malli (katselin + canvas)

   Ladataan lohkot.js:n, variantit.js:n ja ../kirjasto.js:n jälkeen. Rakentaa jokaiselle lohkolle storyt
   (esiintymät + muunnelmat) ja tarjoaa osoitteiden muodostuksen, jotta
   katselin, canvas ja kuvaustyökalu puhuvat samoista storyista samoilla
   tunnuksilla. Kaksi toteutusta samasta asiasta eriytyisi.
   ========================================================================== */
(function () {
  'use strict';

  var SIVUNIMI = { 'index.html': 'Etusivu', 'talo.html': 'Talo', 'kohteet.html': 'Kohteet',
    'kohde.html': 'Kohde', 'oma-tontti.html': 'Oma tontti', 'meista.html': 'Meistä',
    'yhteystiedot.html': 'Yhteystiedot' };

  function slug(t) {
    return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  LOHKOT.forEach(function (b) {
    b.storyt = b.esiintymat.map(function (x, i) {
      var nimi = x.nimi || (b.esiintymat.length === 1 ? 'Oletus' : SIVUNIMI[x.sivu] || x.sivu);
      return { lohko: b, nimi: nimi, id: slug(nimi) || 's' + i, sivu: x.sivu,
               valitsin: x.valitsin, asetukset: x.asetukset || {} };
    });
    (b.muunnelmat || []).forEach(function (m) {
      var x = b.esiintymat[0], a = {}, k;
      for (k in (x.asetukset || {})) a[k] = x.asetukset[k];
      for (k in m.asetukset) a[k] = m.asetukset[k];
      b.storyt.push({ lohko: b, nimi: m.nimi, id: slug(m.nimi), sivu: x.sivu,
                      valitsin: x.valitsin, asetukset: a, muunnelma: true });
    });
  });

  /* VARIANTIT (variantit.js, ../kirjasto.js). Jokainen variantti on lohkon
     story sivuston storyjen perässä, joten Docs näyttää ne allekkain ja
     canvas eristää ne samalla tavalla. s.variantti kertoo mistä se tulee;
     sivuston omilla storyilla sitä ei ole. */
  function lisaa(b, s) {
    s.lohko = b; s.asetukset = {};
    s.id = slug(s.nimi);
    while (b.storyt.some(function (x) { return x.id === s.id; })) s.id += '-2';
    b.storyt.push(s);
  }
  function lohkoTunnuksella(t) { return LOHKOT.filter(function (b) { return b.tunnus === t; })[0]; }
  (window.SUUNNAT || []).forEach(function (u) {
    u.lohkot.forEach(function (t) {
      var b = lohkoTunnuksella(t); if (!b) return;
      lisaa(b, { nimi: u.nimi, sivu: u.sivu, haku: '',
        valitsin: (window.SUUNTAVALITSIN || {})[t] || '[data-lohko="' + t + '"]',
        variantti: { lahde: 'suunta', suunta: u.tunnus, suuntaNimi: u.nimi, kuvaus: u.kuvaus,
                     tila: (u.oletustila || {})[t] || u.tila } });
    });
    (u.muunnelmat || []).forEach(function (m) {
      var b = lohkoTunnuksella(m.lohko); if (!b) return;
      lisaa(b, { nimi: m.nimi, sivu: u.sivu, haku: m.haku, valitsin: '[data-lohko="' + m.lohko + '"]',
        variantti: { lahde: 'suunta', suunta: u.tunnus, suuntaNimi: u.nimi, kuvaus: m.kuvaus || '', tila: m.tila } });
    });
  });
  (window.KIRJASTO || []).forEach(function (k) {
    var b = k.lohko && lohkoTunnuksella(k.lohko); if (!b || !k.lab || !k.valitsin) return;
    lisaa(b, { nimi: 'Laboratorio · ' + k.nimi, sivu: 'komponentit/' + k.lab, haku: '', valitsin: k.valitsin,
      variantti: { lahde: 'laboratorio', kuvaus: k.kuvaus, tila: k.tila, avoinna: k.avoinna } });
  });

  // Tarkastuksen tulokset (tarkastus.js, jos ladattu) lohkoille.
  var T = window.LK_TARKASTUS;
  if (T && T.lohkot) LOHKOT.forEach(function (b) {
    var x = T.lohkot[b.tunnus]; if (!x) return;
    b.havainnot = x.havainnot || []; b.hyva = x.hyva || ''; b.tarkastettu = T.pvm;
  });

  window.LK = {
    JUURI: '../../',
    SIVUT: Object.keys(SIVUNIMI),
    SIVUNIMI: SIVUNIMI,
    // Asetukset jotka story voi määrätä. Määräämätön avain POISTETAAN, ettei
    // edellisen storyn omistusmalli B jää päälle seuraavaan.
    STORYAVAIMET: ['omistusmalli', 'koko'],
    slug: slug,
    lohko: function (t) { return LOHKOT.filter(function (b) { return b.tunnus === t; })[0] || null; },
    story: function (tunnus) {
      var o = String(tunnus || '').split('--'), b = this.lohko(o[0]);
      if (!b) return null;
      return b.storyt.filter(function (s) { return s.id === o[1]; })[0] || b.storyt[0];
    },
    tunnus: function (s) { return s.lohko.tunnus + '--' + s.id; },
    sivuUrl: function (s, kieli) {
      // Variantin sivu on oma kokonaisuutensa (suunnat ovat ruotsiksi eikä
      // niillä ole kieli- tai kohdekytkintä): vain sen oma kysely.
      if (s.variantti) return this.JUURI + s.sivu + (s.haku ? '?' + s.haku : '');
      return this.JUURI + s.sivu + '?lang=' + (kieli || 'fi') +
        (s.asetukset.kohde ? '&kohde=' + s.asetukset.kohde : '');
    },
    canvasUrl: function (s, g) {
      g = g || {};
      return 'canvas.html?story=' + encodeURIComponent(this.tunnus(s)) +
        '&kieli=' + (g.kieli || 'fi') + '&sisalto=' + (g.sisalto || 'placeholder') +
        (g.upotus ? '&upotus=1' : '') + (g.aariviivat ? '&aariviivat=1' : '') +
        (g.tausta ? '&tausta=' + g.tausta : '') + (g.mittaa ? '&mittaa=1' : '');
    },
    // Variantin tila: sama sanasto kuin kirjasto.js:ssä ja variantit.js:ssä.
    TILA: { hyvaksytty: 'Hyväksytty', auki: 'Auki', luonnos: 'Luonnos', valittu: 'Valittu', liitetty: 'Liitetty' },
    varianttiLkm: function (b) { return b.storyt.filter(function (s) { return s.variantti; }).length; },
    otsikonId: function (s) { return (s.valitsin.match(/aria-labelledby="([^"]+)"/) || [])[1] || ''; },
    // Vakavuus: sama asteikko kuin TARKASTUS.md:ssä, jotta kirjaston ja
    // tarkastusraportin havainnot ovat vertailukelpoisia.
    VAKAVUUS: {
      E: { nimi: 'Estää', kuvaus: 'Estää julkaisun' },
      V: { nimi: 'Vaikuttaa', kuvaus: 'Vaikuttaa merkittävästi' },
      P: { nimi: 'Parannus', kuvaus: 'Parannus' }
    },
    pahin: function (b) {
      var h = b.havainnot || [];
      if (h.some(function (x) { return x.vakavuus === 'E'; })) return 'E';
      if (h.some(function (x) { return x.vakavuus === 'V'; })) return 'V';
      if (h.length) return 'P';
      return b.tarkastettu ? 'ok' : '';
    }
  };
})();
