package sonique.bango.scenario;

import sky.sns.spm.domain.model.DomainAgent;
import sonique.bango.app.ScenarioDriver;
import sonique.bango.app.ServiceWrapper;

public abstract class SupermanScenario {
    protected final ServiceWrapper services;

    public SupermanScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        this.services = scenarioDriver.servicesFor(agent);
    }

    public abstract void bindScenario();
}
