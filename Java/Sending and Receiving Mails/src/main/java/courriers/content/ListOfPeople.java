package courriers.content;

import java.util.ArrayList;
import java.util.List;

import courriers.Content;
import courriers.Inhabitant;


/**
 * @author bivolarov , fernandes
 * Class that represent the content List of people which is contained in a fool letter 
 */
public class ListOfPeople implements Content {
	

	protected List<Inhabitant> list_people ;
	
	/**
	 * the constructor
	 * initialize the list of people
	 */
	public ListOfPeople() {
		this.list_people = new ArrayList<Inhabitant>() ;
	}
	
	
	/**
	 * add inhabitants in the list of people
	 * @param e, an Inhabitant
	 */
	public void addInahbitant(Inhabitant e) {
		this.list_people.add(e) ;
	}
	
	/**
	 * remove inhabitants in the list of people
	 * @param e, an inhabitant
	 */
	public void removeInahbitant(Inhabitant e) {
		this.list_people.remove(e) ;
	}
	
	/**
	 * get the list of people
	 * @return the list of people
	 */
	public List<Inhabitant> getList_people() {
		return this.list_people;
	}

}
