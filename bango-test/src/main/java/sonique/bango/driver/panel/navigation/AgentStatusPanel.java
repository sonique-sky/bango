package sonique.bango.driver.panel.navigation;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanPanel;

public class AgentStatusPanel extends SupermanPanel {
    public AgentStatusPanel(SupermanElement parentElement) {
        super(parentElement, By.cssSelector("div.status-panel"));
    }

    public SupermanButton availabilityButton() {
        return button(By.id("toggle-availability"));
    }
}
