package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.component.SupermanButton;

public class IsDisabledMatcher extends AsynchronousMatcher<SupermanButton> {

    public static IsDisabledMatcher isDisabled() {
        return new IsDisabledMatcher(true);
    }

    public static IsDisabledMatcher isNotDisabled() {
        return new IsDisabledMatcher(false);
    }

    private final boolean expected;

    public IsDisabledMatcher(boolean expected) {
        this.expected = expected;
    }

    @Override
    protected Predicate<SupermanButton> until() {
        return new Predicate<SupermanButton>() {
            @Override
            public boolean apply(SupermanButton input) {
                return expected == input.isDisabled();
            }
        };
    }
}
