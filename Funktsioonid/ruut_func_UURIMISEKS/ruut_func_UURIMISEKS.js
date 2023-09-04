var X=[];
var Y=[];

var a=1;
var b = 0;
var c=0;
var slider1;
var slider2;
var slider3;
var input_a;
var input_b;
var input_c;

var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;


function setup() {
  createCanvas(500,500);
  slider1 = createSlider(-10, 10, a, 0.1);
  slider1.size(width/3);
  slider1.position(width*0.65,height+10);
  slider2=createSlider(-10, 10, b, 0.1);
  slider2.size(width/3);
  slider2.position(width*0.65, height+50);
  slider3 = createSlider(-10, 10, c, 0.1);
  slider3.size(width/3);
  slider3.position(width*0.65,height+90);
  
  input_a = createInput();
  input_a.size(50);
  input_b=createInput();
  input_b.size(50);
  input_c=createInput();
  input_c.size(50);
  input_a.position(slider1.x-170, slider1.y);
  input_b.position(slider2.x-170, slider2.y);
  input_c.position(slider3.x-170, slider3.y);
  slider1.input(slider1Change);
  slider2.input(slider2Change);
  slider3.input(slider3Change);
  
  nupp = createButton("Sisesta");
  nupp.size(90,90);
  nupp.position(slider1.x-100, (slider1.y+slider3.y)/2-35);
  nupp.mousePressed(updateSliders);
  input_a.value(slider1.value());
  input_c.value(slider2.value());
  input_b.value(slider3.value());
  
  
  TeX_funktsioon=createP("");
  TeX_funktsioon.position(210,608);
  
  tekst_joonisel = createP("Funktsiooni <br> graafik.");
  tekst_joonisel.position(width/4, height+110);
  
  
  tekst_a=createP("Kordaja ''a'': ");
  tekst_a.position(slider1.x-260, slider1.y-15);
  
  tekst_b=createP("Kordaja ''b'':");
  tekst_b.position(slider2.x-260, slider2.y-15);
  
  tekst_c=createP("Kordaja ''c'':");
  tekst_c.position(slider3.x-260,slider3.y-15);
  
}


function draw() {
  background(255);
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
  graafik(xmin, xmax, jaotiste_arv); //parameetrid: (x_min, x_max, jaotiste_arv)
  
  var vabaliige=0;
  var lineaarliige=0;
  
  if (slider2.value()>=0){
    lineaarliige ="+"+str(slider2.value());
  } else if (slider2.value()<0){
    lineaarliige=str(slider2.value());
  }
  
    if (slider3.value()>=0){
    vabaliige ="+"+str(slider3.value());
  } else if (slider3.value()<0) {
    vabaliige=str(slider3.value());
  }
  
  LaTeX_string="y="+str(slider1.value())+"x^{2}"+lineaarliige+"x"+vabaliige;
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
  //----- Määramispiirkond X -----
  for (var i = xmin, i_2=0; i <= xmax; i = i+0.1, i_2=i_2+1) {
    X[i_2]=parseFloat(i.toFixed(1)); }
  //----- Muutumispiirkond Y -----
  for (var j = 0; j<=X.length; j=j+1) {
    Y[j]=(slider1.value())*pow(X[j],2)+slider2.value()*X[j]+slider3.value();
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
 input_a.value(slider1.value());
}

function slider2Change() {
  //if the slider is changed, update the textbox
  input_b.value(slider2.value());
}

function slider3Change() {
 input_c.value(slider3.value()); 
}

function updateSliders() {
 slider1.value(input_a.value()); 
 slider2.value(input_b.value());
 slider3.value(input_c.value());
}
