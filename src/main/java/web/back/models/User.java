package web.back.models;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User  {
    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
}
