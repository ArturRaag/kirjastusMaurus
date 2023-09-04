var ruutR=300;
var buffer=20;
var punktide_massiivY=[];
var punktide_massiivX=[];
var max_punkte=1000;
var punktid_temp=0;
var punktid_ringis=0;
var tsenter=(ruutR/2+buffer);
var toggle=false;

function setup() {
  createCanvas(ruutR+buffer*2,700);
  Sruut_txt=createP("");
  Sring_txt=createP("");
  Sruut_txt.position(30,ruutR+buffer+15);
  Sring_txt.position(30,ruutR+60+15);
  
  koguPunktid_txt=createP("");
  punktidRingis_txt=createP("");
  koguPunktid_txt.position(30,ruutR+120);
  punktidRingis_txt.position(30,ruutR+160);
  osamaar_txt=createP("");
  osamaar_txt.position(30,ruutR+200);
  
  Sring_MC=createP("");
  Sring_MC.position(30,ruutR+255);
  MC_result=createP("a");
  MC_result.position(30,ruutR+310);
  
  PAUS=createButton("Paus");
  PAUS.position(275,337);
}

function draw() {
  frameRate(2) // add slider for this + pause button
  background(255);
  
  PAUS.mousePressed(pause_or_continute)
  
  push();
  fill(15,30,60);
  rect(0+buffer,0+buffer,ruutR,ruutR);
  pop();
  
  push();
  noFill();
  stroke(100,180,200);
  strokeWeight(3);
  circle(150+20,150+20, 300 );
  pop();

  if (toggle==false){
  if (punktid_temp <= max_punkte){
    
    generate_point();
    punktide_massiivX.push(numX);
    punktide_massiivY.push(numY);
    punktid_temp=punktid_temp+1;
    for ( i=0; i< punktide_massiivX.length; i++ ){
      push();
      strokeWeight(3);
      stroke(255);
      point(punktide_massiivX[i]+buffer,punktide_massiivY[i]+buffer);
      pop();
    }
    
    // push();
    // stroke(255,0,0);
    // strokeWeight(10)
    // point(width/2,tsenter);
    // pop();
    
    if (Math.sqrt((numX-ruutR/2)*(numX-ruutR/2)+(numY-ruutR/2)*(numY-ruutR/2))<=ruutR/2 ){
      punktid_ringis=punktid_ringis+1;
    }
    
  } else {
    punktid_temp=0;
    puntkide_massiivX=[];
    punktide_massiivY=[];
    generate_point();
    punktide_massiivX.push(numX);
    punktide_massiivY.push(numY);
    punktid_ringis=0;
  }
  } else if (toggle==true){
      for ( i=0; i< punktide_massiivX.length; i++ ){
        push();
        strokeWeight(3);
        stroke(255);
        point(punktide_massiivX[i]+buffer,punktide_massiivY[i]+buffer);
        pop();
    }
  }
  
  Sruut=ruutR*ruutR;
  Sring=Math.PI*(ruutR/2)*(ruutR/2);

  
  katex.render("S_{ruut}="+str(Sruut)+"px^{2}",Sruut_txt.elt);
  katex.render("S_{ring}="+str(round_2(Sring))+"px^{2}",Sring_txt.elt);
  katex.render("\\text{Punkte kokku }"+"(P_{k}): "+str(punktid_temp),koguPunktid_txt.elt);
  katex.render("\\text{Punktid ringi sees }"+"(P_{r}): "+str(punktid_ringis), punktidRingis_txt.elt);
  katex.render("\\text{Osamäär: }"+"\\dfrac{P_{r}}{P_{k}}="+"\\dfrac{"+str(punktid_ringis)+"}{"+str(punktid_temp)+"}"+" \\approx "+str(round_2(punktid_ringis/punktid_temp)),osamaar_txt.elt);
  katex.render("S_{ring}=\\dfrac{P_{r}}{P_{k}} \\cdot S_{ruut}="+str(round_2(punktid_ringis/punktid_temp))+"\\cdot"+str(Sruut)+"\\approx",Sring_MC.elt)
  katex.render(" \\approx "+str(round(Sruut*(round_2(punktid_ringis/punktid_temp)))),MC_result.elt);
}

function generate_point(){
  
  numX=Math.floor(Math.random()*ruutR);
  numY=Math.floor(Math.random()*ruutR);
  
}


function round_2(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*100)/100 )
}


function round_4(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10000)/10000 )
}

function pause_or_continute(){
  if (toggle==true){
    toggle=false
    PAUS.html("Paus");
  } else if (toggle==false){
    toggle=true
    PAUS.html("Jätka");
  };
}