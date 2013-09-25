package sonique.bango.driver;

import sonique.bango.domain.Agent;
import sonique.bango.store.AgentStore;

public class ScenarioDriver {
    private final AgentStore agentStore;

    public ScenarioDriver(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    public void registerAgent(Agent agent){
        agentStore.registerAgent(agent);
    }
}
