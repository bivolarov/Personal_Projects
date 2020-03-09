package Tests;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Text;
import courriers.decorateurLetters.RegisteredLetter;
import courriers.letters.AcknowedgementOfReceipt;

public class MockRegisteredLetter extends RegisteredLetter {

	public MockRegisteredLetter(Inhabitant sender, Inhabitant receiver, Letter<?> content) {
		super(sender, receiver, content);
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void action() {
		super.action();
		this.doActions++ ;
	}
	

}
