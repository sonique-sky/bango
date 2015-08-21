package sonique.bango.service;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.messages.bt.types.DirectoryNumber;

public interface SearchApiService {
    PagedSearchResults<DomainServiceProblem> serviceProblemById(ServiceProblemId serviceProblemId);

    PagedSearchResults<DomainServiceProblem> serviceProblemByDirectoryNumber(DirectoryNumber directoryNumber);

    PagedSearchResults<DomainServiceProblem> serviceProblemsByServiceId(SnsServiceId serviceId, Integer start, Integer limit);

    PagedSearchResults<DomainServiceProblem> serviceProblemsByMspId(String mspId);
}
