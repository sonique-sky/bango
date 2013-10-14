package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;

public class AgentStatusPanel extends SupermanComponent {
    public AgentStatusPanel(SupermanElement parentElement) {
        super(parentElement, By.cssSelector("div.status-panel"));
    }
}
