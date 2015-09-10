package sonique.bango.domain.sorter;

import java.io.Serializable;

public class Sorter implements Serializable {
    public enum Direction {
        Ascending,
        Descending;

        public static Direction from(String value) {
            if ("DESC".equals(value.toUpperCase())) {
                return Descending;
            }
            return Ascending;
        }
    }

    private String property;
    private Direction direction;

    public Sorter() {
    }

    public Sorter(String property, Direction direction) {
        this.property = property;
        this.direction = direction;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }
}
