package rental;
import java.util.*;
/**
 * An AndFilter performs the intersection of filters. It accepts a vehicle if each of its filter accepts it.
*/
public class AndFilter implements VehicleFilter {

    private List<VehicleFilter> theFilters;

    /** creates an InterFilter with no filter */
    public AndFilter() {
		// A COMPLETER
    this.theFilters = new ArrayList<VehicleFilter>() ;
    }

    /** adds a new filter
    * @param f the added filter
    */
    public void addFilter(VehicleFilter f) {
		// A COMPLETER
    this.theFilters.add(f) ;
    }

    /** Accept the vehicle if each of its filters accepts it
     * @see VehicleFilter#accept(Vehicle) */
    public boolean accept(Vehicle v) {
	// A COMPLETER
    boolean res = false ;
    for(VehicleFilter f : this.theFilters){
      if(f.accept(v) == true){
        res = true ;
      }
    }
    return res ;
    }
}
