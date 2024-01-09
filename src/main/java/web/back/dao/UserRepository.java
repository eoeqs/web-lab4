package web.back.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import web.back.models.User;

@Component
public interface UserRepository extends JpaRepository<User, Long> {

}
