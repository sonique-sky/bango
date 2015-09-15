package sonique.bango.domain.filter;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;

public final class Filters {
    public static <T> Optional<Predicate<T>> andFilter(List<Filter> filters, Function<Filter, Predicate<T>> generator) {
        return filters.stream().map(generator::apply).reduce(Predicate::and);
    }

    public static <T> Optional<Predicate<T>> orFilter(List<Filter> filters, Function<Filter, Predicate<T>> generator) {
        return filters.stream().map(generator::apply).reduce(Predicate::or);
    }
}
