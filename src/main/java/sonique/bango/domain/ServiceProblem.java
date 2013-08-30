package sonique.bango.domain;

public class ServiceProblem {

    private Integer serviceProblemId;
    private String  status;
    private WorkItem workItem;
    private Queue queue;
    private boolean hasActiveTroubleReport;

    public ServiceProblem(Integer serviceProblemId, String status, WorkItem workItem, Queue queue, boolean hasActiveTroubleReport) {
        this.serviceProblemId = serviceProblemId;
        this.status = status;
        this.workItem = workItem;
        this.queue = queue;
        this.hasActiveTroubleReport = hasActiveTroubleReport;
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

    public void setQueue(Queue queue) {
        this.queue = queue;
    }

    public boolean hasActiveTroubleReport() {
        return hasActiveTroubleReport;
    }
}
