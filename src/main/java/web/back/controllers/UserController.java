
package web.back.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import web.back.models.User;
import web.back.services.UserService;

import java.net.URI;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    private final PasswordEncoder passwordEncoder;



    @CrossOrigin
    @PostMapping("/auth")
    private ResponseEntity<?> checkAuth(@RequestBody User user) {
        User realUser = userService.getUser(user.getUsername());
        if (realUser == null) {
            return ResponseEntity.badRequest().body("No such user");
        } else if (!passwordEncoder.matches(user.getPassword(), realUser.getPassword())) {
            return ResponseEntity.badRequest().body("Wrong password");
        } else {
            return ResponseEntity.ok().body("Access provided");
        }
    }

    @CrossOrigin
    @PostMapping("/save")
    private ResponseEntity<?> saveUser(@RequestBody User user) {
        User dbUser = userService.getUser(user.getUsername());
        if (dbUser == null) {
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toString());
            return ResponseEntity.created(uri).body(userService.saveUser(user));
        } else {
            return ResponseEntity.badRequest().body("User already exists");
        }
    }

}