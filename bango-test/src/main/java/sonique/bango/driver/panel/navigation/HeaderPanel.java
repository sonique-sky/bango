package sonique.bango.driver.panel.navigation;

import org.openqa.selenium.By;
import sonique.bango.driver.panel.AppContainer;
import sonique.bango.driver.component.SupermanComponent;

import static org.openqa.selenium.By.cssSelector;
import static org.openqa.selenium.By.id;

public class HeaderPanel extends SupermanComponent {

    public HeaderPanel(AppContainer appContainer) {
        super(appContainer, By.cssSelector("div.app-header"));
    }

    public String loginName() {
        return element().findElement(cssSelector(".login-name")).getText();
    }

    public void logout() {
        element().findElement(id("logout")).click();
    }
}
