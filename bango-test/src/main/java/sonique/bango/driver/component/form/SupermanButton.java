package sonique.bango.driver.component.form;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.openqa.selenium.By.cssSelector;
import static sonique.bango.driver.BetterWait.dally;

public class SupermanButton extends SupermanComponent {

    public SupermanButton(SupermanElement element) {
        super(element, cssSelector(".x-btn"));
    }

    public SupermanButton(SupermanElement supermanElement, By by) {
        super(supermanElement, by);
    }

    @Override
    public boolean isEnabled() {
        return !classes().contains("x-btn-disabled");
    }

    public void click() {
        dally().withTimeout(5, SECONDS).until(this, IsEnabledPredicate.isEnabled());
        element().click();
    }
}
