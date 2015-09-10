package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;
import spm.domain.ServiceProblemId;

import java.util.Collection;

public interface QueueApiService {
    PagedSearchResults<Queue> allQueues(Integer start, Integer limit);
    PagedSearchResults<DomainServiceProblem> serviceProblemsFor(int queueId, Integer page, Integer start, Integer limit);
    PagedSearchResults<DomainServiceProblem> bulkTransfer(BulkTransferRequest request);
    PagedSearchResults<DomainServiceProblem> bulkClear(BulkClearRequest request);
    Queue updateQueue(Queue queue);
    Queue deleteQueue(Queue queue);
    Queue createQueue(Queue queue);
    Collection<Queue> getTransferableQueuesFor(ServiceProblemId serviceProblemId);
}
