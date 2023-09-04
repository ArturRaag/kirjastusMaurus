
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;




// ----------------------------------------- MATHQUILL KRAAM-----------------------------------------
var MQ = MathQuill.getInterface(2);
var answerSpan = document.getElementById('answer');
answerSpan.style.backgroundColor="white";
answerSpan.style.width="10px"
var latexSpan = document.getElementById('lihtsam');
var latexTEXT = document.getElementById('latex');
var answerMathField = MQ.MathField(answerSpan, {
                handlers: {
                edit: function() {
                    var enteredMath = answerMathField.latex();
                    latexSpan.textContent = answerMathField.text()// Get entered math in LaTeX format   
                    latexTEXT.textContent=answerMathField.latex();
                }
                }
            });

// ----------------------------------------- MATHQUILL KRAAM-----------------------------------------






// ----------------------------------------- HTML ToolTip -------------------------------------------

var tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(255, 255, 255, 255)";
tooltip.style.color = "black";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="540px"
document.body.appendChild(tooltip);

var regularText = document.createElement("div");
regularText.innerHTML = "Astmete sisestamiseks tuleb trükkida ^ sümbol (enamasti SHIFT+6 klahvi kombinatsioon klaviatuuril). Et astmest väljuda, vajutage parema noole klahvi.<br><br>Vastus peab olema sisestatud normaalkujul!<br><br>Kui üksliikme arvkordaja on 1 või -1, siis tuleb see kindlasti välja kirjutada! Ehk kui õige vastus on näiteks 5x-1y+1, siis vastust<br>5x-y+1 loetakse valeks (mis sest, et sisuliselt on see samuti õige).";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ=''
var katexEquation = document.createElement("div");
tooltip.appendChild(katexEquation);


// Info nuppu funktsionaalsus
var infoNupp = document.createElement("button");
infoNupp.innerHTML = "i";
infoNupp.style.position = "absolute";
infoNupp.style.margin="20px";
infoNupp.style.padding="5px 12px";
infoNupp.style.fontSize="20px";
infoNupp.style.fontWeight="bold";
infoNupp.style.fontFamily="Hoefler Text";
infoNupp.style.fontStyle="italic";
infoNupp.style.background="transparent";
infoNupp.style.border="solid 2px black";
infoNupp.style.borderRadius="50%";
infoNupp.style.zIndex="1";
document.body.appendChild(infoNupp);

infoNupp.addEventListener("mouseenter", function() {
  tooltip.style.left = (infoNupp.offsetLeft + infoNupp.offsetWidth) + "px";
  tooltip.style.top = (infoNupp.offsetTop + infoNupp.offsetHeight) + "px";
  infoNupp.style.background="darkgrey"
  tooltip.style.display = "block";
});

infoNupp.addEventListener("mouseleave", function() {
  tooltip.style.display = "none";
  infoNupp.style.background="transparent"
});

// ----------------------------------------- HTML ToolTip -------------------------------------------




function windowResized() {
  resizeCanvas(windowWidth, 550, WEBGL);
}


function setup() {
  canvas=createCanvas(windowWidth,550,WEBGL);
  // canvas.position(0,0);
  write_texts();
  Reset();
  document.getElementById("lihtsam").style.visibility = "hidden";
  document.getElementById("latex").style.visibility = "hidden";
      stroke(100,180,200);
    strokeWeight(4);
    let fov= PI/3;
    let cameraZ=(height/2.0)/tan(fov/2.0);
    perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
}

function draw() {
  
  clear();
  background(251,253,255);
  katex.render(KaTeX_EQ, katexEquation);

  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  MathQuill_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  
  // console.log(tex_vorrand.size)
  if(lopetamise_tingimus==true){
    background(15,30,60);
    new_step();
    orbitControl(4,4,0.01);
    rotateY(angle);
    rotateZ(angle*0.5);
    beginShape(POINTS);
    for (i=0;i<=empty_vec.length-1;i++){
      vertex(empty_vec[i].x,empty_vec[i].y, empty_vec[i].z);
      }
      endShape();
  angle=angle+0.01;
  camera(0, 0, 300 - sin(frameCount * 0.001) * 200, 0, 0, 0, 0, 1, 0);
  if (empty_vec.length >=100000){
      empty_vec=[];
      X=0;
      Y=0;
      Z=0;
    }
  }
  
}


