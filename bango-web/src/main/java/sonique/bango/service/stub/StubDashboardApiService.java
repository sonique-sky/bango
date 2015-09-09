package sonique.bango.service.stub;

import com.google.common.base.Throwables;
import org.apache.commons.lang3.time.DateUtils;
import sky.sns.spm.domain.model.AgentDashboardEntry;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.QueueDashboardEntry;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.AssignmentType;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.repository.DomainServiceProblemRepository;
import sky.sns.spm.infrastructure.repository.QueueRepository;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.service.DashboardApiService;

import java.lang.reflect.Field;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

import static java.util.stream.Collectors.toList;
import static sonique.types.StringValueUtils.asString;

public class StubDashboardApiService implements DashboardApiService {

    private final QueueRepository queueRepository;
    private final DomainServiceProblemRepository serviceProblemRepository;
    private final DomainAgentRepository agentRepository;

    public StubDashboardApiService(QueueRepository queueRepository, DomainServiceProblemRepository serviceProblemRepository, DomainAgentRepository agentRepository) {
        this.queueRepository = queueRepository;
        this.serviceProblemRepository = serviceProblemRepository;
        this.agentRepository = agentRepository;
    }

    @Override
    public PagedSearchResults<QueueDashboardEntry> queueDashboardEntries() {
        List<QueueDashboardEntry> dashboardEntries = queueRepository.getAllQueues().stream().map(toQueueDashboardEntries()).collect(toList());
        return new PagedSearchResults<>(
                dashboardEntries,
                (long) dashboardEntries.size()
        );
    }

    @Override
    public PagedSearchResults<AgentDashboardEntry> agentDashboardEntries() {
        List<AgentDashboardEntry> entries = agentRepository.getAllAgents().stream()
                .map(toAgentDashboardEntries()).collect(toList());

        return new PagedSearchResults<>(entries, (long) entries.size());
    }

    private Function<DomainAgent, AgentDashboardEntry> toAgentDashboardEntries() {
        return agent -> {
            AgentDashboardEntry entry = new AgentDashboardEntry();

            setField(entry, "agentCode", agent.getAgentCode());
            setField(entry, "teamName", (agent.team() == null) ? null : asString(agent.team().name()));
            setField(entry, "agentAvailability", agent.availability());
            setField(entry, "availabilityChangeDate", agent.availabilityChangeTime());
            setField(entry, "assignedWorkItemCount", (int) serviceProblemRepository.getServiceProblemsForAgent(agent).stream()
                    .filter(sp -> sp.isAssignedTo(agent)).count());
            return entry;
        };
    }

    private Function<Queue, QueueDashboardEntry> toQueueDashboardEntries() {
        return queue -> {
            QueueDashboardEntry entry = new QueueDashboardEntry();
            setField(entry, "queueId", queue.id());
            setField(entry, "queueName", queue.name().asString());

            List<DomainServiceProblem> serviceProblems = serviceProblemRepository.searchForServiceProblemsInQueue(SearchParametersDTO.withSearchProperties("queueId", queue.id().asLong(), Integer.MAX_VALUE, 0)).getData();

            setField(entry, "serviceProblemCount", serviceProblems.size());
            setField(entry, "oldestServiceProblemDate", serviceProblems.stream().map(DomainServiceProblem::openedDate).min(Comparator.<Date>naturalOrder()).orElse(null));

            Date now = new Date();
            setField(entry, "slaExpiresInLessThan12Hours", (int) serviceProblems.stream().map(sp -> DateUtils.addHours(sp.openedDate(), sp.queue().getPullSla().intValue()))
                    .filter(date -> date.after(now) && date.before(DateUtils.addHours(now, 12)))
                    .count());

            setField(entry, "slaExpiresInMoreThan12Hours", (int) serviceProblems.stream().map(sp -> DateUtils.addHours(sp.openedDate(), sp.queue().getPullSla().intValue()))
                    .filter(date -> date.after(DateUtils.addHours(now, 12)))
                    .count());

            setField(entry, "slaExpiredLessThanADayAgo", (int) serviceProblems.stream().map(sp -> DateUtils.addHours(sp.openedDate(), sp.queue().getPullSla().intValue()))
                    .filter(date -> date.after(DateUtils.addDays(now, -1)))
                    .count());

            setField(entry, "slaExpiredBetween1And4DaysAgo", (int) serviceProblems.stream().map(sp -> DateUtils.addHours(sp.openedDate(), sp.queue().getPullSla().intValue()))
                    .filter(date -> date.before(DateUtils.addDays(now, -1)) && date.after(DateUtils.addDays(now, -4)))
                    .count());

            setField(entry, "slaExpiredMoreThan4DaysAgo", (int) serviceProblems.stream().map(sp -> DateUtils.addHours(sp.openedDate(), sp.queue().getPullSla().intValue()))
                    .filter(date -> date.before(DateUtils.addDays(now, -4)))
                    .count());

            setField(entry, "assignedPull", (int) serviceProblems.stream().filter(DomainServiceProblem::isAssigned).filter(sp -> sp.workItem().assignmentType() == AssignmentType.Pull).count());
            setField(entry, "assignedPush", (int) serviceProblems.stream().filter(DomainServiceProblem::isAssigned).filter(sp -> sp.workItem().assignmentType() == AssignmentType.Push).count());

            setField(entry, "unassignedPull", (int) serviceProblems.stream().filter(sp -> sp.hasWorkItem() && !sp.isAssigned()).filter(sp -> sp.workItem().assignmentType() == AssignmentType.Pull).count());
            setField(entry, "unassignedPush", (int) serviceProblems.stream().filter(sp -> sp.hasWorkItem() && !sp.isAssigned()).filter(sp -> sp.workItem().assignmentType() == AssignmentType.Push).count());


            setField(entry, "noWorkItem", (int) serviceProblems.stream().filter(sp -> !sp.hasWorkItem()).count());
            return entry;
        };
    }

    private static void setField(Object entry, String name, Object value) {
        try {
            Field field = entry.getClass().getDeclaredField(name);
            field.setAccessible(true);
            field.set(entry, value);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw Throwables.propagate(e);
        }
    }
}
