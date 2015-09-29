package sonique.bango.matcher;

import com.google.common.base.Predicate;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.predicate.IsDisplayedPredicate;
import sonique.testsupport.matchers.AppendableAllOf;

public class IsDisplayed<T extends SupermanElement> extends AsynchronousMatcher<T> {

    public static <T extends SupermanElement> AppendableAllOf<T> isDisplayed() {
        return AppendableAllOf.thatHas(new IsDisplayed<>());
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