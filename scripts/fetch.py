#!/usr/bin/env python3
"""Stáhne veřejné akce z otevřených zdrojů a zapíše docs/data/events.json.
Když zdroj selže, ponechá jeho poslední data (s časem posledního úspěšného stažení)."""
import html, json, re, sys, urllib.parse, urllib.request
from datetime import datetime, timezone, date
from pathlib import Path
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Europe/Prague")
OUT = Path(__file__).resolve().parent.parent / "docs" / "data" / "events.json"
UA = {"User-Agent": "uzij.si event aggregator (+https://github.com/r98771-hue/uzij-si)"}

BRNO_URL = "https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/Events/FeatureServer/0/query"

def get_json(url, params):
    req = urllib.request.Request(url + "?" + urllib.parse.urlencode(params), headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

def clean(s):
    s = html.unescape(s or "").replace("\xa0", " ")
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s)).strip()

def to_date(ms):
    if ms is None:
        return None
    return datetime.fromtimestamp(ms / 1000, timezone.utc).astimezone(TZ).date()

def map_brno(cats):
    c = {x.strip() for x in (cats or "").split(",") if x.strip()}
    if "Sport" in c: return "Sport"
    if "Výstava" in c: return "Výstavy a galerie"
    if "Divadlo" in c or "Tanec" in c: return "Divadlo"
    if "Hudba" in c: return "Koncerty"
    if any("film" in x.lower() or "kino" in x.lower() for x in c): return "Kino"
    return "Ostatní"

def fetch_brno(today):
    feats, offset = [], 0
    while True:
        d = get_json(BRNO_URL, {"where": "1=1", "outFields": "ID,name,url,categories,date_from,date_to,address,tickets",
                                 "returnGeometry": "false", "f": "json", "resultOffset": offset,
                                 "resultRecordCount": 1000, "orderByFields": "ObjectId"})
        if "error" in d: raise RuntimeError(d["error"])
        page = d.get("features", [])
        feats += page
        if not d.get("exceededTransferLimit") or not page: break
        offset += len(page)
    out = []
    for f in feats:
        a = f["attributes"]
        df, dt = to_date(a.get("date_from")), to_date(a.get("date_to"))
        dt = dt or df
        if not df or dt < today: continue
        addr = clean(a.get("address"))
        out.append({
            "id": f"brno-{a['ID']}", "name": clean(a.get("name")),
            "date_from": df.isoformat(), "date_to": dt.isoformat(), "time": None,
            "place": addr, "city": "Brno", "region": "jihomoravsky",
            "category": map_brno(a.get("categories")), "source_categories": clean(a.get("categories")),
            "url": a.get("url") or "https://www.gotobrno.cz/", "source": "brno",
        })
    return out


