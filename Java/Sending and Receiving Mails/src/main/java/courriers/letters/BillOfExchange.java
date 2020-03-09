package courriers.letters;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Amount;
import courriers.content.Text;

/**
* @author bivolarov , fernandes
* Class that represent a Bill of exchange which have Amount for content 
*/

public class BillOfExchange extends Letter<Amount> {
	

	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	public BillOfExchange(Inhabitant sender, Inhabitant receiver, Amount content) {
		super(sender, receiver, content);
	}
	
	
	/**
	 * method to calculate the cost of a bill of exchange
	 *@return the cost
	 */
	@Override
	public float cost() {
		return 1 +this.content.getSum()/100 ;
		
	}

	/**
	 *The action of a bill of exchange
	 */

	@Override
	public void action() {
		System.out.println(this.receiver.getName() + " a recu une Lettre de change avec une valeur" + this.content.getSum() + " envoye par " + this.sender.getName()) ;
		this.receiver.credit(this.content.getSum());
		this.sender.debit(this.content.getSum());
		Text t = new Text("Merci pour le courrier de change") ;
		Letter<?> l = new SimpleLetter(this.receiver, this.sender, t) ;
		this.receiver.debit(this.content.getSum());
		this.receiver.sendLetter(l);
	}

}
