var X=[];
var Y=[];
var X2=[];
var Y2=[];


var x_koord=0.0, y_koord=0.0;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;
var teksti_kasti_korgus=300;
var punkti_raadius=5;

var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;

// ----------------------------------------- HTML ToolTip -------------------------------------------

var tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.85)"
tooltip.style.color = "white";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="300px";
tooltip.style.borderRadius="25px"
document.body.appendChild(tooltip);

var regularText = document.createElement("div");
regularText.innerHTML = "Punkti saab joonisele märkida hiireklõpsuga.<br><br>Testi eest saab +1 punkti kui tabel ning joonis on edukalt loodud.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ=''
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
infoNupp.style.top="510px";
infoNupp.style.left="435px"
document.body.appendChild(infoNupp);

infoNupp.addEventListener("mouseenter", function() {
  tooltip.style.left = (infoNupp.offsetLeft-350) + "px";
  tooltip.style.top = (infoNupp.offsetTop-170 ) + "px";
  infoNupp.style.background="rgb(224,222,222)"
  tooltip.style.display = "block";
});

infoNupp.addEventListener("mouseleave", function() {
  tooltip.style.display = "none";
  infoNupp.style.background="transparent"
});

// ----------------------------------------- HTML ToolTip -------------------------------------------




function setup() {
  canvas=createCanvas(500,800);
  x_koord=width/2;
  y_koord=height/2;
  Write_texts();
  Reset();

}


function draw() {
  clear();
  background(255);
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
  create_a_Point();
  graafik(xmin,xmax, jaotiste_arv);
  mouse_Hover();
  
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



function XYplane(jaotiste_arv, tausta_jaotise_paksus, telje_jaotiste_paksus) {
  //jaotised Y teljel
  var jaotisY=0;
  var Y_jaotise_vaartus=xmax;
  while (jaotisY <= height-300) {
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
    jaotisY = jaotisY+(height-teksti_kasti_korgus)/jaotiste_arv;
    
  }
  //jaotised X teljel
  var jaotisX = 0;
  var X_jaotise_vaartus=xmin;
  while (jaotisX <= width) {
    strokeWeight(tausta_jaotise_paksus);
    stroke(200);
    line(jaotisX, (height-teksti_kasti_korgus)*0 , jaotisX, (height-teksti_kasti_korgus));
    strokeWeight(telje_jaotiste_paksus);
    stroke(0);
    line(jaotisX, (height-teksti_kasti_korgus)/2+5 , jaotisX, (height-teksti_kasti_korgus)/2-5);
    strokeWeight(0);
    stroke(0);
    text(X_jaotise_vaartus, jaotisX, (height-teksti_kasti_korgus)/2+20);
    X_jaotise_vaartus=X_jaotise_vaartus+1;
    jaotisX = jaotisX+width/jaotiste_arv;
  }
    // ----- X-Y plane -----
  strokeWeight(telje_jaotiste_paksus);
  stroke(0);
    //Y-axis
  line(width/2, (height-teksti_kasti_korgus)*0 , width/2 , (height-teksti_kasti_korgus));
    //arrow
  line(width/2-5, 0+15, width/2, 0);
  line(width/2+5, 0+15, width/2, 0);
    //X-axis
  line(width*0, (height-teksti_kasti_korgus)/2, width, (height-teksti_kasti_korgus)/2);
    //arrow
  line(width-15,(height-teksti_kasti_korgus)/2-5,width, (height-teksti_kasti_korgus)/2);
  line(width-15,(height-teksti_kasti_korgus)/2+5,width, (height-teksti_kasti_korgus)/2); 
}

points_on_plot=0;

function mouseClicked() {
  
  if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<(height-teksti_kasti_korgus)){
    x_koord=mouseX;
    y_koord=mouseY;
  }
}



function create_a_Point(){
  
    push();
    fill(0,139,195);
    C1=circle(round_0(x_koord/12.5)*12.5, round_0(y_koord/12.5)*12.5, punkti_raadius);
    pop();
    push();
    strokeWeight(4);
    stroke(255);
    text("L",round_0(x_koord/12.5)*12.5-5, round_0(y_koord/12.5)*12.5-10 )
    pop();

}

