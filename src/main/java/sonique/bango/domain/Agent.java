package sonique.bango.domain;

import java.util.List;

import static com.sun.xml.internal.ws.util.StringUtils.capitalize;

public class Agent {

    private String code;
    private AgentDetails details;
    private AgentState agentState;
    private List<Queue> queues;

    public Agent(String code, List<Queue> queues) {
        this.code = code;
        this.queues = queues;
        this.agentState = new AgentState();

        String[] split = code.toLowerCase().split("\\.");
        details = new AgentDetails(capitalize(split[0]), capitalize(split[1]));
    }

    public String agentCode() {
        return code;
    }

    public List<Queue> queues() {
        return queues;
    }

    public AgentState agentState() {
        return agentState;
    }
}
