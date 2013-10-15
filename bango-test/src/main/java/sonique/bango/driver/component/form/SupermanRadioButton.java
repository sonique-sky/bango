package sonique.bango.driver.component.form;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;

import static sonique.bango.driver.BetterWait.dally;

public class SupermanRadioButton extends SupermanComponent {

    protected SupermanRadioButton(SupermanElement element, By by) {
        super(element, by);
    }

    @Override
    public boolean isEnabled() {
        return !classes().contains("x-btn-disabled");
    }

    public void click() {
        dally().until(this, IsEnabledPredicate.isEnabled());
        element().click();
    }
}