def get_html(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (uzij.si; +https://uzij.si)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")

# Domácí kluby -> (město, kraj). Klíč = název týmu tak, jak ho uvádí oficiální web soutěže.
HOKEJ_TYMY = {
    "HC Sparta Praha": ("Praha", "praha"), "HC Slavia Praha": ("Praha", "praha"),
    "Rytíři Kladno": ("Kladno", "stredocesky"), "BK Mladá Boleslav": ("Mladá Boleslav", "stredocesky"),
    "SC Retia Kolín": ("Kolín", "stredocesky"),
    "Banes Motor Č. Budějovice": ("České Budějovice", "jihocesky"), "HC Tábor": ("Tábor", "jihocesky"),
    "HC Škoda Plzeň": ("Plzeň", "plzensky"),
    "BYD Energie Karlovy Vary": ("Karlovy Vary", "karlovarsky"), "HC Baník Sokolov": ("Sokolov", "karlovarsky"),
    "HC VERVA Litvínov": ("Litvínov", "ustecky"), "HC Stadion Litoměřice": ("Litoměřice", "ustecky"),
    "Piráti Chomutov": ("Chomutov", "ustecky"),
    "Bílí Tygři Liberec": ("Liberec", "liberecky"),
    "Mountfield HK": ("Hradec Králové", "kralovehradecky"),
    "HC Dynamo Pardubice": ("Pardubice", "pardubicky"), "HC Dynamo Pardubice B": ("", "pardubicky"),
    "HC Dukla Jihlava": ("Jihlava", "vysocina"), "Horácká Slavia Třebíč": ("Třebíč", "vysocina"),
    "HC Kometa Brno": ("Brno", "jihomoravsky"),
    "HC Olomouc": ("Olomouc", "olomoucky"), "HC ZUBR Přerov": ("Přerov", "olomoucky"),
    "RI OKNA Berani Zlín": ("Zlín", "zlinsky"), "VHK ROBE Vsetín": ("Vsetín", "zlinsky"),
    "HC VÍTKOVICE RIDERA": ("Ostrava", "moravskoslezsky"), "HC Oceláři Třinec": ("Třinec", "moravskoslezsky"),
    "HC Frýdek-Místek": ("Frýdek-Místek", "moravskoslezsky"), "AZ Havířov": ("Havířov", "moravskoslezsky"),
}
FOTBAL_TYMY = {
    "AC Sparta Praha": ("Praha", "praha"), "SK Slavia Praha": ("Praha", "praha"), "Bohemians Praha 1905": ("Praha", "praha"),
    "FK Mladá Boleslav": ("Mladá Boleslav", "stredocesky"), "FC Viktoria Plzeň": ("Plzeň", "plzensky"),
    "FK Teplice": ("Teplice", "ustecky"), "FC Slovan Liberec": ("Liberec", "liberecky"), "FK Jablonec": ("Jablonec nad Nisou", "liberecky"),
    "FC Hradec Králové": ("Hradec Králové", "kralovehradecky"), "FK Pardubice": ("Pardubice", "pardubicky"),
    "FC Zbrojovka Brno": ("Brno", "jihomoravsky"), "SK Artis Brno": ("Brno", "jihomoravsky"),
    "SK Sigma Olomouc": ("Olomouc", "olomoucky"), "FC Zlín": ("Zlín", "zlinsky"), "1.FC Slovácko": ("Uherské Hradiště", "zlinsky"),
    "FC Baník Ostrava": ("Ostrava", "moravskoslezsky"),
}
HORIZONT_DNY = 61

def fetch_hokej(today):
    out = []
    for liga, slug in (("Tipsport extraliga", "tipsport-extraliga"), ("Maxa liga", "maxa-liga")):
        sezona = today.year if today.month >= 7 else today.year - 1
        s = get_html(f"https://www.hokej.cz/{slug}/zapasy?matchList-filter-season={sezona}&matchList-filter-competition=")
        for href, r in re.findall(r'<tr data-href="(/zapas/\d+)" class="js-preview__link">(.*?)</tr>', s, re.S):
            names = re.findall(r'preview__name--long">([^<]*)<', r)
            m = re.search(r'preview__mobile.*?col-1_3">[^<]*</div>\s*<div class="col-1_3">(\d+)\. ?(\d+)\.</div>\s*<div class="col-1_3">([^<]*)</div>', r, re.S)
            if len(names) < 2 or not m: continue
            d, mo, cas = int(m.group(1)), int(m.group(2)), m.group(3).strip()
            dt = date(sezona if mo >= 7 else sezona + 1, mo, d)
            if dt < today or (dt - today).days > HORIZONT_DNY: continue
            home, away = clean(names[0]), clean(names[1])
            if home not in HOKEJ_TYMY: print(f"[hokej] neznámý tým {home}", file=sys.stderr); continue
            city, reg = HOKEJ_TYMY[home]
            out.append({"id": "hokej-" + href.rsplit("/", 1)[1], "name": f"{home} – {away} (hokej, {liga})",
                        "date_from": dt.isoformat(), "date_to": dt.isoformat(), "time": cas or None,
                        "place": "", "city": city, "region": reg, "category": "Sport",
                        "source_categories": f"Sport, Hokej, {liga}", "url": "https://www.hokej.cz" + href, "source": "hokej"})
    if not out: raise RuntimeError("žádné zápasy")
    return out

def fetch_fotbal(today):
    s = get_html("https://www.chanceliga.cz/rozpis-zapasu")
    out = []
    for g in re.findall(r'<tr class="game">(.*?)</tr>', s, re.S):
        m = re.search(r'(\d\d)/(\d\d)/(\d{4})', g)
        home = re.search(r'team home.*?hidden-xs">([^<]*)', g, re.S)
        away = re.search(r'team away.*?hidden-xs">([^<]*)', g, re.S)
        link = re.search(r'href="(/zapas/[^"]+)"', g)
        if not (m and home and away and link): continue
        dt = date(int(m.group(3)), int(m.group(2)), int(m.group(1)))
        if dt < today or (dt - today).days > HORIZONT_DNY: continue
        t = re.search(r'class="time[^"]*">([^<]*)<', g)
        home, away = clean(home.group(1)), clean(away.group(1))
        if home not in FOTBAL_TYMY: print(f"[fotbal] neznámý tým {home}", file=sys.stderr); continue
        city, reg = FOTBAL_TYMY[home]
        out.append({"id": "fotbal-" + link.group(1).split("/")[2], "name": f"{home} – {away} (fotbal, Chance Liga)",
                    "date_from": dt.isoformat(), "date_to": dt.isoformat(), "time": (t.group(1).strip() if t else "") or None,
                    "place": "", "city": city, "region": reg, "category": "Sport",
                    "source_categories": "Sport, Fotbal, Chance Liga", "url": "https://www.chanceliga.cz" + link.group(1), "source": "fotbal"})
    if not out: raise RuntimeError("žádné zápasy")
    return out

CURATED = Path(__file__).resolve().parent / "curated"

def fetch_poradatele(today):
    """Ručně ověřené akce z oficiálních zdrojů pořadatelů (scripts/curated/<kraj>.json)."""
    out = []
    for f in sorted(CURATED.glob("*.json")):
        for e in json.loads(f.read_text("utf-8")):
            if e["date_to"] < today.isoformat(): continue
            e.setdefault("time", None); e.setdefault("source", "poradatele")
            out.append(e)
    return out

SOURCES = {
    "brno": {"short_name": "Statutární město Brno",
             "name": "Statutární město Brno – Akce / Events (data.brno.cz, GO TO BRNO)",
             "url": "https://data.brno.cz/datasets/e06ae10d2f8a49d5861852cf6a0f45e1",
             "license": "CC BY 4.0", "license_url": "https://creativecommons.org/licenses/by/4.0/deed.cs",
             "fn": fetch_brno},
    "hokej": {"short_name": "hokej.cz", "name": "Rozpis zápasů – Tipsport extraliga a Maxa liga (hokej.cz, oficiální web soutěží)",
              "url": "https://www.hokej.cz/tipsport-extraliga/zapasy", "license": "veřejný rozpis, odkaz na zdroj",
              "license_url": "https://www.hokej.cz/", "fn": fetch_hokej},
    "fotbal": {"short_name": "chanceliga.cz", "name": "Rozpis zápasů – Chance Liga (chanceliga.cz, oficiální web soutěže)",
               "url": "https://www.chanceliga.cz/rozpis-zapasu", "license": "veřejný rozpis, odkaz na zdroj",
               "license_url": "https://www.chanceliga.cz/", "fn": fetch_fotbal},
    "poradatele": {"short_name": "web pořadatele", "name": "Oficiální weby a tiskové zprávy pořadatelů (ručně ověřeno)",
                   "url": "https://github.com/r98771-hue/uzij-si/tree/main/scripts/curated", "license": "fakta o akci, odkaz na pořadatele",
                   "license_url": "https://github.com/r98771-hue/uzij-si/tree/main/scripts/curated", "fn": fetch_poradatele},
}

def main():
    today = datetime.now(TZ).date()
    old = {}
    if OUT.exists():
        try: old = json.loads(OUT.read_text("utf-8"))
        except Exception: old = {}
    old_src = old.get("sources", {})
    events, sources, ok_any = [], {}, False
    for key, s in SOURCES.items():
        meta = {k: v for k, v in s.items() if k != "fn"}
        try:
            ev = s["fn"](today)
            meta.update(status="ok", fetched_at=datetime.now(TZ).isoformat(timespec="seconds"), count=len(ev))
            ok_any = True
        except Exception as e:
            print(f"[{key}] CHYBA: {e}", file=sys.stderr)
            prev = old_src.get(key, {})
            ev = [x for x in old.get("events", []) if x.get("source") == key and x.get("date_to", "") >= today.isoformat()]
            meta.update(status="stale", fetched_at=prev.get("fetched_at"), error=str(e)[:200], count=len(ev))
        events += ev
        sources[key] = meta
        print(f"[{key}] {meta['status']}: {len(ev)} akcí")
    events.sort(key=lambda x: (x["date_from"], x["name"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"generated_at": datetime.now(TZ).isoformat(timespec="seconds"),
                               "sources": sources, "events": events}, ensure_ascii=False, indent=1), "utf-8")
    return 0

if __name__ == "__main__":
    sys.exit(main())
