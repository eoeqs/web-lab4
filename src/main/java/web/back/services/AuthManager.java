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
    public User getNewUser(String login, String password) {
        for (User user : userRepository.findAll()) {
            if (user.getLogin().equals(login)) {
                return null;
            }
        }
        return new User(login, password);
    }

    public User getOldUser(String login, String password) {
        if (login == null || password == null) return null;
        String hashPassword = PasswordManager.getHash(password);
        for (User user : userRepository.findAll()) {
            if (user.getLogin().equals(login) && user.getPassword().equals(hashPassword)) {
                return user;
            }
        }
        return null;
    }

    public User getOldUserByHash(String login, String hashPassword) {
        if (login == null || hashPassword == null) return null;
        for (User user : userRepository.findAll()) {
            if (user.getLogin().equals(login) && user.getPassword().equals(hashPassword)) {
                return user;
            }
        }
        return null;
    }

    public User getOldUserByAuthorizationHeader(String authorizationHeader) {
        String loginColonPassword = authorizationHeader.split(" ")[1];
        byte[] decodedBytes = Base64.getDecoder().decode(loginColonPassword);
        String decodedString = new String(decodedBytes);
        String[] loginPassword = decodedString.split(":");
        String login = loginPassword[0];
        String password = loginPassword[1];
        return getOldUser(login, password);
    }
}
