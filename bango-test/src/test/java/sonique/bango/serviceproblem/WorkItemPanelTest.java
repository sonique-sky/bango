package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.WorkItemPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.core.IsEqual.equalTo;
import static sonique.bango.ServiceProblemScenario.assignedServiceProblemScenario;
import static sonique.bango.ServiceProblemScenario.serviceProblemWithReminderScenario;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.DateMatcher.isSameDateToMinute;
import static sonique.bango.matcher.workitempanel.NoWorkItemMatcher.anEmptyWorkItemPanel;
import static sonique.bango.matcher.workitempanel.WorkItemPanelMatcher.*;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class WorkItemPanelTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void findsAndDisplaysServiceProblemWithoutWorkItem() throws Exception {
        given(aServiceProblemWithoutWorkItem());

        when(anAgentViewsTheServiceProblem());

        then(theWorkItemPanel(), isDisplayed().with(anEmptyWorkItemPanel()));
    }

    @Test
    public void findsAndDisplaysServiceProblemWithAWorkItem() throws Exception {
        given(aServiceProblemWithWorkItem());

        when(anAgentViewsTheServiceProblem());

        then(theWorkItemPanel(), isPopulatedCorrectly());
    }

    @Test
    public void findsAndDisplaysAssignedServiceProblem() throws Exception {
        given(aServiceProblemThatIsAssignedToAnAgent());

        when(anAgentViewsTheServiceProblem());

        then(theWorkItemPanel(), isDisplayed().and(isAssigned()).with(theLoggedInAgent()));
    }

    @Test
    public void findsAndDisplaysServiceProblemWithReminder() throws Exception {
        given(aServiceProblemWithAReminder());

        when(anAgentViewsTheServiceProblem());

        then(theWorkItemPanel(), isDisplayed().and(hasTheCorrectReminderTime()));
    }

    private Matcher<? super WorkItemPanel> hasTheCorrectReminderTime() {
        DomainWorkItem workItem = workItemPanel();

        return aWorkItemReminder(isSameDateToMinute(workItem.reminderTime()));
    }

    private DomainWorkItem workItemPanel() {
        return serviceProblemScenario.serviceProblem().workItem();
    }

    private Matcher<? super WorkItemPanel> isAssigned() {
        return aWorkItemStatus(equalTo(workItemPanel().status().name()));
    }

    private Matcher<? super WorkItemPanel> theLoggedInAgent() {
        return aWorkItemAssignedAgent(equalTo(agentForTest.details().getDisplayName()));
    }

    private Matcher<WorkItemPanel> isPopulatedCorrectly() {
        DomainWorkItem workItem = workItemPanel();

        return thatHas(IsDisplayed.<WorkItemPanel>isDisplayed())
                .and(aWorkItemStatus(equalTo(workItem.status().name())))
                .and(aWorkItemCreatedDate(isSameDateToMinute(workItem.createdDate())))
                .and(aWorkItemType(equalTo(workItem.assignmentType().name())))
                .and(aWorkItemAction(equalTo(workItem.action().toString())))
                .and(aWorkItemPriority(equalTo(workItem.priority().name())));
    }

    private AppendableAllOf<WorkItemPanel> isDisplayed() {
        return thatHas(IsDisplayed.<WorkItemPanel>isDisplayed()).and(aTitleOf("Work Item"));
    }

    private StateExtractor<WorkItemPanel> theWorkItemPanel() {
        return new StateExtractor<WorkItemPanel>() {
            @Override
            public WorkItemPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId()).tabContent().workItemPanel();
            }
        };
    }

    private GivensBuilder aServiceProblemWithAReminder() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                serviceProblemScenario = serviceProblemWithReminderScenario(scenarioDriver(), agentForTest);
                serviceProblemScenario.bindScenario();

                return givens;
            }
        };
    }

    private GivensBuilder aServiceProblemThatIsAssignedToAnAgent() {
        serviceProblemScenario = assignedServiceProblemScenario(scenarioDriver(), agentForTest);
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private GivensBuilder aServiceProblemWithoutWorkItem() {
        serviceProblemScenario = ServiceProblemScenario.noWorkItemScenario(scenarioDriver(), agentForTest);
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private GivensBuilder aServiceProblemWithWorkItem() {
        serviceProblemScenario = ServiceProblemScenario.serviceProblemScenario(scenarioDriver(), agentForTest);
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private ActionUnderTest anAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {

                supermanApp.appContainer().searchPanel().searchFor(serviceProblemScenario.serviceProblemId());

                return capturedInputAndOutputs;
            }
        };
    }
}