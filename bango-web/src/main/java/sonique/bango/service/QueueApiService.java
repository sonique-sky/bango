package sonique.bango.service;

import sonique.bango.domain.Queue;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;

import java.util.Collection;

public interface QueueApiService {
    Collection<Queue> allQueues();
    Collection<ServiceProblem> serviceProblemsFor(int queueId);
    Collection<ServiceProblem> bulkTransfer(BulkTransferRequest request);
    Collection<ServiceProblem> bulkClear(BulkClearRequest request);
}
