// Nabídka: dlaždice kategorií s ručně kreslenou ilustrací (černá linka, bez výplní)
const SVG=b=>`<svg class="ill" viewBox="0 0 160 100" aria-hidden="true" focusable="false">${b}</svg>`;
const ILL={
"Divadlo":SVG(`<rect x="10" y="8" width="140" height="78"/>
<path d="M10 20${[...Array(10)].map((_,i)=>` Q${17+i*14} 28 ${24+i*14} 20`).join("")}"/>
<path d="M10 20 H48 Q40 46 31 56 Q38 70 42 86 H10"/><path d="M20 20 Q24 50 18 86 M30 20 Q34 40 28 56"/><circle cx="32" cy="57" r="2.5"/>
<path d="M150 20 H112 Q120 46 129 56 Q122 70 118 86 H150"/><path d="M140 20 Q136 50 142 86 M130 20 Q126 40 132 56"/><circle cx="128" cy="57" r="2.5"/>
<path d="M4 94 H156 M10 86 L4 94 M150 86 L156 94"/><ellipse cx="80" cy="80" rx="20" ry="3.5" stroke-dasharray="3 3"/>
<path d="M80 40 l3 6.5 7 .8 -5.2 4.8 1.4 7 -6.2-3.5 -6.2 3.5 1.4-7 -5.2-4.8 7-.8z"/>`),
"Koncerty":SVG(`<rect x="70" y="8" width="20" height="32" rx="10"/><path d="M71 20 H89 M71 26 H89 M71 32 H89"/>
<path d="M63 28 V32 Q63 48 80 48 Q97 48 97 32 V28 M80 48 V88 M66 94 L80 88 L94 94"/>
<ellipse cx="34" cy="68" rx="6.5" ry="4.5" transform="rotate(-20 34 68)"/><path d="M40 66 V34 Q49 40 47 52"/>
<ellipse cx="116" cy="72" rx="6.5" ry="4.5" transform="rotate(-20 116 72)"/><ellipse cx="136" cy="64" rx="6.5" ry="4.5" transform="rotate(-20 136 64)"/>
<path d="M122 70 V42 M142 62 V34"/><path d="M122 42 L142 34" stroke-width="4"/>
<path d="M20 30 l2 -6 M14 38 l-5 -2 M146 18 l4 -4 M152 26 l5 0" />`),
"Sport":SVG(`<g transform="translate(54 34) rotate(-35)"><ellipse cx="0" cy="0" rx="22" ry="28"/><ellipse cx="0" cy="0" rx="18" ry="24"/>
<path d="M-12 -17 V17 M-6 -22.5 V22.5 M0 -24 V24 M6 -22.5 V22.5 M12 -17 V17 M-12.5 -18 H12.5 M-16 -9 H16 M-18 0 H18 M-16 9 H16 M-12.5 18 H12.5" stroke-width="1"/>
<path d="M-8 26 L-4 40 M8 26 L4 40"/><rect x="-4.5" y="40" width="9" height="26" rx="3"/><path d="M-4.5 48 H4.5 M-4.5 54 H4.5 M-4.5 60 H4.5" stroke-width="1"/></g>
<circle cx="118" cy="74" r="12"/><path d="M108 67 Q115 74 108 81 M128 67 Q121 74 128 81"/>
<circle cx="126" cy="32" r="15"/><path d="M126 27 L130.8 30.5 L128.9 36 L123.1 36 L121.2 30.5 Z M126 27 V17 M130.8 30.5 L140.3 27.4 M128.9 36 L134.8 44.1 M123.1 36 L117.2 44.1 M121.2 30.5 L111.7 27.4"/>
<path d="M100 92 H140 M24 92 H60" stroke-dasharray="2 4"/>`),
"Výstavy a galerie":SVG(`<rect x="50" y="22" width="60" height="44"/><path d="M8 6 L50 22 M152 6 L110 22 M8 94 L50 66 M152 94 L110 66"/>
<rect x="62" y="29" width="36" height="25"/><path d="M64 51 L73 39 L80 46 L86 40 L96 51"/><circle cx="90" cy="35" r="2.5"/>
<path d="M18 33 L36 34.3 L36 51.9 L18 56.3 Z M21 36.5 L33 37.3 L33 49.6 L21 52.6 Z"/><path d="M22 50 L27 43 L32 48" stroke-width="1.2"/>
<path d="M142 33 L124 34.3 L124 51.9 L142 56.3 Z"/><circle cx="133" cy="41" r="3.2" stroke-width="1.2"/><path d="M127.5 52 Q133 44 138.5 52.5" stroke-width="1.2"/>
<path d="M66 78 H94 L97 81 H63 Z M66 81 V88 M94 81 V88"/><path d="M60 70 H100" stroke-dasharray="2 4"/>`),
"Kino":SVG(`<circle cx="42" cy="44" r="24"/><circle cx="42" cy="44" r="4"/>${[0,72,144,216,288].map(a=>{const r=a*Math.PI/180;return`<circle cx="${(42+13*Math.cos(r)).toFixed(1)}" cy="${(44+13*Math.sin(r)).toFixed(1)}" r="5"/>`}).join("")}
<path d="M42 68 Q60 90 90 88"/><rect x="88" y="52" width="58" height="38" rx="2"/><path d="M88 52 L144 36 L142 28 L86 44 Z M98 41 L104 49 M112 37 L118 45 M126 33 L132 41 M86 44 L88 52"/><path d="M96 66 H138 M96 76 H124"/>`),
"Ostatní":SVG(`<g transform="rotate(-8 54 52)"><path d="M14 32 H94 V45 A6 6 0 0 0 94 57 V70 H14 V57 A6 6 0 0 0 14 45 Z"/><path d="M74 34 V68" stroke-dasharray="3 3"/>
<path d="M44 40 l3 6.5 7 .8 -5.2 4.8 1.4 7 -6.2-3.5 -6.2 3.5 1.4-7 -5.2-4.8 7-.8z"/><path d="M80 44 H88 M80 51 H88 M80 58 H86"/></g>
<rect x="104" y="22" width="46" height="52" rx="3"/><path d="M104 34 H150 M116 18 V27 M138 18 V27"/>
${[0,1,2,3].map(r=>[0,1,2,3].map(c=>r===3&&c===3?"":`<rect x="${109+c*10}" y="${39+r*8.5}" width="5" height="4.5"/>`).join("")).join("")}
<path d="M137 64 l3 3 6 -7" stroke-width="2.2"/>`)};
const TILE_ORDER=["Divadlo","Koncerty","Sport","Výstavy a galerie","Kino","Ostatní"];
const TILE_N=4;
const DOW2=["ne","po","út","st","čt","pá","so"];
function shortDay(d){const t=today();if(d===t)return"Dnes";if(d===addDays(t,1))return"Zítra";
  const x=new Date(d+"T12:00:00Z");return`${DOW2[x.getUTCDay()]} ${x.getUTCDate()}. ${x.getUTCMonth()+1}.`}
