package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sonique.bango.driver.panel.ServiceProblemTab;

public class NoWorkItemMatcher extends TypeSafeMatcher<ServiceProblemTab> {
    public static Matcher<? super ServiceProblemTab> anEmptyWorkItemPanel() {
        return new NoWorkItemMatcher();
    }

    @Override
    protected boolean matchesSafely(ServiceProblemTab item) {
        return item.tabContent().workItemPanel().hasNoWorkItem();
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("'No work item' text is displayed");
    }

    @Override
    protected void describeMismatchSafely(ServiceProblemTab item, Description mismatchDescription) {
        mismatchDescription.appendText("was not displayed :(");
    }
}
