/* ==========================================================================
   Luotokoti — Risö 100+ -malli selaimessa
   Ladataan talo.html:llä (kierros) ja index.html:llä (prosessi), mallin
   datatiedoston jälkeen ja ennen talo.js:ää.

   MIKSI SELAIN PROJISOI. Kuva liikkuu: kierroksella kamera kääntyy
   koillisesta suoraan ylös, prosessissa talo rakentuu vierityksen mukana.
   Valmiiksi laskettu SVG voi näyttää vain yhden tilan, joten generaattori
   (tyokalut/riso3d.py) kirjoittaa tahot kolmiulotteisina ja tämä tiedosto
   piirtää ne joka ruudulla. Välivaiheet ovat siis oikeita kuvia samasta
   mallista, eivät ristiin häivytettyjä kuvia.

   Kaksi kerrosta:
     ydin        rakenna(): DOM, karsinta, maalausjärjestys, projektio.
                 Ei tiedä mitään askeleista.
     koreografiat luo() — kierros talosivulla, yksi luku t: 0 ulko, 1 pohja
                  prosessi() — etusivu, yksi luku p: 0…4 askelten läpi

   Joka ruudulla ydin tekee kolme asiaa:
     1  karsinta   taho jonka normaali osoittaa kamerasta poispäin jää pois
     2  järjestys  ryhmissä joissa `jarjesta` on päällä, kauimmainen ensin
                   (maalarin algoritmi — mallin tahot eivät leikkaa toisiaan)
     3  projektio  ortografinen, joten mittasuhteet pysyvät kaikissa kulmissa

   Jokaisella lapsiryhmällä voi olla ruutukohtainen tila:
     o   läpinäkyvyys
     dz  nosto millimetreinä (katto)
     sz  pystyskaala z0:sta ylöspäin (rakentuva seinä, nouseva perustus)

   Ei riippuvuuksia. ES5, kuten muukin prototyyppi (AGENTS.md sääntö 1).
   ========================================================================== */