function tileRow(e){const on=ongoing(e);const[,m,d]=e.date_to.split("-");
  const lab=on?`do ${+d}. ${+m}.`:shortDay(e.date_from);
  const meta=[e.time,[e.place,e.city].filter(x=>x&&!/^\s*-?\d+\.\d+/.test(x))[0]].filter(Boolean).join(" · ");
  return`<li><span class="td">${lab}</span><span class="tb"><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.name)}</a>${meta?`<small>${esc(meta)}</small>`:""}</span></li>`}
function tiles(base){return TILE_ORDER.map(c=>{const all=base.filter(e=>e.category===c);
  if(c==="Kino"&&!all.length)return"";
  const pick=all.filter(e=>!ongoing(e)).concat(all.filter(ongoing)).slice(0,TILE_N);
  const n=all.length,w=n===1?"akce":n>1&&n<5?"akce":"akcí";
  return`<article class="tile${n?"":" none"}"><div class="tart">${ILL[c]}</div>
   <h3>${esc(c)} <small>${n?n+" "+w:""}</small></h3>
   ${n?`<ul>${pick.map(tileRow).join("")}</ul>`:`<p class="tempty">Tady zatím nic nemáme. Zkus jiný kraj nebo termín.</p>`}
   ${n>pick.length||n?`<button class="tmore" data-c="${esc(c)}">${n>pick.length?`Další akce (${n-pick.length})`:"Zobrazit v kalendáři"} →</button>`:""}</article>`}).join("")}