function Reset(){
  
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
  }
  
  Ylesanne();
  tulemus.html("");

  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+300);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+300);
  
  LOPETA_NUPP=createButton("Lõpeta test");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
  
  ylesannete_loendur=ylesannete_loendur+1;
}


function Ylesanne(){
  mudel=["täht","astmed"];
  mudeli_valik=random(mudel);
  
  
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TÄHTAVALDISED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  if (mudeli_valik=="täht"){
      // ------------------------------ GENEREERIME KOLM SUVALIST ÜKSLIIGET ------------------------------
      esimese_liikme_vastus=int(random(-10,10)); //  X
      teise_liikme_vastus=int(random(-10,10));  // Y
      kolmanda_liikme_vastus=int(random(-10,10)); // arv

      vastuse_massiiv=[esimese_liikme_vastus, teise_liikme_vastus, kolmanda_liikme_vastus];
    
      vastuse_massiiv_symbolic=[];
      liikmetele_vastavad_tahed=["*x","*y",""];
      for (i=0; i<=vastuse_massiiv.length-1; i++){
      if (Math.sign(vastuse_massiiv[i])==1){
        vastuse_massiiv_symbolic.push("+"+str(vastuse_massiiv[i])+str(liikmetele_vastavad_tahed[i]));
      } else if (Math.sign(vastuse_massiiv[i])==0) {
        vastuse_massiiv_symbolic.push(str(liikmetele_vastavad_tahed[2]));
      } else {
        vastuse_massiiv_symbolic.push(str(vastuse_massiiv[i]) +str(liikmetele_vastavad_tahed[i]));
      }
      }
      vastus_kontrollimiseks= join(vastuse_massiiv_symbolic, "");
    
        if (vastus_kontrollimiseks[0]=="+"){
     vastus_kontrollimiseks=vastus_kontrollimiseks.substring(1)
   } 
    
    // ------------------------------ GENEREERIME KOLM SUVALIST ÜKSLIIGET ------------------------------
    
    // jaotame iga üksliikme mitmeks arvuks, millest kujuneb välja ülesanne mida lahendada.
      esimeste_sarnaste_kogus=int(random(2,4));
      teiste_sarnaste_kogus=int(random(2,4));
      kolmandate_sarnaste_kogus=int(random(2,4));
      
      esimeste_liikmete_massiiv=[];
      teiste_liikmete_massiiv=[];
      kolmandate_liikmete_massiiv=[];
    
    
    
    // ---------------------- ESIMESTE LIIKMETE SÜMBOLISEERIMISE PROTSESS ---------
      while (true){
      for (a=0; a<=esimeste_sarnaste_kogus; a++){
        ajutine_number=int(random(-10,10));
        esimeste_liikmete_massiiv.push(ajutine_number);
      }
        if (liikmete_SUM(esimeste_liikmete_massiiv) != esimese_liikme_vastus){
          esimeste_liikmete_massiiv=[];
        } else if (liikmete_SUM(esimeste_liikmete_massiiv) == esimese_liikme_vastus){
          break;
        }
      }
      // kui summa tingimus täidetud, paneme ka tähed külge: X
      esimeste_liikmete_massiiv_tahtedega=[];
      for (i=0; i<=esimeste_liikmete_massiiv.length-1; i++){
        if (Math.sign(esimeste_liikmete_massiiv[i])==1 || Math.sign(esimeste_liikmete_massiiv[i])==0 ){
        esimeste_liikmete_massiiv_tahtedega.push("+"+str(esimeste_liikmete_massiiv[i])+"x");
      } else {
        esimeste_liikmete_massiiv_tahtedega.push(str(esimeste_liikmete_massiiv[i])+"x");
      }
        }
    
        // ---------------------- TEISTE LIIKMETE SÜMBOLISEERIMISE PROTSESS ---------
      while (true){
      for (b=0; b<=teiste_sarnaste_kogus; b++){
        ajutine_number=int(random(-10,10));
        teiste_liikmete_massiiv.push(ajutine_number);
      }
       if (liikmete_SUM(teiste_liikmete_massiiv) != teise_liikme_vastus){
          teiste_liikmete_massiiv=[];
        } else if (liikmete_SUM(teiste_liikmete_massiiv) == teise_liikme_vastus){
          break;
        }
      }
      // kui summa tingimus täidetud, paneme ka tähed külge: Y
      teiste_liikmete_massiiv_tahtedega=[];
      for (i=0; i<=teiste_liikmete_massiiv.length-1; i++){
      if (Math.sign(teiste_liikmete_massiiv[i])==1 || Math.sign(teiste_liikmete_massiiv[i])==0 ){
        teiste_liikmete_massiiv_tahtedega.push("+"+str(teiste_liikmete_massiiv[i])+"y");
      } else {
        teiste_liikmete_massiiv_tahtedega.push(str(teiste_liikmete_massiiv[i])+"y");
      }
      }
    
      // ---------------------- KOLMANDA LIIKMETE SÜMBOLISEERIMISE PROTSESS ---------
      while (true){
      for (b=0; b<=kolmandate_sarnaste_kogus; b++){
        ajutine_number=int(random(-10,10));
        kolmandate_liikmete_massiiv.push(ajutine_number);
      }
        if (liikmete_SUM(kolmandate_liikmete_massiiv) != kolmanda_liikme_vastus){
          kolmandate_liikmete_massiiv=[];
        } else if (liikmete_SUM(kolmandate_liikmete_massiiv) == kolmanda_liikme_vastus){
          break;
        }
        
      }
      // kui summa tingimus täidetud, siis tähti külge ei pane, paneme külge vaid õige märgi!
      kolmandate_liikmete_massiiv_tahtedega=[];
      for (i=0; i<=kolmandate_liikmete_massiiv.length-1; i++){
      if (Math.sign(kolmandate_liikmete_massiiv[i])==1 || Math.sign(kolmandate_liikmete_massiiv[i])==0 ){
        kolmandate_liikmete_massiiv_tahtedega.push("+"+str(kolmandate_liikmete_massiiv[i]));
      } else {
        kolmandate_liikmete_massiiv_tahtedega.push(str(kolmandate_liikmete_massiiv[i]));
      }
      }
    
      // Nüüd on meil kolm erinevat massiivi, mida tuleb randomiseerida.
      let arr2 = concat(esimeste_liikmete_massiiv_tahtedega, teiste_liikmete_massiiv_tahtedega);
      let arr3 = concat( arr2, kolmandate_liikmete_massiiv_tahtedega);
      shuffled_array=shuffle(arr3);
  
  }
  
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ASTMETEGA @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  if (mudeli_valik=="astmed"){
      // ------------------------------ GENEREERIME KOLM SUVALIST ÜKSLIIGET ------------------------------
      esimese_liikme_vastus=int(random(-10,10)); //  X2
      teise_liikme_vastus=int(random(-10,10));  // X
      kolmanda_liikme_vastus=int(random(-10,10)); // arv
      vastuse_massiiv=[esimese_liikme_vastus, teise_liikme_vastus, kolmanda_liikme_vastus];
    
      vastuse_massiiv_symbolic=[];
      liikmetele_vastavad_tahed=["*x^2","*x",""];
      for (i=0; i<=vastuse_massiiv.length-1; i++){
      if (Math.sign(vastuse_massiiv[i])==1){
        vastuse_massiiv_symbolic.push("+"+str(vastuse_massiiv[i])+str(liikmetele_vastavad_tahed[i]));
      } else if (Math.sign(vastuse_massiiv[i])==0) {
        vastuse_massiiv_symbolic.push(str(liikmetele_vastavad_tahed[2]));
      } else {
        vastuse_massiiv_symbolic.push(str(vastuse_massiiv[i]) +str(liikmetele_vastavad_tahed[i]));
      }
      }
      vastus_kontrollimiseks= join(vastuse_massiiv_symbolic, "");
    
    if (vastus_kontrollimiseks[0]=="+"){
     vastus_kontrollimiseks=vastus_kontrollimiseks.substring(1)
   } 
    
    // ------------------------------ GENEREERIME KOLM SUVALIST ÜKSLIIGET ------------------------------
    
    // jaotame iga üksliikme mitmeks arvuks, millest kujuneb välja ülesanne mida lahendada.
      esimeste_sarnaste_kogus=int(random(2,4));
      teiste_sarnaste_kogus=int(random(2,4));
      kolmandate_sarnaste_kogus=int(random(2,4));
      
      esimeste_liikmete_massiiv=[];
      teiste_liikmete_massiiv=[];
      kolmandate_liikmete_massiiv=[];
    
    // ---------------------- ESIMESTE LIIKMETE SÜMBOLISEERIMISE PROTSESS ---------
      while (true){
      for (a=0; a<=esimeste_sarnaste_kogus; a++){
        ajutine_number=int(random(-10,10));
        esimeste_liikmete_massiiv.push(ajutine_number);
      }
        if (liikmete_SUM(esimeste_liikmete_massiiv) != esimese_liikme_vastus){
          esimeste_liikmete_massiiv=[];
        } else if (liikmete_SUM(esimeste_liikmete_massiiv) == esimese_liikme_vastus){
          break;
        }
      }
      // kui summa tingimus täidetud, paneme ka tähed külge: X
      esimeste_liikmete_massiiv_tahtedega=[];
      for (i=0; i<=esimeste_liikmete_massiiv.length-1; i++){
        if (Math.sign(esimeste_liikmete_massiiv[i])==1 || Math.sign(esimeste_liikmete_massiiv[i])==0 ){
        esimeste_liikmete_massiiv_tahtedega.push("+"+str(esimeste_liikmete_massiiv[i])+"x^{2}");
      } else {
        esimeste_liikmete_massiiv_tahtedega.push(str(esimeste_liikmete_massiiv[i])+"x^{2}");
      }
        }
    
        // ---------------------- TEISTE LIIKMETE SÜMBOLISEERIMISE PROTSESS ---------
      while (true){
      for (b=0; b<=teiste_sarnaste_kogus; b++){
        ajutine_number=int(random(-10,10));
        teiste_liikmete_massiiv.push(ajutine_number);
      }
       if (liikmete_SUM(teiste_liikmete_massiiv) != teise_liikme_vastus){
          teiste_liikmete_massiiv=[];
        } else if (liikmete_SUM(teiste_liikmete_massiiv) == teise_liikme_vastus){
          break;
        }
      }
      // kui summa tingimus täidetud, paneme ka tähed külge: Y
      teiste_liikmete_massiiv_tahtedega=[];
      for (i=0; i<=teiste_liikmete_massiiv.length-1; i++){
      if (Math.sign(teiste_liikmete_massiiv[i])==1 || Math.sign(teiste_liikmete_massiiv[i])==0 ){
        teiste_liikmete_massiiv_tahtedega.push("+"+str(teiste_liikmete_massiiv[i])+"x");
      } else {
        teiste_liikmete_massiiv_tahtedega.push(str(teiste_liikmete_massiiv[i])+"x");
      }
      }
    
      // ---------------------- KOLMANDA LIIKMETE SÜMBOLISEERIMISE PROTSESS ---------
      while (true){
      for (b=0; b<=kolmandate_sarnaste_kogus; b++){
        ajutine_number=int(random(-10,10));
        kolmandate_liikmete_massiiv.push(ajutine_number);
      }
        if (liikmete_SUM(kolmandate_liikmete_massiiv) != kolmanda_liikme_vastus){
          kolmandate_liikmete_massiiv=[];
        } else if (liikmete_SUM(kolmandate_liikmete_massiiv) == kolmanda_liikme_vastus){
          break;
        }
        
      }
      // kui summa tingimus täidetud, siis tähti külge ei pane, paneme külge vaid õige märgi!
      kolmandate_liikmete_massiiv_tahtedega=[];
      for (i=0; i<=kolmandate_liikmete_massiiv.length-1; i++){
      if (Math.sign(kolmandate_liikmete_massiiv[i])==1 || Math.sign(kolmandate_liikmete_massiiv[i])==0 ){
        kolmandate_liikmete_massiiv_tahtedega.push("+"+str(kolmandate_liikmete_massiiv[i]));
      } else {
        kolmandate_liikmete_massiiv_tahtedega.push(str(kolmandate_liikmete_massiiv[i]));
      }
      }
    
      // Nüüd on meil kolm erinevat massiivi, mida tuleb randomiseerida.
      let arr2 = concat(esimeste_liikmete_massiiv_tahtedega, teiste_liikmete_massiiv_tahtedega);
      let arr3 = concat( arr2, kolmandate_liikmete_massiiv_tahtedega);
      shuffled_array=shuffle(arr3);

  }
  
   shuffled_array_string=join(shuffled_array,"");
   if (shuffled_array_string[0]=="+"){
     shuffled_array_string=shuffled_array_string.substring(1)
   } 
  
      console.log("Liige X: "+str(esimese_liikme_vastus));
      console.log("Liige Y: "+str(teise_liikme_vastus));
      console.log("Liige N: "+str(kolmanda_liikme_vastus));
      console.log(shuffled_array_string);
   tex_string=shuffled_array_string+"=";
   katex.render( tex_string, tex_vorrand.elt);
   yl_text.html("Koonda sarnased liikmed ja vii normaalkujule.");

}


