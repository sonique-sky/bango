package sonique.bango.matcher;

import com.google.common.base.Predicate;
import org.hamcrest.Matcher;
import sonique.bango.driver.component.HasMessage;

public class AMessageOf<T extends HasMessage> extends AsynchronousMatcher<T> {

    public static <T extends HasMessage> Matcher<T> aMessageOf(String expectedTitle) {
        return new AMessageOf<T>(expectedTitle);
    }

    private final String expectedMessage;

    private AMessageOf(String expectedMessage) {
        this.expectedMessage = expectedMessage;
    }

    @Override
    protected Predicate<T> until() {
        return element -> element.message().equals(expectedMessage);
    }

    @Override
    protected String expectedDescription() {
        return String.format("an element with message [%s]", expectedMessage);
    }

    @Override
    protected String actualDescription(T actual) {
        return String.format("was an element with message [%s] ", actual.message());
    }
}