var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

var alt_vastused1=[];
var alt_vastused2=[];

var vastused_korras=false;

var inputX1, inputX2, inputX3, inputX4, inputX5
var table;

var hypotenuus, kat_A, kat_B, alfa, beta; // vars used in YLESANNE() function


window.onload = function() {
  // ----------------------------------------- HTML ToolTip ------------------------------------------

tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.95)"
tooltip.style.color = "white";
tooltip.style.borderRadius="25px";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="340px"
document.body.appendChild(tooltip);

regularText = document.createElement("div");
regularText.innerHTML = "Arvutatud kaateti või hüpotenuusi pikkusi ümarda vajadusel kümnendikeni.<br><br>Arvutatud nurgad tuleb aga ümardada täis kraadideni.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ=""
katexEquation = document.createElement("div");
tooltip.appendChild(katexEquation);


// Info nuppu funktsionaalsus
infoNupp = document.createElement("button");
infoNupp.innerHTML = "i";
infoNupp.style.position = "absolute";
infoNupp.style.margin="20px";
infoNupp.style.top="12px";
infoNupp.style.left="5px";
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
  
};



function setup() {
  
  canvas=createCanvas(600,580,WEBGL);

  // ------------------------------HTML TABLE--------------------------------------------------

// create a new HTML table element
var table = document.createElement("table");
table.setAttribute("id", "myTable");
table.style.zIndex="1"
// set the width of the table to 400px
table.style.width = "400px";

  table.style.position = "absolute";
  table.style.left = "35px";
  table.style.top = "330px";
  
// add border styles to the table and td elements
table.style.border = "1px solid black";
var td = document.createElement("td");
td.style.border = "1px solid black";

for (var i = 0; i < 1; i++) {
  var row = document.createElement("tr");

  // add the labels "a", "b", "c", "d", "e" to the top row of the table
  var labels = ["a", "b", "c", "\u03B1", "\u03B2"];
  for (var j = 0; j < labels.length; j++) {
    var labelCell = document.createElement("td");
    var labelText = document.createTextNode(labels[j]);
    labelCell.appendChild(labelText);
    row.appendChild(labelCell);
  }

  // append the top row to the table
  table.appendChild(row);

  // create the second row with input fields as before
  var row2 = document.createElement("tr");

  for (var j = 0; j < 5; j++) {
    var cell = document.createElement("td");
    var sisend = document.createElement("input");
    
    // set the width of the input element to 70px
    sisend.style.width = "70px";

    // set the input element's type attribute to "text"
    sisend.setAttribute("type", "text");

    // add an ID to the input element
    sisend.setAttribute("id", "sisend" + ((i * 5) + j + 1));

    // add an event listener to the input element to capture user input
    sisend.addEventListener("input", function() {
      // get the current value of the input field
      var inputValue = this.value;

      // assign the current value of the input field to the appropriate variable
      switch (this.id) {
        case "sisend1":
          inputX1 = inputValue;
          break;
        case "sisend2":
          inputX2 = inputValue;
          break;
        case "sisend3":
          inputX3 = inputValue;
          break;
        case "sisend4":
          inputX4 = inputValue;
          break;
        case "sisend5":
          inputX5 = inputValue;
      }
    });

    // append the input element to the table cell
    cell.appendChild(sisend);

    // append the table cell to the second row
    row2.appendChild(cell);
  }

  // append the second row to the table
  table.appendChild(row2);
}

// append the table to the HTML document
document.body.appendChild(table);


    // set the canvas element as the parent of the HTML table
  canvas.elt.parentNode.insertBefore(table, canvas.elt.nextSibling);


  var firstRowCells = document.querySelectorAll("#myTable tr:first-child td");
  for (var k = 0; k < firstRowCells.length; k++) {
    firstRowCells[k].style.textAlign = "center";
  }

// ----------------------------------HTML TABLE----------------------------------------------
  

  write_texts();
  Reset();
  
  stroke(100,180,200);
  strokeWeight(4);
  let fov= PI/3;
  let cameraZ=(height/2.0)/tan(fov/2.0);
  perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
  
  
  MathQuill_v6rrand=select("#answer");
  MathQuill_v6rrand.position(width/asukoha_nr+60,height/asukoha_nr+145);
  MathQuill_v6rrand.style(" width: 200px; margin-top: 70px auto; font-size: 24px;");
  
  MathQuill_v6rrand2=select("#answer2");
  MathQuill_v6rrand2.position(width/asukoha_nr+60,height/asukoha_nr+195);
  MathQuill_v6rrand2.style(" width: 200px; margin-top: 70px auto; font-size: 24px;");
}

