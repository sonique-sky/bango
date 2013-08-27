package sonique.bango.domain;

public class ServiceProblem {

    private Integer serviceProblemId;
    private String  status;
    private WorkItem workItem;

    public ServiceProblem(Integer serviceProblemId, String status, WorkItem workItem) {
        this.serviceProblemId = serviceProblemId;
        this.status = status;
        this.workItem = workItem;
    }
}
