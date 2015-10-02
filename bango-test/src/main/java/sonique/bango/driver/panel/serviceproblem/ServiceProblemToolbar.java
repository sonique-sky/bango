package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanPanel;

public class ServiceProblemToolbar extends SupermanPanel {
    public ServiceProblemToolbar(ServiceProblemTabContent serviceProblemTabContent) {
        super(serviceProblemTabContent, By.xpath("./div[contains(concat(' ', @class, ' '), ' x-toolbar ')]"));
    }

    public SupermanButton pullButton() {
        return button(By.xpath(".//a[@data-qtip='Pull this item']"));
    }
}
