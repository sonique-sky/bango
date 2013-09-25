package sonique.bango.driver.panel;

import org.openqa.selenium.WebElement;

public class SupermanElement {

    protected final WebElement rootElement;

    public SupermanElement(WebElement rootElement) {
        this.rootElement = rootElement;
    }

    public boolean isDisplayed() {
        return rootElement.isDisplayed();
    }
}
