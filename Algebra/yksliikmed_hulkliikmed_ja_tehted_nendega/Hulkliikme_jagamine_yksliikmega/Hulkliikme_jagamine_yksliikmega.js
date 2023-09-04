
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

var tahed1_index=0;
var tahed2_index=0;
var tahed3_index=0;

var  asteX1=0
var  asteX2=0
var  asteX3=0
var  asteY1=0
var  asteY2=0
var  asteY3=0
var  asteZ1=0
var  asteZ2=0
var  asteZ3=0



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
regularText.innerHTML = " Arvkordajad tuleb sisestada taandatud murru kujul, kuid tähelised tegurid, mis murru kujul esinevad, on soovituslik tõsta nimetajast kõik lugejasse ning viia normaalkujule (tähestikulisse järjekorda). Seega tuleb kasuks negatiivsete astmetega toimetamine.<br><br>Näiteks.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ="126y: \\left(  49x^{-15}y^{20} + 126x^{14} \\right)=\\dfrac{126y}{49x^{-15}y^{20}}+ \\dfrac{126y}{126x^{14}}=\\dfrac{18}{7}x^{15}y^{-19}+x^{-14}y"
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
    strokeWeight(3);
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
  asteX1=0
  asteX2=0
  asteX3=0
  asteY1=0
  asteY2=0
  asteY3=0
  asteZ1=0
  asteZ2=0
  asteZ3=0
  
  tahed1_index=0;
  tahed2_index=0;
  
// ANDMETE JA MUDELITE INITSIALISEERIMINE
  mudel=["vasakul","paremal"];

  mudeli_valik=random(mudel);
  
  arv1=int(random(-20,20));
  arv2=int(random(-20,20));
  arv3=int(random(-20,20));
  arv3_tagavara=arv3;
  
  arvuline_vastuse_massiiv=[arv1,arv2, arv3];
  laiendaja=int(random(1,10));
  arv1_laiendatud=arv1*laiendaja;
  arv2_laiendatud=arv2*laiendaja;
  arv3_laiendatud=arv3*laiendaja;
  
  while (asteX1==0 || asteX2==0 || asteX3==0 || asteY1==0 || asteY2==0 || asteY3==0 || asteZ1==0 || asteZ2==0 || asteZ3==0){
  asteX1=int(random(-35,35));
  asteX2=int(random(-35,35));
  asteX3=int(random(-35,35));
  asteY1=int(random(-35,35));
  asteY2=int(random(-35,35));
  asteY3=int(random(-35,35));
  asteZ1=int(random(-35,35));
  asteZ2=int(random(-35,35));
  asteZ3=int(random(-35,35));
  }
  // astmed=[[asteX1,asteX2],[asteY1,asteY2]];
  
  liikme_tahed1=["","x","y","x^{"+str(asteX1)+"}","y^{"+str(asteY1)+"}","x^{"+str(asteX1)+"}y^{"+str(asteY1)+"}","z^{"+str(asteZ1)+"}"];
  liikme_tahed2=["","x","y","x^{"+str(asteX2)+"}","y^{"+str(asteY2)+"}","x^{"+str(asteX2)+"}y^{"+str(asteY2)+"}","z^{"+str(asteZ2)+"}"];
  liikme_tahed3=["","x","y","x^{"+str(asteX3)+"}","y^{"+str(asteY3)+"}","x^{"+str(asteX3)+"}y^{"+str(asteY3)+"}","z^{"+str(asteZ3)+"}"];
  
  while (tahed1_index == tahed2_index){
    tahed1_index=int(random(0,7));
    tahed2_index=int(random(0,7));
    tahed3_index=int(random(0,7));
  }
  
  liige_1=str(arv1_laiendatud)+str(liikme_tahed1[tahed1_index]);
  liige_2=str(arv2_laiendatud)+str(liikme_tahed2[tahed2_index]);
  liige_3=str(arv3_laiendatud)+str(liikme_tahed3[tahed3_index]);
  
  
  esimese_liikme_vastus1 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus2 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus3 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus4 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus5 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus6 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus7 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus8 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  esimese_liikme_vastus9 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  
  teise_liikme_vastus1 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus2 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus3 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus4 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus5 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus6 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus7 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus8 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  teise_liikme_vastus9 = "zX2#UIH4iIUgidus2IUADUaiasuid60g";
  
  // ############################ LÕPPVASTUSE CONST. TAANDAMINE, MÄRGI MÄÄRAMINE (ALGUS) #############################################
  //taandan esimese liikme arvud.
    for (i=20; i>=0;i=i-1){
      if (arv1%i==0 && arv3%i==0){
        arv1=arv1/i;
        arv3=arv3/i;
      }
    }
    
    //taandan teise liikme arvud.
     for (i=20; i>=0;i=i-1){
      if (arv2%i==0 && arv3_tagavara%i==0){
        arv2=arv2/i;
        arv3_tagavara=arv3_tagavara/i;
      }
    }
  
    // ############################ LÕPPVASTUSE CONST. TAANDAMINE, MÄRGI MÄÄRAMINE (LÕPP) #############################################
    
  if (arv2>=0){
      liige_2="+"+liige_2;
    }
  
