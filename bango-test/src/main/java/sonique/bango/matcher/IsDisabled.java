package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.predicate.IsEnabledPredicate;
import sonique.testsupport.matchers.AppendableAllOf;

import static com.google.common.base.Predicates.not;

public class IsDisabled<T extends SupermanElement> extends AsynchronousMatcher<T> {

    public static <T extends SupermanElement> AppendableAllOf<T> isDisabled() {
        return AppendableAllOf.thatHas(new IsDisabled<T>());
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
