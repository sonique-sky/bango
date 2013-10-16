package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.serviceproblem.WorkItemPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.core.IsEqual.equalTo;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.DateMatcher.isSameDateToMinute;
import static sonique.bango.matcher.panel.NoWorkItemMatcher.anEmptyWorkItemPanel;
import static sonique.bango.matcher.panel.WorkItemPanelMatchers.*;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemBuilder;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemWithWorkItem;
import static sonique.datafixtures.DateTimeDataFixtures.someDateInTheNextYear;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class WorkItemPanelTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

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
        return serviceProblem.workItem();
    }

    private Matcher<? super WorkItemPanel> isAssigned() {
        return aWorkItemStatus(equalTo(workItemPanel().status()));
    }

    private Matcher<? super WorkItemPanel> theLoggedInAgent() {
        return aWorkItemAssignedAgent(equalTo(agentForTest.details().getDisplayName()));
    }

    private Matcher<WorkItemPanel> isPopulatedCorrectly() {
        DomainWorkItem workItem = workItemPanel();

        return thatHas(IsDisplayed.<WorkItemPanel>isDisplayed())
                .and(aWorkItemStatus(equalTo(workItem.status())))
                .and(aWorkItemCreatedDate(isSameDateToMinute(workItem.createdDate())))
                .and(aWorkItemType(equalTo(workItem.assignmentType())))
                .and(aWorkItemAction(equalTo(workItem.action())))
                .and(aWorkItemPriority(equalTo(workItem.priority())));
    }

    private AppendableAllOf<WorkItemPanel> isDisplayed() {
        return thatHas(IsDisplayed.<WorkItemPanel>isDisplayed()).and(aTitleOf("Work Item"));
    }

    private StateExtractor<WorkItemPanel> theWorkItemPanel() {
        return new StateExtractor<WorkItemPanel>() {
            @Override
            public WorkItemPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().workItemPanel();
            }
        };
    }

    private GivensBuilder aServiceProblemWithAReminder() {
        serviceProblem = serviceProblemBuilder()
               .withWorkItem(DomainWorkItemBuilder.withAllDefaults().withWorkReminder(someDateInTheNextYear().toDate()).build())
               .build();
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private GivensBuilder aServiceProblemThatIsAssignedToAnAgent() {
        serviceProblem = serviceProblemWithWorkItem().withAssignedAgent(agentForTest).build();
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private GivensBuilder aServiceProblemWithoutWorkItem() {
        serviceProblem = serviceProblemBuilder().withNoWorkItem().build();
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private GivensBuilder aServiceProblemWithWorkItem() {
        serviceProblem = serviceProblemWithWorkItem().build();
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private ActionUnderTest anAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());

                return capturedInputAndOutputs;
            }
        };
    }
}