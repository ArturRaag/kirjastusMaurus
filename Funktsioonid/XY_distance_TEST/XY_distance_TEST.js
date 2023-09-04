var X=[];
var Y=[];

var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;

var oige_vastus=0;
var ylesannete_loendur=0;
var lopetamise_tingimus=false;

function setup() {
  createCanvas(500,500);
  x_koord=width/2;
  y_koord=height/2;
  Write_texts();
  Reset();
}


function draw() {
  clear();
  background(255);
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
  create_Points();
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



function XYplane(jaotiste_arv, tausta_jaotise_paksus, telje_jaotiste_paksus) {
  //jaotised Y teljel
  var jaotisY=0;
  var Y_jaotise_vaartus=xmax;
  while (jaotisY <= height) {
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
    jaotisY = jaotisY+height/jaotiste_arv;
    
  }
  //jaotised X teljel
  var jaotisX = 0;
  var X_jaotise_vaartus=xmin;
  while (jaotisX <= width) {
    strokeWeight(tausta_jaotise_paksus);
    stroke(200);
    line(jaotisX, height*0 , jaotisX, height);
    strokeWeight(telje_jaotiste_paksus);
    stroke(0);
    line(jaotisX, height/2+5 , jaotisX, height/2-5);
    strokeWeight(0);
    stroke(0);
    text(X_jaotise_vaartus, jaotisX, height/2+20);
    X_jaotise_vaartus=X_jaotise_vaartus+1;
    jaotisX = jaotisX+width/jaotiste_arv;
  }
    // ----- X-Y plane -----
  strokeWeight(telje_jaotiste_paksus);
  stroke(0);
    //Y-axis
  line(width/2, height*0 , width/2 , height);
    //arrow
  line(width/2-5, 0+15, width/2, 0);
  line(width/2+5, 0+15, width/2, 0);
    //X-axis
  line(width*0, height/2, width, height/2);
    //arrow
  line(width-15,height/2-5,width, height/2);
  line(width-15,height/2+5,width, height/2); 
}


function create_Points(){
  push();
  fill(255,204,0);
  circle(round_0(yl_X1_teisendatud/12.5)*12.5, round_0(yl_Y1_teisendatud/12.5)*12.5, 10);
  circle(round_0(yl_X2_teisendatud/12.5)*12.5, round_0(yl_Y2_teisendatud/12.5)*12.5, 10);
  pop();
  push();
  fill(0);
  stroke(255);
  strokeWeight(3);
  text("A",round_0(yl_X1_teisendatud/12.5)*12.5-5, round_0(yl_Y1_teisendatud/12.5)*12.5-10);
  text("B",round_0(yl_X2_teisendatud/12.5)*12.5-5, round_0(yl_Y2_teisendatud/12.5)*12.5-10);
  pop();
  
}

function Ylesanne(){
  yl_X1=(round_0(random(-100,100)/5)*5)/10; //Punkt XY teljestikul
  yl_Y1=(round_0(random(-100,100)/5)*5)/10; //Punkt XY teljestikul
  yl_X1_teisendatud = (yl_X1*25)+width/2; //Punkt Canvasil
  yl_Y1_teisendatud = -1*(yl_Y1*25)+height/2; // Punkt Canvasil
  
  
  yl_X2=(round_0(random(-100,100)/5)*5)/10;
  yl_Y2=(round_0(random(-100,100)/5)*5)/10;
  yl_X2_teisendatud = (yl_X2*25)+width/2;
  yl_Y2_teisendatud = -1*(yl_Y2*25)+height/2;
  
  distance_of_points = round_0(sqrt((yl_X1-yl_X2)*(yl_X1-yl_X2)+(yl_Y1-yl_Y2)*(yl_Y1-yl_Y2))*10)/10;
  yl_text.html("Leia punkti A( "+yl_X1+"; "+yl_Y1+") ning punkti B( "+yl_X2+"; "+yl_Y2+") vaheline kaugus.<br>Vastus ümarda 1 koht pärast koma.");
  vastus_TEXT.html("Vastus: ");
}

function Write_texts(){
  yl_text=createP("");
  yl_text.position(35,height+5);
  yl_text.style("font-size","16px");
  yl_text.style("line-height","140%");
  yl_text.style("font-family","'Roboto', sans-serif");
  
  
  vastus_TEXT = createP("");
  vastus_TEXT.position(35,height+90);
  vastus_TEXT.style("font-size","16px");
  vastus_TEXT.style("line-height","140%");
  vastus_TEXT.style("font-family","'Roboto', sans-serif");
  
  result_text=createP("");
  result_text.position(35,height+55);
  result_text.style("font-size","16px");
  result_text.style("line-height","140%");
  result_text.style("font-family","'Roboto', sans-serif");
  
}

function Kontroll(){
  if (VASTUS.value()==distance_of_points ){
    result_text.html("Õige!");
    result_text.style("color","green");
    oige_vastus=oige_vastus+1;
    KONTROLL_NUPP.attribute("disabled","");
  } else if (VASTUS.value()==""){
    result_text.html("Vastuse kast on tühi!")
    result_text.style("color","red");
  } else {
    result_text.html("Vale vastus!");
    result_text.style("color","red");
  }
}


function Reset(){
  
  if(ylesannete_loendur>0){
    
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove()
    VASTUS.remove();
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
  LOPETA_NUPP.style('margin-top','150px');
  LOPETA_NUPP.style('margin-left','80px');
  
//   KONTROLL_NUPP.position(4*width/5-90, height+95);
//   RESET_NUPP.position(4*width/5+10,height+95);
//   LOPETA_NUPP.position(4*width/5+10,height+150);
  
  
  VASTUS = createInput();
  VASTUS.position(90,height+105);
  
  ylesannete_loendur=ylesannete_loendur+1;
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
    VASTUS.remove();
    vastus_TEXT.remove();

  
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
