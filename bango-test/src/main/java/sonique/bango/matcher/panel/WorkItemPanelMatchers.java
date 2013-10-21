package sonique.bango.matcher.panel;

import org.hamcrest.Matcher;
import sky.sns.spm.domain.model.serviceproblem.AssignmentType;
import sky.sns.spm.domain.model.serviceproblem.WorkItemAction;
import sky.sns.spm.domain.model.serviceproblem.WorkItemPriority;
import sky.sns.spm.domain.model.serviceproblem.WorkItemStatus;
import sonique.bango.driver.panel.serviceproblem.WorkItemPanel;

import java.util.Date;

public class WorkItemPanelMatchers {

    public static Matcher<WorkItemPanel> aWorkItemStatus(Matcher<WorkItemStatus> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, WorkItemStatus>(matcher) {
            @Override
            protected WorkItemStatus actualValue(WorkItemPanel item) {
                return item.status();
            }
        };
    }

    public static Matcher<WorkItemPanel> aWorkItemCreatedDate(Matcher<Date> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, Date>(matcher) {
            @Override
            protected Date actualValue(WorkItemPanel item) {
                return item.createdDate();
            }
        };
    }

    public static Matcher<WorkItemPanel> aWorkItemAssignedAgent(Matcher<String> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, String>(matcher) {
            @Override
            protected String actualValue(WorkItemPanel item) {
                return item.assignedAgent();
            }
        };
    }

    public static Matcher<WorkItemPanel> aWorkItemType(Matcher<AssignmentType> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, AssignmentType>(matcher) {
            @Override
            protected AssignmentType actualValue(WorkItemPanel item) {
                return item.type();
            }
        };
    }

    public static Matcher<WorkItemPanel> aWorkItemAction(Matcher<WorkItemAction> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, WorkItemAction>(matcher) {
            @Override
            protected WorkItemAction actualValue(WorkItemPanel item) {
                return item.action();
            }
        };
    }

    public static Matcher<WorkItemPanel> aWorkItemPriority(Matcher<WorkItemPriority> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, WorkItemPriority>(matcher) {
            @Override
            protected WorkItemPriority actualValue(WorkItemPanel item) {
                return item.priority();
            }
        };
    }

    public static Matcher<WorkItemPanel> aWorkItemReminder(Matcher<Date> matcher) {
        return new AbstractPanelMatcher<WorkItemPanel, Date>(matcher) {
            @Override
            protected Date actualValue(WorkItemPanel item) {
                return item.reminder();
            }
        };
    }
}