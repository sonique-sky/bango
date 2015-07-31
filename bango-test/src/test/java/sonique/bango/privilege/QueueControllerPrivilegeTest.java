package sonique.bango.privilege;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import org.hamcrest.Matcher;
import org.junit.Test;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.AgentDetails;
import sky.sns.spm.domain.model.refdata.Role;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.BangoActionUnderTest;
import sonique.bango.action.LoginAction;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.panel.navigation.AgentStatusPanel;
import sonique.bango.matcher.IsDisabled;
import sonique.bango.matcher.IsDisplayed;

import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.IsNotDisplayed.isNotDisplayed;
import static sonique.bango.matcher.panel.AgentStatusPanelMatchers.theAvailabilityButton;

public class QueueControllerPrivilegeTest extends BangoYatspecTest {

    @Test
    public void myQueuesPanelIsNotDisplayed() throws Exception {
        when(theQueueControllerLogsOn());

        then(theMyQueuesPanel(), isNotDisplayed());

    }

    @Test
    public void availabilityButtonIsDisabled() throws Exception {
        when(theQueueControllerLogsOn());

        then(theAgentStatusPanel(), isDisplayedAndTheAvailabilityButtonIsDisabled());
    }

    @Test
    public void queueDashboardIsDisplayed() throws Exception {
        when(theQueueControllerLogsOn());

        then(theQueueDashboardTab(), isDisplayed());
    }

    private Matcher<AgentStatusPanel> isDisplayedAndTheAvailabilityButtonIsDisabled() {
        return IsDisplayed.<AgentStatusPanel>isDisplayed().and(theAvailabilityButton(IsDisabled.<SupermanButton>isDisabled()));
    }

    @Override
    protected DomainAgent agentForTest() {
        return new DomainAgent("q.q", "q.q", new AgentDetails("q", "q", 1, 1), Role.ROLE_QUEUE_CONTROLLER, null);
    }

    private ActionUnderTest theQueueControllerLogsOn() {
        return new BangoActionUnderTest(new LoginAction(supermanApp, agentForTest, "q"));
    }
}
