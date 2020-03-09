package rental ;
import java.util.*;


public class SuspiciousRentalAgency extends RentalAgency{

    public void setDiscount(){
      for(Map.Entry<Client,Vehicle> rented : rentedVehicles.entrySet()){
        if(rented.getKey().getAge() < 25){
            rented.getValue().setDiscountPrice(10) ;
        }
      }

}
}
