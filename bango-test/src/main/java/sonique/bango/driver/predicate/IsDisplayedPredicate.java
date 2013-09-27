package sonique.bango.driver.predicate;

import com.google.common.base.Predicate;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import sonique.bango.driver.panel.SupermanComponent;
import sonique.bango.driver.panel.SupermanElement;

public class IsDisplayedPredicate<T extends SupermanElement> implements Predicate<T> {

    public static <T extends SupermanElement> IsDisplayedPredicate<T> isDisplayed() {
        return new IsDisplayedPredicate<T>();
    }

    private IsDisplayedPredicate() {
    }

    @Override
    public boolean apply(T element) {
        try {
            return element.isDisplayed();
        } catch (StaleElementReferenceException e) {
            return false;
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
