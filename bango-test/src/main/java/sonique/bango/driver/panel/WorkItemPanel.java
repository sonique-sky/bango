package sonique.bango.driver.panel;

import org.openqa.selenium.By;

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
}
