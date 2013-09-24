package sonique.bango.domain.request;

import java.util.Collection;

public class BulkClearRequest {
    private Integer originalQueueId;
    private Collection<Integer> serviceProblemIds;

    public Collection<Integer> serviceProblemIds() {
        return serviceProblemIds;
    }

    public Integer originalQueueId() {
        return originalQueueId;
    }
}
