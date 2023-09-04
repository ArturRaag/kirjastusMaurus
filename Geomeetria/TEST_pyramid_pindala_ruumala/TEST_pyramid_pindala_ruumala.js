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
var nurkade_arv = 4; // Ehk hetkel on põhjas kolmnurk, kuna N = n-1



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
regularText.innerHTML = "Vahepealseid vastuseid ümarda samuti 2 kohta pärast koma!<br>Ehk kui leiad silindri põhja ümbermõõdu ja/või pindala, siis ümarda ka see tulemus 2 kohta pärast koma ja kasuta edaspidi arvutustes ümardatud suurust.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ=""
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
  
  MathQuill_v6rrand=select("#answer");
  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+145);
  MathQuill_v6rrand.style(" width: 200px; margin-top: 70px auto; font-size: 24px;");
  

}

function draw() {
  clear();
  background(251,253,255);
  
  katex.render(KaTeX_EQ, katexEquation);

  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60);
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+320);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+350);
  KONTROLL_NUPP.mousePressed(Kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+350);
  RESET_NUPP.mousePressed(Reset);
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+420);
  
  ALISTUMIS_NUPP.mousePressed(Alistun);
  ALISTUMIS_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+267);
  
  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+295);

  sisend_vastus.position(width/asukoha_nr-0,height/asukoha_nr+272);
  
  // ----------------------------------------KOLMNURGA JOONIS
push();
  stroke(0);// Siin saab kujundit nihutada x võrra või y võrra.
  strokeWeight(0.5);
  fill(0,0,200,75)
  translate(-150,-70);
  rotateX(2.8);
  rotateZ(-0.1)
  rotateY(frameCount * 0.01);
  cone(50,120, nurkade_arv);
  radius_node.position(160,300);
pop();
  //----------------------------------------KOLMNURGA JOONIS
  
   if(lopetamise_tingimus==true){
  push();
    stroke(100,180,200);
    strokeWeight(4);
     fov= PI/3;
     cameraZ=(height/2.0)/tan(fov/2.0);
    perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);

    background(15,30,60);
  //   new_step();
  //   orbitControl(4,4,0.01);
  //   rotateY(angle);
  //   rotateZ(angle*0.5);
  //   beginShape(POINTS);
  //   for (i=0;i<=empty_vec.length-1;i++){
  //     vertex(empty_vec[i].x,empty_vec[i].y, empty_vec[i].z);
  //     }
  //     endShape();
  // angle=angle+0.01;
  // camera(0, 0, 300 - sin(frameCount * 0.001) * 200, 0, 0, 0, 0, 1, 0);
  // if (empty_vec.length >=100000){
  //     empty_vec=[];
  //     X=0;
  //     Y=0;
  //     Z=0;
  //   }
  //   pop();
  }
 
}


// See genereerib täisarvu NEGATIIVSEST JA POSITIIVSEST vahemikust. 
// Ehk nt random_int(10), genereerib arvu vahemikust (-10;10).

function random_int(max) {
  return ((Math.random()-0.5)*2)*max;
}


