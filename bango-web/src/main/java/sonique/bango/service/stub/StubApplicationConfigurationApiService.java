package sonique.bango.service.stub;

import sky.sns.spm.domain.model.refdata.ProblemCategory;
import sky.sns.spm.infrastructure.repository.DomainProblemCategoryRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.ApplicationConfigurationApiService;
import sonique.bango.util.PagedSearchResultsCreator;

import java.util.List;

public class StubApplicationConfigurationApiService implements ApplicationConfigurationApiService {

    private final DomainProblemCategoryRepository problemCategoryRepository;

    public StubApplicationConfigurationApiService(DomainProblemCategoryRepository problemCategoryRepository) {
        this.problemCategoryRepository = problemCategoryRepository;
    }

    @Override
    public PagedSearchResults<ProblemCategory> problemCategory(SearchParametersDTO searchParameters) {
        List<ProblemCategory> all = problemCategoryRepository.getAll();
        return PagedSearchResultsCreator.createPageFor(searchParameters, all, null, null);
    }

}