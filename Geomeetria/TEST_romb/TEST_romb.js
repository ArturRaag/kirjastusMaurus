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



window.onload = function() {
  // ----------------------------------------- HTML ToolTip ------------------------------------------

tooltip = document.createElement("div");
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

regularText = document.createElement("div");
regularText.innerHTML = "Vastuseid saab sisestada täisarvudena, lõplike kümnendmurdudena (3 komakohta max) ning harilike murdudena. Murrujoone sisestamiseks kasuta / (kaldkriips) sümbolit. Segaarvu asemel sisesta liigmurd.<br><br>";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ="\\text{Näiteks kui soovid kirjutada murdu } \\dfrac{a}{b} \\text{ siis tuleb trükkida a/b}."
katexEquation = document.createElement("div");
tooltip.appendChild(katexEquation);


// Info nuppu funktsionaalsus
infoNupp = document.createElement("button");
infoNupp.innerHTML = "i";
infoNupp.style.position = "absolute";
infoNupp.style.margin="20px";
infoNupp.style.top="12px";
infoNupp.style.left="5px";
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
  
};


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



function setup() {
  
  canvas=createCanvas(600,580,WEBGL);
  write_texts();
  Reset();
  
  stroke(100,180,200);
  strokeWeight(4);
  let fov= PI/3;
  let cameraZ=(height/2.0)/tan(fov/2.0);
  perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
  
  
  MathQuill_v6rrand=select("#answer");
  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+145);
  MathQuill_v6rrand.style(" width: 200px; margin-top: 70px auto; font-size: 24px;");
  
  MathQuill_v6rrand2=select("#answer2");
  MathQuill_v6rrand2.position(width/asukoha_nr+60,height/asukoha_nr+195);
  MathQuill_v6rrand2.style(" width: 200px; margin-top: 70px auto; font-size: 24px;");
}

function draw() {
  clear();
  background(251,253,255);
  
  katex.render(KaTeX_EQ, katexEquation);

  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60);
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+270);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+350);
  KONTROLL_NUPP.mousePressed(Kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+350);
  RESET_NUPP.mousePressed(Reset);
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+420);
  
  ALISTUMIS_NUPP.mousePressed(Alistun);

  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+245);
  MathQuill_v6rrand2.position(width/asukoha_nr+60,height/asukoha_nr+315);
  
  sisend_vastus.position(width/asukoha_nr-0,height/asukoha_nr+222);
  
  // ----------------------------------------KOLMNURGA JOONIS
  push();
  stroke(0);
  strokeWeight(2);
  noFill();// Siin saab kujundit nihutada x võrra või y võrra.
  beginShape();
    vertex(-300/1.5,-220/1.5);
    vertex(-170/1.5,-220/1.5);
    vertex(-120/1.5,-100/1.5);
    vertex(-250/1.5,-100/1.5);
  endShape(CLOSE);
  alus_node.position(160,230);
  diagonal_1_node.position(200,130);
  diagonal_2_node.position(230,210);
  pop();

  push();
  beginShape();
  stroke(125);
  strokeWeight(1);
    vertex(-300/1.5,-220/1.5);
    vertex(-120/1.5,-100/1.5);
    vertex(-170/1.5,-220/1.5);
    vertex(-250/1.5,-100/1.5);
    vertex(-250/1.5,-220/1.5);
  endShape();
  pop();

  push();
  beginShape();
  stroke(0,0,255);
  strokeWeight(3);
    vertex(-250/1.5,-100/1.5);
    vertex(-250/1.5,-220/1.5);
    korgus_node.position(140,180);
  endShape();
  pop();

  
  //----------------------------------------KOLMNURGA JOONIS
  
   if(lopetamise_tingimus==true){
    background(15,30,60);
  }
}


// See genereerib täisarvu NEGATIIVSEST JA POSITIIVSEST vahemikust. 
// Ehk nt random_int(10), genereerib arvu vahemikust (-10;10).

function random_int(max) {
  return ((Math.random()-0.5)*2)*max;
}


