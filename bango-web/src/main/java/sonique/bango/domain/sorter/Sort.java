package sonique.bango.domain.sorter;

import java.io.Serializable;

public class Sort implements Serializable {
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

    private static final Sort NULL_SORT = new Sort(null, null);

    public static Sort nullSort() {
        return NULL_SORT;
    }

    private String property;
    private Direction direction;

    public Sort() {
    }

    public Sort(String property, Direction direction) {
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
