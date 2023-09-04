var X=[];
var Y=[];
var x_koord=0.0, y_koord=0.0;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;
var teksti_kasti_korgus=350;
var punkti_raadius=5;
var tahed=["A","B","C","D","E","F","G","H"];

var xmin=-10; // HETKE SEISUGA PEAVAD NEED KOLM KOKKU KLAPPIMA!!!
var xmax=10;  // Teisisõnu xmin + xmax absoluutväärtused peavad kokku andma jaotiste arvu. 
var jaotiste_arv=20;

var inputX1, inputX2, inputX3, inputX4, inputX5, inputX6, inputX7, inputX8, inputY1, inputY2, inputY3, inputY4, inputY5, inputY6, inputY7, inputY8;
var table;




// ----------------------------------------- HTML ToolTip -------------------------------------------

var tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.85)"
tooltip.style.color = "white";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="600px";
tooltip.style.borderRadius="25px"
document.body.appendChild(tooltip);

var regularText = document.createElement("div");
regularText.innerHTML = "Punkti saab joonisele märkida hiireklõpsuga.<br>Punkt A vastab tabeli esimesele veerule ning punkt B teisele jne.<br>Punktide eemaldamiseks tuleb hiirt veel kord klõpsata (kokku 9 klõpsu) ja alustada uuesti.<br><br>Tabelis ümarda Y väärtused kümnendikeni (1 koht pärast koma).<br><br>Testi eest saab +1 punkti kui tabel ning joonis on edukalt loodud.";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);

KaTeX_EQ=''
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
infoNupp.style.top="810px";
infoNupp.style.left="735px"
document.body.appendChild(infoNupp);

infoNupp.addEventListener("mouseenter", function() {
  tooltip.style.left = (infoNupp.offsetLeft-650) + "px";
  tooltip.style.top = (infoNupp.offsetTop-300 ) + "px";
  infoNupp.style.background="rgb(224,222,222)"
  tooltip.style.display = "block";
});

infoNupp.addEventListener("mouseleave", function() {
  tooltip.style.display = "none";
  infoNupp.style.background="transparent"
});

// ----------------------------------------- HTML ToolTip -------------------------------------------



function setup() {
canvas=createCanvas(800,800+teksti_kasti_korgus);
  
  // ------------------------------HTML TABLE--------------------------------------------------

// create a new HTML table element
var table = document.createElement("table");
table.setAttribute("id", "myTable");
table.style.zIndex="1"
// set the width of the table to 700px
table.style.width = "700px";

  table.style.position = "absolute";
  table.style.left = "35px";
  table.style.top = "950px";
  
// add border styles to the table and td elements
table.style.border = "1px solid black";
var td = document.createElement("td");
td.style.border = "1px solid black";

// create variables to store the values of the input fields
// var input1, input2, input3, input4

// create two rows and five columns
for (var i = 0; i < 2; i++) {
  var row = document.createElement("tr");

  // add the X and Y strings to the first cell of each row
  var firstCell = document.createElement("td");
  var text = document.createTextNode(i == 0 ? "X" : "Y");
  firstCell.appendChild(text);
  row.appendChild(firstCell);

  for (var j = 0; j < 8; j++) {
    var cell = document.createElement("td");
    var sisend = document.createElement("input");
    
    // set the width of the input element to 100px
    sisend.style.width = "70px";

    // set the input element's type attribute to "text"
    sisend.setAttribute("type", "text");

    // add an ID to the input element
    sisend.setAttribute("id", "sisend" + ((i * 8) + j + 1));

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
          break;
        case "sisend6":
          inputX6 = inputValue;
          break;
        case "sisend7":
          inputX7 = inputValue;
          break;
        case "sisend8":
          inputX8=inputValue;
          break;
        case "sisend9":
          inputY1 = inputValue;
          break;
        case "sisend10":
          inputY2 = inputValue;
          break;
        case "sisend11":
          inputY3 = inputValue;
          break;
        case "sisend12":
          inputY4 = inputValue;
          break;
        case "sisend13":
          inputY5 = inputValue;
          break;
        case "sisend14":
          inputY6 = inputValue;
          break;
        case "sisend15":
          inputY7 = inputValue;
          break;
        case "sisend16":
          inputY8=inputValue;
      }
    });

    // append the input element to the table cell
    cell.appendChild(sisend);

    // append the table cell to the table row
    row.appendChild(cell);
  }

  // append the table row to the table
  table.appendChild(row);
}

