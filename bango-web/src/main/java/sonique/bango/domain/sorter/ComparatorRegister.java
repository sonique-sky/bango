package sonique.bango.domain.sorter;

import java.util.Comparator;

public interface ComparatorRegister<T> {

    default Comparator<T> comparatorFor(final Sort sortData) {
        Comparator<T> comparator = createComparator(sortData);
        return sortData.getDirection() == Sort.Direction.Descending ? comparator.reversed() : comparator;
    }

    Comparator<T> createComparator(final Sort sortData);
}
