package Tests;

import org.junit.Assert.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.*;

import courriers.Account;
import courriers.City;
import courriers.Inhabitant;
import courriers.Letter;
import courriers.content.Text;
import courriers.letters.SimpleLetter;

public class TestLetter {

	private Letter l ;
	private Inhabitant sender ;
	private Inhabitant receiver ;
	private City c ;
	
	@Before 
	public void init() {
		this.c = new City("Sofia") ;
		this.sender = new Inhabitant("Fernandes", new Account(1000), this.c) ;
		this.receiver = new Inhabitant("Stoyan", new Account(1000), this.c) ;
		
		this.l = new MockSimpleLetter(sender, receiver,  new Text("hey you")) ;
				
	}
	
	@Test
	public void testIfTheMethodActionsIsCalledForSimpleLetter() {
	 assertEquals(0, this.l.getDoActions());
	 this.l.getSender().sendLetter(this.l);
	 this.l.getReceiver().receiveLetter(this.l);
	 assertEquals(1, this.l.getDoActions());
	 				
	}
	
	@Test
	public void testIfTheMethodActionsIsCalledForAcknowledgementAndRegisteredLetters() {
		SimpleLetter sl = new SimpleLetter(this.sender, this.receiver, new Text("Hey you :***")) ;
		MockRegisteredLetter mr = new MockRegisteredLetter(sl.getSender(), sl.getReceiver(), sl) ;
		assertEquals(0, mr.getDoActions());
		mr.getSender().sendLetter(mr);
		mr.getReceiver().receiveLetter(mr);
		assertEquals(1, mr.getDoActions());
	}
	
	
	
	
	
	
}
