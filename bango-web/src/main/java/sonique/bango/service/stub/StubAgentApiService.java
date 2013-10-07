package sonique.bango.service.stub;

import sky.sns.spm.domain.model.AgentAvailability;
import sky.sns.spm.domain.model.AgentState;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.hibernate.HibernateDomainServiceProblemRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.service.AgentApiService;

import java.util.Collection;
import java.util.List;

public class StubAgentApiService implements AgentApiService {

    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final DomainServiceProblemRepository serviceProblemRepository;

    public StubAgentApiService(SpringSecurityAuthorisedActorProvider authorisedActorProvider, DomainServiceProblemRepository serviceProblemRepository) {
        this.authorisedActorProvider = authorisedActorProvider;
        this.serviceProblemRepository = serviceProblemRepository;
    }

    @Override
    public DomainAgent authenticatedAgent() {
        return authorisedActorProvider.getLoggedInAgent();
    }

    @Override
    public AgentState toggleAvailability() {
        AgentAvailability availability = authenticatedAgent().availability();
        if(availability == AgentAvailability.Available) {
            this.authenticatedAgent().makeAvailable(false);
        } else if(availability == AgentAvailability.Unavailable) {
            this.authenticatedAgent().makeAvailable(true);
        }

        // Fix me - (needs state)
        return new AgentState();
    }

    @Override
    public List<DomainServiceProblem> myItems() {
        return serviceProblemRepository.getServiceProblemsForAgent(authorisedActorProvider.getLoggedInAgent());
    }

    @Override
    public AgentState agentState() {
        throw new UnsupportedOperationException("Method StubAgentApiService agentState() not yet implemented");
    }

    @Override
    public Collection<DomainServiceProblem> agentItems() {
        throw new UnsupportedOperationException("Method StubAgentApiService agentItems() not yet implemented");
    }
}