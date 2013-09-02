package sonique.bango.domain;

public class ServiceProblem {

    private Integer serviceProblemId;
    private String  status;
    private WorkItem workItem;
    private Queue queue;
    private boolean hasActiveTroubleReport;
    private String directoryNumber;

    public ServiceProblem(Integer serviceProblemId, String status, WorkItem workItem, Queue queue, boolean hasActiveTroubleReport, String directoryNumber) {
        this.serviceProblemId = serviceProblemId;
        this.status = status;
        this.workItem = workItem;
        this.queue = queue;
        this.hasActiveTroubleReport = hasActiveTroubleReport;
        this.directoryNumber = directoryNumber;
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

    public void setStatus(String status) {
        this.status = status;
    }

    public String directoryNumber() {
        return directoryNumber;
    }
}
