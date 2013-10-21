package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;
import sonique.testsupport.matchers.AppendableAllOf;

public class IsEnabled<T extends SupermanElement> extends AsynchronousMatcher<T> {

    public static <T extends SupermanElement> AppendableAllOf<T> isEnabled() {
        return AppendableAllOf.thatHas(new IsEnabled<T>());
    }

    private IsEnabled() {
    }

    @Override
    protected Predicate<T> until() {
        return IsEnabledPredicate.isEnabled();
    }

    @Override
    protected String expectedDescription() {
        return "element to be enabled";
    }

    @Override
    protected String actualDescription(T actual) {
        return "was disabled";
    }
}