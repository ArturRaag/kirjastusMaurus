
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var l6petamise_tingimus=false;


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
regularText.innerHTML = " Astmete sisestamiseks tuleb trükkida ^ sümbol (enamasti SHIFT+6 klahvi kombinatsioon klaviatuuril). Et astmest väljuda, vajutage parema noole klahvi.<br><br>Liikmete järjekord vastuse sisestamisel oluline ei ole.<br><br>Näiteks.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ="\\left(2x-6 \\right)^{2}=2x \\cdot 2x + 2x \\cdot (-6)+(-6) \\cdot 2x + (-6) \\cdot (-6)= 4x^{2}-24x+36"
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
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  
  L6PETA_NUPP.mousePressed(L6pp);
  L6PETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  
  // console.log(tex_v6rrand.size)
  if(l6petamise_tingimus==true){
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
    L6PETA_NUPP.remove();
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
  
  L6PETA_NUPP=createButton("Lõpeta test");
  L6PETA_NUPP.style('padding','10px 20px');
  L6PETA_NUPP.style('background-color','LightSteelBlue');
  L6PETA_NUPP.style('color','black');
  L6PETA_NUPP.style('font-weight','bold');
  L6PETA_NUPP.style('border-radius','30px');
  L6PETA_NUPP.style('margin-top','30px');
  L6PETA_NUPP.style('margin-left','80px');
  L6PETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
  
  ylesannete_loendur=ylesannete_loendur+1;
}


