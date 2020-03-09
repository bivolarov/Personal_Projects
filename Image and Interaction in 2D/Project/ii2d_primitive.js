/**
 *
 * Vector
 *
 *  */
class Vector {
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }

  /// @return p1+p2
  static add(p1,p2) {
    return new Vector(p1.x+p2.x,p1.y+p2.y);
  }

  /// add u to this
  add(u) {
    this.x+=u.x;
    this.y+=u.y;
    return this;
  }

  /// @return a copy of this
  clone() {
    return new Vector(this.x,this.y);
  }

  /// copy p to this
  set(p) {
    this.x=p.x;
    this.y=p.y;
    return this;
  }

  setRandInt(p1,p2){
        this.x = randInt(p1.x , p2.x) ;
        this.y = randInt(p1.y , p2.y) ;
        return this ;
  }

  setXY(x1 , y2){
    this.x = x1 ;
    this.y = y2 ;
    return this ;
  }

  /*TP2*/
  norme(){
    return Math.sqrt(this.x**2 + this.y**2);
  }

  produitScalaire(v){
    return this.x*v.x + this.y*v.y ;
  }






 };
