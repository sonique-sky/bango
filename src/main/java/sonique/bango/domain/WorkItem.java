package sonique.bango.domain;

public class WorkItem {
    private final int workItemId;
    private final String status;

    public WorkItem(int workItemId, String status) {
        this.workItemId = workItemId;
        this.status = status;
    }
}