// ESIMENE MUDEL
  if (mudeli_valik=="vasakul"){
    
    
     // ######################### CONSTANT 1 + SIGN
  if(Math.sign(arv3/arv1)==-1){
      mark_31="-";
    } else if (Math.sign(arv3/arv1)==1 || Math.sign(arv3/arv1)==0){
      mark_31="+";
    }
    konstant_1="("+str(abs(arv3))+")/("+ str(abs(arv1))+")";
    if (abs(arv3)/abs(arv1)==abs(arv3)){
      konstant_1=str(abs(arv3));
    } else if (arv3/arv1==0){
      konstant_1=0;
    }
    
    // ######################### CONSTANT 2 + SIGN
    if(Math.sign(arv3_tagavara/arv2)==-1){
      mark_32="-";
    } else if (Math.sign(arv3_tagavara/arv2)==1){
      mark_32="+";
    }
    konstant_2="("+str(abs(arv3_tagavara))+")/("+str(abs(arv2))+")";
    if (abs(arv3_tagavara)/abs(arv2)==abs(arv3_tagavara)){
      konstant_2=str(abs(arv3_tagavara));
    } else if (arv3_tagavara/arv2==0){
      konstant_2=0;
    }
    
    
    console.log("Liige 3, 1 ja 2 vastavalt: ", liige_3, liige_1, liige_2);
    antav_ylesanne=liige_3+":("+liige_1+liige_2+")";
    // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada välja kõik võimalikud tingimused.
    
    //Paneme paika esimese liikme vastused

    // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [ESIMESE LIIKME JAOKS VASTUSES!!!!!!]
    if (tahed1_index==0 && tahed3_index==0){
      esimese_liikme_vastus1 =mark_31+ konstant_1;
      esimese_liikme_vastus2=mark_31+ konstant_1;
      esimese_liikme_vastus3=mark_31+ konstant_1;
      esimese_liikme_vastus4=mark_31+ konstant_1;
      esimese_liikme_vastus5=mark_31+ konstant_1;
    } else if ((tahed1_index==0 && tahed3_index==1)) {
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*x";
      esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x"+")/("+ str(abs(arv1))+")";
      esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1"+")";
      esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1"+")";
      esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1"+")"; 
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"x";
      }
    } else if ( tahed1_index==1 && tahed3_index==0){
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*x^-1";
      esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^-1"+")/("+ str(abs(arv1))+")";
      esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x"+")";
      esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x"+")";
      esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x"+")";
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"x^-1";
      }
    } else if ((tahed1_index==0 && tahed3_index==2)) {
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*y";
      esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y"+")/("+ str(abs(arv1))+")";
      esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^-1"+")";
      esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^-1"+")";
      esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^-1"+")";
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"y";
      }
    } else if (tahed1_index==2 && tahed3_index==0 ) {
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*y^-1";
      esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y^-1"+")/("+ str(abs(arv1))+")";
      esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y"+")";
      esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y"+")";
      esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y"+")";
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"y^-1";
      }
    } else if (tahed1_index==0 && tahed3_index==3) {
      esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+")";
      esimese_liikme_vastus2 = mark_31+konstant_1 +"*x^"+str(asteX3);
      esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")"
      esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")"
      esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")"
      if (konstant_1==1) {
        esimese_liikme_vastus2 = mark_31+"x^"+str(asteX3);
      }
    } else if (tahed1_index==0 && tahed3_index==4) {
      esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
      esimese_liikme_vastus2 = mark_31+konstant_1 +"*y^"+str(asteY3);
      esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")"
      esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")"
      esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")"
      if (konstant_1==1) {
          esimese_liikme_vastus2 = mark_31+"y^"+str(asteY3);
      }
    } else if (tahed1_index==0 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+konstant_1 +"*x^"+str(asteX3)+"*y^"+str(asteY3);
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")"     
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        // if (abs(arv3)==1){
        //   esimese_liikme_vastus1 = mark_31+"(x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
        //     esimese_liikme_vastus2 = mark_31+konstant_1 +"*x^"+str(asteX3)+"*y^"+str(asteY3);
        //     esimese_liikme_vastus3 = mark_31+"("+"1"+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")"      
        //     esimese_liikme_vastus4 = mark_31+"(x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        //     esimese_liikme_vastus5 = mark_31+"(y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
      if (konstant_1==1) {
         esimese_liikme_vastus2 = mark_31+"x^"+str(asteX3)+"*y^"+str(asteY3);
      }
    } else if (tahed1_index==0 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+konstant_1 +"*z^"+str(asteZ3);
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";  
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";  
        esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";
      if (konstant_1==1) {
        esimese_liikme_vastus2 = mark_31 +"z^"+str(asteZ3);
      }
     } else if (tahed1_index==1 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+konstant_1;
        esimese_liikme_vastus2 = mark_31+konstant_1;
        esimese_liikme_vastus3 = mark_31+konstant_1; 
        esimese_liikme_vastus4 = mark_31+konstant_1;
        esimese_liikme_vastus5 = mark_31+konstant_1; 
    } else if ((tahed1_index==1 && tahed3_index==2)) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y"+")/("+ str(abs(arv1))+"*x"+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^-1*y"+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x*y^-1"+")"; 
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^-1"+")/("+ str(abs(arv1))+"*y^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^-1*y";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^-1*y";
      }
    } else if (tahed1_index==2 && tahed3_index==1){
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x"+")/("+ str(abs(arv1))+"*y"+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x*y^-1"+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1*y"+")"; 
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^-1"+")/("+ str(abs(arv1))+"*x^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x*y^-1";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x*y^-1";
      }
    } else if (tahed1_index==1 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1*y"+")"; 
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^-1"+")/("+ str(abs(arv1))+"*x^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3-1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3-1);
      }
    } else if (tahed1_index==1 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x"+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x*y^"+str(-asteY3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^-1*y^"+str(asteY3)+")/("+ str(abs(arv1))+")"; 
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^-1"+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^-1*y^"+str(asteY3);
      if (konstant_1==1) {
           esimese_liikme_vastus5 = mark_31+"x^-1*y^"+str(asteY3);
      }
    } else if (tahed1_index==1 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-1)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-1)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3-1)+"*y^"+str(asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3-1)+"*y^"+str(asteY3);
      }
    } else if (tahed1_index==1 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^-1*z^"+str(asteZ3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*x"+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^-1"+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^-1*z^"+str(asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^-1*z^"+str(asteZ3);
      }
    } else if (tahed1_index==2 && tahed3_index==2){
        esimese_liikme_vastus1 = mark_31+konstant_1;
        esimese_liikme_vastus2 = mark_31+konstant_1;
        esimese_liikme_vastus3 = mark_31+konstant_1;
        esimese_liikme_vastus4 = mark_31+konstant_1;
        esimese_liikme_vastus5 = mark_31+konstant_1;
    } else if (tahed1_index==2 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^-1"+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y"+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y"+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^-1"+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3)+"*y^-1";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3)+"*y^-1";
      }
    } else if (tahed1_index==2 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-(asteY3-1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-(asteY3-1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY3-1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY3-1);
      }
    } else if (tahed1_index==2 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3-1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(-(asteY3-1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-1)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3)+"*y^"+str(asteY3-1);
    if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3)+"*y^"+str(asteY3-1);
      }
    } else if (tahed1_index==2 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*y"+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y^-1"+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^-1"+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y"+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^-1"+"*z^"+str(asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^-1"+"*z^"+str(asteZ3);
      }
    } else if (tahed1_index==3 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1);
      }
    } else if (tahed1_index==3 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1-1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(1-asteX1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1-1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(1-asteX1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(1-asteX1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(1-asteX1);
      }
    } else if (tahed1_index==3 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y"+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^-1"+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y"+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*y^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1)+"*y";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1)+"*y";
      }
    } else if (tahed1_index==3 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3-asteX1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3-asteX1);
      }
    } else if (tahed1_index==3 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1)+"*y^"+str(asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1)+"*y^"+str(asteY3);
      }
    } else if (tahed1_index==3 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3-asteX1)+"*y^"+str(asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3-asteX1)+"*y^"+str(asteY3);
      }
    } else if (tahed1_index==3 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1)+"*z^"+str(asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1)+"*z^"+str(asteZ3);
      }
    } else if (tahed1_index==4 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(-asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x"+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*x^-1"+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x"+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1"+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x"+"*y^"+str(-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x"+"*y^"+str(-asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(1-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-(1-asteY1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-(1-asteY1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(1-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(1-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(1-asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3)+"*y^"+str(-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3)+"*y^"+str(-asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-(asteY3-asteY1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-(asteY3-asteY1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY3-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY3-asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-asteY1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(-(asteY3-asteY1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3)+"*y^"+str(asteY3-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3)+"*y^"+str(asteY3-asteY1);
      }
     } else if (tahed1_index==4 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(-asteY1)+"*z^"+str(asteZ3);
     if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(-asteY1)+"*z^"+str(asteZ3);
      }
    } else if (tahed1_index==5 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1)+"*y^"+str(-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1)+"*y^"+str(-asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1-1)+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(1-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1-1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(1-asteX1)+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(1-asteX1)+"*y^"+str(-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(1-asteX1)+"*y^"+str(-asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1-1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1-1)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(1-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(1-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1)+"*y^"+str(1-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1)+"*y^"+str(1-asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3-asteX1)+"*y^"+str(-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3-asteX1)+"*y^"+str(-asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1-asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1-asteY3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX1)+"*y^"+str(asteY3-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX1)+"*y^"+str(asteY3-asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+"*y^"+str(asteY1-asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1-asteY3)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+"*y^"+str(asteY3-asteY1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3-asteX1)+"*y^"+str(asteY3-asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3-asteX1)+"*y^"+str(asteY3-asteY1);
      }
   } else if (tahed1_index==5 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+"*z^"+str(asteZ3)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1)+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus6 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+")/("+ str(abs(arv1))+"*y^"+str(asteY1)+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus7 = mark_31+"("+str(abs(arv3))+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*x^"+str(asteX1)+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus8 = mark_31+"("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+")/("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")";
        esimese_liikme_vastus9= mark_31+konstant_1+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+"*z^"+str(asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus9= mark_31+"x^"+str(-asteX1)+"*y^"+str(-asteY1)+"*z^"+str(asteZ3);
      }
    } else if (tahed1_index==6 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*z^"+str(-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x"+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*x^-1"+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^-1*z^"+str(asteZ1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x*z^"+str(-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x*z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y"+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*y^-1"+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^-1*z^"+str(asteZ1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y*z^"+str(-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y*z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX3)+"*z^"+str(-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3)+"*z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY3)+"*z^"+str(-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY3)+"*z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus5 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus6 = mark_31+"("+str(abs(arv3))+"*y^"+str(asteY3)+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
        esimese_liikme_vastus7 = mark_31+"("+str(abs(arv3))+"*x^"+str(asteX3)+"*z^"+str(-asteZ1)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        esimese_liikme_vastus8 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ1)+")";
        esimese_liikme_vastus9 = mark_31+konstant_1+"*x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus9 = mark_31+"x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(-(asteZ3-asteZ1))+")";
        esimese_liikme_vastus2 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus3 = mark_31+"("+str(abs(arv3))+"*z^"+str(asteZ3-asteZ1)+")/("+ str(abs(arv1))+")";
        esimese_liikme_vastus4 = mark_31+"("+str(abs(arv3))+")/("+ str(abs(arv1))+"*z^"+str(-(asteZ3-asteZ1))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*z^"+str(asteZ3-asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"z^"+str(asteZ3-asteZ1);
      }
    } 
    
    // console.log(esimese_liikme_vastus1)
    // console.log(esimese_liikme_vastus2)
    // console.log(esimese_liikme_vastus3)
    // console.log(esimese_liikme_vastus4)
    // console.log(esimese_liikme_vastus5)
    esimeste_liikmete_alternatiivid=[esimese_liikme_vastus1,esimese_liikme_vastus2,esimese_liikme_vastus3,esimese_liikme_vastus4,esimese_liikme_vastus5,esimese_liikme_vastus6,esimese_liikme_vastus7,esimese_liikme_vastus8,esimese_liikme_vastus9]
    console.log(esimeste_liikmete_alternatiivid)
    
    
    
    
    
    
        // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [TEISE LIIKME JAOKS VASTUSES!!!!]
  
             // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [TEISE LIIKME JAOKS VASTUSES!!!!]
    if (tahed2_index==0 && tahed3_index==0){
      teise_liikme_vastus1 =mark_32+ konstant_2;
      teise_liikme_vastus2=mark_32+ konstant_2;
      teise_liikme_vastus3=mark_32+ konstant_2;
      teise_liikme_vastus4=mark_32+ konstant_2;
      teise_liikme_vastus5=mark_32+ konstant_2;
    } else if ((tahed2_index==0 && tahed3_index==1)) {
      teise_liikme_vastus1 = mark_32+ konstant_2+"*x";
      teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x"+")/("+ str(abs(arv2))+")";
      teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1"+")";
      teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1"+")";
      teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1"+")"; 
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"x";
      }
    } else if ( tahed2_index==1 && tahed3_index==0){
      teise_liikme_vastus1 = mark_32+ konstant_2+"*x^-1";
      teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1"+")/("+ str(abs(arv2))+")";
      teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x"+")";
      teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x"+")";
      teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x"+")";
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"x^-1";
      }
    } else if ((tahed2_index==0 && tahed3_index==2)) {
      teise_liikme_vastus1 = mark_32+ konstant_2+"*y";
      teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y"+")/("+ str(abs(arv2))+")";
      teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^-1"+")";
      teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^-1"+")";
      teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^-1"+")";
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"y";
      }
    } else if (tahed2_index==2 && tahed3_index==0 ) {
      teise_liikme_vastus1 = mark_32+ konstant_2+"*y^-1";
      teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y^-1"+")/("+ str(abs(arv2))+")";
      teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y"+")";
      teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y"+")";
      teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y"+")";
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"y^-1";
      }
    } else if (tahed2_index==0 && tahed3_index==3) {
      teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+")";
      teise_liikme_vastus2 = mark_32+konstant_2 +"*x^"+str(asteX3);
      teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")"
      teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")"
      teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")"
      if (konstant_2==1) {
        teise_liikme_vastus2 = mark_32+"x^"+str(asteX3);
      }
    } else if (tahed2_index==0 && tahed3_index==4) {
      teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
      teise_liikme_vastus2 = mark_32+konstant_2 +"*y^"+str(asteY3);
      teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")"
      teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")"
      teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")"
      if (konstant_2==1) {
          teise_liikme_vastus2 = mark_32+"y^"+str(asteY3);
      }
    } else if (tahed2_index==0 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+konstant_2 +"*x^"+str(asteX3)+"*y^"+str(asteY3);
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")"     
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        // if (abs(arv3_tagavara)==1){
        //   teise_liikme_vastus1 = mark_32+"(x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
        //     teise_liikme_vastus2 = mark_32+konstant_2 +"*x^"+str(asteX3)+"*y^"+str(asteY3);
        //     teise_liikme_vastus3 = mark_32+"("+"1"+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")"      
        //     teise_liikme_vastus4 = mark_32+"(x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        //     teise_liikme_vastus5 = mark_32+"(y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
      if (konstant_2==1) {
         teise_liikme_vastus2 = mark_32+"x^"+str(asteX3)+"*y^"+str(asteY3);
      }
    } else if (tahed2_index==0 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+konstant_2 +"*z^"+str(asteZ3);
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";  
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";  
        teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";
      if (konstant_2==1) {
        teise_liikme_vastus2 = mark_32 +"z^"+str(asteZ3);
      }
     } else if (tahed2_index==1 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+konstant_2;
        teise_liikme_vastus2 = mark_32+konstant_2;
        teise_liikme_vastus3 = mark_32+konstant_2; 
        teise_liikme_vastus4 = mark_32+konstant_2;
        teise_liikme_vastus5 = mark_32+konstant_2; 
    } else if ((tahed2_index==1 && tahed3_index==2)) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y"+")/("+ str(abs(arv2))+"*x"+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1*y"+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x*y^-1"+")"; 
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1"+")/("+ str(abs(arv2))+"*y^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^-1*y";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^-1*y";
      }
    } else if (tahed2_index==2 && tahed3_index==1){
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x"+")/("+ str(abs(arv2))+"*y"+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x*y^-1"+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1*y"+")"; 
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^-1"+")/("+ str(abs(arv2))+"*x^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x*y^-1";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x*y^-1";
      }
    } else if (tahed2_index==1 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-1)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-1))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1*y"+")"; 
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^-1"+")/("+ str(abs(arv2))+"*x^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3-1);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3-1);
      }
    } else if (tahed2_index==1 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x"+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x*y^"+str(-asteY3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1*y^"+str(asteY3)+")/("+ str(abs(arv2))+")"; 
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1"+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^-1*y^"+str(asteY3);
      if (konstant_2==1) {
           teise_liikme_vastus5 = mark_32+"x^-1*y^"+str(asteY3);
      }
    } else if (tahed2_index==1 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-1)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-1))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-1)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-1))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3-1)+"*y^"+str(asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3-1)+"*y^"+str(asteY3);
      }
    } else if (tahed2_index==1 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1*z^"+str(asteZ3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x*z^"+str(-asteZ3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*x"+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^-1"+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^-1*z^"+str(asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^-1*z^"+str(asteZ3);
      }
    } else if (tahed2_index==2 && tahed3_index==2){
        teise_liikme_vastus1 = mark_32+konstant_2;
        teise_liikme_vastus2 = mark_32+konstant_2;
        teise_liikme_vastus3 = mark_32+konstant_2;
        teise_liikme_vastus4 = mark_32+konstant_2;
        teise_liikme_vastus5 = mark_32+konstant_2;
    } else if (tahed2_index==2 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^-1"+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y"+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y"+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^-1"+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3)+"*y^-1";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3)+"*y^-1";
      }
    } else if (tahed2_index==2 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-1)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-(asteY3-1))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-1)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-(asteY3-1))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY3-1);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY3-1);
      }
    } else if (tahed2_index==2 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3-1)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-1))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(-(asteY3-1))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-1)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3)+"*y^"+str(asteY3-1);
    if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3)+"*y^"+str(asteY3-1);
      }
    } else if (tahed2_index==2 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*y"+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y^-1"+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^-1"+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y"+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^-1"+"*z^"+str(asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^-1"+"*z^"+str(asteZ3);
      }
    } else if (tahed2_index==3 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2);
      }
    } else if (tahed2_index==3 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2-1)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2-1)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(1-asteX2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(1-asteX2);
      }
    } else if (tahed2_index==3 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y"+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^-1"+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y"+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*y^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2)+"*y";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2)+"*y";
      }
    } else if (tahed2_index==3 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3-asteX2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3-asteX2);
      }
    } else if (tahed2_index==3 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2)+"*y^"+str(asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2)+"*y^"+str(asteY3);
      }
    } else if (tahed2_index==3 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3-asteX2)+"*y^"+str(asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3-asteX2)+"*y^"+str(asteY3);
      }
    } else if (tahed2_index==3 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2)+"*z^"+str(asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2)+"*z^"+str(asteZ3);
      }
    } else if (tahed2_index==4 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(-asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x"+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*x^-1"+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x"+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1"+"*y^"+str(asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x"+"*y^"+str(-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x"+"*y^"+str(-asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(1-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-(1-asteY2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-(1-asteY2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(1-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(1-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(1-asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3)+"*y^"+str(-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3)+"*y^"+str(-asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-(asteY3-asteY2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-(asteY3-asteY2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY3-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY3-asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-asteY2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(-(asteY3-asteY2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3)+"*y^"+str(asteY3-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3)+"*y^"+str(asteY3-asteY2);
      }
     } else if (tahed2_index==4 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(-asteY2)+"*z^"+str(asteZ3);
     if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(-asteY2)+"*z^"+str(asteZ3);
      }
    } else if (tahed2_index==5 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2)+"*y^"+str(-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2)+"*y^"+str(-asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2-1)+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2-1)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(1-asteX2)+"*y^"+str(-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(1-asteX2)+"*y^"+str(-asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2-1)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2-1)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(1-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(1-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2)+"*y^"+str(1-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2)+"*y^"+str(1-asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3-asteX2)+"*y^"+str(-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3-asteX2)+"*y^"+str(-asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2-asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2-asteY3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX2)+"*y^"+str(asteY3-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX2)+"*y^"+str(asteY3-asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+"*y^"+str(asteY2-asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2-asteY3)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+"*y^"+str(asteY3-asteY2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3-asteX2)+"*y^"+str(asteY3-asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3-asteX2)+"*y^"+str(asteY3-asteY2);
      }
   } else if (tahed2_index==5 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+"*z^"+str(asteZ3)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2)+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus6 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")/("+ str(abs(arv2))+"*y^"+str(asteY2)+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus7 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*x^"+str(asteX2)+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus8 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+")/("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")";
        teise_liikme_vastus9= mark_32+konstant_2+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+"*z^"+str(asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus9= mark_32+"x^"+str(-asteX2)+"*y^"+str(-asteY2)+"*z^"+str(asteZ3);
      }
    } else if (tahed2_index==6 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*z^"+str(-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x"+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*x^-1"+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^-1*z^"+str(asteZ2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x*z^"+str(-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x*z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y"+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*y^-1"+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^-1*z^"+str(asteZ2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y*z^"+str(-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y*z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX3)+"*z^"+str(-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3)+"*z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY3)+"*z^"+str(-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY3)+"*z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus5 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus6 = mark_32+"("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
        teise_liikme_vastus7 = mark_32+"("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*z^"+str(-asteZ2)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        teise_liikme_vastus8 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ2)+")";
        teise_liikme_vastus9 = mark_32+konstant_2+"*x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus9 = mark_32+"x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(-(asteZ3-asteZ2))+")";
        teise_liikme_vastus2 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus3 = mark_32+"("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3-asteZ2)+")/("+ str(abs(arv2))+")";
        teise_liikme_vastus4 = mark_32+"("+str(abs(arv3_tagavara))+")/("+ str(abs(arv2))+"*z^"+str(-(asteZ3-asteZ2))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*z^"+str(asteZ3-asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"z^"+str(asteZ3-asteZ2);
      }
    } 
    
    // console.log(teise_liikme_vastus1)
    // console.log(teise_liikme_vastus2)
    // console.log(teise_liikme_vastus3)
    // console.log(teise_liikme_vastus4)
    // console.log(teise_liikme_vastus5)
    teiste_liikmete_alternatiivid=[teise_liikme_vastus1,teise_liikme_vastus2,teise_liikme_vastus3,teise_liikme_vastus4,teise_liikme_vastus5,teise_liikme_vastus6,teise_liikme_vastus7,teise_liikme_vastus8,teise_liikme_vastus9]
    console.log(teiste_liikmete_alternatiivid)
    
    voimalikud_vastused=[];
    for (i=0; i<esimeste_liikmete_alternatiivid.length; i++){
      for (j=0; j<teiste_liikmete_alternatiivid.length; j++){
        voimalikud_vastused.push( str(esimeste_liikmete_alternatiivid[i])+str(teiste_liikmete_alternatiivid[j]));
        voimalikud_vastused.push(str(teiste_liikmete_alternatiivid[j])+str(esimeste_liikmete_alternatiivid[i]));
      }
    }
    // console.log(voimalikud_vastused)
    
    vastused=[];
    for (i=0; i<voimalikud_vastused.length;i++){
      if (voimalikud_vastused[i][0]=="+" ){
          vastused.push(voimalikud_vastused[i].substring(1));
      } else {
        vastused.push(voimalikud_vastused[i])
      }
    }
    // console.log(vastused)
  }
  
  if (mudeli_valik=="paremal"){
    
    // ######################### CONSTANT 1 + SIGN
  if(Math.sign(arv1/arv3)==-1){
      mark_31="-";
    } else if (Math.sign(arv1/arv3)==1 || Math.sign(arv1/arv3)==0){
      mark_31="+";
    }
    konstant_1="("+str(abs(arv1))+")/("+ str(abs(arv3))+")";
    if (abs(arv1)/abs(arv3)==abs(arv1)){
      konstant_1=str(abs(arv1));
    } else if (arv1/arv3==0){
      konstant_1=0;
    }
    
    // ######################### CONSTANT 2 + SIGN
    if(Math.sign(arv2/arv3_tagavara)==-1){
      mark_32="-";
    } else if (Math.sign(arv2/arv3_tagavara)==1){
      mark_32="+";
    }
    konstant_2="("+str(abs(arv2))+")/("+str(abs(arv3_tagavara))+")";
    if (abs(arv2)/abs(arv3_tagavara)==abs(arv2)){
      konstant_2=str(abs(arv2));
    } else if (arv2/arv3_tagavara==0){
      konstant_2=0;
    }
    
    if (liige_3[0]=="-"){
      liige_3="("+liige_3+")";
    }
    
    console.log("Liige 3, 1 ja 2 vastavalt: ", liige_3, liige_1, liige_2);
    antav_ylesanne="("+liige_1+liige_2+"):"+liige_3;

    // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [ESIMESE LIIKME JAOKS VASTUSES!!!!!!]
    if (tahed1_index==0 && tahed3_index==0){
      esimese_liikme_vastus1 =mark_31+ konstant_1;
      esimese_liikme_vastus2=mark_31+ konstant_1;
      esimese_liikme_vastus3=mark_31+ konstant_1;
      esimese_liikme_vastus4=mark_31+ konstant_1;
      esimese_liikme_vastus5=mark_31+ konstant_1;
    } else if ((tahed1_index==0 && tahed3_index==1)) {
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*x^-1";
      esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x"+")";
      esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+")"; 
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"x^-1";
      }
    } else if ( tahed1_index==1 && tahed3_index==0){
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*x";
      esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^-1"+")";
      esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*x"+")/("+str(abs(arv3))+")";
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"x";
      }
    } else if ((tahed1_index==0 && tahed3_index==2)) {
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*y^-1";
      esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y"+")";
      esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^-1"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^-1"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*y^-1"+")/("+str(abs(arv3))+")";
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"y^-1";
      }
    } else if (tahed1_index==2 && tahed3_index==0 ) {
      esimese_liikme_vastus1 = mark_31+ konstant_1+"*y";
      esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^-1"+")";
      esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y"+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*y"+")/("+str(abs(arv3))+")";
      if (konstant_1==1) {
        esimese_liikme_vastus1 = mark_31+"y";
      }
    } else if (tahed1_index==0 && tahed3_index==3) {
      esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
      esimese_liikme_vastus2 = mark_31+konstant_1 +"*x^"+str(-asteX3);
      esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+")";
      if (konstant_1==1) {
        esimese_liikme_vastus2 = mark_31+"x^"+str(-asteX3);
      }
    } else if (tahed1_index==0 && tahed3_index==4) {
      esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
      esimese_liikme_vastus2 = mark_31+konstant_1 +"*y^"+str(-asteY3);
      esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
      esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
      if (konstant_1==1) {
          esimese_liikme_vastus2 = mark_31+"y^"+str(-asteY3);
      }
    } else if (tahed1_index==0 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+konstant_1 +"*x^"+str(-asteX3)+"*y^"+str(-asteY3);
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")"     
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        // if (abs(arv3)==1){
        //   esimese_liikme_vastus1 = mark_31+"(x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv1))+")";
        //     esimese_liikme_vastus2 = mark_31+konstant_1 +"*x^"+str(asteX3)+"*y^"+str(asteY3);
        //     esimese_liikme_vastus3 = mark_31+"("+"1"+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")"      
        //     esimese_liikme_vastus4 = mark_31+"(x^"+str(asteX3)+")/("+ str(abs(arv1))+"*y^"+str(-asteY3)+")";
        //     esimese_liikme_vastus5 = mark_31+"(y^"+str(asteY3)+")/("+ str(abs(arv1))+"*x^"+str(-asteX3)+")";
      if (konstant_1==1) {
         esimese_liikme_vastus2 = mark_31+"x^"+str(-asteX3)+"*y^"+str(-asteY3);
      }
    } else if (tahed1_index==0 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus2 = mark_31+konstant_1 +"*z^"+str(-asteZ3);
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";  
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";  
        esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";
      if (konstant_1==1) {
        esimese_liikme_vastus2 = mark_31 +"z^"+str(-asteZ3);
      }
     } else if (tahed1_index==1 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+konstant_1;
        esimese_liikme_vastus2 = mark_31+konstant_1;
        esimese_liikme_vastus3 = mark_31+konstant_1; 
        esimese_liikme_vastus4 = mark_31+konstant_1;
        esimese_liikme_vastus5 = mark_31+konstant_1; 
    } else if ((tahed1_index==1 && tahed3_index==2)) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x"+")/("+str(abs(arv3))+"*y"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^-1*y"+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x*y^-1"+")/("+str(abs(arv3))+")"; 
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^-1"+")/("+str(abs(arv3))+"*x^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x*y^-1";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x*y^-1";
      }
    } else if (tahed1_index==2 && tahed3_index==1){
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*y"+")/("+str(abs(arv3))+"*x"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x*y^-1"+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^-1*y"+")/("+str(abs(arv3))+")"; 
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+"*y^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^-1*y";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^-1*y";
      }
    } else if (tahed1_index==1 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^-1*y"+")/("+str(abs(arv3))+")"; 
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+"*y^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-(asteX3-1));
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-(asteX3-1));
      }
    } else if (tahed1_index==1 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x"+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^-1*y^"+str(asteY3)+")"; 
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*x^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x*y^"+str(-asteY3);
      if (konstant_1==1) {
           esimese_liikme_vastus5 = mark_31+"x*y^"+str(-asteY3);
      }
    } else if (tahed1_index==1 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-1)+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*x^"+str(asteX3-1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-1))+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-(asteX3-1))+"*y^"+str(-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-(asteX3-1))+"*y^"+str(-asteY3);
      }
    } else if (tahed1_index==1 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^-1*z^"+str(asteZ3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x"+")/("+str(abs(arv3))+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*x^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x*z^"+str(-asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x*z^"+str(-asteZ3);
      }
    } else if (tahed1_index==2 && tahed3_index==2){
        esimese_liikme_vastus1 = mark_31+konstant_1;
        esimese_liikme_vastus2 = mark_31+konstant_1;
        esimese_liikme_vastus3 = mark_31+konstant_1;
        esimese_liikme_vastus4 = mark_31+konstant_1;
        esimese_liikme_vastus5 = mark_31+konstant_1;
    } else if (tahed1_index==2 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^-1"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y"+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y"+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*y^-1"+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX3)+"*y";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX3)+"*y";
      }
    } else if (tahed1_index==2 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(asteY3-1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(asteY3-1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(-(asteY3-1));
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(-(asteY3-1));
      }
    } else if (tahed1_index==2 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3-1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*y^"+str(asteY3-1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-1));
    if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX3)+"*y^"+str(-(asteY3-1));
      }
    } else if (tahed1_index==2 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*y"+")/("+str(abs(arv3))+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*y^-1"+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^-1"+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y"+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y"+"*z^"+str(-asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y"+"*z^"+str(-asteZ3);
      }
    } else if (tahed1_index==3 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1);
      }
    } else if (tahed1_index==3 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(1-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(1-asteX1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1-1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1-1);
      }
    } else if (tahed1_index==3 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*y"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^-1"+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y"+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^-1"+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1)+"*y^-1";
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1)+"*y^-1";
      }
    } else if (tahed1_index==3 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1-asteX3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1-asteX3);
      }
    } else if (tahed1_index==3 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1)+"*y^"+str(-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1)+"*y^"+str(-asteY3);
      }
    } else if (tahed1_index==3 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-(asteX3-asteX1))+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1-asteX3)+"*y^"+str(-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1-asteX3)+"*y^"+str(-asteY3);
      }
    } else if (tahed1_index==3 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1)+"*z^"+str(-asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1)+"*z^"+str(-asteZ3);
      }
    } else if (tahed1_index==4 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*x"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x"+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^-1"+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^-1"+"*y^"+str(asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^-1"+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(1-asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(1-asteY1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(1-asteY1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(1-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY1-1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY1-1);
      }
    } else if (tahed1_index==4 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX3)+"*y^"+str(asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX3)+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==4 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(asteY3-asteY1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(asteY3-asteY1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY1-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY1-asteY3);
      }
    } else if (tahed1_index==4 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-asteY1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-(asteY3-asteY1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX3)+"*y^"+str(asteY1-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(-asteX3)+"*y^"+str(asteY1-asteY3);
      }
     } else if (tahed1_index==4 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(asteY1)+"*z^"+str(-asteZ3);
     if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(asteY1)+"*z^"+str(-asteZ3);
      }
    } else if (tahed1_index==5 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1)+"*y^"+str(asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1)+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-1)+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*x^"+str(1-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-1)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(1-asteX1)+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1-1)+"*y^"+str(asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1-1)+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1-1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1-1)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*y^"+str(1-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(1-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1)+"*y^"+str(asteY1-1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1)+"*y^"+str(asteY1-1);
      }
    } else if (tahed1_index==5 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+"*y^"+str(asteY1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1-asteX3)+"*y^"+str(asteY1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1-asteX3)+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==5 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1-asteY3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1-asteY3)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1)+"*y^"+str(asteY1-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1)+"*y^"+str(asteY1-asteY3);
      }
    } else if (tahed1_index==5 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+"*y^"+str(asteY1-asteY3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1-asteY3)+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1-asteX3)+")/("+str(abs(arv3))+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3-asteX1)+"*y^"+str(asteY3-asteY1)+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(asteX1-asteX3)+"*y^"+str(asteY1-asteY3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX1-asteX3)+"*y^"+str(asteY1-asteY3);
      }
   } else if (tahed1_index==5 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+"*z^"+str(asteZ3)+")";
        esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*y^"+str(asteY1)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus6 = mark_31+"("+ str(abs(arv1))+"*y^"+str(asteY1)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+")";
        esimese_liikme_vastus7 = mark_31+"("+ str(abs(arv1))+"*x^"+str(asteX1)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus8 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3))+"*x^"+str(-asteX1)+"*y^"+str(-asteY1)+")";
        esimese_liikme_vastus9= mark_31+konstant_1+"*x^"+str(asteX1)+"*y^"+str(asteY1)+"*z^"+str(-asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus9= mark_31+"x^"+str(asteX1)+"*y^"+str(asteY1)+"*z^"+str(-asteZ3);
      }
    } else if (tahed1_index==6 && tahed3_index==0) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*z^"+str(asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"z^"+str(asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==1) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*x"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^-1"+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^-1*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^-1*z^"+str(asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^-1*z^"+str(asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==2) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*y"+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^-1"+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^-1*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^-1*z^"+str(asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^-1*z^"+str(asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==3) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*x^"+str(-asteX3)+"*z^"+str(asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"x^"+str(asteX3)+"*z^"+str(-asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==4) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*y^"+str(asteY3)+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*y^"+str(-asteY3)+"*z^"+str(asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"y^"+str(-asteY3)+"*z^"+str(asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==5) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*x^"+str(asteX3)+")";
        esimese_liikme_vastus5 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+"*y^"+str(asteY3)+")";
        esimese_liikme_vastus6 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+")/("+str(abs(arv3))+"*y^"+str(asteY3)+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus7 = mark_31+"("+ str(abs(arv1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3))+"*x^"+str(asteX3)+"*z^"+str(-asteZ1)+")";
        esimese_liikme_vastus8 = mark_31+"("+ str(abs(arv1))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ1)+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus9 = mark_31+konstant_1+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ1);
      if (konstant_1==1) {
        esimese_liikme_vastus9 = mark_31+"x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ1);
      }
    } else if (tahed1_index==6 && tahed3_index==6) {
        esimese_liikme_vastus1 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-(asteZ3-asteZ1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus2 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*z^"+str(asteZ3-asteZ1)+")";
        esimese_liikme_vastus3 = mark_31+"("+ str(abs(arv1))+")/("+str(abs(arv3))+"*z^"+str(asteZ3-asteZ1)+")";
        esimese_liikme_vastus4 = mark_31+"("+ str(abs(arv1))+"*z^"+str(-(asteZ3-asteZ1))+")/("+str(abs(arv3))+")";
        esimese_liikme_vastus5 = mark_31+konstant_1+"*z^"+str(asteZ1-asteZ3);
      if (konstant_1==1) {
        esimese_liikme_vastus5 = mark_31+"z^"+str(asteZ1-asteZ3);
      }
    }
    
    // console.log(esimese_liikme_vastus1)
    // console.log(esimese_liikme_vastus2)
    // console.log(esimese_liikme_vastus3)
    // console.log(esimese_liikme_vastus4)
    // console.log(esimese_liikme_vastus5)
    esimeste_liikmete_alternatiivid=[esimese_liikme_vastus1,esimese_liikme_vastus2,esimese_liikme_vastus3,esimese_liikme_vastus4,esimese_liikme_vastus5,esimese_liikme_vastus6,esimese_liikme_vastus7,esimese_liikme_vastus8,esimese_liikme_vastus9]
    console.log(esimeste_liikmete_alternatiivid)
    
    
    
    
    
    
     // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [TEISE LIIKME JAOKS VASTUSES!!!!]
    // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [TEISE LIIKME JAOKS VASTUSES!!!!]
    
        // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 72 tingimust. [ESIMESE LIIKME JAOKS VASTUSES!!!!!!]
    if (tahed2_index==0 && tahed3_index==0){
      teise_liikme_vastus1 =mark_32+ konstant_2;
      teise_liikme_vastus2=mark_32+ konstant_2;
      teise_liikme_vastus3=mark_32+ konstant_2;
      teise_liikme_vastus4=mark_32+ konstant_2;
      teise_liikme_vastus5=mark_32+ konstant_2;
    } else if ((tahed2_index==0 && tahed3_index==1)) {
      teise_liikme_vastus1 = mark_32+ konstant_2+"*x^-1";
      teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x"+")";
      teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+")"; 
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"x^-1";
      }
    } else if ( tahed2_index==1 && tahed3_index==0){
      teise_liikme_vastus1 = mark_32+ konstant_2+"*x";
      teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^-1"+")";
      teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*x"+")/("+str(abs(arv3_tagavara))+")";
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"x";
      }
    } else if ((tahed2_index==0 && tahed3_index==2)) {
      teise_liikme_vastus1 = mark_32+ konstant_2+"*y^-1";
      teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y"+")";
      teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^-1"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^-1"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*y^-1"+")/("+str(abs(arv3_tagavara))+")";
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"y^-1";
      }
    } else if (tahed2_index==2 && tahed3_index==0 ) {
      teise_liikme_vastus1 = mark_32+ konstant_2+"*y";
      teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^-1"+")";
      teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y"+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*y"+")/("+str(abs(arv3_tagavara))+")";
      if (konstant_2==1) {
        teise_liikme_vastus1 = mark_32+"y";
      }
    } else if (tahed2_index==0 && tahed3_index==3) {
      teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
      teise_liikme_vastus2 = mark_32+konstant_2 +"*x^"+str(-asteX3);
      teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+")";
      if (konstant_2==1) {
        teise_liikme_vastus2 = mark_32+"x^"+str(-asteX3);
      }
    } else if (tahed2_index==0 && tahed3_index==4) {
      teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
      teise_liikme_vastus2 = mark_32+konstant_2 +"*y^"+str(-asteY3);
      teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
      teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
      if (konstant_2==1) {
          teise_liikme_vastus2 = mark_32+"y^"+str(-asteY3);
      }
    } else if (tahed2_index==0 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+konstant_2 +"*x^"+str(-asteX3)+"*y^"+str(-asteY3);
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")"     
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        // if (abs(arv3_tagavara)==1){
        //   teise_liikme_vastus1 = mark_32+"(x^"+str(asteX3)+"*y^"+str(asteY3)+")/("+ str(abs(arv2))+")";
        //     teise_liikme_vastus2 = mark_32+konstant_2 +"*x^"+str(asteX3)+"*y^"+str(asteY3);
        //     teise_liikme_vastus3 = mark_32+"("+"1"+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")"      
        //     teise_liikme_vastus4 = mark_32+"(x^"+str(asteX3)+")/("+ str(abs(arv2))+"*y^"+str(-asteY3)+")";
        //     teise_liikme_vastus5 = mark_32+"(y^"+str(asteY3)+")/("+ str(abs(arv2))+"*x^"+str(-asteX3)+")";
      if (konstant_2==1) {
         teise_liikme_vastus2 = mark_32+"x^"+str(-asteX3)+"*y^"+str(-asteY3);
      }
    } else if (tahed2_index==0 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus2 = mark_32+konstant_2 +"*z^"+str(-asteZ3);
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";  
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";  
        teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";
      if (konstant_2==1) {
        teise_liikme_vastus2 = mark_32 +"z^"+str(-asteZ3);
      }
     } else if (tahed2_index==1 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+konstant_2;
        teise_liikme_vastus2 = mark_32+konstant_2;
        teise_liikme_vastus3 = mark_32+konstant_2; 
        teise_liikme_vastus4 = mark_32+konstant_2;
        teise_liikme_vastus5 = mark_32+konstant_2; 
    } else if ((tahed2_index==1 && tahed3_index==2)) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x"+")/("+str(abs(arv3_tagavara))+"*y"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^-1*y"+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x*y^-1"+")/("+str(abs(arv3_tagavara))+")"; 
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^-1"+")/("+str(abs(arv3_tagavara))+"*x^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x*y^-1";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x*y^-1";
      }
    } else if (tahed2_index==2 && tahed3_index==1){
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*y"+")/("+str(abs(arv3_tagavara))+"*x"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x*y^-1"+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^-1*y"+")/("+str(abs(arv3_tagavara))+")"; 
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+"*y^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^-1*y";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^-1*y";
      }
    } else if (tahed2_index==1 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-1)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-1))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^-1*y"+")/("+str(abs(arv3_tagavara))+")"; 
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+"*y^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-(asteX3-1));
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-(asteX3-1));
      }
    } else if (tahed2_index==1 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x"+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^-1*y^"+str(asteY3)+")"; 
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x*y^"+str(-asteY3);
      if (konstant_2==1) {
           teise_liikme_vastus5 = mark_32+"x*y^"+str(-asteY3);
      }
    } else if (tahed2_index==1 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-1)+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-1))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-1)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-1))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-(asteX3-1))+"*y^"+str(-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-(asteX3-1))+"*y^"+str(-asteY3);
      }
    } else if (tahed2_index==1 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^-1*z^"+str(asteZ3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x"+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*x^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x*z^"+str(-asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x*z^"+str(-asteZ3);
      }
    } else if (tahed2_index==2 && tahed3_index==2){
        teise_liikme_vastus1 = mark_32+konstant_2;
        teise_liikme_vastus2 = mark_32+konstant_2;
        teise_liikme_vastus3 = mark_32+konstant_2;
        teise_liikme_vastus4 = mark_32+konstant_2;
        teise_liikme_vastus5 = mark_32+konstant_2;
    } else if (tahed2_index==2 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^-1"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y"+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y"+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^-1"+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX3)+"*y";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX3)+"*y";
      }
    } else if (tahed2_index==2 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-1)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-1)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(-(asteY3-1));
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(-(asteY3-1));
      }
    } else if (tahed2_index==2 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3-1)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(asteY3-1))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-1)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-1));
    if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX3)+"*y^"+str(-(asteY3-1));
      }
    } else if (tahed2_index==2 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*y"+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*y^-1"+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^-1"+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y"+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y"+"*z^"+str(-asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y"+"*z^"+str(-asteZ3);
      }
    } else if (tahed2_index==3 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2);
      }
    } else if (tahed2_index==3 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-1)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-1)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2-1);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2-1);
      }
    } else if (tahed2_index==3 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*y"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^-1"+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y"+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^-1"+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2)+"*y^-1";
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2)+"*y^-1";
      }
    } else if (tahed2_index==3 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2-asteX3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2-asteX3);
      }
    } else if (tahed2_index==3 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(asteY3)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2)+"*y^"+str(-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2)+"*y^"+str(-asteY3);
      }
    } else if (tahed2_index==3 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-(asteX3-asteX2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2-asteX3)+"*y^"+str(-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2-asteX3)+"*y^"+str(-asteY3);
      }
    } else if (tahed2_index==3 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2)+"*z^"+str(-asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2)+"*z^"+str(-asteZ3);
      }
    } else if (tahed2_index==4 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*x"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x"+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^-1"+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^-1"+"*y^"+str(asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^-1"+"*y^"+str(asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(1-asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(1-asteY2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(1-asteY2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(1-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY2-1);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY2-1);
      }
    } else if (tahed2_index==4 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX3)+"*y^"+str(asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX3)+"*y^"+str(asteY2);
      }
    } else if (tahed2_index==4 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(asteY3-asteY2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(asteY3-asteY2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY2-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY2-asteY3);
      }
    } else if (tahed2_index==4 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-(asteY3-asteY2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-(asteY3-asteY2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX3)+"*y^"+str(asteY2-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(-asteX3)+"*y^"+str(asteY2-asteY3);
      }
     } else if (tahed2_index==4 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(asteY2)+"*z^"+str(-asteZ3);
     if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(asteY2)+"*z^"+str(-asteZ3);
      }
    } else if (tahed2_index==5 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2)+"*y^"+str(asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2)+"*y^"+str(asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-1)+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-1)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(1-asteX2)+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2-1)+"*y^"+str(asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2-1)+"*y^"+str(asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2-1)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2-1)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(1-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(1-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2)+"*y^"+str(asteY2-1);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2)+"*y^"+str(asteY2-1);
      }
    } else if (tahed2_index==5 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2-asteX3)+"*y^"+str(asteY2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2-asteX3)+"*y^"+str(asteY2);
      }
    } else if (tahed2_index==5 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2-asteY3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2)+"*y^"+str(asteY2-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2)+"*y^"+str(asteY2-asteY3);
      }
    } else if (tahed2_index==5 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+"*y^"+str(asteY2-asteY3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3-asteX2)+"*y^"+str(asteY3-asteY2)+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(asteX2-asteX3)+"*y^"+str(asteY2-asteY3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX2-asteX3)+"*y^"+str(asteY2-asteY3);
      }
   } else if (tahed2_index==5 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+"*z^"+str(asteZ3)+")";
        teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*y^"+str(asteY2)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus6 = mark_32+"("+ str(abs(arv2))+"*y^"+str(asteY2)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+")";
        teise_liikme_vastus7 = mark_32+"("+ str(abs(arv2))+"*x^"+str(asteX2)+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus8 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-asteZ3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(-asteX2)+"*y^"+str(-asteY2)+")";
        teise_liikme_vastus9= mark_32+konstant_2+"*x^"+str(asteX2)+"*y^"+str(asteY2)+"*z^"+str(-asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus9= mark_32+"x^"+str(asteX2)+"*y^"+str(asteY2)+"*z^"+str(-asteZ3);
      }
    } else if (tahed2_index==6 && tahed3_index==0) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*z^"+str(asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"z^"+str(asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==1) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*x"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x*z^"+str(-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^-1"+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^-1*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^-1*z^"+str(asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^-1*z^"+str(asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==2) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*y"+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y*z^"+str(-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^-1"+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^-1*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^-1*z^"+str(asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^-1*z^"+str(asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==3) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*x^"+str(-asteX3)+"*z^"+str(asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"x^"+str(asteX3)+"*z^"+str(-asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==4) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*y^"+str(-asteY3)+"*z^"+str(asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"y^"+str(-asteY3)+"*z^"+str(asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==5) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*y^"+str(asteY3)+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+")";
        teise_liikme_vastus5 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+")";
        teise_liikme_vastus6 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+")/("+str(abs(arv3_tagavara))+"*y^"+str(asteY3)+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus7 = mark_32+"("+ str(abs(arv2))+"*y^"+str(-asteY3)+")/("+str(abs(arv3_tagavara))+"*x^"+str(asteX3)+"*z^"+str(-asteZ2)+")";
        teise_liikme_vastus8 = mark_32+"("+ str(abs(arv2))+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ2)+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus9 = mark_32+konstant_2+"*x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ2);
      if (konstant_2==1) {
        teise_liikme_vastus9 = mark_32+"x^"+str(-asteX3)+"*y^"+str(-asteY3)+"*z^"+str(asteZ2);
      }
    } else if (tahed2_index==6 && tahed3_index==6) {
        teise_liikme_vastus1 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-(asteZ3-asteZ2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus2 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3-asteZ2)+")";
        teise_liikme_vastus3 = mark_32+"("+ str(abs(arv2))+")/("+str(abs(arv3_tagavara))+"*z^"+str(asteZ3-asteZ2)+")";
        teise_liikme_vastus4 = mark_32+"("+ str(abs(arv2))+"*z^"+str(-(asteZ3-asteZ2))+")/("+str(abs(arv3_tagavara))+")";
        teise_liikme_vastus5 = mark_32+konstant_2+"*z^"+str(asteZ2-asteZ3);
      if (konstant_2==1) {
        teise_liikme_vastus5 = mark_32+"z^"+str(asteZ2-asteZ3);
      }
    } 
    
    // console.log(teise_liikme_vastus1)
    // console.log(teise_liikme_vastus2)
    // console.log(teise_liikme_vastus3)
    // console.log(teise_liikme_vastus4)
    // console.log(teise_liikme_vastus5)
    teiste_liikmete_alternatiivid=[teise_liikme_vastus1,teise_liikme_vastus2,teise_liikme_vastus3,teise_liikme_vastus4,teise_liikme_vastus5,teise_liikme_vastus6,teise_liikme_vastus7,teise_liikme_vastus8,teise_liikme_vastus9]
    console.log(teiste_liikmete_alternatiivid)
    
    
    
    
        voimalikud_vastused=[];
    for (i=0; i<esimeste_liikmete_alternatiivid.length; i++){
      for (j=0; j<teiste_liikmete_alternatiivid.length; j++){
        voimalikud_vastused.push( str(esimeste_liikmete_alternatiivid[i])+str(teiste_liikmete_alternatiivid[j]));
        voimalikud_vastused.push(str(teiste_liikmete_alternatiivid[j])+str(esimeste_liikmete_alternatiivid[i]));
      }
    }
    // console.log(voimalikud_vastused)
    
    vastused=[];
    for (i=0; i<voimalikud_vastused.length;i++){
      if (voimalikud_vastused[i][0]=="+" ){
          vastused.push(voimalikud_vastused[i].substring(1));
      } else {
        vastused.push(voimalikud_vastused[i])
      }
    }
    // console.log(vastused)
    
    
    
 }
     console.log(antav_ylesanne)
    // console.log(vastus_kontrolliks)
     tex_string=antav_ylesanne+"=";
     katex.render( tex_string, tex_vorrand.elt);
     yl_text.html("Jaga hulkliige üksliikmega või vastupidi. Võimalusel taanda arvkordajad.");
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
  console.log("KONTROLL: ");
  console.log("MQ sisu: ", sisu);
  // console.log("Vastus võrdlemiseks: ", vastus_kontrolliks)
  for (i=0; i<vastused.length;i++){
           if (str(sisu) == vastused[i] && str(sisu).length>0){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              oige_vastus=oige_vastus+1;
             break;
            } else {
              tulemus.html("Viga!");
              tulemus.style("color","red");
            }
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
    return (Math.sign(v) * Math.round(Math.abs(v)) );
}

function round_1(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10)/10 );
}

function round_2(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*100)/100 );
}

function round_3(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*1000)/1000 );
}

function round_4(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10000)/10000 );
}

function liikmete_SUM(massiiv){
  temp_summa=0;
  for (i=0; i<=massiiv.length-1; i++){
    temp_summa=temp_summa+massiiv[i];
  }
    return temp_summa;
}




// for WEBGL end screen
empty_vec=[];
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
