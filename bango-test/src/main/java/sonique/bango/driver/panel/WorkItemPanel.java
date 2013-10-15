package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.Date;

public class WorkItemPanel extends SupermanFormPanel implements HasTitle {
    public WorkItemPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='workItemPanel']"));
    }

    public String assignedAgent() {
        return textField("Assigned Agent").value();
    }

    public String status() {
        return textField("Status").value();
    }

    public Date createdDate() {
        return dateField("Created Date", "dd/MM/yyyy HH:mm").value();
    }

    public String type() {
        return textField("Type").value();
    }

    public String priority() {
        return textField("Priority").value();
    }

    public String action() {
        return textField("Action").value();
    }

    public Date reminder() {
        return dateField("Reminder", "dd/MM/yyyy HH:mm").value();
    }

    public boolean hasNoWorkItem() {
        return contains(By.className("no-work-item-text"));
    }

    @Override
    public String title() {
        WebElement titleElement = element().findElement(By.cssSelector("span.x-header-text"));
        return titleElement.getText();
    }
}
