package sonique.bango.service;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

public interface AgentApiService {
    DomainAgent authenticatedAgent();
    AgentStateDTO toggleAvailability();
    AgentStateDTO agentState();
    PagedSearchResults<DomainServiceProblem> myItems(SearchParametersDTO searchParameters);
}
