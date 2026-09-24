/* ==========================================================================
   Luotokoti — globaalit vaihtimet ja kieli
   Ladataan ENSIMMÄISENÄ <body>-elementin sisällä, ennen muuta sisältöä.

   Miksi siellä eikä <head>issä: tässä vaiheessa document.body on jo olemassa,
   mutta mitään ei ole vielä maalattu. Attribuutit ehtivät paikalleen ennen
   ensimmäistä maalausta, joten variantit eivät välähdä väärin päin.

   Näkyvyys hoidetaan CSS:llä, ei JavaScriptillä:
     body[data-omistusmalli="a"] .v-omistus[data-malli="a"]{display:block}
   Markupia ei siis kahdenneta sivuversioiksi — jokainen variantti on
   sivulla kerran ja CSS valitsee näytettävän.

   Tila säilyy sessionStoragessa ja pysyy sivulta toiselle siirryttäessä.
   Ilman sitä vaihtimen arvo häviäisi juuri kun asiakas haluaa vertailla.
   ========================================================================== */

var ASETUKSET = (function () {
  'use strict';

  /* Oletukset. Nämä ovat prototyypin lähtötila, eivät suositus.
       omistusmalli 'a' Luotokoti omistaa tontin
                    'b' varaus kunnan tontteihin

     v4: hintamalli-vaihdin on POISTETTU. D2 ratkesi workshopissa 18.8.2026
     malliin A (konkreettinen hinta), joten b ja c ovat kuolleita
     vaihtoehtoja. Ohjauspalkki on työkalu avoimiin päätöksiin — suljettu
     päätös palkissa antaisi ymmärtää että asia on yhä auki, ja se on
     prototyypin pahin väärinymmärrys. Omistusmalli säilyy, koska se on
     edelleen auki.                                                        */
  var OLETUS = { omistusmalli: 'a', sisalto: 'placeholder', kieli: 'fi' };

  var SALLITUT = {
    omistusmalli: ['a', 'b'],
    /* aukot = rehelliset hakasulkeet · placeholder = kuvitteelliset arvot */
    sisalto:      ['aukot', 'placeholder'],
    /* KIELI EI OLE OHJAUSPALKIN VAIHDIN, vaikka se on täällä samassa
       tilamekanismissa. Palkki on työkalu avoimiin päätöksiin; kieli on
       sivuston oma ominaisuus ja se vaihdetaan headerin kielenvaihtimesta.
       Täällä se on siksi, että tämä tiedosto on ainoa joka ehtii asettaa
       attribuutin ennen ensimmäistä maalausta — väärällä kielellä
       välähtävä sivu on sama virhe kuin väärin päin välähtävä variantti. */
    kieli:        ['fi', 'sv']
  };

  var PREFIX = 'luotokoti:';

  function lue(nimi) {
    var arvo = null;
    try { arvo = window.sessionStorage.getItem(PREFIX + nimi); }
    catch (e) { /* private mode — vaihtimet toimivat, tila ei säily */ }
    return SALLITUT[nimi].indexOf(arvo) > -1 ? arvo : OLETUS[nimi];
  }

  /* Kieli tulee osoitteesta (?lang=sv) tai sessiosta. Osoite voittaa, koska
     linkki on jaettava: kun joku lähettää ruotsinkielisen sivun linkin, sen
     pitää avautua ruotsiksi vaikka selaimen sessiossa olisi suomi. Arvo
     tallennetaan, joten kieli säilyy sivulta toiselle ilman että jokaiseen
     sisäiseen linkkiin pitää liimata parametri. */
  /* Parametrin nimi ja asetuksen nimi ovat eri asia: osoitteessa on
     ?lang=sv, koska se on kansainvälisesti luettava, ja asetus on 'kieli'
     kuten muu koodi. Siksi molemmat annetaan erikseen. */
  function urlArvo(parametri, asetus) {
    var haku = String(window.location.search || '');
    var osuma = new RegExp('[?&]' + parametri + '=([^&#]*)').exec(haku);
    if (!osuma) return null;
    var arvo = decodeURIComponent(osuma[1]);
    return SALLITUT[asetus].indexOf(arvo) > -1 ? arvo : null;
  }

  function kirjoita(nimi, arvo) {
    try { window.sessionStorage.setItem(PREFIX + nimi, arvo); }
    catch (e) { /* ei mitään — vaihdin toimii silti tällä sivulla */ }
  }

  function aseta(nimi, arvo) {
    if (SALLITUT[nimi].indexOf(arvo) === -1) return;
    kirjoita(nimi, arvo);
    document.body.setAttribute('data-' + nimi, arvo);
    /* Sisältötila vaikuttaa datatiedostoihin, jotka paikataan latauksessa,
       joten se vaatii uudelleenlatauksen. Kieli samoin: copy ja datan
       tekstit renderöidään kertaalleen latauksessa, eikä puolittainen
       vaihto ole vaihto. Muut vaihtimet eivät vaadi latausta. */
    if (nimi === 'sisalto' || nimi === 'kieli') { window.location.reload(); return; }
    /* Painikkeiden tila päivitetään vain jos ne on jo rakennettu. */
    paivitaPainikkeet(nimi, arvo);
    if (window.console) {
      console.log('[luotokoti-proto] proto_asetus_' + nimi + '_' + arvo);
    }
  }

  function paivitaPainikkeet(nimi, arvo) {
    var napit = document.querySelectorAll('[data-asetus="' + nimi + '"]');
    for (var i = 0; i < napit.length; i++) {
      var on = napit[i].getAttribute('data-arvo') === arvo;
      napit[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }


  /* == Kieliapurit ========================================================

     KAKSI KÄÄNNÖSREITTIÄ, KAKSI ERI SÄÄNTÖÄ. Tämä on tarkoituksellinen ero
     eikä epäjohdonmukaisuus:

       COPY / COPY_SV        sivuston omat lauseet, avain per lause.
                             Puuttuva käännös renderöityy merkittynä
                             aukkona — sivusto ei koskaan sano mitään
                             puoliksi käännettynä. (proto.js, renderCopy)

       COPY_SV.sanat         datan ja koodin arvot: huoneiden nimet,
                             aukkojen selitteet, statusmerkinnät,
                             placeholder-arvot. Avain on suomenkielinen
                             arvo itse, koska niillä ei ole avainta —
                             talo-data.js:ssä on 'Elementtitalo', ei
                             'tekniset.rakenteet.arvo'. Puuttuva käännös
                             palauttaa suomen ja kirjautuu konsoliin.

     Miksi jälkimmäinen ei ole aukko: nämä ovat arvoja eivätkä lauseita, ja
     merkitty aukko jokaisen kääntämättömän huoneennimen tilalla tekisi
     pohjapiirustuksesta lukukelvottoman. Arvo joka on väärällä kielellä on
     luettava; aukko joka on oikealla kielellä ei ole. Puute ei silti jää
     huomaamatta: kieliRaportti() luettelee kaikki kääntämättömät arvot, ja
     sama lista on työkalussa.

     Avaimena suomenkielinen arvo tarkoittaa myös, että suomen muuttaminen
     pudottaa käännöksen pois. Se on tässä oikea käyttäytyminen: muutettu
     lause EI ole enää sama lause, ja kääntäjän pitää nähdä se uudelleen. */

  var kaantamattomat = {};

  function sana(fi) {
    if (typeof fi !== 'string' || !fi) return fi;
    if (tila.kieli === 'fi') return fi;

    var sanat = (typeof COPY_SV !== 'undefined' && COPY_SV && COPY_SV.sanat)
      ? COPY_SV.sanat : null;

    /* SIDOTUT VÄLILYÖNNIT NORMALISOIDAAN HAUSSA. Datassa on sidottuja
       välilyöntejä ("1\u00a0kerros", "3\u00a0h\u00a0+\u00a0k"), koska luku ja
       yksikkö eivät saa katketa riviltä. Sanakirjan avaimissa on tavallinen
       välilyönti — se on luettava ja kirjoitettava. Ilman normalisointia
       jokainen tällainen arvo jäisi kääntämättä, ja syy olisi näkymätön:
       kaksi merkkijonoa jotka näyttävät samalta mutta eivät ole samat. */
    var avain = fi.replace(/\u00a0/g, ' ');
    if (sanat && Object.prototype.hasOwnProperty.call(sanat, avain) && sanat[avain]) {
      var arvo = sanat[avain];
      /* Sidonta palautetaan käännökseen: lyhyt arvo on luku yksikön kanssa,
         ja sen typografinen tarkoitus on sama molemmilla kielillä. Raja on
         kolme välilyöntiä, jotta lauseet eivät koskaan sido sanojaan. */
      if (fi.indexOf('\u00a0') > -1 && arvo.split(' ').length <= 4) {
        arvo = arvo.replace(/ /g, '\u00a0');
      }
      return arvo;
    }

    /* HAKU TEHDÄÄN AINA, LOKITUS EI. Arvo jossa ei ole kolmen kirjaimen
       jaksoa ei ole lause vaan luku yksikön kanssa ("86 m²", "3 h + k"), ja
       paikanvaraaja ("XXX XXX €") ei ole kieltä lainkaan. Ne saavat silti
       käännöksen jos sanakirjassa on avain — tämä ehto koskee vain
       raporttia, joka muuten täyttyisi luvuista ja oikeat puutteet
       hukkuisivat. */
    if (/[A-Za-zÅÄÖÜåäöü]{3,}/.test(avain) && !/^[X\s\d.,€%+–—-]+$/.test(avain)) {
      /* Raportissa avain normalisoituna: sidottu välilyönti näyttää
         konsolissa samalta kuin tavallinen, ja kopioitava avain on se jonka
         sanakirjaan kirjoitetaan. */
      kaantamattomat[avain] = true;
    }
    return fi;
  }

  /* Aukon selite kulkee samaa reittiä: "[paikkakunta]" on ruotsiksi
     "[ort]", eikä hakasulkeissa oleva suomenkielinen sana ole ruotsalaiselle
     lukijalle sen ymmärrettävämpi kuin muukaan suomi. */
  function kieliRaportti() {
    var lista = Object.keys(kaantamattomat);
    if (lista.length && window.console) {
      console.warn('[luotokoti-proto] kääntämätön arvo (' + lista.length +
                   '): ' + lista.join(' · '));
    }
    /* Palauttaa listan, jotta sen voi lukea myös konsolista ohjelmallisesti:
       tarkistuslista käännöstyön aikana on juuri tämä lista. */
    return lista;
  }

  /* Attribuutit paikalleen heti. Tämä on koko tiedoston tärkein rivi:
     se ajetaan ennen kuin sivun sisältö on jäsennetty. */
  var urlKieli = urlArvo('lang', 'kieli');
  if (urlKieli) kirjoita('kieli', urlKieli);

  var tila = {
    omistusmalli: lue('omistusmalli'),
    sisalto:      lue('sisalto'),
    kieli:        urlKieli || lue('kieli')
  };
  document.body.setAttribute('data-omistusmalli', tila.omistusmalli);
  document.body.setAttribute('data-sisalto', tila.sisalto);
  document.body.setAttribute('data-kieli', tila.kieli);
  /* lang-attribuutti on <html>-elementissä eikä bodyssä: se on ruudunlukijan
     ja tavutuksen kieli, ja markupissa oleva lang="fi" on vain lähtöarvo. */
  document.documentElement.setAttribute('lang', tila.kieli);

  return {
    hae: function (nimi) { return document.body.getAttribute('data-' + nimi); },
    aseta: aseta,
    paivitaPainikkeet: paivitaPainikkeet,
    sallitut: SALLITUT,
    kieli: function () { return tila.kieli; },
    sana: sana,
    kieliRaportti: kieliRaportti
  };
})();
