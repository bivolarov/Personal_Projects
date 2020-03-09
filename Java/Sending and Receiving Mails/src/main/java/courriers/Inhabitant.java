package courriers;

/**
 * @author bivolarov , fernandes
 * Class that represent Inhabitant of a City
 */
public class Inhabitant {
	
		protected String name;
		protected Account BankAccount;
		protected City city;
		
		/**
		 * The constructor
		 * @param name, the inhabitant's name
		 * @param bank,  the inhabitant's Account
		 * @param city,  the inhabitant's City
		 */
		public Inhabitant(String name,Account bank, City city ) {
			this.name = name;
			this.BankAccount = bank;
			this.city = city;
		}
		

		/**
		 * get the inhabitant's name
		 * @return name
		 */
		public String getName() {
			return this.name;
		}

		/**
		 * set the inhabitant's name
		 * @param name
		 */
		public void setName(String name) {
			this.name = name;
		}

		/**
		 * get the inhabitant's Account
		 * @return BankAccount
		 */
		public Account getBankAccount() {
			return this.BankAccount;
		}

		/**
		 * set the inhabitant's Account
		 * @param bankAccount
		 */
		public void setBankAccount(Account bankAccount) {
			this.BankAccount = bankAccount;
		}

		/**
		 * get the inhabitant's City
		 * @return city
		 */
		public City getCity() {
			return this.city;
		}

		/**
		 * set the inhabitant's City
		 * @param c, the city
		 */
		public void setCity(City c) {
			this.city = c;
		}
		
		/**
		 * permit to remove sum of money in the inhabitant's account
		 * @param cost, the cost to remove
		 */
		public void debit(float cost) {
			this.BankAccount.setAmount(this.BankAccount.getAmount() - cost);
		}
		
		/**
		 * permit to add sum of money in the inhabitant's account
		 * @param cost, the cost to add
		 */
		public void credit(float cost) {
			this.BankAccount.setAmount(this.BankAccount.getAmount() + cost);
		}
		
		/**
		 * allows the inhabitant to send a letter
		 * @param l, the letter
		 */
		
		public void sendLetter(Letter<?> l) {
			if(this.BankAccount.getAmount() >= l.cost()) {
				System.out.println(">>> " + l.getSender() .getName() + " envoie un courrier de type : " + l.getClass().getSimpleName() + " avec un cout : " + l.cost() + " a " + l.getReceiver().getName()) ; 
				this.debit(l.cost());
				this.getCity().addLetterToMailBox(l) ;
			}	
		}
		
		/**
		 * allows the inhabitant to receive a letter
		 * @param l, the letter
		 */
		
		public void receiveLetter(Letter<?> l) {
			l.action() ;
		}
		
		
			
		
}
