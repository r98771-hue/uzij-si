# Etapa 1: kandidáti z oficiálních programů pořadatelů (ručně vybráno z jejich webů 16. 10. 2026)
# (kraj, název, od, do, čas, místo, město, kategorie, pořadatel, web pořadatele, program/odkaz)
O2=("O2 arena","https://www.o2arena.cz/","https://www.o2arena.cz/events/")
ND=("Národní divadlo","https://www.narodni-divadlo.cz/","https://www.narodni-divadlo.cz/cs/program")
CF=("Česká filharmonie","https://www.ceskafilharmonie.cz/","https://www.ceskafilharmonie.cz/program/")
MDMB=("Městské divadlo Mladá Boleslav","https://www.mdmb.cz/","https://www.mdmb.cz/program/")
JD=("Jihočeské divadlo","https://www.jihoceskedivadlo.cz/","https://www.jihoceskedivadlo.cz/program")
DJKT=("Divadlo J. K. Tyla v Plzni","https://www.djkt.eu/","https://www.djkt.eu/program")
KVA=("Mattoni Arena Karlovy Vary","https://kvarena.cz/","https://kvarena.cz/akce/")
CS=("Činoherní studio Ústí nad Labem","https://cinoherak.cz/","https://cinoherak.cz/program/")
DFXS=("Divadlo F. X. Šaldy Liberec","https://www.saldovo-divadlo.cz/","https://www.saldovo-divadlo.cz/program")
KD=("Klicperovo divadlo","https://www.klicperovodivadlo.cz/","https://www.klicperovodivadlo.cz/program/")
VCD=("Východočeské divadlo Pardubice","https://www.vcd.cz/","https://www.vcd.cz/program/")
HDJ=("Horácké divadlo Jihlava","https://www.hdj.cz/","https://www.hdj.cz/program/")
MFO=("Moravská filharmonie Olomouc","https://www.mfo.cz/","https://www.mfo.cz/program/")
MDO=("Moravské divadlo Olomouc","https://moravskedivadlo.cz/","https://moravskedivadlo.cz/cs/program")
MDZ=("Městské divadlo Zlín","https://divadlozlin.cz/","https://divadlozlin.cz/program/")
NDM=("Národní divadlo moravskoslezské","https://www.ndm.cz/","https://www.ndm.cz/cz/")
JFO=("Janáčkova filharmonie Ostrava","https://www.jfo.cz/","https://www.jfo.cz/koncerty/")
FHK=("Filharmonie Hradec Králové","https://www.fhk.cz/","https://www.fhk.cz/123/Kalendar_koncertu/")
# Ověřeno ručně přes čtení stránky (web blokuje automatické stažení): mdmb.cz, divadlozlin.cz, vcd.cz (datum bez měsíce v řádku)
MANUAL={"https://www.mdmb.cz/program/","https://divadlozlin.cz/program/","https://www.vcd.cz/program/","https://divadlozlin.cz/predstaveni/don-quijote/"}
C=[
("praha","Český mejdan s Impulsem 2026","2026-10-17",None,"18:00","O2 arena","Praha","Koncerty",O2),
("praha","The World of Hans Zimmer – A New Dimension","2026-10-25",None,"19:30","O2 arena","Praha","Koncerty",O2),
("praha","Don Toliver: Nitrous – Octane World Tour","2026-10-30",None,"20:00","O2 arena","Praha","Koncerty",O2),
("praha","Česko – Švédsko (hokej, reprezentace)","2026-11-05",None,"18:30","O2 arena","Praha","Sport",O2),
("praha","Kabát – Turné 2026","2026-11-10","2026-11-11","20:00","O2 arena","Praha","Koncerty",O2),
("praha","Sima v O2 areně","2026-11-13",None,"20:00","O2 arena","Praha","Koncerty",O2),
("praha","Lord of the Dance 2026","2026-11-14",None,"20:00","O2 arena","Praha","Divadlo",O2),
("praha","KoRn – Euro Tour 2026","2026-11-16",None,"19:30","O2 arena","Praha","Koncerty",O2),
("praha","Pitbull – I'm Back!","2026-11-22",None,"20:00","O2 arena","Praha","Koncerty",O2),
("praha","The Prodigy","2026-11-23",None,"20:00","O2 arena","Praha","Koncerty",O2),
("praha","Sarah Brightman – A Winter Symphony","2026-11-26",None,"19:30","O2 arena","Praha","Koncerty",O2),
("praha","Pelleas a Melisanda (2. premiéra)","2026-10-18",None,"19:00","Národní divadlo","Praha","Divadlo",ND),
("praha","L'Histoire de Manon (balet)","2026-10-17",None,"14:00","Státní opera","Praha","Divadlo",ND),
("praha","Prodaná nevěsta","2026-10-17",None,"19:00","Národní divadlo","Praha","Divadlo",ND),
("praha","Česká filharmonie • Semjon Byčkov: Smetana a Rachmaninov","2026-10-21","2026-10-22","19:30","Rudolfinum","Praha","Koncerty",CF),
("stredocesky","Sugar (premiéra muzikálové komedie)","2026-10-23",None,"19:00","Městské divadlo Mladá Boleslav","Mladá Boleslav","Divadlo",MDMB),
("stredocesky","Cyrano z Bergeracu","2026-11-02",None,"19:00","Městské divadlo Mladá Boleslav","Mladá Boleslav","Divadlo",MDMB),
("stredocesky","Králova řeč","2026-11-09",None,"19:00","Městské divadlo Mladá Boleslav","Mladá Boleslav","Divadlo",MDMB),
("stredocesky","Postřižiny","2026-11-11",None,"19:00","Městské divadlo Mladá Boleslav","Mladá Boleslav","Divadlo",MDMB),
("stredocesky","40. Swingový večer s Jakubem Šafrem","2026-11-20",None,"19:00","Městské divadlo Mladá Boleslav","Mladá Boleslav","Koncerty",MDMB),
("stredocesky","Kuchyňská revue, Příběh vojáka (Martinů, Stravinskij)","2026-12-07",None,"19:00","Městské divadlo Mladá Boleslav","Mladá Boleslav","Divadlo",MDMB),
("jihocesky","Čardášová princezna (premiéra)","2026-10-23",None,"19:30","Jihočeské divadlo","České Budějovice","Divadlo",JD),
("jihocesky","Loutna česká – koncertní provedení","2026-11-02",None,"19:30","Jihočeské divadlo","České Budějovice","Koncerty",JD),
("jihocesky","Babi Bejvávalo (premiéra)","2026-11-21",None,"17:00","Malé divadlo","České Budějovice","Divadlo",JD),
("jihocesky","Marilyn (premiéra baletu)","2026-12-04",None,"19:30","Jihočeské divadlo","České Budějovice","Divadlo",JD),
("plzensky","Bohéma (premiéra)","2026-10-17",None,"19:00","Velké divadlo","Plzeň","Divadlo",DJKT,"https://www.djkt.eu/program"),
("plzensky","Jesus Christ Superstar","2026-10-17",None,"19:00","Nová scéna","Plzeň","Divadlo",DJKT),
("plzensky","Psohlavci","2026-10-20",None,"19:00","Velké divadlo","Plzeň","Divadlo",DJKT),
("plzensky","Hrdina Západu (premiéra)","2026-10-31",None,"19:00","Malá scéna","Plzeň","Divadlo",DJKT,"https://www.djkt.eu/program"),
("plzensky","Anna Pavlova (premiéra baletu)","2026-11-14",None,"19:00","Velké divadlo","Plzeň","Divadlo",DJKT,"https://www.djkt.eu/program"),
("plzensky","Strakonický dudák (premiéra)","2026-12-12",None,"19:00","Velké divadlo","Plzeň","Divadlo",DJKT,"https://www.djkt.eu/program"),
("karlovarsky","OKTAGON 95: Karlovy Vary","2026-10-17",None,"18:00","Mattoni Arena","Karlovy Vary","Sport",KVA),
("karlovarsky","VK ČEZ Karlovarsko – VK Dukla Liberec (volejbal)","2026-10-24",None,"18:00","Mattoni Arena","Karlovy Vary","Sport",KVA),
("karlovarsky","Florbal Vary Bohemians – FBC Česká Lípa","2026-10-25",None,"17:00","Mattoni Arena","Karlovy Vary","Sport",KVA),
("karlovarsky","VK ČEZ Karlovarsko – Black Volley Beskydy (volejbal)","2026-10-31",None,"18:00","Mattoni Arena","Karlovy Vary","Sport",KVA,"https://kvarena.cz/udalost/vk-cez-karlovarsko-black-volley-beskydy-4/"),
("karlovarsky","VK ČEZ Karlovarsko – Volejbal Brno","2026-11-14",None,"18:00","Mattoni Arena","Karlovy Vary","Sport",KVA,"https://kvarena.cz/udalost/vk-cez-karlovarsko-volejbal-brno-4/"),
("karlovarsky","Lord of the Dance","2026-11-15",None,"19:00","Mattoni Arena","Karlovy Vary","Divadlo",KVA,"https://kvarena.cz/udalost/lord-of-the-dance-2/"),
("karlovarsky","VK ČEZ Karlovarsko – VK Trox Příbram (volejbal)","2026-11-21",None,"18:00","Mattoni Arena","Karlovy Vary","Sport",KVA,"https://kvarena.cz/udalost/vk-cez-karlovarsko-vk-trox-pribram-4/"),
("karlovarsky","VK ČEZ Karlovarsko – Kladno volejbal cz","2026-12-05",None,"18:00","Mattoni Arena","Karlovy Vary","Sport",KVA,"https://kvarena.cz/udalost/vk-cez-karlovarsko-kladno-volejbal-cz-4/"),
("ustecky","Válka s mloky","2026-10-18",None,"19:00","Činoherní studio","Ústí nad Labem","Divadlo",CS),
("ustecky","Peer Gynt","2026-10-21",None,"19:00","Činoherní studio","Ústí nad Labem","Divadlo",CS),
("ustecky","Střekovská kamera (filmový festival)","2026-10-23","2026-10-24","09:00","Činoherní studio","Ústí nad Labem","Kino",CS),
("ustecky","Oidipus Utopia","2026-11-06",None,"19:00","Činoherní studio","Ústí nad Labem","Divadlo",CS),
("ustecky","Svatá Johana z jatek (premiéra)","2026-11-13",None,"19:00","Činoherní studio","Ústí nad Labem","Divadlo",CS),
("ustecky","Milenci z kiosku","2026-11-20",None,"19:00","Činoherní studio","Ústí nad Labem","Divadlo",CS),
("liberecky","Orfeus v podsvětí (premiéra)","2026-10-17",None,"19:00","Divadlo F. X. Šaldy","Liberec","Divadlo",DFXS),
("liberecky","Mauglí (balet)","2026-10-20",None,"19:00","Divadlo F. X. Šaldy","Liberec","Divadlo",DFXS),
("liberecky","Fichtl – Divadlo Bolka Polívky (host)","2026-10-21",None,"19:00","Divadlo F. X. Šaldy","Liberec","Divadlo",DFXS),
("liberecky","Cirkus Humberto","2026-10-24",None,"19:00","Divadlo F. X. Šaldy","Liberec","Divadlo",DFXS),
("liberecky","Rozbité zrcadlo","2026-10-16",None,"19:00","Divadlo F. X. Šaldy","Liberec","Divadlo",DFXS),
("kralovehradecky","Hudební fórum HK: Penderecki • Górecki • Kilar","2026-10-20",None,"20:00","Filharmonie Hradec Králové – Sál Soni Červené","Hradec Králové","Koncerty",FHK,"https://www.fhk.cz/123/Kalendar_koncertu/"),
("kralovehradecky","Hudební fórum HK: Golijov • Contreras • Ortiz","2026-10-22",None,"20:00","Filharmonie Hradec Králové – Sál Soni Červené","Hradec Králové","Koncerty",FHK,"https://www.fhk.cz/123/Kalendar_koncertu/"),
("kralovehradecky","Slavnostní koncert ke Dni vzniku samostatného československého státu","2026-10-27",None,"18:00","Filharmonie Hradec Králové – Sál Soni Červené","Hradec Králové","Koncerty",FHK),
("kralovehradecky","Osmyčky (Zelená koncertní řada)","2026-11-01",None,"19:00","Filharmonie Hradec Králové – Sál Soni Červené","Hradec Králové","Koncerty",FHK),
("kralovehradecky","Opera je cool (filHRAmonie pro rodiny)","2026-11-07",None,"16:00","Filharmonie Hradec Králové – Sál Soni Červené","Hradec Králové","Koncerty",FHK),
("pardubicky","Postřižiny (premiéra)","2026-10-17","2026-10-18","19:00","Městské divadlo","Pardubice","Divadlo",VCD),
("vysocina","Bílá velryba (premiéra)","2026-10-17",None,"19:00","Horácké divadlo – Velká scéna","Jihlava","Divadlo",HDJ),
("vysocina","Bílá velryba","2026-10-21",None,"19:00","Horácké divadlo – Velká scéna","Jihlava","Divadlo",HDJ),
("olomoucky","Slavnostní koncert ke Dni vzniku samostatného československého státu","2026-10-28",None,"19:00","Reduta","Olomouc","Koncerty",MFO),
("olomoucky","Koncert filmových melodií","2026-11-21",None,"19:00","Reduta","Olomouc","Koncerty",MFO,"https://www.mfo.cz/program/"),
("olomoucky","Vánoční koncert. České koledy a sólo pro lesní roh","2026-12-17",None,"19:00","Reduta","Olomouc","Koncerty",MFO),
("olomoucky","Bořiny za břehem","2026-10-27",None,"19:00","Moravské divadlo","Olomouc","Divadlo",MDO),
("olomoucky","Čert a Káča","2026-11-19",None,"19:00","Moravské divadlo","Olomouc","Divadlo",MDO),
("olomoucky","Zvoník u Matky Boží","2026-12-08",None,"19:00","Moravské divadlo","Olomouc","Divadlo",MDO),
("zlinsky","Volpone","2026-10-23",None,"19:00","Městské divadlo Zlín – Velký sál","Zlín","Divadlo",MDZ),
("zlinsky","Zase spolu (Reunion)","2026-10-24",None,"19:00","Městské divadlo Zlín – Velký sál","Zlín","Divadlo",MDZ),
("zlinsky","Don Quijote (premiéra)","2026-11-14",None,"19:00","Městské divadlo Zlín – Velký sál","Zlín","Divadlo",MDZ,"https://divadlozlin.cz/predstaveni/don-quijote/"),
("zlinsky","Pretty Woman – muzikál","2026-10-16",None,"19:00","Městské divadlo Zlín – Velký sál","Zlín","Divadlo",MDZ),
("moravskoslezsky","Zkouška orchestru (premiéra)","2026-10-24",None,"18:30","Národní divadlo moravskoslezské","Ostrava","Divadlo",NDM,"https://www.ndm.cz/cz/cinohra/program/"),
("moravskoslezsky","Requiem – Giuseppe Verdi (2. premiéra)","2026-10-17",None,"18:30","Národní divadlo moravskoslezské","Ostrava","Koncerty",NDM),
("moravskoslezsky","Piotr Anderszewski – klavírní recitál (Brahms, Beethoven)","2026-10-19",None,"19:00","","Ostrava","Koncerty",JFO),
("moravskoslezsky","Vranického Symfonie míru","2026-10-27",None,"19:00","","Ostrava","Koncerty",JFO),
("moravskoslezsky","Dobré zprávy – Dvořák, Gemrot, Rossini","2026-11-05",None,"18:00","","Ostrava","Koncerty",JFO),
("moravskoslezsky","Vojtěch Dyk & JFO","2026-11-10","2026-11-11","18:00","","Ostrava","Koncerty",JFO),
]
