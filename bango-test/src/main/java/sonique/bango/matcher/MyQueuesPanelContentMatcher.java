package sonique.bango.matcher;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import sonique.bango.driver.panel.MyQueuesPanel;
import spm.domain.QueueName;

import java.util.List;

import static org.hamcrest.core.IsEqual.equalTo;

public class MyQueuesPanelContentMatcher extends TypeSafeMatcher<MyQueuesPanel> {
    private final List<QueueName> queueNames;

    public MyQueuesPanelContentMatcher(List<QueueName> queueNames) {
        this.queueNames = queueNames;
    }

    public static Matcher<MyQueuesPanel> theExpectedQueues(List<QueueName> queueNames) {
        return new MyQueuesPanelContentMatcher(queueNames);
    }

    @Override
    protected boolean matchesSafely(MyQueuesPanel myQueuesPanel) {
        return equalTo(queueNames).matches(myQueuesPanel.queueNames());
    }

    @Override
    public void describeTo(Description description) {
        description.appendText("" + queueNames);
    }

    @Override
    protected void describeMismatchSafely(MyQueuesPanel item, Description mismatchDescription) {
        mismatchDescription.appendText("" + item.queueNames());
    }
}
