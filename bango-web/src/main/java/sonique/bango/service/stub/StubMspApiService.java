package sonique.bango.service.stub;

import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.infrastructure.repository.DomainMajorServiceProblemRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.controller.RequestParams;
import sonique.bango.service.MspApiService;

import java.util.List;

public class StubMspApiService implements MspApiService {

    private final DomainMajorServiceProblemRepository repository;

    public StubMspApiService(DomainMajorServiceProblemRepository repository) {
        this.repository = repository;
    }

    @Override
    public PagedSearchResults<DomainMajorServiceProblemDashboardEntry> serviceProblems(RequestParams params) {
        List<DomainMajorServiceProblemDashboardEntry> entries = repository.findOpenDashBoardEntries();
        return new PagedSearchResults<>(entries, (long) entries.size());
    }
}
