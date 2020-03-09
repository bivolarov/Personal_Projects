package Tests;


import org.junit.Assert.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.*;

import courriers.Account;
import courriers.City;
import courriers.Inhabitant;


public class TestInhabitant {
		
	private Inhabitant hab ;
	
	@Before
	public void init() {
		this.hab = new Inhabitant("Fernandes", new Account(100), new City("Stalingrad")) ;
		
	}
	
	@Test
	public void testDebit() {
		this.hab.debit(50);
		assertTrue(this.hab.getBankAccount().getAmount() == 50) ;
	}
	
	@Test
	public void testCredit() {
		this.hab.credit(50);
		assertTrue(this.hab.getBankAccount().getAmount() == 150) ;
	}
	
	
	
		
	
}
