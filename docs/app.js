const REGIONS=[["praha","Hlavní město Praha"],["stredocesky","Středočeský kraj"],["jihocesky","Jihočeský kraj"],["plzensky","Plzeňský kraj"],["karlovarsky","Karlovarský kraj"],["ustecky","Ústecký kraj"],["liberecky","Liberecký kraj"],["kralovehradecky","Královéhradecký kraj"],["pardubicky","Pardubický kraj"],["vysocina","Kraj Vysočina"],["jihomoravsky","Jihomoravský kraj"],["olomoucky","Olomoucký kraj"],["zlinsky","Zlínský kraj"],["moravskoslezsky","Moravskoslezský kraj"]];
const GROUPS=[["vse","Vše","✨",null],["sport","Sport","⚽",["Sport"]],["kultura","Kultura","🎭",["Kino","Divadlo","Výstavy a galerie","Koncerty"]],["ostatni","Ostatní","📌",["Ostatní"]]];
const ICON={"Sport":"⚽","Kino":"🎬","Divadlo":"🎭","Výstavy a galerie":"🖼️","Koncerty":"🎵","Ostatní":"📌"};
const GROUP_OF=c=>c==="Sport"?"sport":["Kino","Divadlo","Výstavy a galerie","Koncerty"].includes(c)?"kultura":"ostatni";
const DATES=[["dnes","Dnes"],["vikend","Tento víkend"],["tyden","Tento týden"],["vse","Kdykoli"]];
const MON=["led","úno","bře","dub","kvě","čvn","čvc","srp","zář","říj","lis","pro"];
const st={region:"jihomoravsky",group:"vse",cat:"Vše",date:"vse",q:"",shown:48};
let DATA={events:[],sources:{}};
const $=s=>document.querySelector(s);
const iso=d=>d.toLocaleDateString("sv-SE",{timeZone:"Europe/Prague"});
function addDays(s,n){const d=new Date(s+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
function range(){const t=iso(new Date());const wd=(new Date(t+"T12:00:00Z").getUTCDay()+6)%7;
  if(st.date==="dnes")return[t,t];
  if(st.date==="tyden")return[t,addDays(t,6-wd)];
  if(st.date==="vikend"){const sat=addDays(t,5-wd);return[wd>=5?t:sat,addDays(t,6-wd)]}
  return[t,"9999-12-31"]}
const fmt=s=>{const[y,m,d]=s.split("-");return`${+d}. ${+m}. ${y}`};
function when(e){return e.date_from===e.date_to?fmt(e.date_from):`${fmt(e.date_from)} – ${fmt(e.date_to)}`}
function dblock(e){const t=iso(new Date());const s=e.date_from<t?t:e.date_from;const[,m,d]=s.split("-");
  return`<div class="day"><b>${+d}</b><span>${MON[+m-1]}</span>${e.date_from<t?'<i>probíhá</i>':""}</div>`}
function esc(s){return(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function chips(el,items,key){el.innerHTML=items.map(([v,l])=>`<button data-v="${v}" class="${st[key]===v?"on":""}">${l}</button>`).join("");
  el.onclick=e=>{const b=e.target.closest("button");if(!b)return;st[key]=b.dataset.v;st.shown=48;render()}}
function render(){
  const g=GROUPS.find(x=>x[0]===st.group);document.body.dataset.group=st.group;
  const[a,b]=range();const q=st.q.toLowerCase();
  const base=DATA.events.filter(e=>e.region===st.region&&e.date_from<=b&&e.date_to>=a&&(!q||(e.name+" "+e.place+" "+e.city).toLowerCase().includes(q)));
  const cnt=k=>k==="vse"?base.length:base.filter(e=>GROUP_OF(e.category)===k).length;
  $("#groups").innerHTML=GROUPS.map(([k,l,i])=>`<button data-v="${k}" class="tab t-${k} ${st.group===k?"on":""}"><span class="ic">${i}</span>${l}<small>${cnt(k)}</small></button>`).join("");
  $("#groups").onclick=e=>{const t=e.target.closest("button");if(!t)return;st.group=t.dataset.v;st.cat="Vše";st.shown=48;render()};
  const sub=$("#cats");
  if(g[0]==="kultura"){sub.hidden=false;chips(sub,[["Vše","Vše"]].concat(g[3].map(c=>[c,ICON[c]+" "+c])),"cat")}else{sub.hidden=true}
  chips($("#dates"),DATES,"date");
  const list=base.filter(e=>(!g[3]||g[3].includes(e.category))&&(st.cat==="Vše"||e.category===st.cat));
  const rn=REGIONS.find(r=>r[0]===st.region)[1];
  if(!DATA.events.some(e=>e.region===st.region)){$("#info").textContent=rn;$("#list").innerHTML=`<li class="empty">${rn}: zatím bez zdrojů, přidáme brzy.</li>`;$("#more").hidden=true;return}
  $("#info").textContent=`${rn}: ${list.length} ${list.length===1?"akce":list.length<5&&list.length>0?"akce":"akcí"}`;
  $("#list").innerHTML=list.length?list.slice(0,st.shown).map(e=>{const s=DATA.sources[e.source]||{};const gk=GROUP_OF(e.category);return`<li class="ev g-${gk}">
   ${dblock(e)}<div class="body">
   <span class="cat">${ICON[e.category]||"📌"} ${esc(e.category)}</span>
   <a class="t" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.name)}</a>
   <div class="meta">🗓 ${when(e)}${e.time?" · "+esc(e.time):""}</div>
   ${[e.place,e.city].filter(Boolean).length?`<div class="meta">📍 ${esc([e.place,e.city].filter(Boolean).join(", "))}</div>`:""}
   <div class="meta src">Zdroj: <a href="${esc(s.url||e.url)}" target="_blank" rel="noopener">${esc(s.short_name||s.name||e.source)}</a></div></div></li>`}).join(""):`<li class="empty">Pro tento výběr nic nemáme. Zkus jiný den nebo sekci.</li>`;
  $("#more").hidden=list.length<=st.shown}
async function init(){
  const sel=$("#region");sel.innerHTML=REGIONS.map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
  sel.value=st.region;sel.onchange=()=>{st.region=sel.value;st.shown=48;render()};
  $("#q").oninput=e=>{st.q=e.target.value;st.shown=48;render()};
  $("#more").onclick=()=>{st.shown+=48;render()};
  try{DATA=await (await fetch("data/events.json",{cache:"no-cache"})).json()}catch(e){$("#info").textContent="Data se nepodařilo načíst."}
  $("#sources").innerHTML=Object.values(DATA.sources).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a> – licence <a href="${esc(s.license_url)}" target="_blank" rel="noopener">${esc(s.license)}</a>${s.fetched_at?`, staženo ${new Date(s.fetched_at).toLocaleString("cs-CZ",{timeZone:"Europe/Prague"})}`:""}${s.status==="stale"?" (poslední aktualizace selhala, zobrazujeme starší data)":""}</li>`).join("");
  $("#gen").textContent=DATA.generated_at?`Data vygenerována ${new Date(DATA.generated_at).toLocaleString("cs-CZ",{timeZone:"Europe/Prague"})}.`:"";
  render()}
init();
