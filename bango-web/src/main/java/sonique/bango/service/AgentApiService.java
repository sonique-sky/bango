package sonique.bango.service;

import sky.sns.spm.domain.model.AgentState;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;

import java.util.Collection;
import java.util.List;

public interface AgentApiService {
    DomainAgent authenticatedAgent();
    AgentState toggleAvailability();
    List<DomainServiceProblem> myItems();
    AgentState agentState();
    Collection<DomainServiceProblem> agentItems();
}
