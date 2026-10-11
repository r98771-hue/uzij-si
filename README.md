# Užij.si

Jednoduchý statický web s přehledem **veřejně dostupných akcí** v Česku podle krajů – sport, kino, divadlo, výstavy a galerie, koncerty a ostatní.

- Web: https://r98771-hue.github.io/uzij-si/ (později https://uzij.si)
- Data se stahují každý den kolem 05:17 (Praha) přes GitHub Actions skriptem `scripts/fetch.py` do `docs/data/events.json`.
- Frontend je čisté HTML/CSS/JS ve složce `docs/`.

## Zdroje
| Kraj | Zdroj | Licence |
|---|---|---|
| Jihomoravský | [data.brno.cz – Akce / Events](https://data.brno.cz/datasets/e06ae10d2f8a49d5861852cf6a0f45e1) | CC BY 4.0 |

Používáme jen otevřené zdroje, které jsou zdarma a smí se přebírat. U každé akce je odkaz na původní zdroj.
Když zdroj selže, ponechají se jeho poslední data a web ukáže, kdy byla stažena.

## Lokální spuštění
```
python3 scripts/fetch.py
cd docs && python3 -m http.server
```

## Přidání zdroje
V `scripts/fetch.py` přidej funkci, která vrací seznam akcí (`name, date_from, date_to, place, city, region, category, url, source`), a zapiš ji do `SOURCES`.

## Vlastní doména uzij.si
U Dynadotu nastav DNS: A záznamy `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; AAAA `@` → 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153; CNAME `www` → `r98771-hue.github.io`. Pak v Settings → Pages zadej doménu `uzij.si` a zapni Enforce HTTPS.
