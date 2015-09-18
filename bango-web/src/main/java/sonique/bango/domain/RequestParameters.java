package sonique.bango.domain;

import sonique.bango.domain.filter.Filter;
import sonique.bango.domain.sorter.Sorter;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class RequestParameters {
    private final int start;
    private final int limit;
    private final Sorter group;
    private final List<Sorter> sorters;
    private final List<Filter> filters;

    public RequestParameters(Integer start, Integer limit, List<Sorter> sorters, List<Filter> filters, Sorter group) {
        this.start = start == null ? 0 : start;
        this.limit = limit == null ? Integer.MAX_VALUE : limit;
        this.group = group;
        this.sorters = sorters == null ? newArrayList() : sorters;
        this.filters = filters == null ? newArrayList() : filters;
    }

    public int getStart() {
        return start;
    }

    public int getLimit() {
        return limit;
    }

    public List<Sorter> getSorters() {
        return sorters;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public Sorter getGroup() {
        return group;
    }
}
