package sonique.bango.service;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

import java.util.List;

public interface AgentApiService {
    DomainAgent authenticatedAgent();
    AgentStateDTO toggleAvailability();
    PagedSearchResults<DomainServiceProblem> myItems(SearchParametersDTO searchParameters);
    AgentStateDTO agentState();
}
