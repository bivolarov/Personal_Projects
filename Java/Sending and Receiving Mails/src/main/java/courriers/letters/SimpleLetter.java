package courriers.letters;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Text;


/**
 * @author bivolarov , fernandes
 * Class that represent a simple letter which have Text for content 
 */
public class SimpleLetter extends Letter<Text> {

	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	public SimpleLetter(Inhabitant sender, Inhabitant receiver, Text content) {
		super(sender, receiver, content);
	}

	/**
	 * method to calculate the cost of a simple letter
	 *@return the cost
	 */
	@Override
	public float cost() {
		return (float) 0.5;
	}

	/**
	 *The action of the simple letter
	 */

	@Override
	public void action() {
		System.out.println(this.receiver.getName() + " a recu une SimpleLetter envoye par " + this.sender.getName()) ;
	}
	
	

}
