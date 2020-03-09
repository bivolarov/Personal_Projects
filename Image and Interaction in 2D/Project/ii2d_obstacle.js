/**
 *
 *
 *
 * */

 class Circle {

   constructor(center , radius){
     this.center = center.clone() ;
     this.radius = radius;
     this.selected_color = 'red' ;
     this.oldCenter = new Vector(0,0) ;
   }

   draw(){
     ctx.beginPath();
     ctx.arc(this.center.x , this.center.y , this.radius , 0 ,  2 * Math.PI);
     ctx.strokeStyle = this.selected_color ;
     ctx.stroke();
   }
   move(m){
      this.center.x += m.x ;
      this.center.y += m.y ;
   }

   distance(m){
      let dist =  Math.sqrt(Math.pow(m.x - this.center.x , 2) + Math.pow(m.y - this.center.y , 2));
      return Math.abs(dist - this.radius) ;
   }

   intersect(p1 , p2){

     //On calcule d'abord la distance entre les Points P1 P2 et le centre
     //p1 -> x_old et p2 -> x_new
     let distCP1 = Math.sqrt((this.center.x - p1.x)**2 + (this.center.y - p1.y)**2) ;
     let distCP2 = Math.sqrt((this.center.x - p2.x)**2 + (this.center.y - p2.y)**2) ;


     //dehors du circle
     if(distCP1 > this.radius && distCP2 < this.radius){

       //Calcul de la normale
       let p2_c = new Vector(p2.x - this.center.x , p2.y - this.center.y) ;
       let normalise = new Vector(p2_c.x / p2_c.norme() , p2_c.y / p2_c.norme()) ;
       let n = new Vector(-normalise.y , normalise.x) ;
       return {isIntersect : true , normal : n , position : p2} ;
     }

     //dans le circle
     else if(distCP1 < this.radius && distCP2 > this.radius){

       //Calcul de la normale
       let p1_c = new Vector(p1.x - this.center.x  , p1.y - this.center.y) ;
       let normalise = new Vector(p1_c.x / p1_c.norme() , p1_c.y / p1_c.norme()) ;
       let n = new Vector(-normalise.y , normalise.x) ;
       return {isIntersect : true , normal : n , position : p1} ;
     }

     return {isIntersect : false, normal : new Vector(0,0), position : new Vector(0,0)} ;

   }

   setOldPos(){
     this.oldCenter.set(this.center) ;
   }

   oldCorrec(p){
     let new_v = new Vector(this.center.x - this.oldCenter.x , this.center.y - this.oldCenter.y) ;
     p.add(new_v) ;
     return p ;
   }

   rustine_position(p){

     let distXcol = Math.sqrt((this.center.x - p.position.x)**2 + (this.center.y - p.position.y)**2) ;
     let distXold = Math.sqrt((this.center.x - p.oldPosition.x)**2 + (this.center.y - p.oldPosition.y)**2) ;
     if(distXcol > this.radius && distXold < this.radius){
       p.position.set(this.center) ;
     }
   }

    rustine_vitesse(deltaT){
      return new Vector(-(this.center.x - this.oldCenter.x)/deltaT , -(this.center.y - this.oldCenter.y)/deltaT) ;
    }

 };

 class Segment {
   constructor(a ,b){
     this.a = a.clone();
     this.b = b.clone();
     this.selected_color = 'red' ;
     this.zone = 0 ; ;
     this.olda = new Vector(0,0) ;
     this.oldb = new Vector(0,0) ;
   }

   draw(){
     ctx.beginPath();
     ctx.moveTo(this.a.x,this.a.y);
     ctx.lineTo(this.b.x, this.b.y);
     ctx.strokeStyle = this.selected_color ;
     ctx.stroke();
   }

   move(m){
     if(this.zone == 1){
       //zone A
       this.a.x += m.x ;
       this.a.y += m.y ;
     }
     else if(this.zone == 2){
       //Zone B
       this.b.x += m.x ;
       this.b.y += m.y ;
     }
     else{
       this.a.x += m.x ;
       this.a.y += m.y ;
       this.b.x += m.x ;
       this.b.y += m.y ;
     }
    }

   distance(m){
        //AB
        let v1 = new Vector(this.a.x - this.b.x, this.a.y - this.b.y) ;
        //MA
        let v2 = new Vector(m.x - this.a.x , m.y - this.a.y) ;
        //BA
        let v3 = new Vector(this.b.x - this.a.x, this.b.y - this.a.y) ;
        //MB
        let v4 = new Vector(m.x - this.b.x , m.y - this.b.y) ;
        //AM
        let v5 = new Vector(this.a.x - m.x, this.a.y - m.y) ;
        //BM
        let v6 = new Vector(this.b.x - m.x, this.b.y - m.y) ;

        if(v1.produitScalaire(v2) > 0){
          //zoneA  ;
          this.zone = 1 ;
          return Math.sqrt((m.x - this.a.x)**2 + (m.y - this.a.y)**2);
        }

        if(v3.produitScalaire(v4) > 0){
          //zoneB ;
          this.zone = 2
          return Math.sqrt((m.x - this.b.x)**2 + (m.y - this.b.y)**2);
        }

        //Zone Line
        this.zone = 0
        let normalise = new Vector(v1.x / v1.norme() , v1.y / v1.norme()) ;
        let normale = new Vector(-normalise.y , normalise.x) ;
        return Math.abs(v2.produitScalaire(normale))/normale.norme() ;

   }


   intersect(p1 , p2){

     //Les Vecteurs necessaire pour les calculs
     let v1 = new Vector(p1.x - this.a.x , p1.y - this.a.y) ;
     let v2 = new Vector(p2.x - this.b.x , p2.y - this.b.y) ;
     let v3 = new Vector(this.a.x - p1.x , this.a.y - p1.y) ;
     let v4 = new Vector(this.b.x - p2.x , this.b.y - p2.y) ;

    //Deux Droites
    let ab = new Vector(this.b.x - this.a.x , this.b.y - this.a.y) ;
    let p1p2 = new Vector(p1.x - p2.x , p1.y - p2.y) ;

    //Normalise + Normale
    let ab_normalise = new Vector(ab.x / ab.norme() , ab.y / ab.norme()) ;
    let p1p2_normalise = new Vector(p1p2.x / p1p2.norme() , p1p2.y / p1p2.norme()) ;

    let ab_normale = new Vector(-ab_normalise.y , ab_normalise.x) ;
    let p1p2_normale = new Vector(-p1p2_normalise.y , p1p2_normalise.x) ;

    //Les Signes
    let s1 = v1.produitScalaire(ab_normale) ;
    let s2 = v2.produitScalaire(ab_normale) ;
    let s3 = v3.produitScalaire(p1p2_normale) ;
    let s4 = v4.produitScalaire(p1p2_normale) ;

    if(( (s1 > 0 && s2 < 0) || (s1 < 0 && s2 > 0) ) && ((s3 > 0 && s4 < 0) || (s3 < 0 && s4 > 0)) ){
      return {isIntersect : true , normal : ab_normale , position : this.a} ;
    }

    return {isIntersect : false, normal : new Vector(0,0), position : new Vector(0,0)} ;



   }

   setOldPos(){
     this.olda.set(this.a) ;
     this.oldb.set(this.b) ;
   }

   oldCorrec(p){
     let n_a = new Vector(this.a.x - this.olda.x , this.a.y - this.olda.y) ;
     let n_b = new Vector(this.b.x - this.oldb.x , this.b.y - this.oldb.y) ;
     let milieu = new Vector((n_a.x + n_b.x)/2 , (n_a.y + n_b.y)/2) ;
     p.add(milieu) ;
     return p ;
   }

   rustine_vitesse(deltaT){
     let v_a = new Vector((this.a.x - this.olda.x)/deltaT , (this.a.y - this.olda.y)/deltaT) ;
     let v_b = new Vector((this.b.x - this.oldb.x)/deltaT , (this.b.y - this.oldb.y)/deltaT) ;
     return new Vector(-(v_a.x + v_b.x) , -(v_a.y + v_b.y)) ;
   }



 };

 class ObstacleManager {
   constructor() {
   this.obstacleList=[];
   this.selected = null ;
  }

  draw(){
    for(let i = 0 ; i < this.obstacleList.length ; ++i) {
      this.obstacleList[i].draw();
    }
  }

  select(m){
    this.selected = null ;
    let distMin = 20 ;
    for(let i = 0 ; i < this.obstacleList.length ; ++i) {
      if(this.obstacleList[i].distance(m) < distMin){
        this.selected = this.obstacleList[i] ;
      }
    }

  }



 };
