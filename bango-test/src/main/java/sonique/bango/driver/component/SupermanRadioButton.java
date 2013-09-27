package sonique.bango.driver.component;

import org.openqa.selenium.By;
import sonique.bango.driver.panel.SupermanComponent;
import sonique.bango.driver.panel.SupermanElement;

public class SupermanRadioButton extends SupermanComponent {

    protected SupermanRadioButton(SupermanElement element, By by) {
        super(element, by);
    }

    @Override
    public boolean isEnabled() {
        return !classes().contains("x-btn-disabled");
    }

    public void click() {
        waitFor(element());
        element().click();
    }
}
