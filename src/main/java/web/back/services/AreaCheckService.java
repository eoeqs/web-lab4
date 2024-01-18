package web.back.services;

import org.springframework.stereotype.Service;
import web.back.models.Point;

import java.util.Date;

@Service
public class AreaCheckService {
    public Point check(Point point) {
        long start = System.nanoTime();
        point.setTime(new Date());
        point.setResult(isHit(point));
        point.setExecution(String.valueOf((System.nanoTime() - start)/1000));
        return point;
    }

    private boolean isHit(Point point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        return isRectangle(x, y, r) || isTriangle(x, y, r) || isSector(x, y, r);
    }

    private boolean isTriangle(double x, double y, double r) {
        return (x >= 0 && y <= 0)  && (x-y <=  r /2);
    }

    private boolean isSector(double x, double y, double r) {
        return (x <= 0 && y >= 0) && (x*x + y*y <= r*r);
    }

    private boolean isRectangle(double x, double y, double r) {
        return (x <= 0 && y <= 0) && (x >= -r && y >= -r /2);
    }

}
