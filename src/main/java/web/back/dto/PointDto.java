package web.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PointDto {
    private double x;
    private double y;
    private int r;
    private boolean isHit;
}
