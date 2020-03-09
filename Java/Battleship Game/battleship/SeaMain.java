package battleship ;
import battleship.util.* ;
import battleship.* ;


public class SeaMain{

    public static void main(String[] args){
        boolean defender = true ;
        Ship s = new Ship(2) ;
        Position p = new Position(2,3) ;
        Sea sea = new Sea(5, 5) ;
        sea.addShipHorizontally(s , p) ;
        Game g = new Game(sea) ;
        System.out.println(g) ;
    }


}
