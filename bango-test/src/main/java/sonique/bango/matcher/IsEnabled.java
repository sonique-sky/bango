package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;

public class IsEnabled<T extends SupermanElement> extends AsynchronousMatcher<T> {

    public static IsEnabled isEnabled() {
        return new IsEnabled();
    }

    private IsEnabled() {
    }

    @Override
    protected Predicate<T> until() {
        return IsEnabledPredicate.isEnabled();
    }

    @Override
    protected String expectedDescription() {
        return " element to be enabled";
    }

    @Override
    protected String actualDescription(T actual) {
        return " was disabled";
    }
}