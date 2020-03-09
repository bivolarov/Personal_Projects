package courriers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @author bivolarov , fernandes
 * Class that represent a City
 */
public class City {
	protected String name;
	protected List<Inhabitant> inhabitantList;
	protected List<Letter<?>> mailbox;
	protected List<Letter<?>> LetterBag;
	
	
	
	/**
	 * The constructor
	 * @param name , the city's name
	 */
	public City(String name) {
		this.name = name;
		this.mailbox = new ArrayList<Letter<?>>() ;
		this.LetterBag = new ArrayList<Letter<?>>() ;
		this.inhabitantList = new ArrayList<Inhabitant>() ;
	}

	/**
	 * get the city's name
	 * @return name, the city's name
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * set the city's name
	 * @param name, the city's name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * get the inhabitant list of the city
	 * @return inhabitantList ,the inhabitant list of the city
	 */
	public List<Inhabitant> getInhabitantList() {
		return this.inhabitantList;
	}

	/**
	 * add inhabitant in the inhabitant list of the city
	 * @param i, an inhabitant
	 */
	public void addInhabitantToList(Inhabitant i) {
		this.inhabitantList.add(i);
		
	}
	
	/**
	 * remove inhabitant in the inhabitant list of the city
	 * @param i, an inhabitant
	 */
	public void removeInhabitantFromList(Inhabitant i){
		this.inhabitantList.remove(i);
	}
	
	/**
	 * get the mailbox of the city
	 * @return mailbox, list of letter (of any type)
	 */
	public List<Letter<?>> getMailbox() {
		return this.mailbox;
	}


	/**
	 * get the letter bag of the city
	 * @return LetterBag, list of letter (of any type)
	 */
	public List<Letter<?>> getLetterBag() {
		return this.LetterBag;
	}

	/**
	 *  add letter in the letter bag of the city
	 * @param l, the letter
	 */
	public void addLetterToBag(Letter<?> l) {
		this.LetterBag.add(l);
	}
	/**
	 * remove a letter from the letter bag of the city
	 * @param l, the letter
	 */
	public void removeLetterFromBag(Letter<?> l){
		this.LetterBag.remove(l);
	}
	
	/**
	 *  add letter in the mail box of the city
	 * @param l, the letter
	 */
	
	public void addLetterToMailBox(Letter<?> l) {
		this.mailbox.add(l) ;
	}
	
	/**
	 * method for distributing letters to inhabitant of the city 
	 */
	
	public void distributeLetters() {
		List<Letter<?>> toRemove = new ArrayList<>();
		this.LetterBag.addAll(this.mailbox) ;
		
		for(Letter<?> l : this.mailbox) {
			toRemove.add(l) ;
		}
		this.mailbox.removeAll(toRemove) ;
		
		
		for(Letter<?> l : this.LetterBag) {
			l.getReceiver().receiveLetter(l);
		}
		this.LetterBag.removeAll(toRemove) ;
		
	}
	
	/**
	 * get 1 inhabitant randomly
	 * @return Inhabitant
	 */
	
	public Inhabitant get1RandomInhabitant() {
		Random r = new Random();
		return this.inhabitantList.get(r.nextInt(this.inhabitantList.size())) ;	
			  
	}
	
	/**
	 * get 10 inhabitants randomly
	 * @return l, list of inhabitant
	 */
	public List<Inhabitant> get10RandomInhabitant() {
		List<Inhabitant> l = new ArrayList<Inhabitant>() ;
		Random r = new Random();
		for(int i = 0 ; i < 10 ; i++) {
			Inhabitant h = this.inhabitantList.get(r.nextInt(this.inhabitantList.size())) ;	
			if(!l.contains(h)) {
				l.add(h) ;
			}
		}
		return l ;
		  
	}
	
	
	
	
	
	
	
	
}
