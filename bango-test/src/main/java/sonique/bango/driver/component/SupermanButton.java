package sonique.bango.driver.component;

import org.openqa.selenium.By;
import sonique.bango.driver.panel.SupermanComponent;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.panel.SupermanFormPanel;
import sonique.bango.driver.predicate.IsEnabledPredicate;

import static org.openqa.selenium.By.cssSelector;

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
        waitFor(element());
        element().click();
    }
}
