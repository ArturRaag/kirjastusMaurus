var X=[];
var Y=[];
var tous=1;
var vabaliige = 0;
var slider1;
var slider2;
var input_tous;

var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;


function setup() {
  createCanvas(500,500);
  slider1 = createSlider(-10, 10, tous, 0.1);
  slider1.size(width/3);
  slider1.position(width*0.65,height+10);
  slider2=createSlider(-10, 10, vabaliige, 0.1);
  slider2.size(width/3);
  slider2.position(width*0.65, height+50);
  
  input_tous = createInput();
  input_tous.size(50);
  input_vabaliige=createInput();
  input_vabaliige.size(50);
  input_tous.position(slider1.x-170, slider1.y);
  input_vabaliige.position(slider2.x-170, slider2.y);
  slider1.input(slider1Change);
  slider2.input(slider2Change);
  
  nupp = createButton("Sisesta");
  nupp.size(90,60);
  nupp.position(slider1.x-100, (slider1.y+slider2.y)/2-20);
  nupp.mousePressed(updateSliders);
  input_tous.value(slider1.value());
  input_vabaliige.value(slider2.value());
  
  TeX_funktsioon=createP("");
  TeX_funktsioon.position(250,567);
  
  tekst_joonisel = createP("Funktsiooni &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp  &nbsp &nbsp  graafik.");
  tekst_joonisel.position(width/3, height+70);
  tekst_tous=createP("tous ''k'': ");
  tekst_tous.position(slider1.x-240, slider1.y-15);
  
  tekst_vabaliige=createP("Vabaliige ''b'':");
  tekst_vabaliige.position(slider2.x-270, slider2.y-15);
}


function draw() {
  background(255);
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
  graafik(xmin, xmax, jaotiste_arv); //parameetrid: (x_min, x_max, jaotiste_arv)
  
  var vabaliige=0;
  
  if (slider2.value()>=0){
    vabaliige="+"+str(slider2.value());
  } else if (slider2.value()<0){
    vabaliige=str(slider2.value());
  }
  
  LaTeX_string="y="+str(slider1.value())+"x"+vabaliige;
  katex.render(LaTeX_string, TeX_funktsioon.elt);
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
    stroke(0);
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
  
  
function graafik(xmin, xmax, jaotiste_arv) {
  input_tous.value();
  //----- Määramispiirkond X -----
  for (var i = xmin; i <= xmax; i = i+1) {
    X[i+1000]=i; }
  //----- Muutumispiirkond Y -----
  for (var j = 0; j<=X.length; j=j+1) {
    Y[j]=(slider1.value())*X[j]+slider2.value();
  }
  //-----PUNKTID-----
  for (var k=0; k<=X.length; k=k+1) {
    circle(X[k]*(width/jaotiste_arv)+width/2, Y[k]*(height/jaotiste_arv)*(-1)+height/2, 0);  
    if (k>=1) {
      stroke(0, 140, 205);
      strokeWeight(2);
      line(X[k-1]*(width/jaotiste_arv)+width/2, Y[k-1]*(height/jaotiste_arv)*(-1)+height/2, X[k]*(width/jaotiste_arv)+width/2, Y[k]*(height/jaotiste_arv)*(-1)+height/2);
  }
  }
}

function slider1Change() {
 //if the slider is changed, update the textbox
 input_tous.value(slider1.value());
}

function slider2Change() {
  //if the slider is changed, update the textbox
  input_vabaliige.value(slider2.value());
}

function updateSliders() {
 slider1.value(input_tous.value()); 
 slider2.value(input_vabaliige.value()); 
}
