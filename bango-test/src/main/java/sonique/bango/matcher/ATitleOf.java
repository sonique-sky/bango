package sonique.bango.matcher;

import com.google.common.base.Predicate;
import org.hamcrest.Matcher;
import sonique.bango.driver.component.HasTitle;

public class ATitleOf< T extends HasTitle> extends AsynchronousMatcher<T> {

    public static <T extends HasTitle>  Matcher<T> aTitleOf(String expectedTitle) {
        return new ATitleOf<T>(expectedTitle);
    }

    private final String expectedTitle;

    private ATitleOf(String expectedTitle) {
        this.expectedTitle = expectedTitle;
    }

    @Override
    protected Predicate<T> until() {
        return element -> element.title().equals(expectedTitle);
    }

    @Override
    protected String expectedDescription() {
        return String.format("an element with title [%s]", expectedTitle);
    }

    @Override
    protected String actualDescription(T actual) {
        return String.format("was an element with title [%s] ", actual.title());
    }
}