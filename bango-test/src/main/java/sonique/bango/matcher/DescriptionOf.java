package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sonique.types.Describable;

import static org.hamcrest.CoreMatchers.equalTo;

public class DescriptionOf extends TypeSafeMatcher<String> {

    public static DescriptionOf withDescriptionOf(Describable describable) {
        return new DescriptionOf(describable);
    }

    private final Matcher<String> describableMatcher;

    private DescriptionOf(Describable describable) {
        this.describableMatcher = equalTo(describable.description());
    }

    @Override
    protected boolean matchesSafely(String item) {
        return describableMatcher.matches(item);
    }

    @Override
    public void describeTo(Description description) {
        description.appendDescriptionOf(describableMatcher);
    }
}
