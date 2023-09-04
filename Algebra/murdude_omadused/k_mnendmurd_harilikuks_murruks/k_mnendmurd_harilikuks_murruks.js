
var asukoha_nr=10;
var ülesannete_loendur=0;
var õige_vastus=0;
var lõpetamise_tingimus=false;


// ----------------------------------------- HTML ToolTip -------------------------------------------

var tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(255, 255, 255, 255)";
tooltip.style.color = "black";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="540px"
document.body.appendChild(tooltip);

var regularText = document.createElement("div");
regularText.innerHTML = "Sisesta lugejasse ning nimetajasse sobivad täisarvud.<br>Õigeks loetakse nii taandatud kui ka taandamata kuju.<br><br>";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ="\\text{Näiteks: } 5.793= \\dfrac{5793}{1000}."
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
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas=createCanvas(windowWidth, 580);
  canvas.position(0,0);
  write_texts();
  Reset();
  
}

function draw() {
  clear();
  background(251,253,255);
  katex.render(KaTeX_EQ, katexEquation);
  
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  lugeja.position(width/asukoha_nr+78,height/asukoha_nr+41);
  nimetaja.position(width/asukoha_nr+78,height/asukoha_nr+76);
  tex_võrrand.position(width/asukoha_nr+71,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+150);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+150);
  RESET_NUPP.mousePressed(Reset);
  
  
  LÕPETA_NUPP.mousePressed(Lõpp);
  LÕPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+220);
  
  if(lõpetamise_tingimus==true){
    
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
  
//   console.log(lugeja.value(),nimetaja.value(), lugeja.value()/nimetaja.value(), kymnendmurd);
  
}


function Reset(){
  
  if(ülesannete_loendur>0){
    
    lugeja.remove();
    nimetaja.remove();
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LÕPETA_NUPP.remove();
  }
  
  Ylesanne();
  tulemus.html("");
  
  lugeja=createInput();
  lugeja.position(width/asukoha_nr+70,height/asukoha_nr+41);
  lugeja.size(35,20);
  nimetaja=createInput();
  nimetaja.position(width/asukoha_nr+70,height/asukoha_nr+76);
  nimetaja.size(35,20);
  
  
  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+200);
  
  RESET_NUPP=createButton("Uus ülesanne");
   RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+200);
  
  LÕPETA_NUPP=createButton("Lõpeta test");
  LÕPETA_NUPP.style('padding','10px 20px');
  LÕPETA_NUPP.style('background-color','LightSteelBlue');
  LÕPETA_NUPP.style('color','black');
  LÕPETA_NUPP.style('font-weight','bold');
  LÕPETA_NUPP.style('border-radius','30px');
  LÕPETA_NUPP.style('margin-top','30px');
  LÕPETA_NUPP.style('margin-left','80px');
  LÕPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+200);
  
  ülesannete_loendur=ülesannete_loendur+1;
}


function Ylesanne(){
  jagaja=random([1,10,100,1000,10000]);
  kymnendmurd = round_4(int(random(1,1000))/jagaja);
  yl_text.html("Teisenda arv  harilikuksmurruks.<br> <br>"+kymnendmurd+" =")
}


function write_texts(){
  tex_võrrand=createDiv("");
  tex_võrrand.position(width/asukoha_nr+63,height/asukoha_nr+60)
  
  tex_string="\\dfrac{ \\hspace{10mm}   }{ \\hspace{10mm} }";
  katex.render( tex_string, tex_võrrand.elt);
  
  yl_text=createDiv("");
  yl_text.style("font-size","20px");
  yl_text.style("line-height","140%")
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createDiv("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
}

function kontroll(){
  
  if(typeof float(lugeja.value()) == 'number' && !isNaN(float(lugeja.value())) && typeof float(nimetaja.value()) == 'number' && !isNaN(float(nimetaja.value()))){
    
        // check if it is integer
        if (Number.isInteger(float(lugeja.value())) && Number.isInteger(float(nimetaja.value()))) {
           if ( (lugeja.value()/nimetaja.value()) == kymnendmurd){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              õige_vastus=õige_vastus+1;
            } else {
              tulemus.html("Vale!");
              tulemus.style("color","red");
            }
        }
        else {
            tulemus.html("Komaga arvud ei tohi nimetajas ega lugejas olla!");
            tulemus.style("color","red");
        }
    
    } else {
        tulemus.html("Puuduvad numbrid!");
        tulemus.style("color","red");
    }

}


function Lõpp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LÕPETA_NUPP.attribute("disabled","");
  
  infoNupp.remove();

  tex_võrrand.remove();
  lugeja.remove();
  nimetaja.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LÕPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  
  
  Tulemus=createP("Tulemus: "+str(round_2((õige_vastus/ülesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ülesannete_loendur)+"<br>Õigeid lahendusi: "+str(õige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  
  lõpetamise_tingimus=true;
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