// append the table to the HTML document
document.body.appendChild(table);


    // set the canvas element as the parent of the HTML table
  canvas.elt.parentNode.insertBefore(table, canvas.elt.nextSibling);
// ----------------------------------HTML TABLE----------------------------------------------
  x_koord=width/2;
  y_koord=height/2;
  Write_texts();
  Reset();
}


function draw() {
  background(255);
  XYplane(jaotiste_arv, 0.25, 2); //parameetriks on [jaotiste_arv(teljel), tausta_jaotise_paksus, telje_jaotiste_paksus]
  create_a_Point();
  graafik(xmin,xmax, jaotiste_arv);
  mouse_Hover()
  
  KONTROLL_NUPP.mousePressed(Kontroll);
  RESET_NUPP.mousePressed(Reset);
  LOPETA_NUPP.mousePressed(Lopp);
  
  if(lopetamise_tingimus==true){
    
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
  
}



function XYplane(jaotiste_arv, tausta_jaotise_paksus, telje_jaotiste_paksus) {
  //jaotised Y teljel
  var jaotisY=0;
  var Y_jaotise_vaartus=xmax;
  while (jaotisY <= height-teksti_kasti_korgus) {
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
    jaotisY = jaotisY+(height-teksti_kasti_korgus)/jaotiste_arv;
    
  }
  //jaotised X teljel
  var jaotisX = 0;
  var X_jaotise_vaartus=xmin;
  while (jaotisX <= width) {
    strokeWeight(tausta_jaotise_paksus);
    stroke(200);
    line(jaotisX, (height-teksti_kasti_korgus)*0 , jaotisX, (height-teksti_kasti_korgus));
    strokeWeight(telje_jaotiste_paksus);
    stroke(0);
    line(jaotisX, (height-teksti_kasti_korgus)/2+5 , jaotisX, (height-teksti_kasti_korgus)/2-5);
    strokeWeight(0);
    stroke(0);
    text(X_jaotise_vaartus, jaotisX, (height-teksti_kasti_korgus)/2+20);
    X_jaotise_vaartus=X_jaotise_vaartus+1;
    jaotisX = jaotisX+width/jaotiste_arv;
  }
    // ----- X-Y plane -----
  strokeWeight(telje_jaotiste_paksus);
  stroke(0);
    //Y-axis
  line(width/2, (height-teksti_kasti_korgus)*0 , width/2 , (height-teksti_kasti_korgus));
    //arrow
  line(width/2-5, 0+15, width/2, 0);
  line(width/2+5, 0+15, width/2, 0);
    //X-axis
  line(width*0, (height-teksti_kasti_korgus)/2, width, (height-teksti_kasti_korgus)/2);
    //arrow
  line(width-15,(height-teksti_kasti_korgus)/2-5,width, (height-teksti_kasti_korgus)/2);
  line(width-15,(height-teksti_kasti_korgus)/2+5,width, (height-teksti_kasti_korgus)/2); 
}

points_on_plot=0;

function mouseClicked() {
  
  if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<(height-teksti_kasti_korgus)){
    x_koord=mouseX;
    y_koord=mouseY;
    points_on_plot=points_on_plot+1;
  }
}


var X_koordinaadid=Array(8);
var Y_koordinaadid=Array(8);
for (var i=0; i<8; i++){
    X_koordinaadid[i]=-10
    Y_koordinaadid[i]=-10
}

