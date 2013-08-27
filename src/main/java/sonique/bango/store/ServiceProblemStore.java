package sonique.bango.store;

import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.WorkItem;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class ServiceProblemStore {

    private static final List<ServiceProblem> serviceProblems = newArrayList(
            new ServiceProblem(1, "Open", new WorkItem(10, "Unassigned")),
            new ServiceProblem(2, "Open", new WorkItem(20, "Unassigned")),
            new ServiceProblem(3, "Open", new WorkItem(30, "Unassigned"))
    );

    public List<ServiceProblem> serviceProblemsForQueueId(String queueId) {
        return serviceProblems;
    }
}
