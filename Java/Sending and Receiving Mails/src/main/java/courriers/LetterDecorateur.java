package courriers;

/**
 * @author bivolarov , fernandes
 * abstract Class that represent a decorator for letters 
 */
public abstract class LetterDecorateur extends Letter<Letter<?>> {
	
	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content, Content of the letter
	 */
	public LetterDecorateur(Inhabitant sender, Inhabitant receiver, Content content) {
		super(sender, receiver, content);
		
	}
	
	
	/**
	 * abstract method that will be implemented in the inheriting classes
	 * represent the action according to the type of letter
	 */
	public abstract void action();
	
	/**
	 * abstract method that will be implemented in the inheriting classes
	 * represent and calculates cost of a letter according to the type of letter 
	 */
	public abstract float cost() ;
	
	

}
