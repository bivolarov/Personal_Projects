package courriers.content;

import courriers.Content;

/**
 * @author bivolarov , fernandes
 * Class that represent the content Amount which is contained in a letter 
 */
public class Amount implements Content {
	protected float sum ;

	/**
	 * the constructor
	 * @param sum, the amount
	 */
	public Amount(float sum) {
		this.sum = sum;
	}

	/**
	 * get  the amount of the current letter
	 * @return sum, the amount of the current letter
	 */
	public float getSum() {
		return this.sum;
	}
	
	/**
	 * set  the amount of the current letter
	 */
	public void setSum(float sum) {
		this.sum = sum;
	}
	
	
}
