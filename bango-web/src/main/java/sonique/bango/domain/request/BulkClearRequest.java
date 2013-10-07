package sonique.bango.domain.request;

import spm.domain.QueueId;

import java.util.Collection;

public class BulkClearRequest {
    private QueueId originalQueueId;
    private Collection<Long> serviceProblemIds;

    public Collection<Long> serviceProblemIds() {
        return serviceProblemIds;
    }

    public QueueId originalQueueId() {
        return originalQueueId;
    }
}
