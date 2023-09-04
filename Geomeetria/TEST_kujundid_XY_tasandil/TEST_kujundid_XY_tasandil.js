var mullid = [];
var mullid_intersect=[];
var symbols =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var max_punktide_arv_joonisel=symbols.length;


var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;
var graafiku_all_olev_ruum=300;
var punkti_raadius = 7;
var joonis_korras=false;
var ylesannete_loendur=0;
var lopetamise_tingimus=false;
var ALISTU_graafik=false;
var num_vastus_oige=false;
var oige_vastus=0;
// ----------------------------------------- HTML ToolTip -------------------------------------------
window.onload = function() {

tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.85)"
tooltip.style.color = "white";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="400px";
tooltip.style.borderRadius="25px"
document.body.appendChild(tooltip);

regularText = document.createElement("div");
regularText.innerHTML = "Punkte graafikule saab märkida hiireklõpsuga.<br>Pindala või ümbermõõdu vastust sisestades sisesta ainult dimensioonita number (ühikut vaja ei ole)!<br><br>Testi eest saab +1 punkti kui vastus on õige ning joonis on edukalt loodud.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ=''
katexEquation = document.createElement("div");
tooltip.appendChild(katexEquation);


// Info nuppu funktsionaalsus
infoNupp = document.createElement("button");
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
infoNupp.style.top="505px";
infoNupp.style.left="430px"
document.body.appendChild(infoNupp);

infoNupp.addEventListener("mouseenter", function() {
  tooltip.style.left = (infoNupp.offsetLeft-420) + "px";
  tooltip.style.top = (infoNupp.offsetTop-350 ) + "px";
  infoNupp.style.background="rgb(224,222,222)"
  tooltip.style.display = "block";
});

infoNupp.addEventListener("mouseleave", function() {
  tooltip.style.display = "none";
  infoNupp.style.background="transparent"
});

}
  
// ----------------------------------------- HTML ToolTip -------------------------------------------
  


// // ----------------------------------------- MATHQUILL KRAAM-----------------------------------------
// var MQ = MathQuill.getInterface(2);
// var answerSpan = document.getElementById('answer');
// answerSpan.style.backgroundColor="white";
// answerSpan.style.width="10px"
// var latexSpan = document.getElementById('lihtsam');
// var latexTEXT = document.getElementById('latex');
// var answerMathField = MQ.MathField(answerSpan, {
//                 handlers: {
//                 edit: function() {
//                     var enteredMath = answerMathField.latex();
//                     latexSpan.textContent = answerMathField.text()// Get entered math in LaTeX format   
//                     latexTEXT.textContent=answerMathField.latex();
//                 }
//                 }
//             });

// // ----------------------------------------- MATHQUILL KRAAM-----------------------------------------




class Bubble {
  constructor (tempX,tempY,tempR){
    this.x = round_0(tempX/((width/jaotiste_arv)/2))*((width/jaotiste_arv)/2);
    this.y = round_0(tempY/((width/jaotiste_arv)/2))*((width/jaotiste_arv)/2);
    this.r = punkti_raadius;
  }
  
  reveal() {
    push();
    strokeWeight(1);
    stroke(0);
    fill(116,117,255,200);
    ellipse(this.x, this.y, this.r,this.r);
    pop();
  }
}




function setup() {
  createCanvas(500, 500+graafiku_all_olev_ruum);
  Write_texts();
  Reset();
}

function draw() {
  clear();
  background(255);
  XYplane(jaotiste_arv, 0.25, 1.25);
  for (i=0; i<mullid.length; i++){
   mullid[i].reveal();
   push();
   stroke(255);
   strokeWeight(3);
   text(symbols[i],mullid[i].x+5,mullid[i].y+10)
   pop();
  }
  mouse_Hover();
  
  KONTROLL_NUPP.mousePressed(Kontroll);
  JOONIS_TYHJAKS_NUPP.mousePressed(Joonis_tyhjaks);
  RESET_NUPP.mousePressed(Reset);
  LOPETA_NUPP.mousePressed(Lopp);
  ALISTUMIS_NUPP.mousePressed(Alistun)
  if (joonis_korras==true){
      graafiku_joonis();
  }
  
  if (ALISTU_graafik==true){
    ALISTU_graafiku_joonis();
  }
  
  
  if(lopetamise_tingimus==true){
    
    push();
    fill(22, 56, 50);
    rect(0,0,width,height);
    pop();
    
    push();
    fill(48, 25, 52);
    strokeWeight(0);
    circle(width,0,mouseY*2);
    pop();
    
    push();
    fill(220, 120, 52);
    strokeWeight(0);
    circle(0,height, mouseY-70);
    pop();
    
    push();
    fill(22,56,50);
    strokeWeight(0);
    circle(width,0,mouseX)
    pop();
  }

}

function mousePressed(){
  
  if (mouseX>=0 && mouseX<=width && mouseY<=height-graafiku_all_olev_ruum && mouseY>=0){
  let intersect=false;
  
  let kasutajaX=mouseX;
  let kasutajaY=mouseY;
  
  let mull = new Bubble(mouseX,mouseY,5);
  
  if (mullid.length<1){
    mullid.push(mull)
  } else if (mullid.length>=1 && mullid.length<max_punktide_arv_joonisel) {
    for (i=0;i<mullid.length ; i++){
      distance=dist(round_0(kasutajaX/12.5)*12.5,round_0(kasutajaY/12.5)*12.5,mullid[i].x,mullid[i].y);
      if (distance<mull.r/2+mullid[i].r/2){
        mullid_intersect[i]=true;
      } else {
        mullid_intersect[i]=false;
      }
    }
    
    for (i=0; i<mullid.length; i++){
      if (mullid_intersect[i]==true){
        intersect=true
      }
    }
    
    if (intersect==false){
      mullid.push(mull)
    }
  }
  }
}

