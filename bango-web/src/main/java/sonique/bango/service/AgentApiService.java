package sonique.bango.service;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;

public interface AgentApiService {
    DomainAgent authenticatedAgent();
    AgentStateDTO toggleAvailability();
    AgentStateDTO agentState();
    DomainAgent reassignAgent(String agentCode, String currentTeam, String newTeam);
    PagedSearchResults<DomainAgent> readAgents(SearchParametersDTO searchParameters);
    DomainAgent createAgent(DomainAgent agent);
    DomainAgent updateAgent(DomainAgent agent);
    DomainAgent deleteAgent(DomainAgent agent);
}
