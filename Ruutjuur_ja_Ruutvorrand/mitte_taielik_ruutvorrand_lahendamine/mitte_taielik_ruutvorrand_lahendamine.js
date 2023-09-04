var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

var alt_vastused1=[];
var alt_vastused2=[];

var vastused_korras=false;

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

var answerSpan2 = document.getElementById('answer2');
answerSpan2.style.backgroundColor="white"
var latexSpan2 = document.getElementById('lihtsam2');
var latexTEXT2 = document.getElementById('latex2');
var answerMathField2 = MQ.MathField(answerSpan2, {
                handlers: {
                edit: function() {
                    var enteredMath2 = answerMathField2.latex();
                    latexSpan2.textContent = answerMathField2.text()// Get entered math in LaTeX format   
                    latexTEXT2.textContent=answerMathField2.latex();
                }
                }
            });

// ----------------------------------------- MATHQUILL KRAAM-----------------------------------------



// ----------------------------------------- HTML ToolTip -------------------------------------------

var tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.95)"
tooltip.style.color = "white";
tooltip.style.borderRadius="25px";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="540px"
document.body.appendChild(tooltip);

var regularText = document.createElement("div");
regularText.innerHTML = "Vastuseid saab sisestada täisarvudena, lõplike kümnendmurdudena (3 komakohta max) ning harilike murdudena. Murrujoone sisestamiseks kasuta / (kaldkriips) sümbolit. Segaarvu asemel sisesta liigmurd.<br><br>";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ="\\text{Näiteks kui soovid kirjutada murdu } \\dfrac{a}{b} \\text{ siis tuleb trükkida a/b}."
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
  
  canvas=createCanvas(windowWidth,580,WEBGL);
  write_texts();
  Reset();
  
  stroke(100,180,200);
  strokeWeight(4);
  let fov= PI/3;
  let cameraZ=(height/2.0)/tan(fov/2.0);
  perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
  
  
  MathQuill_v6rrand=select("#answer");
  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+145);
  MathQuill_v6rrand.style(" width: 40%; margin-top: 70px auto; font-size: 24px;");
  
  MathQuill_v6rrand2=select("#answer2");
  MathQuill_v6rrand2.position(width/asukoha_nr+60,height/asukoha_nr+195);
  MathQuill_v6rrand2.style(" width: 40%; margin-top: 70px auto; font-size: 24px;");
}

function draw() {
  clear();
  background(251,253,255);
  
  katex.render(KaTeX_EQ, katexEquation);

  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+270);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+350);
  KONTROLL_NUPP.mousePressed(Kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+350);
  RESET_NUPP.mousePressed(Reset);
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+420);
  
  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+145);
  MathQuill_v6rrand2.position(width/asukoha_nr+60,height/asukoha_nr+215);
  
  x1_text.position(width/asukoha_nr-0,height/asukoha_nr+122);
  x2_text.position(width/asukoha_nr-0,height/asukoha_nr+192);
  
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

function funk(x,a,b,c){
  return a*x*x+b*x+c
}

function nullkohad(a,b,c){
    x1=(-b+Math.sqrt(b*b-4*a*c))/(2*a);
    x2=(-b-Math.sqrt(b*b-4*a*c))/(2*a);
    return [x1, x2]
}

// See genereerib täisarvu NEGATIIVSEST JA POSITIIVSEST vahemikust. 
// Ehk nt random_int(10), genereerib arvu vahemikust (-10;10).

function random_int(max) {
  return ((Math.random()-0.5)*2)*max;
}


