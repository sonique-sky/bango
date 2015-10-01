package sonique.bango.service.stub;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.service.EventHistoryApiService;
import sonique.bango.util.PagedSearchResultsCreator;
import spm.domain.ServiceProblemId;

import java.util.List;

public final class StubEventHistoryApiService implements EventHistoryApiService {
    private final DomainServiceProblemRepository serviceProblemRepository;

    public StubEventHistoryApiService(final DomainServiceProblemRepository serviceProblemRepository) {
        this.serviceProblemRepository = serviceProblemRepository;
    }

    @Override
    public PagedSearchResults<EventHistoryItem> read(Specification<ServiceProblemId> specification) {
        DomainServiceProblem serviceProblem = serviceProblemRepository.findByServiceProblemId(specification.criteria());
        List<EventHistoryItem> eventHistoryItems = serviceProblem.historyItems();

        return PagedSearchResultsCreator.createPageFor(specification.searchParameters(), eventHistoryItems, new EventHistoryComparators());
    }

    public static class EventHistoryComparators extends Comparators<EventHistoryItem> {
        public EventHistoryComparators() {
            add("eventType", (o1, o2) -> o1.type().compareTo(o2.type()));
            add("createdDate", (o1, o2) -> o1.createdDate().compareTo(o2.createdDate()));
            add("createdBy", (o1, o2) -> o1.createdBy().compareTo(o2.createdBy()));
        }
    }
}
