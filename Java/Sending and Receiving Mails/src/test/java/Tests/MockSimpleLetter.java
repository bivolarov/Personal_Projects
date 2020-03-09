package Tests;

import courriers.Account;
import courriers.City;
import courriers.Content;
import courriers.Inhabitant;
import courriers.content.Text;
import courriers.letters.SimpleLetter;
import courriers.Letter;


public class MockSimpleLetter extends SimpleLetter {
	

	public MockSimpleLetter(Inhabitant sender, Inhabitant receiver, Text content2) {
		super(sender, receiver, content2);
		this.doActions = 0 ;
		
	}

	@Override
	public void action() {
		this.doActions++ ;
		super.action();
		
	}

	@Override
	public float cost() {
		return super.cost();
	}
	

	
	
	

}
