var active_pA=false;
var active_pB=false;
var active_pC=false;

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
  dotColorA=color(100,180,200);
  dotColorB=color(100,180,200);
  dotColorC=color(100,180,200);
}

function draw() {
  background(15,30,60);
  
  alus=point_B[0]-point_C[0];
  korgus=abs(point_B[1]-point_A[1]);
  
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
  
  // Dot A
  push();
  // noFill();
  fill(dotColorA);
  stroke(dotColorA);
  strokeWeight(3);
  circle(point_A[0],point_A[1],10);
  push();
  noFill()
  strokeWeight(2);
  circle(point_A[0],point_A[1],22);
  pop();
  pop();
  
  //dot B
   push();
  // noFill();
  fill(dotColorB);
  stroke(dotColorB);
  strokeWeight(3);
  circle(point_B[0],point_B[1],10);
  push();
  noFill()
  strokeWeight(2);
  circle(point_B[0],point_B[1],22);
  pop();
  pop();
  
  //dot C
   push();
  // noFill();
  fill(dotColorC);
  stroke(dotColorC);
  strokeWeight(3);
  circle(point_C[0],point_C[1],10);
  push();
  noFill()
  strokeWeight(2);
  circle(point_C[0],point_C[1],22);
  pop();
  pop();
  
  
  
  katex.render("h="+str(abs(korgus)), korgus_txt.elt);
  katex.render("S=\\dfrac{a \\cdot h}{2}=\\dfrac{"+str(abs(alus))+"\\cdot"+str(abs(korgus))+"}{2}="+str(abs((alus*korgus)/2)),valem.elt);
  katex.render("a="+str(abs(alus)), alus_txt.elt);
  dotColorA=color(100,180,200);
  dotColorB=color(100,180,200);
  dotColorC=color(100,180,200);
  
  
}

function mouseDragged(){
  
  //check if mouse is at point A (top node) position when clicked
  if (mouseX<=(point_A[0]+22)  && mouseX>=(point_A[0]-22) && mouseY<=(point_A[1]+22) && mouseY>=(point_A[1]-22) ) {
    active_pA=true;
    active_pB=false;
    active_pC=false;
    if (mouseX<=width && mouseX>=0 && mouseY <= height && mouseY>=0 && active_pA==true && active_pB==false && active_pC==false ){  
      point_A=[mouseX,mouseY]
      dotColorA=color(204,102,0);
      korgus_txt.position(mouseX+10,250);
  }
  } else{
      active_pA=false;
  }
  
  //check if mouse is at point B position when clicked
  if (mouseX<=(point_B[0]+22)  && mouseX>=(point_B[0]-22) && mouseY<=(point_B[1]+22) && mouseY>=(point_B[1]-22) ) {
    active_pA=false;
    active_pB=true;
    active_pC=false;
    if (mouseX<=width && mouseX>=0 && mouseY <= height && mouseY>=0 && active_pA==false && active_pB==true && active_pC==false){  
      point_B=[mouseX,point_B[1]]
      dotColorB=color(204,102,0);
      // alus_txt.position(mouseX+10,250);
  } 
  } else if (mouseX<=(point_C[0]+22)  && mouseX>=(point_C[0]-22) && mouseY<=(point_C[1]+22) && mouseY>=(point_C[1]-22) ) {
    active_pA=false;
    active_pB=false;
    active_pC=true;
    if (mouseX<=width && mouseX>=0 && mouseY <= height && mouseY>=0 && active_pA==false && active_pB==false && active_pC==true){  
      point_C=[mouseX,point_C[1]]
      dotColorC=color(204,102,0);
      // alus_txt.position(mouseX+10,250);
  } 
  }
}
