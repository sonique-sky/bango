package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.tab.SupermanTab;
import sonique.bango.driver.panel.AppContainer;

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
        return new ServiceProblemTabContent(this);
    }
}
