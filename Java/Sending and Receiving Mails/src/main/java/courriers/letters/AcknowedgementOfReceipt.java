package courriers.letters;

import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Text;

/**
 * @author bivolarov , fernandes
 * Class that represent an Acknowledgement Of Receipt which have a Text for content 
 */
public class AcknowedgementOfReceipt extends Letter<Text>{
	
	
	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	public AcknowedgementOfReceipt(Inhabitant sender, Inhabitant receiver, Text content) {
		super(sender, receiver, content);
	}
	/*
	 *The action of an Acknowledgment of receipt
	 */
	@Override
	public void action() {
		
	}
	
	/**
	 * method to calculate the cost of an Acknowledgment of receipt
	 *@return the cost
	 */
	@Override
	public float cost() {
		return 0;
	}

}
