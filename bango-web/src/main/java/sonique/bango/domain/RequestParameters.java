package sonique.bango.domain;

import sky.sns.spm.web.spmapp.shared.dto.SortDescriptor;
import sonique.bango.domain.filter.Filter;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class RequestParameters {
    private final int start;
    private final int limit;
    private final SortDescriptor group;
    private final List<SortDescriptor> sorters;
    private final List<Filter> filters;

    public RequestParameters(Integer start, Integer limit, List<SortDescriptor> sorters, List<Filter> filters, SortDescriptor group) {
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

    public List<SortDescriptor> getSorters() {
        return sorters;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public SortDescriptor getGroup() {
        return group;
    }
}
