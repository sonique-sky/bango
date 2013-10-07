package sonique.bango.service.stub;

import sky.sns.spm.domain.model.AgentAvailability;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sonique.bango.service.AgentApiService;

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
    public AgentStateDTO toggleAvailability() {
        AgentAvailability availability = authenticatedAgent().availability();
        if (availability == AgentAvailability.Available) {
            this.authenticatedAgent().makeAvailable(false);
        } else if (availability == AgentAvailability.Unavailable) {
            this.authenticatedAgent().makeAvailable(true);
        }

        // Fix me - (needs state)
        return agentState();
    }

    @Override
    public List<DomainServiceProblem> myItems() {
        return serviceProblemRepository.getServiceProblemsForAgent(authorisedActorProvider.getLoggedInAgent());
    }

    @Override
    public AgentStateDTO agentState() {
        return statisticsFor(myItems());
    }

    private AgentStateDTO statisticsFor(List<DomainServiceProblem> serviceProblemsForAgent) {
        int pullCount = 0;
        int pushCount = 0;
        int heldCount = 0;

        for (DomainServiceProblem domainServiceProblem : serviceProblemsForAgent) {
            if (domainServiceProblem.hasWorkItem()) {
                switch (domainServiceProblem.workItem().assignmentType()) {
                    case Pull:
                        pullCount++;
                        break;
                    case Push:
                        pushCount++;
                        break;
                }
                if (domainServiceProblem.workItem().isHeld()) {
                    heldCount++;
                }
            }
        }
        return new AgentStateDTO(authenticatedAgent().availability(), "", serviceProblemsForAgent.size(), heldCount, pullCount, pushCount);
    }
}