function Ylesanne(){

  tous_K1=0
  tous_K2=3
  vabaliige_B1=10000
  vabaliige_B2=0
  y=tous_K1*((vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2))+vabaliige_B1
  x=(vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2)
  // console.log(str((vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2)).split(".")[1].length<=1)

  while ( !Number.isInteger(x) || str(x).split(".")[1]=="5" ) { 
    tous_K1=random_integer(15);
    tous_K2=random_integer(15);
    vabaliige_B1=random_integer(15);
    vabaliige_B2=random_integer(15);
    y=tous_K1*((vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2))+vabaliige_B1
    x=(vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2)
      if (abs(y)>10 || abs(x)>9.5){
          tous_K1=0
          tous_K2=3
          vabaliige_B1=10000
          vabaliige_B2=0
          x=(vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2)
      }
  }
  
  console.log((vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2), tous_K1*((vabaliige_B2-vabaliige_B1)/(tous_K1-tous_K2))+vabaliige_B1)
  
  if (vabaliige_B1>=0){
    vabaliige_B1_str="+ "+str(vabaliige_B1);
  } else {
    vabaliige_B1_str=str(vabaliige_B1)
  }
  
  if (vabaliige_B2>=0){
    vabaliige_B2_str="+ "+str(vabaliige_B2);
  } else {
    vabaliige_B2_str=str(vabaliige_B2)
  }
  
  LaTeX_string1="y="+str(tous_K1)+"x"+vabaliige_B1_str;
  LaTeX_string2="y="+str(tous_K2)+"x"+vabaliige_B2_str;
  
  LaTeX_string_full="\\begin{cases}" +LaTeX_string1+" \\newline "+LaTeX_string2+ "\\end{cases}";
  
  katex.render(LaTeX_string_full, TeX_vorrand.elt);
  yl_text.html("On antud funktsioonid:<br><br><br> Kanna funktsioonide lõikepunkti koordinaadid lünkadesse,<br>tulemused ümarda 3 kohta pärast koma, ning kanna leitud<br> punkt graafikule ligikaudselt.");
  yl_text2.html("Vastus:")
  
  punkt_P=str("L( \\hspace{35px}; \\hspace{35px}     )");
  katex.render(punkt_P, TeX_punkti_koord.elt);
}


function Write_texts(){
  yl_text=createP("");
  yl_text.position(35,(height-teksti_kasti_korgus)+25);
  yl_text.style("font-size", "16px")
  yl_text.style("line-height", "140%")
  yl_text.style("font-family",'"Roboto", sans-serif')
  
  yl_text2=createP("");
  yl_text2.position(35,(height-teksti_kasti_korgus)+210);
  yl_text2.style("font-size", "16px")
  yl_text2.style("line-height", "140%")
  yl_text2.style("font-family",'"Roboto", sans-serif')
  
  result_text=createP("");
  result_text.position(160,(height-teksti_kasti_korgus)+180);
  result_text.style("font-size", "16px")
  result_text.style("line-height", "140%")
  result_text.style("font-family",'"Roboto", sans-serif')
  
  
  punkti_result=createP("");
  punkti_result.position(35,(height-teksti_kasti_korgus)+240 );
  punkti_result.style("font-size", "16px")
  punkti_result.style("line-height", "140%")
  punkti_result.style("font-family",'"Roboto", sans-serif')
  
  
  TeX_vorrand=createP("");
  TeX_vorrand.style("font-size","16px");
  TeX_vorrand.position(width/2-50,(height-295));
  TeX_vorrand.style("line-height", "140%")
  TeX_vorrand.style("font-family",'"Roboto", sans-serif')
  
  
  TeX_punkti_koord=createP("");
  TeX_punkti_koord.position(91, (height-teksti_kasti_korgus)+210);
  TeX_punkti_koord.style("font-size", "16px")
  TeX_punkti_koord.style("line-height", "140%")
  TeX_punkti_koord.style("font-family",'"Roboto", sans-serif')
  
}