function Ylesanne(){
  
  mudelid=["1","1","1","1","2"];
  mudeli_valik=random(mudelid);
  
  if (mudeli_valik=="1"){
     romb_alus = round_0(Math.random()*100);
     romb_korgus = round_0(Math.random()*100);
     pindala = (romb_alus*romb_korgus);
     perimeeter = 4*romb_alus
     suurused=["a","h","S1","S2","P"];
     suuruse_valik=random(suurused);
     if (suuruse_valik=="S1"){
      yl_text.html("Leia rombi pindala S, kui rombi alus a on a = "+str(romb_alus)+" ning rombi kõrgus h on h = "+str(romb_korgus)+".");
      vastus=pindala;
      katex.render("S = ",sisend_vastus.elt);
      alus_node.html("a = "+str(romb_alus));
      korgus_node.html("h = "+str(romb_korgus));
      diagonal_1_node.html("");
      diagonal_2_node.html("");
     } else if (suuruse_valik=="a"){
      yl_text.html("Leia rombi alus a, kui rombi pindala S on S = "+str(pindala)+" ning rombi kõrgus h on h = "+str(romb_korgus)+".");
      vastus=romb_alus;
      katex.render("a = ",sisend_vastus.elt);
      alus_node.html("a = ?");
      korgus_node.html("h = "+str(romb_korgus));
      diagonal_1_node.html("");
      diagonal_2_node.html("");
     } else if (suuruse_valik=="h"){
      yl_text.html("Leia rombi kõrgus h, kui rombi pindala S on S = "+str(pindala)+" ning rombi alus a on a = "+str(romb_alus)+".");
      vastus=romb_korgus;
      katex.render("h = ",sisend_vastus.elt);
      alus_node.html("a = "+str(romb_alus));
      korgus_node.html("h = ?");
      diagonal_1_node.html("");
      diagonal_2_node.html("");
     } else if (suuruse_valik=="P"){
      yl_text.html("Leia rombi ümbermõõt P, kui rombi pindala S on S = "+str(pindala)+" ning rombi kõrgus h on h = "+str(romb_korgus)+".");
      vastus=perimeeter;
      katex.render("P = ",sisend_vastus.elt);
      alus_node.html("");
      korgus_node.html("h = "+str(romb_korgus));
      diagonal_1_node.html("");
      diagonal_2_node.html("");
     } else if (suuruse_valik=="S2"){
      yl_text.html("Leia rombi pindala S, kui rombi ümbermõõt P on P = "+str(perimeeter)+" ning rombi kõrgus h on h = "+str(romb_korgus)+".");
      vastus=pindala;
      katex.render("S = ",sisend_vastus.elt);
      alus_node.html("");
      korgus_node.html("h = "+str(romb_korgus));
      diagonal_1_node.html("");
      diagonal_2_node.html("");
     }
  }
  
    if (mudeli_valik=="2"){
      romb_d1 = round_0(Math.random()*100);
      romb_d2 = round_0(Math.random()*100);
      pindala = (romb_d1*romb_d2)/2;
      suurused=["a","h","S1","S2","P"];
      suuruse_valik=random(suurused);

      suurused=["S","d"];
      suuruse_valik=random(suurused);
      if (suuruse_valik=="S"){
        yl_text.html("Leia rombi pindala S, kui rombi esimene diagonaal d1 on d1 = "+str(romb_d1)+" ning teine diagonaal d2 on d2 = "+str(romb_d2)+".");
        vastus=pindala;
        katex.render("S = ",sisend_vastus.elt);
        alus_node.html("");
        korgus_node.html("");
        diagonal_1_node.html("d1 = "+str(romb_d1));
        diagonal_2_node.html("d2 = "+str(romb_d2));
       } else if (suuruse_valik=="d"){
        yl_text.html("Leia rombi puudu olev diagonaal d1, kui rombi pindala S on S = "+str(pindala)+" ning rombi teine diagonaal d2 on d2 = "+str(romb_d2)+".");
        vastus=romb_d1;
        katex.render("d1 = ",sisend_vastus.elt);
        alus_node.html("");
        korgus_node.html("");
        diagonal_1_node.html("d1 = ?");
        diagonal_2_node.html("d2 = "+str(romb_d2));
       }

  }
  
  
  
}


function write_texts(){
  
  tex_vorrand=createP("");
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto'; font-weight: bold; sans-serif;line-height: 140%; font-size: 1.25rem; maxWidth: 500px");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  sisend_vastus=createP("");
  sisend_vastus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  
  
  alus_node=createP("a");
  alus_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  alus_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
    
  korgus_node=createP("b");
  korgus_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  korgus_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  diagonal_1_node=createP("c");
  diagonal_1_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  diagonal_1_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  diagonal_2_node=createP("c");
  diagonal_2_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  diagonal_2_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  
}




