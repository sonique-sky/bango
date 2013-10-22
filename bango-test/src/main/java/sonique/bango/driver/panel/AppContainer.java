package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanContainer;
import sonique.bango.driver.panel.navigation.AgentStatusPanel;
import sonique.bango.driver.panel.navigation.HeaderPanel;
import sonique.bango.driver.panel.navigation.MyQueuesPanel;
import sonique.bango.driver.panel.navigation.SearchPanel;
import sonique.bango.driver.panel.queuedashboard.QueueDashboardTab;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import spm.domain.ServiceProblemId;

public class AppContainer extends SupermanContainer {

    public AppContainer(SupermanWebDriver driver) {
        super(driver, By.id("superman-app-container"));
    }

    public HeaderPanel headerPanel() {
        return new HeaderPanel(this);
    }

    public SearchPanel searchPanel() {
        return new SearchPanel(this);
    }

    public MyQueuesPanel myQueuesPanel() {
        return new MyQueuesPanel(this);
    }

    public AgentStatusPanel agentStatusPanel() {
        return new AgentStatusPanel(this);
    }

    public QueueDashboardTab queueDashboardTab() {
        return new QueueDashboardTab(this);
    }

    public ServiceProblemTab serviceProblemTab(ServiceProblemId serviceProblemId) {
        return new ServiceProblemTab(this, serviceProblemId);
    }
}