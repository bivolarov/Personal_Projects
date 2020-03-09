package courriers.decorateurLetters;

import courriers.Content;
import courriers.Inhabitant;
import courriers.Letter;
import courriers.LetterDecorateur;
import courriers.content.Text;
import courriers.letters.AcknowedgementOfReceipt;

/**
 * @author bivolarov , fernandes
 * Class that represent a Registered letter
 */

public class RegisteredLetter extends LetterDecorateur {
	
	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	
	public RegisteredLetter(Inhabitant sender, Inhabitant receiver, Letter<?> content) {
		super(sender, receiver, content) ;
	}
	
	/**
	 *The action of a registered letter
	 */
	
	@Override
	public void action() {	
			System.out.println(this.receiver.getName() + " a recu une Lettre recommande envoye par " + this.sender.getName()) ;
			Text t = new Text("un accuse de reception est alors envoye") ;
			AcknowedgementOfReceipt a = new AcknowedgementOfReceipt(this.receiver, this.sender, t) ;
			this.receiver.sendLetter(a);
	}
	
	
	/**
	 * method to calculate the cost of a registered letter
	 *@return the cost
	 */
	
	@Override
	public float cost() {
		float surcout = (15/100)*this.content.cost() ;
		return surcout ;
	}

}
