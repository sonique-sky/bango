package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

public interface ApplicationConfigurationApiService {
    PagedSearchResults<ProblemCategory> problemCategory(SearchParametersDTO searchParameters);
}
