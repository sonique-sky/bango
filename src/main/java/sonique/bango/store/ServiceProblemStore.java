package sonique.bango.store;

import com.google.common.base.Predicate;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.WorkItem;

import java.util.List;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;

public class ServiceProblemStore {

    private final List<ServiceProblem> serviceProblems = newArrayList();

    private final QueueStore queueStore;

    public ServiceProblemStore(QueueStore queueStore) {
        this.queueStore = queueStore;

        for(int index=0; index<100; index++) {
            int queueId = (index / 10) + 1;
            serviceProblems.add(new ServiceProblem(index, "Open", new WorkItem(index+10, "Unassigned"), queueStore.queueById(queueId)));
        }
    }

    public List<ServiceProblem> serviceProblemsForQueueId(final Integer queueId) {
        return newArrayList(filter(serviceProblems, new Predicate<ServiceProblem>() {
            public boolean apply(ServiceProblem serviceProblem) {
                return serviceProblem.queue().id().equals(queueId);
            }
        }));
    }
}
