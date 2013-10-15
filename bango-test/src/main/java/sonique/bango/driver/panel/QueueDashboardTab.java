package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.AppContainer;
import sonique.bango.driver.component.SupermanComponent;

import static org.openqa.selenium.By.id;

public class QueueDashboardTab extends SupermanComponent implements HasTitle {

    public QueueDashboardTab(AppContainer appContainer) {
        super(appContainer, id("queue-dashboard-tab"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-tab-inner"));

        return titleElement.getText();
    }
}
