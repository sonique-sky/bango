package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sky.sns.spm.domain.model.serviceproblem.AssignmentType;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;
import sky.sns.spm.domain.model.serviceproblem.WorkItemPriority;
import sky.sns.spm.domain.model.serviceproblem.WorkItemStatus;
import sonique.bango.driver.component.HasTitle;
import sonique.bango.driver.component.form.SupermanPanel;

import java.util.Date;

public class WorkItemPanel extends SupermanPanel implements HasTitle {
    public WorkItemPanel(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='workItemPanel']"));
    }

    public String assignedAgent() {
        return textField("Assigned Agent").value();
    }

    public WorkItemStatus status() {
        return WorkItemStatus.valueOf(textField("Status").value());
    }

    public Date createdDate() {
        return dateField("Created Date", "dd/MM/yyyy HH:mm").value();
    }

    public AssignmentType type() {
        return AssignmentType.valueOf(textField("Type").value());
    }

    public WorkItemPriority priority() {
        return WorkItemPriority.valueOf(textField("Priority").value());
    }

    public WorkItemAction action() {
        return WorkItemAction.getByDescription(textField("Action").value());
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
