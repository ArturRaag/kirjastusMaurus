var x1=-50;
var x2=100;
var y1=-100;
var y2=100;
var z1=-50;
var z2=50;
var rotation=0.25;
var toggle=true;
var t=0;
var step=1;

function preload() {
  f = loadFont('Quicksand_Book.otf');
}


function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);

  stroke(100,180,200);
  strokeWeight(2);
  noFill();

  alus=Math.floor(Math.random()*100);
  korgus=Math.floor(Math.random()*100);
  console.log(alus,korgus);
  
  
  
  spin=createButton("Stop");
  spin.mousePressed(stop_rotate);
  spin.style('padding','10px 20px');
  spin.style('background-color',"#00897B");
  spin.style('color','black');
  spin.style('border-radius','30px');
  spin.style('margin-top','30px');
  spin.style('margin-left','15px');
  spin.style("width","570px");
  spin.position(0,530);
}

function draw() {
  
  background(15,30,60);
  orbitControl(4,4,0.01);
  
  if (toggle==true){
    rotateY(t * rotation);
  } else if (toggle==false){
        rotateY(t * rotation);
  }
  beginShape();
  
  vertex(-70,50,-70);
  vertex(70,50,-70);
  vertex(70,50,70);
  vertex(-70,50,70);
  vertex(-70,50,-70);
  
  vertex(0,-200,0);//Püramiidi tipp 
  vertex(-70,50,-70);//Põhi, P1
  
  vertex(0,-200,0);//Püramiidi tipp 
  vertex(70,50,-70);//Põhi, P2
  
  vertex(0,-200,0);//Püramiidi tipp 
  vertex(70,50,70);//Põhi, P3
  
  vertex(0,-200,0);//Püramiidi tipp 
  vertex(-70,50,70);//Põhi, P4
  
  vertex(0,-200,0);//Püramiidi tipp 
  vertex(0,50,0);//Põhi, P4
  
  endShape();

  // ALUS
  push();
  textFont(f);
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  // move text on Z plane
  translate(0, 170, 70);
  // draw text with translation on X plane
  text('a = '+str(alus), 0, -100);
  pop();
  
  push();
  textFont(f);
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  // move text on Z plane
  translate(50, 100, 0);
  // draw text with translation on X plane
  text('h =' +str(korgus), 0, -100);
  pop();
  
  t=t+step;
  
}

function stop_rotate(){
  if (toggle==true){
    toggle=false;
    step=0;
    spin.style('background-color','#FF8F00');
    spin.style('color','black');
    spin.html("Jätka")
  } else if (toggle==false){
    toggle=true;
    step=1;
    spin.style('background-color',"#00897B");
    spin.style('color','black');
    spin.html("Stop")
  }
}