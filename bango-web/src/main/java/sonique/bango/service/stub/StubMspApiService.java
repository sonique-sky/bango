package sonique.bango.service.stub;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.infrastructure.repository.DomainMajorServiceProblemRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.service.MspApiService;
import sonique.bango.util.PagedSearchResultsCreator;
import spm.domain.MajorServiceProblemId;

import java.util.List;

public class StubMspApiService implements MspApiService {

    private final DomainMajorServiceProblemRepository repository;
    private final MajorServiceProblemDashboardEntryComparators majorServiceProblemDashboardEntryComparators;

    public StubMspApiService(DomainMajorServiceProblemRepository repository) {
        this.repository = repository;
        this.majorServiceProblemDashboardEntryComparators = new MajorServiceProblemDashboardEntryComparators();
    }

    @Override
    public PagedSearchResults<DomainMajorServiceProblemDashboardEntry> majorServiceProblems(SearchParametersDTO searchParameters) {
        return PagedSearchResultsCreator.createPageFor(
                searchParameters,
                repository.findOpenDashBoardEntries(),
                majorServiceProblemDashboardEntryComparators
        );
    }

    @Override
    public List<EventHistoryItem> eventHistory(MajorServiceProblemId majorServiceProblemId) {
        DomainMajorServiceProblem majorServiceProblem = repository.findByMajorServiceProblemId(majorServiceProblemId);
        return majorServiceProblem.historyItems();
    }

    private static class MajorServiceProblemDashboardEntryComparators extends Comparators<DomainMajorServiceProblemDashboardEntry> {
        // closed date ??
        public MajorServiceProblemDashboardEntryComparators() {
            add("id", (o1, o2) -> o1.getId().compareTo(o2.getId()));
            add("description", (o1, o2) -> o1.getDescription().compareTo(o2.getDescription()));
            add("startDate", (o1, o2) -> o1.getStartDate().compareTo(o2.getStartDate()));
            add("expectedResolutionDate", (o1, o2) -> o1.getExpectedResolutionDate().compareTo(o2.getExpectedResolutionDate()));
            add("outageId", (o1, o2) -> o1.getOutageId().compareTo(o2.getOutageId()));
            add("serviceCount", (o1, o2) -> new Integer(o1.getServiceCount()).compareTo(o2.getServiceCount()));
            add("serviceProblemCount", (o1, o2) -> new Integer(o1.getServiceProblemCount()).compareTo(o2.getServiceProblemCount()));
        }
    }
}
