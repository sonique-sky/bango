package sonique.bango.driver.panel;

import sonique.bango.driver.SupermanWebDriver;

import static org.openqa.selenium.By.id;

public class ServiceProblemTab extends SupermanElement {
    public ServiceProblemTab(SupermanWebDriver driver, Integer serviceProblemId) {
        super(driver, id(String.format("service-problem-tab-%d", serviceProblemId)));
    }
}