function draw() {
  clear();
  background(251,253,255);

  katex.render(KaTeX_EQ, katexEquation);
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+350);
  KONTROLL_NUPP.mousePressed(Kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+350);
  RESET_NUPP.mousePressed(Reset);
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+420);
  
  ALISTUMIS_NUPP.mousePressed(Alistun);

  // ----------------------------------------KOLMNURGA JOONIS
  push();
  stroke(0);
  strokeWeight(2);
  noFill();// Siin saab kujundit nihutada x võrra või y võrra.
  beginShape();
    vertex(-210,-70);
    vertex(-30,-70);
    vertex(-210,-160);
  endShape(CLOSE);
  pop();
  
  //----------------------------------------KOLMNURGA JOONIS
  
   if(lopetamise_tingimus==true){
    background(15,30,60);
  }
}


function Ylesanne(){
  
  mudelid=["1","2","3","4"];
  mudeli_valik=random(mudelid);
  
  if (mudeli_valik=="1"){ //Antud: Hypotenuus + nurk

    // given data
    hypotenuus=round_0(Math.random()*100);
    nurk=round_0(Math.random()*85);
    
    nurgad=["alfa","beta"];
    nurga_valik=random(nurgad);
    if (nurga_valik=="alfa"){
        alfa=nurk;
        beta=90-alfa;

        // data which user must find
        kat_A = round_1(hypotenuus * Math.sin(alfa*Math.PI/180));
        kat_B = round_1(hypotenuus * Math.cos(alfa*Math.PI/180));

        hypotenuus_node.html("c = "+str(hypotenuus));
        alfa_node.html("&#x3B1 = "+str(alfa)+"&#xb0");
        beta_node.html("&#x3B2");
        kaatet_1_node.html("a");
        kaatet_2_node.html("b");

        beta_node.position(width/asukoha_nr+40, height/asukoha_nr+85);
        alfa_node.position(width/asukoha_nr+125, height/asukoha_nr+137);
        kaatet_1_node.position(65,170);
        kaatet_2_node.position(160,230);
        hypotenuus_node.position(175,150);
      

    } else if (nurga_valik=="beta"){
      beta=nurk;
      alfa=90-beta;

          // data which user must find
          kat_A = round_1(hypotenuus * Math.cos(beta*Math.PI/180));
          kat_B = round_1(hypotenuus * Math.sin(beta*Math.PI/180));
              
          hypotenuus_node.html("c = "+str(hypotenuus));
          alfa_node.html("&#x3B1");
          beta_node.html("&#x3B2="+str(beta)+"&#xb0");
          beta_node.position(width/asukoha_nr+40, height/asukoha_nr+95);
          alfa_node.position(width/asukoha_nr+148, height/asukoha_nr+137);
          kaatet_1_node.html("a");
          kaatet_2_node.html("b");
    }

     vastused=[kat_A, kat_B, hypotenuus, alfa, beta]

    console.log(vastused)

  // katex.render( antav_ylesanne, tex_vorrand.elt);
     yl_text.html("Lahenda kolmnurk.");
  }
  
    if (mudeli_valik=="2"){ //Antud: Kateet + nurk

      nurgad=["alfa","beta"];
      nurga_valik=random(nurgad);
      kyljed=["A","B"];
      kylje_valik=random(kyljed);
console.log(nurga_valik,kylje_valik);
      if (nurga_valik=="alfa" && kylje_valik=="A"){
          // given data
          kat_A=round_0(Math.random()*100);
          alfa=round_0(Math.random()*85);
          beta=90-alfa;

          hypotenuus=round_1(kat_A/(Math.sin(alfa*Math.PI/180)));
          kat_B=round_1(kat_A/(Math.tan(alfa*Math.PI/180)));

          vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

          console.log(vastused)
          alfa_node.html("&#x3B1 = "+str(alfa)+"&#xb0");
          beta_node.html("&#x3B2");
          kaatet_1_node.html("a = "+str(kat_A));
          kaatet_2_node.html("b");
          hypotenuus_node.html("c");

          beta_node.position(width/asukoha_nr+40, height/asukoha_nr+85);
          alfa_node.position(width/asukoha_nr+125, height/asukoha_nr+137);
          kaatet_1_node.position(35,170);
          kaatet_2_node.position(160,230);
          hypotenuus_node.position(175,150);
      }

      if (nurga_valik=="alfa" && kylje_valik=="B"){
        // given data
        kat_B=round_0(Math.random()*100);
        alfa=round_0(Math.random()*85);
        beta=90-alfa;

        hypotenuus=round_1(kat_B/(Math.cos(alfa*Math.PI/180)));
        kat_A=round_1(kat_B*(Math.tan(alfa*Math.PI/180)));

        vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

        console.log(vastused)
        alfa_node.html("&#x3B1 = "+str(alfa)+"&#xb0");
        beta_node.html("&#x3B2");
        kaatet_1_node.html("a");
        kaatet_2_node.html("b = "+str(kat_B));
        hypotenuus_node.html("c");

        beta_node.position(width/asukoha_nr+40, height/asukoha_nr+85);
        alfa_node.position(width/asukoha_nr+125, height/asukoha_nr+137);
        kaatet_1_node.position(65,170);
        kaatet_2_node.position(160,230);
        hypotenuus_node.position(175,150);
    }

    if (nurga_valik=="beta" && kylje_valik=="A"){
      // given data
      kat_A=round_0(Math.random()*100);
      beta=round_0(Math.random()*85);
      alfa=90-beta;

      hypotenuus=round_1(kat_A/(Math.cos(beta*Math.PI/180)));
      kat_B=round_1(kat_A*(Math.tan(beta*Math.PI/180)));

      vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

      console.log(vastused)
      alfa_node.html("&#x3B1");
      beta_node.html("&#x3B2 = "+str(beta)+"&#xb0");
      kaatet_1_node.html("a = "+str(kat_A));
      kaatet_2_node.html("b");
      hypotenuus_node.html("c");

      beta_node.position(width/asukoha_nr+33, height/asukoha_nr+95);
      alfa_node.position(width/asukoha_nr+145, height/asukoha_nr+137);
      kaatet_1_node.position(35,170);
      kaatet_2_node.position(160,230);
      hypotenuus_node.position(175,150);
  }

  if (nurga_valik=="beta" && kylje_valik=="B"){
    // given data
    kat_B=round_0(Math.random()*100);
    beta=round_0(Math.random()*85);
    alfa=90-beta;

    hypotenuus=round_1(kat_B/(Math.sin(beta*Math.PI/180)));
    kat_A=round_1(kat_B/(Math.tan(beta*Math.PI/180)));

    vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

    console.log(vastused)
    alfa_node.html("&#x3B1");
    beta_node.html("&#x3B2 = "+str(beta)+"&#xb0");
    kaatet_1_node.html("a");
    kaatet_2_node.html("b = "+str(kat_B));
    hypotenuus_node.html("c");

    beta_node.position(width/asukoha_nr+33, height/asukoha_nr+95);
    alfa_node.position(width/asukoha_nr+145, height/asukoha_nr+137);
    kaatet_1_node.position(65,170);
    kaatet_2_node.position(160,230);
    hypotenuus_node.position(175,150);
}


  // katex.render( antav_ylesanne, tex_vorrand.elt);
     yl_text.html("Lahenda kolmnurk.");

  }

  if (mudeli_valik=="3"){ //Antud: Kaatet A ja kaatet B
    kat_A=round_0(Math.random()*100);
    kat_B=round_0(Math.random()*100);

    hypotenuus=round_1(Math.sqrt(kat_A*kat_A+kat_B*kat_B));
    beta=round_0(Math.atan(kat_B/kat_A)*180/Math.PI);
    alfa=round_0(Math.atan(kat_A/kat_B)*180/Math.PI);
    
    vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

    console.log(vastused)
    alfa_node.html("&#x3B1");
    beta_node.html("&#x3B2");
    kaatet_1_node.html("a = "+str(kat_A));
    kaatet_2_node.html("b = "+str(kat_B));
    hypotenuus_node.html("c");

    beta_node.position(width/asukoha_nr+40, height/asukoha_nr+85);
    alfa_node.position(width/asukoha_nr+125, height/asukoha_nr+137);
    kaatet_1_node.position(35,170);
    kaatet_2_node.position(160,230);
    hypotenuus_node.position(175,150);

    yl_text.html("Lahenda kolmnurk.");
  }


  if (mudeli_valik=="4"){ // Antud: Kaatet ja hüpotenuus

    hypotenuus=round_0(Math.random()*100);
    kyljed=["A","B"];
    kylje_valik=random(kyljed);

    if (kylje_valik=="A"){
      kat_A=round_0(Math.random()*100);
      while (kat_A>=hypotenuus){
        kat_A=round_0(Math.random()*100);
      }
      kat_B=round_1(Math.sqrt(hypotenuus*hypotenuus-kat_A*kat_A));
      alfa=round_0(Math.asin(kat_A/hypotenuus)*180/Math.PI);
      beta=round_0(Math.acos(kat_A/hypotenuus)*180/Math.PI);

      vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

      console.log(vastused)
      alfa_node.html("&#x3B1");
      beta_node.html("&#x3B2");
      kaatet_1_node.html("a = "+str(kat_A));
      kaatet_2_node.html("b");
      hypotenuus_node.html("c = "+str(hypotenuus));
  
      beta_node.position(width/asukoha_nr+40, height/asukoha_nr+85);
      alfa_node.position(width/asukoha_nr+125, height/asukoha_nr+137);
      kaatet_1_node.position(35,170);
      kaatet_2_node.position(160,230);
      hypotenuus_node.position(175,150);

    }

    if (kylje_valik=="B"){
      kat_B=round_0(Math.random()*100);
      while (kat_B>=hypotenuus){
        kat_B=round_0(Math.random()*100);
      }
      kat_A=round_1(Math.sqrt(hypotenuus*hypotenuus-kat_B*kat_B));
      alfa=round_0(Math.acos(kat_B/hypotenuus)*180/Math.PI);
      beta=round_0(Math.asin(kat_B/hypotenuus)*180/Math.PI);

      vastused=[kat_A, kat_B, hypotenuus, alfa, beta];

      console.log(vastused)
      alfa_node.html("&#x3B1");
      beta_node.html("&#x3B2");
      kaatet_1_node.html("a");
      kaatet_2_node.html("b = "+str(kat_B));
      hypotenuus_node.html("c = "+str(hypotenuus));
  
      beta_node.position(width/asukoha_nr+40, height/asukoha_nr+85);
      alfa_node.position(width/asukoha_nr+125, height/asukoha_nr+137);
      kaatet_1_node.position(35,170);
      kaatet_2_node.position(160,230);
      hypotenuus_node.position(175,150);

    }

    yl_text.html("Lahenda kolmnurk.");
  }


}


