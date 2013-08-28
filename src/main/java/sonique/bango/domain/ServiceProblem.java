package sonique.bango.domain;

public class ServiceProblem {

    private Integer serviceProblemId;
    private String  status;
    private WorkItem workItem;
    private Queue queue;

    public ServiceProblem(Integer serviceProblemId, String status, WorkItem workItem, Queue queue) {
        this.serviceProblemId = serviceProblemId;
        this.status = status;
        this.workItem = workItem;
        this.queue = queue;
    }

    public Integer serviceProblemId() {
        return serviceProblemId;
    }

    public String status() {
        return status;
    }

    public WorkItem workItem() {
        return workItem;
    }

    public Queue queue() {
        return queue;
    }
}