function XYplane(jaotiste_arv, tausta_jaotise_paksus, telje_jaotiste_paksus) {
  //jaotised Y teljel
  var jaotisY=0;
  var Y_jaotise_vaartus=xmax;
  while (jaotisY <= height-graafiku_all_olev_ruum) {
    strokeWeight(tausta_jaotise_paksus);
    stroke(200);
    line(width*0, jaotisY , width, jaotisY);
    strokeWeight(telje_jaotiste_paksus);
    stroke(0);
    line(width/2-5, jaotisY , width/2+5, jaotisY);
    strokeWeight(0);
    stroke(1);
    text(Y_jaotise_vaartus, width/2+10, jaotisY );
    Y_jaotise_vaartus=Y_jaotise_vaartus-1;
    jaotisY = jaotisY+(height-graafiku_all_olev_ruum)/jaotiste_arv;
  }
  
  //jaotised X teljel
  var jaotisX = 0;
  var X_jaotise_vaartus=xmin;
  while (jaotisX <= width) {
    strokeWeight(tausta_jaotise_paksus);
    stroke(200);
    line(jaotisX, (height-graafiku_all_olev_ruum)*0 , jaotisX, (height-graafiku_all_olev_ruum));
    strokeWeight(telje_jaotiste_paksus);
    stroke(0);
    line(jaotisX, (height-graafiku_all_olev_ruum)/2+5 , jaotisX, (height-graafiku_all_olev_ruum)/2-5);
    strokeWeight(0);
    stroke(0);
    text(X_jaotise_vaartus, jaotisX, (height-graafiku_all_olev_ruum)/2+20);
    X_jaotise_vaartus=X_jaotise_vaartus+1;
    jaotisX = jaotisX+width/jaotiste_arv;
  }
    // ----- X-Y plane -----
  strokeWeight(telje_jaotiste_paksus);
  stroke(0);
    //Y-axis
  line(width/2, (height-graafiku_all_olev_ruum)*0 , width/2 , (height-graafiku_all_olev_ruum));
    //arrow
  line(width/2-5, 0+15, width/2, 0);
  line(width/2+5, 0+15, width/2, 0);
    //X-axis
  line(width*0, (height-graafiku_all_olev_ruum)/2, width, (height-graafiku_all_olev_ruum)/2);
    //arrow
  line(width-15,(height-graafiku_all_olev_ruum)/2-5,width, (height-graafiku_all_olev_ruum)/2);
  line(width-15,(height-graafiku_all_olev_ruum)/2+5,width, (height-graafiku_all_olev_ruum)/2); 
}

