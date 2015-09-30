package sonique.bango.service.stub;

import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblem;
import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.infrastructure.repository.DomainMajorServiceProblemRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.MspApiService;
import spm.domain.MajorServiceProblemId;

import java.util.List;

public class StubMspApiService implements MspApiService {

    private final DomainMajorServiceProblemRepository repository;

    public StubMspApiService(DomainMajorServiceProblemRepository repository) {
        this.repository = repository;
    }

    @Override
    public PagedSearchResults<DomainMajorServiceProblemDashboardEntry> serviceProblems(SearchParametersDTO searchParameters) {
        List<DomainMajorServiceProblemDashboardEntry> entries = repository.findOpenDashBoardEntries();
        return new PagedSearchResults<>(entries, (long) entries.size());
    }

    @Override
    public List<EventHistoryItem> eventHistory(MajorServiceProblemId majorServiceProblemId) {
        DomainMajorServiceProblem majorServiceProblem = repository.findByMajorServiceProblemId(majorServiceProblemId);
        return majorServiceProblem.historyItems();
    }
}
