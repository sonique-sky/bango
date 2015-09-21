package sonique.bango.service.stub;

import sky.sns.spm.domain.model.AgentAvailability;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.DomainTeam;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.DomainTeamRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.AgentStateDTO;
import sky.sns.spm.web.spmapp.shared.dto.Filter;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.sorter.Comparators;
import sonique.bango.service.AgentApiService;
import spm.domain.QueueId;
import spm.domain.TeamId;

import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

import static sonique.bango.domain.sorter.NestedFieldComparator.nestedStringFieldComparator;
import static sonique.bango.util.PagedSearchResultsCreator.createPageFor;

public class StubAgentApiService implements AgentApiService {

    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final DomainAgentRepository agentRepository;
    private final DomainTeamRepository teamRepository;

    private AgentComparators agentComparators = new AgentComparators();
    private final AgentFilterSupplier agentFilterFunction;

    public StubAgentApiService(
            SpringSecurityAuthorisedActorProvider authorisedActorProvider,
            DomainServiceProblemRepository serviceProblemRepository,
            DomainAgentRepository agentRepository,
            DomainTeamRepository teamRepository,
            QueueRepository queueRepository) {
        this.authorisedActorProvider = authorisedActorProvider;
        this.serviceProblemRepository = serviceProblemRepository;
        this.agentRepository = agentRepository;
        this.teamRepository = teamRepository;
        this.agentFilterFunction = new AgentFilterSupplier(queueRepository, agentRepository);
    }

    @Override
    public DomainAgent authenticatedAgent() {
        return authorisedActorProvider.getLoggedInAgent();
    }

    @Override
    public AgentStateDTO toggleAvailability() {
        AgentAvailability availability = authenticatedAgent().availability();
        if (availability == AgentAvailability.Available) {
            this.authenticatedAgent().makeAvailable(false, new Date());
        } else if (availability == AgentAvailability.Unavailable) {
            this.authenticatedAgent().makeAvailable(true, new Date());
        }

        return agentState();
    }

    @Override
    public PagedSearchResults<DomainAgent> readAgents(SearchParametersDTO searchParameters) {
        return createPageFor(
                searchParameters,
                agentRepository.getAllAgents(),
                agentComparators,
                agentFilterFunction
        );
    }

    @Override
    public DomainAgent reassignAgent(String agentCode, String currentTeam, String newTeam) {
        DomainAgent domainAgent = agentRepository.findByAgentCode(agentCode);
        DomainTeam team = teamRepository.getTeam(new TeamId(newTeam));
        domainAgent.reassignTeam(team);
        return domainAgent;
    }

    @Override
    public DomainAgent deleteAgent(DomainAgent agent) {
        agentRepository.deleteAgent(agent);
        return agent;
    }

    @Override
    public DomainAgent createAgent(DomainAgent agent) {
        return agentRepository.insert(agent);
    }

    @Override
    public DomainAgent updateAgent(DomainAgent agent) {
        return agentRepository.update(agent);
    }

    @Override
    public AgentStateDTO agentState() {
        return statisticsFor(serviceProblemRepository.getServiceProblemsForAgent(authorisedActorProvider.getLoggedInAgent()));
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
        return new AgentStateDTO(authenticatedAgent().availability(), "", serviceProblemsForAgent.size() - heldCount, heldCount, pullCount, pushCount);
    }

    private static class AgentFilterSupplier implements Function<Filter, Predicate<DomainAgent>> {
        private final QueueRepository queueRepository;
        private final DomainAgentRepository agentRepository;

        private AgentFilterSupplier(QueueRepository queueRepository, DomainAgentRepository agentRepository) {
            this.queueRepository = queueRepository;
            this.agentRepository = agentRepository;
        }

        @Override
        public Predicate<DomainAgent> apply(Filter term) {
            switch (term.property()) {
                case "watchingQueue":
                    return isWatchingQueue(queueRepository.findQueueBy(new QueueId(term.value())));
                case "excludeAgent":
                    return isNotTheSameAgent(agentRepository.findByAgentCode(term.value()));
                case "notOffline":
                    return notOffline();
            }

            throw new IllegalArgumentException(String.format("filter by %s is not supported", term.property()));
        }

        private Predicate<DomainAgent> isWatchingQueue(Queue expected) {
            return agent -> agent.isWatchingQueue(expected);
        }

        private Predicate<DomainAgent> notOffline() {
            return agent -> agent.availability() != AgentAvailability.Offline;
        }

        private Predicate<DomainAgent> isNotTheSameAgent(DomainAgent expected) {
            return agent -> !agent.equals(expected);
        }
    }

    private static class AgentComparators extends Comparators<DomainAgent> {
        public AgentComparators() {
            add("code", (o1, o2) -> o1.getAgentCode().compareTo(o2.getAgentCode()));
            add("agentAvailability", (o1, o2) -> o1.availability().compareTo(o2.availability()));
            add("authorisedUid", (o1, o2) -> o1.getAuthorisedUid().compareTo(o2.getAuthorisedUid()));
            add("displayName", (o1, o2) -> nestedStringFieldComparator((DomainAgent agent) -> agent.details().getDisplayName()).compare(o1, o2));
            add("teamName", (o1, o2) -> nestedStringFieldComparator((DomainAgent agent) -> agent.team().name().asString()).compare(o1, o2));
            add("role", (o1, o2) -> nestedStringFieldComparator((DomainAgent agent) -> agent.getRole().name()).compare(o1, o2));
        }
    }

}