var Kierros3D = (function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';

  function lerp(a, b, t) { return a + (b - a) * t; }
  function ss(a, b, t) {         // smoothstep
    var x = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return x * x * (3 - 2 * x);
  }
  function helpotus(t) {         // easeInOutCubic
    return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function vahempiLiike() {
    return !!(window.matchMedia &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function kamera(a, e, mitta) {
    a = a * Math.PI / 180; e = e * Math.PI / 180;
    var cx = Math.sin(a), cy = -Math.cos(a), ce = Math.cos(e), se = Math.sin(e);
    return {
      nakyma: [cx * ce, cy * ce, se],
      proj: function (x, y, z) {
        var u = (x * cy - y * cx) * mitta;
        var syv = -(x * cx + y * cy);
        return [u, -(z * ce + syv * se) * mitta];
      }
    };
  }

  /* Tahot luetaan kerran: pisteet taulukoiksi, keskipiste järjestystä
     varten. */
  function valmistele(t) {
    var mk = t.p.map(function (lit) {
      var p = [];
      for (var i = 0; i < lit.length; i += 3) p.push([lit[i], lit[i + 1], lit[i + 2]]);
      return p;
    });
    var k = [0, 0, 0], n = 0;
    mk[0].forEach(function (p) { k[0] += p[0]; k[1] += p[1]; k[2] += p[2]; n++; });
    return { c: t.c, mk: mk, n: t.n || null, a: t.a || null,
             k: [k[0] / n, k[1] / n, k[2] / n] };
  }

  /* == Ydin =============================================================== */

  function rakenna(isanta, data) {
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'kierros__svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    var ryhmat = [], lapset = [];
    data.ryhmat.forEach(function (r) {
      var g = document.createElementNS(SVGNS, 'g');
      g.setAttribute('class', r.luokka);
      svg.appendChild(g);
      var ryhma = { g: g, luokka: r.luokka, lapset: [] };
      r.lapset.forEach(function (l) {
        var lg = document.createElementNS(SVGNS, 'g');
        lg.setAttribute('class', l.luokka);
        g.appendChild(lg);
        var lapsi = { g: lg, ryhma: ryhma, rooli: l.rooli || l.luokka,
                      jarjesta: !!l.jarjesta, katto: !!l.katto,
                      tahot: l.tahot.map(valmistele), polut: [] };
        /* Järjestämättömillä ryhmillä on oma polku jokaiselle taholle, koska
           niissä on tahokohtaisia attribuutteja (data-vyo, fill-rule).
           Järjestettävillä polut ovat pooli, jonka luokka vaihtuu. */
        if (!lapsi.jarjesta) {
          lapsi.tahot.forEach(function (t) {
            var p = document.createElementNS(SVGNS, 'path');
            p.setAttribute('class', t.c);
            if (t.a) Object.keys(t.a).forEach(function (k) { p.setAttribute(k, t.a[k]); });
            lg.appendChild(p);
            lapsi.polut.push(p);
          });
        }
        ryhma.lapset.push(lapsi);
        lapset.push(lapsi);
      });
      ryhmat.push(ryhma);
    });
    isanta.insertBefore(svg, isanta.firstChild);

    function polku(mk, proj, dz, sz, z0) {
      var s = '';
      for (var i = 0; i < mk.length; i++) {
        var m = mk[i];
        for (var j = 0; j < m.length; j++) {
          var z = z0 + (m[j][2] - z0) * sz + dz;
          var q = proj(m[j][0], m[j][1], z);
          s += (j ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
        }
        s += 'Z';
      }
      return s;
    }
    function nakyy(n, v) {
      return !n || (n[0] * v[0] + n[1] * v[1] + n[2] * v[2]) > 1e-4;
    }

    /* Rajat yhdelle kameralle, sovitettuna laatikon kuvasuhteeseen. */
    function rajaa(kam, mukaan, reuna) {
      var r = [1e9, 1e9, -1e9, -1e9];
      ryhmat.forEach(function (ry) {
        ry.lapset.forEach(function (l) {
          if (mukaan.indexOf(ry.luokka) < 0 && mukaan.indexOf(l.rooli) < 0) return;
          l.tahot.forEach(function (tt) {
            tt.mk.forEach(function (m) {
              m.forEach(function (p) {
                var q = kam.proj(p[0], p[1], p[2]);
                if (q[0] < r[0]) r[0] = q[0]; if (q[1] < r[1]) r[1] = q[1];
                if (q[0] > r[2]) r[2] = q[0]; if (q[1] > r[3]) r[3] = q[1];
              });
            });
          });
        });
      });
      var suhde = (isanta.clientWidth / isanta.clientHeight) || 1.6;
      var w = r[2] - r[0], h = r[3] - r[1];
      var cx = (r[0] + r[2]) / 2, cy = (r[1] + r[3]) / 2;
      w *= 1 + reuna; h *= 1 + reuna;
      if (w / h < suhde) w = h * suhde; else h = w / suhde;
      return [cx - w / 2, cy - h / 2, w, h];
    }

    /* tila = { kam, vb, ryhmat: {luokka: o}, lapset: {rooli: {o, dz, sz, z0}} } */
    function piirra(tila) {
      var kam = tila.kam, v = kam.nakyma, vb = tila.vb;
      svg.setAttribute('viewBox', vb.map(function (q) { return q.toFixed(1); }).join(' '));

      ryhmat.forEach(function (ry) {
        var o = tila.ryhmat && tila.ryhmat[ry.luokka];
        if (o === undefined) return;
        ry.g.style.opacity = o.toFixed(3);
        ry.g.style.display = o <= 0.001 ? 'none' : '';
      });

      lapset.forEach(function (l) {
        var lt = (tila.lapset && tila.lapset[l.rooli]) || {};
        if (lt.o !== undefined) {
          l.g.style.opacity = lt.o.toFixed(3);
          l.g.style.display = lt.o <= 0.001 ? 'none' : '';
          if (lt.o <= 0.001) return;
        }
        if (l.ryhma.g.style.display === 'none') return;
        var dz = lt.dz || 0, sz = lt.sz === undefined ? 1 : lt.sz, z0 = lt.z0 || 0;
        if (!l.jarjesta) {
          l.tahot.forEach(function (tt, i) {
            var p = l.polut[i];
            if (nakyy(tt.n, v)) {
              p.setAttribute('d', polku(tt.mk, kam.proj, dz, sz, z0));
              p.style.display = '';
            } else {
              p.style.display = 'none';
            }
          });
          return;
        }
        var lista = [];
        l.tahot.forEach(function (tt) {
          if (nakyy(tt.n, v)) {
            lista.push({ t: tt, s: tt.k[0] * v[0] + tt.k[1] * v[1] + tt.k[2] * v[2] });
          }
        });
        lista.sort(function (a, b) { return a.s - b.s; });
        for (var i = 0; i < lista.length; i++) {
          var p = l.polut[i];
          if (!p) {
            p = document.createElementNS(SVGNS, 'path');
            l.g.appendChild(p);
            l.polut.push(p);
          }
          if (p.getAttribute('class') !== lista[i].t.c) p.setAttribute('class', lista[i].t.c);
          p.setAttribute('d', polku(lista[i].t.mk, kam.proj, dz, sz, z0));
          p.style.display = '';
        }
        for (var j = lista.length; j < l.polut.length; j++) l.polut[j].style.display = 'none';
      });
    }

    function kunKokoMuuttuu(f) {
      var odota;
      window.addEventListener('resize', function () {
        clearTimeout(odota);
        odota = setTimeout(f, 120);
      });
    }

    return { piirra: piirra, rajaa: rajaa, kunKokoMuuttuu: kunKokoMuuttuu };
  }

  /* == Kierros (talo.html) ================================================
     Yksi luku t: 0 ulkona koillisesta, 1 pohja suoraan ylhäältä. Kamera,
     katon nousu ja kerrosten häivytys ovat kaikki t:n funktioita, joten ne
     eivät voi mennä eri tahtiin. Askeleen vaihtuessa t liukuu uuteen arvoon
     (siirry); prefers-reduced-motion hyppää suoraan. */

  var KESTO = 1700;              // ms, ulkoa pohjaan

  function luo(isanta, data, ankkurit) {
    var ydin = rakenna(isanta, data);
    var K0 = data.kamerat.ulko, K1 = data.kamerat.pohja, M = data.mitta;
    var nakyma0, nakyma1, t = 0;

    function kameraT(tt) {
      return kamera(lerp(K0.a, K1.a, tt), lerp(K0.e, K1.e, tt), M);
    }
    function mitoita() {
      nakyma0 = ydin.rajaa(kameraT(0), ['k-talo', 'k-pohja'], .04);
      nakyma1 = ydin.rajaa(kameraT(1), ['k-pohja'], .06);
      piirra(t);
    }

    function piirra(tt) {
      t = tt;
      /* Tila CSS:lle: nimilaput ilmestyvät vasta kun kamera on perillä,
         muuten ne kulkisivat kääntyvän talon päällä. */
      var tila = t === 0 ? 'ulko' : (t > .9 ? 'pohja' : 'liike');
      if (isanta.getAttribute('data-kamera') !== tila) isanta.setAttribute('data-kamera', tila);

      var kam = kameraT(t);
      var vb = [0, 1, 2, 3].map(function (i) { return lerp(nakyma0[i], nakyma1[i], t); });

      /* Ulkonäkymän maalausjärjestys on kiinteä ja oikea vain koillisesta
         (riso3d.py, RYHMÄT). Siksi talo on häivytetty ennen kuin kamera on
         kääntynyt itään: t = .35 on noin 85 astetta. */
      var ulos = ss(.08, .35, t);
      ydin.piirra({
        kam: kam, vb: vb,
        ryhmat: { 'k-pohja': ulos, 'k-talo': t > .36 ? 0 : 1 - ulos },
        lapset: { 'k-katto-g': { o: 1 - ss(0, .3, t), dz: data.nosto * ss(0, .6, t) } }
      });

      /* Nimilaput seuraavat lattiaa. Prosentit, koska näkymä on sovitettu
         laatikon kuvasuhteeseen: viewBoxin osuus = laatikon osuus. */
      Object.keys(ankkurit || {}).forEach(function (k) {
        var a = data.ankkurit[k], el = ankkurit[k];
        if (!a || !el) return;
        var q = kam.proj(a.p[0], a.p[1], a.p[2]);
        el.style.left = ((q[0] - vb[0]) / vb[2] * 100).toFixed(2) + '%';
        el.style.top = ((q[1] - vb[1]) / vb[3] * 100).toFixed(2) + '%';
      });
    }

    var ajo = null;
    function siirry(tavoite) {
      if (ajo) cancelAnimationFrame(ajo);
      if (vahempiLiike() || t === tavoite) { piirra(tavoite); return; }
      /* Keskeytetty siirtymä jatkuu siitä mihin se jäi: aika skaalataan
         jäljellä olevaan matkaan, joten edestakainen vieritys ei hyppää. */
      var alku = t, matka = Math.abs(tavoite - alku), t0 = null;
      function askel(nyt) {
        if (t0 === null) t0 = nyt;
        var x = Math.min(1, (nyt - t0) / (KESTO * matka));
        piirra(lerp(alku, tavoite, helpotus(x)));
        if (x < 1) ajo = requestAnimationFrame(askel); else ajo = null;
      }
      ajo = requestAnimationFrame(askel);
    }

    mitoita();
    ydin.kunKokoMuuttuu(mitoita);
    return { siirry: siirry, piirra: piirra };
  }

  /* == Prosessi (index.html) ==============================================
     Yksi luku p askelten läpi: kokonaisosa on askel (0 tilanne, 1 hinta,
     2 rakennus, 3 muutto), desimaaliosa se kuinka pitkälle askel on
     vieritetty. Kuva seuraa vieritystä suoraan — ei ajastettua animaatiota
     — joten lukija päättää tahdin, ja taaksepäin vieritys purkaa talon.

       0     tontti, talon ääriviiva piirtyy
       1     kairauspisteet nousevat (maaperätutkimus)
       2.00  perustus nousee
       2.30  seinät kasvavat perustukselta
       2.70  katto laskeutuu paikalleen
       3     valot syttyvät (CSS, data-vaihe="muutto")

     Kamera kiertää hitaasti koko lohkon ajan, jotta kuva elää myös
     askelilla joilla mikään ei rakennu. Kierto pysyy koillisen
     neljänneksessä, jossa rungon kiinteä maalausjärjestys on oikea. */

  function prosessi(isanta, data) {
    var ydin = rakenna(isanta, data);
    var K = data.kamera, M = data.mitta, p = 0;

    function kameraP(pp) {
      return kamera(K.a + K.kierto * (pp / 4), K.e, M);
    }
    function piirra(pp) {
      p = pp;
      var kam = kameraP(p);
      ydin.piirra({
        kam: kam,
        vb: ydin.rajaa(kam, ['tontti', 'katto'], .02),
        lapset: {
          haamu:    { o: ss(.15, .7, p) * (1 - ss(2, 2.2, p)) },
          kairaus:  { o: ss(1.05, 1.3, p) * (1 - ss(2.15, 2.35, p)),
                      sz: ss(1.05, 1.45, p) },
          perustus: { o: p >= 2 ? 1 : 0, sz: ss(2, 2.3, p) },
          runko:    { o: p >= 2.3 ? 1 : 0, sz: ss(2.3, 2.7, p), z0: 300 },
          katto:    { o: ss(2.7, 2.8, p), dz: data.nosto * (1 - ss(2.7, 3, p)) }
        }
      });
    }

    function mitoita() { piirra(p); }
    piirra(0);
    ydin.kunKokoMuuttuu(mitoita);
    return { piirra: piirra };
  }

  return { luo: luo, prosessi: prosessi, vahempiLiike: vahempiLiike };
})();
