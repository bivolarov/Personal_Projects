package rental ;


public class Car extends Vehicle{

      protected int nbre_passager ;


      public Car(String brand, String model, int productionYear, float dailyRentalPRice , int passager){
        super(brand,model,productionYear,dailyRentalPRice) ;
        this.nbre_passager = passager ;
      }

      public int getNbrePassager(){
        return this.nbre_passager ;
      }

      public String toString(){
         return super.toString() + " " + this.nbre_passager ;
      }

}
