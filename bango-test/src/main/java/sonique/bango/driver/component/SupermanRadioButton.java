package sonique.bango.driver.component;

import org.openqa.selenium.By;
import sonique.bango.driver.panel.SupermanElement;
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
