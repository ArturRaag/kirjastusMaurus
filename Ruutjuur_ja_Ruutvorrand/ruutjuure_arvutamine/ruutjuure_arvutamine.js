
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var l6petamise_tingimus=false;


// ----------------------------------------- MATHQUILL KRAAM-----------------------------------------
var MQ = MathQuill.getInterface(2);
var answerSpan = document.getElementById('answer');
answerSpan.style.backgroundColor="white";
answerSpan.style.width="10px"
var latexSpan = document.getElementById('lihtsam');
var latexTEXT = document.getElementById('latex');
var answerMathField = MQ.MathField(answerSpan, {
                handlers: {
                edit: function() {
                    var enteredMath = answerMathField.latex();
                    latexSpan.textContent = answerMathField.text()// Get entered math in LaTeX format   
                    latexTEXT.textContent=answerMathField.latex();
                }
                }
            });
// ----------------------------------------- MATHQUILL KRAAM-----------------------------------------



// ----------------------------------------- HTML ToolTip -------------------------------------------

var tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.95)"
tooltip.style.color = "white";
tooltip.style.borderRadius="25px";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="540px"
document.body.appendChild(tooltip);

var regularText = document.createElement("div");
regularText.innerHTML = "Kui arv ei ole ilusti juuritav, siis jaota juurealune teguriteks. Tegurite seast peaks üks tegur olema kindlasti juuritav. Õigeks loetakse sellist vastust, kus juure alune arv ei ole enam tegurduv.<br><br>Ruutjuure sümboli sisestamiseks kasuta ruutjuure nupu või trükki tekstivälja \\sqrt ning vajuta tühikut või enterit.<br><br>" ;
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ="\\text{Näiteks. Ruutjuure } \\sqrt{96} \\text{ täpne väärtus: } \\sqrt{96}=\\sqrt{16 \\cdot 6}=4 \\sqrt{6}"
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
document.body.appendChild(infoNupp);

infoNupp.addEventListener("mouseenter", function() {
  tooltip.style.left = (infoNupp.offsetLeft + infoNupp.offsetWidth) + "px";
  tooltip.style.top = (infoNupp.offsetTop + infoNupp.offsetHeight) + "px";
  infoNupp.style.background="darkgrey"
  tooltip.style.display = "block";
});

infoNupp.addEventListener("mouseleave", function() {
  tooltip.style.display = "none";
  infoNupp.style.background="transparent"
});

// ----------------------------------------- HTML ToolTip -------------------------------------------


function windowResized() {
  resizeCanvas(windowWidth, 550, WEBGL);
}
// 

function setup() {
  canvas=createCanvas(windowWidth,550,WEBGL);
  //canvas.position(0,0);
  write_texts();
  Reset();
  document.getElementById("lihtsam").style.visibility = "hidden";
  document.getElementById("latex").style.visibility = "hidden";
    stroke(100,180,200);
    strokeWeight(4);
    let fov= PI/3;
    let cameraZ=(height/2.0)/tan(fov/2.0);
    perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
}

function draw() {
  clear();
    background(251,253,255);
  
    katex.render(KaTeX_EQ, katexEquation);
  
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+130);
  
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  RUUTJUUR.position(width/asukoha_nr-90,height/asukoha_nr+150);
  RUUTJUUR.mousePressed(ruutjuure_mark_MQ);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  L6PETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  L6PETA_NUPP.mousePressed(L6pp);
  
//   juhised_text.position(width/asukoha_nr-20,height/asukoha_nr+25);
  
  
  // console.log(tex_v6rrand.size)
  if(l6petamise_tingimus==true){
    background(15,30,60);
    new_step();
    orbitControl(4,4,0.01);
    rotateY(angle);
    rotateZ(angle*0.5);
    beginShape(POINTS);
    for (i=0;i<=empty_vec.length-1;i++){
      vertex(empty_vec[i].x,empty_vec[i].y, empty_vec[i].z);
      }
      endShape();
  angle=angle+0.01;
  camera(0, 0, 300 - sin(frameCount * 0.001) * 200, 0, 0, 0, 0, 1, 0);
  if (empty_vec.length >=100000){
      empty_vec=[];
      X=0;
      Y=0;
      Z=0;
    }
  }
  
}

