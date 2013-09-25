package sonique.bango.service;

import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import java.util.Collection;

public class MyQueueApiService implements QueueApiService {

    private final QueueStore queueStore;
    private final ServiceProblemStore serviceProblemStore;

    public MyQueueApiService(QueueStore queueStore, ServiceProblemStore serviceProblemStore) {
        this.queueStore = queueStore;
        this.serviceProblemStore = serviceProblemStore;
    }

    @Override
    public Collection<Queue> allQueues() {
        return queueStore.allQueues();
    }

    @Override
    public Collection<ServiceProblem> serviceProblemsFor(int queueId) {
        return serviceProblemStore.serviceProblemsForQueueId(queueId);
    }

    @Override
    public Collection<ServiceProblem> bulkTransfer(BulkTransferRequest request) {
        serviceProblemStore.bulkTransfer(request.serviceProblemIds(), queueStore.queueById(request.destinationQueueId()));
        return serviceProblemStore.serviceProblemsForQueueId(request.originalQueueId());
    }

    @Override
    public Collection<ServiceProblem> bulkClear(BulkClearRequest request) {
        serviceProblemStore.bulkClear(request.serviceProblemIds());
        return serviceProblemStore.serviceProblemsForQueueId(request.originalQueueId());
    }
}
