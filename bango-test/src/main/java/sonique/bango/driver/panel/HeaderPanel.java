package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;

public class HeaderPanel extends SupermanPanel {
    public HeaderPanel(SupermanWebDriver driver) {
        super(driver.waitFor(By.cssSelector("div.app-header")));
    }
}
