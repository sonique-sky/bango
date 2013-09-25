package sonique.bango.service;

import sonique.bango.domain.Agent;
import sonique.bango.domain.AgentState;

public interface AgentApiService {
    Agent authenticatedAgent();
    AgentState toggleAvailability();
}
