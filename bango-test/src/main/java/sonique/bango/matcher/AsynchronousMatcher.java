package sonique.bango.matcher;

import com.google.common.base.Predicate;
import org.hamcrest.Description;
import org.hamcrest.TypeSafeMatcher;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.support.ui.FluentWait;

import java.util.concurrent.TimeUnit;

import static sonique.utils.StringUtils.unCamelClassOf;

public abstract class AsynchronousMatcher<T> extends TypeSafeMatcher<T> {
    @Override
    public boolean matchesSafely(T item) {
        try {
            new FluentWait<T>(item)
                    .withTimeout(5, TimeUnit.SECONDS)
                    .pollingEvery(100, TimeUnit.MILLISECONDS)
                    .until(until());
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    protected abstract Predicate<T> until();

    protected abstract String expectedDescription();

    protected abstract String actualDescription(T actual);

    @Override
    public void describeTo(Description description) {
        description.appendText(expectedDescription());
    }

    @Override
    protected void describeMismatchSafely(T actual, Description description) {
        description.appendText(unCamelClassOf(actual) + " " + actualDescription(actual));
    }
}