function Ylesanne(){
  
    alt_vastused1=[];
    alt_vastused2=[];

  mudel=["1","2","3"];
  mudeli_valik=random(mudel);
  
  //######################## Kui c=0.
  if (mudeli_valik==1){
        alt_vastused1=[];
        alt_vastused2=[];
        a=0;
        b=0;
        c=0;
        while (a==0 || b==0 || c==0 ){
          a=int(random_int(10));
          b=int(random_int(10));
          c=int(random_int(10));
        }
        // siin on ax(bx+c)
        X1=0;
        alt_vastused1.push(str(X1));
        for (i=15; i>0; i--){
          if (c%i==0 && b%i==0){
            c=c/i;
            b=b/i;
          }
        }
    
    X2=-c/b; // ############################################## UURI KUIDAS MURRULISTE VASTUSTE PUHUL TOIME TULLA
    
        if (Number.isInteger(X2)==true){
          alt_vastused2.push(str(X2))
        } else {
          if (str(X2).split(".")[1].length<=3){ 
            alt_vastused2.push(str(X2));
          } 
        }
    
   //MURRU KUJU ON SIIN LEITAV
   X2="("+str(abs(c))+")/("+str(abs(b))+")";
   if (a*c<0 || a*b<0 ){
        X2=str(X2);
    }
    if ((a*c<0 && a*b<0) || (a*c>=0 && a*b>=0)){
        X2="-"+str(X2);
    }
        alt_vastused2.push(str(X2));
    
    
    //LIIKMETE LOOMINE, MIDA DISPLAY'IB EKRAANIL.
        if (a*b>=0){
          liige_a="+"+str(a*b)+"x^{2}";
        } else {
          liige_a=str(a*b)+"x^{2}";
        }
        
        if (a*c>=0){
          liige_b="+"+str(a*c)+"x";
        } else {
          liige_b=str(a*c)+"x";
        }
        
        liikmete_massiiv=[liige_a, liige_b];
        segamini=shuffleArray(liikmete_massiiv);
        antav_ylesanne=segamini[0]+segamini[1]+"=0";
        if (antav_ylesanne[0]=="+"){
            antav_ylesanne=antav_ylesanne.substring(1);
        }
    
    
      }
    
    
    
    //######################## Kui b=0.
  if (mudeli_valik==2){
      alt_vastused1=[]
      alt_vastused2=[]
    
        c=0;
        a=1;
        while (c==0  || ( -(mark_C*c*c)/(mark_A)*a*a )<0 || a==0 ){
          mark_A=Math.round(Math.random())*2-1;
          mark_C=Math.round(Math.random())*2-1;
          a=int(random_int(10));
          while (a==0){
             a=int(random_int(10));
          }
          c=int(random_int(10))
        }
        X1=-1*Math.sqrt(-1*(mark_C*c*c)/(mark_A*a*a));
        X2=1*Math.sqrt(-1*(mark_C*c*c)/(mark_A*a*a)); // ############################################## UURI KUIDAS MURRULISTE VASTUSTE PUHUL TOIME TULLA
        
        if (Number.isInteger(X1)==true){
          alt_vastused1.push(str(X1));
        } else {
          if (str(X1).split(".")[1].length<=3){
            alt_vastused1.push(str(X1));
          }
        }
          
        if (Number.isInteger(X2)==true){
          alt_vastused2.push(str(X2));
        } else {
          if (str(X2).split(".")[1].length<=3){
            alt_vastused2.push(str(X2));
          }  
        }
    
    //taandame
        for (i=10; i>0; i--){
          if (a%i==0 && c%i==0){
            a=a/i;
            c=c/i;
          }
        }
    
        X2="("+str(abs(c))+")/("+str(abs(a))+")";
        X1="-"+X2;
        alt_vastused1.push(str(X1));
        alt_vastused2.push(str(X2));
           
        
        if (mark_A==1){
          liige_a="+"+str(a*a)+"x^{2}";
        } else if (mark_A==-1) {
          liige_a="-"+str(a*a)+"x^{2}";
        }
        
        if (mark_C==1){
          liige_c="+"+str(c*c);
        } else if (mark_C==-1){
          liige_c="-"+str(c*c);
        }
        
        liikmete_massiiv=[liige_a, liige_c];
        segamini=shuffleArray(liikmete_massiiv);
        antav_ylesanne=segamini[0]+segamini[1]+"=0";
        if (antav_ylesanne[0]=="+"){
            antav_ylesanne=antav_ylesanne.substring(1);
        }
      }

       //######################## Kui b=0 ja c=0.
  if (mudeli_valik==3){
    
      a=int(random_int(25));
      antav_ylesanne=str(a)+"x^{2}=0";
      
      X1=0;
      X2=0;
      
      alt_vastused1.push(str(X1));
      alt_vastused2.push(str(X2));
      }
      
   katex.render( antav_ylesanne, tex_vorrand.elt);
   yl_text.html("Leia ruutvõrrandi lahendid.");
   katex.render("x_{1}=",x1_text.elt);
   katex.render("x_{2}=",x2_text.elt);
    
  // Strip alt_vastused. Ehk eemaldame sulud.
  stripped_alt1=[]
  for (i=0; i<= alt_vastused1.length-1 ; i++){
    stripped_alt1.push(alt_vastused1[i].replace(/([()])/g, ''));
  }
  
  stripped_alt2=[]
  for (i=0; i<= alt_vastused2.length-1 ; i++){
    stripped_alt2.push(alt_vastused2[i].replace(/([()])/g, ''));
  }
  
  // Lisame tühikud alt vastuste järele, et tekst oleks loetavam.
  for (i=0; i<=stripped_alt1.length-1; i++){
    stripped_alt1[i]=" "+stripped_alt1[i];
  }
  
  for (i=0; i<=stripped_alt2.length-1; i++){
    stripped_alt2[i]=" "+stripped_alt2[i];
  }
  
}


