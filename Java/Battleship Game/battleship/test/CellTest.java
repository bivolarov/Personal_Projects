import org.junit.*;
import static org.junit.Assert.*;

import battleship.Ship;
import battleship.Cell;

public class CellTest() {

  @Test
  public void TestFirstShotDecreaseLifePoints(){
    Cell c1 = new cell();
    Ship s1 = new Ship(2);
    c1.setShip(s1);
    assertEquals(2, s1.getLifePoints());
    c1.shot();
    assertEquals(1, s1.getLifePoints());
  }

  @Test
  public void TestShootWhenAlreadyShotDoesNotChangeLifePoints(){
    Cell c1 = new cell();
    Ship s1 = new Ship(2);
    c1.setShip(s1);
    assertEquals(2, s1.getLifePoints());
    c1.shot();
    assertEquals(1, s1.getLifePoints());
    c1.shot();
    assertEquals(1, s1.getLifePoints());


  }


}
