package web.back.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import web.back.services.AreaCheck;

@Data
@NoArgsConstructor
@Entity
@Table(name = "points")
@Getter
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double x;

    @Column(nullable = false)
    private double y;

    @Column(nullable = false)
    private int r;

    @Column(nullable = false)
    private boolean isHit;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Point(String strX, String strY, String strR, User user) {
        x = Double.parseDouble(strX);
        y = Double.parseDouble(strY);
        r = Integer.parseInt(strR);
        this.user = user;

        isHit = AreaCheck.checkHit(this.x, this.y, this.r);
    }
}
