function setup() {
  createCanvas(600, 400);
  point_A=[width/2,150]
  point_B=[width/2+100,300]
  point_C=[width/2-100,300]
  
  valem=createP("abc");
  valem.position(50,20);
  valem.style("color","white");
  
  alus_txt=createP("");
  alus_txt.position(width/2,300);
  alus_txt.style("color","white");
  
  korgus_txt=createP("");
  korgus_txt.position(width/2+10,250);
  korgus_txt.style("color","white");
  
  dotColor=color(100,180,200)
}

function draw() {
  background(15,30,60);
  
  alus=point_B[0]-point_C[0];
  korgus=point_B[1]-point_A[1];
  
  push();
  stroke(100,170,200);
  strokeWeight(2);
  beginShape();
    vertex(point_A[0], point_A[1]);
    vertex(point_A[0], point_B[1]);
  endShape();
  pop();
  
  
  // triangle
  push();
  noFill();
  stroke(100,180,200);
  strokeWeight(3);
  beginShape()
    vertex(point_A[0],point_A[1]);
    vertex(point_B[0],point_B[1]);
    vertex(point_C[0],point_C[1]);
  endShape(CLOSE);
  pop();
  
  // Dot at top
  push();
  // noFill();
  fill(dotColor);
  stroke(dotColor);
  strokeWeight(3);
  circle(point_A[0],point_A[1],10);
  push();
  noFill()
  strokeWeight(2);
  circle(point_A[0],point_A[1],22);
  pop();
  pop();
  
  katex.render("h="+str(point_B[1]-point_A[1]), korgus_txt.elt);
  katex.render("S=\\dfrac{"+str(alus)+"\\cdot"+str(korgus)+"}{2}="+str((alus*korgus)/2),valem.elt);
  katex.render("a="+str(alus), alus_txt.elt);
  dotColor=color(100,180,200)
  
}

function mouseDragged(){
  if (mouseX<=width && mouseX>=0 && mouseY <= height && mouseY>=0){  
    point_A=[mouseX,point_A[1]]
    dotColor=color(204,102,0);
    korgus_txt.position(mouseX+10,250);
  } 
}

function mousePressed(){
    if (mouseX<=width && mouseX>=0 && mouseY <= height && mouseY>=0){  
    point_A=[mouseX,point_A[1]]
    dotColor=color(204,102,0);
    korgus_txt.position(mouseX+10,250);
  } 
}
