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

SOURCES = {
    "brno": {"name": "Statutární město Brno – Akce / Events (data.brno.cz, GO TO BRNO)",
             "url": "https://data.brno.cz/datasets/e06ae10d2f8a49d5861852cf6a0f45e1",
             "license": "CC BY 4.0", "license_url": "https://creativecommons.org/licenses/by/4.0/deed.cs",
             "fn": fetch_brno},
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
