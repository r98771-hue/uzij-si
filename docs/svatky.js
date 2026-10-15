// Český kalendář jmen (index = den v měsíci - 1); "" = den bez jména (státní svátek)
const JMENINY=[
"|Karina|Radmila|Diana|Dalimil|Kašpar, Melichar, Baltazar|Vilma|Čestmír|Vladan|Břetislav|Bohdana|Pravoslav|Edita|Radovan|Alice|Ctirad|Drahoslav|Vladislav|Doubravka|Ilona|Běla|Slavomír|Zdeněk|Milena|Miloš|Zora|Ingrid|Otýlie|Zdislava|Robin|Marika",
"Hynek|Nela|Blažej|Jarmila|Dobromila|Vanda|Veronika|Milada|Apolena|Mojmír|Božena|Slavěna|Věnceslav|Valentýn|Jiřina|Ljuba|Miloslava|Gizela|Patrik|Oldřich|Lenka|Petr|Svatopluk|Matěj|Liliana|Dorota|Alexandr|Lumír|Horymír",
"Bedřich|Anežka|Kamil|Stela|Kazimír|Miroslav|Tomáš|Gabriela|Františka|Viktorie|Anděla|Řehoř|Růžena|Rút a Matylda|Ida|Elena a Herbert|Vlastimil|Eduard|Josef|Světlana|Radek|Leona|Ivona|Gabriel|Marián|Emanuel|Dita|Soňa|Taťána|Arnošt|Kvido",
"Hugo|Erika|Richard|Ivana|Miroslava|Vendula|Heřman a Hermína|Ema|Dušan|Darja|Izabela|Julius|Aleš|Vincenc|Anastázie|Irena|Rudolf|Valérie|Rostislav|Marcela|Alexandra|Evženie|Vojtěch|Jiří|Marek|Oto|Jaroslav|Vlastislav|Robert|Blahoslav",
"|Zikmund|Alexej|Květoslav|Klaudie|Radoslav|Stanislav||Ctibor|Blažena|Svatava|Pankrác|Servác|Bonifác|Žofie|Přemysl|Aneta|Nataša|Ivo|Zbyšek|Monika|Emil|Vladimír|Jana|Viola|Filip|Valdemar|Vilém|Maxmilián|Ferdinand|Kamila",
"Laura|Jarmil|Tamara|Dalibor|Dobroslav|Norbert|Iveta a Slavoj|Medard|Stanislava|Gita|Bruno|Antonie|Antonín|Roland|Vít|Zbyněk|Adolf|Milan|Leoš|Květa|Alois|Pavla|Zdeňka|Jan|Ivan|Adriana|Ladislav|Lubomír|Petr a Pavel|Šárka",
"Jaroslava|Patricie|Radomír|Prokop|||Bohuslava|Nora|Drahoslava|Libuše a Amálie|Olga|Bořek|Markéta|Karolína|Jindřich|Luboš|Martina|Drahomíra|Čeněk|Ilja|Vítězslav|Magdaléna|Libor|Kristýna|Jakub|Anna|Věroslav|Viktor|Marta|Bořivoj|Ignác",
"Oskar|Gustav|Miluše|Dominik|Kristián|Oldřiška|Lada|Soběslav|Roman|Vavřinec|Zuzana|Klára|Alena|Alan|Hana|Jáchym|Petra|Helena|Ludvík|Bernard|Johana|Bohuslav|Sandra|Bartoloměj|Radim|Luděk|Otakar|Augustýn|Evelína|Vladěna|Pavlína",
"Linda a Samuel|Adéla|Bronislav|Jindřiška|Boris|Boleslav|Regína|Mariana|Daniela|Irma|Denisa|Marie|Lubor|Radka|Jolana|Ludmila|Naděžda|Kryštof|Zita|Oleg|Matouš|Darina|Berta|Jaromír|Zlata|Andrea|Jonáš|Václav|Michal|Jeroným",
"Igor|Olivie a Oliver|Bohumil|František|Eliška|Hanuš|Justýna|Věra|Štefan a Sára|Marina|Andrej|Marcel|Renáta|Agáta|Tereza|Havel|Hedvika|Lukáš|Michaela|Vendelín|Brigita|Sabina|Teodor|Nina|Beáta|Erik|Šarlota a Zoe||Silvie|Tadeáš|Štěpánka",
"Felix|Památka zesnulých|Hubert|Karel|Miriam|Liběna|Saskie|Bohumír|Bohdan|Evžen|Martin|Benedikt|Tibor|Sáva|Leopold|Otmar|Mahulena|Romana|Alžběta|Nikola|Albert|Cecílie|Klement|Emílie|Kateřina|Artur|Xenie|René|Zina|Ondřej",
"Iva|Blanka|Svatoslav|Barbora|Jitka|Mikuláš|Ambrož a Benjamín|Květoslava|Vratislav|Julie|Dana|Simona|Lucie|Lýdie|Radana a Radan|Albína|Daniel|Miloslav|Ester|Dagmar|Natálie|Šimon|Vlasta|Adam a Eva||Štěpán|Žaneta|Bohumila|Judita|David|Silvestr"
].map(m=>m.split("|"));
const SVATKY={"1-1":"Nový rok, Den obnovy samostatného českého státu","5-1":"Svátek práce","5-8":"Den vítězství","7-5":"Den slovanských věrozvěstů Cyrila a Metoděje","7-6":"Den upálení mistra Jana Husa","9-28":"Den české státnosti","10-28":"Den vzniku samostatného československého státu","11-17":"Den boje za svobodu a demokracii","12-24":"Štědrý den","12-25":"1. svátek vánoční","12-26":"2. svátek vánoční"};
function velikonoce(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=(h+l-7*m+114)%31+1;return new Date(Date.UTC(y,mo-1,da))}
function statniSvatek(y,m,d){const k=m+"-"+d;if(SVATKY[k])return SVATKY[k];const e=velikonoce(y);
  const f=new Date(e);f.setUTCDate(e.getUTCDate()-2);const p=new Date(e);p.setUTCDate(e.getUTCDate()+1);
  if(f.getUTCMonth()+1===m&&f.getUTCDate()===d)return"Velký pátek";if(p.getUTCMonth()+1===m&&p.getUTCDate()===d)return"Velikonoční pondělí";return""}
const jmeno=(m,d)=>JMENINY[m-1][d-1]||"";
