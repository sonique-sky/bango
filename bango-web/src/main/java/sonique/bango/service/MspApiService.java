package sonique.bango.service;

import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.controller.RequestParams;

public interface MspApiService {
    PagedSearchResults<DomainMajorServiceProblemDashboardEntry> serviceProblems(RequestParams params);
}
