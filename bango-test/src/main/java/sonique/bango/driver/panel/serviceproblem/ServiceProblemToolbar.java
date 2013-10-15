package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.form.SupermanFormPanel;
import sonique.bango.driver.panel.AppContainer;
import sonique.bango.driver.panel.MessageBox;

public class ServiceProblemToolbar extends SupermanFormPanel {
    public ServiceProblemToolbar(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='serviceProblemTabToolbar']"));
    }

    public void pull() {
        button(By.cssSelector("[id^='pull-service-problem']")).click();

        // Sucks - our component hierarchy needs more work
        MessageBox messageBox = ((AppContainer) parent().parent()).messageBox();

        messageBox.clickYes();
    }
}
