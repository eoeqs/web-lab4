package web.back.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.back.dao.PointRepository;
import web.back.models.Point;
import web.back.security.UsernameDecoder;
import web.back.services.AreaCheckService;
import web.back.services.PointValidationService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class PointController {
    private final PointRepository pointRepository;
    private final AreaCheckService areaCheckService;
    private final PointValidationService pointValidationService;

    @CrossOrigin
    @GetMapping("/points")
    public ResponseEntity<List<Point>> getAllPoints(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        String author = UsernameDecoder.decodeUsername(token);
        return ResponseEntity.ok(pointRepository.findAllByUsername(author));
    }

    @CrossOrigin
    @PostMapping("/points/checkhit")
    public ResponseEntity<Point> checkPoint(@RequestBody Point point, HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        String author = UsernameDecoder.decodeUsername(token);
        if (pointValidationService.isValid(point)) {
            areaCheckService.check(point);
            point.setUsername(author);
            pointRepository.save(point);
            return ResponseEntity.ok(point);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @GetMapping("/points/clear")
    public ResponseEntity<List<Point>> clearPoints(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        String author = UsernameDecoder.decodeUsername(token);
        pointRepository.clearHitsByUsername(author);
        return ResponseEntity.ok(pointRepository.findAllByUsername(author));
    }
}
