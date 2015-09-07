package sonique.bango.service.stub;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.infrastructure.repository.DomainProblemCategoryRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.service.ProblemCategoryApiService;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class StubProblemCategoryApiService implements ProblemCategoryApiService {

    private final DomainProblemCategoryRepository problemCategoryRepository;

    public StubProblemCategoryApiService(DomainProblemCategoryRepository problemCategoryRepository) {
        this.problemCategoryRepository = problemCategoryRepository;
    }

    @Override
    public PagedSearchResults<ProblemCategory> problemCategories(Integer start, Integer limit) {
        List<ProblemCategory> allProblemCategories = problemCategoryRepository.getAll();
        List<ProblemCategory> page = allProblemCategories.stream()
                .skip(start)
                .limit(limit)
                .collect(toList());

        return new PagedSearchResults<>(page, (long) allProblemCategories.size());
    }

    @Override
    public ProblemCategory create(ProblemCategory problemCategory) {
        throw new UnsupportedOperationException("Method StubProblemCategoryApiService create() not yet implemented");
    }

    @Override
    public ProblemCategory update(ProblemCategory problemCategory) {
        throw new UnsupportedOperationException("Method StubProblemCategoryApiService update() not yet implemented");
    }

    @Override
    public ProblemCategory delete(ProblemCategory problemCategory) {
        throw new UnsupportedOperationException("Method StubProblemCategoryApiService delete() not yet implemented");
    }

}
