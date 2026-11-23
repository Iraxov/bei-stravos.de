(function(){
'use strict';
document.documentElement.className+=' js';
var MAIL='stavros-stamatis@t-online.de';
/* Google-Rezension: Alle Sterne und der Button nutzen den Link in RV (siehe unten). Optional kann hier eine Place ID aus dem Google-Unternehmensprofil eingetragen werden, dann führt der Link direkt zum Bewertungsfenster. */
var PLACE_ID='';
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var root=document.documentElement;
var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
var NOTE='Zu allen Gerichten reichen wir wahlweise Reis, Pommes, Kartoffelgratin oder griechische Ofenkartoffeln, dazu frischer Salat und Tzatziki.';

/* ===== Speisekarte: [Nummer, Name, Beschreibung, Preis, Preis prüfen] ===== */
var M=[
{id:'angebote',t:'Angebote',a:'gold',i:[
['','Sonderangebot: Empfehlung unseres Chefkochs Christos','Für 2 Personen und mehr: Mese Vorspeisenplatte, Gyros, Souvlaki, Bifteki und Schweinesteak, Beilagensalat, dazu Reis, Pommes, griechische Ofenkartoffeln oder Kartoffelgratin als Beilage und Dessert. Die Platte kann für 2, 3, 4 und auch mehr Personen angerichtet werden. Eine kleine kulinarische Reise mit unserem Chefkoch.','pro Person=21,00'],
['','Mittagstisch am Sonntag, 11:30 bis 14:30 Uhr','Tagessuppe, Beilagensalat, Hähnchenbrustfilet, Bifteki, Souvlaki und Gyros vom Grill, dazu Reis, Pommes, griechische Ofenkartoffeln oder Kartoffelgratin als Beilage und Dessert.','pro Person=20,00']]},
{id:'vorspeisen',t:'Vorspeisen',a:'olive',i:[
['1','Hühnersuppe','','5,00'],
['2','Zwiebelsuppe','mit Käse','5,00'],
['3','Gulaschsuppe','','5,00'],
['4','Tomatencremesuppe','','5,00'],
['5','Tzatziki','Griechische Joghurtspezialität mit Gurken und Knoblauch','5,00'],
['6','Tarama','Fischrogencreme, der Kaviar der Griechen','6,00'],
['7','Skordalia','Kartoffel-Knoblauchpüree','6,00'],
['8','Chtipiti, Tyrokafteri','Creme aus Schafskäse und Chilischoten (scharf)','6,00'],
['9','Dolmadakia','Weinblätter gefüllt mit Reis und Hackfleisch','6,00'],
['10','Schwarze Oliven und milde Peperoni','','5,00'],
['11','Mese-Teller für 2 Personen (kalt und warm)','Chtipiti, Skordalia, Tzatziki, Dolmadakia, gegrillte Paprika, Florinis, Keftadakia aus der Pfanne (Hackfleischbällchen), Tyrpita aus dem Backofen (Schafskäseblätterteigtasche) und panierte Zucchini','15,00'],
['12','Peperoni vom Grill','in Knoblauchöl','8,00']]},
{id:'kaese',t:'Käsespezialitäten',a:'olive',i:[
['13','Feta','original griechischer Schafskäse mit Oregano garniert und Olivenöl','7,50'],
['14','Feta Saganaki Stavros','panierter Fetakäse aus der Pfanne auf Rucola und Tomaten','9,00'],
['15','Halloumi','gebraten auf Rucola, Tomaten und Honig','9,00']]},
{id:'salate',t:'Salate',a:'olive',i:[
['16','Gyros Salat','','12,50'],
['17','Choriatiki – griechischer Bauernsalat','Tomaten, Gurken, Oliven, Peperoni, Schafskäse, Paprika, rote Zwiebeln und Olivenöl','10,50'],
['18','Rucola-Salat','mit Tomaten und geriebenem Schafskäse in Olivenöl','9,00'],
['19','Gemischter Salat','','8,00'],
['20','Hähnchenbrustfiletsalat','Eisbergsalat, Lollo Rosso, Tomaten, Gurken, rote Zwiebeln, Mais und Paprika','12,00']]},
{id:'schwein',t:'Grillspezialitäten vom Schwein',a:'terra',note:NOTE,i:[
['21','Gyros-Teller','wahlweise mit Reis, Pommes oder griechischen Ofenkartoffeln, dazu frischer Salat und Tzatziki','13,50'],
['22','Gyros Pfanne','mit Metaxa und Goudakäse aus dem Ofen','15,50'],
['23','Souvlaki','2 Schweinefleischspieße vom Grill und Tomaten','14,50'],
['24','Souvlaki-Feta','2 Souvlaki gefüllt mit Fetakäse','15,50'],
['25','Leber','gegrillt mit gerösteten Zwiebeln','13,00'],
['26','Saloniki-Teller','2 Rückensteaks mit Tomaten-Paprika oder Metaxa-Sauce','15,50']]},
{id:'schweinefilets',t:'Schweinefilets',a:'terra',note:NOTE,i:[
['27','Schweinefilet','mit Feta-Käse und Tomaten gefüllt auf Rucolasalat und Tomaten','17,50'],
['27a','Christos Spezial: Schweinefilet von Mykonos','mit Sauce Hollandaise','19,50']]},
{id:'lamm',t:'Grillspezialitäten vom Lamm',a:'terra',note:NOTE,i:[
['28','2 Lammspieße','','19,50'],
['29','Lammkoteletts 5 (Paidakia)','','18,50'],
['30','Lammteller','2 Lammkoteletts, ein großer Lammspieß und Lammragout','20,50'],
['30a','Lammfleisch','mit Kritharaki (griechische Nudeln mit Käse überbacken)','17,50'],
['30b','Lammfleisch','mit grünen Bohnen (keine Beilage)','17,50'],
['30c','Lammfleisch','mit Auberginen (keine Beilage)','17,50'],
['30d','Lammfleisch Stifado','mit kleinen Zwiebeln (keine Beilage)','17,50']]},
{id:'gemischt',t:'Gemischte Spezialitäten',a:'terra',note:NOTE,i:[
['31','Kykladen Platte','Gyros, Hacksteak, Schweinespieß','15,50'],
['32','Akropolis Platte','Gyros, 1 Souvlaki','15,50'],
['33','Korfu Platte','Gyros, 2 Hacksteaks','16,50'],
['34','Parga Platte','Gyros, Leber, 2 Hacksteaks','17,50'],
['35','Rhodos Platte','Gyros, 1 Schweinefilet, 1 Hacksteak, 1 Souvlaki','17,50'],
['36','Kos Platte','Gyros, 2 Lammkoteletts, 1 Schweinesteak','16,50'],
['37','Mykonos Platte','Gyros, 1 Hacksteak, 2 Lammkoteletts','17,50'],
['38','Paros Platte','Gyros, 1 Souvlaki, 1 Lammkotelett und 1 Hacksteak','17,50'],
['39','Thassos Platte','Gyros, 1 Lammspieß, 1 Schweinefiletspieß','17,50'],
['40','Kreta Platte','Gyros, panierte Calamares','18,00'],
['41','Ioannina Platte','Gyros, 1 Schweinefiletspieß, 1 Hähnchenbrustspieß','18,00']]},
{id:'platten2',t:'Platten für zwei Personen',a:'terra',note:NOTE,i:[
['42','Christiane Platte','Gyros, 2 Lammkoteletts, 2 Souvlaki, 2 Hacksteaks','38,00'],
['43','Platon Platte','Gyros, 2 Schweinefilets, 2 Hähnchenbrustfilets, 2 Lammspieße','41,00']]},
{id:'hack',t:'Hackfleischspezialitäten',a:'terra',note:NOTE,i:[
['44','Bifteki Stavros','großes Hacksteak gefüllt mit Schafskäse und Tomaten','15,00'],
['45','Sousoukakia','3 Hacksteaks mit Tomaten-Paprika oder Metaxa-Sauce','15,00']]},
{id:'ofen',t:'Überbackene und Ofenspezialitäten',a:'terra',note:NOTE,i:[
['47','Zwei Souvlaki in Sauce','','14,50'],
['48','Zwei Schweinerückensteaks in Sauce','','16,00'],
['49','Sousoukakia (2 Hacksteaks) in Sauce','','13,00'],
['50','Hähnchenbrustfilet in Sauce','','13,00']]},
{id:'tiganakia',t:'Tiganakia, Pfännchengerichte',a:'terra',note:NOTE,i:[
['52','Schweinefiletmedaillons','in Metaxa-Sauce oder Champignon-Sauce','17,50'],
['53','Hähnchengeschnetzeltes','in Metaxa-Sauce oder Champignon-Sauce','16,00']]},
{id:'gefluegel',t:'Geflügelspezialitäten vom Grill',a:'terra',note:NOTE,i:[
['54','Großes Hähnchenbrustfilet','','17,00']]},
{id:'backofen',t:'Backofenspezialitäten',a:'terra',note:NOTE,i:[
['55','Moussaka','Auberginen-Hackfleischauflauf mit Bechamelsauce','14,00']]},
{id:'vegetarisch',t:'Vegetarische Gerichte',a:'olive',note:NOTE,i:[
['56','Kritharaki','griechische Nudeln in Tomatensauce mit geriebenem Schafskäse überbacken','9,00'],
['57','Gemista','Paprika und Tomaten gefüllt mit Reis, dazu griechische Ofenkartoffeln und Tzatziki','14,00'],
['58','Gigantes – Aubergine','griechische dicke Bohnen in Tomatensauce, begleitet mit Aubergine, dazu gratinierter Fetakäse, Tomaten und Zwiebeln, ohne Vorspeisensalat','12,00']]},
{id:'fisch',t:'Fischspezialitäten',a:'blue',i:[
['60','Scampis (5 Stk)','mit Frischlauchzwiebeln, Paprika und Tomatensauce','20,00'],
['61','Calamares paniert aus der Pfanne','mit 3 kleinen Vorspeisen: Tzatziki, Tarama, Skordalia','16,50'],
['62','Lachsfilet aus der Pfanne','mit Blattspinat oder Gemüse und griechischen Ofenkartoffeln','18,00'],
['63','Großes Schollenfilet aus der Pfanne','mit Blattspinat oder Gemüse und griechischen Ofenkartoffeln','18,00'],
['64','Fischplatte Aphrodite','ein großes Schollenfilet, ein Lachsfilet und panierte Calamares mit Blattspinat oder Gemüse und griechischen Ofenkartoffeln','20,50']]},
{id:'kinder',t:'Für unsere kleinen Gäste',a:'gold',i:[
['66','Jason','Gyros mit Pommes','10,00'],
['67','Achilles','Souvlaki mit Pommes','10,00'],
['68','Penelope','2 kleine Hacksteaks mit Pommes','10,00'],
['69','Agamemnon','Griechische Nudeln in Tomatensauce','9,00']]},
{id:'beilagen',t:'Beilagen',a:'sand',i:[
['70','Butterreis','','3,00'],
['71','Djuwetschreis','Reis in würziger Mischung mit Gemüse','3,00'],
['72','Pommes Frites','','3,00'],
['73','Griechische Ofenkartoffeln','','4,50'],
['73a','Kartoffelgratin','','5,00'],
['74','Frisches Gemüse aus der Pfanne','Auberginen, Zucchini, Paprika','7,00'],
['75','Dicke weiße Riesen-Bohnen','in Tomatensauce','6,00'],
['76','Griechische Nudeln','Kritharaki','5,00'],
['77','Frischer Blattspinat','','5,50']]},
{id:'saucen',t:'Saucen',a:'sand',i:[
['a','Metaxa-Sauce','','3,00'],
['b','Champignon-Sauce','','3,00'],
['c','Tomaten-Paprika-Sauce','','3,00'],
['d','Senf-Sauce','','3,00'],
['e','Chili-Sauce','','3,00'],
['f','Knoblauch-Sauce','','3,00'],
['g','Schafskäse-Sauce','','3,00'],
['i','Ketchup','','0,50'],
['j','Mayonnaise','','0,50']]},
{id:'extra',t:'Extra lecker',a:'terra',note:NOTE,i:[
['78','Gyros überbacken','mit Champignon-Rahmsauce','16,50'],
['80','Schweinemedaillons','mit Champignon-Rahmsauce, mit Käse und Bratkartoffeln','17,50'],
['81','Schweinesteak','mit Champignon-Rahmsauce, Käse und Bratkartoffeln','18,00']]},
{id:'schnitzel',t:'Schnitzelgerichte',a:'terra',note:NOTE,i:[
['85','Champignon Rahmschnitzel','mit gebratenen Champignons in Sahnesauce','klein=10,50/groß=13,50'],
['86','Zwiebelschnitzel','mit gebratenen Zwiebeln','klein=10,50/groß=13,50'],
['87','Hawaii Schnitzel','mit Ananas und Käse überbacken','klein=10,50/groß=13,50']]},
{id:'rind',t:'Vom Rind',a:'terra',note:NOTE,i:[
['88','Rumpsteak','wahlweise mit Zwiebeln, Pfeffersauce oder Kräuterbutter','200 g=19,00'],
['89','Rinderfilet','wahlweise mit Kräuterbutter, gebratenen Zwiebeln oder Pfeffersauce','200 g=22,00']]},
{id:'pizza',t:'Pizza',a:'wine',i:[
['101','Pizza Margherita','','24 cm=7,50/28 cm=8,50'],
['102','Pizza Paprika','','24 cm=7,50/28 cm=9,50'],
['103','Pizza Schinken','','24 cm=7,50/28 cm=9,00'],
['104','Pizza Salami','','24 cm=7,50/28 cm=9,00'],
['105','Pizza Hawaii','Schinken und Ananas','24 cm=8,00/28 cm=10,50'],
['106','Pizza Tonno','','24 cm=8,00/28 cm=10,50'],
['107','Pizza Gyros','','24 cm=9,50/28 cm=12,50'],
['108','Pizza Vegetaria','Blattspinat, Mozzarella und Knoblauch','24 cm=7,00/28 cm=9,50'],
['109','Pizza Balkan','mit Schafskäse, Peperoni und Oliven','24 cm=7,50/28 cm=10,50']]},
{id:'dessert',t:'Dessert',a:'gold',i:[
['110','Milchgrießkuchen','Galaktobureko','4,50'],
['111','Griechischer Joghurt','','4,50']]},
{id:'alkoholfrei',t:'Alkoholfreie Getränke',a:'blue',i:[
['112','Wasser','','0,2 l=2,20/1 l=3,50'],
['113','Coca Cola','Zusatzstoffe: 1, 9','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50'],
['114','Coca Cola Light','Zusatzstoffe: 1, 9, 11, 12','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50'],
['115','Fanta','Zusatzstoffe: 1, 3','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50'],
['116','Sprite','','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50'],
['117','Apfelschorle','','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50'],
['118','Apfelsaft','','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50'],
['119','Orangensaft','','0,2 l=2,20/0,3 l=2,50/0,5 l=3,50']]},
{id:'heiss',t:'Heiße Getränke',a:'blue',i:[
['122','Tasse Kaffee','','2,60'],
['123','Griechischer Mocca','','2,50'],
['124','Espresso','','2,40'],
['126','Tee','diverse Sorten','2,50']]},
{id:'bier',t:'Bier',a:'wine',i:[
['127','Bitburger Pils','','0,2 l=2,00/0,3 l=3,00/0,5 l=4,50'],
['128','Krombacher Pils','','0,2 l=2,00/0,3 l=3,00/0,5 l=4,50'],
['129','Krombacher Pils dunkel','','0,2 l=2,00/0,3 l=3,00/0,5 l=4,50'],
['130','Krombacher Pils alkoholfrei','','0,3 l=3,00'],
['131','König Pilsner','','0,2 l=2,00/0,3 l=3,00/0,5 l=4,50'],
['133','Benediktiner Hefeweizen vom Fass, hell','','0,3 l=3,00/0,5 l=4,50'],
['134','Benediktiner Hefeweizen (Flasche), dunkel','','0,5 l=4,50'],
['135','Benediktiner Hefeweizen (Flasche), alkoholfrei','','0,5 l=4,50']]},
{id:'weiss',t:'Weißweine',a:'wine',i:[
['136','Imiglikos','lieblich','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['137','Makedonikos','halbtrocken','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['138','Demestica oder Weißweinschorle','trocken','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['139','Retsina','geharzt','0,25 l=5,50/0,5 l=10,00/1 l=16,00']]},
{id:'rot',t:'Rotweine',a:'wine',i:[
['142','Imiglikos','lieblich','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['143','Mavrodafne','Likörwein','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['144','Makedonikos','halbtrocken','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['145','Demestica','trocken','0,25 l=5,00/0,5 l=10,00/1 l=16,00'],
['146','Naousa','trocken','0,25 l=5,00/0,5 l=10,00/1 l=16,00']]},
{id:'spirit',t:'Spirituosen',a:'wine',i:[
['150','Korn','','2,00'],
['152','Wacholder','','2,20'],
['153','Boonekamp','','2,20'],
['154','Saurer','','2,20'],
['155','Tsipouro','','2,70'],
['156','Metaxa','','4,00'],
['157','Ouzo','','2,00'],
['158','Mariacron','','2,20'],
['159','Ramazzotti','','2,20'],
['160','Jägermeister','','2,20'],
['161','Wodka','','4,00'],
['162','Williams Birne','','2,20'],
['163','Maracuja Likör','','2,20']]}
];

 /* ===== Menü: Aufbau ===== */
function priceHtml(p){
 var parts=p.split('/');
 if(parts.length===1&&p.indexOf('=')<0){return '<div class="pr"><b>'+esc(p)+' €</b></div>'}
 return '<div class="pr multi">'+parts.map(function(x){
  var a=x.split('=');var l=a.length>1?a[0]:'';var v=a.length>1?a[1]:a[0];
  return '<span class="pv">'+(l?'<small>'+esc(l)+'</small>':'')+'<b>'+esc(v)+' €</b></span>';
 }).join('')+'</div>';
}
var h='';
M.forEach(function(c,ci){
 h+='<article class="cat ac-'+c.a+'" id="cat-'+c.id+'" data-ci="'+ci+'"><h3><button type="button" class="chead" aria-expanded="false" aria-controls="cp-'+c.id+'" data-ci="'+ci+'"><span class="ctitle">'+esc(c.t)+'</span><span class="ccount">'+c.i.length+' Artikel</span><span class="chev" aria-hidden="true"></span></button></h3><div class="cpanel" id="cp-'+c.id+'" hidden>';
 if(c.note){h+='<p class="cnote">'+esc(c.note)+'</p>'}
 h+='<ul class="items">';
 c.i.forEach(function(it){
  var multi=it[3].indexOf('/')>-1;
  var cls='it'+(it[0]?'':' nonr')+(multi?' hasm':'');
  var s=(it[0]+' '+it[1]+' '+it[2]).toLowerCase();
  h+='<li class="'+cls+'" data-s="'+esc(s)+'">'+(it[0]?'<span class="nr">'+esc(it[0])+'</span>':'')+'<div class="tx"><b>'+esc(it[1])+'</b>'+(it[2]?'<span>'+esc(it[2])+'</span>':'')+(it[4]?'<em>Preis bitte prüfen</em>':'')+'</div>'+priceHtml(it[3])+'</li>';
 });
 h+='</ul></div></article>';
});
var list=$('#mlist');
list.insertAdjacentHTML('beforeend',h);
var chipsEl=$('#chips');
chipsEl.innerHTML=M.map(function(c,ci){return '<button type="button" class="chip" data-ci="'+ci+'">'+esc(c.t)+'</button>'}).join('');
var arts=$$('.cat',list),panels=$$('.cpanel',list),heads=$$('.chead',list),chips=$$('.chip',chipsEl);
var items=arts.map(function(a){return $$('.it',a)});
var ids={};M.forEach(function(c,i){ids[c.id]=i});
var sc=$('#mscroll'),inp=$('#mq'),tog=$('#mtoggle');
var st=[],q='',allOpen=false,act=-1;
st[0]=true;

function apply(){
 var any=false;
 M.forEach(function(c,ci){
  var n=0;
  items[ci].forEach(function(li){
   var m=!q||li.getAttribute('data-s').indexOf(q)>-1;
   li.hidden=!m;if(m)n++;
  });
  var show=!q||n>0;
  arts[ci].hidden=!show;
  chips[ci].hidden=!show;
  var open=q?n>0:!!st[ci];
  panels[ci].hidden=!open;
  heads[ci].setAttribute('aria-expanded',open?'true':'false');
  arts[ci].classList.toggle('open',open);
  if(show)any=true;
 });
 $('#mnone').hidden=any;
 tog.hidden=!!q;
}
function scrollToCat(ci){
 var y=arts[ci].getBoundingClientRect().top-sc.getBoundingClientRect().top+sc.scrollTop-6;
 sc.scrollTo({top:Math.max(0,y),behavior:reduce?'auto':'smooth'});
}
function goCat(ci){
 if(ci==null||ci<0)return;
 if(q){q='';inp.value=''}
 st[ci]=true;apply();scrollToCat(ci);
}
function setAct(ci){
 if(ci===act)return;
 act=ci;
 chips.forEach(function(c,i){c.classList.toggle('act',i===ci)});
 var c=chips[ci];
 if(c&&!c.hidden){chipsEl.scrollTo({left:c.offsetLeft-(chipsEl.clientWidth-c.offsetWidth)/2,behavior:reduce?'auto':'smooth'})}
}
var ticking=false;
function spy(){
 var top=sc.getBoundingClientRect().top+50,cur=-1,first=-1;
 for(var i=0;i<arts.length;i++){
  if(arts[i].hidden)continue;
  if(first<0)first=i;
  if(arts[i].getBoundingClientRect().top<=top)cur=i;
 }
 setAct(cur<0?first:cur);
}
sc.addEventListener('scroll',function(){
 if(ticking)return;ticking=true;
 requestAnimationFrame(function(){ticking=false;spy()});
},{passive:true});
list.addEventListener('click',function(e){
 var b=e.target.closest('.chead');if(!b)return;
 var ci=+b.getAttribute('data-ci');
 st[ci]=!st[ci];apply();
});
chipsEl.addEventListener('click',function(e){
 var b=e.target.closest('.chip');if(!b)return;
 goCat(+b.getAttribute('data-ci'));
});
inp.addEventListener('input',function(){
 q=inp.value.trim().toLowerCase();apply();sc.scrollTop=0;spy();
});
tog.addEventListener('click',function(){
 allOpen=!allOpen;
 for(var i=0;i<M.length;i++)st[i]=allOpen;
 tog.textContent=allOpen?'Alle zuklappen':'Alle aufklappen';
 apply();
});
apply();

/* ===== Kopfbereich der Karte einklappen: nur Kategorieleiste bleibt ===== */
var mtop=$('#mtop'),mhead=$('#mhead'),fold=$('#mfold'),foldx=$('#mfoldx');
function setFold(on){
 mhead.hidden=on;
 foldx.hidden=!on;
 mtop.classList.toggle('fold',on);
 fold.classList.toggle('down',on);
 fold.setAttribute('aria-expanded',on?'false':'true');
 fold.setAttribute('aria-label',on?'Titel und Suche einblenden':'Titel und Suche ausblenden');
}
fold.addEventListener('click',function(){setFold(!mhead.hidden)});
setFold(false);

/* ===== Seitenmenü ===== */
var drawer=$('#drawer'),bg=$('#drawerbg'),burger=$('#burger'),dx=$('#drawerx');
function setMenu(o){
 var was=drawer.classList.contains('on');
 drawer.classList.toggle('on',o);
 bg.classList.toggle('on',o);
 burger.setAttribute('aria-expanded',o?'true':'false');
 if(o&&!was){dx.focus({preventScroll:true})}
 else if(!o&&was){burger.focus({preventScroll:true})}
}
burger.addEventListener('click',function(){setMenu(!drawer.classList.contains('on'))});
bg.addEventListener('click',function(){setMenu(false)});
dx.addEventListener('click',function(){setMenu(false)});
drawer.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

 /* ===== Overlays (mit Zurück-Taste) ===== */
var dl={menu:$('#d-menu'),gal:$('#d-gal'),imp:$('#d-imp'),dat:$('#d-dat')};
var HASH={menu:'speisekarte',gal:'galerie',imp:'impressum',dat:'datenschutz'};
function anyOpen(){return Object.keys(dl).some(function(k){return dl[k].open})}
function openDlg(k,quiet){
 setMenu(false);
 var d=dl[k];if(!d||d.open)return;
 if(typeof d.showModal==='function'){d.showModal()}else{d.setAttribute('open','')}
 root.classList.add('lock');
 if(!quiet){try{history.pushState({dlg:k},'','#'+HASH[k])}catch(e){}}
 if(k==='menu'){setFold(false);spy()}
}
Object.keys(dl).forEach(function(k){
 var d=dl[k];
 d.addEventListener('close',function(){
  if(anyOpen())return;
  root.classList.remove('lock');
  if(history.state&&history.state.dlg){history.back()}
 });
 d.addEventListener('click',function(e){if(e.target===d)d.close()});
});
window.addEventListener('popstate',function(){
 Object.keys(dl).forEach(function(k){if(dl[k].open)dl[k].close()});
});
document.addEventListener('click',function(e){
 var t=e.target.closest('[data-open]');
 if(t){
  e.preventDefault();
  openDlg(t.getAttribute('data-open'));
  var c=t.getAttribute('data-cat');
  if(c&&ids.hasOwnProperty(c)){setTimeout(function(){goCat(ids[c])},60)}
  return;
 }
 var x=e.target.closest('[data-close]');
 if(x){var d=x.closest('dialog');if(d)d.close()}
});

/* ===== Feier-Kasten ===== */
var EV={
 weihnachten:{n:'eine Weihnachtsfeier',s:'Anfrage Weihnachtsfeier',h:'Weihnachtsfeier geplant? Jetzt Termin sichern.',t:'Bei uns ist Platz für Ihre Weihnachtsfeier, ob mit dem Team, mit Freunden oder der Familie. Bitte reservieren Sie rechtzeitig. Sonderwünsche besprechen wir gern mit Ihnen.',b:'Wir feiern im Kreis von Kollegen, Freunden oder Familie und freuen uns auf einen schönen Abend. Über Ihre Vorschläge für Essen und Ablauf sprechen wir gern.'},
 ostern:{n:'ein Osteressen',s:'Anfrage Osteressen',h:'Osteressen geplant? Reservieren Sie früh.',t:'Ostern am gedeckten Tisch: Wir haben Platz für Ihr Osteressen mit der ganzen Familie. Die Feiertage sind schnell vergeben, bitte reservieren Sie rechtzeitig. Zeiten und Wünsche besprechen wir gern persönlich.',b:'Wir würden gern an den Ostertagen mit der Familie bei Ihnen essen und freuen uns über Ihre Vorschläge zu Essen und Ablauf.'},
 muttertag:{n:'ein Muttertagsessen',s:'Anfrage Muttertag',h:'Muttertag geplant? Laden Sie Ihre Mutter ein.',t:'Einmal nicht kochen müssen: Wir haben Platz für Ihr Muttertagsessen im Kreis der Familie. Der Tag ist schnell ausgebucht, bitte reservieren Sie rechtzeitig.',b:'Wir möchten am Muttertag mit der Familie bei Ihnen essen und bitten um einen Tisch in passender Größe.'},
 vatertag:{n:'eine Vatertagsfeier',s:'Anfrage Vatertag',h:'Vatertag oder Herrentag? Feiern Sie bei uns.',t:'Ob mit der Familie oder mit Freunden nach der Tour: Im Biergarten oder im Restaurant finden Sie bei uns Platz. Größere Gruppen bitte vorher anmelden.',b:'Wir sind eine Gruppe und möchten am Vatertag bei Ihnen essen und feiern, wenn möglich auch im Biergarten.'},
 familie:{n:'eine Familienfeier',s:'Anfrage Familienfeier',h:'Familienfeier geplant? Wir richten sie aus.',t:'Ob Wiedersehen, Zusammenkommen oder ein besonderer Tag: Wir richten die Räume nach Ihren Vorstellungen her und besprechen alle Wünsche persönlich mit Ihnen.',b:'Wir wünschen uns, dass die Räume nach unseren Vorstellungen hergerichtet werden, und besprechen Wünsche zum Essen gern persönlich.'},
 geburtstag:{n:'eine Geburtstagsfeier',s:'Anfrage Geburtstagsfeier',h:'Geburtstag geplant? Wir haben den Platz.',t:'Feiern Sie Ihren Geburtstag bei uns, im kleinen Kreis oder mit großer Runde. Wir richten die Räume her und beraten Sie gern zu Essen und Getränken.',b:'Wir möchten einen Geburtstag bei Ihnen feiern und freuen uns über Ihre Beratung zu Essen und Getränken.'},
 hochzeit:{n:'eine Hochzeitsfeier',s:'Anfrage Hochzeitsfeier',h:'Hochzeit geplant? Feiern Sie bei uns.',t:'Für Ihre Hochzeitsfeier haben wir Platz für bis zu 60 Personen. Wir richten die Räume nach Ihren Vorstellungen her und besprechen Menü und Ablauf in Ruhe mit Ihnen.',b:'Wir möchten unsere Hochzeit bei Ihnen feiern und freuen uns über ein Angebot zu Menü, Getränken und Ablauf.'},
 taufe:{n:'eine Tauffeier',s:'Anfrage Tauffeier',h:'Taufe geplant? Wir feiern mit Ihnen.',t:'Nach der Taufe gemeinsam an einem Tisch: Wir haben Platz für Familie und Paten und stimmen Termin und Ablauf mit Ihnen ab, auf Wunsch auch außerhalb der normalen Öffnungszeiten.',b:'Wir würden gern im Anschluss an die Taufe bei Ihnen feiern. Falls nötig, auch außerhalb der normalen Öffnungszeiten.'},
 kommunion:{n:'eine Kommunionsfeier',s:'Anfrage Kommunionsfeier',h:'Kommunion geplant? Feiern Sie bei uns.',t:'Ein großer Tag für die ganze Familie: Wir haben Platz für Ihre Kommunionsfeier und stimmen Termin und Ablauf mit Ihnen ab, auf Wunsch auch außerhalb der normalen Öffnungszeiten.',b:'Wir würden gern im Anschluss an die Kommunion bei Ihnen feiern. Falls nötig, auch außerhalb der normalen Öffnungszeiten.'},
 konfirmation:{n:'eine Konfirmationsfeier',s:'Anfrage Konfirmationsfeier',h:'Konfirmation geplant? Wir feiern mit.',t:'Für Ihre Konfirmationsfeier bieten wir Raum für Familie und Freunde. Termin und Ablauf stimmen wir gern mit Ihnen ab, auf Wunsch auch außerhalb der Öffnungszeiten.',b:'Wir möchten nach der Konfirmation gemeinsam mit Familie und Freunden bei Ihnen feiern. Falls nötig, auch außerhalb der normalen Öffnungszeiten.'},
 abschluss:{n:'eine Abschlussfeier',s:'Anfrage Abschlussfeier',h:'Abschluss geschafft? Feiern Sie bei uns.',t:'Abitur, Abschlussprüfung oder Studienende: Wir geben Ihrem Erfolg den passenden Rahmen, im kleinen Kreis oder mit großer Runde. Wünsche zu Essen und Ablauf besprechen wir gern mit Ihnen.',b:'Wir möchten einen bestandenen Abschluss bei Ihnen feiern und freuen uns über Ihre Beratung zu Essen und Getränken.'},
 jubilaeum:{n:'ein Jubiläum',s:'Anfrage Jubiläumsfeier',h:'Jubiläum geplant? Feiern Sie es bei uns.',t:'Runder Geburtstag, Hochzeitstag oder Firmenjubiläum: Wir geben Ihrem Jubiläum den passenden Rahmen und besprechen Ihre Wünsche persönlich mit Ihnen.',b:'Wir möchten ein Jubiläum bei Ihnen feiern und besprechen gern Rahmen, Essen und Ablauf.'},
 ruhestand:{n:'eine Abschiedsfeier',s:'Anfrage Abschieds- oder Ruhestandsfeier',h:'Abschied oder Ruhestand? Feiern Sie bei uns.',t:'Ein neuer Lebensabschnitt verdient einen schönen Abend: Wir haben Platz für Kollegen, Freunde und Familie und besprechen Ablauf und Essen persönlich mit Ihnen.',b:'Es soll ein Abschied in den Ruhestand gefeiert werden. Wir freuen uns über ein Angebot für Essen und Getränke.'},
 betrieb:{n:'ein Betriebsfest',s:'Anfrage Betriebsfest',h:'Betriebsfest geplant? Wir sind bereit für Ihr Team.',t:'Für Betriebsfeiern haben wir Platz für bis zu 60 Personen. Wir stimmen Termin und Ablauf mit Ihnen ab und sorgen dafür, dass Ihr Team gut versorgt ist.',b:'Wir planen ein Betriebsfest für unser Team und freuen uns über ein Angebot für Essen und Getränke.'},
 klassentreffen:{n:'ein Klassentreffen',s:'Anfrage Klassentreffen',h:'Klassentreffen geplant? Wir haben den Tisch.',t:'Alte Bekannte, viele Geschichten: Für Ihr Klassentreffen haben wir Platz für größere Runden bis 60 Personen. Bitte melden Sie die Gruppe vorher an.',b:'Wir sind eine größere Gruppe ehemaliger Mitschüler und möchten uns bei Ihnen treffen. Wir freuen uns über einen Terminvorschlag.'},
 trauer:{n:'eine Trauerfeier',s:'Anfrage Trauerfeier',h:'Trauerfeier geplant? Wir sind für Sie da.',t:'Auch im Trauerfall sind wir Ihr Ansprechpartner. Rufen Sie uns gern an. Wir besprechen alles in Ruhe mit Ihnen und richten die Räume würdevoll her.',b:'Wir bitten um Unterstützung bei der Ausrichtung einer Trauerfeier und würden alles Weitere gern in Ruhe mit Ihnen besprechen.'}
};
var evMail=$('#ev-mail'),evTags=$$('[data-ev]');
function evBody(e){
 return 'Guten Tag,\r\n\r\nwir möchten bei Ihnen '+e.n+' ausrichten und bitten um einen Termin.\r\n\r\n'+e.b+'\r\n\r\nGewünschter Termin: (Datum und Uhrzeit)\r\nAnzahl der Gäste: (ungefähre Zahl der Personen)\r\n\r\nBitte melden Sie sich mit einem Terminvorschlag und, wenn möglich, mit einem Angebot bei uns.\r\n\r\nMit freundlichen Grüßen\r\n(Name und Telefonnummer)';
}
function setEv(k){
 var e=EV[k];if(!e)return;
 $('#ev-h').textContent=e.h;
 $('#ev-t').textContent=e.t;
 evTags.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-ev')===k?'true':'false')});
 evMail.href='mailto:'+MAIL+'?subject='+encodeURIComponent(e.s)+'&body='+encodeURIComponent(evBody(e));
}
function defEv(){
 var m=new Date().getMonth();
 if(m===10||m===11)return 'weihnachten';
 if(m===2||m===3)return 'ostern';
 if(m===4)return 'muttertag';
 return 'familie';
}
evTags.forEach(function(b){b.addEventListener('click',function(){setEv(b.getAttribute('data-ev'))})});
setEv(defEv());

/* ===== Öffnungszeiten: heutigen Tag markieren ===== */
var today=$('#hours [data-d="'+new Date().getDay()+'"]');
if(today){today.classList.add('today')}

 /* ===== Google-Rezension ===== */
var RV='https://www.google.com/search?q=bei+stravos&oq=bei+stravos&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIxgnGLECMhQIAhAuGAoYCxivARjHARi6AhiABDIRCAMQLhgKGAsYrwEYxwEYgAQyCwgEEAAYChgLGIAEMgsIBRAAGAoYCxiABDIGCAYQRRg8MgYIBxBFGDwyBggIEEUYPDILCAkQABgKGAsYgAQyCwgKEAAYChgLGIAEMgsICxAAGAoYCxiABDIKCAwQABiABBiiBNIBCDI1NDFqMGo0qAIOsAIB8QVEroAlW0yAR_EFRK6AJVtMgEc&client=ms-android-nothing-terr2-reo3&sourceid=chrome-mobile&source=chrome.ob&ie=UTF-8#sv=CAMS1AIaqAIKEgoDdGJzEgtscmY6ITNzSUFFPQoQCgFxEgtiZWkgc3RhdnJvcwoHCgN1ZG0SABABGg5wdi0vZy8xdGx2bm1teio_CgsvZy8xdGx2bm1tehIMEAEaBggAEAAYADACIhEKC2JlaSBzdGF2cm9zEAIYAkABUgMKAQKJAXBL9mFEwbdzMqMBCgtiZWkgc3RhdnJvc0j-nKmt5oCAgAhaFRAAEAEYABgBIgtiZWkgc3RhdnJvc5IBEGdyZWVrX3Jlc3RhdXJhbnSqAV8KCy9nLzF0a3M1ZjBxCgsvZy8xdGx2bm1tehABKg8iC2JlaSBzdGF2cm9zKAUyHxABIhtGxGPjASFEO0TlOLrtjFjYRAr8SGQ4544vDSIyDxACIgtiZWkgc3RhdnJvcyAmKiMKD2xjbF9sZWdhY3lfdGlsZRIOcHYtL2cvMXRsdm5tbXoYATABGAog_e6w5wU';
if(PLACE_ID){RV='https://search.google.com/local/writereview?placeid='+encodeURIComponent(PLACE_ID)}
$$('[data-review]').forEach(function(a){a.href=RV});

/* ===== Google-Karte: nur mit Einwilligung ===== */
var CKEY='stavros_karte';
var mb=$('#mapbox'),mapIdle=mb.innerHTML,cbox=$('#consent');
function getC(){try{return localStorage.getItem(CKEY)}catch(e){return null}}
function setC(v){try{localStorage.setItem(CKEY,v)}catch(e){}}
function loadMap(){
 if(mb.querySelector('iframe'))return;
 var f=document.createElement('iframe');
 f.title='Karte: Bei Stavros, Zur Großen Heide 22, Gütersloh';
 f.loading='lazy';
 f.referrerPolicy='no-referrer-when-downgrade';
 f.setAttribute('allowfullscreen','');
 f.src='https://www.google.com/maps?q=Zur+Gro%C3%9Fen+Heide+22+33335+G%C3%BCtersloh&output=embed';
 mb.innerHTML='';
 mb.appendChild(f);
}
function resetMap(){mb.innerHTML=mapIdle}
mb.addEventListener('click',function(e){if(e.target.closest('#loadmap'))loadMap()});
$('#c-yes').addEventListener('click',function(){setC('yes');cbox.hidden=true;loadMap()});
$('#c-no').addEventListener('click',function(){setC('no');cbox.hidden=true;resetMap()});
$('#c-open').addEventListener('click',function(){cbox.hidden=false});
(function(){
 var c=getC();
 if(c==='yes'){loadMap()}else if(c!=='no'){cbox.hidden=false}
})();

/* ===== Einblenden beim Scrollen ===== */
var els=$$('.rv');
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){
  es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}});
 },{threshold:.12});
 els.forEach(function(el){io.observe(el)});
}else{
 els.forEach(function(el){el.classList.add('in')});
}

/* ===== Direktlink auf Overlay (z. B. #speisekarte) ===== */
(function(){
 var rev={};
 Object.keys(HASH).forEach(function(k){rev[HASH[k]]=k});
 var hk=rev[(location.hash||'').slice(1)];
 if(hk){openDlg(hk,true)}
})();
})();
