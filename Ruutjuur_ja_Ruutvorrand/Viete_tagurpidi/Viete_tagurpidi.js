
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

function windowResized() {
  resizeCanvas(windowWidth, 550, WEBGL);
}


function setup() {
  canvas=createCanvas(windowWidth,550,WEBGL);
  write_texts();
  Reset();
  
   stroke(100,180,200);
    strokeWeight(4);
    let fov= PI/3;
    let cameraZ=(height/2.0)/tan(fov/2.0);
    perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
}


function draw() {
  clear();
  background(251,253,255);
  
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  tex_vorrand1.position(width/asukoha_nr+0,height/asukoha_nr+180);
  tex_vorrand2.position(width/asukoha_nr+140,height/asukoha_nr+180);
  tex_vorrand3.position(width/asukoha_nr+270,height/asukoha_nr+180);
  
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(Kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  
  INPUT_x1.position(width/asukoha_nr-30,height/asukoha_nr+165);
  INPUT_x2.position(width/asukoha_nr+100,height/asukoha_nr+165);
  
  x1_text.position(width/asukoha_nr-0,height/asukoha_nr+52);
  x2_text.position(width/asukoha_nr-0,height/asukoha_nr+112);
  
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


function random_int(max) {
  return ((Math.random()-0.5)*2)*max;
}

function Ylesanne(){
  // SCRIPT TULEB SIIA
  mudel=["1"];
  mudeli_valik=random(mudel);
  
  //######################## Ruutvõrrandi lahendamine, Viete teoreemiga.
  if (mudeli_valik==1){
      while (true){
        a=1;
        b=0;
        c=0;
        while ( (b*b-4*a*c)<0 || b==0 || c==0 || (nullkohad(a,b,c)[0]*nullkohad(a,b,c)[1]!=c && nullkohad(a,b,c)[0]+nullkohad(a,b,c)[1]!=-b)  ){
          b=int(random_int(15))
          c=int(random_int(15))
        }
        X1=nullkohad(a,b,c)[0];
        X2=nullkohad(a,b,c)[1];
        if (Number.isInteger(X1) && Number.isInteger(X2) ){
          break
        }
      }
      ruutliige=str(a)+"x^{2}";
        
      if (a>=0){
        ruutliige="+"+"x^{2}";
      } else {
        ruutliige="-"+"x^{2}";
      } 
        
        
      if (b>=0){
        lineaarliige="+"+str(b)+"x";
      } else {
        lineaarliige=str(b)+"x";
      }
        
      if (c>=0){
        vabaliige="+"+str(c);
      } else {
        vabaliige=str(c);
      }
        
      antav_ylesanne1=ruutliige+"+";
      if (antav_ylesanne1[0]=="+"){
        antav_ylesanne1=antav_ylesanne1.substring(1);
      }
        
      antav_ylesanne2="x+";
      antav_ylesanne3="=0";
      
  }
   katex.render(antav_ylesanne1, tex_vorrand1.elt);
   katex.render(antav_ylesanne2, tex_vorrand2.elt);
   katex.render(antav_ylesanne3, tex_vorrand3.elt);
   yl_text.html("Leia ruutvõrrandi p ja q väärtus, kui lahendid on");
   katex.render("x_{1}="+str(X1),x1_text.elt);
   katex.render("x_{2}="+str(X2),x2_text.elt);
   //console.log(X1, X2)
}


function write_texts(){
  
  tex_vorrand1=createP("");
  tex_vorrand1.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand1.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  tex_vorrand2=createP("");
  tex_vorrand2.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand2.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  tex_vorrand3=createP("");
  tex_vorrand3.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand3.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
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
  
  console.log(b,c)
  
if (INPUT_x1.value()=="" || INPUT_x2.value()==""){  
    tulemus.html("Väljad on tühjad!");
    tulemus.style("color", "orange");
    }else if ( (INPUT_x1.value()==b && INPUT_x2.value()==c)  ){
    tulemus.html("Korras!");
    tulemus.style("color","green");
    oige_vastus=oige_vastus+1;
    KONTROLL_NUPP.attribute("disabled","");
    
  }else {
    tulemus.html("Midagi on valesti.");
    tulemus.style("color","red");
  }

}


function Reset(){
  
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    INPUT_x1.remove();
    INPUT_x2.remove();
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
  
  INPUT_x1=createInput().attribute("placeholder","p");
  INPUT_x1.style('padding','10px 20px');
  INPUT_x1.style('background-color','white');
  INPUT_x1.style('color','black');
  INPUT_x1.style('margin-top','30px');
  INPUT_x1.style('margin-left','80px');
  INPUT_x1.style("width","40px");
  INPUT_x1.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem ");
  
  INPUT_x2=createInput().attribute("placeholder","q");
  INPUT_x2.style('padding','10px 20px');
  INPUT_x2.style('background-color','white');
  INPUT_x2.style('color','black');
  INPUT_x2.style('margin-top','30px');
  INPUT_x2.style('margin-left','80px');
  INPUT_x2.style("width","40px");
  INPUT_x2.style("font-family: 'Roboto',sans-serif;line-height: 100%; font-size: 1.25rem ");
  
  ylesannete_loendur=ylesannete_loendur+1;

}



function Lopp(){

  x1_text.remove();
  x2_text.remove();

  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  
  tex_vorrand1.remove();
  tex_vorrand2.remove();
  tex_vorrand3.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  
  INPUT_x1.remove();
  INPUT_x2.remove();
  
  
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
