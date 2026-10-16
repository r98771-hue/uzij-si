# Etapa 2: kontrola každého kandidáta na oficiální stránce pořadatele (datum + název), dohledání detailu akce
import re, json, sys, html, unicodedata, urllib.request, urllib.parse
sys.path.insert(0, ".")
from candidates import C, MANUAL
MES = ["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"]
cache = {}
def get(u):
    if u in cache: return cache[u]
    try:
        r = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/120", "Accept-Language": "cs"})
        cache[u] = urllib.request.urlopen(r, timeout=30).read().decode("utf-8", "replace").replace("\xa0", " ")
    except Exception as e:
        cache[u] = None
    return cache[u]
norm = lambda s: unicodedata.normalize("NFD", html.unescape(s or "")).encode("ascii", "ignore").decode().lower()
def date_pats(d):
    y, m, dd = map(int, d.split("-"))
    return [rf"\b{dd}\.\s?{m}\.", rf"\b{dd:02d}\.\s?{m:02d}\.", rf"\b{dd}/{m}\b", rf"\b{dd:02d}/{m:02d}\b", rf"\b{dd}\.\s?{MES[m-1]}", d, f"{y}{m:02d}{dd:02d}", rf"\b{dd:02d}\.{m:02d}\.{y}", rf"\b{dd}\.{m}\.{y}"]
def key_words(t):
    return [w for w in re.findall(r"[a-z0-9]{4,}", norm(re.sub(r"\(.*?\)", "", t))) if w not in ("premiera", "koncert")][:2]
def find_detail(prog_html, base, title):
    kw = key_words(title)
    if not prog_html or not kw: return None
    h = norm(prog_html)
    i = h.find(kw[0])
    while i >= 0:
        seg = prog_html[max(0, i - 2500): i + 600]
        hrefs = re.findall(r'href="([^"#]+)"', seg)
        cands = [x for x in hrefs if re.search(r"(predstaveni|inscenace|udalost|events/|program/|koncert|repertoar|akce/)[^\"]*[a-z0-9]", x) and kw[0][:5] in norm(x)]
        if cands: return urllib.parse.urljoin(base, html.unescape(cands[-1]))
        i = h.find(kw[0], i + 1)
    return None
out, log = [], []
for row in C:
    kraj, name, d1, d2, cas, place, city, cat, (org, org_url, prog) = row[:9]
    override = row[9] if len(row) > 9 else None
    if not d1: log.append(f"SKIP {kraj}: {name} – datum nezjištěno"); continue
    p = get(prog)
    url = override or find_detail(p, prog, name) or prog
    page = get(url) if url != prog else p
    ok_date = page is not None and any(re.search(x, page) for x in date_pats(d1))
    ok_name = page is not None and all(w in norm(page) for w in key_words(name)[:1])
    if not (ok_date and ok_name) and p and url != prog:  # datum ověř v programu pořadatele (název poblíž data)
        pn = norm(p); kw = key_words(name)[0]
        for m in re.finditer(kw, pn):
            win = p[max(0, m.start() - 700): m.start() + 700]
            if any(re.search(x, win) for x in date_pats(d1)): ok_date = ok_name = True; break
    if url in MANUAL or prog in MANUAL and page is None: ok_date = ok_name = True
    status = "OK" if ok_date and ok_name else ("NEDOSTUPNE" if page is None else f"CHYBI {'datum' if not ok_date else ''} {'nazev' if not ok_name else ''}")
    log.append(f"{status:14} {kraj:16} {d1} {name[:45]:45} {url}")
    out.append(dict(region=kraj, name=name, date_from=d1, date_to=d2 or d1, time=cas, place=place, city=city, category=cat,
                    organizer=org, organizer_url=org_url, url=url, status=status))
json.dump(out, open("reviewed.json", "w"), ensure_ascii=False, indent=1)
print("\n".join(log))
