const REGIONS=[["praha","Hlavní město Praha"],["stredocesky","Středočeský kraj"],["jihocesky","Jihočeský kraj"],["plzensky","Plzeňský kraj"],["karlovarsky","Karlovarský kraj"],["ustecky","Ústecký kraj"],["liberecky","Liberecký kraj"],["kralovehradecky","Královéhradecký kraj"],["pardubicky","Pardubický kraj"],["vysocina","Kraj Vysočina"],["jihomoravsky","Jihomoravský kraj"],["olomoucky","Olomoucký kraj"],["zlinsky","Zlínský kraj"],["moravskoslezsky","Moravskoslezský kraj"]];
const GROUPS=[["vse","Vše","✨",null],["sport","Sport","⚽",["Sport"]],["kultura","Kultura","🎭",["Kino","Divadlo","Výstavy a galerie","Koncerty"]],["ostatni","Ostatní","📌",["Ostatní"]]];
const ICON={"Sport":"⚽","Kino":"🎬","Divadlo":"🎭","Výstavy a galerie":"🖼️","Koncerty":"🎵","Ostatní":"📌"};
const GROUP_OF=c=>c==="Sport"?"sport":["Kino","Divadlo","Výstavy a galerie","Koncerty"].includes(c)?"kultura":"ostatni";
// Rychlé filtry: buď kategorie (napojená na záložky), nebo klíčové slovo v rámci Sportu
const QUICK=[["Koncerty","🎵 Koncerty","kultura","Koncerty"],["Divadlo","🎭 Divadlo","kultura","Divadlo"],["Výstavy a galerie","🖼️ Výstavy","kultura","Výstavy a galerie"],["hokej","🏒 Hokej","sport",null,/hokej/i],["fotbal","⚽ Fotbal","sport",null,/fotbal|futsal/i],["rodiny","👨‍👩‍👧 Pro rodiny",null,null,/pro rodiny/i]];
const DATES=[["dnes","Dnes"],["vikend","Tento víkend"],["tyden","Tento týden"],["mesic","30 dní"],["vse","Kdykoli"]];
const MON=["led","úno","bře","dub","kvě","čvn","čvc","srp","zář","říj","lis","pro"];
const DOW=["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"];
const st={region:"jihomoravsky",city:"",group:"vse",cat:"Vše",quick:"",date:"vse",q:"",shown:48};
let DATA={events:[],sources:{}};
const $=s=>document.querySelector(s);
const iso=d=>d.toLocaleDateString("sv-SE",{timeZone:"Europe/Prague"});
const today=()=>iso(new Date());
function addDays(s,n){const d=new Date(s+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
const days=(a,b)=>Math.round((new Date(b+"T12:00:00Z")-new Date(a+"T12:00:00Z"))/864e5);
function range(){const t=today();const wd=(new Date(t+"T12:00:00Z").getUTCDay()+6)%7;
  if(st.date==="dnes")return[t,t];
  if(st.date==="tyden")return[t,addDays(t,6-wd)];
  if(st.date==="mesic")return[t,addDays(t,30)];
  if(st.date==="vikend"){const sat=addDays(t,5-wd);return[wd>=5?t:sat,addDays(t,6-wd)]}
  return[t,"9999-12-31"]}
const fmt=s=>{const[y,m,d]=s.split("-");return`${+d}. ${+m}. ${y}`};
function when(e){return e.date_from===e.date_to?fmt(e.date_from):`${fmt(e.date_from)} – ${fmt(e.date_to)}`}
const ongoing=e=>e.date_from<today();
function dblock(e){const t=today();const s=e.date_from<t?t:e.date_from;const[,m,d]=s.split("-");
  return`<div class="day"><b>${+d}</b><span>${MON[+m-1]}</span>${e.date_from<t?'<i>probíhá</i>':""}</div>`}
function esc(s){return(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
const norm=s=>(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const hay=e=>e._h||(e._h=norm([e.name,e.place,e.city,e.description,e.source_categories,e.category].join(" ")));
const txt=e=>[e.name,e.source_categories].join(" ");
function chips(el,items,key){el.innerHTML=items.map(([v,l])=>`<button data-v="${v}" class="${st[key]===v?"on":""}">${l}</button>`).join("");
  el.onclick=e=>{const b=e.target.closest("button");if(!b)return;st[key]=b.dataset.v;st.shown=48;render()}}
function quickMatch(e){const qd=QUICK.find(x=>x[0]===st.quick);if(!qd)return true;
  if(qd[3])return e.category===qd[3];if(qd[2]&&GROUP_OF(e.category)!==qd[2])return false;return qd[4].test(txt(e))}
function card(e,big){const s=DATA.sources[e.source]||{};const gk=GROUP_OF(e.category);
  const img=e.image?`<a class="img" href="${esc(e.url)}" target="_blank" rel="noopener"><img src="${esc(e.image)}" alt="" loading="lazy"></a><div class="credit">Foto: <a href="${esc(e.image_source||e.url)}" target="_blank" rel="noopener">${esc(e.image_credit||e.organizer||"pořadatel")}</a></div>`:"";
  return`<li class="ev g-${gk}${e.image?" has-img":""}${big?" top":""}">${img}<div class="row">
   ${dblock(e)}<div class="body">
   <span class="cat">${ICON[e.category]||"📌"} ${esc(e.category)}</span>
   <a class="t" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.name)}</a>
   <div class="meta">🗓 ${when(e)}${e.time?" · "+esc(e.time):""}</div>
   ${[e.place,e.city].filter(Boolean).length?`<div class="meta">📍 ${esc([e.place,e.city].filter(Boolean).join(", "))}</div>`:""}
   <div class="meta src">Zdroj: <a href="${esc(s.url||e.url)}" target="_blank" rel="noopener">${esc(s.short_name||s.name||e.source)}</a> · <a href="${esc(e.url)}" target="_blank" rel="noopener">u pořadatele</a></div></div></div></li>`}
function dayLabel(d){const t=today();if(d===t)return"Dnes";if(d===addDays(t,1))return"Zítra";
  const x=new Date(d+"T12:00:00Z");return`${DOW[x.getUTCDay()]} ${x.getUTCDate()}. ${x.getUTCMonth()+1}.`}
function calendar(list){// jednorázové akce podle dne, dlouhodobé (probíhající) zvlášť na konci
  const one=list.filter(e=>!ongoing(e)),long=list.filter(ongoing);
  const shown=one.slice(0,st.shown);let out="",cur="";
  for(const e of shown){if(e.date_from!==cur){if(cur)out+="</ul></li>";cur=e.date_from;
    out+=`<li class="dgrp"><h3>${dayLabel(cur)}</h3><ul class="list">`}out+=card(e)}
  if(cur)out+="</ul></li>";
  if(shown.length===one.length&&long.length)out+=`<li class="dgrp"><h3>Probíhá dlouhodobě <small>${long.length}</small></h3><ul class="list">${long.slice(0,Math.max(12,st.shown-one.length)).map(e=>card(e)).join("")}</ul></li>`;
  return{out,more:one.length>st.shown||(shown.length===one.length&&long.length>Math.max(12,st.shown-one.length))}}
function featured(list){// příznak featured / zdroj "TOP akce", jinak nejbližší krátké akce z různých kategorií
  const t=today(),lim=addDays(t,21);
  const c=list.filter(e=>!ongoing(e)&&e.date_from<=lim&&days(e.date_from,e.date_to)<=7);
  const f=c.filter(e=>e.featured||/TOP akce|Festivaly/.test(e.source_categories||""));
  const pick=[],seen=new Set();
  for(const e of f.concat(c)){if(pick.length>=4)break;if(pick.includes(e))continue;
    if(!f.includes(e)&&seen.has(e.category))continue;pick.push(e);seen.add(e.category)}
  return pick}
function render(){if(typeof MAP!=="undefined"&&$("#map svg"))syncMap();
  const g=GROUPS.find(x=>x[0]===st.group);document.body.dataset.group=st.group;
  const[a,b]=range();const q=norm(st.q.trim());
  const inReg=DATA.events.filter(e=>e.region===st.region);
  const cities=[...new Set(inReg.map(e=>e.city).filter(Boolean))].sort((x,y)=>x.localeCompare(y,"cs"));
  $("#cityw").hidden=cities.length<2;
  if(cities.length>=2){const cs=$("#city");cs.innerHTML=`<option value="">Celý kraj</option>`+cities.map(c=>`<option ${c===st.city?"selected":""}>${esc(c)}</option>`).join("")}else st.city="";
  const base=inReg.filter(e=>(!st.city||e.city===st.city)&&e.date_from<=b&&e.date_to>=a&&(!q||q.split(/\s+/).every(w=>hay(e).includes(w))));
  const cnt=k=>k==="vse"?base.length:base.filter(e=>GROUP_OF(e.category)===k).length;
  $("#groups").innerHTML=GROUPS.map(([k,l,i])=>`<button data-v="${k}" class="tab t-${k} ${st.group===k?"on":""}"><span class="ic">${i}</span>${l}<small>${cnt(k)}</small></button>`).join("");
  $("#groups").onclick=e=>{const t=e.target.closest("button");if(!t)return;st.group=t.dataset.v;st.cat="Vše";st.quick="";st.shown=48;render()};
  // rychlé filtry nastavují stejný stav jako záložky (group + cat)
  $("#quick").innerHTML=QUICK.map(x=>{const n=base.filter(e=>{const o=st.quick;st.quick=x[0];const r=quickMatch(e);st.quick=o;return r}).length;
    return`<button data-v="${x[0]}" class="${st.quick===x[0]?"on":""}" ${n?"":"disabled"}>${x[1]} <small>${n}</small></button>`}).join("");
  $("#quick").onclick=e=>{const t=e.target.closest("button");if(!t||t.disabled)return;const x=QUICK.find(y=>y[0]===t.dataset.v);
    if(st.quick===x[0]){st.quick="";st.group="vse";st.cat="Vše"}else{st.quick=x[0];st.group=x[2]||"vse";st.cat=x[3]||"Vše"}st.shown=48;render()};
  const sub=$("#cats");
  if(g[0]==="kultura"){sub.hidden=false;chips(sub,[["Vše","Vše"]].concat(g[3].map(c=>[c,ICON[c]+" "+c])),"cat");const f=sub.onclick;sub.onclick=e=>{st.quick="";f(e)}}else{sub.hidden=true}
  chips($("#dates"),DATES,"date");
  const list=base.filter(e=>(!g[3]||g[3].includes(e.category))&&(st.cat==="Vše"||e.category===st.cat)&&quickMatch(e));
  const rn=REGIONS.find(r=>r[0]===st.region)[1];
  if(!inReg.length){$("#tops").hidden=true;$("#info").textContent=rn;$("#list").innerHTML=`<li class="empty">${rn}: zatím bez zdrojů, přidáme brzy.</li>`;$("#more").hidden=true;return}
  const tops=(!q&&!st.quick&&st.group==="vse")?featured(list):[];
  $("#tops").hidden=!tops.length;$("#toplist").innerHTML=tops.map(e=>card(e,true)).join("");
  $("#info").textContent=`${st.city||rn}: ${list.length} ${list.length===1?"akce":list.length<5&&list.length>0?"akce":"akcí"}${st.q?` pro „${st.q}“`:""}`;
  if(!list.length){$("#list").innerHTML=`<li class="empty">Pro tento výběr nic nemáme. Zkus jiný den, sekci nebo hledání.</li>`;$("#more").hidden=true;return}
  const c=calendar(list);$("#list").innerHTML=c.out;$("#more").hidden=!c.more}
const MES=["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"];
function strip(){const t=today(),[y,m,d]=t.split("-").map(Number),x=new Date(t+"T12:00:00Z");
  const z=addDays(t,1).split("-").map(Number),sv=statniSvatek(y,m,d),jm=jmeno(m,d),jz=jmeno(z[1],z[2]);
  $("#today").innerHTML=`<b>${DOW[x.getUTCDay()]} ${d}. ${MES[m-1]} ${y}</b>`+
   (jm?`<span>Svátek má <b>${esc(jm)}</b></span>`:"")+(sv?`<span class="hol">🇨🇿 ${esc(sv)}</span>`:"")}
function stripHl(){const t=today(),lim=addDays(t,60);
  const pick=g=>{const c=DATA.events.filter(e=>GROUP_OF(e.category)===g&&e.date_from>=t&&e.date_from<=lim&&days(e.date_from,e.date_to)<=7);
    return c.find(e=>e.featured||/TOP akce/.test(e.source_categories||""))||c[0]};
  $("#hl").innerHTML=[["kultura","🎭 Kultura"],["sport","⚽ Sport"]].map(([g,l])=>{const e=pick(g);
    return e?`<a class="h-${g}" href="${esc(e.url)}" target="_blank" rel="noopener"><span>${l} · ${dayLabel(e.date_from)}${e.time?" · "+esc(e.time):""}</span><b>${esc(e.name)}</b><small>📍 ${esc(e.place?e.place.split(",")[0]:e.city)}</small></a>`:`<span class="h-${g} none"><span>${l}</span>zatím nic nového</span>`}).join("")}
const MAP_SHOW_COUNT=true; // false = tooltip bez počtu akcí
const MAP_DEFAULT="jihomoravsky";
function drawMap(){const el=$("#map");
  el.innerHTML=`<svg viewBox="0 0 ${MAP.w} ${MAP.h}" role="img" aria-label="Mapa krajů ČR">`+
   REGIONS.map(([k,l])=>`<path class="kraj" data-k="${k}" d="${MAP.kraje[k]}"><title>${l}</title></path>`).join("")+
   `<path class="outline" d="${MAP.outline}"/>`+
   MAP.cities.map(([n,x,y,l])=>`<g class="city"><circle cx="${x}" cy="${y}" r="4"/><text x="${l?x-8:x+8}" y="${y+5}"${l?' text-anchor="end"':""}>${n}</text></g>`).join("")+`</svg>`;
  const tip=$("#tip");
  el.onmouseover=e=>{const p=e.target.closest(".kraj");if(p&&p.nextElementSibling&&!p.nextElementSibling.classList.contains("outline"))p.parentNode.insertBefore(p,p.parentNode.querySelector(".outline"))};
  el.onmousemove=e=>{const p=e.target.closest(".kraj");if(!p){tip.hidden=true;return}
    const k=p.dataset.k,n=DATA.events.filter(x=>x.region===k&&x.date_to>=today()).length,r=el.getBoundingClientRect();
    tip.innerHTML=`<b>${REGIONS.find(x=>x[0]===k)[1]}</b>${MAP_SHOW_COUNT?`<span>${n?n+" "+(n===1?"akce":n<5?"akce":"akcí"):"zatím bez akcí"}</span>`:""}`;
    tip.hidden=false;tip.style.left=(e.clientX-r.left+14)+"px";tip.style.top=(e.clientY-r.top+14)+"px"};
  el.onmouseleave=()=>tip.hidden=true;
  el.onclick=e=>{const p=e.target.closest(".kraj");if(!p)return;const k=p.dataset.k;
    st.region=(k===st.region&&k!==MAP_DEFAULT)?MAP_DEFAULT:k;$("#region").value=st.region;st.city="";st.shown=48;render()}}
function syncMap(){document.querySelectorAll("#map .kraj").forEach(p=>{const k=p.dataset.k;
  p.classList.toggle("on",k===st.region);if(k===st.region)p.parentNode.insertBefore(p,p.parentNode.querySelector(".outline"));p.classList.toggle("zero",!DATA.events.some(e=>e.region===k&&e.date_to>=today()))})}
async function init(){strip();
  const sel=$("#region");sel.innerHTML=REGIONS.map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
  sel.value=st.region;sel.onchange=()=>{st.region=sel.value;st.city="";st.shown=48;render()};
  $("#city").onchange=e=>{st.city=e.target.value;st.shown=48;render()};
  $("#q").oninput=e=>{st.q=e.target.value;st.shown=48;render()};
  $("#more").onclick=()=>{st.shown+=48;render()};
  try{DATA=await (await fetch("data/events.json",{cache:"no-cache"})).json()}catch(e){$("#info").textContent="Data se nepodařilo načíst."}
  DATA.events.sort((x,y)=>x.date_from.localeCompare(y.date_from)||(x.time||"").localeCompare(y.time||""));
  $("#sources").innerHTML=Object.values(DATA.sources).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a> – licence <a href="${esc(s.license_url)}" target="_blank" rel="noopener">${esc(s.license)}</a>${s.fetched_at?`, staženo ${new Date(s.fetched_at).toLocaleString("cs-CZ",{timeZone:"Europe/Prague"})}`:""}${s.status==="stale"?" (poslední aktualizace selhala, zobrazujeme starší data)":""}</li>`).join("");
  $("#gen").textContent=DATA.generated_at?`Data vygenerována ${new Date(DATA.generated_at).toLocaleString("cs-CZ",{timeZone:"Europe/Prague"})}.`:"";
  stripHl();drawMap();render()}
init();