function write_texts(){
  
  tex_vorrand=createP("");
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto'; font-weight: bold; sans-serif;line-height: 140%; font-size: 1.25rem; maxWidth: 500px");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr,height/asukoha_nr+225);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  kaatet_1_node=createP("a");
  kaatet_1_node.position(35,170);
  kaatet_1_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
    
  kaatet_2_node=createP("b");
  kaatet_2_node.position(160,230);
  kaatet_2_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  hypotenuus_node=createP("c");
  hypotenuus_node.position(170,140)
  hypotenuus_node.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
  
  alfa_node=createP("	&#x3B1");
  alfa_node.position(width/asukoha_nr+118, height/asukoha_nr+137);
  alfa_node.style("font-family: 'Roboto',sans-serif; font-style: italic; line-height: 140%; font-size: 1.00rem ");
  alfa_node.style("transform","rotate(15deg)");

  beta_node=createP("beta");
  beta_node.position(width/asukoha_nr+40, height/asukoha_nr+95);
  beta_node.style("font-family: 'Roboto',sans-serif; font-style: italic; line-height: 140%; font-size: 1.00rem ");
  beta_node.style("transform","rotate(45deg)");
}




function Alistun() {
  tulemus.html("");
  console.log(vastused)
  tulemus.style("color: black")
  tulemus.html("Sobivad vastused olid: "+str(vastused));
  KONTROLL_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
}



