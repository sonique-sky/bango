package sonique.bango.matcher.workitempanel;

import org.hamcrest.Matcher;
import sonique.bango.driver.panel.WorkItemPanel;

public class WorkItemStatusMatcher extends WorkItemPanelMatcher {
    public WorkItemStatusMatcher(Matcher<String> matcher) {
        super(matcher);
    }

    @Override
    protected String actualValue(WorkItemPanel item) {
        return item.status();
    }
}
