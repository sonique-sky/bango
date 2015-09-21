package sonique.bango.domain.sorter;

import java.util.Comparator;
import java.util.Date;
import java.util.function.Function;

public class NestedFieldComparator<T, D extends Comparable<D>> implements Comparator<T> {

    public static <T> Comparator<T> nestedStringFieldComparator(Function<T, String> extractorFunction) {
        return new NestedFieldComparator<>(extractorFunction, "");
    }

    public static <T> Comparator<T> nestedDateFieldComparator(Function<T, Date> extractorFunction) {
        return new NestedFieldComparator<>(extractorFunction, new Date(0));
    }

    private final Function<T, D> nestedFieldExtraction;
    private final D defaultValue;

    private NestedFieldComparator(Function<T, D> nestedFieldExtraction, D defaultValue) {
        this.nestedFieldExtraction = nestedFieldExtraction;
        this.defaultValue = defaultValue;
    }

    @Override
    public int compare(T o1, T o2) {
        return extractField(o1).compareTo(extractField(o2));
    }

    private D extractField(T rootObject) {
        try {
            return nestedFieldExtraction.apply(rootObject);
        } catch (NullPointerException e) {
            return defaultValue;
        }
    }

}
