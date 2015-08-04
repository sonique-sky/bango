package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanPanel;

public class ServiceProblemToolbar extends SupermanPanel {
    public ServiceProblemToolbar(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='serviceProblemTabToolbar']"));
    }

    public SupermanButton pullButton() {
        return button(By.cssSelector("[id^='pull-service-problem']"));
    }
}
