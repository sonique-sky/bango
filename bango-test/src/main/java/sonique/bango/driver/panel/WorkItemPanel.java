package sonique.bango.driver.panel;

import org.openqa.selenium.By;

import java.util.Date;

public class WorkItemPanel extends SupermanFormPanel {
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

    public boolean hasNoWorkItem() {
        return contains(By.className("no-work-item-text"));
    }
}
