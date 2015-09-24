package sonique.bango.service.stub;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.infrastructure.repository.DomainProblemCategoryRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.ProblemCategoryApiService;

public class StubProblemCategoryApiService implements ProblemCategoryApiService {

    private final DomainProblemCategoryRepository problemCategoryRepository;

    public StubProblemCategoryApiService(DomainProblemCategoryRepository problemCategoryRepository) {
        this.problemCategoryRepository = problemCategoryRepository;
    }

    @Override
    public ProblemCategory create(ProblemCategory problemCategory) {
        throw new UnsupportedOperationException("Method StubProblemCategoryApiService create() not yet implemented");
    }

    @Override
    public PagedSearchResults<ProblemCategory> read(SearchParametersDTO searchParameters) {
        return problemCategoryRepository.findProblemCategoriesSubSet(searchParameters);
    }

    @Override
    public ProblemCategory update(ProblemCategory problemCategory) {
        return problemCategoryRepository.persist(problemCategory);
    }

    @Override
    public ProblemCategory delete(ProblemCategory problemCategory) {
        throw new UnsupportedOperationException("Method StubProblemCategoryApiService delete() not yet implemented");
    }

}
