var oige_vastus=0;
var ylesannete_loendur=0;
var lopetamise_tingimus=false;

function setup() {
  let c= createCanvas(700, 200);
  x_koord=width/2;
  background(255);
  
  create_TEXT();
  Reset();
}

function draw() {
  clear();
  
  background(255);

  // Täisarvulised jaotised
  for (x=-10;x<11;x=x+1){
    strokeWeight(1);
    line((x*30)+width/2-5,height/2,(x*30)+width/2-5,height/2-10);
  }
  
  // 0.5 jaotised
    for (x=-10;x<10;x=x+0.5){
    strokeWeight(1);
    line((x*30)+width/2-5,height/2-2,(x*30)+width/2-5,height/2-8);
  }
  
  //jaotiste väärtused
  for (x=-10; x<11;x=x+1){
    fill(0);
    push();
    textSize(14);
    text(x, (x*30)+width/2-5-3,height/2+17);
    pop();
  }
  strokeWeight(2);
  line((-10*30)+width/2-5, height/2-5, (10*30)+width/2-5+30, height/2-5); // SIRGE
  
  //arrow
  line(((10*30)+width/2+30-5)-10,height/2-10,((10*30)+width/2+30)-5,height/2-5);
  line(((10*30)+width/2+30-5)-10,height/2,((10*30)+width/2+30)-5 ,height/2-5); 
  
  fill(255,0,0);
  push();
  strokeWeight(3);
  line((0*30)+width/2-5,height/2,(0*30)+width/2-5, height/2-10); // Null-punkti joon
  
  createPoint(x_koord);
  
  
  
  KONTROLL_NUPP.mousePressed(Kontroll);
  RESET_NUPP.mousePressed(Reset);
  LOPETA_NUPP.mousePressed(Lopp);
  if(lopetamise_tingimus==true){
    
    push();
    fill(22, 56, 50);
    rect(0,0,width,height);
    pop();
    

    
    push();
    fill(48, 25, 52);
    strokeWeight(0);
    circle(width,0,mouseX*2);
    pop();
    
    push();
    fill(220, 120, 52);
    strokeWeight(0);
    circle(0,height, mouseX-70);
    pop();
    
    push();
    fill(22,56,50);
    strokeWeight(0);
    circle(width,0,mouseY)
    pop();
  }
}

function createPoint(x){
  fill(23,197,255);
  circle(round_0(x/15)*15,height/2-5, 10);
  
}

function mousePressed(){
  if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
    if (mouseX>(10*30)+width/2-5){
      x_koord=(10*30)+width/2-5;
    } else if (mouseX<(-10*30)+width/2-5){
      x_koord=(-10*30)+width/2-5;
    } else {
      x_koord=mouseX
    }
  }
}

function Ylesanne() {
  yl_number=(round_0(random(-100,100)/5)*5)/10;
  yl_text.html("Märgi teljele punkt P("+yl_number+").");
  yl_number_teisendatud = (yl_number*30)+width/2-5;
}

function Kontroll() {
  if (round_0(x_koord/15)*15==yl_number_teisendatud){
    result_text.html("Õige!");
    result_text.style("color","green");
    oige_vastus=oige_vastus+1;
    KONTROLL_NUPP.attribute("disabled","");
  } else {
    result_text.html("Asukoht ei sobi!");
    result_text.style("color","red");
  }
}

function Reset(){
  
  
  if(ylesannete_loendur>0){
    
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove()
    
  }
  
  
  
  result_text.html("");
  Ylesanne();
 KONTROLL_NUPP=createButton("Kontrolli");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  //KONTROLL_NUPP.position(width/2-80,height+30);
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
 
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  //RESET_NUPP.position(width/2+10,height+30);
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
 
  LOPETA_NUPP=createButton("Lõpeta");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  //LOPETA_NUPP.position(width/2+140,height+30);
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  
  ylesannete_loendur=ylesannete_loendur+1;
  
}

function create_TEXT(){
  result_text=createP("");
  result_text.style("font-size","20px");
  result_text.position((-10*30)+width/2-5,height-70);
  
  yl_number=0;
  yl_text=createP("");
  yl_text.style("font-size","20px");
  yl_text.position((-10*30)+width/2-5,5);
}

function keyPressed() {
  if (keyCode === ENTER){
    Kontroll();
  } else if (keyCode===32) {
    Reset();
  }
}

function Lopp(){

  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");

    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove();
    yl_text.remove();
    result_text.remove();

  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/2-100,height/2-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  
  
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
