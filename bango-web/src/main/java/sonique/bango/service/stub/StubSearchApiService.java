package sonique.bango.service.stub;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.SearchApiService;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

public class StubSearchApiService implements SearchApiService {
    private final DomainServiceProblemRepository serviceProblemRepository;

    public StubSearchApiService(DomainServiceProblemRepository serviceProblemRepository) {
        this.serviceProblemRepository = serviceProblemRepository;
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> serviceProblemById(ServiceProblemId serviceProblemId) {
        return serviceProblemRepository.searchForServiceProblems(SearchParametersDTO.withSearchProperties("serviceProblemId", serviceProblemId, 25, 0));
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> serviceProblemByDirectoryNumber(DirectoryNumber directoryNumber) {
        return serviceProblemRepository.searchForServiceProblems(SearchParametersDTO.withSearchProperties("directoryNumber", directoryNumber, 25, 0));
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByServiceId(SnsServiceId serviceId, Integer start, Integer limit) {
        return serviceProblemRepository.searchForServiceProblems(SearchParametersDTO.withSearchProperties("serviceId", serviceId, limit, start));
    }

    @Override
    public PagedSearchResults<DomainServiceProblem> serviceProblemsByMspId(String mspId) {
        return serviceProblemRepository.searchForServiceProblems(SearchParametersDTO.withSearchProperties("mspId", mspId, 25, 0));
    }
}
