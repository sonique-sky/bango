package sonique.bango.service;

import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.domain.request.BulkClearRequest;
import sonique.bango.domain.request.BulkTransferRequest;

public interface QueueApiService {
    PagedSearchResults<Queue> readQueues(SearchParametersDTO searchParameters);
    void bulkTransfer(BulkTransferRequest request);
    void bulkClear(BulkClearRequest request);
    Queue updateQueue(Queue queue);
    Queue deleteQueue(Queue queue);
    Queue createQueue(Queue queue);
}
