var canvas;
var ctx; // !!! context 2D (drawing)

var engine;
var mouseButton= false ;
var oldMouse = new Vector(0,0);


window.addEventListener("load",main);

function main() {
   	canvas=document.getElementById("canvas");
  	ctx=canvas.getContext("2d");

    /*TP2*/
    canvas.addEventListener( 'mousedown'  , handleMouseDown, false ) ;
    canvas.addEventListener( 'mousemove' , handleMouseMove , false ) ;
    canvas.addEventListener( 'mouseup' , handleMouseUp , false) ;


    engine=new Engine();


    //Nos scenes  , Decommentez pour les voir :

    //scene_tp2() ;
    //scene_tp3_1();
    scene_tp3_2();
    engine.start();

}

function handleMouseDown(event) {
  mouseButton = true ;
  // get the mouse relative to canvas
  var mouseX = event.layerX-canvas.offsetLeft;
  var mouseY = event.layerY-canvas.offsetTop;
  var mouse=new Vector(mouseX,mouseY);

  engine.particleManager.select(mouse) ;
  engine.obstacleManager.select(mouse) ;
  oldMouse = mouse;

  if(mouseButton && engine.obstacleManager.selected != null){
    engine.obstacleManager.selected.selected_color = 'green' ;
  }

}

function handleMouseMove(event) {
  // get the mouse relative to canvas
  if( mouseButton &&  engine.particleManager.selected != null ){
    var mouseX = event.layerX-canvas.offsetLeft;
    var mouseY = event.layerY-canvas.offsetTop;
    var mouse=new Vector(mouseX,mouseY);
    var m = new Vector(mouse.x - oldMouse.x, mouse.y-oldMouse.y) ;
    engine.particleManager.selected.move(m) ;
    oldMouse.setXY(mouse.x , mouse.y);
  }

  if(mouseButton && engine.obstacleManager.selected != null){
    var mouseX = event.layerX-canvas.offsetLeft;
    var mouseY = event.layerY-canvas.offsetTop;
    var mouse=new Vector(mouseX,mouseY);
    var m = new Vector(mouse.x - oldMouse.x, mouse.y-oldMouse.y) ;
    oldMouse.setXY(mouse.x , mouse.y);
    engine.obstacleManager.selected.move(m) ;
  }



}

function handleMouseUp(event) {
  mouseButton = false ;
  // get the mouse relative to canvas
  var mouseX = event.layerX-canvas.offsetLeft;
  var mouseY = event.layerY-canvas.offsetTop;
  var mouse=new Vector(mouseX,mouseY);

  engine.particleManager.select(mouse) ;
  engine.obstacleManager.select(mouse) ;
  if(mouseButton == false && engine.obstacleManager.selected != null){
    engine.obstacleManager.selected.selected_color = 'red' ;
  }

}

function scene_tp2(){

  var gen1 = new GeneratorBox();
  gen1.min.setXY(100,40); // setXY à faire dans la classe Vector
  gen1.max.setXY(100,40);

  /*
  var gen2 = new GeneratorBox();
  gen2.min.setXY(150,40); // setXY à faire dans la classe Vector
  gen2.max.setXY(150,40);

  var gen3 = new GeneratorBox();
  gen3.min.setXY(200,60); // setXY à faire dans la classe Vector
  gen3.max.setXY(200,60);
  */
  engine.particleManager.generatorList.push(gen1);
}

function scene_tp3_1(){

  var gen1 = new GeneratorBox();
  gen1.min.setXY(30,0);
  gen1.max.setXY(30,0);

  var gen2 = new GeneratorBox();
  gen2.min.setXY(470,0);
  gen2.max.setXY(470,10);

  var gen3 = new GeneratorBox();
  gen3.min.setXY(40,430);
  gen3.max.setXY(40,430);

  var gen4 = new GeneratorBox();
  gen4.min.setXY(490,430);
  gen4.max.setXY(490,430);

  var obs1=new Segment(new Vector(0,0),new Vector(150,100));
  var obs2=new Segment(new Vector(500,0),new Vector(350,100));

  var obs3=new Segment(new Vector(150,400),new Vector(150,250));
  var obs4=new Segment(new Vector(350,400),new Vector(350,250));
  var obs5=new Segment(new Vector(150,400),new Vector(350,400));

  var obs6=new Segment(new Vector(0,410),new Vector(500,410));

  var obs7=new Circle(new Vector(30,430),20);
  var obs8=new Circle(new Vector(80,430),20);
  var obs9=new Circle(new Vector(130,430),20);
  var obs10=new Circle(new Vector(180,430),20);
  var obs11=new Circle(new Vector(230,430),20);
  var obs12=new Circle(new Vector(280,430),20);
  var obs13=new Circle(new Vector(330,430),20);
  var obs14=new Circle(new Vector(380,430),20);
  var obs15=new Circle(new Vector(430,430),20);
  var obs16=new Circle(new Vector(480,430),20);

  var obs17=new Segment(new Vector(0,450),new Vector(500,450));


 engine.obstacleManager.obstacleList.push(obs1,obs2, obs3, obs4,obs5,obs6,obs7,obs8,obs9,obs10,obs11,obs12,obs13,obs14,obs15,obs16,obs17);
 engine.particleManager.generatorList.push(gen1,gen2,gen3,gen4);
}

function scene_tp3_2(){

  var gen1 = new GeneratorBox();
  gen1.min.setXY(150,30);
  gen1.max.setXY(350,30);

  var c1=new Segment(new Vector(90,350),new Vector(90,50));
  var c2=new Segment(new Vector(410,350),new Vector(410,50));

  var c3=new Segment(new Vector(90,350),new Vector(200,410));
  var c4=new Segment(new Vector(410,350),new Vector(300,410));

  var c5=new Circle(new Vector(250,250),20);
  var c6=new Circle(new Vector(200,200),20);
  var c7=new Circle(new Vector(320,220),20);
  var c8=new Circle(new Vector(150,300),20);
  var c9=new Circle(new Vector(300,300),20);
  var c10=new Circle(new Vector(350,150),20);
  var c11=new Circle(new Vector(150,190),20);
  var c12=new Circle(new Vector(250,90),20);
  var c13=new Circle(new Vector(200,120),20);
  var c14=new Circle(new Vector(130,110),20);
  var c15=new Circle(new Vector(380,90),20);

  var c16=new Circle(new Vector(270,150),30);
  var c17=new Circle(new Vector(230,350),30);

  var c18=new Segment(new Vector(150,460),new Vector(150,430));
  var c19=new Segment(new Vector(350,460),new Vector(350,430));
  var c20=new Segment(new Vector(150,460),new Vector(350,460));

  engine.obstacleManager.obstacleList.push(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20);
  engine.particleManager.generatorList.push(gen1);
}
