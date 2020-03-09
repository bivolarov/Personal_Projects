package battleship.util ;
import battleship.Cell ;


public class Position{
  private int x ;
  private int y ;

  /**represent the coordinates of the board's cells
    *@param x the x coordinate
    *@param y the y coordinate
  */
  public Position(int X , int Y){
    this.x = X ;
    this.y = Y ;
  }

  /**the x coordinate
    @return the numeric number of x
  */
  public int getX(){
    return this.x ;
  }

  /**the y coordinate
    @return the numeric number of y
  */
  public int getY(){
    return this.y ;
  }

  /**methode to compare 2 elements, here 2 position from Position
   *@param o an objet who has to be an isntance of Position objects
   *@return true if the 2 positions are equals false otherwise
  */
  public boolean equals(Object o){
    if(o instanceof Position){
      Position otherp = (Position) o ;
      return this.x == otherp.getX() && this.y == otherp.getY() ;
    }
    else{
      return false ;
    }
  }


  /**representation of position
   *@return the string representation of the position
  */
  public String toString(){
    return "The position of the cell is (" + this.x + "," + this.y + ")" ;
  }

}
