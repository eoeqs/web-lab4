
package web.back.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import web.back.dao.UserRepository;
import web.back.dto.SessionDto;
import web.back.dto.UserDto;
import web.back.models.User;
import web.back.services.AuthManager;
import web.back.services.SessionHandler;

import java.util.Map;


@RestController
@RequestMapping("/web-4-eoeqs/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserRepository userRepository;
    private AuthManager authManager;
    private SessionHandler handler;


    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setAuthenticationManager(AuthManager authManager) {
        this.authManager = authManager;
    }
    @Autowired
    public void setSessionHandler(SessionHandler handler) {
        this.handler = handler;
    }


    @PostMapping("/check")
    public boolean checkUser(@RequestBody UserDto userDto) {
        final String sessionID = handler.register(userDto.getUsername());
        final SessionDto sessionDto = new SessionDto();
        sessionDto.setSessionID(sessionID);
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        User user = authManager.getOldUser(username, password);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad request");
        }
        return true;
    }

    @PostMapping("/new")
    public boolean getNewUser(@RequestBody UserDto userDto) {
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        User user = authManager.setNewUser(username, password);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad request");
        }
        return true;
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String authentication) {
        System.out.println("Received authentication token: " + authentication);

        handler.invalidate(authentication);
        return ResponseEntity.noContent().build();
    }


}