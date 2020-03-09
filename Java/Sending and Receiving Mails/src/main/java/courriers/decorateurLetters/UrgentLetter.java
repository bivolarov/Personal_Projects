package courriers.decorateurLetters;

import courriers.Content;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.LetterDecorateur;

/**
 * @author bivolarov , fernandes
 * Class that represent a Urgent letter  
 */
public class UrgentLetter extends LetterDecorateur {

	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	public UrgentLetter(Inhabitant sender, Inhabitant receiver, Content content) {
		super(sender, receiver, content);
	}
	/*
	 * The action of an urgent letter
	 */

	@Override
	public void action() {
		System.out.println(this.receiver.getName() + " a recu une Lettre d'urgence envoye par " + this.sender.getName()) ;
	}
	
	/*
	 * method to calculate the cost of an Acknowledgment of receipt
	 * @return the cost
	 */
	@Override
	public float cost() {
		return this.content.cost()*2;
	}

}
