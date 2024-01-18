package web.back.services;

import org.springframework.stereotype.Service;
import web.back.models.Point;

@Service
public class PointValidationService {

    public boolean isValid(Point point) {
        if (point.getX() == null || point.getY() == null || point.getR() == null) {
            return false;
        }
        return isXValid(point.getX()) && isYValid(point.getY()) && isRValid(point.getR());
    }

    private boolean isXValid(double x) {
        return x >= -3 && x <= 5;
    }

    private boolean isYValid(double y) {
        return y >= -3 && y <= 3;
    }

    private boolean isRValid(double r) {
        return r >= -3 && r <= 5;
    }

}
