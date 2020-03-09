import org.junit.*;
import static org.junit.Assert.*;

import battleship.util.Position;
import battleship.Answer;
import battleship.Cell;
import battleship.Sea;
import battleship.Ship;

public class Seatest(){

  @Test
  public void TestShootWhenWork(){
    Sea s = new Sea(3,3);
    Position p = new Position(2,2);
    assertEquals( s.shoot(p) , Answer.MISSED );
  }

  @Test(expected = ArrayIndexOutOfBoundsException.class )
  public void TestShootWhenNotWork(){
    Sea s = new Sea(3,3);
    Position p = new Position(5,5);
    s.shoot(p) ;
  }

}
