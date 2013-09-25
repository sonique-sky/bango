package sonique.bango.service;

import sonique.bango.domain.Agent;
import sonique.bango.domain.AgentState;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

public class MyAgentApiService implements AgentApiService {

    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    public MyAgentApiService(SpringSecurityAuthorisedActorProvider authorisedActorProvider) {
        this.authorisedActorProvider = authorisedActorProvider;
    }

    @Override
    public Agent authenticatedAgent() {
        return authorisedActorProvider.authenticatedAgent();
    }

    @Override
    public AgentState toggleAvailability() {
        AgentState agentState = this.authenticatedAgent().agentState();
        agentState.toggleAvailability();

        return agentState;
    }
}
