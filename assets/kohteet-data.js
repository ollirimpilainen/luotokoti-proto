/* ==========================================================================
   Luotokoti — kohteet
   Yksi lähde koko sivustolle. Käytössä kohteet.html-, kohde.html- ja
   talo.html-sivuilla.

   v4: korvaa alueet-data.js:n. Vanha ALUEET kuvasi tontteja; KOHTEET kuvaa
   hankkeita, joissa on taloja. Ero ei ole kosmeettinen: ostaja ei osta
   tonttia vaan valmiin kohteen, ja kohteella on tila, valmistumispäivä ja
   yksittäisiä taloja.

   TÄRKEÄ SÄÄNTÖ: yhtäkään kohdetietoa ei ole keksitty. Aineistossa ei ole
   yhtään kohteen nimeä, kuntaa, hintaa eikä valmistumispäivää. Jokainen
   kenttä on merkitty aukko — rakenne on olemassa, sisältö ei.

   Kentän arvo null tarkoittaa: tietoa ei ole. Renderöijä tekee siitä
   näkyvän hakasulkeisen aukon, ei tyhjää tilaa.

   TYHJÄ TILA: kun KOHTEET on tyhjä taulukko, kohteet.html renderöi
   automaattisesti tyhjän tilan osion eikä listausta. Tämä on
   hyväksymiskriteeri — kokeile vaihtamalla KOHTEET = [] ja lataa sivu
   uudelleen.
   ========================================================================== */

var KOHTEET = [
  {
    tunnus:        'kohde-1',
    nimi:          null,   /* [kohteen nimi] */
    kunta:         null,   /* [kunta] */
    alue:          null,   /* [kaupunginosa tai alue] */
    /* Yksi status. Kolme sallittua arvoa, ei enempää.
       Valmius EI ole status — ks. valmistuminen. */
    status:        'myynti',  /* 'ennakkomarkkinointi' | 'myynti' | 'myyty' */
    /* Valmistuminen EI ole status vaan päivämäärä. Muoto 'YYYY-MM'.
       null = ei tiedossa → renderöityy aukkona, ei oletuksena.        */
    valmistuminen: null,
    taloja:        null,   /* [lkm] kohteessa yhteensä */
    vapaana:       null,   /* [lkm] vapaana juuri nyt */
    hintaMin:      null,   /* kokonaishinta, pienin */
    hintaMax:      null,   /* kokonaishinta, suurin */
    /* Tontin kaava voi rajata suurimman koon. Arvo on TALO.koot-tunnus.
       null = ei tiedossa, EI "ei rajoitusta".                          */
    suurinKoko:    null,
    /* Laajennus muuton jälkeen on tonttikohtainen tieto, ei tuotetieto.
       Kohteissa vastaus on tiedossa, koska tontti on Luotokodin.
       true | false | null                                              */
    laajennus:     null,
    huomio:        null,   /* [yksi lause kohteesta] */
    /* Kartan merkintää varten. Molemmat null = kohdetta ei piirretä
       kartalle. Koordinaatteja EI johdeta kunnan nimestä: se vaatisi
       geokoodauspalvelun, eli riippuvuuden — ks. AGENTS.md sääntö 1. */
    lat:           null,
    lon:           null,
    /* Yksittäiset talot. Tyhjä taulukko renderöityy merkittynä aukkona. */
    talot:         []      /* { tunnus, koko:'mh2', neliot, hinta,
                              tila:'vapaa'|'varattu'|'myyty' }         */
  },
  {
    tunnus:        'kohde-2',
    nimi:          null,
    kunta:         null,
    alue:          null,
    /* Ennakkomarkkinointi, jotta merkintä näkyy demossa. */
    status:        'ennakkomarkkinointi',
    valmistuminen: null,
    taloja:        null,
    vapaana:       null,
    hintaMin:      null,
    hintaMax:      null,
    suurinKoko:    null,
    laajennus:     null,
    huomio:        null,
    talot:         []
  },
  {
    tunnus:        'kohde-3',
    nimi:          null,
    kunta:         null,
    alue:          null,
    /* Myyty, jotta referenssikirjaston merkintä ja kohde.html:n
       toteutunut-variantti näkyvät demossa. */
    status:        'myyty',
    valmistuminen: null,
    taloja:        null,
    vapaana:       null,
    hintaMin:      null,
    hintaMax:      null,
    suurinKoko:    null,
    laajennus:     null,
    huomio:        null,
    talot:         []
  }
];

/* KOHTEET_HUOMIO POISTETTU 20.8.2026. Teksti "Rivien määrä on rakenteen
   esittely, ei väite kohteiden määrästä" oli prototyypin oma varaus, ei
   asiakascopya: kävijä ei tiedä katsovansa rautalankaa, ja lause herätti
   epäilyn siitä ovatko listan kohteet oikeita. Sama varaus on siellä minne
   se kuuluu — muistiinpanoissa ja README:ssä. */

