package sonique.bango.domain;

import java.util.Set;

import static java.util.EnumSet.of;
import static sonique.bango.domain.Privilege.*;

public enum Role {
    ROLE_USER("Team Member", of(HasAssignedQueues, PullServiceProblem)),
    ROLE_TEAM_LEAD("Team Leader", of(PullServiceProblem)),
    ROLE_QUEUE_CONTROLLER("Queue Controller", of(PullServiceProblem, ViewQueueDashboard)),
    ROLE_MSP_ADMINISTRATOR("Msp Administrator", of(PullServiceProblem));

    private final String displayName;
    private final Set<Privilege> privileges;

    Role(String displayName, Set <Privilege> privileges) {
        this.displayName = displayName;
        this.privileges = privileges;
    }

    public String displayName() {
        return displayName;
    }

    public Set<Privilege> privileges() {
        return privileges;
    }
}
