package sonique.bango.matcher.workitempanel;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sonique.bango.driver.panel.WorkItemPanel;

public abstract class WorkItemPanelMatcher extends TypeSafeMatcher<WorkItemPanel> {
    private final Matcher<String> matcher;

    WorkItemPanelMatcher(Matcher<String> matcher) {
        this.matcher = matcher;
    }

    @Override
    protected boolean matchesSafely(WorkItemPanel item) {
        return matcher.matches(actualValue(item));
    }

    protected abstract String actualValue(WorkItemPanel item);

    @Override
    public void describeTo(Description description) {
        description.appendDescriptionOf(matcher);
    }

    @Override
    protected void describeMismatchSafely(WorkItemPanel item, Description mismatchDescription) {
        mismatchDescription.appendText("was " + actualValue(item));
    }
}