function Kontroll(){
  x_id_korras=false;
  y_id_korras=false;
  punkt_on_korras=false;
  
  sisend_x=INPUT_X.value();
  sisend_y=INPUT_Y.value();
  vorrandi_VP=tous_K1*sisend_x+vabaliige_B1;
  vorrandi_PP=tous_K2*sisend_x+vabaliige_B2;
  
  console.log(sisend_x,sisend_y,vorrandi_VP, vorrandi_PP);
  
  if (vorrandi_VP==vorrandi_PP){
    x_id_korras=true;
  } else {
    x_id_korras=false;
  }
  
  if (vorrandi_VP==sisend_y && vorrandi_PP==sisend_y) {
    y_id_korras=true;
  } else {
    y_id_korras=false;
  }
  
  // ######################## KAS GRAAFIKULE MÄRGITUD PUNKT OK? ########################
  
  // console.log(round(sisend_x*2)/2,"*******",(round(x_koord/12.5)*12.5-250)/25)
  // console.log(round(sisend_y*2)/2,"*******",(round(y_koord/12.5)*12.5-250)/25 )
  if (round_0(sisend_x*2)/2 == (round_0(x_koord/12.5)*12.5-250)/25 && -1*round_0(sisend_y*2)/2==(round_0(y_koord/12.5)*12.5-250)/25 ){
    punkt_on_korras=true;
    punkti_result.html("Lõikepunkt märgitud graafikule õigesti!");
    punkti_result.style("color","green");
  } else {
    punkt_on_korras=false;
    punkti_result.html("Lõikepunkt märgitud graafikule valesti!");
    punkti_result.style("color","red");
    
  }
  
  
  // ########################## KAS KOGU ÜL KORRAS? ##################################
  
  if (y_id_korras==true && x_id_korras==true){

    result_text.html("Korras!")
    result_text.style("color","green")
  } else {
    result_text.html("Ei sobi!");
    result_text.style("color","red")
  }
  
  if (y_id_korras==true && x_id_korras==true && punkt_on_korras==true)
    {
      oige_vastus=oige_vastus+1;
      KONTROLL_NUPP.attribute("disabled","");
    }
  
}


function Reset(){
  
  if(ylesannete_loendur>0){
    
    INPUT_X.remove();
    INPUT_Y.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove()
    
  }
  
  y_id_korras=false;
  x_id_korras=false;
  punkt_on_korras=false;
  
  result_text.html("");
  punkti_result.html("");
  yl_text.html("");
  yl_text2.html("");
  TeX_vorrand.html("");
  Ylesanne();
  
  KONTROLL_NUPP=createButton("Kontrolli");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  //KONTROLL_NUPP.position(width/2-80,height+30);
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(4*width/5-120, (height-teksti_kasti_korgus)+130);
  KONTROLL_NUPP.attribute("enabled","");
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  //RESET_NUPP.position(width/2+10,height+30);
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(4*width/5-70,(height-teksti_kasti_korgus)+175);
  
  LOPETA_NUPP=createButton("Lõpeta");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  //LOPETA_NUPP.position(width/2+140,height+30);
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(4*width/5-90, (height-teksti_kasti_korgus)+220);
  
  
  // ###################### SISENDID #################################
  INPUT_X=createInput();
  INPUT_X.size(55,17);
  INPUT_X.position(115,(height-teksti_kasti_korgus)+226);
  INPUT_X.style("font-size", "16px")
  INPUT_X.style("line-height", "140%")
  INPUT_X.style("font-family",'"Roboto", sans-serif')
  
  INPUT_Y=createInput();
  INPUT_Y.size(55,17);
  INPUT_Y.position(190,(height-teksti_kasti_korgus)+226);
  INPUT_Y.style("font-size", "16px")
  INPUT_Y.style("line-height", "140%")
  INPUT_Y.style("font-family",'"Roboto", sans-serif')
  
  ylesannete_loendur=ylesannete_loendur+1;

}

