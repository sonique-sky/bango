package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;

import static com.google.common.base.Predicates.not;

public class IsDisabled<T extends SupermanElement> extends AsynchronousMatcher<T> {

    public static <T extends SupermanElement> IsDisabled<T> isDisabled() {
        return new IsDisabled<T>();
    }

    private IsDisabled() {
    }

    @Override
    protected Predicate<T> until() {
        return not(IsEnabledPredicate.<T>isEnabled());
    }

    @Override
    protected String expectedDescription() {
        return "element to be disabled";
    }

    @Override
    protected String actualDescription(T actual) {
        return "was enabled";
    }
}
