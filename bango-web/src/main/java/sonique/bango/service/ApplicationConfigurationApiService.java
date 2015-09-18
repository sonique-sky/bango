package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.RequestParameters;

public interface ApplicationConfigurationApiService {
    PagedSearchResults<ProblemCategory> problemCategory(RequestParameters requestParameters);
}
