package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import static org.openqa.selenium.By.id;

public class ServiceProblemTab extends SupermanComponent implements HasTitle {
    public ServiceProblemTab(SupermanContainer container, Long serviceProblemId) {
        super(container, id(String.format("service-problem-tab-%d", serviceProblemId)));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-tab-inner"));

        return titleElement.getText();
    }
}