function write_texts(){
  
  tex_vorrand=createP("");
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto'; font-weight: bold; sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  x1_text=createP("");
  x2_text=createP("");
  x1_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  x2_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
}

function Kontroll(){
  
  sisu_1=str(document.getElementById("lihtsam").textContent);
  sisu_2=str(document.getElementById("lihtsam2").textContent);
  console.log(sisu_1, sisu_2)
  console.log(alt_vastused1);
  console.log(alt_vastused2);
  
    for (i=0; i<=alt_vastused1.length-1; i++){
            if (vastused_korras==true){
                console.log("korras!")
                break
            }
        for (j=0; j<=alt_vastused2.length-1; j++){
            if ( (sisu_1==alt_vastused1[i] && sisu_2==alt_vastused2[j]) || (sisu_2==alt_vastused1[i] && sisu_1==alt_vastused2[j]) ) {
                vastused_korras=true;
                break
            } else {
                vastused_korras=false
            }
    }
  }

  
  //------------------------------------------------------------------------

        if (sisu_1=="" || sisu_2==""){
          tulemus.html("Vastus on tühi!");
          tulemus.style("color","orange");
        }  else if ( vastused_korras==true ) {
          //katex.render("Korras! Õiged vastused olid ka: ", tulemus.elt)
          tulemus.html("Korras! Kõik võimalikud sobivad vastused olid: <br>X"+"1".sub()+": "+str(stripped_alt1)+"<br>X"+"2".sub()+": "+str(stripped_alt2));
          tulemus.style("color","green");
          oige_vastus=oige_vastus+1;
          KONTROLL_NUPP.attribute("disabled","");
          vastused_korras=true;
        } else {
          tulemus.html("Midagi on valesti!");
          tulemus.style("color","red");
        }
}


function Reset(){
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
  }
  
  answerMathField.focus();
  answerMathField.latex("");
  answerMathField2.focus();
  answerMathField2.latex("");
  
  vastused_korras=false;
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
  x1_text.remove();
  x2_text.remove();
  MathQuill_v6rrand.remove();
  MathQuill_v6rrand2.remove();
  tooltip.remove();
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
  
  
function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
   
       // Generate random number
       var j = Math.floor(Math.random() * (i + 1));
                   
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }
       
   return array;
}
