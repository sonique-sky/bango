package sonique.bango.matcher.workitempanel;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sonique.bango.driver.panel.WorkItemPanel;

import java.util.Date;

public abstract class WorkItemPanelMatcher<TYPE> extends TypeSafeMatcher<WorkItemPanel> {

    public static Matcher<? super WorkItemPanel> aWorkItemStatus(Matcher<String> matcher) {
        return new WorkItemPanelMatcher<String>(matcher) {
            @Override
            protected String actualValue(WorkItemPanel item) {
                return item.status();
            }
        };
    }

    public static Matcher<? super WorkItemPanel> aWorkItemCreatedDate(Matcher<Date> matcher) {
        return new WorkItemPanelMatcher<Date>(matcher) {
            @Override
            protected Date actualValue(WorkItemPanel item) {
                return item.createdDate();
            }
        };
    }

    public static Matcher<? super WorkItemPanel> aWorkItemAssignedAgent(Matcher<String> matcher) {
        return new WorkItemPanelMatcher<String>(matcher) {
            @Override
            protected String actualValue(WorkItemPanel item) {
                return item.assignedAgent();
            }
        };
    }

    public static Matcher<? super WorkItemPanel> aWorkItemType(Matcher<String> matcher) {
        return new WorkItemPanelMatcher<String>(matcher) {
            @Override
            protected String actualValue(WorkItemPanel item) {
                return item.type();
            }
        };
    }

    public static Matcher<? super WorkItemPanel> aWorkItemAction(Matcher<String> matcher) {
        return new WorkItemPanelMatcher<String>(matcher) {
            @Override
            protected String actualValue(WorkItemPanel item) {
                return item.action();
            }
        };
    }

    public static Matcher<? super WorkItemPanel> aWorkItemPriority(Matcher<String> matcher) {
        return new WorkItemPanelMatcher<String>(matcher) {
            @Override
            protected String actualValue(WorkItemPanel item) {
                return item.priority();
            }
        };
    }

    private final Matcher<TYPE> matcher;

    private WorkItemPanelMatcher(Matcher<TYPE> matcher) {
        this.matcher = matcher;
    }

    protected abstract TYPE actualValue(WorkItemPanel item);

    @Override
    protected boolean matchesSafely(WorkItemPanel item) {
        return matcher.matches(actualValue(item));
    }

    @Override
    public void describeTo(Description description) {
        description.appendDescriptionOf(matcher);
    }

    @Override
    protected void describeMismatchSafely(WorkItemPanel item, Description mismatchDescription) {
        mismatchDescription.appendText("was " + actualValue(item));
    }
}
