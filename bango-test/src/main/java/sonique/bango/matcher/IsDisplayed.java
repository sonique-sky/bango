package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicate.IsDisplayedPredicate;

public class IsDisplayed extends AsynchronousMatcher<SupermanElement> {

    public static IsDisplayed isDisplayed() {
        return new IsDisplayed();
    }

    private IsDisplayed() {
    }

    @Override
    protected Predicate<SupermanElement> until() {
        return IsDisplayedPredicate.isDisplayed();
    }

    @Override
    protected String failureDescription() {
        return " element to be displayed";
    }

    @Override
    protected String expectedDescription() {
        return " wasn't displayed";
    }
}
