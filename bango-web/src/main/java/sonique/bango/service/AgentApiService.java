package sonique.bango.service;

import sonique.bango.domain.Agent;
import sonique.bango.domain.AgentState;
import sonique.bango.domain.ServiceProblem;

import java.util.Collection;

public interface AgentApiService {
    Agent authenticatedAgent();
    AgentState toggleAvailability();
    Collection<ServiceProblem> myItems();
}