function write_texts(){
  
  tex_vorrand=createP("");
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  // tex_vorrand.parent("test");
  MathQuill_vorrand=select("#answer");
  // MathQuill_vorrand.parent(tex_vorrand)
  // MathQuill_vorrand.style("width: 80%; float: right; font-size: 24px; margin: 30px auto;");
  MathQuill_vorrand.style(" width: 80%; margin-top: 70px auto; font-size: 24px;")
  MathQuill_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
}

function kontroll(){
  sisu=document.getElementById("lihtsam").textContent;
  console.log("KONTROLL: ")
console.log("MQ sisu: ", sisu);
  console.log("Vastus võrdlemiseks: ", vastus_kontrollimiseks)
  
  
           if (str(sisu) == vastus_kontrollimiseks ){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              oige_vastus=oige_vastus+1;
            } else {
              tulemus.html("Viga!");
              tulemus.style("color","red");
            }
    

}


function Lopp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  
  tex_vorrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_vorrand.remove();
  
  infoNupp.remove();

  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  lopetamise_tingimus=true;
}



function round_0(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)) )
}

function round_1(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10)/10 )
}

function round_2(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*100)/100 )
}

function round_3(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*1000)/1000 )
}

function round_4(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10000)/10000 )
}

function liikmete_SUM(massiiv){
  temp_summa=0;
  for (i=0; i<=massiiv.length-1; i++){
    temp_summa=temp_summa+massiiv[i];
  }
    return temp_summa
}




// for end screen
empty_vec=[]
function new_step(){
  
    direction=random(["up","down","left","right","forward","back"]);
    if (direction=="up"){
      X=X+step;
    } else if (direction == "down"){
      X=X-step;
    } else if (direction=="left"){
      Y=Y-step;
    } else if (direction=="right"){
      Y=Y+step;
    } else if (direction=="forward"){
      Z=Z+step;
    } else if (direction=="back"){
      Z=Z-step;
    }
  vek=createVector(X,Y,Z);
  empty_vec.push(vek);
}
