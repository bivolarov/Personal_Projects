package battleship ;

public class Ship {
  //the ship's life Points
  private int lifePoints ;


  /**here you can create a ship
    *@param length the ship life Points, who is also his length
  */
  public Ship(int length){
    this.lifePoints = length ;
  }

  /**method to get the ship's life points
    @return the numeric value of the ship's life points
  */
  public int getLifepoints(){
    return this.lifePoints ;
  }

  /**here you can decrease the ship's life points
  */
  public void hit(){
    this.lifePoints -= 1 ;

  }

  /**here you can know if the ship is drowned
    *@return true if the ship is sunked, false otherwise
  */
  public boolean isSunked(){
    if(this.lifePoints == 0){
      return true ;
    }
    return false ;
  }
}
