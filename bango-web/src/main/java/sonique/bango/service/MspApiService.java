package sonique.bango.service;

import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.RequestParameters;

public interface MspApiService {
    PagedSearchResults<DomainMajorServiceProblemDashboardEntry> serviceProblems(RequestParameters params);
}
