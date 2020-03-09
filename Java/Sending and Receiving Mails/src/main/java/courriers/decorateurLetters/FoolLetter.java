package courriers.decorateurLetters;


import java.util.List;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Amount;
import courriers.content.ListOfPeople;
import courriers.letters.BillOfExchange;

import java.util.Random;


import java.util.ArrayList;
import java.util.List;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Amount;
import courriers.content.ListOfPeople;

import java.util.Random;

/**
 * @author bivolarov , fernandes
 * Class that represent a Fool letter which have a list of people for content 
 */
public class FoolLetter extends Letter<ListOfPeople> {
	
	private BillOfExchange be ;
	private ListOfPeople lo ;
	
	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	public FoolLetter(Inhabitant sender, Inhabitant receiver, ListOfPeople content) {
		super(sender, receiver, content);
		lo = new ListOfPeople() ;
	}
	
	/**
	 * add people in the temporary list of people
	 * @param e
	 */
	public void addPeople(Inhabitant e) {
		this.lo.getList_people().add(e);
	}
	
	
	/**
	 *The action of a fool letter
	 */
	@Override
	public void action() {
		int rn = 0 ;
		Random r = new Random();
		rn = r.nextInt(100);

		if(rn <= 10) {
		
		
		
				Amount a = new Amount(5) ;
				//to send 5€ to all the people from the list
				for(Inhabitant i : this.content.getList_people()) {
					be = new BillOfExchange(this.receiver, i , a) ;
					this.receiver.sendLetter(be);
				}
				
				//to remove the first person from list and add our name
				List<Inhabitant> new_l = new ArrayList<Inhabitant>() ;
				for(Inhabitant i : this.content.getList_people()) {
					new_l.add(i) ;
				}
				
				new_l.remove(0) ;
				new_l.add(this.receiver);
				//to add the new person's name in a new list 
				for(Inhabitant i : new_l) {
					lo.addInahbitant(i);
				}
				//to send the new list to the new persons
				for(Inhabitant i : this.receiver.getCity().get10RandomInhabitant()) {
					Letter<?> l = new FoolLetter(this.receiver, i, lo) ;
					this.receiver.sendLetter(l);
				}
		
	}

	}
	
	/**
	 * method to calculate the cost of a fool
	 *@return the cost
	 */
	@Override
	public float cost() {
		return 0;
	}

}

