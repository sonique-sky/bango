package sonique.bango.util;

import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.Filter;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sky.sns.spm.web.spmapp.shared.dto.SortDescriptor;
import sonique.bango.domain.sorter.Comparators;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isEmpty;
import static sonique.bango.domain.filter.Filters.andFilter;
import static sonique.bango.domain.sorter.Comparators.aggregatedComparator;

public class PagedSearchResultsCreator {

    public static <T> PagedSearchResults<T> createPageFor(
            SearchParametersDTO searchParameters,
            List<T> list,
            Comparators<T> comparators) {
        return createPageFor(searchParameters, list, comparators, filter -> (t) -> false);
    }

    public static <T> PagedSearchResults<T> createPageFor(
            SearchParametersDTO searchParameters,
            List<T> list,
            Comparators<T> comparators,
            Function<Filter, Predicate<T>> filterFunction) {

        List<SortDescriptor> sorters = searchParameters.sorters();
        sorters.add(0, searchParameters.group());

        List<T> filteredList = andFilter(searchParameters.filters(), filterFunction::apply)
                .flatMap(f -> Optional.of(list.stream().filter(f)))
                .orElseGet(list::stream)
                .collect(toList());

        Optional<Comparator<T>> comparator = aggregatedComparator(
                sorters.stream()
                        .filter(sorter -> sorter != null && !isEmpty(sorter.getSortProperty()) && !sorter.getSortProperty().equals("null"))
                        .map(comparators::comparatorFor)
                        .collect(toList())
        );

        List<T> page;
        if (comparator.isPresent()) {
            page = filteredList.stream()
                    .sorted(comparator.get())
                    .skip(searchParameters.getStart())
                    .limit(searchParameters.getLimit())
                    .collect(toList());
        } else {
            page = filteredList.stream()
                    .skip(searchParameters.getStart())
                    .limit(searchParameters.getLimit())
                    .collect(toList());
        }

        return new PagedSearchResults<>(page, (long) filteredList.size());
    }
}
