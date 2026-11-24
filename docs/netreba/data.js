/**
 * ============================================================================
 * KONFIGURAČNÍ SOUBOR NABÍDKY — STAVEBNÍ CELEK NETŘEBA (1 743 m²)
 * ============================================================================
 * Veškeré texty, parametry parcel, cesty k obrázkům, mapa, dojezdové časy,
 * odkazy na PDF podklady i kontaktní údaje můžete upravit přímo zde,
 * aniž byste museli zasahovat do HTML, CSS nebo JavaScriptu.
 *
 * Obrázky a PDF soubory ukládejte do složky ./assets/
 * ============================================================================
 */

window.SITE_DATA = {
  // Základní metadata a hlavička webu
  meta: {
    pageTitle: "Stavební pozemek Netřeba | Celek 1 743 m² (p.č. 119/19 a 11/4)",
    pageDescription:
      "Přímý prodej stavebního celku o celkové výměře 1 743 m² v k.ú. Netřeba, obec Úžice, okres Mělník (LV č. 495). Hlavní parcela p.č. 11/4 (1 646 m²) s vlastní vjezdovou parcelou p.č. 119/19 (97 m²). Cena 7 490 000 Kč.",
    brandTitle: "Parcely Netřeba",
    brandSubtitle: "k.ú. Netřeba [704008] · LV č. 495",
  },

  // Položky horní navigace
  navigation: {
    links: [
      { label: "Přehled", href: "#prehled" },
      { label: "Interaktivní pohledy", href: "#pohledy" },
      { label: "Parametry", href: "#parametry" },
      { label: "Lokalita", href: "#lokalita" },
      { label: "Kontakt", href: "#kontakt" },
    ],
    ctaLabel: "Stáhnout PDF prospekt",
    ctaHref: "assets/prospekt-netreba.pdf",
    ctaDownloadName: "Prospekt-Parcely-Netreba.pdf",
  },

  // 1. Úvodní Hero sekce
  hero: {
    eyebrow: "Přímý prodej stavebního celku · bez provize RK",
    title: "Stavební celek v Netřebě\no celkové rozloze 1 743 m²\ns vlastním vjezdem z ulice",
    location: "Netřeba se nachází 20 km severně od Prahy, na dálnici D8 je to jen pár minut. Přímo z Netřeby jezdí autobus PID č. 373 do Prahy-Kobylis k metru C (asi 35 minut), k dispozici je i železniční zastávka Netřeba na trati Kralupy – Neratovice. V sousední Odolené Vodě, vzdálené 3 km, je veškerá občanská vybavenost – lékárna, pošta, škola i obchody.",
    subtitle:
      "Dvě na sebe navazující parcely p.č. 119/19 (97 m²) a p.č. 11/4 (1 646 m²) prodávané výhradně společně jako jeden funkční celek. Vjezd ze severu ze silnice p.č. 128/2, slunná zahrada otevřená na jih do volné krajiny.",
    backgroundImage: "assets/hero-drone-marked.svg",
    backgroundAlt: "Letecký snímek stavebního celku p.č. 119/19 a 11/4 v lokalitě Netřeba se zákresem hranic",
    primaryCta: {
      label: "Interaktivní prohlídka",
      href: "#pohledy",
    },
    secondaryCta: {
      label: "Stáhnout PDF prospekt",
      href: "assets/prospekt-netreba.pdf",
      downloadName: "Prospekt-Parcely-Netreba.pdf",
    },
    stats: [
      { label: "Celková výměra", value: "1 743 m²", note: "p.č. 119/19 (97 m²) + 11/4 (1 646 m²)" },
      { label: "Kupní cena celku", value: "7 490 000 Kč", note: "cca 4 300 Kč/m² · výhradně společně · bez provize RK" },
      { label: "Lokalita a katastr", value: "Netřeba", note: "Obec Úžice, okr. Mělník · LV č. 495" },
      { label: "Územní plán", value: "Plocha SV", note: "Potvrzeno SÚ (č.j. R/2026/112742/4)", href: "dokumenty/", linkLabel: "předběžná informace" },
    ],
  },

  // 2. Interaktivní prohlížeč pohledů (zákresy, geometrický plán a vrstvy katastru ČÚZK)
  viewer: {
    eyebrow: "Interaktivní prohlídka pozemků",
    title: "Prozkoumejte stavební celek z každého úhlu",
    subtitle:
      "Prohlédněte si pozemky z dronu, v geometrickém plánu i z ulice. V katastru můžete stejně jako v Nahlížení do katastru přepínat mapu, letecký snímek nebo obojí najednou. Po najetí na parcelu uvidíte její výměru a rozměry, kliknutím ji otevřete v Nahlížení do katastru.",
    sliderHint: "Najetím na parcelu zobrazíte její údaje, kliknutím ji otevřete v Nahlížení do katastru. Klik mimo parcelu přepne zákres.",
    defaultBeforeLabel: "Čistý pohled",
    defaultAfterLabel: "Vyznačené parcely",
    fullscreenLabel: "Celá obrazovka",
    closeFullscreenLabel: "Zavřít náhled",
    droneModes: {
      cleanLabel: "Čistý pohled",
      markedLabel: "Vyznačené parcely",
      overlayLabel: "Překryv geometrického plánu",
      opacityLabel: "Průhlednost geometrického plánu",
    },
    views: [
      {
        id: "katastr",
        tabLabel: "Katastr (mapa / snímek)",
        title: "Katastrální mapa a letecký snímek — p.č. 11/4 a p.č. 119/19",
        cameraPosition: "Data ČÚZK · k.ú. Netřeba [704008] · hranice parcel z katastru nemovitostí",
        description:
          "Skutečné hranice obou parcel přímo z katastru. Přepínejte mezi katastrální mapou, leteckým snímkem a jejich kombinací stejně jako v Nahlížení do katastru. Hlavní parcela p.č. 11/4 (1 646 m², tvar písmene L) navazuje na vlastní vjezd p.č. 119/19 (97 m²) ze silnice p.č. 128/2 na severu.",
        cleanImage: "assets/katastr-mapa.png",
        markedImage: "assets/katastr-mapa.png",
        supportsPlanOverlay: false,
        isMapView: true,
        layers: {
          defaultLayer: "snimek",
          highlightLabel: "Zvýraznit parcely",
          credit: "Zdroj: ČÚZK – katastrální mapa a ortofoto",
          hint: "Vrstvy přepnete tlačítky nad mapou. Najetím na parcelu zobrazíte její údaje, kliknutím ji otevřete v Nahlížení do katastru.",
          mapImage: "assets/katastr-mapa.png",
          photoImage: "assets/katastr-snimek.jpg",
          linesImage: "assets/katastr-mapa-linie.png",
          highlightMapImage: "assets/katastr-zvyrazneni-mapa.svg",
          highlightPhotoImage: "assets/katastr-zvyrazneni-snimek.svg",
          items: [
            { id: "mapa", label: "Mapa KN", thumb: "assets/katastr-nahled-mapa.jpg" },
            { id: "snimek", label: "Letecký snímek", thumb: "assets/katastr-nahled-snimek.jpg" },
            { id: "mapa-snimek", label: "Mapa + snímek", thumb: "assets/katastr-nahled-mapa-snimek.jpg" },
          ],
        },
        links: [
          { label: "p.č. 11/4 v Nahlížení do katastru", href: "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?typ=parcela&id=103663029010" },
          { label: "p.č. 119/19 v Nahlížení do katastru", href: "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?typ=parcela&id=103663030010" },
        ],
        metaTags: ["Data ČÚZK", "p.č. 11/4 + p.č. 119/19", "Celkem 1 743 m²"],
      },
      {
        id: "drone",
        tabLabel: "Záběry z dronu",
        title: "Kolmý letecký pohled na celý stavební celek",
        cameraPosition: "Ilustrační náhled dle souřadnic S-JTSK · vjezd ze severu (p.č. 128/2), otevření na jih",
        description:
          "Přehled reálného tvaru hlavní stavební parcely p.č. 11/4 (1 646 m², tvar písmene L) a navazující vlastní vjezdové parcely p.č. 119/19 (97 m²). Přímý vjezd vede ze severu z šikmé silnice p.č. 128/2, dlouhá jižní hrana (70,08 m) sousedí s volným polem p.č. 21/1.",
        cleanImage: "assets/drone-clean.svg",
        markedImage: "assets/drone-marked.svg",
        planOverlayImage: "assets/drone-plan-overlay.svg",
        supportsPlanOverlay: true,
        defaultOverlayOpacity: 68,
        beforeLabel: "Ilustrační pohled",
        afterLabel: "Vyznačené parcely",
        metaTags: ["Celkem 1 743 m²", "p.č. 119/19 + p.č. 11/4", "Vjezd ze severu (p.č. 128/2)"],
      },
      {
        id: "plan",
        tabLabel: "Geometrický plán",
        title: "Geometrický plán GP č. 169-26004/2026 vs. katastrální mapa",
        cameraPosition: "Originální podklad ČÚZK · Ing. Lubomír Pavlíček · souhlas KÚ Mělník PGP-279/2026-206",
        description:
          "Přepínejte mezi katastrální mapou se zvýrazněnou parcelou p.č. 11/4 a 2. stranou úředně ověřeného geometrického plánu č. 169-26004/2026 se seznamem souřadnic S-JTSK a kótami hranic.",
        cleanImage: "assets/katastr-11-4.png",
        markedImage: "assets/gp-realny.png",
        supportsPlanOverlay: false,
        isMapView: true,
        beforeLabel: "Katastrální mapa (11/4)",
        afterLabel: "Geometrický plán 2026",
        metaTags: ["GP č. 169-26004/2026", "PGP-279/2026-206", "Zapsáno v katastru 2026"],
      },
      {
        id: "katastr-119-19",
        tabLabel: "Detail vjezdu (119/19)",
        title: "Detail katastrální mapy — vlastní vjezdová parcela p.č. 119/19 (97 m²)",
        cameraPosition: "Detailní výřez z katastrální mapy ČÚZK · napojení na silnici p.č. 128/2",
        description:
          "Detailní katastrální pohled na vlastní vjezdovou parcelu p.č. 119/19 (97 m², ostatní komunikace), která zajišťuje nezávislý přímý vjezd ze severní veřejné komunikace p.č. 128/2 (šířka u silnice 7,40 m, délka 9,89 m, šířka napojení na p.č. 11/4 je 12,37 m).",
        cleanImage: "assets/katastr-119-19.png",
        markedImage: "assets/katastr-119-19.png",
        supportsPlanOverlay: false,
        isMapView: true,
        singleImage: true,
        beforeLabel: "Katastrální mapa ČÚZK · vjezd p.č. 119/19",
        metaTags: ["p.č. 119/19 · 97 m²", "Šířka 7,40 m · délka 9,89 m", "Napojení na 11/4: 12,37 m"],
      },
      {
        id: "street",
        tabLabel: "Vjezd z ulice",
        title: "Vjezd ze severu z komunikace p.č. 128/2",
        cameraPosition: "Ilustrační náhled ze severní komunikace p.č. 128/2 · pohled do p.č. 119/19",
        description:
          "Pohled ze severní veřejné silnice p.č. 128/2 směrem na jih do vlastní vjezdové parcely p.č. 119/19 (šířka 7,40 m, délka 9,89 m), která se v napojení na hlavní pozemek p.č. 11/4 otevírá do šířky 12,37 m.",
        cleanImage: "assets/street-clean.svg",
        markedImage: "assets/street-marked.svg",
        supportsPlanOverlay: false,
        beforeLabel: "Čistý náhled",
        afterLabel: "Hranice a šířky vjezdu",
        metaTags: ["Silnice p.č. 128/2", "Šířka u silnice 7,40 m", "Napojení 12,37 m"],
      },
      {
        id: "side",
        tabLabel: "Stranové náhledy",
        title: "Stranový pohled na tvar L (p.č. 11/4) a jižní otevření",
        cameraPosition: "Ilustrační náhled z jihozápadu · orientace k volné ploše p.č. 21/1",
        description:
          "Stranový pohled zdůrazňuje reálný tvar písmene L hlavní parcely p.č. 11/4 a velkorysou jižní hranu délky 70,08 m navazující na volné pole p.č. 21/1. Otevřená jižní expozice zajišťuje celodenní slunce.",
        cleanImage: "assets/side-clean.svg",
        markedImage: "assets/side-marked.svg",
        supportsPlanOverlay: false,
        beforeLabel: "Čistý náhled",
        afterLabel: "Zákres hranic a orientace",
        metaTags: ["Jižní hrana 70,08 m", "Východní hranice 26,62 m", "Orientace na jih"],
      },
      {
        id: "fence",
        tabLabel: "Od plotu",
        title: "Pohled od oplocení přes p.č. 11/4 k východní hranici",
        cameraPosition: "Ilustrační náhled od západního oplocení · průběh východní hranice 26,62 m",
        description:
          "Reálné měřítko hlavní parcely p.č. 11/4 (1 646 m²) z úrovně očí. Zákres přehledně vyznačuje průběh východní hranice dlouhé 26,62 m směrem k sousední parcele p.č. 11/2.",
        cleanImage: "assets/fence-clean.svg",
        markedImage: "assets/fence-marked.svg",
        supportsPlanOverlay: false,
        beforeLabel: "Čistý náhled",
        afterLabel: "Zákres hranice",
        metaTags: ["Východní hranice 26,62 m", "Výměra p.č. 11/4: 1 646 m²", "Soukromí a zeleň"],
      },
    ],
  },

  // 3. Přehled obou parcel a technické parametry
  parcelsSection: {
    eyebrow: "Přehled prodávaného celku a úřední parametry",
    title: "Dvě navazující parcely jako jeden funkční celek 1 743 m²",
    subtitle:
      "Parcely p.č. 119/19 a p.č. 11/4 zapsané na LV č. 495 v k.ú. Netřeba [704008], obec Úžice [535257], se prodávají výhradně společně — hlavní stavební pozemek s vlastním přímým vjezdem z obecní silnice.",
    purchaseBanner: {
      title: "Potvrzená zastavitelnost — předběžná informace MěÚ Kralupy nad Vltavou (1. 6. 2026)",
      text: "Stavební úřad MěÚ Kralupy nad Vltavou vydal dne 1. 6. 2026 předběžnou informaci č.j. R/2026/112742/4 potvrzující, že p.č. 11/4 leží ve stávajícím zastavěném území v ploše „SV – plochy smíšené obytné – venkovské“ (ÚP Úžice po Změně č. 6, účinnost od 31. 12. 2021) a výstavba nového samostatného rodinného domu je možná. Regulativy: max. 1 NP + podkroví, min. koeficient zeleně 30 % (v zastavěném území lze přiměřeně snížit); nepřípustné jsou bytové domy, řadové domy, dvojdomy a ubytovny.",
    },
    parcels: [
      {
        id: "parcela-119-19",
        cadastreUrl:
          "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?typ=parcela&id=103663030010",
        cadastreLabel: "Nahlížení do katastru",
        name: "Vlastní vjezdová parcela",
        badge: "Přímý vjezd",
        accent: "secondary",
        cadastralNumber: "p.č. 119/19 · LV č. 495",
        area: "97 m²",
        dimensions: "šířka 7,40 m · délka 9,89 m · napojení 12,37 m",
        landType: "Ostatní plocha (ostatní komunikace)",
        orientation: "Sever (napojení na p.č. 128/2)",
        orientationNote:
          "Zajišťuje vlastní, právně i stavebně nezávislý přímý vjezd ze severní veřejné komunikace p.č. 128/2 přímo na hlavní stavební parcelu p.č. 11/4 bez věcných břemen přes cizí pozemky.",
        purchaseOption: "Nedílná součást celku 1 743 m²",
        price: "V ceně celku",
        highlights: [
          "Přímé napojení na veřejnou komunikaci p.č. 128/2 (šířka 7,40 m)",
          "Komfortní délka 9,89 m a rozšíření napojení na p.č. 11/4 o šířce 12,37 m",
          "Výlučné vlastnictví na stejném LV č. 495 bez omezení",
        ],
      },
      {
        id: "parcela-11-4",
        cadastreUrl:
          "https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?typ=parcela&id=103663029010",
        cadastreLabel: "Nahlížení do katastru",
        name: "Hlavní stavební parcela",
        badge: "Hlavní pozemek",
        accent: "primary",
        cadastralNumber: "p.č. 11/4 · LV č. 495",
        area: "1 646 m²",
        dimensions: "jižní hrana cca 70,08 m · východní 26,62 m",
        landType: "Zahrada (ZPF, BPEJ 10600)",
        orientation: "Jih",
        orientationNote:
          "Hlavní pozemek a budoucí zahrada jsou otevřené směrem na jih k volné ploše p.č. 21/1. Vjezd a vstup na pozemek je ze severu přes vlastní parcelu p.č. 119/19.",
        purchaseOption: "Výhradně jako celek s p.č. 119/19 (1 743 m²)",
        price: "7 490 000 Kč (včetně p.č. 119/19)",
        highlights: [
          "Zastavěné území – plocha „SV – smíšené obytné – venkovské“",
          "Předběžná informace SÚ č.j. R/2026/112742/4 potvrzuje výstavbu RD",
          "Hranice zaměřeny a zapsány v katastru v roce 2026 (GP č. 169-26004/2026)",
        ],
      },
    ],
    specsTitle: "Úřední parametry, regulativy a inženýrské sítě",
    specsSubtitle:
      "Ověřené údaje z katastru nemovitostí (LV č. 495), geometrického plánu, územního plánu obce Úžice a vyjádření správců sítí.",
    specs: [
      {
        category: "Územní plán",
        label: "Zastavitelnost a regulativy",
        value: "Plocha SV – smíšené obytné – venkovské (ÚP Úžice po Změně č. 6)",
        detail:
          "Předběžná informace MěÚ Kralupy nad Vltavou ze dne 1. 6. 2026 (č.j. R/2026/112742/4) potvrzuje možnost výstavby nového samostatného RD. Max. 1 NP + podkroví, min. koeficient zeleně 30 % (v zastavěném území lze přiměřeně snížit); nepřípustné jsou bytové domy, řadové domy, dvojdomy a ubytovny.",
        href: "dokumenty/",
        linkLabel: "předběžná informace",
        status: "ready",
        statusText: "Potvrzeno SÚ",
      },
      {
        category: "Geometrický plán",
        label: "Vymezení a zápis hranic",
        value: "GP č. 169-26004/2026 (Ing. Lubomír Pavlíček)",
        detail:
          "Souhlas KÚ Mělník č. PGP-279/2026-206. Hranice parcel p.č. 119/19 (97 m²) a p.č. 11/4 (1 646 m²) byly v roce 2026 zaměřeny a zapsány v katastru nemovitostí.",
        status: "ready",
        statusText: "Zapsáno v KN",
      },
      {
        category: "Doprava",
        label: "Vjezdová komunikace",
        value: "Vlastní vjezd přes p.č. 119/19 ze severní silnice p.č. 128/2",
        detail:
          "Vjezdová parcela p.č. 119/19 (97 m², ostatní komunikace) napojuje hlavní pozemek přímo na veřejnou komunikaci p.č. 128/2 (šířka u silnice 7,40 m, délka 9,89 m, šířka napojení na p.č. 11/4 je 12,37 m).",
        status: "ready",
        statusText: "Vlastní vjezd",
      },
      {
        category: "Inženýrské sítě",
        label: "Elektřina (NN)",
        value: "Nadzemní elektrické vedení NN",
        detail: "Inženýrské sítě – elektřina NN: nadzemní elektrické vedení, nachází se na kraji pozemku.",
        status: "ready",
        statusText: "Nadzemní vedení",
      },
      {
        category: "Inženýrské sítě",
        label: "Pitná voda",
        value: "Veřejný vodovodní řad v přilehlé komunikaci",
        detail: "Veřejný vodovod vede v přilehlé komunikaci p.č. 128/2 u severního vjezdu na pozemek. Potvrzeno informací Středočeských vodáren č.j. PVO2611136/EXS ze dne 24. 11. 2026.",
        href: "dokumenty/vodovod/",
        linkLabel: "Informace o existenci sítí",
        status: "ready",
        statusText: "V komunikaci",
      },
      {
        category: "Inženýrské sítě",
        label: "Kanalizace / odpadní vody",
        value: "Individuální řešení na pozemku (ČOV nebo jímka)",
        detail: "Odpadní vody se řeší individuálně na pozemku pomocí domovní čistírny odpadních vod nebo bezodtoké jímky.",
        status: "info",
        statusText: "Domovní ČOV / jímka",
      },
      {
        category: "Inženýrské sítě",
        label: "Plyn",
        value: "V obci není zaveden",
        detail: "",
        status: "info",
        statusText: "Není v obci",
      },
      {
        category: "Inženýrské sítě",
        label: "Sdělovací sítě Skupiny ČEZ",
        value: "Bez kolizního vedení v zájmovém území (sdělení č. 0201911621)",
        detail: "Dle informativního situačního výkresu Skupiny ČEZ se v zájmovém území nenachází kolizní optické ani metalické vedení.",
        status: "ready",
        statusText: "Bez kolizí",
      },
      {
        category: "Právní stav",
        label: "Vlastnictví a zatížení",
        value: "Výlučné osobní vlastnictví (LV č. 495), bez zatížení",
        detail:
          "k.ú. Netřeba [704008], obec Úžice [535257], okres Mělník. Pozemky jsou bez omezení vlastnického práva, zástavních práv či věcných břemen.",
        status: "ready",
        statusText: "Čisté LV č. 495",
      },
    ],
  },

  // 4. Lokalita a orientace v mapě
  locationSection: {
    eyebrow: "Lokalita a dostupnost",
    title: "Netřeba — klid venkova na dosah Prahy",
    subtitle:
      "Komorní část obce Úžice v okrese Mělník spojuje klidné bydlení uprostřed zeleně s výborným napojením na dálnici D8 a kompletní občanskou vybaveností v nedalekých Kralupech nad Vltavou.",
    highlights: [
      {
        icon: "leaf",
        title: "Klidný okraj zástavby",
        text: "Jižní hrana 70,08 m navazuje na volnou plochu p.č. 21/1 v bezprostřední blízkosti přírody.",
      },
      {
        icon: "sun",
        title: "Ideální orientace na jih",
        text: "Vjezd ze severu ze silnice p.č. 128/2 nechává celou jižní část pozemku pro slunnou zahradu.",
      },
      {
        icon: "school",
        title: "Občanská vybavenost poblíž",
        text: "Zázemí v obci Úžice a Odolena Voda, kompletní školy, lékaři, obchody a vlakové spojení v Kralupech (8 min).",
      },
      {
        icon: "road",
        title: "Rychlé spojení po D8",
        text: "Na nájezd dálnice D8 (exit 9 Úžice) dojedete za 6 minut, na severní okraj Prahy za pouhých 20 minut.",
      },
    ],
    map: {
      title: "Poloha v mapě — Netřeba (k.ú. Netřeba [704008], obec Úžice)",
      // Lze snadno nahradit vlastním iframe kódem z Mapy.cz (Sdílet -> Vložit mapu) nebo Google Maps
      embedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=14.4164%2C50.2580%2C14.4324%2C50.2650&layer=mapnik&marker=50.26150%2C14.42438",
      externalMapUrl: "https://mapy.cz/letecka?source=coor&id=14.42438%2C50.26150&x=14.42438&y=50.26150&z=18",
      externalMapLabel: "Otevřít přesnou polohu na Mapy.cz",
      coordinates: "50.26150° N, 14.42438° E",
      caption: "Orientační vymezení lokality Netřeba · parcely p.č. 119/19 a 11/4",
    },
    driveTimesTitle: "Dojezdové časy autem",
    driveTimes: [
      { place: "Odolena Voda (obchody, ZŠ, MŠ)", time: "3 min", distance: "3 km" },
      { place: "Nájezd na dálnici D8 (exit Úžice)", time: "6 min", distance: "5,2 km" },
      { place: "Kralupy nad Vltavou (centrum, vlak)", time: "8 min", distance: "6,2 km" },
      { place: "Mělník", time: "18 min", distance: "16 km" },
      { place: "Praha – Letňany / Kobylisy (metro C)", time: "20 min", distance: "22 km" },
      { place: "Letiště Václava Havla Praha", time: "28 min", distance: "31 km" },
    ],
  },

  // 5. Stažení podkladů a přímý kontakt
  documentsSection: {
    eyebrow: "Dokumenty ke stažení",
    title: "Kompletní podklady v PDF",
    subtitle:
      "Stáhněte si přehledný informační prospekt pro tisk či offline prohlížení i zapsaný geometrický plán GP č. 169-26004/2026 s přesnými rozměry obou parcel.",
    downloads: [
      {
        id: "prospekt",
        badge: "PDF prospekt · celek 1 743 m²",
        title: "Kompletní PDF prospekt nabídky",
        description:
          "Souhrnná prezentace stavebního celku p.č. 119/19 (97 m²) a p.č. 11/4 (1 646 m²) včetně fotografií, rozměrů, potvrzení zastavitelnosti a informací o lokalitě Netřeba.",
        fileUrl: "assets/prospekt-netreba.pdf",
        downloadName: "Prospekt-Parcely-Netreba.pdf",
        meta: "Formát PDF · cena celku 7 490 000 Kč",
        buttonLabel: "Stáhnout PDF prospekt",
        primary: true,
      },
      {
        id: "plan",
        badge: "GP č. 169-26004/2026 · PGP-279/2026-206",
        title: "Geometrický plán (p.č. 119/19 a 11/4)",
        description:
          "Úředně ověřený geometrický plán vyhotovený Ing. Lubomírem Pavlíčkem se souhlasem KÚ Mělník (PGP-279/2026-206), zapsaný v katastru nemovitostí v roce 2026.",
        fileUrl: "assets/geometricky-plan-netreba.pdf",
        downloadName: "Geometricky-plan-169-26004-2026-Netreba.pdf",
        meta: "Formát PDF · k.ú. Netřeba [704008]",
        buttonLabel: "Stáhnout geometrický plán",
        primary: false,
      },
      {
        id: "predbezna-informace",
        badge: "MěÚ Kralupy n. Vlt. · č.j. R/2026/112742/4",
        title: "Předběžná informace stavebního úřadu",
        description:
          "Předběžná informace ze dne 1. 6. 2026 potvrzující, že p.č. 11/4 leží v zastavěném území v ploše SV a výstavba nového samostatného rodinného domu je možná. Zveřejněna je věcná část (strany 2–4 z 5).",
        fileUrl: "dokumenty/vyjadreni-SU-R-2026-112742-4.pdf",
        downloadName: "Predbezna-informace-SU-R-2026-112742-4-Netreba.pdf",
        meta: "Formát PDF · p.č. 11/4, k.ú. Netřeba",
        buttonLabel: "Stáhnout předběžnou informaci",
        primary: false,
      },
      {
        id: "vodovod",
        badge: "Středočeské vodárny · č.j. PVO2611136/EXS",
        title: "Informace o existenci sítí (vodovod)",
        description:
          "Situace zájmového území ze dne 24. 11. 2026 se zákresem provozovaného vodovodu v přilehlé komunikaci u vjezdové parcely p.č. 119/19.",
        fileUrl: "dokumenty/vodovod/SVAS-PVO2611136-EXS-situace.pdf",
        downloadName: "Informace-o-existenci-siti-SVAS-PVO2611136-Netreba.pdf",
        meta: "Formát PDF · p.č. 119/19, k.ú. Netřeba",
        buttonLabel: "Stáhnout mapku vodovodu",
        primary: false,
      },
    ],
  },

  contactSection: {
    eyebrow: "Přímý kontakt",
    title: "Domluvte si osobní prohlídku v Netřebě",
    subtitle:
      "Rád vám zašlu kompletní podklady včetně předběžné informace stavebního úřadu a vyjádření k sítím, případně se sejdeme přímo na pozemku v Netřebě.",
    badge: "Přímý prodej · bez provize RK · 7 490 000 Kč",
    seller: {
      name: "Tomáš Sejkora",
      role: "Výlučný majitel pozemků · přímý prodej bez provize RK",
      phoneDisplay: "+420 604 150 231",
      phoneHref: "tel:+420604150231",
      email: "tomas.sejkora@volny.cz",
      emailSubject: "Dotaz k prodeji stavebního celku v Netřebě (1 743 m²)",
      smsHref: "sms:+420604150231",
      availability: "Osobní prohlídky a zaslání podkladů po předchozí domluvě",
    },
    actions: {
      callLabel: "Zavolat",
      emailLabel: "Napsat e-mail",
      messageLabel: "Napsat zprávu",
    },
    messageModal: {
      title: "Rychlá zpráva majiteli",
      subtitle:
        "Vyberte téma dotazu a odešlete předvyplněnou zprávu přes e-mail nebo SMS — bez registrace a zprostředkovatelů.",
      parcelOptions: [
        "Mám zájem o stavební celek 1 743 m² (p.č. 119/19 a 11/4)",
        "Chci si domluvit prohlídku v Netřebě",
        "Prosím o zaslání předběžné informace SÚ (č.j. R/2026/112742/4)",
        "Mám dotaz k inženýrským sítím",
      ],
      defaultMessage:
        "Dobrý den, mám zájem o stavební celek 1 743 m² (p.č. 119/19 a 11/4) v lokalitě Netřeba. Prosím o zaslání podkladů nebo návrh termínu osobní prohlídky.",
    },
  },

  // Patička
  footer: {
    copyright: "© 2026 Stavební celek Netřeba (p.č. 119/19 a 11/4, LV č. 495). Přímý prodej bez provize RK.",
    disclaimer:
      "Uvedené údaje vycházejí z výpisu LV č. 495 (k.ú. Netřeba [704008], obec Úžice [535257]), geometrického plánu č. 169-26004/2026 (PGP-279/2026-206), předběžné informace MěÚ Kralupy nad Vltavou č.j. R/2026/112742/4 ze dne 1. 6. 2026 a sdělení Skupiny ČEZ č. 0201911621.",
  },
};
