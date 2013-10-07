package sonique.bango.service;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;

import java.util.List;

public interface AgentApiService {
    DomainAgent authenticatedAgent();
    AgentStateDTO toggleAvailability();
    List<DomainServiceProblem> myItems();
    AgentStateDTO agentState();
}
