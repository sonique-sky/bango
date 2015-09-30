package sonique.bango.driver.panel.queuedashboard;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.tab.SupermanTab;
import sonique.bango.driver.panel.AppContainer;

public class QueueDashboardTab extends SupermanTab implements HasTitle {

    public QueueDashboardTab(AppContainer appContainer) {
        super(appContainer, "Queue Dashboard");
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-tab-inner"));

        return titleElement.getText();
    }
}
