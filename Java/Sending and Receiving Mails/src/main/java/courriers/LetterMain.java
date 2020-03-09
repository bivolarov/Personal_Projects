package courriers;

import courriers.content.Amount;
import courriers.content.ListOfPeople;
import courriers.content.Text;
import courriers.letters.BillOfExchange;
import courriers.letters.SimpleLetter;

public class LetterMain {

	public static void main(String[] args) {
		
		//Creation d'une Ville
		City city = new City("Topolovgrad") ;
		
		//Creation des Bank Accounts 
		Account account = new Account(100) ;
		
		//Creation des Inhabitants 
		
		for(int i = 1 ; i <= 15 ; i++) {
			Inhabitant h = new Inhabitant("hab" + i, account , city) ;
			//Adding Inhabitants to the City
			city.addInhabitantToList(h); 
		}
		
		//Simulation
		
		Simulate s = new Simulate(city) ;
		
		//First simulation
		s.simulate();
		
		//Second simulation (chaine a naifs)
		//s.simulate_2();	

	}

}