function Kontroll(){
  
if (inputX1==vastused[0] && inputX2==vastused[1] && inputX3==vastused[2] && inputX4==vastused[3] && inputX5==vastused[4]){
  vastused_korras=true;
} else {
  vastused_korras=false;
}
  //------------------------------------------------------------------------

        if (inputX1=="" || inputX2=="" || inputX3=="" || inputX4=="" || inputX5==""){
          tulemus.html("Vastuse kast on tühi!");
          tulemus.style("color","orange");
        }  else if ( vastused_korras==true ) {
          //katex.render("Korras! Õiged vastused olid ka: ", tulemus.elt)
          tulemus.html("Korras!");
          tulemus.style("color","green");
          oige_vastus=oige_vastus+1;
          KONTROLL_NUPP.attribute("disabled","");
          vastused_korras=true;
        } else {
          tulemus.html("Midagi on valesti!");
          tulemus.style("color","red");
        }
}


function Reset(){
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    ALISTUMIS_NUPP.remove();
  }
  
  
  vastused_korras=false;
  Ylesanne();
  tulemus.html("");

  document.getElementById("sisend1").value = "";
  document.getElementById("sisend2").value = "";
  document.getElementById("sisend3").value = "";
  document.getElementById("sisend4").value = "";
  document.getElementById("sisend5").value = "";

  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+300);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+300);
  
  LOPETA_NUPP=createButton("Lõpeta test");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
    
  ALISTUMIS_NUPP=createButton("Näita lahendust");
  ALISTUMIS_NUPP.style('padding','5px 10px');
  ALISTUMIS_NUPP.style('background-color','rgb(255,255,255)');
  ALISTUMIS_NUPP.style('color','black');
  ALISTUMIS_NUPP.style('border-radius','0px');
  ALISTUMIS_NUPP.style('border-width','1px');
  ALISTUMIS_NUPP.style('font-weight','bold');
  ALISTUMIS_NUPP.style('margin-top','30px');
  ALISTUMIS_NUPP.style('margin-left','80px');
  ALISTUMIS_NUPP.position(width/asukoha_nr+188,height/asukoha_nr+295);

  KONTROLL_NUPP.mouseOver(function() {
    KONTROLL_NUPP.style('background-color', 'rgba(25, 25, 112, 0.75)');
  });
  
  KONTROLL_NUPP.mouseOut(function() {
    KONTROLL_NUPP.style('background-color', 'rgb(25, 25, 112)');
  });
    
  RESET_NUPP.mouseOver(function() {
        RESET_NUPP.style('background-color','rgba(80,139,195,0.75)');
  });
  
  RESET_NUPP.mouseOut(function() {
      RESET_NUPP.style('background-color','#508bc3');
  });
    
  LOPETA_NUPP.mouseOver(function() {
    LOPETA_NUPP.style('background-color',	"rgba(176,196,222,0.75)");
  });
  
  LOPETA_NUPP.mouseOut(function() {
    LOPETA_NUPP.style('background-color','rgb(176,196,222)');
  });

  ALISTUMIS_NUPP.mouseOver(function() {
    ALISTUMIS_NUPP.style('background-color',	"rgba(25, 25, 112, 0.75)");
    ALISTUMIS_NUPP.style('color','white');
  });
  
  ALISTUMIS_NUPP.mouseOut(function() {
    ALISTUMIS_NUPP.style('background-color','rgb(255,255,255)');
      ALISTUMIS_NUPP.style('color','black');
  });
  
  ylesannete_loendur=ylesannete_loendur+1;
}



