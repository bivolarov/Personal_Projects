package battleship ;

public class Cell{
  private Ship s ;
  private boolean shot ;

  /**represent the cells for the board
  */
  public Cell() {
    this.shot = false ;
  }

  /**serve to set a ship
    *@param ship the ship to place
  */
  public void setShip(Ship ship){
    this.s = ship ;
  }

  /**serve to get a ship
    *@return a ship if exist on the cell , null otherwise
  */
  public Ship getShip(){
    return this.s ;
  }


  /**method to shoot on a cell
   *@return Answer
  */
  public Answer shoot(){
    if(this.shot){
      return Answer.MISSED ;
    }
    this.shot = true ;
    if(this.s != null){
        this.s.hit();
        if(this.s.isSunked()){
          return Answer.SUNK ;
        }
        else{
          return Answer.HIT ;
        }
    }
    else{
      return Answer.MISSED ;
    }
  }

  /**to know if a cell is shotted
    *@return true if thr cell is shot , false otherwise
  */
  public boolean hasBeenShot(){
    return this.shot ;
  }


  /**serves to know the corresponding character of the cells
    *@param defender true if we are defender false to be attacker
    *@return the corresponding string representation
  */
  public String getCharacter(boolean defender){
      String res = "" ;
      if(defender == true){
          if(this.s == null){
            res += '~' ;
          }
          if(this.s != null && this.shot == false){
            res += 'B' ;
          }
          if(this.s != null && this.shot == true){
            res += '*' ;
          }


      }

      else{
          if(this.shot == false && this.s == null || this.s != null){
            res += '.' ;
          }
          if(this.s == null && this.shot == true){
            res += '~' ;
          }
          if(this.s != null && this.shot == true){
            res += '*' ;
          }

      }

    return res ;
  }

}
