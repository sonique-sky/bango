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
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.matcher.IsEnabled;
import spm.domain.model.refdata.DomainAgentBuilder;

import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.IsNotDisplayed.isNotDisplayed;
import static sonique.bango.matcher.panel.AgentStatusPanelMatchers.theAvailabilityButton;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;

public class UserAgentPrivilegeTest extends BangoYatspecTest {

    @Test
    public void myQueuesPanelIsDisplayed() throws Exception {
        when(theAgentLogsOn());

        then(theMyQueuesPanel(), isDisplayed());
    }

    @Test
    public void availabilityButtonIsEnabled() throws Exception {
        when(theAgentLogsOn());

        then(theAgentStatusPanel(), isDisplayedAndTheAvailabilityButtonIsEnabled());
    }

    @Test
    public void queueDashboardIsNotDisplayed() throws Exception {
        when(theAgentLogsOn());

        then(theQueueDashboardTab(), isNotDisplayed());
    }

    @Override
    protected DomainAgent agentForTest() {
        return new DomainAgent("q.q", "q.q", new AgentDetails("q", "q", 1, 1), Role.ROLE_USER, null);
    }

    private Matcher<AgentStatusPanel> isDisplayedAndTheAvailabilityButtonIsEnabled() {
        return IsDisplayed.<AgentStatusPanel>isDisplayed().and(theAvailabilityButton(IsEnabled.<SupermanButton>isEnabled()));
    }

    protected ActionUnderTest theAgentLogsOn() {
        return new BangoActionUnderTest(new LoginAction(supermanApp, agentForTest, "q"));
    }
}