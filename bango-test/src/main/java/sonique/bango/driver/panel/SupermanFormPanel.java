package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanFields;
import sonique.bango.driver.component.SupermanTextField;

public abstract class SupermanFormPanel extends SupermanElement {
    private final SupermanFields fields;

    public SupermanFormPanel(WebElement rootElement) {
        super(rootElement);
        fields = new SupermanFields(rootElement);
    }

    protected SupermanButton button(By by) {
        return new SupermanButton(rootElement.findElement(by));
    }

    protected SupermanTextField textField(String label) {
        return fields.textField(label);
    }
}
