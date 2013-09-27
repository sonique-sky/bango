package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;

public class IsEnabled extends AsynchronousMatcher<SupermanElement> {

    public static IsEnabled isEnabled() {
        return new IsEnabled();
    }

    private IsEnabled() {
    }

    @Override
    protected Predicate<SupermanElement> until() {
        return IsEnabledPredicate.isEnabled();
    }

    @Override
    protected String failureDescription() {
        return " element to be enabled";
    }

    @Override
    protected String expectedDescription() {
        return " was disabled";
    }
}