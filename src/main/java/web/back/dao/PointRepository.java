package web.back.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.back.models.Point;
import web.back.models.User;

import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
    List<Point> findPointByUser(User user);

    void deletePointByUser(User user);
}