function create_a_Point(){
  
  if (points_on_plot==1){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==2) {
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==3){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==4){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==5){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==6){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==7){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot==8){
    X_koordinaadid[points_on_plot-1]=x_koord;
    Y_koordinaadid[points_on_plot-1]=y_koord;
  } else if (points_on_plot>8){
    points_on_plot=0;
    for (var i=0; i<8; i++){
    X_koordinaadid[i]=-10
    Y_koordinaadid[i]=-10
    }
  } 
  
  for (var i = 0; i<8; i++) {
    push();
    fill(0,139,195);
    circle(round_0(X_koordinaadid[i]/4)*4, round_0(Y_koordinaadid[i]/4)*4, punkti_raadius);
    pop();
    push();
    strokeWeight(4);
    stroke(255);
    text(tahed[i],round_0(X_koordinaadid[i]/4)*4-5, round_0(Y_koordinaadid[i]/4)*4-10 )
    pop();
    
  }
  
}

function Ylesanne(){
  lugeja=(round_0(random(-100,100)/5)*5)/10;
  vabaliige_B=(round_0(random(-50,50)/5)*5)/10;
  nimetaja=(round_0(random(-100,100)/5)*5)/10;
  
  if (nimetaja==0){
    nimetaja=(round_0(random(0,100)/5)*5)/10;
  }
  
  if (vabaliige_B>=0){
    vabaliige_B_str="+ "+str(vabaliige_B);
  } else {
    vabaliige_B_str=str(vabaliige_B)
  }
  
  LaTeX_string="y=\\dfrac{"+str(lugeja)+ "}{" +str(nimetaja)+"x}"+vabaliige_B_str;
  
  katex.render( LaTeX_string, TeX_text.elt);
}

function Write_texts(){
  yl_text=createP("On antud funktsioon: <br><br>Täida funktsiooni väärtustetabel, ning kanna punktid graafikule.<br>Tulemused ümarda 1 koht pärast koma.<br><br><br><br><br>Praegune seis:<br><br> 1) <br> 2) <br> 3)  ");
  yl_text.position(35,(height-teksti_kasti_korgus)+17);
  yl_text.style("font-size","16px");
  yl_text.style("line-height","140%");
  yl_text.style("font-family","'Roboto', sans-sarif");
  
  yl_text_2=createP("<br><br><br><br><br><br><br><br><br><br> 4)<br> 5)<br> 6)<br>");
  yl_text_2.position(315, (height-teksti_kasti_korgus)+17);
  yl_text_2.style("font-size","16px");
  yl_text_2.style("line-height","140%");
  yl_text_2.style("font-family","'Roboto', sans-sarif");
  
  yl_text_3=createP("<br><br><br><br><br><br><br><br><br><br> 7)<br> 8)<br> 9)<br>");
  yl_text_3.position(515, (height-teksti_kasti_korgus)+17);
  yl_text_3.style("font-size","16px");
  yl_text_3.style("line-height","140%");
  yl_text_3.style("font-family","'Roboto', sans-sarif");
  
  TeX_text=createP("");
  TeX_text.position(200,(height-teksti_kasti_korgus)+5);
  
  
  result_text=createP("");
  result_text.position(55,(height-teksti_kasti_korgus)+240);
  result_text.style("font-size","16px");
  result_text.style("line-height","140%");
  result_text.style("font-family","'Roboto', sans-sarif");
  
  p1_text=createP("");
  p1_text.position(55,(height-teksti_kasti_korgus)+263);
  p1_text.style("font-size","16px");
  p1_text.style("line-height","140%");
  p1_text.style("font-family","'Roboto', sans-sarif");
  
  p2_text=createP("");
  p2_text.position(55,(height-teksti_kasti_korgus)+287);
  p2_text.style("font-size","16px");
  p2_text.style("line-height","140%");
  p2_text.style("font-family","'Roboto', sans-sarif");
  
  p3_text=createP("");
  p3_text.position(335,(height-teksti_kasti_korgus)+240);
  p3_text.style("font-size","16px");
  p3_text.style("line-height","140%");
  p3_text.style("font-family","'Roboto', sans-sarif");
  
  p4_text=createP("");
  p4_text.position(335,(height-teksti_kasti_korgus)+263);
  p4_text.style("font-size","16px");
  p4_text.style("line-height","140%");
  p4_text.style("font-family","'Roboto', sans-sarif");
  
  p5_text=createP("");
  p5_text.position(335,(height-teksti_kasti_korgus)+287);
  p5_text.style("font-size","16px");
  p5_text.style("line-height","140%");
  p5_text.style("font-family","'Roboto', sans-sarif");
  
  p6_text=createP("");
  p6_text.position(535,(height-teksti_kasti_korgus)+240);
  p6_text.style("font-size","16px");
  p6_text.style("line-height","140%");
  p6_text.style("font-family","'Roboto', sans-sarif");
  
  
  p7_text=createP("");
  p7_text.position(535,(height-teksti_kasti_korgus)+263);
  p7_text.style("font-size","16px");
  p7_text.style("line-height","140%");
  p7_text.style("font-family","'Roboto', sans-sarif");
  
  p8_text=createP("");
  p8_text.position(535,(height-teksti_kasti_korgus)+287);
  p8_text.style("font-size","16px");
  p8_text.style("line-height","140%");
  p8_text.style("font-family","'Roboto', sans-sarif"); 
}

