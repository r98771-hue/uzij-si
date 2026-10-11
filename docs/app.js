const REGIONS=[["praha","Hlavní město Praha"],["stredocesky","Středočeský kraj"],["jihocesky","Jihočeský kraj"],["plzensky","Plzeňský kraj"],["karlovarsky","Karlovarský kraj"],["ustecky","Ústecký kraj"],["liberecky","Liberecký kraj"],["kralovehradecky","Královéhradecký kraj"],["pardubicky","Pardubický kraj"],["vysocina","Kraj Vysočina"],["jihomoravsky","Jihomoravský kraj"],["olomoucky","Olomoucký kraj"],["zlinsky","Zlínský kraj"],["moravskoslezsky","Moravskoslezský kraj"]];
const CATS=["Vše","Sport","Kino","Divadlo","Výstavy a galerie","Koncerty","Ostatní"];
const DATES=[["dnes","Dnes"],["vikend","Tento víkend"],["tyden","Tento týden"],["vse","Vše"]];
const st={region:"jihomoravsky",cat:"Vše",date:"vse",q:"",shown:50};
let DATA={events:[],sources:{}};
const $=s=>document.querySelector(s);
const iso=d=>d.toLocaleDateString("sv-SE",{timeZone:"Europe/Prague"});
function addDays(s,n){const d=new Date(s+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
function range(){const t=iso(new Date());const wd=(new Date(t+"T12:00:00Z").getUTCDay()+6)%7; // 0=Po
  if(st.date==="dnes")return[t,t];
  if(st.date==="tyden")return[t,addDays(t,6-wd)];
  if(st.date==="vikend"){const sat=addDays(t,5-wd);return[wd>=5?t:sat,addDays(t,6-wd)]}
  return[t,"9999-12-31"]}
const fmt=s=>{const[y,m,d]=s.split("-");return`${+d}. ${+m}. ${y}`};
function when(e){return e.date_from===e.date_to?fmt(e.date_from):`${fmt(e.date_from)} – ${fmt(e.date_to)}`}
function esc(s){return(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function chips(el,items,key){el.innerHTML=items.map(([v,l])=>`<button data-v="${v}" class="${st[key]===v?"on":""}">${l}</button>`).join("");
  el.onclick=e=>{const v=e.target.dataset.v;if(v==null)return;st[key]=v;st.shown=50;render()}}
function render(){
  chips($("#cats"),CATS.map(c=>[c,c]),"cat");chips($("#dates"),DATES,"date");
  const[a,b]=range();const q=st.q.toLowerCase();
  const hasRegion=DATA.events.some(e=>e.region===st.region);
  const list=DATA.events.filter(e=>e.region===st.region&&(st.cat==="Vše"||e.category===st.cat)&&e.date_from<=b&&e.date_to>=a&&(!q||(e.name+" "+e.place+" "+e.city).toLowerCase().includes(q)));
  const rn=REGIONS.find(r=>r[0]===st.region)[1];
  if(!hasRegion){$("#info").textContent=rn;$("#list").innerHTML=`<li class="empty">${rn}: zatím bez zdrojů, přidáme brzy.</li>`;$("#more").hidden=true;return}
  $("#info").textContent=`${rn}: ${list.length} ${list.length===1?"akce":list.length<5&&list.length>0?"akce":"akcí"}`;
  $("#list").innerHTML=list.length?list.slice(0,st.shown).map(e=>{const s=DATA.sources[e.source]||{};return`<li class="ev">
   <a class="t" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.name)}</a>
   <div class="meta"><span class="cat">${esc(e.category)}</span>${when(e)}${e.time?" · "+esc(e.time):""}</div>
   <div class="meta">${esc([e.place,e.city].filter(Boolean).join(", "))}</div>
   <div class="meta">Zdroj: <a href="${esc(s.url||e.url)}" target="_blank" rel="noopener">${esc(s.short_name||s.name||e.source)}</a></div></li>`}).join(""):`<li class="empty">Pro tento výběr nic nemáme. Zkus jiný den nebo kategorii.</li>`;
  $("#more").hidden=list.length<=st.shown}
async function init(){
  const sel=$("#region");sel.innerHTML=REGIONS.map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
  sel.value=st.region;sel.onchange=()=>{st.region=sel.value;st.shown=50;render()};
  $("#q").oninput=e=>{st.q=e.target.value;st.shown=50;render()};
  $("#more").onclick=()=>{st.shown+=50;render()};
  try{DATA=await (await fetch("data/events.json",{cache:"no-cache"})).json()}catch(e){$("#info").textContent="Data se nepodařilo načíst."}
  $("#sources").innerHTML=Object.values(DATA.sources).map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a> – licence <a href="${esc(s.license_url)}" target="_blank" rel="noopener">${esc(s.license)}</a>${s.fetched_at?`, staženo ${new Date(s.fetched_at).toLocaleString("cs-CZ",{timeZone:"Europe/Prague"})}`:""}${s.status==="stale"?" (poslední aktualizace selhala, zobrazujeme starší data)":""}</li>`).join("");
  $("#gen").textContent=DATA.generated_at?`Data vygenerována ${new Date(DATA.generated_at).toLocaleString("cs-CZ",{timeZone:"Europe/Prague"})}.`:"";
  render()}
init();
