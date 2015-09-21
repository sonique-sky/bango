package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

public interface ProblemCategoryApiService {
    ProblemCategory create(ProblemCategory problemCategory);
    PagedSearchResults<ProblemCategory> read(SearchParametersDTO searchParameters);
    ProblemCategory update(ProblemCategory problemCategory);
    ProblemCategory delete(ProblemCategory problemCategory);
}
