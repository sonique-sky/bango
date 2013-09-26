package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;

import static com.google.common.base.Predicates.not;
import static sonique.bango.driver.predicate.IsEnabledPredicate.*;

public class IsDisabled extends AsynchronousMatcher<SupermanElement> {

    public static IsDisabled isDisabled() {
        return new IsDisabled();
    }

    private IsDisabled() {
    }

    @Override
    protected Predicate<SupermanElement> until() {
        return not(isEnabled());
    }

    @Override
    protected String failureDescription() {
        return " element to be disabled";
    }

    @Override
    protected String expectedDescription() {
        return " was enabled";
    }
}
