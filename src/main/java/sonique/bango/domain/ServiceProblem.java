package sonique.bango.domain;

import java.util.List;

public class ServiceProblem {

    private Integer serviceProblemId;
    private String  status;
    private WorkItem workItem;
    private Queue queue;
    private boolean hasActiveTroubleReport;
    private String directoryNumber;
    private List<EventHistoryItem> eventHistoryItems;

    public ServiceProblem(Integer serviceProblemId, String status, WorkItem workItem, Queue queue, boolean hasActiveTroubleReport, String directoryNumber, List<EventHistoryItem> eventHistoryItems) {
        this.serviceProblemId = serviceProblemId;
        this.status = status;
        this.workItem = workItem;
        this.queue = queue;
        this.hasActiveTroubleReport = hasActiveTroubleReport;
        this.directoryNumber = directoryNumber;
        this.eventHistoryItems = eventHistoryItems;
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

    public List<EventHistoryItem> eventHistoryItems() {
        return eventHistoryItems;
    }

    public void assignTo(Agent agent) {
        workItem.assignTo(agent);
    }

    public void holdActiveWorkItem() {
        workItem.hold();
    }

    public void unholdActiveWorkItem() {
        workItem.unhold();
    }

    public boolean isAssignedTo(Agent agent) {
        return workItem != null && workItem.isAssignedTo(agent);
    }
}
