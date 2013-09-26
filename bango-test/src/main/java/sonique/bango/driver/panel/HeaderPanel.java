package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;

public class HeaderPanel extends SupermanElement {
    public HeaderPanel(SupermanWebDriver driver) {
        super(driver.waitFor(By.cssSelector("div.app-header")));
    }

    public String loginName() {
        return rootElement.findElement(By.cssSelector(".login-name")).getText();
    }
}
