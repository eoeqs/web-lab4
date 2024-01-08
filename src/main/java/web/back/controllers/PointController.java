package web.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import web.back.dao.PointRepository;
import web.back.dto.PointCoordinatesDto;
import web.back.dto.PointDto;
import web.back.models.Point;
import web.back.models.User;
import web.back.services.AuthManager;
import web.back.services.PointValidator;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/points")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PointController {
    private PointRepository pointRepository;

    private AuthManager authManager;

    @Autowired
    public void setAttemptRepository(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }
    @Autowired
    public void setAuthenticationManager(AuthManager authManager) {
        this.authManager = authManager;
    }

    @GetMapping("/all")
    public List<PointDto> getAllPoints(@RequestHeader Map<String, String> headers) {
        User user = authManager.getOldUserByAuthorizationHeader(headers.get("authorization"));
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }

        return pointRepository.findPointByUser(user).stream().map(
                point -> new PointDto(point.getX(), point.getY(), point.getR(), point.isHit())).toList();
    }
    @PostMapping("/new")
    public PointDto checkHit(@RequestHeader Map<String, String> headers, @RequestBody PointCoordinatesDto pointCoordinatesDto) {
        User user = authManager.getOldUserByAuthorizationHeader(headers.get("authorization"));

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }

        String strX = pointCoordinatesDto.getStrX();
        String strY = pointCoordinatesDto.getStrY();
        String strR = pointCoordinatesDto.getStrR();

        if (!PointValidator.validateXYR(strX, strY, strR)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad request");
        }

        Point point = new Point(strX, strY, strR, user);

        pointRepository.save(point);
        return new PointDto(point.getX(), point.getY(), point.getR(), point.isHit());
    }

    @PostMapping("/clear")
    @CrossOrigin
    @Transactional
    public void clearAttempts(@RequestHeader Map<String, String> headers) {
        User user = authManager.getOldUserByAuthorizationHeader(headers.get("authorization"));

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }
        pointRepository.deletePointByUser(user);
    }
}
