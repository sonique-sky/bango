package sonique.bango.driver.panel;

import static org.openqa.selenium.By.id;

public class ServiceProblemTab extends SupermanComponent {
    public ServiceProblemTab(SupermanContainer container, Integer serviceProblemId) {
        super(container, id(String.format("service-problem-tab-%d", serviceProblemId)));
    }
}
