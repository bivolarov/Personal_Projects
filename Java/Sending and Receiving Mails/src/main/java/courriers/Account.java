package courriers;

/**
 * @author bivolarov , fernandes
 * Class that represent the bank account of an inhabitant
 */
public class Account {
		
	protected float amount;

	/**
	 * the constructor
	 * @param amount, the amount in the account
	 */
	public Account(float amount) {
		this.amount = amount;
	}
	

	/**
	 * get  the amount in the account of an inhabitant
	 * @return amount, the amount in the account  
	 */
	public float getAmount() {
		return this.amount;
	}
	
	
	/**
	 * set  the amount in the account of an inhabitant
	 */
	public void setAmount(float amount) {
		this.amount = amount;
	}
	
	
	
}