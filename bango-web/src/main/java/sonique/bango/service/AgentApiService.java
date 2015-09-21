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
    PagedSearchResults<DomainAgent> allAgents(SearchParametersDTO searchParameters);
    DomainAgent reassignAgent(String agentCode, String currentTeam, String newTeam);

    DomainAgent createAgent(DomainAgent agent);
    DomainAgent updateAgent(DomainAgent agent);
    DomainAgent deleteAgent(DomainAgent agent);
}
