package courriers;

/**
 * abstract Class that represent a letter which can contain a content
 * @author bivolarov , fernandes
 */

public abstract class Letter<T extends Content> implements Content{
	

	protected Inhabitant sender;
	protected Inhabitant receiver;
	protected T content;
	protected int doActions ;
	
	/**
	 * The constructor
	 * @param sender, Inhabitant who will send the letter
	 * @param receiver, Inhabitant who will receive the letter
	 * @param content2, Content of the letter
	 */
	
	@SuppressWarnings("unchecked")
	public Letter(Inhabitant sender, Inhabitant receiver, Content content2) {
		this.sender = sender;
		this.receiver = receiver;
		this.content = (T) content2;
		this.doActions = 0 ;
	}

	/**
	 * @return the sender
	 */
	public Inhabitant getSender() {
		return this.sender;
	}

	/**
	 * set the sender of a letter
	 * @param sender
	 */
	public void setSender(Inhabitant sender) {
		this.sender = sender;
	}

	/**
	 * @return receiver
	 */
	public Inhabitant getReceiver() {
		return this.receiver;
	}

	/**
	 * set the receiver of the letter 
	 * @param receiver
	 */
	public void setReceiver(Inhabitant receiver) {
		this.receiver = receiver;
	}

	/**
	 * @return the content (generic type of content)
	 */
	public T getContent() {
		return this.content;
	}

	/**
	 * set the content of a letter
	 * @param content
	 */
	public void setContent(T content) {
		this.content = content;
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

	/**
	 * verifying if the method is called for the Mock
	 * @return doActions
	 */
	public int getDoActions() {
		return this.doActions ;
	}
}
