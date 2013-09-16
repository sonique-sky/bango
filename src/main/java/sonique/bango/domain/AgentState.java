package sonique.bango.domain;

public class AgentState {
    private static final String AVAILABLE = "Available";
    private static final String UNAVAILABLE = "Unavailable";
    private static final String OFFLINE = "Offline";

    private String availability = OFFLINE;
    private Integer activeCount = 0;
    private Integer heldCount = 0;

    public void toggleAvailability() {
        if (AVAILABLE.equals(availability)) {
            availability = UNAVAILABLE;
        } else {
            availability = AVAILABLE;
        }
    }

    public void login() {
        availability = UNAVAILABLE;
    }

    public void logout() {
        availability = OFFLINE;
    }

    public void incrementActiveCount() {
        activeCount++;
    }
}