function mouse_Hover(){
  
  if (mouseX >=0 && mouseX<= width && mouseY>=0 && mouseY<=height-graafiku_all_olev_ruum){
  hover_X=(round_0(mouseX/12.5)*12.5-250)/25;
  hover_Y=-1*(round_0(mouseY/12.5)*12.5-250)/25;
  push();
  noFill();
  strokeWeight(2);
  stroke(0);
  circle(mouseX, mouseY, punkti_raadius);
  pop();
    
       if ((mouseX<=(width/2)) && (mouseY<=((height-graafiku_all_olev_ruum)/2))){
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX, mouseY, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX+11.5, mouseY+21);
    text("Y: "+hover_Y , mouseX+11.5, mouseY+41);
  } else if ((mouseX<=(width/2)) && (mouseY>=((height-graafiku_all_olev_ruum)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX, mouseY-60, 55, 55, 15);
    fill(0);
    text("X: "+hover_X, mouseX+11.5, mouseY-39);
    text("Y: "+hover_Y, mouseX+11.5, mouseY-19);
  } else if ((mouseX>=(width/2)) && (mouseY>=((height-graafiku_all_olev_ruum)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX-60, mouseY-60, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX-48.5,mouseY-39);
    text("Y: "+hover_Y, mouseX-48.5, mouseY-19);
  }else if ((mouseX>=(width/2)) && (mouseY<=((height-graafiku_all_olev_ruum)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX-60, mouseY, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX-48.5, mouseY+21);
    text("Y: "+ hover_Y, mouseX-48.5, mouseY+41);
  }
    
    
  } else{
    hover_X=0;
    hover_Y=0;
  }

}


function Ylesanne(){
 
   mudelid=["ruut","kolmnurk","romb","trapets","roopkylik"];
  // mudelid=["roopkylik"];
  mudeli_valik=random(mudelid);
  
  if (mudeli_valik=="ruut"){
    
          
      punkt_Ax = 11
      punkt_Ay = punkt_Ax
    
      punkt_Bx = punkt_Ax
      punkt_By = punkt_Ax
    
      punkt_Cx = punkt_Ax
      punkt_Cy = punkt_Ax
    
      punkt_Dx = punkt_Ax
      punkt_Dy = punkt_Ax
  
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || kylje_pikkus==0 ){
    kylje_pikkus = Math.floor(Math.random()*10-5);
    pindala=kylje_pikkus*kylje_pikkus;
    perimeeter=kylje_pikkus*4;
    
    suurused=["S","P"];
    suuruse_valik=random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=Math.abs(pindala);
    } else if (suuruse_valik=="P"){
      tekst_suuruse_jaoks="ümbermõõt P.";
      vastus=Math.abs(perimeeter);
    }
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    
    punkt_Bx=punkt_Ax+kylje_pikkus;
    punkt_By=punkt_Ay;
  
    punkt_Cx=punkt_Bx;
    punkt_Cy=punkt_Ay-kylje_pikkus;

    punkt_Dx=punkt_Ax;
    punkt_Dy=punkt_Ay-kylje_pikkus;
    
  }
  
    yl_text.html("Märgi joonisele punkt A("+str(punkt_Ax)+";"+str(punkt_Ay)+"), punkt B("+str(punkt_Bx)+";"+str(punkt_By)+"), punkt C("+str(punkt_Cx)+";"+str(punkt_Cy)+") ning punkt D("+str(punkt_Dx)+";"+str(punkt_Dy)+").<br>Seejärel leia tekkinud kujundi "+tekst_suuruse_jaoks);
    
  } else if (mudeli_valik=="kolmnurk"){
  
      punkt_Ax = 11
      punkt_Ay = punkt_Ax
    
      punkt_Bx = punkt_Ax
      punkt_By = punkt_Ax
    
      punkt_Cx = punkt_Ax
      punkt_Cy = punkt_Ax
    
    kolmnurga_mudel=["horizontal","vertical"];
    kolmnurga_mudeli_valik=random(kolmnurga_mudel);
    
    if (kolmnurga_mudeli_valik=="horizontal"){
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || alus_kolmnurk==0 || korgus_kolmnurk==0 ){
    
      alus_kolmnurk = Math.floor(Math.random()*xmax-xmax/2);
      korgus_kolmnurk = Math.floor(Math.random()*xmax-xmax/2);
      pindala=Math.abs(alus_kolmnurk)*Math.abs(korgus_kolmnurk)/2;
    
      vastus=pindala;

      punkt_Ax=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
      punkt_Ay=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    
      punkt_Bx = punkt_Ax+alus_kolmnurk;
      punkt_By = punkt_Ay;
    
      punkt_Cx = Math.floor((Math.random()*xmax*2-xmax)*2)/2;
      punkt_Cy = punkt_Ay+korgus_kolmnurk;
    }
    
    } if (kolmnurga_mudeli_valik=="vertical"){
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || alus_kolmnurk==0 || korgus_kolmnurk==0 ){
    
      alus_kolmnurk = Math.floor(Math.random()*xmax-xmax/2);
      korgus_kolmnurk = Math.floor(Math.random()*xmax-xmax/2);
      pindala=Math.abs(alus_kolmnurk)*Math.abs(korgus_kolmnurk)/2;
    
      vastus=pindala;

      punkt_Ax=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
      punkt_Ay=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    
      punkt_Bx = punkt_Ax;
      punkt_By = punkt_Ay+alus_kolmnurk;
    
      punkt_Cx = punkt_Ax+korgus_kolmnurk;
      punkt_Cy = Math.floor((Math.random()*xmax*2-xmax)*2)/2
    }
    
    }
    
    yl_text.html("Märgi joonisele punkt A("+str(punkt_Ax)+";"+str(punkt_Ay)+"), punkt B("+str(punkt_Bx)+";"+str(punkt_By)+") ja punkt C("+str(punkt_Cx)+";"+str(punkt_Cy)+")<br>Seejärel leia tekkinud kujundi pindala S.");
  } else if (mudeli_valik=="romb"){
  
    d1_pikkus = 0;
    d2_pikkus = 0;
    
      punkt_Ax = 11
      punkt_Ay = punkt_Ax
    
      punkt_Bx = punkt_Ax
      punkt_By = punkt_Ax
    
      punkt_Cx = punkt_Ax
      punkt_Cy = punkt_Ax
    
      punkt_Dx = punkt_Ax
      punkt_Dy = punkt_Ax
  
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || d1_pikkus==0 || d2_pikkus==0){
    d1_pikkus = Math.floor(Math.random()*10-5)*2;
    d2_pikkus = Math.floor(Math.random()*10-5)*2;
    pindala = Math.abs(d1_pikkus*d2_pikkus/2);
      
      // console.log(d1_pikkus, d2_pikkus, pindala);
    
    suurused=["S"];
    suuruse_valik = random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=pindala;
    } //else if (suuruse_valik=="P"){
      //tekst_suuruse_jaoks="ümbermõõt P.";
      //vastus=perimeeter;
   // }
      
      
    //________________________      
    // ROMBI JOONIS
    //________________________
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax));
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax));
      
    punkt_Bx=punkt_Ax+d2_pikkus/2;
    punkt_By=punkt_Ay+d1_pikkus/2;
  
    punkt_Cx = punkt_Ax;
    punkt_Cy = punkt_Ay+d1_pikkus;  

    punkt_Dx=punkt_Ax-d2_pikkus/2;
    punkt_Dy=punkt_Ay+d1_pikkus/2;
    
  }

    yl_text.html("Märgi joonisele punkt A("+str(punkt_Ax)+";"+str(punkt_Ay)+"), punkt B("+str(punkt_Bx)+";"+str(punkt_By)+"), punkt C("+str(punkt_Cx)+";"+str(punkt_Cy)+") ning punkt D("+str(punkt_Dx)+";"+str(punkt_Dy)+").<br>Seejärel leia tekkinud kujundi "+tekst_suuruse_jaoks);
    
  } else if (mudeli_valik=="trapets"){
          
      punkt_Ax = 11
      punkt_Ay = punkt_Ax
    
      punkt_Bx = punkt_Ax
      punkt_By = punkt_Ax
    
      punkt_Cx = punkt_Ax
      punkt_Cy = punkt_Ax
    
      punkt_Dx = punkt_Ax
      punkt_Dy = punkt_Ax
    
    trapetsi_mudel=["horizontal","vertical"];
    trapetsi_mudeli_valik=random(trapetsi_mudel);
    
    if (trapetsi_mudeli_valik=="horizontal"){
    
    trapets_korgus=0;
    trapets_alus_1_pikkus=0;
  
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || trapets_korgus==0  || trapets_alus_1_pikkus==0){

    trapets_korgus = Math.floor(Math.random()*xmax*2-xmax);
    trapets_alus_1_pikkus = Math.floor(Math.random()*10);    
    trapets_nihe_1 = Math.floor(Math.random()*7);
    trapets_nihe_2 = Math.floor(Math.random()*7);
    trapets_alus_2_pikkus = trapets_alus_1_pikkus+trapets_nihe_1+trapets_nihe_2;
      
    pindala = Math.abs(((trapets_alus_1_pikkus+trapets_alus_2_pikkus)/2)*trapets_korgus);
      
    suurused=["S"];
    suuruse_valik=random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=pindala;
    } else if (suuruse_valik=="P"){
      tekst_suuruse_jaoks="ümbermõõt P.";
      vastus=perimeeter;
    }
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax));
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax));
    
    punkt_Bx=punkt_Ax+trapets_alus_1_pikkus;
    punkt_By=punkt_Ay;
      
    punkt_Cx=punkt_Bx+trapets_nihe_1;
    punkt_Cy=punkt_Ay+trapets_korgus;

    punkt_Dx=punkt_Ax - trapets_nihe_2;
    punkt_Dy=punkt_Cy;

    }
  } else if (trapetsi_mudeli_valik=="vertical"){
    
    trapets_korgus=0;
    trapets_alus_1_pikkus=0;
  
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || trapets_korgus==0  || trapets_alus_1_pikkus==0){

    trapets_korgus = Math.floor(Math.random()*xmax*2-xmax);
    trapets_alus_1_pikkus = Math.floor(Math.random()*10);    
    trapets_nihe_1 = Math.floor(Math.random()*7);
    trapets_nihe_2 = Math.floor(Math.random()*7);
    trapets_alus_2_pikkus = trapets_alus_1_pikkus+trapets_nihe_1+trapets_nihe_2;
      
    pindala = Math.abs(((trapets_alus_1_pikkus+trapets_alus_2_pikkus)/2)*trapets_korgus);
      
    suurused=["S"];
    suuruse_valik=random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=pindala;
    } else if (suuruse_valik=="P"){
      tekst_suuruse_jaoks="ümbermõõt P.";
      vastus=perimeeter;
    }
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax));
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax));
    
    punkt_Bx=punkt_Ax;
    punkt_By=punkt_Ay+trapets_alus_1_pikkus;
  
    punkt_Cx=punkt_Bx+trapets_korgus;
    punkt_Cy=punkt_By+trapets_nihe_1;

    punkt_Dx=punkt_Cx;
    punkt_Dy=punkt_Ay - trapets_nihe_2;

    }
  }
    
    
    yl_text.html("Märgi joonisele punkt A("+str(punkt_Ax)+";"+str(punkt_Ay)+"), punkt B("+str(punkt_Bx)+";"+str(punkt_By)+"), punkt C("+str(punkt_Cx)+";"+str(punkt_Cy)+") ning punkt D("+str(punkt_Dx)+";"+str(punkt_Dy)+").<br>Seejärel leia tekkinud kujundi "+tekst_suuruse_jaoks);
    
  } else if (mudeli_valik=="ristkylik"){
          
      punkt_Ax = 11
      punkt_Ay = punkt_Ax
    
      punkt_Bx = punkt_Ax
      punkt_By = punkt_Ax
    
      punkt_Cx = punkt_Ax
      punkt_Cy = punkt_Ax
    
      punkt_Dx = punkt_Ax
      punkt_Dy = punkt_Ax
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || alus_pikkus==0 || korgus_pikkus==0) {
    alus_pikkus = Math.floor(Math.random()*xmax*2-xmax);
    korgus_pikkus = Math.floor(Math.random()*xmax*2-xmax);
    pindala=Math.abs(korgus_pikkus*alus_pikkus);
    perimeeter=2*(Math.abs(alus_pikkus)+Math.abs(korgus_pikkus));
    
    suurused=["S","P"];
    suuruse_valik=random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=Math.abs(pindala);
    } else if (suuruse_valik=="P"){
      tekst_suuruse_jaoks="ümbermõõt P.";
      vastus=Math.abs(perimeeter);
    }
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    
    punkt_Bx=punkt_Ax+alus_pikkus;
    punkt_By=punkt_Ay;
  
    punkt_Cx=punkt_Bx;
    punkt_Cy=punkt_By+korgus_pikkus;

    punkt_Dx=punkt_Ax;
    punkt_Dy=punkt_Ay+korgus_pikkus;
    
  }
  
    yl_text.html("Märgi joonisele punkt A("+str(punkt_Ax)+";"+str(punkt_Ay)+"), punkt B("+str(punkt_Bx)+";"+str(punkt_By)+"), punkt C("+str(punkt_Cx)+";"+str(punkt_Cy)+") ning punkt D("+str(punkt_Dx)+";"+str(punkt_Dy)+").<br>Seejärel leia tekkinud kujundi "+tekst_suuruse_jaoks);
  
  // console.log(vastus);
    
  } else if (mudeli_valik=="roopkylik"){
    
      punkt_Ax = 11
      punkt_Ay = punkt_Ax
    
      punkt_Bx = punkt_Ax
      punkt_By = punkt_Ax
    
      punkt_Cx = punkt_Ax
      punkt_Cy = punkt_Ax
    
      punkt_Dx = punkt_Ax
      punkt_Dy = punkt_Ax
    
    roopkyliku_mudel=["horizontal","vertical"];
    roopkyliku_mudeli_valik=random(roopkyliku_mudel);
    
    if (roopkyliku_mudeli_valik=="horizontal"){
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || alus_pikkus==0 || korgus==0 ){
    alus_pikkus = Math.floor(Math.random()*30-15);
    korgus = Math.floor(Math.random()*30-15);
    nihe = Math.floor(Math.random()*7);
    pindala=Math.abs(korgus*alus_pikkus);
    
    suurused=["S"];
    suuruse_valik=random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=Math.abs(pindala);
    } else if (suuruse_valik=="P"){
      tekst_suuruse_jaoks="ümbermõõt P.";
      vastus=Math.abs(perimeeter);
    }
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    
    punkt_Bx=punkt_Ax+alus_pikkus;
    punkt_By=punkt_Ay;
  
    punkt_Cx=punkt_Bx+nihe;
    punkt_Cy=punkt_By+korgus;

    punkt_Dx=punkt_Ax+nihe;
    punkt_Dy=punkt_Ay+korgus;
    
    }
  } else if (roopkyliku_mudeli_valik=="vertical"){
    
    while (Math.abs(punkt_Ax)>=xmax || Math.abs(punkt_Ay)>=xmax || Math.abs(punkt_Bx)>=xmax ||  Math.abs(punkt_By)>=xmax || Math.abs(punkt_Cx)>=xmax ||  Math.abs(punkt_Cy)>=xmax || Math.abs(punkt_Dx)>=xmax || Math.abs(punkt_Dy)>=xmax || alus_pikkus==0 || korgus==0 ){
    alus_pikkus = Math.floor(Math.random()*30-15);
    korgus = Math.floor(Math.random()*30-15);
    nihe = Math.floor(Math.random()*10-5);
    pindala=Math.abs(korgus*alus_pikkus);
    
    suurused=["S"];
    suuruse_valik=random(suurused);
    if (suuruse_valik=="S"){
      tekst_suuruse_jaoks="pindala S.";
      vastus=Math.abs(pindala);
    } else if (suuruse_valik=="P"){
      tekst_suuruse_jaoks="ümbermõõt P.";
      vastus=Math.abs(perimeeter);
    }
    
    punkt_Ax=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    punkt_Ay=Math.floor((Math.random()*xmax*2-xmax)*2)/2;
    
    punkt_Bx=punkt_Ax;
    punkt_By=punkt_Ay+alus_pikkus;
  
    punkt_Cx=punkt_Bx+korgus;
    punkt_Cy=punkt_By+nihe;

    punkt_Dx=punkt_Ax+korgus;
    punkt_Dy=punkt_Ay+nihe;
    
    }
  }
  
    yl_text.html("Märgi joonisele punkt A("+str(punkt_Ax)+";"+str(punkt_Ay)+"), punkt B("+str(punkt_Bx)+";"+str(punkt_By)+"), punkt C("+str(punkt_Cx)+";"+str(punkt_Cy)+") ning punkt D("+str(punkt_Dx)+";"+str(punkt_Dy)+").<br>Seejärel leia tekkinud kujundi "+tekst_suuruse_jaoks);
  
  // console.log(vastus);
    
  }
  
}

