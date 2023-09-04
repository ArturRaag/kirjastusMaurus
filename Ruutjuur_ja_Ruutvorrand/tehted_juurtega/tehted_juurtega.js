
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var l6petamise_tingimus=false;
var alt_vastused=[];
var vastused_korras=false;




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
regularText.innerHTML = "Kui arv ei ole ilusti juuritav, siis jaota juurealune teguriteks. Tegurite seast peaks üks tegur olema kindlasti juuritav. Õigeks loetakse sellist vastust, kus juure alune arv ei ole enam tegurduv.<br><br>Ruutjuure sümboli sisestamiseks kasuta ruutjuure nupu või trükki tekstivälja \\sqrt ning vajuta tühikut või enterit. Murrujoone sisestamiseks kasuta / (kaldkriips) sümbolit.<br><br>";
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
  MathQuill_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+140);
  
  tex_v6rrand.position(width/asukoha_nr+0,height/asukoha_nr+35)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  RUUTJUUR.position(width/asukoha_nr-90,height/asukoha_nr+170);
  RUUTJUUR.mousePressed(ruutjuure_mark_MQ);
  
  EI_SAA_ARVUTADA.position(width/asukoha_nr-20,height/asukoha_nr+169);
  EI_SAA_ARVUTADA.mousePressed(ei_saa_MQ);
  
  
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
    EI_SAA_ARVUTADA.remove();
  }
  
  vastused_korras=false;
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
  
  EI_SAA_ARVUTADA=createButton("Võimatu");
  EI_SAA_ARVUTADA.id('eisaa');
  EI_SAA_ARVUTADA.style('color','black');
  EI_SAA_ARVUTADA.style('padding','8px 10px');
  EI_SAA_ARVUTADA.style('margin-top','30px');
  EI_SAA_ARVUTADA.style('margin-left','90px');
  EI_SAA_ARVUTADA.position(width/asukoha_nr-10,height/asukoha_nr+150);

  
  
  ylesannete_loendur=ylesannete_loendur+1;

}

