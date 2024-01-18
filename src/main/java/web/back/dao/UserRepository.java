package web.back.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import web.back.models.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);

}
