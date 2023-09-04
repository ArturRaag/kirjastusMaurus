var init_X=[];
var init_Y=[];
var init_X2=[];
var init_Y2=[];
var init_X3=[];
var init_Y3=[];
var init_X4=[];
var init_Y4=[];

var Xc;
var Yc;
var Xc2;
var Yc2;
var Xc3;
var Yc3;
var Xc4;
var Yc4;

var node_radius=1;
var nr_nodes=25; // since the first and last nodes merge, we need to N+1 for N-nurk.
var slicer=1;
var slicer_mark=1;

var X_start=150;
var Y_start=200;
var X_start2=150;
var Y_start2=190;
var X_start3=150;
var Y_start3=180;
var X_start4=150;
var Y_start4=170;

var X_step=10;
var C1=(X_step*nr_nodes);
var r1=C1/(2*Math.PI);
var C2=2*Math.PI*(r1-(Y_start-Y_start2)); 
var C3=2*Math.PI*(r1-(Y_start-Y_start3)); 
var C4=2*Math.PI*(r1-(Y_start-Y_start4)); 
var X_step2=C2/25;
var X_step3=C3/25;
var X_step4=C4/25;

var rot_angle=-1;
var new_points_to_rotate_X;
var new_points_to_rotate_Y;

var new_points_to_rotate_X2;
var new_points_to_rotate_Y2;

var new_points_to_rotate_X3;
var new_points_to_rotate_Y3;

var new_points_to_rotate_X4;
var new_points_to_rotate_Y4;

var total_deg=0;

var tagged=false;

var toggle=false;

function setup() {
  
  PAUS=createButton("Paus");
  PAUS.style('padding','10px 20px');
  PAUS.style('background-color',"#00897B");
  PAUS.style('color','black');
  PAUS.style('border-radius','30px');
  PAUS.style('margin-top','30px');
  PAUS.style('margin-left','15px');
  PAUS.style("width","490px");
  PAUS.position(-10,345);

  raadius_html=createP("");
  perimeeter_html=createP("");
  ringi_pindala_html=createP("");
  kolmnurga_pindala_html=createP("");
  raadius_html.position(125,170);
  perimeeter_html.position(230,210);
  ringi_pindala_html.position(125,20);
  kolmnurga_pindala_html.position(225,20);
  raadius_html.style("color:white");
  perimeeter_html.style("color:white");
  ringi_pindala_html.style("color:white");
  kolmnurga_pindala_html.style("color:white");
  
  //frameRate(1)
  createCanvas(500, 400);
  stroke(255);
  
  // CREATE ARRAYS, initX ja initY
  for (i=0; i<nr_nodes; i++){
    init_X.push(X_start);
    init_Y.push(Y_start);
    X_start=X_start+X_step;
  }

  for (i=0; i<nr_nodes; i++){
    init_X2.push(X_start2);
    init_Y2.push(Y_start2);
    X_start2=X_start2+X_step2;
  }

  for (i=0; i<nr_nodes; i++){
    init_X3.push(X_start3);
    init_Y3.push(Y_start3);
    X_start3=X_start3+X_step3;
  }

  for (i=0; i<nr_nodes; i++){
    init_X4.push(X_start4);
    init_Y4.push(Y_start4);
    X_start4=X_start4+X_step4;
  }

 
}


