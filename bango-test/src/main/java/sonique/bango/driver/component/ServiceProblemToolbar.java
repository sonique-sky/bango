package sonique.bango.driver.component;

import org.openqa.selenium.By;
import sonique.bango.driver.AppContainer;
import sonique.bango.driver.panel.MessageBox;
import sonique.bango.driver.panel.ServiceProblemTabContent;

public class ServiceProblemToolbar extends SupermanComponent {
    public ServiceProblemToolbar(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.cssSelector("[id^='serviceProblemTabToolbar']"));
    }

    public void pull() {
        new SupermanButton(this, By.cssSelector("[id^='pull-service-problem']")).click();

        // Sucks - our component hierarchy needs more work
        MessageBox messageBox = ((AppContainer) ((ServiceProblemTabContent) parentElement).parentElement).messageBox();

        messageBox.clickYes();
    }
}
