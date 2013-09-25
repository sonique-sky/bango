package sonique.bango.matcher;

import com.google.common.base.Predicate;
import org.openqa.selenium.StaleElementReferenceException;
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
                try {
                    return expected == input.isDisplayed();
                } catch (StaleElementReferenceException e) {
                    return !expected;
                }
            }
        };
    }

    @Override
    protected String failureDescription() {
        return String.format(" element %s displayed", expected ? "to be" : "not to be");
    }

    @Override
    protected String expectedDescription() {
        return String.format(" %s displayed", expected ? "wasn't" : "was");
    }
}
