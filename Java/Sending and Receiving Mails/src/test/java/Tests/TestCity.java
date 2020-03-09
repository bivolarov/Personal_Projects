package Tests;

import org.junit.Assert.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.*;

import courriers.Account;
import courriers.City;
import courriers.Inhabitant;
import courriers.content.Text;
import courriers.letters.SimpleLetter;

public class TestCity {
	
	private City c ;
	
	@Before
	public void init() {
		this.c = new City("Topolovgrad") ;
		for(int i = 1 ; i <= 15 ; i++) {
			Inhabitant h = new Inhabitant("hab" + i, new Account(100) , this.c) ;
			//Adding Inhabitants to the City
			this.c.addInhabitantToList(h); 
		}
	}
	
	@Test
	public void testAddLetterToBag() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			testAddLetterToBag();
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("hey you")) ;
		this.c.addLetterToBag(sl);
		assertTrue(this.c.getLetterBag().contains(sl)) ;
	}
	
	
	@Test
	public void testRemoveLetterToBag() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			testAddLetterToBag();
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("hey you")) ;
		this.c.addLetterToBag(sl);
		this.c.removeLetterFromBag(sl);
		assertFalse(this.c.getLetterBag().contains(sl)) ;
	}
	
	@Test
	public void testAddLetterToMailBox() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			testAddLetterToBag();
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("hey you")) ;
		this.c.addLetterToMailBox(sl) ;
		assertTrue(this.c.getMailbox().contains(sl)) ;
	}
	
	
	
	

}
