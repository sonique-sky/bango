package sonique.bango.privilege;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import org.hamcrest.Matcher;
import org.junit.Test;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.Role;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.AgentStatusPanel;
import sonique.bango.matcher.IsDisplayed;
import spm.domain.model.refdata.DomainAgentBuilder;

import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.IsEnabled.isEnabled;
import static sonique.bango.matcher.IsNotDisplayed.isNotDisplayed;
import static sonique.bango.matcher.ToggleAvailabilityMatcher.availabilityButton;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

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
        return new DomainAgentBuilder()
                .with(Role.ROLE_USER)
                .withFirstName(someString())
                .withLastName(someString())
                .withPassword("a")
                .build();
    }

    private Matcher<AgentStatusPanel> isDisplayedAndTheAvailabilityButtonIsEnabled() {
        return thatHas(IsDisplayed.<AgentStatusPanel>isDisplayed()).and(availabilityButton(isEnabled()));
    }

    protected ActionUnderTest theAgentLogsOn() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                loginAgent();
                return capturedInputAndOutputs;
            }
        };
    }
}