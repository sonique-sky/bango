package sonique.bango.util;

import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.controller.RequestParameters;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.domain.sorter.Sorter;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isEmpty;
import static sonique.bango.domain.sorter.Comparators.aggregatedComparator;

public class PagedSearchResultsCreator {

    public static <T> PagedSearchResults<T> createPageFor(
            RequestParameters requestParameters,
            List<T> list,
            Comparators<T> comparators,
            Optional<Predicate<T>> filter) {

        List<T> page;
        List<Sorter> sorters = requestParameters.getSort();
        sorters.add(0, requestParameters.getGroup());

        Optional<Comparator<T>> comparator = aggregatedComparator(
                sorters.stream()
                        .filter(sorter -> sorter != null && !isEmpty(sorter.getProperty()) && !sorter.getProperty().equals("null"))
                        .map(comparators::comparatorFor)
                        .collect(toList())
        );

        if (comparator.isPresent()) {
            page = filter.flatMap(f -> Optional.of(list.stream().filter(f))).orElseGet(list::stream)
                    .sorted(comparator.get())
                    .skip(requestParameters.getStart())
                    .limit(requestParameters.getLimit())
                    .collect(toList());
        } else {
            page = filter.flatMap(f -> Optional.of(list.stream().filter(f))).orElseGet(list::stream)
                    .skip(requestParameters.getStart())
                    .limit(requestParameters.getLimit())
                    .collect(toList());
        }

        return new PagedSearchResults<>(page, (long) list.size());
    }
}
