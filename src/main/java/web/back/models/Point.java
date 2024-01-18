package web.back.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "points")
@Getter
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "point_seq")
    @SequenceGenerator(name = "point_seq", sequenceName = "point_id_sequence")
    private Long id;

    @Column(name = "x")
    private Double x;

    @Column(name = "y")
    private Double y;

    @Column(name = "r")
    private Double r;

    @Column(name = "time")
    private String time;

    @Column(name = "execution")
    private String execution;

    @Column(name = "result")
    private boolean result;

    @Column(name = "username")
    private String username;

    public void setTime(Date time) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyy HH:mm:ss");
        this.time = sdf.format(time);
    }
}
