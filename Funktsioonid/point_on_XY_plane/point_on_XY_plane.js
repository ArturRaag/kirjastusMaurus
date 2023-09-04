var X=[];
var Y=[];
var x_koord=0.0, y_koord=0.0;

var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;


function setup() {
  createCanvas(500,500);
  x_koord=width/2;
  y_koord=height/2;
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
}


function draw() {
  background(255);
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
  create_a_Point();
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

function mouseDragged() {
  x_koord=mouseX
  y_koord=mouseY
  
}
function mousePressed() {
  x_koord=mouseX
  y_koord=mouseY
  
}

function create_a_Point(){
  fill(255,204,0);
  circle(round(x_koord/12.5)*12.5, round(y_koord/12.5)*12.5, 10);
  
  if ((x_koord<=(width/2)) && (y_koord<=(height/2))){
    strokeWeight(0);
    fill(116,187,251,200);
    rect((round(x_koord/12.5)*12.5)+5, (round(y_koord/12.5)*12.5)+5, 55, 55, 15);
    fill(0);
    text("X: "+ round(((x_koord-width/2)/((width/2)/10))*2)/2, (round(x_koord/12.5)*12.5)+11.5,(round(y_koord/12.5)*12.5)+21);
    text("Y: "+round(((-1)*(y_koord-(height/2))/((height/2)/10))*2)/2 , (round(x_koord/12.5)*12.5)+11.5, (round(y_koord/12.5)*12.5)+41);
  } else if ((x_koord<=(width/2)) && (y_koord>=(height/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect((round(x_koord/12.5)*12.5), (round(y_koord/12.5)*12.5)-60, 55, 55, 15);
    fill(0);
    text("X: "+ round(((x_koord-(width/2))/((width/2)/10))*2)/2, (round(x_koord/12.5)*12.5)+11.5,(round(y_koord/12.5)*12.5)-39);
    text("Y: "+round(((-1)*(y_koord-(height/2))/((height/2)/10))*2)/2, (round(x_koord/12.5)*12.5)+11.5, (round(y_koord/12.5)*12.5)-19);
  } else if ((x_koord>=(width/2)) && (y_koord>=(height/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect((round(x_koord/12.5)*12.5)-60, (round(y_koord/12.5)*12.5)-60, 55, 55, 15);
    fill(0);
    text("X: "+ round(((x_koord-(width/2))/((width/2)/10))*2)/2, (round(x_koord/12.5)*12.5)-48.5,(round(y_koord/12.5)*12.5)-39);
    text("Y: "+round(((-1)*(y_koord-(height/2))/((height/2)/10))*2)/2, (round(x_koord/12.5)*12.5)-48.5, (round(y_koord/12.5)*12.5)-19);
  }else if ((x_koord>=(width/2)) && (y_koord<=(height/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect((round(x_koord/12.5)*12.5)-60, (round(y_koord/12.5)*12.5), 55, 55, 15);
    fill(0);
    text("X: "+ round(((x_koord-(width/2))/((width/2)/10))*2)/2, (round(x_koord/12.5)*12.5)-48.5,(round(y_koord/12.5)*12.5)+21);
    text("Y: "+round(((-1)*(y_koord-(height/2))/((height/2)/10))*2)/2, (round(x_koord/12.5)*12.5)-48.5, (round(y_koord/12.5)*12.5)+41);
  }


}
