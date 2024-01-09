package web.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.back.dao.UserRepository;
import web.back.models.User;

import java.util.Base64;

@Service
public class AuthManager {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User setNewUser(String username, String password) {
        for (User user : userRepository.findAll()) {
            if (user.getUsername().equals(username)) {
                return null;
            }
        }

        User newUser = new User();
        newUser.setUsername(username);
        String hashPassword = PasswordManager.getHash(password);
        newUser.setPassword(hashPassword);
        userRepository.save(newUser);
        return new User(username, hashPassword);
    }

    public User getOldUser(String username, String password) {
        if (username == null || password == null) return null;
        String hashPassword = PasswordManager.getHash(password);
        for (User user : userRepository.findAll()) {
            if (user.getUsername().equals(username) && user.getPassword().equals(hashPassword)) {
                return user;
            }
        }
        return null;
    }

//    public User getOldUserByHash(String username, String hashPassword) {
//        if (username == null || hashPassword == null) return null;
//        for (User user : userRepository.findAll()) {
//            if (user.getUsername().equals(username) && user.getPassword().equals(hashPassword)) {
//                return user;
//            }
//        }
//        return null;
//    }

    public User getOldUserByAuthorizationHeader(String authorizationHeader) {
        String loginColonPassword = authorizationHeader.split(" ")[1];
        byte[] decodedBytes = Base64.getDecoder().decode(loginColonPassword);
        String decodedString = new String(decodedBytes);
        String[] loginPassword = decodedString.split(":");
        String username = loginPassword[0];
        String password = loginPassword[1];
        return getOldUser(username, password);
    }
}
