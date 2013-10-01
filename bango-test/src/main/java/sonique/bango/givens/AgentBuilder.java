package sonique.bango.givens;

import com.google.common.collect.Lists;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.domain.Role;

import java.util.List;

import static sonique.bango.domain.Role.ROLE_QUEUE_CONTROLLER;
import static sonique.bango.domain.Role.ROLE_USER;

public class AgentBuilder {

    public static Agent anAgent() {
        return new AgentBuilder().with(Lists.<Queue>newArrayList()).with(ROLE_USER).build();
    }

    public static Agent aQueueController() {
        return new AgentBuilder().with(Lists.<Queue>newArrayList()).with(ROLE_QUEUE_CONTROLLER).build();
    }

    private List<Queue> queues;
    private Role role;

    public AgentBuilder with(List<Queue> queues) {
        this.queues = queues;

        return this;
    }

    public AgentBuilder with(Role role) {
        this.role = role;

        return this;
    }

    public Agent build() {
        return new Agent("K.K", queues, role);
    }
}
