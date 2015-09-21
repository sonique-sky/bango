package sonique.bango.service;

import sky.sns.spm.domain.model.majorserviceproblem.DomainMajorServiceProblemDashboardEntry;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

public interface MspApiService {
    PagedSearchResults<DomainMajorServiceProblemDashboardEntry> serviceProblems(SearchParametersDTO searchParameters);
}
