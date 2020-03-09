package battleship ;

import battleship.io.* ;
import battleship.util.* ;
import battleship.* ;
import java.util.Scanner ;


public class Game{

    public Game(Sea s){

        Scanner myObj = new Scanner(System.in) ;
        System.out.println("You see the board , you are the attaquer , Good Luck !") ;
        s.setPoints() ;
        int get = s.getPoints() ;
        while(get != 0){
                    s.display(true) ;
                    System.out.println("Are you ready to shoot ?") ;
                    System.out.println("You have to enter the position of X on the board :") ;
                    int x = myObj.nextInt() ;
                    System.out.println("You have to enter the position of Y on the board :") ;
                    int y = myObj.nextInt() ;
                    System.out.println("----------------------------------") ;
                    Position p = new Position(x , y) ;
                    System.out.println("The result is : " + s.shoot(p)) ;
                    s.setPoints() ;
                    get = s.getPoints()   ;
                    System.out.println("The points are : " + get) ;
        }
        if(get == 0){
          System.out.println("You won the game , every ship on the board is sunked !") ;
        }

    }


}
