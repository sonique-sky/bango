package sonique.bango.domain.request;

import java.util.Collection;

public class BulkTransferRequest {
    private Integer destinationQueueId;
    private Integer originalQueueId;
    private Collection<Integer> serviceProblemIds;

    public Integer destinationQueueId() {
        return destinationQueueId;
    }

    public Collection<Integer> serviceProblemIds() {
        return serviceProblemIds;
    }

    public Integer originalQueueId() {
        return originalQueueId;
    }
}
