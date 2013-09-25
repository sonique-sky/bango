package sonique.bango.service;

import sonique.bango.domain.Agent;
import sonique.bango.domain.AgentState;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import java.util.Collection;

public class MyAgentApiService implements AgentApiService {

    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final ServiceProblemStore serviceProblemStore;

    public MyAgentApiService(SpringSecurityAuthorisedActorProvider authorisedActorProvider, ServiceProblemStore serviceProblemStore) {
        this.authorisedActorProvider = authorisedActorProvider;
        this.serviceProblemStore = serviceProblemStore;
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

    @Override
    public Collection<ServiceProblem> myItems() {
            return serviceProblemStore.serviceProblemsForAgent(authorisedActorProvider.getLoggedInAgent());
    }
}
