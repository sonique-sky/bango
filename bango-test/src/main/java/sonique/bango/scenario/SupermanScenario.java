package sonique.bango.scenario;

import sonique.bango.app.ServiceWrapper;

public abstract class SupermanScenario {
    protected final ServiceWrapper services;

    public SupermanScenario(ServiceWrapper serviceWrapper) {
        this.services = serviceWrapper;
    }

    public abstract void bindScenario();
}
