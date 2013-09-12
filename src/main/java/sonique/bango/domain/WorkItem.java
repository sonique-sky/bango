package sonique.bango.domain;

public class WorkItem {
    private final int workItemId;
    private String status;
    private Agent agent;

    public WorkItem(int workItemId, String status) {
        this.workItemId = workItemId;
        this.status = status;
    }

    public void assignTo(Agent agent) {
        this.agent = agent;
        this.status = "Assigned";
    }
}
