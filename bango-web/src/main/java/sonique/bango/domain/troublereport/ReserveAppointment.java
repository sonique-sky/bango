package sonique.bango.domain.troublereport;

import spm.domain.ServiceProblemId;

public class ReserveAppointment {

    private final ServiceProblemId serviceProblemId;
    private final String timeSlot;
    private final String repairType;
    private final long date;

    public ReserveAppointment(ServiceProblemId serviceProblemId, String repairType, long date, String timeSlot) {
        this.serviceProblemId = serviceProblemId;
        this.timeSlot = timeSlot;
        this.repairType = repairType;
        this.date = date;
    }

    public ServiceProblemId serviceProblemId() {
        return serviceProblemId;
    }

    public String repairType() {
        return repairType;
    }

    public long date() {
        return date;
    }

    public String timeSlot() {
        return timeSlot;
    }
}
