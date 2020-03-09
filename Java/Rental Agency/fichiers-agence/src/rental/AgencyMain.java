package rental;
import java.util.*;

public class AgencyMain {
    public static void main(String[] args){

      SuspiciousRentalAgency agence = new SuspiciousRentalAgency();

      Vehicle v1 = new Vehicle("renault", "clio", 2010, 80.0f);
      Vehicle v2 = new Vehicle("volks", "tiguan", 2018, 300.0f);
      Vehicle v3 = new Vehicle("renault", "espace", 2000, 20.0f);

      Client c1 = new Client("antoine" , 20);
      Client c2 = new Client("stoyan" , 21);

      agence.addVehicle(v1);
      agence.addVehicle(v2);
      agence.addVehicle(v3);

      BrandFilter marq = new BrandFilter("renault");
      agence.select(marq);
      agence.displaySelection(marq);

      try{
      agence.rentVehicle(c1,v1) ;
      agence.rentVehicle(c2,v2) ;
    }
    catch(UnknownVehicleException e){
      System.out.println("Problem") ;
    }
      agence.setDiscount() ;
      System.out.printf("%b",agence.hasRentedAVehicle(c1));
      System.out.println('\n');
      System.out.printf("%b",agence.isRented(v1));
      System.out.println('\n');
      System.out.printf("%b",agence.hasRentedAVehicle(c2));
      System.out.println('\n');
      agence.returnVehicle(c2) ;
      System.out.println(agence.allRentedVehicles());

    }
  }