function Ylesanne(){

  mudel=["1","2","3","4","5","6"];
  mudeli_valik=random(mudel);
  console.log(mudeli_valik)
  
  if (mudeli_valik=="1") {
      arv1=int(random(-10,10));
      arv2=int(random(-10,10));
      arv3=int(random(-10,10));
      arv4=int(random(-10,10));
      
      muutujate_massiiv=["x","y"];
    
      muutuja_1=random(muutujate_massiiv);
      muutuja_2=random(muutujate_massiiv);
      
      arv1_str=str(arv1);
      arv2_str=str(arv2);
      arv3_str=str(arv3);
      arv4_str=str(arv4);
      if (arv2>=0){
        arv2_str="+"+str(arv2);
      } 
      if (arv4>=0){
        arv4_str="+"+str(arv4);
      }
    
      symbolic_sulg_1 = "("+str(arv1_str)+muutuja_1+str(arv2_str)+")";
      symbolic_sulg_2 = "("+str(arv3_str)+muutuja_2+str(arv4_str)+")";
      antav_ylesanne=symbolic_sulg_1+symbolic_sulg_2; 
    
        // -  MUDEL 1 (Samasugused muutujad)  -//
      if (muutuja_1==muutuja_2) {
      const_A=str(arv1*arv3);
      const_B=str(arv1*arv4+arv2*arv3);
      const_C=str(arv2*arv4);
        
        if ((arv1*arv3)>=0){
          const_A="+"+str(arv1*arv3);
        }
        if ((arv1*arv4+arv2*arv3)>=0){
          const_B="+"+str(arv1*arv4+arv2*arv3);
        }
        if ((arv2*arv4)>=0){
          const_C="+"+str(arv2*arv4);
        }
        liige_A=const_A+"*"+muutuja_1+"^2";
        liige_B=const_B+"*"+muutuja_1;
        liige_C=const_C;
        if ((arv1*arv3)==0) {
          liige_A="";
        }
        if ((arv1*arv4+arv2*arv3)==0){
            liige_B="";
            }
        if ((arv2*arv4)==0) {
          liige_C="";
        }
        liikmete_massiiv=[liige_A, liige_B, liige_C];
        
        tulemused=permute(liikmete_massiiv);
        // console.log(tulemused);
        // console.log(tulemused[1]);
        
        kontrollitavad_vastused=[];
        
        for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
          for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
          
        }
        
        if (liige_A==""&& liige_B=="" && liige_C=="" ){
          kontrollitavad_vastused.push("0")
        }
        //console.log(kontrollitavad_vastused)
      }
    
    // -  MUDEL 1 (erinevad muutujad 1)  -//
    if(muutuja_1=="x" && muutuja_2=="y"){
      const_A=str(arv1*arv3);
      const_B=str(arv1*arv4);
      const_C=str(arv2*arv3);
      const_D=str(arv2*arv4)
        if ((arv1*arv3)>=0){
          const_A="+"+str(arv1*arv3);
        }
        if ((arv1*arv4)>=0){
          const_B="+"+str(arv1*arv4);
        }
        if ((arv2*arv3)>=0){
          const_C="+"+str(arv2*arv3);
        }  
       if ((arv2*arv4)>=0){
          const_D="+"+str(arv2*arv4);
        }
        liige_A=const_A+"*"+"x*y";
        liige_B=const_B+"*"+"x";
        liige_C=const_C+"*"+"y";
        liige_D=const_D;
        if ((arv1*arv3)==0) {
          liige_A="";
        }
        if ((arv1*arv4)==0){
            liige_B="";
            }
        if ((arv2*arv3)==0) {
          liige_C="";
        }
        if ((arv2*arv4)==0){
          liige_D="";
        }
      
      liikmete_massiiv=[liige_A, liige_B, liige_C, liige_D];
      tulemused=permute(liikmete_massiiv);
      
      kontrollitavad_vastused=[];
        
      for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
        for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        }
        
        if (liige_A==""&& liige_B=="" && liige_C=="" && liige_D=="" ){
          kontrollitavad_vastused.push("0")
        }
        //console.log(kontrollitavad_vastused)
    }
    
      // -  MUDEL 1 (erinevad muutujad 2)  -//
    if(muutuja_2=="x" && muutuja_1=="y"){
      const_A=str(arv1*arv3);
      const_B=str(arv1*arv4);
      const_C=str(arv2*arv3);
      const_D=str(arv2*arv4)
        if ((arv1*arv3)>=0){
          const_A="+"+str(arv1*arv3);
        }
        if ((arv1*arv4)>=0){
          const_B="+"+str(arv1*arv4);
        }
        if ((arv2*arv3)>=0){
          const_C="+"+str(arv2*arv3);
        }  
       if ((arv2*arv4)>=0){
          const_D="+"+str(arv2*arv4);
        }
        liige_A=const_A+"*"+"x*y";
        liige_B=const_B+"*"+"y";
        liige_C=const_C+"*"+"x";
        liige_D=const_D;
        if ((arv1*arv3)==0) {
          liige_A="";
        }
        if ((arv1*arv4)==0){
            liige_B="";
            }
        if ((arv2*arv3)==0) {
          liige_C="";
        }
        if ((arv2*arv4)==0){
          liige_D="";
        }
      
      liikmete_massiiv=[liige_A, liige_B, liige_C, liige_D];
      tulemused=permute(liikmete_massiiv);
      
      kontrollitavad_vastused=[];
        
      for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
        for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        }
        
        if (liige_A==""&& liige_B=="" && liige_C=="" && liige_D=="" ){
          kontrollitavad_vastused.push("0")
        }
        //console.log(kontrollitavad_vastused)
    }
    
    
    
  }

  //- MUDEL 2 RUUTUDE VAHE VALEM -//
  if (mudeli_valik=="2"){
      arv1=int(random(0,10));
      arv2=int(random(0,10));
      
      muutujate_massiiv=["x","y"];
    
      muutuja_1=random(muutujate_massiiv);
      
      arv1_str=str(arv1);
      arv2_str=str(arv2);
    
      symbolic_sulg_1 = "("+str(arv1_str)+muutuja_1+"+"+str(arv2_str)+")";
      symbolic_sulg_2 = "("+str(arv1_str)+muutuja_1+"-"+str(arv2_str)+")";
      //sulud=[symbolic_sulg_1, symbolic_sulg_2];
    
    
    //- SIIN SAAKS VEEL VAEVA NÄHA, et seda randomiseerida.
      antav_ylesanne=symbolic_sulg_1+symbolic_sulg_2;
    
      // -  MUDEL 2 (Ruutude vahe valem)  -//
      const_A=str(arv1*arv1);
      const_B=str(-1*arv2*arv2);
        
        if ((arv1*arv1)>=0){
          const_A="+"+str(arv1*arv1);
        }
        if ((-arv2*arv2)>=0){
          const_B="+"+str(-arv2*arv2);
        }
        liige_A=const_A+"*"+muutuja_1+"^2";
        liige_B=const_B;
        if ((arv1*arv1)==0) {
          liige_A="";
        }
        if ((-arv2*arv2)==0){
            liige_B="";
            }
        liikmete_massiiv=[liige_A, liige_B];
        
        tulemused=permute(liikmete_massiiv);
        // console.log(tulemused);
        // console.log(tulemused[1]);
        
        kontrollitavad_vastused=[];
        
        for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
          for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        
        if (liige_A==""&& liige_B==""){
          kontrollitavad_vastused.push("0")
        }
        //console.log(kontrollitavad_vastused)
      }
    
  }
  
  
    //- MUDEL 3 ÜKSLIIKMETE SUMMA RUUT -//
  if (mudeli_valik=="3"){
      arv1=int(random(0,10));
      arv2=int(random(0,10));
      
      muutujate_massiiv=["x","y"];
    
      muutuja_1=random(muutujate_massiiv);
      
      arv1_str=str(arv1);
      arv2_str=str(arv2);
    
      symbolic_sulg_1 = "("+str(arv1_str)+muutuja_1+"+"+str(arv2_str)+")";
      symbolic_sulg_2 = "("+str(arv1_str)+muutuja_1+"+"+str(arv2_str)+")";
      //sulud=[symbolic_sulg_1, symbolic_sulg_2];
    
    
    //- SIIN SAAKS VEEL VAEVA NÄHA, et seda randomiseerida.
      antav_ylesanne=symbolic_sulg_1+symbolic_sulg_2;
    
     //- MUDEL 3 ÜKSLIIKMETE SUMMA RUUT -//
      const_A=str(arv1*arv1);
      const_B=str(2*arv1*arv2);
      const_C=str(arv2*arv2);
        
        if ((arv1*arv1)>=0){
          const_A="+"+str(arv1*arv1);
        }
        if ((2*arv1*arv2)>=0){
          const_B="+"+str(2*arv1*arv2);
        }
      if ((arv2*arv2)>=0){
        
        const_C="+"+str(arv2*arv2);
      }
    
        liige_A=const_A+"*"+muutuja_1+"^2";
        liige_B=const_B+"*"+muutuja_1;
        liige_C=const_C;
    
        if ((arv1*arv1)==0) {
          liige_A="";
        }
        if ((2*arv1*arv2)==0){
          liige_B="";
            }
        if ((arv2*arv2)==0){
          liige_C="";
        }
      liikmete_massiiv=[liige_A, liige_B, liige_C];
        
        tulemused=permute(liikmete_massiiv);
        // console.log(tulemused);
        // console.log(tulemused[1]);
        
        kontrollitavad_vastused=[];
        
        for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
          for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        
        if (liige_A==""&& liige_B=="" && liige_C=="" ){
          kontrollitavad_vastused.push("0")
        }
       //console.log(kontrollitavad_vastused)
      }
    
  }
  
  
      //- MUDEL 4 ÜKSLIIKMETE SUMMA RUUT (sulg ruudus) -//
  if (mudeli_valik=="4"){
      arv1=int(random(0,10));
      arv2=int(random(0,10));
      
      muutujate_massiiv=["x","y"];
    
      muutuja_1=random(muutujate_massiiv);
      
      arv1_str=str(arv1);
      arv2_str=str(arv2);
    
      symbolic_sulg_1 = "("+str(arv1_str)+muutuja_1+"+"+str(arv2_str)+")";

      antav_ylesanne=symbolic_sulg_1+"^"+"2";
    
     //- MUDEL 4 ÜKSLIIKMETE SUMMA RUUT (sulg ruudus)-//
      const_A=str(arv1*arv1);
      const_B=str(2*arv1*arv2);
      const_C=str(arv2*arv2);
        
        if ((arv1*arv1)>=0){
          const_A="+"+str(arv1*arv1);
        }
        if ((2*arv1*arv2)>=0){
          const_B="+"+str(2*arv1*arv2);
        }
      if ((arv2*arv2)>=0){
        
        const_C="+"+str(arv2*arv2);
      }
    
        liige_A=const_A+"*"+muutuja_1+"^2";
        liige_B=const_B+"*"+muutuja_1;
        liige_C=const_C;
    
        if ((arv1*arv1)==0) {
          liige_A="";
        }
        if ((2*arv1*arv2)==0){
          liige_B="";
            }
        if ((arv2*arv2)==0){
          liige_C="";
        }
      liikmete_massiiv=[liige_A, liige_B, liige_C];
        
        tulemused=permute(liikmete_massiiv);
        // console.log(tulemused);
        // console.log(tulemused[1]);
        
        kontrollitavad_vastused=[];
        
        for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
          for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        
        if (liige_A==""&& liige_B=="" && liige_C=="" ){
          kontrollitavad_vastused.push("0")
        }
        //console.log(kontrollitavad_vastused)
      }
    
  }
  
      //- MUDEL 5 ÜKSLIIKMETE VAHE RUUT -//
  if (mudeli_valik=="5"){
      arv1=int(random(0,10));
      arv2=int(random(0,10));
      
      muutujate_massiiv=["x","y"];
    
      muutuja_1=random(muutujate_massiiv);
      
      arv1_str=str(arv1);
      arv2_str=str(arv2);
    
      symbolic_sulg_1 = "("+str(arv1_str)+muutuja_1+"-"+str(arv2_str)+")";
      symbolic_sulg_2 = "("+str(arv1_str)+muutuja_1+"-"+str(arv2_str)+")";
      //sulud=[symbolic_sulg_1, symbolic_sulg_2];
    
    
    //- SIIN SAAKS VEEL VAEVA NÄHA, et seda randomiseerida.
      antav_ylesanne=symbolic_sulg_1+symbolic_sulg_2;
    
     //- MUDEL 5 ÜKSLIIKMETE SUMMA RUUT -//
      const_A=str(arv1*arv1);
      const_B=str(-2*arv1*arv2);
      const_C=str(arv2*arv2);
        
        if ((arv1*arv1)>=0){
          const_A="+"+str(arv1*arv1);
        }
        if ((2*arv1*arv2)>=0){
          const_B=str(-2*arv1*arv2);
        }
      if ((arv2*arv2)>=0){
        
        const_C="+"+str(arv2*arv2);
      }
    
        liige_A=const_A+"*"+muutuja_1+"^2";
        liige_B=const_B+"*"+muutuja_1;
        liige_C=const_C;
    
        if ((arv1*arv1)==0) {
          liige_A="";
        }
        if ((2*arv1*arv2)==0){
          liige_B="";
            }
        if ((arv2*arv2)==0){
          liige_C="";
        }
      liikmete_massiiv=[liige_A, liige_B, liige_C];
        
        tulemused=permute(liikmete_massiiv);
        // console.log(tulemused);
        // console.log(tulemused[1]);
        
        kontrollitavad_vastused=[];
        
        for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
          for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        
        if (liige_A==""&& liige_B=="" && liige_C=="" ){
          kontrollitavad_vastused.push("0")
        }
       // console.log(kontrollitavad_vastused)
      }
    
  }
  
        //- MUDEL 6 ÜKSLIIKMETE VAHE RUUT (sulg ruudus) -//
  if (mudeli_valik=="6"){
      arv1=int(random(0,10));
      arv2=int(random(0,10));
      
      muutujate_massiiv=["x","y"];
    
      muutuja_1=random(muutujate_massiiv);
      
      arv1_str=str(arv1);
      arv2_str=str(arv2);
    
      symbolic_sulg_1 = "("+str(arv1_str)+muutuja_1+"-"+str(arv2_str)+")";

    //- SIIN SAAKS VEEL VAEVA NÄHA, et seda randomiseerida.
      antav_ylesanne=symbolic_sulg_1+"^2";
    
     //- MUDEL 6 ÜKSLIIKMETE SUMMA RUUT -//
      const_A=str(arv1*arv1);
      const_B=str(-2*arv1*arv2);
      const_C=str(arv2*arv2);
        
        if ((arv1*arv1)>=0){
          const_A="+"+str(arv1*arv1);
        }
        if ((2*arv1*arv2)>=0){
          const_B=str(-2*arv1*arv2);
        }
      if ((arv2*arv2)>=0){
        
        const_C="+"+str(arv2*arv2);
      }
    
        liige_A=const_A+"*"+muutuja_1+"^2";
        liige_B=const_B+"*"+muutuja_1;
        liige_C=const_C;
    
        if ((arv1*arv1)==0) {
          liige_A="";
        }
        if ((2*arv1*arv2)==0){
          liige_B="";
            }
        if ((arv2*arv2)==0){
          liige_C="";
        }
      liikmete_massiiv=[liige_A, liige_B, liige_C];
        
        tulemused=permute(liikmete_massiiv);
        // console.log(tulemused);
        // console.log(tulemused[1]);
        
        kontrollitavad_vastused=[];
        
        for (i=0; i<tulemused.length; i++){
          voimalik_vastus="";
          for (j=0; j<tulemused[i].length;j++){
            //console.log(tulemused[i]);
            voimalik_vastus=voimalik_vastus+tulemused[i][j];
          }
          if (voimalik_vastus[0]=="+"){
            voimalik_vastus=voimalik_vastus.slice(1);
          }
          kontrollitavad_vastused.push(voimalik_vastus);
        
        if (liige_A==""&& liige_B=="" && liige_C=="" ){
          kontrollitavad_vastused.push("0")
        }
        //console.log(kontrollitavad_vastused)
      }
    
  }
  
  
   //console.log(antav_ylesanne)
    // console.log(vastus_kontrolliks)
   tex_string=antav_ylesanne+"=";
   katex.render( tex_string, tex_v6rrand.elt);
   yl_text.html("Korruta hulkliikmed. Võimalusel kasuta abivalemeid.");
}