/* -------------------------------------------------------------------------
   Johdettu merkintä. Sama kuvio kuin kokoNimi():ssä talo-data.js:ssä:
   sääntö on koodissa kerran eikä kahdella sivulla. Ilman tätä kohteet.html
   ja kohde.html ehtivät eriytyä ensimmäisessä muutoksessa.

   Palauttaa { status, valmius } valmiina teksteinä. valmius on null jos
   tieto puuttuu — kutsuja päättää renderöikö null aukkona.

   | status               | valmistuminen  | Merkintä                       |
   |----------------------|----------------|--------------------------------|
   | myynti               | menneisyydessä | Myynnissä · Muuttovalmis nyt   |
   | myynti               | tulevaisuudessa| Myynnissä · Valmis 3/2027      |
   | myynti               | null           | Myynnissä · [valmistuminen]    |
   | ennakkomarkkinointi  | mikä tahansa   | Ennakkomarkkinoinnissa · …     |
   | myyty                | —              | Toteutunut                     |
   ------------------------------------------------------------------------- */

var KOHDE_STATUS_TEKSTI = {
  ennakkomarkkinointi: 'Ennakkomarkkinoinnissa',
  myynti:              'Myynnissä',
  myyty:               'Toteutunut'
};

/* 'YYYY-MM' → { vuosi, kk, mennyt } tai null jos muoto ei kelpaa.
   Vertailu tehdään kuukauden tarkkuudella: kohde on muuttovalmis siitä
   siitä kuukaudesta lähtien jona se valmistuu, ei vasta sen jälkeen. */
function kohdeValmistumisAika(arvo) {
  if (typeof arvo !== 'string') return null;
  var osat = /^(\d{4})-(\d{2})$/.exec(arvo);
  if (!osat) return null;
  var vuosi = parseInt(osat[1], 10);
  var kk = parseInt(osat[2], 10);
  if (kk < 1 || kk > 12) return null;
  var nyt = new Date();
  var nytLuku = nyt.getFullYear() * 12 + nyt.getMonth();   /* getMonth 0-11 */
  return { vuosi: vuosi, kk: kk, mennyt: (vuosi * 12 + (kk - 1)) <= nytLuku };
}

function kohteenMerkinta(kohde) {
  if (!kohde) return { status: null, valmius: null };

  /* Merkinnät ovat datan arvoja eivätkä copy-avaimia, joten käännös tulee
     sanakirjasta. Ks. asetukset.js, Kieliapurit. */
  var sana = (typeof ASETUKSET !== 'undefined' && ASETUKSET.sana)
    ? ASETUKSET.sana : function (t) { return t; };

  var status = KOHDE_STATUS_TEKSTI[kohde.status]
    ? sana(KOHDE_STATUS_TEKSTI[kohde.status]) : null;

  /* Toteutuneella ei ole valmiusmerkintää: kohde on ohi, eikä
     valmistumispäivä ole enää ostajan tieto vaan referenssin tieto. */
  if (kohde.status === 'myyty') return { status: status, valmius: null };

  var aika = kohdeValmistumisAika(kohde.valmistuminen);
  if (!aika) return { status: status, valmius: null };

  if (aika.mennyt && kohde.status === 'myynti') {
    return { status: status, valmius: sana('Muuttovalmis nyt') };
  }
  return { status: status,
           valmius: sana('Valmis') + ' ' + aika.kk + '/' + aika.vuosi };
}

/* Järjestys listalla: muuttovalmiit ensin, sitten valmistumispäivä
   nousevasti, tiedottomat viimeisenä. Myydyt eivät ole listalla lainkaan —
   ne ovat oma osionsa (referenssikirjasto).

   Miksi järjestys on täällä eikä renderöijässä: sama järjestys tarvitaan
   sekä kohteet.html:n listauksessa että talo.html:n nostossa, ja kaksi
   toteutusta ehtisi eriytyä. */
function kohteetJarjestyksessa(lista) {
  return (lista || []).slice().sort(function (a, b) {
    var aa = kohdeValmistumisAika(a.valmistuminen);
    var bb = kohdeValmistumisAika(b.valmistuminen);

    /* Tiedottomat viimeisenä. */
    if (!aa && !bb) return 0;
    if (!aa) return 1;
    if (!bb) return -1;

    /* Muuttovalmiit ensin. */
    if (aa.mennyt !== bb.mennyt) return aa.mennyt ? -1 : 1;

    /* Sitten valmistumispäivä nousevasti. */
    return (aa.vuosi * 12 + aa.kk) - (bb.vuosi * 12 + bb.kk);
  });
}

/* Kohteen haku tunnuksella. Käytössä kohde.html:ssä. */
function kohdeTunnuksella(tunnus) {
  var lista = (typeof KOHTEET !== 'undefined' && KOHTEET) ? KOHTEET : [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].tunnus === tunnus) return lista[i];
  }
  return null;
}
