package web.back.services;
import java.io.Serializable;

public class AreaCheck implements Serializable {

    public static boolean checkHit(double x, double y, int r) {
        if ((x <= 0 && y >= 0) && (x*x + y*y <= r*r)) {
            return true;
        }
        if ((x <= 0 && y <= 0) && (x >= -r && y >= (double) -r /2)) {
            return true;
        }
        if ((x >= 0 && y <= 0)  && (x-y <= (double) r /2)) {
            return true;
        }
        return false;
    }
}
