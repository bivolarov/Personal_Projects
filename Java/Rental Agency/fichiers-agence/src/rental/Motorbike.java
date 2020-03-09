package rental ;


public class Motorbike extends Vehicle{

    protected float cylindre ;

    public Motorbike(String brand, String model, int productionYear, float dailyRentalPRice , float cm){
      super(brand , model , productionYear , dailyRentalPRice) ;
      this.cylindre = cm ;
    }

    public float getCM(){
      return this.cylindre ;
    }

    public String toString(){
      return super.toString() + " "  + this.cylindre + " cm3" ;
    }

}