function draw() {
  PAUS.mousePressed(pause_or_continute)
  background(25,25,25);
  
  // DRAW THE NODES AND LINES---------------
  for (i=0; i<=init_X.length-1; i++){
    circle(init_X[i],init_Y[i],node_radius);
    if (i>=1){
      line(init_X[i-1], init_Y[i-1],init_X[i], init_Y[i])
    }
  }

  for (i=0; i<=init_X2.length-1; i++){
    circle(init_X2[i],init_Y2[i],node_radius);
    if (i>=1){
      line(init_X2[i-1], init_Y2[i-1],init_X2[i], init_Y2[i])
    }
  }

  for (i=0; i<=init_X3.length-1; i++){
    circle(init_X3[i],init_Y3[i],node_radius);
    if (i>=1){
      line(init_X3[i-1], init_Y3[i-1],init_X3[i], init_Y3[i])
    }
  }

  for (i=0; i<=init_X4.length-1; i++){
    circle(init_X4[i],init_Y4[i],node_radius);
    if (i>=1){
      line(init_X4[i-1], init_Y4[i-1],init_X4[i], init_Y4[i])
    }
  }
  
  // DRAW THE NODES AND LINES---------------
  
  if (toggle==false){
  
  Xc=init_X[init_X.length-(slicer+1)];
  Yc=init_Y[init_Y.length-(slicer+1)];
  Xc2=init_X2[init_X2.length-(slicer+1)];
  Yc2=init_Y2[init_Y2.length-(slicer+1)];
  Xc3=init_X3[init_X3.length-(slicer+1)];
  Yc3=init_Y3[init_Y3.length-(slicer+1)];
  Xc4=init_X4[init_X4.length-(slicer+1)];
  Yc4=init_Y4[init_Y4.length-(slicer+1)];

  points_to_rotate_X=init_X.slice(init_X.length-slicer);
  points_to_rotate_Y=init_Y.slice(init_Y.length-slicer);
  points_to_rotate_X2=init_X2.slice(init_X2.length-slicer);
  points_to_rotate_Y2=init_Y2.slice(init_Y2.length-slicer);
  points_to_rotate_X3=init_X3.slice(init_X3.length-slicer);
  points_to_rotate_Y3=init_Y3.slice(init_Y3.length-slicer);
  points_to_rotate_X4=init_X4.slice(init_X4.length-slicer);
  points_to_rotate_Y4=init_Y4.slice(init_Y4.length-slicer);
  //console.log(total_deg)
  // Save the new "points to rotate" in next iteration

  new_points_to_rotate_X = rotatePoints(points_to_rotate_X, points_to_rotate_Y, Xc, Yc, rot_angle)[0];
  new_points_to_rotate_Y = rotatePoints(points_to_rotate_X, points_to_rotate_Y, Xc, Yc,rot_angle)[1];
  new_points_to_rotate_X2 = rotatePoints(points_to_rotate_X2, points_to_rotate_Y2, Xc2, Yc2, rot_angle)[0];
  new_points_to_rotate_Y2 = rotatePoints(points_to_rotate_X2, points_to_rotate_Y2, Xc2, Yc2,rot_angle)[1];
  new_points_to_rotate_X3 = rotatePoints(points_to_rotate_X3, points_to_rotate_Y3, Xc3, Yc3, rot_angle)[0];
  new_points_to_rotate_Y3 = rotatePoints(points_to_rotate_X3, points_to_rotate_Y3, Xc3, Yc3,rot_angle)[1];
  new_points_to_rotate_X4 = rotatePoints(points_to_rotate_X4, points_to_rotate_Y4, Xc4, Yc4, rot_angle)[0];
  new_points_to_rotate_Y4 = rotatePoints(points_to_rotate_X4, points_to_rotate_Y4, Xc4, Yc4,rot_angle)[1];


  total_deg=total_deg+rot_angle;
 
    init_X.splice(init_X.length-slicer, slicer, ...new_points_to_rotate_X);
    init_Y.splice(init_Y.length-slicer, slicer, ...new_points_to_rotate_Y);
    init_X2.splice(init_X2.length-slicer, slicer, ...new_points_to_rotate_X2);
    init_Y2.splice(init_Y2.length-slicer, slicer, ...new_points_to_rotate_Y2);
    init_X3.splice(init_X3.length-slicer, slicer, ...new_points_to_rotate_X3);
    init_Y3.splice(init_Y3.length-slicer, slicer, ...new_points_to_rotate_Y3);
    init_X4.splice(init_X4.length-slicer, slicer, ...new_points_to_rotate_X4);
    init_Y4.splice(init_Y4.length-slicer, slicer, ...new_points_to_rotate_Y4);

//     console.log(init_X.splice(init_X.length-slicer, slicer, ...new_points_to_rotate_X))
  if (abs(total_deg)>=180-((nr_nodes-2-1)*180)/(nr_nodes-1) ){
    total_deg=0;
    slicer=slicer+slicer_mark;
    if (slicer>=nr_nodes-1){
      slicer_mark=slicer_mark*(-1);
      rot_angle=rot_angle*(-1);
      slicer=slicer+slicer_mark;
    } else if (slicer<=0){

      slicer_mark=slicer_mark*(-1);
      rot_angle=rot_angle*(-1);
      slicer=slicer+slicer_mark;
    } 
  }

  }  
  
  push();
  stroke(255,0,0);
  strokeWeight(1.5);
  noFill();
  line(init_X[0],init_Y[0],init_X[0],160);
  line(400,200,150,160);
  circle(150,160,2);
  pop();
    
  
  
  katex.render("r", raadius_html.elt);
  katex.render("C=2 \\pi r", perimeeter_html.elt);
  katex.render("S_{\\bigcirc}=\\pi r^{2}", ringi_pindala_html.elt);
  katex.render("S_{\\bigtriangleup}= \\dfrac{a \\cdot h}{2} = \\dfrac{C \\cdot r }{2}=\\dfrac{ \\cancel{2}  \\pi r \\cdot r}{\\cancel{2}}=\\pi \\cdot r^{2}", kolmnurga_pindala_html.elt);
  
  
  ringi_pindala_html.position(25,40);
  kolmnurga_pindala_html.position(155,30);
  // katex.render("\\text{Punkte kokku }"+"(P_{k}): "+str(punktid_temp),koguPunktid_txt.elt);
    
}

const rotatePoints = function (X_massiiv,Y_massiiv, centerX, centerY, nurk){
  praegune_X=[];
  praegune_Y=[];
  for (i=0; i<=X_massiiv.length-1; i++){
        temporary_X=(X_massiiv[i]-centerX)*Math.cos(nurk*Math.PI/180)-(Y_massiiv[i]-centerY)*Math.sin(nurk*Math.PI/180)+centerX;
        temporary_Y=(X_massiiv[i]-centerX)*Math.sin(nurk*Math.PI/180)+(Y_massiiv[i]-centerY)*Math.cos(nurk*Math.PI/180)+centerY;

      praegune_X.push(temporary_X);
      praegune_Y.push(temporary_Y);
  }
  return [praegune_X, praegune_Y]
}


function pause_or_continute(){
  if (toggle==true){
    toggle=false
    PAUS.html("Jätka");
    PAUS.style('background-color',"#00897B");
    PAUS.style('color','black');
    PAUS.html("Stop")
  } else if (toggle==false){
    toggle=true
    PAUS.html("Paus");
    PAUS.style('background-color','#FF8F00');
    PAUS.style('color','black');
    PAUS.html("Jätka")
  };
}