function Ylesanne(){
  
  yl_text.html("Arvuta täpne väärtus.");
  
  mudel=["1","2","3","4","5","6","7","8"];
  mudeli_valik=random(mudel);
  //console.log(mudeli_valik);
  alt_vastused=[];
  
  // Korrutamine ilusa vastusega (juured koos)
  if (mudeli_valik=="1"){
      
      alt_vastused=[];
      arv1=int(random(0,6));
      arv2=int(random(0,6));
      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=mark1*arv1*arv1;
      arv2_juure_all=mark2*arv2*arv2;
      if (arv1_juure_all*arv2_juure_all<0){
        vastus="-"; // EI SAA JAGADA "vastus"
        alt_vastused.push(vastus);
      } else if (arv1_juure_all*arv2_juure_all==0){
        vastus="0";
        alt_vastused.push(vastus);
      } else if (arv1_juure_all*arv2_juure_all>0){
        vastus=str(arv1*arv2);
        alt_vastused.push(vastus);
      }
    
      if (arv1_juure_all<0){
        arv1_juure_all="("+str(arv1_juure_all)+")";
      }
      if (arv2_juure_all<0){
        arv2_juure_all="("+str(arv2_juure_all)+")"
      }
      
      antav_ylesanne="\\sqrt{"+ str(arv1_juure_all)+ "\\cdot"+ str(arv2_juure_all)+"}"
      console.log(alt_vastused);
  }
  
  
    // Korrutamine ilusa vastusega (juured eraldi)
  if (mudeli_valik=="2"){
      
      alt_vastused=[];
      arv1=int(random(0,6));
      arv2=int(random(0,6));
      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=mark1*arv1*arv1;
      arv2_juure_all=mark2*arv2*arv2;
    
    
      if (arv1_juure_all<0 || arv2_juure_all<0){
        vastus="-"; // EI SAA JAGADA "vastus"
        alt_vastused.push(vastus);
      } else if (arv1_juure_all*arv2_juure_all==0){
        vastus="0";
        alt_vastused.push(vastus);
      } else if (arv1_juure_all>0 && arv2_juure_all>0){
        vastus=str(arv1*arv2);
        alt_vastused.push(vastus);
      }
    
      if (arv1_juure_all<0){
        arv1_juure_all="("+str(arv1_juure_all)+")";
      }
      if (arv2_juure_all<0){
        arv2_juure_all="("+str(arv2_juure_all)+")"
      }
      
      antav_ylesanne="\\sqrt{"+ str(arv1_juure_all)+"}"+"\\cdot"+"\\sqrt{"+ str(arv2_juure_all)+"}"
      console.log(alt_vastused)
  }
  
  
      // Jagamine ilusa vastusega (juured koos)
  if (mudeli_valik=="3"){
    
      alt_vastused=[];
      arv1=int(random(0,25));
      arv2=int(random(1,25));

      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=(mark1*arv1*arv1)/(mark2*arv2*arv2);
    
      if (arv1_juure_all<0 || arv2*arv2==0 ){
        vastus="-"; // EI SAA juurida "vastus"
        alt_vastused.push(vastus);
      } else if (arv1_juure_all==0){
        vastus="0";
        alt_vastused.push(vastus);
      } else if (arv1_juure_all>0 ){
        
          if (Number.isInteger(arv1/arv2)==true){
            vastus=str((arv1)/arv2);
            alt_vastused.push(vastus);
          } else {
            if (str(arv1/arv2).split(".")[1].length<=3 ){
              alt_vastused.push(str(arv1/arv2));
            }
          }
        
        arv1_vastuse_jaoks=arv1;
        arv2_vastuse_jaoks=arv2;
        
        for (i=25;i>0;i--){
          if (arv1_vastuse_jaoks%i==0 && arv2_vastuse_jaoks%i==0){
            arv1_vastuse_jaoks=arv1_vastuse_jaoks/i;
            arv2_vastuse_jaoks=arv2_vastuse_jaoks/i;
          }
          
        }
        vastus_murd="("+str(arv1_vastuse_jaoks)+")/("+str(arv2_vastuse_jaoks)+")";
        alt_vastused.push(vastus_murd);
      }
    
      if (mark1*arv1*arv1<0){
        lugeja_juures="("+str(mark1*arv1*arv1)+")";
      } else {
        lugeja_juures=str(mark1*arv1*arv1)
      }
    
      if (mark2*arv2*arv2<0){
        nimetaja_juures="("+str(mark2*arv2*arv2)+")";
      } else {
        nimetaja_juures=str(mark2*arv2*arv2)
      }
      
    
      yl_1="\\sqrt{"+str(lugeja_juures)+":"+str(nimetaja_juures)+"}";
      yl_2="\\sqrt{ \\dfrac{"+str(lugeja_juures)+"}{"+str(nimetaja_juures)+"}}";
      ylesanded=random([yl_1, yl_2]);
    
      antav_ylesanne=ylesanded
      console.log(alt_vastused)
  }
  
  
        // Jagamine ilusa vastusega (juured eraldi)
  if (mudeli_valik=="4"){
    
      arv1=int(random(0,25));
      arv2=int(random(0,25));
      alt_vastused=[];

      mark1=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      mark2=random([1,1,1,1,1,1,1,-1]); // Miinuse esinemise tõenäosus on 12.5% iga arvu jaoks
      arv1_juure_all=mark1*arv1*arv1;
      arv2_juure_all=mark2*arv2*arv2;
      if (arv1_juure_all<0 || arv2_juure_all<=0 ){
        vastus="-"; // EI SAA juurida "vastus"
        alt_vastused.push(vastus);
      } else if (arv1_juure_all==0){
        vastus="0";
        alt_vastused.push(vastus);
      } else if (arv1_juure_all>0 && arv2_juure_all>0){
        
        if (Number.isInteger(arv1/arv2)==true){
            vastus=str((arv1)/arv2);
            alt_vastused.push(vastus);
          } else {
            if (str(arv1/arv2).split(".")[1].length<=3 ){
              alt_vastused.push(str(arv1/arv2));
            }
          }
        
        arv1_vastuse_jaoks=arv1;
        arv2_vastuse_jaoks=arv2;
        
        for (i=25;i>0;i--){
          if (arv1_vastuse_jaoks%i==0 && arv2_vastuse_jaoks%i==0){
            arv1_vastuse_jaoks=arv1_vastuse_jaoks/i;
            arv2_vastuse_jaoks=arv2_vastuse_jaoks/i;
          }
          
        }
        vastus_murd="("+str(arv1_vastuse_jaoks)+")/("+str(arv2_vastuse_jaoks)+")";
        alt_vastused.push(vastus_murd);
        
      }
    
        
      if (mark1*arv1*arv1<0){
        lugeja_juures="("+str(mark1*arv1*arv1)+")";
      } else {
        lugeja_juures=str(mark1*arv1*arv1)
      }
    
      if (mark2*arv2*arv2<0){
        nimetaja_juures="("+str(mark2*arv2*arv2)+")";
      } else {
        nimetaja_juures=str(mark2*arv2*arv2)
      }
    
      yl_1="\\sqrt{"+str(lugeja_juures)+"}:\\sqrt{"+str(nimetaja_juures)+"}";
      yl_2="\\dfrac{ \\sqrt{ "+str(lugeja_juures)+"}}{ \\sqrt{"+str(nimetaja_juures)+"}}";
      ylesanded=random([yl_1, yl_2]);
    
      antav_ylesanne=ylesanded
      console.log(alt_vastused)
  }

  
          // Liitmine (juured koos)
  if (mudeli_valik=="5"){
    
          alt_vastused=[];
          init_num1=int((random(2,10)));
          while (true){
            init_num2=int(random(2,25));
            juur_arvust_2 = Math.sqrt(init_num2);
            if ( (int(juur_arvust_2)*int(juur_arvust_2)) !=init_num2){
                break
            }       
          }  
          summa_juure_all = init_num1*init_num1*init_num2;
          lahutaja=int(random(0,summa_juure_all));
          esimene_arv=summa_juure_all-lahutaja;
          teine_arv=lahutaja;
          
          antav_ylesanne="\\sqrt{"+str(esimene_arv)+"+"+str(teine_arv)+"}"   
          
          // Juure all tegurdamise protsess  -----ALGUS
          for (i=25;i>0;i--){
            if ( init_num2%i==0 ){
              if((int(Math.sqrt(i)))*(int(Math.sqrt(i)))==i){
                init_num1=Math.sqrt(i)*init_num1;
                init_num2=init_num2/i;
              }
            }
          }
          // Juure all tegurdamise protsess  ---- LÕPP 
      
          vastus = str(init_num1)+"\sqrt("+str(init_num2)+")";
          alt_vastused.push(vastus);
      console.log(alt_vastused);
  }
    
    
    
              // Liitmine (juured eraldi)
  if (mudeli_valik=="6"){
    
    alt_vastused=[];
    arv1 = int(random(0,30))/2;
    arv2 = int(random(0,30))/2;
    
    antav_ylesanne="\\sqrt{"+str(arv1*arv1)+"}+\\sqrt{"+str(arv2*arv2)+"}";
    
    vastus=str(arv1+arv2);
    alt_vastused.push(vastus);
    console.log(alt_vastused)
  }
  
    
    
                  // Lahutamine (juured eraldi)
  if (mudeli_valik=="7"){
    
    alt_vastused=[];
    arv1 = int(random(0,30))/2;
    arv2 = int(random(0,30))/2;
    
    antav_ylesanne="\\sqrt{"+str(arv1*arv1)+"}-\\sqrt{"+str(arv2*arv2)+"}";
    
    vastus=str(arv1-arv2);
    alt_vastused.push(vastus);
    console.log(alt_vastused);
  }
    
    
              // Lahutamine (juured koos)
  if (mudeli_valik=="8"){
    
          alt_vastused=[];
          init_num1=int((random(2,10)));
          while (true){
            init_num2=int(random(2,25)); 
            juur_arvust_2 = Math.sqrt(init_num2);
            if ( (int(juur_arvust_2)*int(juur_arvust_2)) !=init_num2){
                break
            }       
          }  
          summa_juure_all = init_num1*init_num1*init_num2;
          liitja=int(random(0,summa_juure_all));
          esimene_arv=summa_juure_all+liitja;
          teine_arv=liitja;
          
          antav_ylesanne="\\sqrt{"+str(esimene_arv)+"-"+str(teine_arv)+"}"
            
          // Juure all tegurdamise protsess  -----ALGUS
          for (i=25;i>0;i--){
            if ( init_num2%i==0 ){
              if((int(Math.sqrt(i)))*(int(Math.sqrt(i)))==i){
                init_num1=Math.sqrt(i)*init_num1;
                init_num2=init_num2/i;
              }
            }
          }
          // Juure all tegurdamise protsess  ---- LÕPP
            
          vastus = str(init_num1)+"\sqrt("+str(init_num2)+")"
          alt_vastused.push(vastus);
          console.log(alt_vastused);
  }
  
    //console.log(antav_ylesanne)
    // console.log(vastus_kontrolliks)
   tex_string=antav_ylesanne+"=";
   katex.render( tex_string, tex_v6rrand.elt);

        
  // Strip alt_vastused. Ehk eemaldame sulud.
  stripped_alt=[];
  for (i=0; i<= alt_vastused.length-1 ; i++){
    stripped_alt.push(alt_vastused[i].replace(/([()])/g, ''));
  }
    
  // Lisame tühikud alt vastuste järele, et tekst oleks loetavam.
  for (i=0; i<=stripped_alt.length-1; i++){
    stripped_alt[i]=" "+stripped_alt[i];
  }
    
  
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
  //console.log("KONTROLL: ");
// console.log("MQ sisu: ", sisu);
//   console.log(alt_vastused);

 
  for (i=0; i<=alt_vastused.length-1;i++){
    if (vastused_korras==true){
      break
    }
    if(sisu==alt_vastused[i]){
      vastused_korras=true;
    }else{
      vastused_korras=false;
    }
  }
           if (vastused_korras==true){
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

function ei_saa_MQ(){
  var answerMathField = MQ.MathField(answerSpan);
  document.getElementById("eisaa").onclick = function () {
  answerMathField.focus();
  answerMathField.latex("-");
};  
}

function L6pp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  L6PETA_NUPP.attribute("disabled","");
  RUUTJUUR.attribute("disabled","");
  EI_SAA_ARVUTADA.attribute("disabled","");
  
  tex_v6rrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  infoNupp.remove();

  RESET_NUPP.remove();
  L6PETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_v6rrand.remove();
  RUUTJUUR.remove();
  EI_SAA_ARVUTADA.remove();
  
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
  

  