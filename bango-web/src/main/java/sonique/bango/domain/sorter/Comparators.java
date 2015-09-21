package sonique.bango.domain.sorter;

import sky.sns.spm.web.spmapp.shared.dto.SortDescriptor;

import java.util.*;

public abstract class Comparators<T> {

    private final Map<String, Comparator<T>> comparators = new HashMap<>();

    protected Comparator<T> add(String key, Comparator<T> comparator) {
        return comparators.put(key, comparator);
    }

    public Comparator<T> comparatorFor(SortDescriptor sorter) {
        Comparator<T> comparator = comparators.get(sorter.getSortProperty());
        return sorter.getSortDirection().isAscending() ? comparator : comparator.reversed();
    }

    public static <C> Optional<Comparator<C>> aggregatedComparator(Collection<Comparator<C>> comparatorChain) {
        return comparatorChain.stream().reduce(Comparator::thenComparing);
    }

    public static int compareBoolean(boolean v1, boolean v2) {
        return (v1 == v2) ? 0 : (v1 ? 1 : -1);
    }

    public static int compareInt(int v1, int v2) {
        return (v1 < v2) ? -1 : (v1 == v2) ? 0 : 1;
    }

    public static int compareDouble(double v1, double v2) {
        return Double.valueOf(v1).compareTo(v2);
    }

    public static int compareLong(long v1, long v2) {
        return (v1 < v2) ? -1 : (v1 == v2) ? 0 : 1;
    }
}