function graafik(xmin,xmax, jaotiste_arv) {
  
    if (y_id_korras==true && x_id_korras==true && punkt_on_korras==true ) {
  //----- Määramispiirkond X -----
  var i;
  var j;
   for (i = xmin , j = 0; i <=xmax ; i = i+0.1, j=j+1  ) {
     X[j]=i;
     X2[j]=i;
     Y[j]=tous_K1*X[j]+vabaliige_B1; //----- Muutumispiirkond Y -----
     Y2[j]=tous_K2*X2[j]+vabaliige_B2;
   }
  
  for (var k=0; k<=X.length; k=k+1) {
    if (X[k]*(width/jaotiste_arv)+width/2 >= 0 && X[k]*(width/jaotiste_arv)+width/2 <= width && Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2 >=0 && Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2 <= (height-teksti_kasti_korgus)  ){
    push();
    fill(255,0,255);
    circle(X[k]*(width/jaotiste_arv)+width/2 , Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2,0);
   pop();
      if (k>=1) {
      stroke(0, 140, 205);
      strokeWeight(2);
      line(X[k-1]*(width/jaotiste_arv)+width/2, Y[k-1]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2, X[k]*(width/jaotiste_arv)+width/2, Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2);
  }
    
  } 
    }
      
  for (var k=0; k<=X2.length; k=k+1) {
    if (X2[k]*(width/jaotiste_arv)+width/2 >= 0 && X2[k]*(width/jaotiste_arv)+width/2 <= width && Y2[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2 >=0 && Y2[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2 <= (height-teksti_kasti_korgus)  ){
    push();
    fill(255,0,255);
    circle(X2[k]*(width/jaotiste_arv)+width/2 , Y2[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2,0);
   pop();
      if (k>=1) {
      stroke(0, 140, 205);
      strokeWeight(2);
      line(X2[k-1]*(width/jaotiste_arv)+width/2, Y2[k-1]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2, X2[k]*(width/jaotiste_arv)+width/2, Y2[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2);
  }
    
  } 
    }
      
    }
}

function mouse_Hover(){
  
  if (mouseX >=0 && mouseX<= width && mouseY>=0 && mouseY<=height-300){
  hover_X=(round_0(mouseX/12.5)*12.5-250)/25;
  hover_Y=-1*(round_0(mouseY/12.5)*12.5-250)/25;
    
  push();
  fill(255);
  strokeWeight(2);
  stroke(0);
  circle(mouseX, mouseY, punkti_raadius);
  pop();
    
    
       if ((mouseX<=(width/2)) && (mouseY<=((height-teksti_kasti_korgus)/2))){
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX, mouseY, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX+11.5, mouseY+21);
    text("Y: "+hover_Y , mouseX+11.5, mouseY+41);
  } else if ((mouseX<=(width/2)) && (mouseY>=((height-teksti_kasti_korgus)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX, mouseY-60, 55, 55, 15);
    fill(0);
    text("X: "+hover_X, mouseX+11.5, mouseY-39);
    text("Y: "+hover_Y, mouseX+11.5, mouseY-19);
  } else if ((mouseX>=(width/2)) && (mouseY>=((height-teksti_kasti_korgus)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX-60, mouseY-60, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX-48.5,mouseY-39);
    text("Y: "+hover_Y, mouseX-48.5, mouseY-19);
  }else if ((mouseX>=(width/2)) && (mouseY<=((height-teksti_kasti_korgus)/2))) {
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

function Lopp(){

  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  
    INPUT_X.remove();
    INPUT_Y.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove();
    yl_text.remove();
    yl_text2.remove();
    result_text.remove();
    punkti_result.remove();
    TeX_vorrand.remove();
    TeX_punkti_koord.remove();
    
  infoNupp.remove();
  
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


function random_integer(n){
  randomInt=Math.floor(Math.random()*2*n)-n;
  return randomInt
}