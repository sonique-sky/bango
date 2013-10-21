package sonique.bango.matcher.panel;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;

public abstract class AbstractPanelMatcher<PANEL, TYPE> extends TypeSafeMatcher<PANEL> {
    protected final Matcher<? super TYPE> matcher;

    public AbstractPanelMatcher(Matcher<? super TYPE> matcher) {
        this.matcher = matcher;
    }

    protected abstract TYPE actualValue(PANEL item);

    @Override
    protected boolean matchesSafely(PANEL item) {
        return matcher.matches(actualValue(item));
    }

    @Override
    public void describeTo(Description description) {
        description.appendDescriptionOf(matcher);
    }

    @Override
    protected void describeMismatchSafely(PANEL item, Description mismatchDescription) {
        mismatchDescription.appendText(String.format("was [%s]", actualValue(item)));
    }
}
