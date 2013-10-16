package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanFormPanel;

public class EventHistoryPanel extends SupermanFormPanel implements HasTitle {
    public EventHistoryPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='eventHistoryPanel']"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));
        return titleElement.getText();
    }
}
