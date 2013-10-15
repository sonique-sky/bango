package sonique.bango.matcher.panel;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sonique.bango.driver.panel.WorkItemPanel;

public class NoWorkItemMatcher extends TypeSafeMatcher<WorkItemPanel> {
    public static Matcher<? super WorkItemPanel> anEmptyWorkItemPanel() {
        return new NoWorkItemMatcher();
    }

    @Override
    protected boolean matchesSafely(WorkItemPanel item) {
        return item.hasNoWorkItem();
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("'No work item' text is displayed");
    }

    @Override
    protected void describeMismatchSafely(WorkItemPanel item, Description mismatchDescription) {
        mismatchDescription.appendText("was not displayed :(");
    }
}
