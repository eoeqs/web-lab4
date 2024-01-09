
package web.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import web.back.dao.UserRepository;
import web.back.dto.UserDto;
import web.back.models.User;
import web.back.services.AuthManager;


@RestController
@RequestMapping("/web-4-eoeqs/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserRepository userRepository;
    private AuthManager authManager;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setAuthenticationManager(AuthManager authManager) {
        this.authManager = authManager;
    }


    @PostMapping("/check")
    public boolean checkUser(@RequestBody UserDto userDto) {
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

}