package courriers;

import java.util.ArrayList;
import java.util.Collections;

import courriers.content.Amount;
import courriers.content.ListOfPeople;
import courriers.content.Text;
import courriers.decorateurLetters.FoolLetter;
import courriers.decorateurLetters.RegisteredLetter;
import courriers.decorateurLetters.UrgentLetter;
import courriers.letters.BillOfExchange;
import courriers.letters.SimpleLetter;

/**
 * @author bivolarov , fernandes
 * Class that represents the simulation of sending and receiving letters 
 *
 */
public class Simulate {
	
	private City c ;
	
	public Simulate(City c) {
		this.c = c ;
	}
	
	private void sendSimpleLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendSimpleLetter() ;
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("Hey you :* ")) ;
		sender.sendLetter(sl);
	}
	
	private void sendSimpleRegisteredLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendSimpleRegisteredLetter() ;
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("Hey you :* ")) ;
		RegisteredLetter rl = new RegisteredLetter(sl.getSender(), sl.getReceiver(), sl) ;
		sender.sendLetter(rl);
	}
	
	private void sendSimpleUrgentLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendSimpleUrgentLetter() ;
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("Hey you :* ")) ;
		UrgentLetter ul = new UrgentLetter(sl.getSender(), sl.getReceiver(), sl) ;
		sender.sendLetter(ul);
	}
	
	private void sendSimpleUrgentRegisteredLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendSimpleUrgentRegisteredLetter() ;
		}
		SimpleLetter sl = new SimpleLetter(sender, receiver, new Text("Hey you :* ")) ;
		UrgentLetter ul = new UrgentLetter(sl.getSender(), sl.getReceiver(), sl) ;
		RegisteredLetter rl = new RegisteredLetter(ul.getSender(), ul.getReceiver(), ul) ;
		sender.sendLetter(rl);
	}
	
	private void sendExchangeLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendExchangeLetter() ;
		}
		BillOfExchange be = new BillOfExchange(sender, receiver, new Amount(10)) ;
		sender.sendLetter(be);
	}
	
	
	private void sendExchangeRegisteredLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendExchangeRegisteredLetter();
		}
		BillOfExchange be = new BillOfExchange(sender, receiver, new Amount(10)) ;
		RegisteredLetter rl = new RegisteredLetter(be.getSender(), be.getReceiver(), be) ;
		sender.sendLetter(rl);
	}
	
	private void sendExchangeUrgentLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendExchangeUrgentLetter();
		}
		BillOfExchange be = new BillOfExchange(sender, receiver, new Amount(10)) ;
		UrgentLetter ul = new UrgentLetter(be.getSender(), be.getReceiver(), be) ;
		sender.sendLetter(ul);
	}
	
	private void sendExchangeUrgentRegisteredLetter() {
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		if(sender.getName() == receiver.getName()) {
			sendExchangeUrgentRegisteredLetter();
		}
		BillOfExchange be = new BillOfExchange(sender, receiver, new Amount(10)) ;
		UrgentLetter ul = new UrgentLetter(be.getSender(), be.getReceiver(), be) ;
		RegisteredLetter rl = new RegisteredLetter(ul.getSender(), ul.getReceiver(), ul) ;
		sender.sendLetter(rl);
	}
	
	private void printLineOfSimulate() {
		System.out.println("-------------------------------------------------------------------------------------") ;
	}
	
	
	public void simulate() {
		
		printLineOfSimulate();
		System.out.println("Jour 1") ;
		
		sendSimpleLetter();
		sendExchangeLetter();
		sendSimpleRegisteredLetter();
		sendExchangeUrgentLetter();
		
		printLineOfSimulate();
		System.out.println("Jour 2") ;
		
		this.c.distributeLetters();
		
		sendSimpleLetter();
		sendSimpleUrgentLetter();
		sendSimpleUrgentRegisteredLetter();
		sendExchangeLetter();
		
		printLineOfSimulate();
		System.out.println("Jour 3") ;
		
		this.c.distributeLetters();
		
		sendSimpleLetter();
		sendSimpleLetter();
		sendExchangeLetter();
		sendExchangeUrgentLetter();
		
		printLineOfSimulate();
		System.out.println("Jour 4") ;
		
		this.c.distributeLetters();
		
		sendSimpleLetter();
		sendExchangeLetter();
		sendSimpleRegisteredLetter();
		sendExchangeUrgentRegisteredLetter();
		
		printLineOfSimulate();
		System.out.println("Jour 5") ;
		
		this.c.distributeLetters();
		
		printLineOfSimulate();
		System.out.println("Jour 6") ;
		
		this.c.distributeLetters();
	}
	
	private ListOfPeople createListOfPeople() {
		ListOfPeople LP = new ListOfPeople() ;
		for(int i = 20 ; i < 30 ; i++){
			Inhabitant h = new Inhabitant("hab" + i , new Account(100), this.c) ;
			LP.addInahbitant(h);
			this.c.addInhabitantToList(h);
		}
		return LP ;
	}
		
	public void simulate_2() {
		ListOfPeople LP = createListOfPeople();
		Inhabitant sender = this.c.get1RandomInhabitant() ;
		Inhabitant receiver = this.c.get1RandomInhabitant() ;
		FoolLetter fl = new FoolLetter(sender, receiver, LP) ;
		sender.sendLetter(fl);
		this.c.distributeLetters();
		
		float max = 0 ;
		for(Inhabitant h : this.c.getInhabitantList()) {
			if(h.getBankAccount().getAmount() > max) {
				max = h.getBankAccount().getAmount() ;
			}
			
		}
		
		for(Inhabitant h : this.c.getInhabitantList()) {
			if(h.getBankAccount().getAmount() == max) {
				System.out.println("L'Habitant le plus riche est : " + h.getName()) ;
			}
			
		}
		
		
	}
	

	
	

}
