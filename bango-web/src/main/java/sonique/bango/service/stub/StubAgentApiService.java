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
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.controller.RequestParameters;
import sonique.bango.domain.filter.Filter;
import sonique.bango.domain.filter.Filters;
import sonique.bango.service.AgentApiService;
import spm.domain.QueueId;
import spm.domain.TeamId;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class StubAgentApiService implements AgentApiService {

    private final SpringSecurityAuthorisedActorProvider authorisedActorProvider;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final DomainAgentRepository agentRepository;
    private final DomainTeamRepository teamRepository;
    private final QueueRepository queueRepository;

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
        this.queueRepository = queueRepository;
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
    public PagedSearchResults<DomainServiceProblem> myItems(SearchParametersDTO searchParameters) {
        List<DomainServiceProblem> serviceProblemsForAgent = serviceProblemRepository.getServiceProblemsForAgent(authorisedActorProvider.getLoggedInAgent());

        List<DomainServiceProblem> pageOfServiceProblems = serviceProblemsForAgent.stream()
                .skip(searchParameters.getStartRow())
                .limit(searchParameters.getPageSize())
                .collect(toList());

        return new PagedSearchResults<>(pageOfServiceProblems, (long) serviceProblemsForAgent.size());
    }

    @Override
    public PagedSearchResults<DomainAgent> allAgents(RequestParameters requestParameters) {
        int start = requestParameters.getStart();
        int limit = requestParameters.getLimit() == 0 ? Integer.MAX_VALUE : requestParameters.getLimit();

        List<DomainAgent> allAgents = agentRepository.getAllAgents();
        Stream<DomainAgent> allAgentsStream = allAgents.stream().skip(start);

        Optional<Predicate<DomainAgent>> assignableAgentFilter = Filters.andFilter(requestParameters.getFilter(), filter -> AgentFilter.forFilterTerm(filter, queueRepository, agentRepository));

        if (assignableAgentFilter.isPresent()) {
            allAgentsStream = allAgentsStream.filter(assignableAgentFilter.get());
        }

        List<DomainAgent> pageOfAgents = allAgentsStream.limit(limit).collect(toList());
        return new PagedSearchResults<>(pageOfAgents, (long) allAgents.size());
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
    public AgentStateDTO agentState() {
        return statisticsFor(myItems(SearchParametersDTO.withNoSearchProperties(Integer.MAX_VALUE, 0)).getData());
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

    public static class AgentFilter {
        public static Predicate<DomainAgent> forFilterTerm(Filter filter, QueueRepository queueRepository, DomainAgentRepository agentRepository) {

            switch (filter.property()) {
                case "watchingQueue":
                    return isWatchingQueue(queueRepository.findQueueBy(new QueueId(filter.value())));
                case "excludeAgent":
                    return isNotTheSameAgent(agentRepository.findByAgentCode(filter.value()));
                case "notOffline":
                    return notOffline();
            }

            throw new IllegalArgumentException(String.format("filter by %s is not supported", filter.property()));
        }

        public static Predicate<DomainAgent> isWatchingQueue(Queue expected) {
            return agent -> agent.isWatchingQueue(expected);
        }

        public static Predicate<DomainAgent> notOffline() {
            return agent -> agent.availability() != AgentAvailability.Offline;
        }

        public static Predicate<DomainAgent> isNotTheSameAgent(DomainAgent expected) {
            return agent -> !agent.equals(expected);
        }

    }
}