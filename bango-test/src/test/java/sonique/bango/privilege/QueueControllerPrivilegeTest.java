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

import static sonique.bango.matcher.IsDisabled.isDisabled;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.IsNotDisplayed.isNotDisplayed;
import static sonique.bango.matcher.ToggleAvailabilityMatcher.theAvailabilityButton;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

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
         return thatHas(IsDisplayed.<AgentStatusPanel>isDisplayed()).and(theAvailabilityButton(isDisabled()));
     }

    @Override
    protected DomainAgent agentForTest() {
        return new DomainAgentBuilder()
                .with(Role.ROLE_QUEUE_CONTROLLER)
                .withFirstName(someString())
                .withLastName(someString())
                .withPassword("a")
                .build();

    }

    private ActionUnderTest theQueueControllerLogsOn() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                loginAgent();
                return capturedInputAndOutputs;
            }
        };
    }
}
