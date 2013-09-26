package sonique.bango.driver.panel;

import sonique.bango.driver.SupermanWebDriver;

import static org.openqa.selenium.By.cssSelector;

public class HeaderPanel extends SupermanElement {
    public HeaderPanel(SupermanWebDriver driver) {
        super(driver, cssSelector("div.app-header"));
    }

    public String loginName() {
        return element.findElement(cssSelector(".login-name")).getText();
    }
}
