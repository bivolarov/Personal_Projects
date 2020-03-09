import org.junit.*;
import static org.junit.Assert.*;

import battleship.Ship;


public class ShipTest{
   @Test
   public void TestLifePointsdecreasedWhenHitted() {
     Ship s = new Ship(3);
     assertEquals(s.getLifePoints(), 3);
     s.hit();
     assertEquals(s.getLifePoints(), 2);
   }
}
