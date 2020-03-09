package rental;

public class Vehicle {

	protected String brand;
	protected String model;
	protected int productionYear;
	protected float dailyRentalPrice;

	/**
	 * creates a vehivle with given informations
	 *
	 * @param brand
	 *            the vehicle's brand
	 * @param model
	 *            the vehicle's model
	 * @param productionYear
	 *            the vehicle's production year
	 * @param dailyRentalPRice
	 *            the daily rental price
	 */
	public Vehicle(String brand, String model, int productionYear, float dailyRentalPRice) {
		this.brand = brand;
		this.model = model;
		this.productionYear = productionYear;
		this.dailyRentalPrice = dailyRentalPRice;
	}

	/**
	 * @return the brand for this vehicle
	 */
	public String getBrand() {
		return this.brand;
	}

	/**
	 * @return the modelfor this vehicle
	 */
	public String getModel() {
		return this.model;
	}

	/**
	 * @return the production year for this vehicle
	 */
	public int getProductionYear() {
		return this.productionYear;
	}

	/**
	 * @return this vehicle daily price
	 */
	public float getDailyPrice() {
		return this.dailyRentalPrice;
	}

	public void setDiscountPrice(float dis){
		float discount = 0 ;
		discount = this.dailyRentalPrice/dis ;
		this.dailyRentalPrice -= discount ;
	}

	/**
	 * this vehicle is equals to another if they have same brand, model,
	 * production year and daily rental price
	 *
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	public boolean equals(Object o) {
		if (o instanceof Vehicle) {
			Vehicle theOther = ((Vehicle) o);
			return this.brand.equals(theOther.brand)
					&& this.model.equals(theOther.model)
					&& this.productionYear == theOther.productionYear
					&& this.dailyRentalPrice == theOther.dailyRentalPrice;
		} else {
			return false;
		}
	}

	public String toString() {
		return this.productionYear + " " + this.brand + " " + this.model + " " + this.dailyRentalPrice;
	}
}
