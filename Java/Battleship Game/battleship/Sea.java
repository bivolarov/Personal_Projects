package battleship ;
import battleship.Ship ;
import battleship.Cell ;
import battleship.Answer ;
import battleship.util.Position ;
import java.util.* ;

public class Sea{

  //the board
  private Cell[][] tab_sea ;
  //the life points of and on the board
  private int full_sum;
  //the board's rows
  private int row ;
  //the board's cols
  private int col ;

  /**create a new instance of Sea Object
    *@param rows the rows of the board
    *@param cols the cols of the board
  */
  public Sea(int rows , int cols){
    this.row = rows ;
    this.col = cols ;
    this.tab_sea = new Cell[rows][cols] ;
    for(int i = 0 ; i < rows ; i++ ){
      for(int j = 0 ; j < cols ; j++){
        this.tab_sea[i][j] = new Cell() ;
      }
    }

  }

  /**the given position to shoot , the result is returned
   * @param pos the aimed Position
   * @return Answer the result of the shoot
   * @throws ArrayIndexOutOfBoundsException
  */
  public Answer shoot(Position p) throws ArrayIndexOutOfBoundsException {
      Cell c = this.tab_sea[p.getX()][p.getY()] ;
      return c.shoot() ;
  }

  /** displays the board line by line and cell by cell ,
   *  the display changes for the defender or the opponent , defined
   *  by the code <code>defender</code> argument,
   * @param defender <code>true</code> if display is for defender ,
   */
  public void display(boolean defender){
      System.out.println("Battleship Representation :") ;
      System.out.println('\n') ;
      for(int row = 0 ; row < this.tab_sea.length ; row++){
        for(int col = 0 ; col < this.tab_sea.length ; col++){
            System.out.print(this.tab_sea[row][col].getCharacter(defender)) ;
            System.out.print("\t") ;
        }
        System.out.println() ;
      }
  }

  /** add the ship b vertically down from position p. The number of
  * cells is determined by the ship length.
  * @param shipToPlace the ship to add
  * @param position the position of the first (top) cell occupied by the ship
  * @throws IllegalStateException if the ship b can not be placed on the sea
  * (outside of the board or some cell is not empty)
  */
  public void addShipVertically(Ship s , Position p){
    int life_points = s.getLifepoints() ;
    try{
    for(int i = 0 ; i < life_points ; i++){
      if(this.tab_sea[p.getX()+i][p.getY()].getShip() == null){
        this.tab_sea[p.getX()+i][p.getY()].setShip(s) ;
      }
      else{
        throw new IllegalStateException("Cannot place Ship") ;
      }
    }
  }
    catch(ArrayIndexOutOfBoundsException e){
        throw new IllegalStateException("Outside of the board") ;

    }
  }


  /** add the ship b horizontally right from position p. The number of
  * cells is determined by the ship length.
  * @param shipToPlace the ship to add
  * @param position the position of the first (top) cell occupied by the ship
  * @throws IllegalStateException if the ship b can not be placed on the sea
  * (outside of the board or some cell is not empty)
  */
  public void addShipHorizontally(Ship s , Position p){
    int life_points = s.getLifepoints() ;
    try{
    for(int i = 0 ; i < life_points ; i++){
      if(this.tab_sea[p.getX()][p.getY()+i].getShip() == null){
        this.tab_sea[p.getX()][p.getY()+i].setShip(s) ;
      }
      else{
        throw new IllegalStateException("Cannot place Ship") ;
      }
    }
  }
    catch(ArrayIndexOutOfBoundsException e){
        throw new IllegalStateException("Outside of the board") ;

    }
  }

  /**the row of the Sea board
    @return the numeric number of row board
  */
  public int getRow(){
    return this.row ;
  }

  /**the column of the Sea board
    @return the numeric number of column board
  */
  public int getCol(){
    return this.col ;
  }

  /**give the points on the board (counted by the ship life points)
    @return the total poitn on the board
  */
  public int getPoints(){
    return this.full_sum;
  }

  /**
    serves to set points on the board
  */
  public void setPoints(){
    for(int i = 0 ; i < this.row ; i++ ){
      for(int j = 0 ; j < this.col ; j++){
          if(this.tab_sea[i][j].getShip() != null && this.tab_sea[i][j].hasBeenShot() == false){
            this.full_sum += 1 ;
          }
          else if(this.tab_sea[i][j].getShip() != null && this.tab_sea[i][j].hasBeenShot() == true){
            this.full_sum -= 1 ;
          }

      }
    }
  }



}
