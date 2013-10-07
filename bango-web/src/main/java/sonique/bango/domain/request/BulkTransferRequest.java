package sonique.bango.domain.request;

import spm.domain.QueueId;

import java.util.Collection;

public class BulkTransferRequest {
    private QueueId destinationQueueId;
    private QueueId originalQueueId;
    private Collection<Long> serviceProblemIds;

    public QueueId destinationQueueId() {
        return destinationQueueId;
    }

    public Collection<Long> serviceProblemIds() {
        return serviceProblemIds;
    }

    public QueueId originalQueueId() {
        return originalQueueId;
    }
}