function Ylesanne(){
  
  mudelid=["1","2","3"];
  mudeli_valik=random(mudelid);
  alg_andme_mudelid=["aH","aHr","aHR","aHb","aHm"]; // a - pohja serv, H - pyramiidi korgus, r - pohja siseringjoone raadius, R - pohja v2lisringjoone raadius, b - kylg serv, m - apoteem
  alg_andme_valik=random(alg_andme_mudelid);
  suurused=["S","V"];
  suuruse_valik=random(suurused);
  
  if (mudeli_valik=="1"){ // PÕHI - KOLMNURK
    nurkade_arv = 4;
    pohja_kylg = round_0(Math.random()*50);
    pyramid_korgus = round_0(Math.random()*100);
    
    pohja_ymbermoot = (nurkade_arv-1)*pohja_kylg;
    kolmnurga_korgus = round_2(Math.sqrt( pohja_kylg*pohja_kylg-(pohja_kylg/2)*(pohja_kylg/2) ));
    siseringjoone_raadius=round_2(kolmnurga_korgus/3);
    valisringjoone_raadius=round_2((2*kolmnurga_korgus)/3);
    apoteem_1 = round_2(Math.sqrt(pyramid_korgus*pyramid_korgus+siseringjoone_raadius*siseringjoone_raadius));
    kylg_serv = round_2(Math.sqrt(valisringjoone_raadius*valisringjoone_raadius+pyramid_korgus*pyramid_korgus));
    apoteem_2 = round_2(Math.sqrt(kylg_serv*kylg_serv-(pohja_kylg/2)*(pohja_kylg/2)));
    
    kylje_pindala_1 = round_2((apoteem_1*pohja_kylg/2))*(nurkade_arv-1);
    kylje_pindala_2 = round_2((apoteem_2*pohja_kylg/2))*(nurkade_arv-1);

    yhe_pohja_pindala = round_2(kolmnurga_korgus*pohja_kylg/2);
    kogu_pohja_pindala = yhe_pohja_pindala;
    tais_pindala_1 = round_2(kogu_pohja_pindala+kylje_pindala_1);
    tais_pindala_2 = round_2(kogu_pohja_pindala+kylje_pindala_2);
    ruumala = round_2((yhe_pohja_pindala * pyramid_korgus)/3);

    console.log("andmed: ", kolmnurga_korgus,siseringjoone_raadius,valisringjoone_raadius,apoteem_1,kylg_serv,apoteem_2);
    console.log("St1, St2, V, Sp: ", tais_pindala_1,tais_pindala_2, ruumala, kogu_pohja_pindala);
   if (alg_andme_valik==="aH"){
     if (suuruse_valik=="S"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
       vastused=[tais_pindala_1,tais_pindala_2];
       katex.render("S = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      } else if (suuruse_valik=="V"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
       vastused=[ruumala];
       katex.render("V = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      }
   } else if (alg_andme_valik==="aHr"){
     if (suuruse_valik=="S"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja siseringjoone raadius r = "+str(siseringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
       vastused=[tais_pindala_1,tais_pindala_2];
       katex.render("S = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      } else if (suuruse_valik=="V"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja siseringjoone raadius r = "+str(siseringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
       vastused=[ruumala];
       katex.render("V = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      }
   } else if (alg_andme_valik==="aHR"){
     if (suuruse_valik=="S"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja välisringjoone raadius R = "+str(valisringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
       vastused=[tais_pindala_1,tais_pindala_2];
       katex.render("S = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      } else if (suuruse_valik=="V"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja välisringjoone raadius r = "+str(valisringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
       vastused=[ruumala];
       katex.render("V = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      }
   } else if (alg_andme_valik==="aHb"){
     if (suuruse_valik=="S"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi külgserv b = "+str(kylg_serv)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
       vastused=[tais_pindala_1,tais_pindala_2];
       katex.render("S = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      } else if (suuruse_valik=="V"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi külgserv b = "+str(kylg_serv)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
       vastused=[ruumala];
       katex.render("V = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      }
   } else if (alg_andme_valik==="aHm"){
     if (suuruse_valik=="S"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi apoteem m = "+str(apoteem_1)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
       vastused=[tais_pindala_1,tais_pindala_2];
       katex.render("S = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      } else if (suuruse_valik=="V"){
       yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi apoteem m = "+str(apoteem_1)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
       vastused=[ruumala];
       katex.render("V = ",sisend_vastus.elt);
       radius_node.html("a = "+str(pohja_kylg));
       korgus_node.html("H = "+str(pyramid_korgus));
       diagonal_1_node.html("");
       diagonal_2_node.html("");
      }
   }
 } else if (mudeli_valik=="2"){ // PÕHI - RUUT
  nurkade_arv = 5;
  pohja_kylg = round_0(Math.random()*50);
  pyramid_korgus = round_0(Math.random()*100);
  
  pohja_ymbermoot = (nurkade_arv-1)*pohja_kylg;
  siseringjoone_raadius=round_2(pohja_kylg/2);
  diagonaal = round_2(Math.sqrt(pohja_kylg*pohja_kylg+pohja_kylg*pohja_kylg));
  valisringjoone_raadius=round_2(diagonaal/2);
  apoteem_1 = round_2(Math.sqrt(pyramid_korgus*pyramid_korgus+siseringjoone_raadius*siseringjoone_raadius));
  kylg_serv = round_2(Math.sqrt(valisringjoone_raadius*valisringjoone_raadius+pyramid_korgus*pyramid_korgus));
  apoteem_2 = round_2(Math.sqrt(kylg_serv*kylg_serv-(pohja_kylg/2)*(pohja_kylg/2)));
  
  kylje_pindala_1 = round_2((apoteem_1*pohja_kylg/2))*(nurkade_arv-1);
  kylje_pindala_2 = round_2((apoteem_2*pohja_kylg/2))*(nurkade_arv-1);

  yhe_pohja_pindala = round_2(pohja_kylg*pohja_kylg);
  kogu_pohja_pindala = yhe_pohja_pindala;
  tais_pindala_1 = round_2(kogu_pohja_pindala+kylje_pindala_1);
  tais_pindala_2 = round_2(kogu_pohja_pindala+kylje_pindala_2);
  ruumala = round_2((yhe_pohja_pindala * pyramid_korgus)/3);

  console.log("andmed: ",siseringjoone_raadius,valisringjoone_raadius,apoteem_1,kylg_serv,apoteem_2);
  console.log("St1, St2, V, Sp: ", tais_pindala_1,tais_pindala_2, ruumala, kogu_pohja_pindala);
 if (alg_andme_valik==="aH"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHr"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja siseringjoone raadius r = "+str(siseringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja siseringjoone raadius r = "+str(siseringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHR"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja välisringjoone raadius R = "+str(valisringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", põhja välisringjoone raadius r = "+str(valisringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHb"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi külgserv b = "+str(kylg_serv)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi külgserv b = "+str(kylg_serv)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHm"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi apoteem m = "+str(apoteem_1)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidi põhiserv on a = " +str(pohja_kylg)+", püramiidi apoteem m = "+str(apoteem_1)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 }
} else if (mudeli_valik=="3"){ // PÕHI - Hulknurk (korrapärane)
  nurkade_arv = (Math.floor(Math.random() * 5) + 6) // Arv vahemikust 6-10. Nurkade arv on tegelikult (nurkade_arv-1)
  pohja_kylg = round_0(Math.random()*50);
  pyramid_korgus = round_0(Math.random()*100);

  pohja_ymbermoot = (nurkade_arv-1)*pohja_kylg;
  siseringjoone_raadius = round_2(Math.sqrt( pohja_kylg*pohja_kylg-round_2(pohja_kylg/2)*round_2(pohja_kylg/2) ));
  valisringjoone_raadius=round_2(pohja_kylg);
  apoteem_1 = round_2(Math.sqrt(pyramid_korgus*pyramid_korgus+siseringjoone_raadius*siseringjoone_raadius));
  kylg_serv = round_2(Math.sqrt(valisringjoone_raadius*valisringjoone_raadius+pyramid_korgus*pyramid_korgus));
  apoteem_2 = round_2(Math.sqrt(kylg_serv*kylg_serv-(pohja_kylg/2)*(pohja_kylg/2)));
  
  kylje_pindala_1 = round_2(round_2((apoteem_1*pohja_kylg)/2)*(nurkade_arv));
  kylje_pindala_2 = round_2(round_2((apoteem_2*pohja_kylg)/2)*(nurkade_arv));

  yhe_kolmnurga_osa_pindala=round_2((siseringjoone_raadius*pohja_kylg)/2);
  yhe_pohja_pindala = round_2((yhe_kolmnurga_osa_pindala)*(nurkade_arv));
  kogu_pohja_pindala = yhe_pohja_pindala;
  tais_pindala_1 = round_2(kogu_pohja_pindala+kylje_pindala_1);
  tais_pindala_2 = round_2(kogu_pohja_pindala+kylje_pindala_2);
  ruumala = round_2((yhe_pohja_pindala * pyramid_korgus)/3);

  console.log("andmed: ",nurkade_arv,siseringjoone_raadius,valisringjoone_raadius,apoteem_1,apoteem_2,kylg_serv,yhe_kolmnurga_osa_pindala,"n,r, R, m1,m2,b,S_kolmnurk");
  console.log("Sk1, Sk2, Sp, St1, St2, V : ",kylje_pindala_1,kylje_pindala_2,kogu_pohja_pindala, tais_pindala_1,tais_pindala_2, ruumala);
 if (alg_andme_valik==="aH"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHr"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", põhja siseringjoone raadius r = "+str(siseringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", põhja siseringjoone raadius r = "+str(siseringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHR"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", põhja välisringjoone raadius R = "+str(valisringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", põhja välisringjoone raadius r = "+str(valisringjoone_raadius)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHb"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", püramiidi külgserv b = "+str(kylg_serv)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", püramiidi külgserv b = "+str(kylg_serv)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
 } else if (alg_andme_valik==="aHm"){
   if (suuruse_valik=="S"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", püramiidi apoteem m = "+str(apoteem_1)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi täispindala St.");
     vastused=[tais_pindala_1,tais_pindala_2];
     katex.render("S = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    } else if (suuruse_valik=="V"){
     yl_text.html("Püramiidil on "+str(nurkade_arv)+" põhiserva. Iga põhiserva pikkus on a = " +str(pohja_kylg)+", püramiidi apoteem m = "+str(apoteem_1)+" ning püramiidi kõrgus H = "+str(pyramid_korgus)+". Leia püramiidi ruumala V.");
     vastused=[ruumala];
     katex.render("V = ",sisend_vastus.elt);
     radius_node.html("a = "+str(pohja_kylg));
     korgus_node.html("H = "+str(pyramid_korgus));
     diagonal_1_node.html("");
     diagonal_2_node.html("");
    }
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
  
  
  radius_node=createP("r");
  radius_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  radius_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
    
  korgus_node=createP("H");
  korgus_node.position(width/asukoha_nr+155,height/asukoha_nr+145);
  korgus_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  diagonal_1_node=createP("c");
  diagonal_1_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  diagonal_1_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  diagonal_2_node=createP("c");
  diagonal_2_node.position(width/asukoha_nr+155,height/asukoha_nr+65);
  diagonal_2_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  
}

function Kontroll(){
  
  sisu_1=str(document.getElementById("lihtsam").textContent);
  console.log(sisu_1, vastused)

for (i=0; i<vastused.length;i++){
  if (sisu_1==vastused[i]){
    vastused_korras=true;
    break
  } else {
    vastused_korras=false;
  }
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
  ALISTUMIS_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+310);

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

function Alistun() {
  tulemus.html("");
  console.log(vastused)
  tulemus.style("color: black")
  tulemus.html("Sobivad vastused olid: "+str(vastused));
  KONTROLL_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
}

function Lopp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
  
  tex_vorrand.remove();
  yl_text.remove();
  tulemus.remove();
  radius_node.remove();
  korgus_node.remove();
  diagonal_1_node.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  ALISTUMIS_NUPP.remove();
  sisend_vastus.remove();
  MathQuill_v6rrand.remove();
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