function Reset(){
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    ALISTUMIS_NUPP.remove();
    JOONIS_TYHJAKS_NUPP.remove();
    VASTUS_INPUT.remove();
  }
  
  // answerMathField.focus();
  // answerMathField.latex("");
  mullid=[]
  vastused_korras=false;
  joonis_korras=false;
  num_vastus_oige=false;
  ALISTU_graafik=false;
  Ylesanne();
  result_text_joonis.html("");
  result_text_vastus.html("");

  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(-70 ,height-50);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(110 ,height-50);
  
  LOPETA_NUPP=createButton("Lõpeta test");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(190 ,height-50);
  
  ALISTUMIS_NUPP=createButton("Näita lahendust");
  ALISTUMIS_NUPP.style('padding','5px 10px');
  ALISTUMIS_NUPP.style('background-color','rgb(255,255,255)');
  ALISTUMIS_NUPP.style('color','black');
  ALISTUMIS_NUPP.style('border-radius','0px');
  ALISTUMIS_NUPP.style('border-width','1px');
  ALISTUMIS_NUPP.style('font-weight','bold');
  ALISTUMIS_NUPP.style('margin-top','30px');
  ALISTUMIS_NUPP.style('margin-left','80px');
  ALISTUMIS_NUPP.position(90,height-313);
  
  JOONIS_TYHJAKS_NUPP=createButton("Kustuta punktid");
  JOONIS_TYHJAKS_NUPP.style('padding','5px 10px');
  JOONIS_TYHJAKS_NUPP.style('background-color','rgb(255,255,255)');
  JOONIS_TYHJAKS_NUPP.style('color','black');
  JOONIS_TYHJAKS_NUPP.style('font-weight','bold');
  JOONIS_TYHJAKS_NUPP.style('border-radius','0px');
  JOONIS_TYHJAKS_NUPP.style('border-width','1px');
  JOONIS_TYHJAKS_NUPP.style('margin-top','30px');
  JOONIS_TYHJAKS_NUPP.style('margin-left','80px');
  JOONIS_TYHJAKS_NUPP.position(-50 ,height-313);
  
  VASTUS_INPUT=createInput();
  VASTUS_INPUT.position(95,647);
  VASTUS_INPUT.style("max-width","60px");
  
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