function Lopp(){

  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  ALISTUMIS_NUPP.attribute("disabled","");
  
  tex_vorrand.remove();
  yl_text.remove();
  tulemus.remove();
  kaatet_1_node.remove();
  kaatet_2_node.remove();
  hypotenuus_node.remove();

  hypotenuus_node.html("");
  alfa_node.html("");
  beta_node.html("");
  kaatet_1_node.html("");
  kaatet_2_node.html("");
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  ALISTUMIS_NUPP.remove();

  MathQuill_v6rrand.remove();
  MathQuill_v6rrand2.remove();
  tooltip.remove();
  infoNupp.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  lopetamise_tingimus=true;


  document.getElementById("myTable").remove();
  
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



// // for end screen
// empty_vec=[]
// function new_step(){
  
//     direction=random(["up","down","left","right","forward","back"]);
//     if (direction=="up"){
//       X=X+step;
//     } else if (direction == "down"){
//       X=X-step;
//     } else if (direction=="left"){
//       Y=Y-step;
//     } else if (direction=="right"){
//       Y=Y+step;
//     } else if (direction=="forward"){
//       Z=Z+step;
//     } else if (direction=="back"){
//       Z=Z-step;
//     }
//   vek=createVector(X,Y,Z);
//   empty_vec.push(vek);
// }
  
  
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


