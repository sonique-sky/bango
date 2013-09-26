package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanFields;
import sonique.bango.driver.component.SupermanTextField;

public abstract class SupermanFormPanel extends SupermanElement {
    private final SupermanFields fields;

    public SupermanFormPanel(SupermanWebDriver driver, By locator) {
        super (driver, locator);
        fields = new SupermanFields(element);
    }

    protected SupermanButton button(By by) {
        return new SupermanButton(driver, this, by);
    }

    protected SupermanTextField textField(String label) {
        return fields.textField(label);
    }
}
