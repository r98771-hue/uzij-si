/**
 * ============================================================================
 * APLIKAČNÍ LOGIKA — STAVEBNÍ PARCELY NETŘEBA
 * ============================================================================
 * Načítá veškerý obsah ze souboru data.js a zajišťuje interaktivní prvky:
 * - Přepínání plného snímku kliknutím (Čistý pohled / Vyznačené parcely) bez svislé dělící čáry
 * - Interaktivní hover a kliknutí na konkrétní parcely (p.č. 119/19 a p.č. 11/4) se štítkem
 * - 3 režimy pro letecký pohled z dronu + posuvník průhlednosti geometrického plánu
 * - Přepínání vrstev katastru ČÚZK (Mapa KN / Letecký snímek / Mapa + snímek) s plynulým prolnutím
 * - Celoobrazovkový lightbox se zachovanou interaktivitou
 * - Mobilní navigace a rychlá zpráva bez nutnosti backendu
 * ============================================================================
 */

(function () {
  "use strict";

  const DATA = window.SITE_DATA;
  if (!DATA) {
    console.error("Chybí konfigurační objekt window.SITE_DATA (soubor data.js).");
    return;
  }

  // Stav interaktivního prohlížeče
  const state = {
    activeViewIndex: 0,
    viewMode: "marked", // "clean" | "marked" | "overlay"
    overlayOpacity: 68,
    lightboxOpen: false,
    hoveredParcelId: null,
    pinnedParcelId: null,
    layer: "mapa", // "mapa" | "snimek" | "mapa-snimek" (pohled Katastr)
    highlight: true,
  };

  // Interaktivní definice parcel (přesné polygony pro letecký pohled i reálné katastrální mapy)
  const PARCEL_INFO = {
    "119-19": {
      id: "119-19",
      label: "p.č. 119/19 · Příjezdová parcela",
      area: "97 m²",
      dimension: "Šířka 7,40 m · délka 9,89 m · napojení 12,37 m",
      accent: "secondary",
    },
    "11-4": {
      id: "11-4",
      label: "p.č. 11/4 · Hlavní parcela",
      area: "1 646 m²",
      dimension: "Jižní hrana 70,08 m · východní hrana 26,62 m",
      accent: "primary",
    },
  };

  // Odkazy do Nahlížení do katastru (z data.js, karty parcel)
  function getCadastreUrl(parcelId) {
    const parcel = (DATA.parcelsSection.parcels || []).find((p) => p.id === `parcela-${parcelId}`);
    return parcel && parcel.cadastreUrl ? parcel.cadastreUrl : null;
  }

  function openCadastre(parcelId) {
    const url = getCadastreUrl(parcelId);
    if (!url) return false;
    window.open(url, "_blank", "noopener");
    return true;
  }

  const VIEW_HOTSPOTS = {
    drone: {
      viewBox: "0 0 1500 1000",
      preserveAspectRatio: "xMidYMid slice",
      polygons: [
        {
          parcelId: "11-4",
          points:
            "1046.4,338.8 1165.8,376 1175.2,382.6 1189.8,390.4 1144.6,432.3 1109.1,505 1230.5,562.7 1183.2,655.2 1044.7,913.2 323.1,629.1 374.7,497.8 901.1,709.5",
        },
        {
          parcelId: "119-19",
          points: "1077.7,258.8 1158.2,267.5 1165.8,376 1046.4,338.8",
        },
      ],
    },
    "katastr-11-4": {
      viewBox: "0 0 3813 2384",
      preserveAspectRatio: "xMidYMid meet",
      polygons: [
        {
          parcelId: "11-4",
          points: "3095,900 3384,1005 3244,1264 3518,1396 3082,2222 1416,1564 1562,1252 2664,1742",
        },
        {
          parcelId: "119-19",
          points: "3166,704 3360,728 3378,996 3095,900",
        },
      ],
    },
    // Pohled Katastr: polygony přepočtené z geometrie ČÚZK (INSPIRE CP WFS, EPSG:5514)
    // do výřezu 2400 × 1600 px (bbox -740050.7, -1023906.63, -739890.7, -1023799.97)
    katastr: {
      viewBox: "0 0 2400 1600",
      preserveAspectRatio: "xMidYMid meet",
      polygons: [
        {
          parcelId: "11-4",
          points:
            "1700.8,590 1742.5,522.2 1566.9,462.5 1369.5,858.8 1329.9,938.4 1316.8,964.5 1001.4,819.3 837.9,744 673,668.1 580.6,858.3 1564.6,1245.8 1753.5,893.9 1818,767.7 1652.4,689.1",
        },
        {
          parcelId: "119-19",
          points: "1742.5,522.2 1729.8,513.2 1719.5,365.2 1609.6,353.4 1566.9,462.5",
        },
      ],
    },
    "katastr-119-19": {
      viewBox: "0 0 3129 1713",
      preserveAspectRatio: "xMidYMid meet",
      polygons: [
        {
          parcelId: "119-19",
          points: "2502,126 2848,158 2892,628 2376,456",
        },
        {
          parcelId: "11-4",
          points: "2376,456 2892,628 2778,862 2640,1236 3129,1470 3129,1713 1780,1713",
        },
      ],
    },
  };

  // Pomocné funkce pro DOM
  const $ = (id) => document.getElementById(id);

  function setText(id, value) {
    const el = $(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function createSvgIcon(name) {
    const icons = {
      leaf: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke-linecap="round"/></svg>`,
      sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke-linecap="round"/></svg>`,
      school: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10l9-5 9 5-9 5-9-5z" stroke-linejoin="round"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke-linecap="round"/></svg>`,
      road: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19L8 5m12 14L16 5M12 6v2m0 4v2m0 4v2" stroke-linecap="round"/></svg>`,
      download: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke-linecap="round"/></svg>`,
    };
    return icons[name] || icons.leaf;
  }

  function getInitials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] || "")
      .join("")
      .toUpperCase();
  }

  // ==========================================================================
  // 1. VYKRESLENÍ OBSAHU Z DATA.JS
  // ==========================================================================

  function renderMetaAndHeader() {
    document.title = DATA.meta.pageTitle;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute("content", DATA.meta.pageDescription);

    setText("brand-title", DATA.meta.brandTitle);
    setText("brand-subtitle", DATA.meta.brandSubtitle);

    const desktopNav = $("desktop-nav");
    const mobileNav = $("mobile-nav");
    desktopNav.innerHTML = "";
    mobileNav.innerHTML = "";

    DATA.navigation.links.forEach((link) => {
      const aDesktop = document.createElement("a");
      aDesktop.href = link.href;
      aDesktop.textContent = link.label;
      desktopNav.appendChild(aDesktop);

      const aMobile = document.createElement("a");
      aMobile.href = link.href;
      aMobile.textContent = link.label;
      aMobile.addEventListener("click", closeMobileMenu);
      mobileNav.appendChild(aMobile);
    });

    const headerPdfBtn = $("header-pdf-btn");
    const mobilePdfBtn = $("mobile-pdf-btn");
    const stickyPdf = $("sticky-pdf");

    [headerPdfBtn, mobilePdfBtn, stickyPdf].forEach((btn) => {
      if (!btn) return;
      btn.href = DATA.navigation.ctaHref;
      if (DATA.navigation.ctaDownloadName) {
        btn.setAttribute("download", DATA.navigation.ctaDownloadName);
      }
    });

    setText("header-pdf-label", DATA.navigation.ctaLabel);
    setText("mobile-pdf-label", DATA.navigation.ctaLabel);
  }

  function renderHero() {
    const hero = DATA.hero;
    const heroImg = $("hero-image");
    heroImg.src = hero.backgroundImage;
    heroImg.alt = hero.backgroundAlt;

    setText("hero-eyebrow", hero.eyebrow);
    setText("hero-title", hero.title);
    if (hero.location) {
      setText("hero-location-text", hero.location);
      $("hero-location").hidden = false;
    }
    setText("hero-subtitle", hero.subtitle);

    const primaryCta = $("hero-primary-cta");
    primaryCta.href = hero.primaryCta.href;
    setText("hero-primary-cta-label", hero.primaryCta.label);

    const secondaryCta = $("hero-secondary-cta");
    secondaryCta.href = hero.secondaryCta.href;
    if (hero.secondaryCta.downloadName) {
      secondaryCta.setAttribute("download", hero.secondaryCta.downloadName);
    }
    setText("hero-secondary-cta-label", hero.secondaryCta.label);

    const statsEl = $("hero-stats");
    statsEl.innerHTML = "";
    hero.stats.forEach((stat) => {
      const item = document.createElement(stat.href ? "a" : "div");
      item.className = "hero-stat" + (stat.href ? " hero-stat--link" : "");
      if (stat.href) {
        item.href = stat.href;
        item.target = "_blank";
        item.rel = "noopener";
        item.title = stat.linkLabel || "Zobrazit dokument";
      }
      item.innerHTML = `
        <div class="hero-stat-label"></div>
        <div class="hero-stat-value"></div>
        <div class="hero-stat-note"></div>
      `;
      item.querySelector(".hero-stat-label").textContent = stat.label;
      item.querySelector(".hero-stat-value").textContent = stat.value;
      item.querySelector(".hero-stat-note").textContent = stat.note;
      if (stat.href) {
        const hint = document.createElement("div");
        hint.className = "hero-stat-link";
        hint.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg><span></span>';
        hint.querySelector("span").textContent = (stat.linkLabel || "Zobrazit dokument") + " ↗";
        item.appendChild(hint);
      }
      statsEl.appendChild(item);
    });
  }

  function renderViewerChrome() {
    const v = DATA.viewer;
    setText("viewer-eyebrow", v.eyebrow);
    setText("viewer-title", v.title);
    setText("viewer-subtitle", v.subtitle);
    setText("viewer-slider-hint", v.sliderHint);
    setText("stage-fullscreen-label", v.fullscreenLabel);

    // Popisky režimů dronu
    setText("mode-btn-clean", v.droneModes.cleanLabel);
    setText("mode-btn-marked", v.droneModes.markedLabel);
    setText("mode-btn-overlay", v.droneModes.overlayLabel);
    setText("opacity-label-text", v.droneModes.opacityLabel);

    setText("lb-mode-clean", v.droneModes.cleanLabel);
    setText("lb-mode-marked", v.droneModes.markedLabel);
    setText("lb-mode-overlay", v.droneModes.overlayLabel);
    setText("lb-opacity-label", v.droneModes.opacityLabel);

    // Záložky pohledů
    const tabsEl = $("viewer-tabs");
    tabsEl.innerHTML = "";

    v.views.forEach((view, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "viewer-tab" + (index === state.activeViewIndex ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", index === state.activeViewIndex ? "true" : "false");
      btn.textContent = view.tabLabel;
      btn.addEventListener("click", () => selectView(index));
      tabsEl.appendChild(btn);
    });
  }

  function renderParcelsAndSpecs() {
    const p = DATA.parcelsSection;
    setText("parcels-eyebrow", p.eyebrow);
    setText("parcels-title", p.title);
    setText("parcels-subtitle", p.subtitle);

    const grid = $("parcels-grid");
    grid.innerHTML = "";

    p.parcels.forEach((parcel) => {
      const card = document.createElement("article");
      card.className = "parcel-card";
      card.setAttribute("data-accent", parcel.accent || "primary");

      const highlightsList = parcel.highlights
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");

      const landTypeRow = parcel.landType
        ? `
            <div class="parcel-mini-row">
              <span class="parcel-mini-label">Druh pozemku</span>
              <span class="parcel-mini-value">${escapeHtml(parcel.landType)}</span>
            </div>`
        : "";

      const cadastreLink = parcel.cadastreUrl
        ? `<a class="cadastre-link" href="${escapeHtml(parcel.cadastreUrl)}" target="_blank" rel="noopener">${escapeHtml(parcel.cadastreLabel || "Nahlížení do katastru")} ↗</a>`
        : "";

      card.innerHTML = `
        <div class="parcel-card-bar"></div>
        <div class="parcel-card-body">
          <div class="parcel-card-top">
            <div>
              <div class="parcel-cadastral">${escapeHtml(parcel.cadastralNumber)}</div>
              <h3 class="parcel-name">${escapeHtml(parcel.name)}</h3>
            </div>
            <span class="parcel-badge">${escapeHtml(parcel.badge)}</span>
          </div>

          <div class="parcel-area-row">
            <div class="parcel-area-value">${escapeHtml(parcel.area)}</div>
            <div class="parcel-dimensions">${escapeHtml(parcel.dimensions)}</div>
          </div>

          <div class="parcel-specs-mini">
            ${landTypeRow}
            <div class="parcel-mini-row">
              <span class="parcel-mini-label">Orientace</span>
              <span class="parcel-mini-value">${escapeHtml(parcel.orientation)}</span>
            </div>
            <div class="parcel-mini-row">
              <span class="parcel-mini-label">Forma prodeje</span>
              <span class="parcel-mini-value">${escapeHtml(parcel.purchaseOption)}</span>
            </div>
            <div class="parcel-mini-row">
              <span class="parcel-mini-label">Cena</span>
              <span class="parcel-mini-value">${escapeHtml(parcel.price)}</span>
            </div>
          </div>

          <p class="parcel-orientation-note">${escapeHtml(parcel.orientationNote)}</p>

          <ul class="parcel-highlights">${highlightsList}</ul>
          ${cadastreLink}
        </div>
      `;
      if (parcel.cadastreUrl) {
        card.classList.add("parcel-card--link");
        card.title = "Otevřít v Nahlížení do katastru";
        card.addEventListener("click", (e) => {
          if (e.target.closest("a, button")) return;
          const sel = window.getSelection && window.getSelection();
          if (sel && String(sel).trim()) return;
          window.open(parcel.cadastreUrl, "_blank", "noopener");
        });
      }
      grid.appendChild(card);
    });

    setText("purchase-banner-title", p.purchaseBanner.title);
    setText("purchase-banner-text", p.purchaseBanner.text);
    if (p.purchaseBanner.ctaLabel) {
      setText("purchase-banner-cta", p.purchaseBanner.ctaLabel);
    }

    setText("specs-title", p.specsTitle);
    setText("specs-subtitle", p.specsSubtitle);

    const specsTable = $("specs-table");
    specsTable.innerHTML = "";

    p.specs.forEach((spec) => {
      const row = document.createElement("div");
      row.className = "spec-row";
      const statusClass = spec.status === "ready" ? "is-ready" : "is-info";
      row.innerHTML = `
        <div>
          <div class="spec-cat">${escapeHtml(spec.category)}</div>
          <div class="spec-label">${escapeHtml(spec.label)}</div>
        </div>
        <div>
          <div class="spec-value">${escapeHtml(spec.value)}</div>
          <div class="spec-detail">${escapeHtml(spec.detail)}</div>
        </div>
        <span class="spec-status ${statusClass}">${escapeHtml(spec.statusText)}</span>
      `;
      specsTable.appendChild(row);
    });
  }

  function renderLocation() {
    const loc = DATA.locationSection;
    setText("location-eyebrow", loc.eyebrow);
    setText("location-title", loc.title);
    setText("location-subtitle", loc.subtitle);

    const hlGrid = $("location-highlights");
    hlGrid.innerHTML = "";
    loc.highlights.forEach((item) => {
      const card = document.createElement("div");
      card.className = "highlight-card";
      card.innerHTML = `
        <div class="highlight-icon" aria-hidden="true">${createSvgIcon(item.icon)}</div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      `;
      hlGrid.appendChild(card);
    });

    setText("map-title", loc.map.title);
    setText("map-coords", loc.map.coordinates);
    setText("map-external-label", loc.map.externalMapLabel);
    setText("map-caption", loc.map.caption);

    $("map-external-link").href = loc.map.externalMapUrl;
    $("location-map-iframe").src = loc.map.embedUrl;

    setText("drive-times-title", loc.driveTimesTitle);
    const list = $("drive-times-list");
    list.innerHTML = "";
    loc.driveTimes.forEach((item) => {
      const li = document.createElement("li");
      li.className = "drive-time-item";
      li.innerHTML = `
        <div>
          <div class="drive-place">${escapeHtml(item.place)}</div>
          <div class="drive-distance">${escapeHtml(item.distance)}</div>
        </div>
        <span class="drive-badge">${escapeHtml(item.time)}</span>
      `;
      list.appendChild(li);
    });
  }

  function renderDocumentsAndContact() {
    const docs = DATA.documentsSection;
    setText("documents-eyebrow", docs.eyebrow);
    setText("documents-title", docs.title);
    setText("documents-subtitle", docs.subtitle);

    const grid = $("downloads-grid");
    grid.innerHTML = "";

    docs.downloads.forEach((doc) => {
      const card = document.createElement("article");
      card.className = "download-card" + (doc.primary ? " is-primary" : "");
      const btnClass = doc.primary ? "btn btn-primary" : "btn btn-outline";
      card.innerHTML = `
        <div>
          <span class="download-badge">${escapeHtml(doc.badge)}</span>
          <h3 class="download-title">${escapeHtml(doc.title)}</h3>
          <p class="download-desc">${escapeHtml(doc.description)}</p>
        </div>
        <div class="download-footer">
          <span class="download-meta">${escapeHtml(doc.meta)}</span>
          <a href="${escapeAttr(doc.fileUrl)}" download="${escapeAttr(doc.downloadName || "")}" class="${btnClass}">
            ${createSvgIcon("download")}
            <span>${escapeHtml(doc.buttonLabel)}</span>
          </a>
        </div>
      `;
      grid.appendChild(card);
    });

    // Kontaktní blok
    const c = DATA.contactSection;
    const s = c.seller;
    setText("contact-badge", c.badge);
    setText("contact-eyebrow", c.eyebrow);
    setText("contact-title", c.title);
    setText("contact-subtitle", c.subtitle);

    setText("seller-avatar", getInitials(s.name));
    setText("seller-name", s.name);
    setText("seller-role", s.role);
    setText("seller-availability", s.availability);

    const mailtoHref = `mailto:${s.email}?subject=${encodeURIComponent(s.emailSubject || "")}`;

    const phoneText = $("contact-phone-text");
    phoneText.textContent = s.phoneDisplay;
    phoneText.href = s.phoneHref;

    const emailText = $("contact-email-text");
    emailText.textContent = s.email;
    emailText.href = mailtoHref;

    $("btn-call").href = s.phoneHref;
    $("sticky-call").href = s.phoneHref;
    $("btn-email").href = mailtoHref;

    setText("btn-call-label", c.actions.callLabel);
    setText("btn-email-label", c.actions.emailLabel);
    setText("btn-message-label", c.actions.messageLabel);

    // Patička
    setText("footer-copy", DATA.footer.copyright);
    setText("footer-disclaimer", DATA.footer.disclaimer);
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  // ==========================================================================
  // 2. INTERAKTIVNÍ PROHLÍŽEČ POHLEDŮ (KLIKNUTÍ + HOVER PARCEL + LIGHTBOX)
  // ==========================================================================

  function getActiveView() {
    return DATA.viewer.views[state.activeViewIndex] || DATA.viewer.views[0];
  }

  function getHotspotConfig(view, activeMode) {
    if (view.id === "plan") {
      return activeMode === "clean" ? VIEW_HOTSPOTS["katastr-11-4"] : null;
    }
    return VIEW_HOTSPOTS[view.id] || null;
  }

  function selectView(index) {
    const views = DATA.viewer.views;
    state.activeViewIndex = (index + views.length) % views.length;
    const view = getActiveView();

    state.hoveredParcelId = null;
    state.pinnedParcelId = null;

    if (view.supportsPlanOverlay) {
      if (typeof view.defaultOverlayOpacity === "number") {
        state.overlayOpacity = view.defaultOverlayOpacity;
      }
      if (!["clean", "marked", "overlay"].includes(state.viewMode)) {
        state.viewMode = "marked";
      }
    } else if (view.layers) {
      state.viewMode = "layers";
    } else if (view.singleImage) {
      state.viewMode = "single";
    } else {
      state.viewMode = "marked";
    }

    const tabs = $("viewer-tabs").querySelectorAll(".viewer-tab");
    tabs.forEach((tab, idx) => {
      const isActive = idx === state.activeViewIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    syncViewContent();
  }

  function renderParcelTooltip(tooltipEl, parcelId) {
    if (!tooltipEl) return;
    const info = parcelId ? PARCEL_INFO[parcelId] : null;
    if (!info) {
      tooltipEl.hidden = true;
      tooltipEl.removeAttribute("data-parcel-id");
      return;
    }
    tooltipEl.classList.toggle("is-pinned", state.pinnedParcelId === parcelId);
    // Obsah přestavět jen při změně parcely (jinak by se při ztrátě fokusu ztratilo klepnutí na odkaz)
    if (tooltipEl.getAttribute("data-parcel-id") === parcelId && !tooltipEl.hidden) return;
    tooltipEl.setAttribute("data-parcel-id", parcelId);
    tooltipEl.setAttribute("data-accent", info.accent);
    tooltipEl.innerHTML = `
      <div class="parcel-tooltip-top">
        <span class="parcel-tooltip-id">${escapeHtml(info.label)}</span>
        <span class="parcel-tooltip-area">${escapeHtml(info.area)}</span>
      </div>
      <div class="parcel-tooltip-dim">${escapeHtml(info.dimension)}</div>
      ${
        getCadastreUrl(parcelId)
          ? `<a class="parcel-tooltip-link" href="${escapeHtml(getCadastreUrl(parcelId))}" target="_blank" rel="noopener">Otevřít v katastru ↗</a>`
          : ""
      }
    `;
    tooltipEl.hidden = false;
  }

  function syncParcelHighlight() {
    const activeParcel = state.hoveredParcelId || state.pinnedParcelId;

    document.querySelectorAll(".parcel-hotspot-poly").forEach((poly) => {
      poly.classList.toggle("is-highlighted", poly.getAttribute("data-parcel-id") === activeParcel);
    });

    renderParcelTooltip($("stage-parcel-tooltip"), activeParcel);
    renderParcelTooltip($("lb-parcel-tooltip"), activeParcel);
  }

  function renderHotspots(svgEl, view, activeMode) {
    if (!svgEl) return;
    const config = getHotspotConfig(view, activeMode);
    if (!config) {
      svgEl.setAttribute("hidden", "");
      svgEl.innerHTML = "";
      return;
    }

    svgEl.removeAttribute("hidden");
    svgEl.setAttribute("viewBox", config.viewBox);
    svgEl.setAttribute("preserveAspectRatio", config.preserveAspectRatio);
    svgEl.innerHTML = "";

    const ns = "http://www.w3.org/2000/svg";
    config.polygons.forEach((item) => {
      const info = PARCEL_INFO[item.parcelId];
      const poly = document.createElementNS(ns, "polygon");
      poly.setAttribute("points", item.points);
      poly.setAttribute("class", "parcel-hotspot-poly");
      poly.setAttribute("data-parcel-id", item.parcelId);
      poly.setAttribute("tabindex", "0");
      poly.setAttribute("role", "button");
      poly.setAttribute(
        "aria-label",
        `${info.label}, výměra ${info.area}${getCadastreUrl(item.parcelId) ? " — otevřít v Nahlížení do katastru" : ""}`
      );

      poly.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "touch") return;
        state.hoveredParcelId = item.parcelId;
        syncParcelHighlight();
      });

      poly.addEventListener("pointerleave", (e) => {
        if (e.pointerType === "touch") return;
        if (state.hoveredParcelId === item.parcelId) {
          state.hoveredParcelId = null;
          syncParcelHighlight();
        }
      });

      poly.addEventListener("focus", () => {
        state.hoveredParcelId = item.parcelId;
        syncParcelHighlight();
      });

      poly.addEventListener("blur", () => {
        if (state.hoveredParcelId === item.parcelId) {
          state.hoveredParcelId = null;
          syncParcelHighlight();
        }
      });

      poly.addEventListener("pointerdown", (e) => {
        poly.dataset.lastPointer = e.pointerType || "mouse";
      });

      poly.addEventListener("click", (e) => {
        e.stopPropagation();
        const isTouch = poly.dataset.lastPointer === "touch";
        const wasPinned = state.pinnedParcelId === item.parcelId;
        // Myš / pero: kliknutí na parcelu rovnou otevře Nahlížení do katastru.
        // Dotyk: první klepnutí ukáže kartu s tlačítkem, druhé klepnutí otevře katastr.
        if ((!isTouch || wasPinned) && openCadastre(item.parcelId)) {
          state.pinnedParcelId = item.parcelId;
          syncParcelHighlight();
          return;
        }
        state.pinnedParcelId = wasPinned ? null : item.parcelId;
        syncParcelHighlight();
      });

      poly.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          if (openCadastre(item.parcelId)) {
            state.pinnedParcelId = item.parcelId;
          } else {
            state.pinnedParcelId = state.pinnedParcelId === item.parcelId ? null : item.parcelId;
          }
          syncParcelHighlight();
        }
      });

      svgEl.appendChild(poly);
    });
  }

  function syncViewContent() {
    const view = getActiveView();
    const isDrone = Boolean(view.supportsPlanOverlay && view.planOverlayImage);
    const isSingle = Boolean(view.singleImage);
    const isLayers = Boolean(view.layers);
    const isMapContain = Boolean(view.isMapView || view.id === "plan");
    const activeMode = isLayers ? "layers" : isSingle ? "single" : state.viewMode;

    // Zobrazení / skrytí horní přepínací lišty (u všech pohledů kromě jednosnímkových map a katastru)
    $("drone-toolbar").hidden = isSingle || isLayers;
    $("lightbox-drone-bar").hidden = isSingle || isLayers;
    $("layer-toolbar").hidden = !isLayers;
    $("lb-layer-toolbar").hidden = !isLayers;

    // 3. tlačítko „Překryv geometrického plánu“ pouze u dronu
    $("mode-btn-overlay").hidden = !isDrone;
    $("lb-mode-overlay").hidden = !isDrone;

    // Popisky horních přepínačů (jednoduché a srozumitelné)
    const cleanBtnLabel = view.id === "plan" ? view.beforeLabel : DATA.viewer.droneModes.cleanLabel;
    const markedBtnLabel = view.id === "plan" ? view.afterLabel : DATA.viewer.droneModes.markedLabel;
    setText("mode-btn-clean", cleanBtnLabel);
    setText("mode-btn-marked", markedBtnLabel);
    setText("lb-mode-clean", cleanBtnLabel);
    setText("lb-mode-marked", markedBtnLabel);

    const pairs = [
      {
        stage: $("main-compare-stage"),
        clean: $("stage-clean-img"),
        marked: $("stage-marked-img"),
        overlay: $("stage-overlay-img"),
        hotspots: $("stage-hotspots"),
        statusBadge: $("stage-status-badge"),
      },
      {
        stage: $("lightbox-compare-stage"),
        clean: $("lb-clean-img"),
        marked: $("lb-marked-img"),
        overlay: $("lb-overlay-img"),
        hotspots: $("lb-hotspots"),
        statusBadge: $("lb-status-badge"),
      },
    ];

    const beforeText = view.beforeLabel || DATA.viewer.defaultBeforeLabel;
    const afterText = view.afterLabel || DATA.viewer.defaultAfterLabel;

    let badgeText = markedBtnLabel;
    if (activeMode === "clean") {
      badgeText = cleanBtnLabel;
    } else if (activeMode === "single") {
      badgeText = beforeText;
    } else if (activeMode === "layers") {
      const item = view.layers.items.find((it) => it.id === state.layer) || view.layers.items[0];
      badgeText = item.label;
    } else if (activeMode === "overlay") {
      badgeText = `${DATA.viewer.droneModes.overlayLabel} · ${state.overlayOpacity} %`;
    }

    pairs.forEach((p) => {
      p.stage.setAttribute("data-mode", activeMode);
      p.stage.setAttribute("data-view-id", view.id);
      p.stage.setAttribute("data-contain", isMapContain ? "true" : "false");

      p.clean.src = view.cleanImage;
      p.clean.alt = `${view.title} — ${beforeText}`;

      p.marked.src = view.markedImage || view.cleanImage;
      p.marked.alt = `${view.title} — ${afterText}`;

      if (isDrone) {
        p.overlay.src = view.planOverlayImage;
        p.overlay.alt = `${view.title} — ${DATA.viewer.droneModes.overlayLabel}`;
        p.overlay.hidden = activeMode !== "overlay";
        p.overlay.style.opacity = String(state.overlayOpacity / 100);
      } else {
        p.overlay.hidden = true;
      }

      p.statusBadge.textContent = badgeText;
      syncLayerStack(p.stage, view);
      renderHotspots(p.hotspots, view, activeMode);
    });

    [$("stage-credit"), $("lb-credit")].forEach((el) => {
      el.hidden = !isLayers;
      if (isLayers) el.textContent = view.layers.credit;
    });
    syncLayerButtons(view);

    if (!getHotspotConfig(view, activeMode)) {
      state.hoveredParcelId = null;
      state.pinnedParcelId = null;
    }
    syncParcelHighlight();

    // Nápověda pod prohlížečem
    setText(
      "viewer-slider-hint",
      activeMode === "layers"
        ? view.layers.hint
        : activeMode === "single"
        ? "Najetím na parcelu zobrazíte její údaje, kliknutím ji otevřete v Nahlížení do katastru"
        : DATA.viewer.sliderHint
    );

    // Synchronizace aktivních tlačítek režimů
    document.querySelectorAll("[data-view-mode]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-view-mode") === activeMode);
    });
    document.querySelectorAll("[data-lb-view-mode]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-lb-view-mode") === activeMode);
    });

    // Posuvník průhlednosti geometrického plánu
    const showOpacity = isDrone && activeMode === "overlay";
    $("opacity-control").hidden = !showOpacity;
    $("lb-opacity-control").hidden = !showOpacity;

    $("plan-opacity-range").value = String(state.overlayOpacity);
    $("lb-opacity-range").value = String(state.overlayOpacity);
    setText("plan-opacity-value", `${state.overlayOpacity} %`);
    setText("lb-opacity-value", `${state.overlayOpacity} %`);

    // Popisky pohledu
    setText("viewer-camera-pos", view.cameraPosition);
    setText("viewer-view-title", view.title);
    setText("viewer-view-desc", view.description);

    setText("lightbox-camera", view.cameraPosition);
    setText("lightbox-title", view.title);
    setText("lightbox-desc", view.description);

    const linksEl = $("viewer-links");
    linksEl.innerHTML = "";
    (view.links || []).forEach((link) => {
      const a = document.createElement("a");
      a.className = "cadastre-link";
      a.href = link.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${link.label} ↗`;
      linksEl.appendChild(a);
    });
    linksEl.hidden = !(view.links && view.links.length);

    const pillsEl = $("viewer-meta-tags");
    pillsEl.innerHTML = "";
    (view.metaTags || []).forEach((tag) => {
      const span = document.createElement("span");
      span.className = "meta-pill";
      span.textContent = tag;
      pillsEl.appendChild(span);
    });
  }

  // Vrstvy katastru: obrázky se načtou až při prvním otevření pohledu, přepínání řeší CSS (opacity)
  function syncLayerStack(stageEl, view) {
    const stack = stageEl.querySelector(".layer-stack");
    if (!stack) return;
    if (!view.layers) {
      stageEl.removeAttribute("data-layer");
      stageEl.removeAttribute("data-highlight");
      return;
    }
    const L = view.layers;
    const srcs = [
      [".layer-img-map", L.mapImage],
      [".layer-img-photo", L.photoImage],
      [".layer-img-lines", L.linesImage],
      [".layer-hl-map", L.highlightMapImage],
      [".layer-hl-photo", L.highlightPhotoImage],
    ];
    srcs.forEach(([sel, src]) => {
      const img = stack.querySelector(sel);
      if (img && img.getAttribute("src") !== src) img.setAttribute("src", src);
    });
    const item = L.items.find((it) => it.id === state.layer) || L.items[0];
    stack.querySelector(".layer-img-map").alt = `${view.title} — ${item.label}`;
    stageEl.setAttribute("data-layer", item.id);
    stageEl.setAttribute("data-highlight", state.highlight ? "on" : "off");
  }

  function renderLayerButtons() {
    const view = DATA.viewer.views.find((v) => v.layers);
    if (!view) return;
    const L = view.layers;
    state.layer = L.defaultLayer || L.items[0].id;
    [$("layer-switch"), $("lb-layer-switch")].forEach((wrap) => {
      wrap.innerHTML = "";
      L.items.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "layer-btn";
        btn.setAttribute("data-layer-id", item.id);
        btn.setAttribute("aria-pressed", "false");
        btn.innerHTML = `<img class="layer-btn-thumb" alt="" loading="lazy" /><span class="layer-btn-label"></span>`;
        btn.querySelector("img").src = item.thumb;
        btn.querySelector(".layer-btn-label").textContent = item.label;
        btn.addEventListener("click", () => setLayer(item.id));
        wrap.appendChild(btn);
      });
    });
    setText("highlight-toggle-label", L.highlightLabel);
    setText("lb-highlight-toggle-label", L.highlightLabel);
    [$("highlight-toggle"), $("lb-highlight-toggle")].forEach((input) => {
      input.addEventListener("change", () => setHighlight(input.checked));
    });
  }

  function syncLayerButtons(view) {
    if (!view.layers) return;
    document.querySelectorAll(".layer-btn").forEach((btn) => {
      const active = btn.getAttribute("data-layer-id") === state.layer;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    $("highlight-toggle").checked = state.highlight;
    $("lb-highlight-toggle").checked = state.highlight;
  }

  function setLayer(id) {
    state.layer = id;
    syncViewContent();
  }

  function setHighlight(on) {
    state.highlight = Boolean(on);
    syncViewContent();
  }

  function setViewMode(mode) {
    const view = getActiveView();
    if (view.singleImage || view.layers) return;
    if (mode === "overlay" && !view.supportsPlanOverlay) return;
    state.viewMode = mode;
    syncViewContent();
  }

  function toggleCleanMarked() {
    const view = getActiveView();
    if (view.singleImage || view.layers) return;
    state.viewMode = state.viewMode === "clean" ? "marked" : "clean";
    syncViewContent();
  }

  function setOverlayOpacity(value) {
    const clamped = Math.max(0, Math.min(100, Number(value) || 0));
    state.overlayOpacity = clamped;
    $("stage-overlay-img").style.opacity = String(clamped / 100);
    $("lb-overlay-img").style.opacity = String(clamped / 100);
    $("plan-opacity-range").value = String(clamped);
    $("lb-opacity-range").value = String(clamped);
    setText("plan-opacity-value", `${clamped} %`);
    setText("lb-opacity-value", `${clamped} %`);

    if (state.viewMode === "overlay") {
      const txt = `${DATA.viewer.droneModes.overlayLabel} · ${clamped} %`;
      setText("stage-status-badge", txt);
      setText("lb-status-badge", txt);
    }
  }

  function bindStageClickToggle(stageEl) {
    stageEl.addEventListener("click", (event) => {
      if (event.target.closest("button, a, .parcel-tooltip")) return;
      const view = getActiveView();
      if (view.singleImage || view.layers) {
        state.pinnedParcelId = null;
        syncParcelHighlight();
        return;
      }
      state.pinnedParcelId = null;
      toggleCleanMarked();
    });
  }

  function initViewerInteractions() {
    bindStageClickToggle($("main-compare-stage"));
    bindStageClickToggle($("lightbox-compare-stage"));

    // Horní přepínače režimů (hlavní i lightbox)
    document.querySelectorAll("[data-view-mode]").forEach((btn) => {
      btn.addEventListener("click", () => setViewMode(btn.getAttribute("data-view-mode")));
    });
    document.querySelectorAll("[data-lb-view-mode]").forEach((btn) => {
      btn.addEventListener("click", () => setViewMode(btn.getAttribute("data-lb-view-mode")));
    });

    // Posuvníky průhlednosti geometrického plánu
    $("plan-opacity-range").addEventListener("input", (e) => setOverlayOpacity(e.target.value));
    $("lb-opacity-range").addEventListener("input", (e) => setOverlayOpacity(e.target.value));

    // Lightbox ovládání
    $("stage-fullscreen-btn").addEventListener("click", openLightbox);
    $("lightbox-close").addEventListener("click", closeLightbox);
    $("lightbox-backdrop").addEventListener("click", closeLightbox);
    $("lightbox-prev").addEventListener("click", () => selectView(state.activeViewIndex - 1));
    $("lightbox-next").addEventListener("click", () => selectView(state.activeViewIndex + 1));
  }

  function openLightbox() {
    state.lightboxOpen = true;
    $("lightbox").hidden = false;
    document.body.classList.add("no-scroll");
    syncViewContent();
    $("lightbox-close").focus();
  }

  function closeLightbox() {
    if (!state.lightboxOpen) return;
    state.lightboxOpen = false;
    $("lightbox").hidden = true;
    document.body.classList.remove("no-scroll");
  }

  // ==========================================================================
  // 3. NAVIGACE, SCROLL A RYCHLÁ ZPRÁVA
  // ==========================================================================

  function closeMobileMenu() {
    const toggle = $("menu-toggle");
    const menu = $("mobile-menu");
    const header = $("site-header");
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    header.classList.remove("menu-open");
  }

  function initHeaderAndNavigation() {
    const header = $("site-header");
    const toggle = $("menu-toggle");
    const menu = $("mobile-menu");

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 32);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.hidden = expanded;
      header.classList.toggle("menu-open", !expanded);
    });

    // Aktivní položka navigace dle viditelné sekce
    const navLinks = Array.from(document.querySelectorAll("#desktop-nav a"));
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = "#" + entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
      );
      sections.forEach((sec) => observer.observe(sec));
    }
  }

  function initMessageModal() {
    const modal = $("message-modal");
    const cfg = DATA.contactSection.messageModal;
    const seller = DATA.contactSection.seller;
    const textarea = $("message-textarea");
    const chipsWrap = $("message-chips");
    const feedback = $("copy-feedback");

    setText("message-modal-title", cfg.title);
    setText("message-modal-subtitle", cfg.subtitle);
    textarea.value = cfg.defaultMessage;

    chipsWrap.innerHTML = "";
    cfg.parcelOptions.forEach((optionText) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "quick-chip";
      chip.textContent = optionText;
      chip.addEventListener("click", () => {
        chipsWrap.querySelectorAll(".quick-chip").forEach((c) => c.classList.remove("is-selected"));
        chip.classList.add("is-selected");
        textarea.value = `Dobrý den, ${optionText.charAt(0).toLowerCase() + optionText.slice(1)} (stavební celek 1 743 m² v Netřebě). Prosím o kontaktování.`;
        updateSendLinks();
      });
      chipsWrap.appendChild(chip);
    });

    function updateSendLinks() {
      const body = textarea.value.trim();
      $("send-via-email").href = `mailto:${seller.email}?subject=${encodeURIComponent(seller.emailSubject || "Dotaz k parcelám Netřeba")}&body=${encodeURIComponent(body)}`;
      $("send-via-sms").href = `${seller.smsHref}?&body=${encodeURIComponent(body)}`;
    }

    textarea.addEventListener("input", updateSendLinks);
    updateSendLinks();

    function openModal() {
      feedback.textContent = "";
      modal.hidden = false;
      document.body.classList.add("no-scroll");
      textarea.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.classList.remove("no-scroll");
    }

    $("btn-message").addEventListener("click", openModal);
    $("sticky-message").addEventListener("click", openModal);
    $("message-modal-close").addEventListener("click", closeModal);
    $("message-modal-backdrop").addEventListener("click", closeModal);

    $("copy-message-btn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(textarea.value);
        feedback.textContent = "Text zprávy byl zkopírován do schránky.";
      } catch (_) {
        textarea.select();
        feedback.textContent = "Text je označen — zkopírujte jej pomocí Ctrl+C / Cmd+C.";
      }
    });

    // Globální klávesa Escape pro zavření lightboxu, modalu i mobilního menu
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (state.lightboxOpen) closeLightbox();
        if (!modal.hidden) closeModal();
        closeMobileMenu();
      } else if (state.lightboxOpen && event.key === "ArrowLeft") {
        selectView(state.activeViewIndex - 1);
      } else if (state.lightboxOpen && event.key === "ArrowRight") {
        selectView(state.activeViewIndex + 1);
      }
    });
  }

  // ==========================================================================
  // START APLIKACE
  // ==========================================================================

  renderMetaAndHeader();
  renderHero();
  renderViewerChrome();
  renderLayerButtons();
  renderParcelsAndSpecs();
  renderLocation();
  renderDocumentsAndContact();

  initViewerInteractions();
  initHeaderAndNavigation();
  initMessageModal();

  // Načtení výchozího pohledu (Z dronu)
  selectView(0);
})();
