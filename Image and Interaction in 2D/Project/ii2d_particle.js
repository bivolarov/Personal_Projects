/**
 *
 *
 *
 * */

class GeneratorBox {
  constructor() {
    this.nbBirth=0;
    this.birthRate=2;
    this.min = new Vector(0,0) ;
    this.max = new Vector(350,350) ;
    this.minNeg = new Vector(-350,-350) ;
    this.timeLifeMin = 0 ;
    this.timeLifeMax = 150 ;
  }

  initParticle(p) {
      p.color.r = randInt(0,255) ;
      p.color.g = randInt(0,255) ;
      p.color.b = randInt(0,255) ;
      p.color.a = 1 ;
      p.position.setRandInt(this.min , this.max) ;
      p.velocity.setRandInt(this.minNeg , this.max) ;
      p.timeLife = randInt(this.timeLifeMin , this.timeLifeMax) ;
  }

  distance(m){
    return Math.sqrt(Math.pow(this.min.x - m.x , 2 ) + Math.pow(this.min.y - m.y , 2 ));
  }

  move(m){
    this.min.x += m.x;
    this.min.y += m.y;
    this.max.x += m.x;
    this.max.y += m.y;
  }

};



/**
 *
 *
 *
 *  */
class Particle {
  constructor() {
    this.position=new Vector(0,0);
    this.color={r:0,g:0,b:0 , a:1} ;
    this.isAlive = false ;
    this.timeLife = 0 ;
    this.velocity = new Vector(100,200) ; //vitesse
    this.force = new Vector(0,0) ; //force
    this.oldPosition = new Vector(0,0) ; // position a l'image precedente
    this.oldVelocity = new Vector(0,0) ; // vitesse a l'image precedente

  }

  draw() {
    ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a +  ')';
    //ctx.fillRect(this.position.x, this.position.y , 5, 5);
    var circle = new Path2D();
    circle.moveTo(this.position.x, this.position.y);
    circle.arc(this.position.x , this.position.y , 3 , 0, 2 * Math.PI);
    ctx.fill(circle);
  }


  motion(deltaT){

      this.oldPosition.x = this.position.x ;
      this.oldPosition.y = this.position.y ;
      this.oldVelocity.x = this.velocity.x ;
      this.oldVelocity.y = this.velocity.y ;

      this.velocity.x = this.oldVelocity.x + this.force.x*deltaT ;
      this.velocity.y = this.oldVelocity.y + this.force.y*deltaT ;

      this.position.x = this.oldPosition.x + this.velocity.x*deltaT ;
      this.position.y = this.oldPosition.y + this.velocity.y*deltaT ;

  }

  calculForce(){
      let g = new Vector(0 , 9000.81) ;
      this.force.x = g.x ;
      this.force.y = g.y ;
  }




};

/**
 *
 *
 *
 *
 * */


class ParticleManager {
  constructor() {
    this.all=[];
    this.nbAliveMax=2000;
    //this.generator = new GeneratorBox() ;
    this.generatorList = [] ;
    this.selected = null;

    for(var i=0;i<this.nbAliveMax;++i) {
      this.all.push(new Particle());
    }
  }

  update() {

    /*
    var moitie = (this.all.length) / 2 ;
    for(var i = 0 ; i < moitie ; ++i){
      this.generatorList[0].initParticle(this.all[i]) ;
    }
    for(var i = moitie ; i < this.all.length ; ++i){
      this.generatorList[1].initParticle(this.all[i]) ;
    }

    */

    for(let i = 0 ; i < this.generatorList.length ; ++i){
      this.generatorList[i].nbBirth += this.generatorList[i].birthRate ;
    }


    for(let j = 0 ; j < this.all.length ; ++j){

      if(this.all[j].isAlive == false){
        let i = 0 ;
        while(!this.all[j].isAlive && i < this.generatorList.length ){
            if(this.generatorList[i].nbBirth >= 1){
              this.generatorList[i].nbBirth -= 1 ;
              this.all[j].isAlive = true ;
              this.generatorList[i].initParticle(this.all[j]) ;
            }
            i++ ;
          }
      }
      else {
            this.all[j].timeLife -= 1 ;
            if(this.all[j].timeLife == 0){
              this.all[j].isAlive = false ;
            }

            /* par exemple */
            if(this.all[j].timeLife < 20){
              this.all[j].color.a -= 0.005 ;

            }

      }
    }

  }


  draw() {
    for(var i = 0 ; i < this.all.length ; ++i){
      if(this.all[i].isAlive == true){
            this.all[i].draw() ;
      }
    }


  }

  select(m){
    this.selected = null;
    var distMin = 50;
    for(let i =0 ; i < this.generatorList.length ; ++i){
      if(this.generatorList[i].distance(m) < distMin){
         distMin = this.generatorList[i].distance(m);
         this.selected = this.generatorList[i];
      }
    }
  }

  motion(deltaT){
    for(var i = 0 ; i < this.all.length ; ++i){
      this.all[i].motion(deltaT) ;
    }
  }

  force(){
    for(var i = 0 ; i < this.all.length ; ++i){
      this.all[i].calculForce() ;
    }
  }

};
