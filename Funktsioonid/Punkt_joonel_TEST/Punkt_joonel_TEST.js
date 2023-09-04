var r=255,g=255,b=255;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

function setup() {
  createCanvas(650, 300);
  background(255);
  create_TEXTS();
  Reset();
}

function draw() {
  background(255);
  ASUB_NUPP.mousePressed(sobib);
  VALE_NUPP.mousePressed(ei_sobi);
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

function Ylesanne(n){
  
  X=(round_0(random(-100,100)/5)*5)/10;
  
  // ESIMENE MUDEL
  if (n==0){
  ruutliige_A=(round_0(random(-100,100)/5)*5)/10;
  lineaarliige_B=(round_0(random(-100,100)/5)*5)/10;
  vabaliige_C=(round_0(random(-100,100)/5)*5)/10;
  ruutliige_A_str=str(ruutliige_A)
  if (lineaarliige_B>=0){
    lineaarliige_B_str="+ "+str(lineaarliige_B);
  } else {
    lineaarliige_B_str=str(lineaarliige_B)
  }
  if (vabaliige_C>=0){
    vabaliige_C_str="+ "+str(vabaliige_C);
  } else {
    vabaliige_C_str=str(vabaliige_C)
  }
  vorrand=(ruutliige_A*X*X+lineaarliige_B*X+vabaliige_C);
  LaTeX_str="y="+ruutliige_A_str+"x^{2}"+lineaarliige_B_str+"x"+vabaliige_C_str;
  }
  
  // TEINE MUDEL
  else if (n==1){
  lineaarliige_B=(round_0(random(-100,100)/5)*5)/10;
  vabaliige_C=(round_0(random(-100,100)/5)*5)/10;
  lineaarliige_B_str=str(lineaarliige_B);
  if (vabaliige_C>=0){
    vabaliige_C_str="+ "+str(vabaliige_C);
  } else {
    vabaliige_C_str=str(vabaliige_C)
  }
  LaTeX_str="y="+lineaarliige_B_str+"x"+vabaliige_C_str;
  vorrand=lineaarliige_B*X+vabaliige_C;
  }
  
// KOLMAS MUDEL
//   else if (n==2){
//   nimetaja=(round(random(-100,100)/5)*5)/10;
//   lugeja=(round(random(-100,100)/5)*5)/10;
//   if (nimetaja<0 || lugeja<0){
//       nimetaja_str=str(abs(nimetaja));
//       lugeja_str=str(abs(lugeja));
//       LaTeX_str="y=-"+"\\dfrac{"+lugeja_str+"}{"+nimetaja_str+"x}";
//       if (nimetaja==0){
        
//       }
    
//   } else if (nimetaja<0 && lugeja<0) {
//       nimetaja_str=str(abs(nimetaja));
//       lugeja_str=str(abs(lugeja));
//       LaTeX_str="y="+"\\dfrac{"+lugeja_str+"}{"+nimetaja_str+"x}";
//   } else if (nimetaja>0 && lugeja>=0){
//     nimetaja_str=str(nimetaja);
//     lugeja_str=str(lugeja);
//     LaTeX_str="y=\\dfrac{"+lugeja_str+"}{"+nimetaja_str+"x}";
//     vorrand=lugeja/(nimetaja*X);
//   }
//   if (nimetaja==0 || X==0) {
//     LaTeX_str="y=\\dfrac{"+lugeja_str+"}{"+nimetaja_str+"x}";
//   }
// }
  
  punkt_oige=[X, (vorrand)];
  punkt_vale=[X, (vorrand+int(random(1,10)))];
  kaks_punkti=[punkt_oige, punkt_vale];
  
  valik=random(kaks_punkti);

  katex.render( LaTeX_str, LaTeX_vorrand.elt);
  
  yl_text_2.html("Kontrolli, kas punkt P("+valik[0]+", "+valik[1]+") asub funktsiooniga määratud<br>joonel?");
}

function Kontroll(){
  if ((valik[1]==vorrand)==arvamus ){
    tulemus_txt.html("Õige!");
    r=244;
    g=255;
    b=250;
    tulemus_txt.style("color","green");
    push();
    fill(0,255,0);
    strokeWeight(5);
    line(width/2-120,height/2,width/2-120+50,height/2);
    pop();
    oige_vastus=oige_vastus+1;
    ASUB_NUPP.attribute("disabled","");
    VALE_NUPP.attribute("disabled","");
    
  } else{
    tulemus_txt.html("Vale!");
    r=255;
    g=244;
    b=250;
    tulemus_txt.style("color","red");
    ASUB_NUPP.attribute("disabled","");
    VALE_NUPP.attribute("disabled","");
  }
}


function create_TEXTS(){
  p1="...";
  p2="...";
  yl_text_1=createP("On antud järgmine funktsioon: ");
  yl_text_1.position(50,20);
  yl_text_1.style("font-size","20px");
  
  LaTeX_vorrand=createP("");
  LaTeX_vorrand.position(350,15);
  LaTeX_vorrand.style("font-size","20px");
  LaTeX_vorrand.style("line-height","140%")
  
  yl_text_2=createP("Kontrolli, kas punkt P(,) asub funktsiooniga määratud joonel<br>?");
  yl_text_2.position(50,60);
  yl_text_2.style("font-size","20px");
  yl_text_2.style("line-height","140%")
  
  tulemus_txt=createP("");
  tulemus_txt.position(width/2-180,height/2+50);
  tulemus_txt.style("font-size","20px");
  
  staatus_txt=createP("Tulemus: ");
  staatus_txt.position(width/2-260,height/2+50);
  staatus_txt.style("font-size","20px");
}



function Reset(){
  
  
  if(ylesannete_loendur>0){
    
    VALE_NUPP.remove();
    ASUB_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    
  }
  
  LaTeX_vorrand.html("");
  yl_text_2.html("");
  tulemus_txt.html("");
  Ylesanne(random([0,1]));
  ASUB_NUPP=createButton("Asub");
  ASUB_NUPP.style('padding','10px 20px');
  ASUB_NUPP.style('background-color','MidNightBlue');
  ASUB_NUPP.style('color','white');
  ASUB_NUPP.style('border-radius','30px');
  //KONTROLL_NUPP.position(width/2-80,height+30);
  ASUB_NUPP.style('margin-top','30px');
  ASUB_NUPP.style('margin-left','100px');
  ASUB_NUPP.position(width/2-350, height/2-25);
  
  VALE_NUPP=createButton("Ei asu");
  VALE_NUPP.style('padding','10px 20px');
  VALE_NUPP.style('background-color','MidNightBlue');
  VALE_NUPP.style('color','white');
  VALE_NUPP.style('border-radius','30px');
  //KONTROLL_NUPP.position(width/2-80,height+30);
  VALE_NUPP.style('margin-top','30px');
  VALE_NUPP.style('margin-left','100px');
  VALE_NUPP.position(width/2-250, height/2-25);
  
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  //RESET_NUPP.position(width/2+10,height+30);
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/2-10, height/2-25);
  
  LOPETA_NUPP=createButton("Lõpeta test");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  //LOPETA_NUPP.position(width/2+140,height+30);
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(width/2+90, height/2-25);
  
  
  r=255
  g=255
  b=255;
  ylesannete_loendur=ylesannete_loendur+1;

  
}

function sobib(){
  arvamus= true;
  Kontroll();
}

function ei_sobi(){
  arvamus = false;
  Kontroll();
}


function Lopp(){

  
  ASUB_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  VALE_NUPP.attribute("disabled","");
  
  
  yl_text_1.remove();
  yl_text_2.remove();
  LaTeX_vorrand.remove();
  tulemus_txt.remove();
  staatus_txt.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  ASUB_NUPP.remove();
  VALE_NUPP.remove();
    
  
  
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