function Reset(){
  
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    L6PETA_NUPP.remove();
    RUUTJUUR.remove();
  }
  
  Ylesanne();
  tulemus.html("");
  
  var answerMathField = MQ.MathField(answerSpan);
  answerMathField.focus();
  answerMathField.latex("");
  
  
  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+300);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.id("reset");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+300);
  
  L6PETA_NUPP=createButton("Lõpeta test");
  L6PETA_NUPP.style('padding','10px 20px');
  L6PETA_NUPP.style('background-color','LightSteelBlue');
  L6PETA_NUPP.style('color','black');
  L6PETA_NUPP.style('font-weight','bold');
  L6PETA_NUPP.style('border-radius','30px');
  L6PETA_NUPP.style('margin-top','30px');
  L6PETA_NUPP.style('margin-left','80px');
  L6PETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
  // juhised_text=createP("Juhised");
  // juhised_text.style("color","grey");
  // juhised_text.style("font-style","oblique");
  // juhised_text.style('padding','10px 20px');
  // juhised_text.position(width/asukoha_nr-20,height/asukoha_nr+25);
  
 
  RUUTJUUR=createButton("");
  RUUTJUUR.id('ruutjuur');
  RUUTJUUR.style('color','black');
  RUUTJUUR.style('padding','5px 10px');
  RUUTJUUR.style('margin-top','30px');
  RUUTJUUR.style('margin-left','90px');
  RUUTJUUR.position(width/asukoha_nr+200,height/asukoha_nr+200);
  katex.render("\\sqrt{\\hspace{3mm} }",RUUTJUUR.elt);
  
  ylesannete_loendur=ylesannete_loendur+1;

}

function Ylesanne(){
  
  yl_text.html("Leia ruutjuure täpne väärtus.");
  
  mudel=["1","2"];
  mudeli_valik=random(mudel);
  //console.log(mudeli_valik);

  if (mudeli_valik=="1"){

    init_num=(random(0,25));
    console.log(init_num)
    ymardamine = random(["0","1"]);
    console.log(ymardamine)
    if (ymardamine=="0"){
      vastus=round_0(init_num);
    } else if (ymardamine=="1"){
      vastus=round_1(init_num);
    }
    console.log(vastus)
    antav_ylesanne="\\sqrt{"+ ((vastus*10)*(vastus*10))/(10*10)+"}"
    vastus_kontrolliks=vastus;
  }
  
  
    if (mudeli_valik=="2"){
          init_num1=int((random(2,10)));
          init_num2=random([2,3,5,6,7]); 
      
          antav_ylesanne=" \\sqrt{"+(init_num1*init_num1)*init_num2 +"} "
          console.log("Juure ees olev arv:"+ init_num1,"Juure all olev arv:"+init_num2);
          vastus=str(init_num1)+"sqrt("+init_num2+")"
          vastus_kontrolliks =vastus
    }
      
      
    //console.log(antav_ylesanne)
    // console.log(vastus_kontrolliks)
   tex_string=antav_ylesanne+"=";
   katex.render( tex_string, tex_v6rrand.elt);
  
  
}


function write_texts(){
  
  tex_v6rrand=createP("");
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_v6rrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  // tex_v6rrand.parent("test");
  MathQuill_v6rrand=select("#answer");
  // MathQuill_v6rrand.parent(tex_v6rrand)
  // MathQuill_v6rrand.style("width: 80%; float: right; font-size: 24px; margin: 30px auto;");
  
  MathQuill_v6rrand.style(" width: 80%; margin-top: 70px auto; font-size: 24px;")
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
}

function kontroll(){
  sisu=document.getElementById("lihtsam").textContent;
  //console.log("KONTROLL: ")
console.log("MQ sisu: ", sisu);
     
       //console.log("Vastus võrdlemiseks: ", vastus_kontrolliks)
           if (str(sisu) == vastus_kontrolliks && str(sisu).length>0){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              oige_vastus=oige_vastus+1;
             //console.log("õige")
            } else {
              tulemus.html("Viga!");
              tulemus.style("color","red");
            }
}


function ruutjuure_mark_MQ(){
  var answerMathField = MQ.MathField(answerSpan);
  document.getElementById("ruutjuur").onclick = function () {
  answerMathField.focus();
  answerMathField.cmd("\\sqrt");
};
  
}

function L6pp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  L6PETA_NUPP.attribute("disabled","");
  RUUTJUUR.attribute("disabled","");
  
  tex_v6rrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  L6PETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_v6rrand.remove();
  RUUTJUUR.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  l6petamise_tingimus=true;
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

function round_4(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10000)/10000 )
}

function liikmete_SUM(massiiv){
  temp_summa=0;
  for (i=0; i<=massiiv.length-1; i++){
    temp_summa=temp_summa+massiiv[i];
  }
    return temp_summa
}

// for end screen
empty_vec=[]
function new_step(){
  
    direction=random(["up","down","left","right","forward","back"]);
    if (direction=="up"){
      X=X+step;
    } else if (direction == "down"){
      X=X-step;
    } else if (direction=="left"){
      Y=Y-step;
    } else if (direction=="right"){
      Y=Y+step;
    } else if (direction=="forward"){
      Z=Z+step;
    } else if (direction=="back"){
      Z=Z-step;
    }
  vek=createVector(X,Y,Z);
  empty_vec.push(vek);
}




function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}  
  
function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
   
       // Generate random number
       var j = Math.floor(Math.random() * (i + 1));
                   
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }
       
   return array;
}
  

  