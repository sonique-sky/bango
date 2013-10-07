package sonique.bango.driver;

import org.openqa.selenium.By;
import sonique.bango.driver.panel.HeaderPanel;
import sonique.bango.driver.panel.SearchPanel;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.SupermanContainer;

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

    public ServiceProblemTab serviceProblemTab(Long serviceProblemId) {
        return new ServiceProblemTab(this, serviceProblemId);
    }
}