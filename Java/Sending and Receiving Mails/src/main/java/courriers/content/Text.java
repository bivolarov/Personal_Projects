package courriers.content;

import courriers.Content;


/**
 * @author bivolarov , fernandes
 * Class that represent the content Text which is contained in a letter 
 */
public class Text implements Content {
	protected String message;

	/**
	 * the constructor
	 * @param message, the message of the current letter
	 */
	public Text(String message) {
		this.message = message;
	}

	/**
	 * get the message of the current letter
	 * @return message,  the message of the current letter
	 */
	public String getMessage() {
		return this.message;
	}
	
	
	/**
	 * set the message of the current letter
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
}
