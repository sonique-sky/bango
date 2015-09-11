package sonique.bango.domain.sorter;

import java.util.Collection;
import java.util.Comparator;

public abstract class Comparators<T> {

    public Comparator<T> comparatorFor(final Sorter sorter) {
        Comparator<T> comparator = getComparator(sorter);
        return sorter.getDirection() == Sorter.Direction.Descending ? comparator.reversed() : comparator;
    }

    protected abstract Comparator<T> getComparator(final Sorter sorter);

    public static <C> Comparator<C> aggregatedComparator(Collection<Comparator<C>> comparatorChain) {
        return comparatorChain.stream().reduce(Comparator::thenComparing).get();
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
