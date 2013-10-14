package sonique.bango.driver;

import org.openqa.selenium.By;
import sonique.bango.driver.panel.*;
import spm.domain.ServiceProblemId;

public class AppContainer extends SupermanContainer {

    public AppContainer(SupermanWebDriver driver) {
        super(driver, By.id("superman-app-container"));
    }

    public MessageBox messageBox() {
        return new MessageBox(driver);
    }

    public HeaderPanel headerPanel() {
        return new HeaderPanel(this);
    }

    public SearchPanel searchPanel() {
        return new SearchPanel(this);
    }

    public ServiceProblemTab serviceProblemTab(ServiceProblemId serviceProblemId) {
        return new ServiceProblemTab(this, serviceProblemId);
    }
}