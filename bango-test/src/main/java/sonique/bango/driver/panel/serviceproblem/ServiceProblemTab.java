package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.tab.SupermanTab;
import sonique.bango.driver.panel.AppContainer;
import sonique.bango.driver.predicate.IsDisplayedPredicate;

import static java.util.concurrent.TimeUnit.SECONDS;
import static sonique.bango.driver.BetterWait.dally;

public class ServiceProblemTab extends SupermanTab implements HasTitle {

    public ServiceProblemTab(AppContainer appContainer, DomainServiceProblem serviceProblem) {
        super(appContainer, String.format("Service Problem [%d]", serviceProblem.serviceProblemId().asInteger()));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-tab-inner"));

        return titleElement.getText();
    }

    public ServiceProblemTabContent tabContent() {
        dally().withTimeout(5, SECONDS).until(this, IsDisplayedPredicate.isDisplayed());
        return new ServiceProblemTabContent(this);
    }
}