function Alistun() {
  tulemus.html("");
  console.log(vastus)
  tulemus.style("color: black")
  tulemus.html("Sobivad vastused olid: "+str(vastus));
  KONTROLL_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
}









function Kontroll(){
  
  sisu_1=str(document.getElementById("lihtsam").textContent);
  console.log(sisu_1, vastus)
if (sisu_1==vastus){
  vastused_korras=true;
} else {
  vastused_korras=false;
}

  //------------------------------------------------------------------------

        if (sisu_1==""){
          tulemus.html("Vastus on tühi!");
          tulemus.style("color","orange");
        }  else if ( vastused_korras==true ) {
          //katex.render("Korras! Õiged vastused olid ka: ", tulemus.elt)
          tulemus.html("Korras!");
          tulemus.style("color","green");
          oige_vastus=oige_vastus+1;
          KONTROLL_NUPP.attribute("disabled","");
          ALISTUMIS_NUPP.attribute("disabled","");
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
    ALISTUMIS_NUPP.remove();
  }
  
  answerMathField.focus();
  answerMathField.latex("");
  
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

  ALISTUMIS_NUPP=createButton("Näita lahendust");
  ALISTUMIS_NUPP.style('padding','5px 10px');
  ALISTUMIS_NUPP.style('background-color','rgb(255,255,255)');
  ALISTUMIS_NUPP.style('color','black');
  ALISTUMIS_NUPP.style('border-radius','0px');
  ALISTUMIS_NUPP.style('border-width','1px');
  ALISTUMIS_NUPP.style('font-weight','bold');
  ALISTUMIS_NUPP.style('margin-top','30px');
  ALISTUMIS_NUPP.style('margin-left','80px');
  ALISTUMIS_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+217);

  KONTROLL_NUPP.mouseOver(function() {
    KONTROLL_NUPP.style('background-color', 'rgba(25, 25, 112, 0.75)');
  });
  
  KONTROLL_NUPP.mouseOut(function() {
    KONTROLL_NUPP.style('background-color', 'rgb(25, 25, 112)');
  });
    
  RESET_NUPP.mouseOver(function() {
        RESET_NUPP.style('background-color','rgba(80,139,195,0.75)');
  });
  
  RESET_NUPP.mouseOut(function() {
      RESET_NUPP.style('background-color','#508bc3');
  });
    
  LOPETA_NUPP.mouseOver(function() {
    LOPETA_NUPP.style('background-color',	"rgba(176,196,222,0.75)");
  });
  
  LOPETA_NUPP.mouseOut(function() {
    LOPETA_NUPP.style('background-color','rgb(176,196,222)');
  });

  ALISTUMIS_NUPP.mouseOver(function() {
    ALISTUMIS_NUPP.style('background-color',	"rgba(25, 25, 112, 0.75)");
    ALISTUMIS_NUPP.style('color','white');
  });
  
  ALISTUMIS_NUPP.mouseOut(function() {
    ALISTUMIS_NUPP.style('background-color','rgb(255,255,255)');
      ALISTUMIS_NUPP.style('color','black');
  });

  ylesannete_loendur=ylesannete_loendur+1;

}



function Lopp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
  
  tex_vorrand.remove();
  yl_text.remove();
  tulemus.remove();
  alus_node.remove();
  korgus_node.remove();
  diagonal_1_node.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  ALISTUMIS_NUPP.remove();

  sisend_vastus.remove();
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


// // for end screen
// empty_vec=[]
// function new_step(){
  
//     direction=random(["up","down","left","right","forward","back"]);
//     if (direction=="up"){
//       X=X+step;
//     } else if (direction == "down"){
//       X=X-step;
//     } else if (direction=="left"){
//       Y=Y-step;
//     } else if (direction=="right"){
//       Y=Y+step;
//     } else if (direction=="forward"){
//       Z=Z+step;
//     } else if (direction=="back"){
//       Z=Z-step;
//     }
//   vek=createVector(X,Y,Z);
//   empty_vec.push(vek);
// }
  
  
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


