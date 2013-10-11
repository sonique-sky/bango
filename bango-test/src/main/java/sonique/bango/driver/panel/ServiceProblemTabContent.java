package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.component.ServiceProblemToolbar;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.predicate.IsDisplayedPredicate;

import static java.util.concurrent.TimeUnit.SECONDS;
import static sonique.bango.driver.BetterWait.dally;

public class ServiceProblemTabContent extends SupermanComponent {
    ServiceProblemTabContent(SupermanElement parentElement, Long serviceProblemId) {
        super(parentElement, By.id(String.format("service-problem-tab-content-%d", serviceProblemId)));
    }

    public ServiceProblemToolbar serviceProblemToolbar() {
        dally().withTimeout(5, SECONDS).until(this, IsDisplayedPredicate.isDisplayed());

        return new ServiceProblemToolbar(this);
    }

    public WorkItemPanel workItemPanel() {
        return new WorkItemPanel(this);
    }
}
