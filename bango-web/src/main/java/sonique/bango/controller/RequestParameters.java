package sonique.bango.controller;

import sonique.bango.domain.filter.Filter;
import sonique.bango.domain.sorter.Sorter;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class RequestParameters {
    //NB: property name should match request parameter name
    private int page;
    private int start = 0;
    private int limit = Integer.MAX_VALUE;
    private Sorter group;
    private List<Sorter> sort = newArrayList();
    private List<Filter> filter = newArrayList();

    public RequestParameters() {
    }

    public RequestParameters(int start, int limit) {
        this.start = start;
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public List<Sorter> getSort() {
        return sort;
    }

    public void setSort(List<Sorter> sort) {
        this.sort = sort;
    }

    public List<Filter> getFilter() {
        return filter;
    }

    public void setFilter(List<Filter> filter) {
        this.filter = filter;
    }

    public Sorter getGroup() {
        return group;
    }

    public void setGroup(Sorter group) {
        this.group = group;
    }
}
