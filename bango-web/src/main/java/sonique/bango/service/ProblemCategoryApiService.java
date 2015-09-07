package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.interfaces.shared.PagedSearchResults;

public interface ProblemCategoryApiService {
    PagedSearchResults<ProblemCategory> problemCategories(Integer start, Integer limit);
    ProblemCategory create(ProblemCategory problemCategory);
    ProblemCategory update(ProblemCategory problemCategory);
    ProblemCategory delete(ProblemCategory problemCategory);
}
