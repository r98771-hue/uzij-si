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
      "Přímý prodej stavebního celku o celkové výměře 1 743 m² v k.ú. Netřeba, obec Úžice, okres Mělník (LV č. 495). Hlavní parcela p.č. 11/4 (1 646 m²) s vlastní příjezdovou parcelou p.č. 119/19 (97 m²). Cena 7 490 000 Kč.",
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
    title: "Stavební celek 1 743 m² v Netřebě s vlastním příjezdem",
    subtitle:
      "Dvě navazující nově oddělené parcely p.č. 119/19 (97 m²) a p.č. 11/4 (1 646 m²) prodávané výhradně společně jako jeden funkční celek. Příjezd ze severu ze silnice p.č. 128/2, slunná zahrada otevřená na jih a jihozápad do volné krajiny.",
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
      { label: "Kupní cena celku", value: "7 490 000 Kč", note: "Výhradně společně · bez provize RK" },
      { label: "Lokalita a katastr", value: "Netřeba", note: "Obec Úžice, okr. Mělník · LV č. 495" },
      { label: "Územní plán", value: "Plocha SV", note: "Potvrzeno SÚ (č.j. R/2026/112742/4)", href: "dokumenty/", linkLabel: "Zobrazit dokument" },
    ],
  },

  // 2. Interaktivní prohlížeč pohledů (Před / Po + překryv geometrického plánu)
  viewer: {
    eyebrow: "Interaktivní prohlídka pozemků",
    title: "Prozkoumejte stavební celek z každého úhlu",
    subtitle:
      "Tažením posuvníku porovnejte reálnou fotografii s přesným zákresem hranic a kót dle zapsaného geometrického plánu. U leteckého pohledu si můžete navíc prolnout geometrický plán přímo přes fotografii.",
    sliderHint: "Najeďte myší na parcelu nebo klikněte na snímek pro přepnutí zákresu",
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
        id: "drone",
        tabLabel: "Z dronu (shora)",
        title: "Kolmý letecký pohled na celý stavební celek",
        cameraPosition: "Ilustrační náhled dle souřadnic S-JTSK · příjezd ze severu (p.č. 128/2), otevření na jih / JZ",
        description:
          "Přehled reálného tvaru hlavní stavební parcely p.č. 11/4 (1 646 m², tvar písmene L) a navazující vlastní příjezdové parcely p.č. 119/19 (97 m²). Přímý vjezd vede ze severu z šikmé silnice p.č. 128/2, dlouhá jižní hrana (70,08 m) sousedí s volným polem p.č. 21/1.",
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
          "Porovnejte posuvníkem reálnou katastrální mapu se zvýrazněnou parcelou p.č. 11/4 a oficiální 2. stranu úředně ověřeného geometrického plánu č. 169-26004/2026 včetně seznamu souřadnic S-JTSK a kót všech nových hranic.",
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
        title: "Detail katastrální mapy — vlastní příjezdová parcela p.č. 119/19 (97 m²)",
        cameraPosition: "Detailní výřez z katastrální mapy ČÚZK · napojení na silnici p.č. 128/2",
        description:
          "Detailní katastrální pohled na vlastní příjezdovou parcelu p.č. 119/19 (97 m², ostatní komunikace), která zajišťuje nezávislý přímý vjezd ze severní veřejné komunikace p.č. 128/2 (šířka u silnice 7,40 m, délka 9,89 m, šířka napojení na p.č. 11/4 je 12,37 m).",
        cleanImage: "assets/katastr-119-19.png",
        markedImage: "assets/katastr-119-19.png",
        supportsPlanOverlay: false,
        isMapView: true,
        singleImage: true,
        beforeLabel: "Katastrální mapa ČÚZK · vjezd p.č. 119/19",
        metaTags: ["p.č. 119/19 · 97 m²", "Šířka 7,40 m · délka 9,89 m", "Napojení na 11/4: 12,37 m"],
      },
      {
        id: "katastr-11-4",
        tabLabel: "Katastrální mapa (11/4)",
        title: "Skutečná katastrální mapa — hlavní parcela p.č. 11/4 (1 646 m²)",
        cameraPosition: "Originální výřez z katastrální mapy ČÚZK · k.ú. Netřeba [704008]",
        description:
          "Přesný katastrální zákres hlavní stavební parcely p.č. 11/4 ve tvaru písmene L. V západní části pod domy č.p. 20 a 56 vybíhá k západu k č.p. 90, na východě navazuje novou hranicí (26,62 m) na p.č. 11/2 a na severu na vlastní příjezdovou parcelu p.č. 119/19.",
        cleanImage: "assets/katastr-11-4.png",
        markedImage: "assets/katastr-11-4.png",
        supportsPlanOverlay: false,
        isMapView: true,
        singleImage: true,
        beforeLabel: "Katastrální mapa ČÚZK · p.č. 11/4",
        metaTags: ["p.č. 11/4 · 1 646 m²", "Jižní hrana 70,08 m", "Okolní domy č.p. 20, 56, 90"],
      },
      {
        id: "street",
        tabLabel: "Vjezd z ulice",
        title: "Příjezd ze severu z komunikace p.č. 128/2",
        cameraPosition: "Ilustrační náhled ze severní komunikace p.č. 128/2 · pohled do p.č. 119/19",
        description:
          "Pohled ze severní veřejné silnice p.č. 128/2 směrem na jih do vlastní příjezdové parcely p.č. 119/19 (šířka 7,40 m, délka 9,89 m), která se v napojení na hlavní pozemek p.č. 11/4 otevírá do šířky 12,37 m.",
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
          "Stranový pohled zdůrazňuje reálný tvar písmene L hlavní parcely p.č. 11/4 a velkorysou jižní hranu délky 70,08 m navazující na volné pole p.č. 21/1. Otevřená jižní a jihozápadní expozice zajišťuje celodenní slunce.",
        cleanImage: "assets/side-clean.svg",
        markedImage: "assets/side-marked.svg",
        supportsPlanOverlay: false,
        beforeLabel: "Čistý náhled",
        afterLabel: "Zákres hranic a orientace",
        metaTags: ["Jižní hrana 70,08 m", "Východní hranice 26,62 m", "Orientace J / JZ"],
      },
      {
        id: "fence",
        tabLabel: "Od plotu",
        title: "Pohled od oplocení přes p.č. 11/4 k nové východní hranici",
        cameraPosition: "Ilustrační náhled od západního oplocení · průběh nové hranice 26,62 m",
        description:
          "Reálné měřítko hlavní parcely p.č. 11/4 (1 646 m²) z úrovně očí. Zákres přehledně vyznačuje průběh nově oddělené východní hranice dlouhé 26,62 m směrem k sousední parcele p.č. 11/2.",
        cleanImage: "assets/fence-clean.svg",
        markedImage: "assets/fence-marked.svg",
        supportsPlanOverlay: false,
        beforeLabel: "Čistý náhled",
        afterLabel: "Zákres nové hranice",
        metaTags: ["Nová východní hranice 26,62 m", "Výměra p.č. 11/4: 1 646 m²", "Soukromí a zeleň"],
      },
    ],
  },

  // 3. Přehled obou parcel a technické parametry
  parcelsSection: {
    eyebrow: "Přehled prodávaného celku a úřední parametry",
    title: "Dvě navazující parcely jako jeden funkční celek 1 743 m²",
    subtitle:
      "Parcely p.č. 119/19 a p.č. 11/4 zapsané na LV č. 495 v k.ú. Netřeba [704008], obec Úžice [535257], se prodávají výhradně společně — hlavní stavební pozemek s vlastním přímým příjezdem z obecní silnice.",
    purchaseBanner: {
      title: "Potvrzená zastavitelnost — předběžná informace MěÚ Kralupy nad Vltavou (1. 6. 2026)",
      text: "Stavební úřad MěÚ Kralupy nad Vltavou vydal dne 1. 6. 2026 předběžnou informaci č.j. R/2026/112742/4 potvrzující, že p.č. 11/4 leží ve stávajícím zastavěném území v ploše „SV – plochy smíšené obytné – venkovské“ (ÚP Úžice po Změně č. 6, účinnost od 31. 12. 2021) a výstavba nového samostatného rodinného domu je možná. Regulativy: max. 1 NP + podkroví, min. koeficient zeleně 30 % (v zastavěném území lze přiměřeně snížit); nepřípustné jsou bytové domy, řadové domy, dvojdomy a ubytovny.",
      ctaLabel: "Domluvit prohlídku",
    },
    parcels: [
      {
        id: "parcela-119-19",
        name: "Vlastní příjezdová parcela",
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
        name: "Hlavní stavební parcela",
        badge: "Hlavní pozemek",
        accent: "primary",
        cadastralNumber: "p.č. 11/4 · LV č. 495",
        area: "1 646 m²",
        dimensions: "jižní hrana cca 70,08 m · východní 26,62 m",
        landType: "Zahrada (ZPF, BPEJ 10600)",
        orientation: "Jih / Jihozápad (J–JZ)",
        orientationNote:
          "Hlavní pozemek a budoucí zahrada jsou otevřené směrem na jih a jihozápad k volné ploše p.č. 21/1. Příjezd a vstup na pozemek je ze severu přes vlastní parcelu p.č. 119/19.",
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
        status: "ready",
        statusText: "Potvrzeno SÚ",
      },
      {
        category: "Geometrický plán",
        label: "Vymezení a zápis hranic",
        value: "GP č. 169-26004/2026 (Ing. Lubomír Pavlíček)",
        detail:
          "Souhlas KÚ Mělník č. PGP-279/2026-206. Hranice nově oddělených parcel p.č. 119/19 (97 m²) a p.č. 11/4 (1 646 m²) byly v roce 2026 zaměřeny a zapsány v katastru nemovitostí.",
        status: "ready",
        statusText: "Zapsáno v KN",
      },
      {
        category: "Doprava",
        label: "Příjezdová komunikace",
        value: "Vlastní vjezd přes p.č. 119/19 ze severní silnice p.č. 128/2",
        detail:
          "Příjezdová parcela p.č. 119/19 (97 m², ostatní komunikace) napojuje hlavní pozemek přímo na veřejnou komunikaci p.č. 128/2 (šířka u silnice 7,40 m, délka 9,89 m, šířka napojení na p.č. 11/4 je 12,37 m).",
        status: "ready",
        statusText: "Vlastní vjezd",
      },
      {
        category: "Inženýrské sítě",
        label: "Elektřina (NN)",
        value: "Elektrické vedení v přilehlé komunikaci",
        detail: "Možnost napojení na distribuční síť nízkého napětí z veřejné komunikace p.č. 128/2.",
        status: "ready",
        statusText: "V komunikaci",
      },
      {
        category: "Inženýrské sítě",
        label: "Pitná voda",
        value: "Veřejný vodovodní řad v přilehlé komunikaci",
        detail: "Veřejný vodovod vede v přilehlé komunikaci p.č. 128/2 u severního vjezdu na pozemek.",
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
        detail: "Ideální pro moderní nízkoenergetický dům s tepelným čerpadlem a fotovoltaikou.",
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
        text: "Jižní hrana 70,08 m navazuje na volnou plochu p.č. 21/1 s bezprostřední blízkostí luk a polních cest.",
      },
      {
        icon: "sun",
        title: "Ideální orientace J / JZ",
        text: "Příjezd ze severu ze silnice p.č. 128/2 nechává celou jižní a jihozápadní část pozemku pro slunnou zahradu.",
      },
      {
        icon: "school",
        title: "Občanská vybavenost poblíž",
        text: "Zázemí v obci Úžice a Odolena Voda, kompletní školy, lékaři, obchody a vlakové spojení v Kralupech (8 min).",
      },
      {
        icon: "road",
        title: "Rychlé spojení po D8",
        text: "Na nájezd dálnice D8 (exit 9 Úžice) dojedete za 5 minut, na severní okraj Prahy za pouhých 20 minut.",
      },
    ],
    map: {
      title: "Poloha v mapě — Netřeba (k.ú. Netřeba [704008], obec Úžice)",
      // Lze snadno nahradit vlastním iframe kódem z Mapy.cz (Sdílet -> Vložit mapu) nebo Google Maps
      embedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=14.3450%2C50.2380%2C14.3980%2C50.2680&layer=mapnik&marker=50.2528%2C14.3711",
      externalMapUrl: "https://mapy.cz/zakladni?x=14.3711&y=50.2528&z=15&q=Net%C5%99eba",
      externalMapLabel: "Otevřít přesnou polohu na Mapy.cz",
      coordinates: "50.2528° N, 14.3711° E",
      caption: "Orientační vymezení lokality Netřeba · přesné hranice parcel p.č. 119/19 a 11/4 rád ukáži osobně na místě.",
    },
    driveTimesTitle: "Dojezdové časy autem",
    driveTimes: [
      { place: "Nájezd na dálnici D8 (exit Úžice)", time: "5 min", distance: "3,5 km" },
      { place: "Kralupy nad Vltavou (centrum, vlak)", time: "8 min", distance: "6,2 km" },
      { place: "Odolena Voda (obchody, ZŠ, MŠ)", time: "9 min", distance: "6,8 km" },
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
      email: "r98871@gmail.com",
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
