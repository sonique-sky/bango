package sonique.bango.util;

import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.controller.RequestParameters;
import sonique.bango.domain.sorter.Comparators;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;
import static sonique.bango.domain.sorter.Comparators.aggregatedComparator;

public class PagedSearchResultsCreator {

    public static <T> PagedSearchResults<T> createPageFor(RequestParameters requestParameters, List<T> list, Comparators<T> sorters) {
        List<T> page;

        Optional<Comparator<T>> comparator = aggregatedComparator(requestParameters.getSort().stream().map(sorters::comparatorFor).collect(toList()));
        if (comparator.isPresent()) {
            page = list.stream()
                    .sorted(comparator.get())
                    .skip(requestParameters.getStart())
                    .limit(requestParameters.getLimit())
                    .collect(toList());
        } else {
            page = list.stream()
                    .skip(requestParameters.getStart())
                    .limit(requestParameters.getLimit())
                    .collect(toList());
        }

        return new PagedSearchResults<>(page, (long) list.size());
    }
}
