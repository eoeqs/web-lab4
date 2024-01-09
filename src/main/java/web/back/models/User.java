package web.back.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import web.back.services.PasswordManager;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = PasswordManager.getHash(password);
    }
}
