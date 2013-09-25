package sonique.bango.store;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;

import java.util.Collection;
import java.util.List;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;

public class ServiceProblemStore {

    private final List<ServiceProblem> serviceProblems;

    public ServiceProblemStore(List<ServiceProblem> serviceProblems) {
        this.serviceProblems = serviceProblems;
    }

    public List<ServiceProblem> serviceProblemsForQueueId(final Integer queueId) {
        return newArrayList(filter(serviceProblems, new Predicate<ServiceProblem>() {
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblem.queue().id().equals(queueId) && "Open".equals(serviceProblem.status());
            }
        }));
    }

    public void bulkTransfer(final Collection<Integer> serviceProblemIds, Queue destinationQueue) {
        Collection<ServiceProblem> serviceProblemsToTransfer = collectServiceProblems(serviceProblemIds);
        for (ServiceProblem serviceProblem : serviceProblemsToTransfer) {
            serviceProblem.setQueue(destinationQueue);
        }
    }

    public void bulkClear(Collection<Integer> serviceProblemIds) {
        Collection<ServiceProblem> serviceProblems = collectServiceProblems(serviceProblemIds);
        for (ServiceProblem serviceProblem : serviceProblems) {
            serviceProblem.setStatus("Cleared");
        }
    }

    public Collection<ServiceProblem> serviceProblemsById(final Integer serviceProblemId) {
        return filter(serviceProblems, new Predicate<ServiceProblem>() {
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblem.serviceProblemId().equals(serviceProblemId);
            }
        });
    }

    public Collection<ServiceProblem> serviceProblemByDirectoryNumber(final String directoryNumber) {
        return filter(serviceProblems, new Predicate<ServiceProblem>() {
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblem.directoryNumber().equals(directoryNumber);
            }
        });
    }

    private Collection<ServiceProblem> collectServiceProblems(final Collection<Integer> serviceProblemIds) {
        return filter(serviceProblems, new Predicate<ServiceProblem>() {
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblemIds.contains(serviceProblem.serviceProblemId());
            }
        });
    }

    public Collection<ServiceProblem> serviceProblemsForAgent(final Agent agent) {
        return filter(serviceProblems, new Predicate<ServiceProblem>() {
            @Override
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblem.isAssignedTo(agent);
            }
        });
    }

    public ServiceProblem serviceProblemWithId(int serviceProblemId) {
        return Iterables.getFirst(serviceProblemsById(serviceProblemId), null);
    }
}