function write_texts(){
  
  tex_v6rrand=createP("");
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_v6rrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  // tex_v6rrand.parent("test");
  MathQuill_v6rrand=select("#answer");
  // MathQuill_v6rrand.parent(tex_v6rrand)
  // MathQuill_v6rrand.style("width: 80%; float: right; font-size: 24px; margin: 30px auto;");
  MathQuill_v6rrand.style(" width: 80%; margin-top: 70px auto; font-size: 24px;")
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
}

function kontroll(){
  sisu=document.getElementById("lihtsam").textContent;
  //console.log("KONTROLL: ")
//console.log("MQ sisu: ", sisu);
  
          for (i=0; i<kontrollitavad_vastused.length; i++){
            vastus_kontrolliks=kontrollitavad_vastused[i];     
       //console.log("Vastus võrdlemiseks: ", vastus_kontrolliks)
           if (str(sisu) == vastus_kontrolliks && str(sisu).length>0){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              oige_vastus=oige_vastus+1;
             //console.log("õige")
             break;
            } else {
              tulemus.html("Viga!");
              tulemus.style("color","red");
            }
          }
    

}


function L6pp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  L6PETA_NUPP.attribute("disabled","");
  
  tex_v6rrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  L6PETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_v6rrand.remove();
  
  infoNupp.remove();

  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  l6petamise_tingimus=true;
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
    return temp_summa;
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




function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
