package web.back.services;

public class PointValidator {
    public static boolean validateX(String strX) {
        if (strX == null) return false;
        try {
            double x = Double.parseDouble(strX);
            return -3 <= x && x <= 5;
        }
        catch (NumberFormatException _ignored) {
            return false;
        }
    }
    public static boolean validateY(String strY) {
        if (strY == null) return false;
        if (strY.length() > 7) return false;
        try {
            double y = Double.parseDouble(strY);
            return -3 <= y && y <= 3;
        }
        catch (NumberFormatException _ignored) {
            return false;
        }
    }
    public static boolean validateR(String strR) {
        if (strR == null) return false;
        try {
            int r = Integer.parseInt(strR);
            return -3 <= r && r <= 5;
        }
        catch (NumberFormatException _ignored) {
            return false;
        }
    }
    public static boolean validateXYR(String strX, String strY, String strR) {
        return validateX(strX) && validateY(strY) && validateR(strR);
    }
}