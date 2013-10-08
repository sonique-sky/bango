package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.driver.predicate.IsDisplayedPredicate;

public class IsDisplayed<T extends SupermanElement> extends AsynchronousMatcher<T> {

    public static <T extends SupermanElement> IsDisplayed<T> isDisplayed() {
        return new IsDisplayed<T>();
    }

    private IsDisplayed() {
    }

    @Override
    protected Predicate<T> until() {
        return IsDisplayedPredicate.isDisplayed();
    }

    @Override
    protected String expectedDescription() {
        return "element to be displayed";
    }

    @Override
    protected String actualDescription(T actual) {
        return "was not displayed";
    }
}
