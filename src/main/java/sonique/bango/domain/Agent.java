package sonique.bango.domain;

import java.util.List;

import static com.sun.xml.internal.ws.util.StringUtils.capitalize;

public class Agent {
    private static final String AVAILABLE = "Available";
    private static final String UNAVAILABLE = "Unavailable";
    private static final String OFFLINE = "Offline";

    private String code;
    private AgentDetails details;
    private List<Queue> queues;
    private Integer activeCount;
    private Integer heldCount;

    private String availability = OFFLINE;

    public Agent(String code, List<Queue> queues) {
        this.code = code;
        this.queues = queues;

        String[] split = code.toLowerCase().split("\\.");
        details = new AgentDetails(capitalize(split[0]), capitalize(split[1]));

        activeCount = 5;
        heldCount = 10;
    }

    public String agentCode() {
        return code;
    }

    public List<Queue> queues() {
        return queues;
    }

    public void toggleAvailability() {
        if(AVAILABLE.equals(availability)) {
            availability = UNAVAILABLE;
        }
        else availability = AVAILABLE;
    }

    public void login() {
        availability = UNAVAILABLE;
    }

    public void logout() {
        availability = OFFLINE;
    }
}
