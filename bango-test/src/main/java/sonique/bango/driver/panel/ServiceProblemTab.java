package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;

public class ServiceProblemTab extends SupermanElement {
    public ServiceProblemTab(SupermanWebDriver driver, Integer serviceProblemId) {
        super(driver.waitFor(By.id(String.format("service-problem-tab-%d", serviceProblemId))));
    }
}
