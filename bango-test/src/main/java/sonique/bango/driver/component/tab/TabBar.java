package sonique.bango.driver.component.tab;

import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.driver.panel.AppContainer;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;

public class TabBar {
    private final AppContainer appContainer;

    public TabBar(AppContainer appContainer) {
        this.appContainer = appContainer;
    }

    public SupermanTab queueDashboard() {
        return new SupermanTab(appContainer, "Queue Dashboard");
    }

    public SupermanTab agentDashboard() {
        return new SupermanTab(appContainer, "Agent Dashboard");
    }

    public SupermanTab mspDashboard() {
        return new SupermanTab(appContainer, "MSP Dashboard");
    }

    public SupermanTab adminDashboard() {
        return new SupermanTab(appContainer, "Admin Dashboard");
    }

    public ServiceProblemTab serviceProblem(DomainServiceProblem serviceProblem) {
        return new ServiceProblemTab(appContainer, serviceProblem);
    }
}
