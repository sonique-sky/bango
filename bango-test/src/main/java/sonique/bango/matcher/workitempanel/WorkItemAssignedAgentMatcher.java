package sonique.bango.matcher.workitempanel;

import org.hamcrest.Matcher;
import sonique.bango.driver.panel.WorkItemPanel;

public class WorkItemAssignedAgentMatcher extends WorkItemPanelMatcher {

    public WorkItemAssignedAgentMatcher(Matcher<String> matcher) {
        super(matcher);
    }

    protected String actualValue(WorkItemPanel item) {
        return item.assignedAgent();
    }
}
