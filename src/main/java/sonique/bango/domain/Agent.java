package sonique.bango.domain;

import java.util.List;

import static com.sun.xml.internal.ws.util.StringUtils.capitalize;

public class Agent {
    private static final String AVAILABLE = "Available";

    private String code;
    private AgentDetails details;
    private List<Queue> queues;
    private Integer activeCount;
    private Integer heldCount;

    private String availability = AVAILABLE;

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
            availability = "Unavailable";
        }
        else availability = AVAILABLE;
    }
}
