package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;

public class IsDisplayedMatcher extends AsynchronousMatcher<SupermanElement> {

    public static IsDisplayedMatcher isDisplayed() {
        return new IsDisplayedMatcher(true);
    }

    public static IsDisplayedMatcher isNotDisplayed() {
        return new IsDisplayedMatcher(false);
    }

    private final boolean expected;

    public IsDisplayedMatcher(boolean expected) {
        this.expected = expected;
    }

    @Override
    protected Predicate<SupermanElement> until() {
        return new Predicate<SupermanElement>() {
            @Override
            public boolean apply(SupermanElement input) {
                return expected == input.isDisplayed();
            }
        };
    }
}