JOONIS_TYHJAKS_NUPP.mouseOver(function() {
  JOONIS_TYHJAKS_NUPP.style('background-color',	"rgba(25, 25, 112, 0.75)");
  JOONIS_TYHJAKS_NUPP.style('color','white');
});

JOONIS_TYHJAKS_NUPP.mouseOut(function() {
  JOONIS_TYHJAKS_NUPP.style('background-color','rgb(255,255,255)');
    JOONIS_TYHJAKS_NUPP.style('color','black');
});
  
  
  ylesannete_loendur=ylesannete_loendur+1;

}




function Kontroll(){

  
  if (mudeli_valik=="ruut"){
    if (mullid.length==4){
    
        joonisel_Ax_koord = ((mullid[0].x-width/2)/(width/jaotiste_arv));
        joonisel_Ay_koord = -1*((mullid[0].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Bx_koord = ((mullid[1].x-width/2)/(width/jaotiste_arv));
        joonisel_By_koord = -1*((mullid[1].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Cx_koord = ((mullid[2].x-width/2)/(width/jaotiste_arv));
        joonisel_Cy_koord = -1*((mullid[2].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Dx_koord = ((mullid[3].x-width/2)/(width/jaotiste_arv));
        joonisel_Dy_koord = -1*((mullid[3].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
    
    // mullid[0].x olgu näiteks graafiku 0 punktis. Seega piksli väärtus 250. 
    // Teisendame piksli koordinaadid XY tasandi koordinaatideks: (250-laius/2)/(laius/jaotiste_arv).
    // (laius/jaotiste_arv) on siin ühe täis sammu/jaotise vahe pikslites.
    // Sellega saime X koordinaadi, mis algselt oli piksli taustsüsteemis, teisendatud XY tasandi taustsüsteemiks, ehk sellesse, mis ülesandes antud on.
    
      if ( joonisel_Ax_koord == punkt_Ax && joonisel_Ay_koord==punkt_Ay && joonisel_Bx_koord == punkt_Bx && joonisel_By_koord==punkt_By && joonisel_Cx_koord == punkt_Cx && joonisel_Cy_koord==punkt_Cy && joonisel_Dx_koord == punkt_Dx && joonisel_Dy_koord==punkt_Dy ){
        result_text_joonis.html("Joonis korras!");
        joonis_korras=true;
      } else {
        result_text_joonis.html("Punktid valesti märgitud.")
      }
    } else if (mullid.length<4){
      result_text_joonis.html("Liiga vähe punkte!")
    } else if (mullid.length>4){
      result_text_joonis.html("Liiga palju punkte!")
    }
    
    if (VASTUS_INPUT.value()==vastus){
      result_text_vastus.html("Õige vastus!")
      num_vastus_oige=true;
    } else {
      result_text_vastus.html("Vale vastus!")
    }
    if (num_vastus_oige==true && joonis_korras==true){
      oige_vastus=oige_vastus+1;
    }
    
  } else if (mudeli_valik=="kolmnurk"){
    if (mullid.length==3){
    
        joonisel_Ax_koord = ((mullid[0].x-width/2)/(width/jaotiste_arv));
        joonisel_Ay_koord = -1*((mullid[0].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Bx_koord = ((mullid[1].x-width/2)/(width/jaotiste_arv));
        joonisel_By_koord = -1*((mullid[1].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Cx_koord = ((mullid[2].x-width/2)/(width/jaotiste_arv));
        joonisel_Cy_koord = -1*((mullid[2].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
    
    // mullid[0].x olgu näiteks graafiku 0 punktis. Seega piksli väärtus 250. 
    // Teisendame piksli koordinaadid XY tasandi koordinaatideks: (250-laius/2)/(laius/jaotiste_arv).
    // (laius/jaotiste_arv) on siin ühe täis sammu/jaotise vahe pikslites.
    // Sellega saime X koordinaadi, mis algselt oli piksli taustsüsteemis, teisendatud XY tasandi taustsüsteemiks, ehk sellesse, mis ülesandes antud on.
    
      if ( joonisel_Ax_koord == punkt_Ax && joonisel_Ay_koord==punkt_Ay && joonisel_Bx_koord == punkt_Bx && joonisel_By_koord==punkt_By && joonisel_Cx_koord == punkt_Cx && joonisel_Cy_koord==punkt_Cy){
        result_text_joonis.html("Joonis korras!");
        joonis_korras=true;
      } else {
        result_text_joonis.html("Punktid valesti märgitud.")
      }
    } else if (mullid.length<3){
      result_text_joonis.html("Liiga vähe punkte!")
    } else if (mullid.length>3){
      result_text_joonis.html("Liiga palju punkte!")
    }
    
    if (VASTUS_INPUT.value()==vastus){
      result_text_vastus.html("Õige vastus!")
      num_vastus_oige=true;
    } else {
      result_text_vastus.html("Vale vastus!")
    }
    if (num_vastus_oige==true && joonis_korras==true){
      oige_vastus=oige_vastus+1;
    }
    
  }  else if (mudeli_valik=="romb"){
    if (mullid.length==4){
    
        joonisel_Ax_koord = ((mullid[0].x-width/2)/(width/jaotiste_arv));
        joonisel_Ay_koord = -1*((mullid[0].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Bx_koord = ((mullid[1].x-width/2)/(width/jaotiste_arv));
        joonisel_By_koord = -1*((mullid[1].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Cx_koord = ((mullid[2].x-width/2)/(width/jaotiste_arv));
        joonisel_Cy_koord = -1*((mullid[2].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Dx_koord = ((mullid[3].x-width/2)/(width/jaotiste_arv));
        joonisel_Dy_koord = -1*((mullid[3].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
    
    // mullid[0].x olgu näiteks graafiku 0 punktis. Seega piksli väärtus 250. 
    // Teisendame piksli koordinaadid XY tasandi koordinaatideks: (250-laius/2)/(laius/jaotiste_arv).
    // (laius/jaotiste_arv) on siin ühe täis sammu/jaotise vahe pikslites.
    // Sellega saime X koordinaadi, mis algselt oli piksli taustsüsteemis, teisendatud XY tasandi taustsüsteemiks, ehk sellesse, mis ülesandes antud on.
    
      if ( joonisel_Ax_koord == punkt_Ax && joonisel_Ay_koord==punkt_Ay && joonisel_Bx_koord == punkt_Bx && joonisel_By_koord==punkt_By && joonisel_Cx_koord == punkt_Cx && joonisel_Cy_koord==punkt_Cy && joonisel_Dx_koord == punkt_Dx && joonisel_Dy_koord==punkt_Dy ){
        result_text_joonis.html("Joonis korras!");
        joonis_korras=true;
      } else {
        result_text_joonis.html("Punktid valesti märgitud.")
      }
    } else if (mullid.length<4){
      result_text_joonis.html("Liiga vähe punkte!")
    } else if (mullid.length>4){
      result_text_joonis.html("Liiga palju punkte!")
    }
    
    if (VASTUS_INPUT.value()==vastus){
      result_text_vastus.html("Õige vastus!")
      num_vastus_oige=true;
    } else {
      result_text_vastus.html("Vale vastus!")
    }
    if (num_vastus_oige==true && joonis_korras==true){
      oige_vastus=oige_vastus+1;
    }
    
  } else if (mudeli_valik=="trapets"){
    if (mullid.length==4){
    
        joonisel_Ax_koord = ((mullid[0].x-width/2)/(width/jaotiste_arv));
        joonisel_Ay_koord = -1*((mullid[0].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Bx_koord = ((mullid[1].x-width/2)/(width/jaotiste_arv));
        joonisel_By_koord = -1*((mullid[1].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Cx_koord = ((mullid[2].x-width/2)/(width/jaotiste_arv));
        joonisel_Cy_koord = -1*((mullid[2].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Dx_koord = ((mullid[3].x-width/2)/(width/jaotiste_arv));
        joonisel_Dy_koord = -1*((mullid[3].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
    
    // mullid[0].x olgu näiteks graafiku 0 punktis. Seega piksli väärtus 250. 
    // Teisendame piksli koordinaadid XY tasandi koordinaatideks: (250-laius/2)/(laius/jaotiste_arv).
    // (laius/jaotiste_arv) on siin ühe täis sammu/jaotise vahe pikslites.
    // Sellega saime X koordinaadi, mis algselt oli piksli taustsüsteemis, teisendatud XY tasandi taustsüsteemiks, ehk sellesse, mis ülesandes antud on.
    
      if ( joonisel_Ax_koord == punkt_Ax && joonisel_Ay_koord==punkt_Ay && joonisel_Bx_koord == punkt_Bx && joonisel_By_koord==punkt_By && joonisel_Cx_koord == punkt_Cx && joonisel_Cy_koord==punkt_Cy && joonisel_Dx_koord == punkt_Dx && joonisel_Dy_koord==punkt_Dy ){
        result_text_joonis.html("Joonis korras!");
        joonis_korras=true;
      } else {
        result_text_joonis.html("Punktid valesti märgitud.")
      }
    } else if (mullid.length<4){
      result_text_joonis.html("Liiga vähe punkte!")
    } else if (mullid.length>4){
      result_text_joonis.html("Liiga palju punkte!")
    }
    
    if (VASTUS_INPUT.value()==vastus){
      result_text_vastus.html("Õige vastus!")
      num_vastus_oige=true;
    } else {
      result_text_vastus.html("Vale vastus!")
    }
    if (num_vastus_oige==true && joonis_korras==true){
      oige_vastus=oige_vastus+1;
    }
    
  } else if (mudeli_valik=="ristkylik"){
    if (mullid.length==4){
    
        joonisel_Ax_koord = ((mullid[0].x-width/2)/(width/jaotiste_arv));
        joonisel_Ay_koord = -1*((mullid[0].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Bx_koord = ((mullid[1].x-width/2)/(width/jaotiste_arv));
        joonisel_By_koord = -1*((mullid[1].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Cx_koord = ((mullid[2].x-width/2)/(width/jaotiste_arv));
        joonisel_Cy_koord = -1*((mullid[2].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Dx_koord = ((mullid[3].x-width/2)/(width/jaotiste_arv));
        joonisel_Dy_koord = -1*((mullid[3].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
    
    // mullid[0].x olgu näiteks graafiku 0 punktis. Seega piksli väärtus 250. 
    // Teisendame piksli koordinaadid XY tasandi koordinaatideks: (250-laius/2)/(laius/jaotiste_arv).
    // (laius/jaotiste_arv) on siin ühe täis sammu/jaotise vahe pikslites.
    // Sellega saime X koordinaadi, mis algselt oli piksli taustsüsteemis, teisendatud XY tasandi taustsüsteemiks, ehk sellesse, mis ülesandes antud on.
    
      if ( joonisel_Ax_koord == punkt_Ax && joonisel_Ay_koord==punkt_Ay && joonisel_Bx_koord == punkt_Bx && joonisel_By_koord==punkt_By && joonisel_Cx_koord == punkt_Cx && joonisel_Cy_koord==punkt_Cy && joonisel_Dx_koord == punkt_Dx && joonisel_Dy_koord==punkt_Dy ){
        result_text_joonis.html("Joonis korras!");
        joonis_korras=true;
      } else {
        result_text_joonis.html("Punktid valesti märgitud.")
      }
    } else if (mullid.length<4){
      result_text_joonis.html("Liiga vähe punkte!")
    } else if (mullid.length>4){
      result_text_joonis.html("Liiga palju punkte!")
    }
    
    if (VASTUS_INPUT.value()==vastus){
      result_text_vastus.html("Õige vastus!")
      num_vastus_oige=true;
    } else {
      result_text_vastus.html("Vale vastus!")
    }
    if (num_vastus_oige==true && joonis_korras==true){
      oige_vastus=oige_vastus+1;
    }
    
  } else if (mudeli_valik=="roopkylik"){
    if (mullid.length==4){
    
        joonisel_Ax_koord = ((mullid[0].x-width/2)/(width/jaotiste_arv));
        joonisel_Ay_koord = -1*((mullid[0].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Bx_koord = ((mullid[1].x-width/2)/(width/jaotiste_arv));
        joonisel_By_koord = -1*((mullid[1].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Cx_koord = ((mullid[2].x-width/2)/(width/jaotiste_arv));
        joonisel_Cy_koord = -1*((mullid[2].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
        joonisel_Dx_koord = ((mullid[3].x-width/2)/(width/jaotiste_arv));
        joonisel_Dy_koord = -1*((mullid[3].y-(height-graafiku_all_olev_ruum)/2)/((height-graafiku_all_olev_ruum)/jaotiste_arv));
    
    // mullid[0].x olgu näiteks graafiku 0 punktis. Seega piksli väärtus 250. 
    // Teisendame piksli koordinaadid XY tasandi koordinaatideks: (250-laius/2)/(laius/jaotiste_arv).
    // (laius/jaotiste_arv) on siin ühe täis sammu/jaotise vahe pikslites.
    // Sellega saime X koordinaadi, mis algselt oli piksli taustsüsteemis, teisendatud XY tasandi taustsüsteemiks, ehk sellesse, mis ülesandes antud on.
    
      if ( joonisel_Ax_koord == punkt_Ax && joonisel_Ay_koord==punkt_Ay && joonisel_Bx_koord == punkt_Bx && joonisel_By_koord==punkt_By && joonisel_Cx_koord == punkt_Cx && joonisel_Cy_koord==punkt_Cy && joonisel_Dx_koord == punkt_Dx && joonisel_Dy_koord==punkt_Dy ){
        result_text_joonis.html("Joonis korras!");
        joonis_korras=true;
      } else {
        result_text_joonis.html("Punktid valesti märgitud.")
      }
    } else if (mullid.length<4){
      result_text_joonis.html("Liiga vähe punkte!")
    } else if (mullid.length>4){
      result_text_joonis.html("Liiga palju punkte!")
    }
    
    if (VASTUS_INPUT.value()==vastus){
      result_text_vastus.html("Õige vastus!")
      num_vastus_oige=true;
    } else {
      result_text_vastus.html("Vale vastus!")
    }
    if (num_vastus_oige==true && joonis_korras==true){
      oige_vastus=oige_vastus+1;
    }
    
  }
  
}


function Write_texts(){
  yl_text=createP("");
  yl_text.position(35,(height-graafiku_all_olev_ruum)+55);
  yl_text.style("font-size","16px");
  yl_text.style("line-height","140%");
  yl_text.style("font-family","'Roboto', sans-serif");
  yl_text.style("max-width","450px");
  
  result_text_joonis=createP("");
  result_text_joonis.position(90,(height-graafiku_all_olev_ruum)+197);
  result_text_joonis.style("font-size","16px");
  result_text_joonis.style("line-height","140%");
  result_text_joonis.style("font-family","'Roboto', sans-serif");
  
  result_text_vastus=createP("");
  result_text_vastus.position(90,(height-graafiku_all_olev_ruum)+220);
  result_text_vastus.style("font-size","16px");
  result_text_vastus.style("line-height","140%");
  result_text_vastus.style("font-family","'Roboto', sans-serif");
  
  current_state_text=createP("<b>Vastus:</b><br><br><b>Tulemus</b><br> Joonis: <br> Vastus:");
  current_state_text.position(35,(height-graafiku_all_olev_ruum)+130);
  current_state_text.style("font-size","16px");
  current_state_text.style("line-height","140%");
  current_state_text.style("font-family","'Roboto', sans-serif");
  
  current_state_text_ruutyhik=createP("üh<sup> 2</sup>");
  current_state_text_ruutyhik.position(170,(height-graafiku_all_olev_ruum)+125);
  current_state_text_ruutyhik.style("font-size","16px");
  current_state_text_ruutyhik.style("line-height","140%");
  current_state_text_ruutyhik.style("font-family","'Roboto', sans-serif");
}

function graafiku_joonis(){
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  if(mudeli_valik=="ruut"){
      beginShape();
        vertex(mullid[0].x, mullid[0].y);
        vertex(mullid[1].x, mullid[1].y);
        vertex(mullid[2].x, mullid[2].y);
        vertex(mullid[3].x, mullid[3].y);
      endShape(CLOSE);
  }  else if (mudeli_valik=="kolmnurk"){
      beginShape();
        vertex(mullid[0].x, mullid[0].y);
        vertex(mullid[1].x, mullid[1].y);
        vertex(mullid[2].x, mullid[2].y);
      endShape(CLOSE);
  } else if(mudeli_valik=="romb"){
      beginShape();
        vertex(mullid[0].x, mullid[0].y);
        vertex(mullid[1].x, mullid[1].y);
        vertex(mullid[2].x, mullid[2].y);
        vertex(mullid[3].x, mullid[3].y);
      endShape(CLOSE);
  }  else if(mudeli_valik=="trapets"){
      beginShape();
        vertex(mullid[0].x, mullid[0].y);
        vertex(mullid[1].x, mullid[1].y);
        vertex(mullid[2].x, mullid[2].y);
        vertex(mullid[3].x, mullid[3].y);
      endShape(CLOSE);
  } else if(mudeli_valik=="ristkylik"){
      beginShape();
        vertex(mullid[0].x, mullid[0].y);
        vertex(mullid[1].x, mullid[1].y);
        vertex(mullid[2].x, mullid[2].y);
        vertex(mullid[3].x, mullid[3].y);
      endShape(CLOSE);
  } else if(mudeli_valik=="roopkylik"){
      beginShape();
        vertex(mullid[0].x, mullid[0].y);
        vertex(mullid[1].x, mullid[1].y);
        vertex(mullid[2].x, mullid[2].y);
        vertex(mullid[3].x, mullid[3].y);
      endShape(CLOSE);
  }
  pop();
}

function ALISTU_graafiku_joonis(){
  push();
  noFill();
  stroke(255,0,0);
  strokeWeight(2);
  if(mudeli_valik=="ruut"){
      beginShape();
        vertex((punkt_Ax)*25+250, (-punkt_Ay)*25+250);
        vertex((punkt_Bx)*25+250, (-punkt_By)*25+250);
        vertex((punkt_Cx)*25+250, (-punkt_Cy)*25+250);
        vertex((punkt_Dx)*25+250, (-punkt_Dy)*25+250);
      endShape(CLOSE);
  }  else if (mudeli_valik=="kolmnurk"){
      beginShape();
        vertex((punkt_Ax)*25+250, (-punkt_Ay)*25+250);
        vertex((punkt_Bx)*25+250, (-punkt_By)*25+250);
        vertex((punkt_Cx)*25+250, (-punkt_Cy)*25+250);
      endShape(CLOSE);
  } else if(mudeli_valik=="romb"){
      beginShape();
        vertex((punkt_Ax)*25+250, (-punkt_Ay)*25+250);
        vertex((punkt_Bx)*25+250, (-punkt_By)*25+250);
        vertex((punkt_Cx)*25+250, (-punkt_Cy)*25+250);
        vertex((punkt_Dx)*25+250, (-punkt_Dy)*25+250);
      endShape(CLOSE);
  }  else if(mudeli_valik=="trapets"){
      beginShape();
        vertex((punkt_Ax)*25+250, (-punkt_Ay)*25+250);
        vertex((punkt_Bx)*25+250, (-punkt_By)*25+250);
        vertex((punkt_Cx)*25+250, (-punkt_Cy)*25+250);
        vertex((punkt_Dx)*25+250, (-punkt_Dy)*25+250);
      endShape(CLOSE);
  } else if(mudeli_valik=="ristkylik"){
      beginShape();
        vertex((punkt_Ax)*25+250, (-punkt_Ay)*25+250);
        vertex((punkt_Bx)*25+250, (-punkt_By)*25+250);
        vertex((punkt_Cx)*25+250, (-punkt_Cy)*25+250);
        vertex((punkt_Dx)*25+250, (-punkt_Dy)*25+250);
      endShape(CLOSE);
  } else if(mudeli_valik=="roopkylik"){
      beginShape();
        vertex((punkt_Ax)*25+250, (-punkt_Ay)*25+250);
        vertex((punkt_Bx)*25+250, (-punkt_By)*25+250);
        vertex((punkt_Cx)*25+250, (-punkt_Cy)*25+250);
        vertex((punkt_Dx)*25+250, (-punkt_Dy)*25+250);
      endShape(CLOSE);
  }
  pop();
}

function Joonis_tyhjaks(){
  mullid=[];
  joonis_korras=false;
}

function Lopp(){
  
  current_state_text.html("");
  result_text_joonis.html("");
  result_text_vastus.html("");
  urrent_state_text_ruutyhik.html("");
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");

  yl_text.remove();
  result_text_joonis.remove();
  
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    ALISTUMIS_NUPP.remove();
    JOONIS_TYHJAKS_NUPP.remove();
    VASTUS_INPUT.remove();

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

function Alistun() {
  result_text_vastus.html("");
  result_text_joonis.html("");
  console.log(vastus)
  result_text_vastus.style("color: black")
  result_text_vastus.html("Sobiv vastus oli: "+str(vastus));
  result_text_joonis.html("");
  KONTROLL_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
  JOONIS_TYHJAKS_NUPP.attribute("disabled","");
  ALISTU_graafik=true;
  
  KONTROLL_NUPP.style('background-color','rgba(25, 25, 112, 0.5)');
  ALISTUMIS_NUPP.style('background-color','rgba(208,208,208,0.5)');
  JOONIS_TYHJAKS_NUPP.style('background-color','rgba(208,208,208,0.5)');
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