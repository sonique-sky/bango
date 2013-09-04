package sonique.bango.store;

import com.google.common.base.Predicate;
import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.WorkItem;

import java.util.Collection;
import java.util.List;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;

public class ServiceProblemStore {

    private static final int SP_PER_Q = 10;
    private final List<ServiceProblem> serviceProblems = newArrayList();
    private final QueueStore queueStore;

    public ServiceProblemStore(QueueStore queueStore) {
        this.queueStore = queueStore;
        int numberOfQueues = queueStore.numberOfQueues();
        Integer directoryNumber = 111;

        for (int index = 0; index < numberOfQueues * SP_PER_Q; index++) {
            int queueId = (index / SP_PER_Q) + 1;
            boolean hasActiveTroubleReport = index % 2 == 0;
            directoryNumber = index % 2 == 0 ? directoryNumber : ++directoryNumber;
            serviceProblems.add(new ServiceProblem(index, "Open", new WorkItem(index + SP_PER_Q, "Unassigned"), queueStore.queueById(queueId), hasActiveTroubleReport, directoryNumber.toString()));
        }
    }

    public List<ServiceProblem> serviceProblemsForQueueId(final Integer queueId) {
        return newArrayList(filter(serviceProblems, new Predicate<ServiceProblem>() {
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblem.queue().id().equals(queueId) && "Open".equals(serviceProblem.status());
            }
        }));
    }

    public void bulkTransfer(int destinationQueueId, final Collection<Integer> serviceProblemIds) {
        Collection<ServiceProblem> serviceProblemsToTransfer = collectServiceProblems(serviceProblemIds);
        Queue destinationQueue = queueStore.queueById(destinationQueueId);
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

    public Collection<ServiceProblem> serviceProblemById(final Integer serviceProblemId) {
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
}
