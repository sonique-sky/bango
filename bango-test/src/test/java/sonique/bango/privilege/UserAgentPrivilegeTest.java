package sonique.bango.privilege;

import com.google.common.base.Function;
import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Test;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.domain.model.refdata.Role;
import sky.sns.spm.domain.model.refdata.TeamBuilder;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.AgentStatusPanel;
import sonique.bango.driver.panel.MyQueuesPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.testsupport.matchers.AppendableAllOf;
import spm.domain.QueueName;
import spm.domain.model.refdata.DomainAgentBuilder;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Lists.transform;
import static org.hamcrest.core.IsEqual.equalTo;
import static sonique.datafixtures.PrimitiveDataFixtures.someString;
import static util.SupermanDataFixtures.*;

public class UserAgentPrivilegeTest extends BangoYatspecTest {

    private List<QueueName> queueNames;

    @Test
    public void myQueuesPanelIsDisplayedWithAssignedQueues() throws Exception {
        when(theAgentLogsOn());

        then(theMyQueuesPanel(), isDisplayedWithTheExpectedQueues());
    }

    @Test
    public void availabilityButtonIsEnabled() throws Exception {
        when(theAgentLogsOn());

        then(theAgentStatusPanel(), isDisplayed());
    }

    @Test
    public void queueDashboardIsNotDisplayed() throws Exception {

    }

    private StateExtractor<AgentStatusPanel> theAgentStatusPanel() {
        return new StateExtractor<AgentStatusPanel>() {
            @Override
            public AgentStatusPanel execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().agentStatusPanel();
            }
        };
    }

    private Matcher<MyQueuesPanel> theExpectedQueues() {
        return new TypeSafeMatcher<MyQueuesPanel>() {
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
        };
    }

    private AppendableAllOf<MyQueuesPanel> isDisplayedWithTheExpectedQueues() {
        return AppendableAllOf.thatHas(IsDisplayed.<MyQueuesPanel>isDisplayed()).with(theExpectedQueues());
    }

    private AppendableAllOf<AgentStatusPanel> isDisplayed() {
        return AppendableAllOf.thatHas(IsDisplayed.<AgentStatusPanel>isDisplayed());
    }

    @Override
    protected DomainAgent agentForTest() {
        queueNames = newArrayList(someQueueName(), someQueueName(), someQueueName(), someQueueName(), someQueueName(), someQueueName());

        return new DomainAgentBuilder()
                .with(Role.ROLE_USER)
                .withTeam(new TeamBuilder()
                        .with(someTeamId())
                        .with(someTeamName())
                        .withAssignedQueues(transform(queueNames, new Function<QueueName, Queue>() {
                            @Override
                            public Queue apply(QueueName queueName) {
                                return new Queue(someQueueId(), queueName);
                            }
                        }))
                        .build()
                )
                .withFirstName(someString())
                .withLastName(someString())
                .withPassword("a")
                .build();
    }

    private StateExtractor<MyQueuesPanel> theMyQueuesPanel() {
        return new StateExtractor<MyQueuesPanel>() {
            @Override
            public MyQueuesPanel execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().myQueuesPanel();
            }
        };
    }

    private ActionUnderTest theAgentLogsOn() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                loginAgent();
                return capturedInputAndOutputs;
            }
        };
    }

}
