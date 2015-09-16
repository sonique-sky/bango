package sonique.bango.domain.sorter;

import java.util.Comparator;
import java.util.function.Function;

public class NestedFieldComparator<T> implements Comparator<T> {

    public static <T> Comparator<T> nestedFieldComparator(Function<T, String> tStringFunction) {
        return new NestedFieldComparator<>(tStringFunction);
    }

    private final Function<T, String> nestedFieldExtraction;

    private NestedFieldComparator(Function<T, String> nestedFieldExtraction) {
        this.nestedFieldExtraction = nestedFieldExtraction;
    }

    @Override
    public int compare(T o1, T o2) {
        return extractField(o1).compareTo(extractField(o2));
    }

    private String extractField(T rootObject) {
        try {
            return nestedFieldExtraction.apply(rootObject);
        } catch (NullPointerException e) {
            return "";
        }
    }

}