function Kontroll(){
  
  // ##########################  TABELI KONTROLL ###############################
  
  X_ide_massiiv=Array(8);
  X_ide_massiiv[0]=inputX1;
  X_ide_massiiv[1]=inputX2;
  X_ide_massiiv[2]=inputX3;
  X_ide_massiiv[3]=inputX4;
  X_ide_massiiv[4]=inputX5;
  X_ide_massiiv[5]=inputX6;
  X_ide_massiiv[6]=inputX7;
  X_ide_massiiv[7]=inputX8;
  //console.log(X_ide_massiiv);
  
  Y_ide_massiiv=Array(8);
  Y_ide_massiiv[0]=inputY1;
  Y_ide_massiiv[1]=inputY2;
  Y_ide_massiiv[2]=inputY3;
  Y_ide_massiiv[3]=inputY4;
  Y_ide_massiiv[4]=inputY5;
  Y_ide_massiiv[5]=inputY6;
  Y_ide_massiiv[6]=inputY7;
  Y_ide_massiiv[7]=inputY8;
  
  // ----- Kas tabelis on tühi kast? Lisaks, kas mõni ==0 ? -----
  tyhjuse_tingimus=false;
  null_vaartus_tabelis=false;
  for (var i = 0;i<8; i++){
    if (str(X_ide_massiiv[i])=="" || str(Y_ide_massiiv[i])==""){
      tyhjuse_tingimus=true;
    }
    if(X_ide_massiiv[i]==0){
      null_vaartus_tabelis=true;
    }
    }
  
  // ----- Kas X-id on kasvamis järjekorras? -----
  ei_ole_kasvav=false;
  for (var i =0; i<7; i++){
    //console.log(str(X_ide_massiiv[7-i])+"*****"+ str(X_ide_massiiv[(7-i)-1]))
    if ( float(X_ide_massiiv[7-i]) <= float(X_ide_massiiv[(7-i)-1]) ){
      ei_ole_kasvav=true;
      //console.log("ei kasva!")
    }
  }
  
  
  if (tyhjuse_tingimus==true){
    result_text.html("Tabel on tühi!");
    condition_for_finishing_table=false;
    result_text.style("color","red");
  }
    else if(null_vaartus_tabelis==true){
    result_text.html("X-ide real on 0! Nulliga jagada ei saa!")
    condition_for_finishing_table=false;
    result_text.style("color","red");
  }
   else if (ei_ole_kasvav==true) {
    result_text.html("X-id ei ole kasvavas järjekorras!");
    condition_for_finishing_table=false;
    result_text.style("color","red");
  }
  else if (tyhjuse_tingimus==false && ei_ole_kasvav==false && null_vaartus_tabelis==false) {
    func_Y_vaartus_1=round_1((lugeja/(nimetaja*inputX1))+vabaliige_B);
    func_Y_vaartus_2=round_1((lugeja/(nimetaja*inputX2))+vabaliige_B);
    func_Y_vaartus_3=round_1((lugeja/(nimetaja*inputX3))+vabaliige_B);
    func_Y_vaartus_4=round_1((lugeja/(nimetaja*inputX4))+vabaliige_B);
    func_Y_vaartus_5=round_1((lugeja/(nimetaja*inputX5))+vabaliige_B);
    func_Y_vaartus_6=round_1((lugeja/(nimetaja*inputX6))+vabaliige_B);
    func_Y_vaartus_7=round_1((lugeja/(nimetaja*inputX7))+vabaliige_B);
    func_Y_vaartus_8=round_1((lugeja/(nimetaja*inputX8))+vabaliige_B);
    //console.log(func_Y_vaartus_1,func_Y_vaartus_2, func_Y_vaartus_3, func_Y_vaartus_4, func_Y_vaartus_5,func_Y_vaartus_6,func_Y_vaartus_7,func_Y_vaartus_8)
    if (inputY1 == func_Y_vaartus_1 && inputY2 == func_Y_vaartus_2 && inputY3==func_Y_vaartus_3 && inputY4==func_Y_vaartus_4 && inputY5==func_Y_vaartus_5 && inputY6 == func_Y_vaartus_6 && inputY7 == func_Y_vaartus_7 && inputY8 ==func_Y_vaartus_8){
        result_text.html("Väärtustetabel on ÕIGESTI arvutatud!")
        condition_for_finishing_table=true;
        result_text.style("color","green");
  } else {
        result_text.html("Väärtustetabel on VALESTI arvutatud.")
        condition_for_finishing_table=false;
        result_text.style("color","red");
  }
  }
  
  
  // ############################# GRAAFIKU KONTROLL ##############################
  
  // PUNKT A
  if ( (((round_0(X_koordinaadid[0]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[0])) && (-1*((round_0(Y_koordinaadid[0]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[0])+vabaliige_B))) ){
    p1_text.html("Punkt A on korras!");
    condition_for_finishing_point_A=true;
    p1_text.style("color","green");
      } else {
        p1_text.html("Punkti A asukoht ei sobi.");
        condition_for_finishing_point_A=false;
        p1_text.style("color","red");
      }
  
  // PUNKT B
  if ( (((round_0(X_koordinaadid[1]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[1])) && (-1*((round_0(Y_koordinaadid[1]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[1])+vabaliige_B))) ){
    p2_text.html("Punkt B on korras!");
    condition_for_finishing_point_B=true;
    p2_text.style("color","green");
      } else {
        p2_text.html("Punkti B asukoht ei sobi.");
        condition_for_finishing_point_B=false;
        p2_text.style("color","red");
      }
  
  // PUNKT C
    if ( (((round_0(X_koordinaadid[2]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[2])) && (-1*((round_0(Y_koordinaadid[2]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[2])+vabaliige_B))) ){
    p3_text.html("Punkt C on korras!");
    condition_for_finishing_point_C=true;
      p3_text.style("color","green");
      } else {
        p3_text.html("Punkti C asukoht ei sobi.");
        condition_for_finishing_point_C=false;
        p3_text.style("color","red");
      }
  // PUNKT D
    if ( (((round_0(X_koordinaadid[3]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[3])) && (-1*((round_0(Y_koordinaadid[3]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[3])+vabaliige_B))) ){
    p4_text.html("Punkt D on korras!");
    condition_for_finishing_point_D=true;
      p4_text.style("color","green");
      } else {
        p4_text.html("Punkti D asukoht ei sobi.");
        condition_for_finishing_point_D=false;
        p4_text.style("color","red");
      }
  // PUNKT E
    if ( (((round_0(X_koordinaadid[4]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[4])) && (-1*((round_0(Y_koordinaadid[4]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[4])+vabaliige_B))) ){
    p5_text.html("Punkt E on korras!");
    condition_for_finishing_point_E=true;
      p5_text.style("color","green");
      } else {
        p5_text.html("Punkti E asukoht ei sobi.");
        condition_for_finishing_point_E=false;
        p5_text.style("color","red");
      }
  // PUNKT F
    if ( (((round_0(X_koordinaadid[5]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[5])) && (-1*((round_0(Y_koordinaadid[5]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[5])+vabaliige_B))) ){
    p6_text.html("Punkt F on korras!");
    condition_for_finishing_point_F=true;
      p6_text.style("color","green");
      } else {
        p6_text.html("Punkti F asukoht ei sobi.");
        condition_for_finishing_point_F=false;
        p6_text.style("color","red");
      }
  // PUNKT G
    if ( (((round_0(X_koordinaadid[6]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[6])) && (-1*((round_0(Y_koordinaadid[6]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[6])+vabaliige_B))) ){
    p7_text.html("Punkt G on korras!");
    condition_for_finishing_point_G=true;
      p7_text.style("color","green");
      } else {
        p7_text.html("Punkti G asukoht ei sobi.");
        condition_for_finishing_point_G=false;
        p7_text.style("color","red");
      }
  // PUNKT H
    if ( (((round_0(X_koordinaadid[7]/4)*4)-width/2)/40)==(round_1(X_ide_massiiv[7])) && (-1*((round_0(Y_koordinaadid[7]/4)*4)-(height-teksti_kasti_korgus)/2)/40) == (round_1((lugeja/(nimetaja*X_ide_massiiv[7])+vabaliige_B))) ){
    p8_text.html("Punkt H on korras!");
    condition_for_finishing_point_H=true;
      p8_text.style("color","green");
      } else {
        p8_text.html("Punkti H asukoht ei sobi.");
        condition_for_finishing_point_H=false;
        p8_text.style("color","red");
      }
  
  //  ########################## KAS KOGU ÜL KORRAS? ##################################
    if (condition_for_finishing_point_B==true && condition_for_finishing_point_A==true && condition_for_finishing_table==true && condition_for_finishing_point_C==true && condition_for_finishing_point_D==true && condition_for_finishing_point_E==true && condition_for_finishing_point_F==true && condition_for_finishing_point_G==true && condition_for_finishing_point_H==true ){
    oige_vastus=oige_vastus+1;
    KONTROLL_NUPP.attribute("disabled","");
  }
  
}


function Reset(){
  
  if(ylesannete_loendur>0){
  
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove()
    
  }
  
  
  
  condition_for_finishing_table=false;
  condition_for_finishing_point_A=false;
  condition_for_finishing_point_B=false;
  condition_for_finishing_point_C=false;
  condition_for_finishing_point_D=false;
  condition_for_finishing_point_E=false;
  condition_for_finishing_point_F=false;
  condition_for_finishing_point_G=false;
  condition_for_finishing_point_H=false;
  
  
  points_on_plot=0;
for (var i=0; i<8; i++){
    X_koordinaadid[i]=-10
    Y_koordinaadid[i]=-10
}
  
  result_text.html("");
  p1_text.html("");
  p2_text.html("");
  p3_text.html("");
  p4_text.html("");
  p5_text.html("");
  p6_text.html("");
  p7_text.html("");
  p8_text.html("");
  Ylesanne();
  
    KONTROLL_NUPP=createButton("Kontrolli");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  //KONTROLL_NUPP.position(width/2-80,height+30);
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
 
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  //RESET_NUPP.position(width/2+10,height+30);
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
 
  LOPETA_NUPP=createButton("Lõpeta");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  //LOPETA_NUPP.position(width/2+140,height+30);
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');

  KONTROLL_NUPP.position(4*width/5-250, (height-teksti_kasti_korgus)+0);
  RESET_NUPP.position(4*width/5-50,(height-teksti_kasti_korgus)+0);
  LOPETA_NUPP.position(4*width/5-75, (height-280));
  
  ylesannete_loendur=ylesannete_loendur+1;
}

function graafik(xmin,xmax, jaotiste_arv) {
  
    if (condition_for_finishing_point_A == true && condition_for_finishing_point_B == true && condition_for_finishing_table==true && condition_for_finishing_point_C==true && condition_for_finishing_point_D==true && condition_for_finishing_point_E==true && condition_for_finishing_point_F==true && condition_for_finishing_point_G==true && condition_for_finishing_point_H==true) {
  //----- Määramispiirkond X -----
  var i;
  var j;
   for (i = xmin , j = 0; i <=xmax ; i = i+0.1, j=j+1  ) {
     X[j]=i;
     Y[j]=lugeja/(nimetaja*X[j])+vabaliige_B; //----- Muutumispiirkond Y -----
   }
  
  for (var k=0; k<=X.length; k=k+1) {
    if (X[k]*(width/jaotiste_arv)+width/2 >= 0 && X[k]*(width/jaotiste_arv)+width/2 <= width && Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2 >=0 && Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2 <= (height-teksti_kasti_korgus)  ){
    push();
    fill(255,0,255);
    circle(X[k]*(width/jaotiste_arv)+width/2 , Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2,0);
   pop();
      if (k>=1) {
      stroke(0, 140, 205);
      strokeWeight(2);
      line(X[k-1]*(width/jaotiste_arv)+width/2, Y[k-1]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2, X[k]*(width/jaotiste_arv)+width/2, Y[k]*((height-teksti_kasti_korgus)/jaotiste_arv)*(-1)+(height-teksti_kasti_korgus)/2);
  }
  } 
    }
    }
}

function mouse_Hover(){
  
  if (mouseX >=0 && mouseX<= width && mouseY>=0 && mouseY<=height-teksti_kasti_korgus){
  hover_X=(round_0(mouseX/4)*4-width/2)/40;
  hover_Y=-1*(round_0(mouseY/4)*4-(height-teksti_kasti_korgus)/2)/40;
  push();
  fill(255);
  strokeWeight(2);
  stroke(0);
  circle(mouseX, mouseY, punkti_raadius);
  pop();
    
       if ((mouseX<=(width/2)) && (mouseY<=((height-teksti_kasti_korgus)/2))){
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX, mouseY, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX+11.5, mouseY+21);
    text("Y: "+hover_Y , mouseX+11.5, mouseY+41);
  } else if ((mouseX<=(width/2)) && (mouseY>=((height-teksti_kasti_korgus)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX, mouseY-60, 55, 55, 15);
    fill(0);
    text("X: "+hover_X, mouseX+11.5, mouseY-39);
    text("Y: "+hover_Y, mouseX+11.5, mouseY-19);
  } else if ((mouseX>=(width/2)) && (mouseY>=((height-teksti_kasti_korgus)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX-60, mouseY-60, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX-48.5,mouseY-39);
    text("Y: "+hover_Y, mouseX-48.5, mouseY-19);
  }else if ((mouseX>=(width/2)) && (mouseY<=((height-teksti_kasti_korgus)/2))) {
    strokeWeight(0);
    fill(116,187,251,200);
    rect(mouseX-60, mouseY, 55, 55, 15);
    fill(0);
    text("X: "+ hover_X, mouseX-48.5, mouseY+21);
    text("Y: "+ hover_Y, mouseX-48.5, mouseY+41);
  }
    
    
    
  } else {
    hover_X=0;
    hover_Y=0;
  }
  
}


function Lopp(){

  let table = document.getElementById("myTable");
  table.style.display = "none";

  infoNupp.remove();

  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
 
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
    KONTROLL_NUPP.remove()
    yl_text.remove();
    yl_text_2.remove();
    yl_text_3.remove();
    result_text.remove();
    TeX_text.remove();
    p1_text.remove();
    p2_text.remove();
    p3_text.remove();
    p4_text.remove();
    p5_text.remove();
    p6_text.remove();
    p7_text.remove();
    p8_text.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/2-100,height/2-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  
  
  lopetamise_tingimus=true;
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
