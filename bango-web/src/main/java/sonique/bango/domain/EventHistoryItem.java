package sonique.bango.domain;

import java.util.Date;

public class EventHistoryItem {

    private String eventType;
    private String note;
    private Date createdDate;
    private String createdBy;

    public EventHistoryItem(String eventType, String note, Date createdDate, String createdBy) {
        this.eventType = eventType;
        this.note = note;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
    }

    public String eventType() {
        return eventType;
    }

    public String note() {
        return note;
    }

    public Date createdDate() {
        return createdDate;
    }

    public String createdBy() {
        return createdBy;
    }
}
