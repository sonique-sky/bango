package sonique.bango.driver.panel.serviceproblem;

import sonique.bango.driver.component.tab.SupermanTab;
import sonique.bango.driver.component.tab.SupermanTabBody;
import sonique.bango.driver.panel.troublereport.TroubleReportPanel;
import sonique.bango.driver.predicate.IsDisplayedPredicate;

import static java.util.concurrent.TimeUnit.SECONDS;
import static sonique.bango.driver.BetterWait.dally;

public class ServiceProblemTabContent extends SupermanTabBody {
    public ServiceProblemTabContent(SupermanTab tab) {
        super(tab);
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
