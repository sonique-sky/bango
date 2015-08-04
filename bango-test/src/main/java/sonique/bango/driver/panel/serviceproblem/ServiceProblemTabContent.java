package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.panel.troublereport.TroubleReportPanel;
import sonique.bango.driver.predicate.IsDisplayedPredicate;
import spm.domain.ServiceProblemId;

import static java.util.concurrent.TimeUnit.SECONDS;
import static sonique.bango.driver.BetterWait.dally;

public class ServiceProblemTabContent extends SupermanComponent {
    ServiceProblemTabContent(SupermanElement parentElement, ServiceProblemId serviceProblemId) {
        super(parentElement, By.id(String.format("service-problem-tab-content-%d", serviceProblemId.asLong())));
    }

    public ServiceProblemToolbar serviceProblemToolbar() {
        dally().withTimeout(5, SECONDS).until(this, IsDisplayedPredicate.isDisplayed());

        return new ServiceProblemToolbar(this);
    }

    public WorkItemPanel workItemPanel() {
        return new WorkItemPanel(this);
    }

    public ServiceProblemPanel serviceProblemPanel() {
        return new ServiceProblemPanel(this);
    }

    public EventHistoryPanel eventHistoryPanel() {
        return new EventHistoryPanel(this);
    }

    public ViewToolbar viewToolbar() {
        return new ViewToolbar(this);
    }

    public TroubleReportPanel troubleReportPanel() {
        return new TroubleReportPanel(this);
    }
}
