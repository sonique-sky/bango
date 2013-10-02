package sonique.bango.matcher;

import com.google.common.base.Predicate;
import org.hamcrest.Matcher;
import sonique.bango.driver.panel.HasTitle;

public class ATitleOf extends AsynchronousMatcher<HasTitle> {

    public static Matcher<HasTitle> aTitleOf(String expectedTitle) {
        return new ATitleOf(expectedTitle);
    }

    private final String expectedTitle;

    private ATitleOf(String expectedTitle) {
        this.expectedTitle = expectedTitle;
    }

    @Override
    protected Predicate<HasTitle> until() {
        return new Predicate<HasTitle>() {
            @Override
            public boolean apply(HasTitle messageBox) {
                return messageBox.title().equals(expectedTitle);
            }
        };
    }

    @Override
    protected String expectedDescription() {
        return String.format(" a message box with title [%s]", expectedTitle);
    }

    @Override
    protected String actualDescription(HasTitle actual) {
        return String.format(" was a message box with title [%s] ", actual.title());
    }
}
