package sonique.bango.domain;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.List;

import static com.sun.xml.internal.ws.util.StringUtils.capitalize;

public class Agent {

    private String code;
    private AgentDetails details;
    private AgentState agentState;
    private List<Queue> queues;
    private Role role;

    public Agent(String code, List<Queue> queues, Role role) {
        this.code = code;
        this.queues = queues;
        this.role = role;
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

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }

    @Override
    public boolean equals(Object o) {
        return EqualsBuilder.reflectionEquals(this, o);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
