package sonique.bango.driver.component;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicates.IsEnabledPredicate;

public class SupermanButton extends SupermanElement {

    public SupermanButton(SupermanWebDriver driver, SupermanElement parentElement, By locator) {
        super(driver, parentElement, locator);
    }

    @Override
    public boolean isEnabled() {
        return !isDisabled();
    }

    public boolean isDisabled() {
        return classes().contains("x-btn-disabled");
    }

    public void click() {
        driver.waitUntil(this, IsEnabledPredicate.isEnabled());

        element.click();

    }
}
