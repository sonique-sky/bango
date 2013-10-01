package sonique.bango;

import sonique.bango.domain.Agent;
import sonique.bango.driver.ScenarioDriver;

public abstract class SupermanScenario {
    protected final ScenarioDriver scenarioDriver;
    protected final Agent agent;

    public SupermanScenario(Agent agent, ScenarioDriver scenarioDriver) {
        this.agent = agent;
        this.scenarioDriver = scenarioDriver;
    }

    public abstract void bindScenario();
}
