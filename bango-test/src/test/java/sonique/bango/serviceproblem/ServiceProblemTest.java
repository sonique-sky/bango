package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.WorkItemPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.matcher.NoWorkItemMatcher;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.core.IsEqual.equalTo;
import static sonique.bango.matcher.DateMatcher.isSameDateToMinute;
import static sonique.bango.matcher.workitempanel.WorkItemPanelMatcher.*;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class ServiceProblemTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void findsAndDisplaysServiceProblemWithoutWorkItem() throws Exception {
        given(aServiceProblemWithoutWorkItem());

        when(anAgentViewsTheServiceProblem());

        then(theServiceProblemTab(), isDisplayed().with(NoWorkItemMatcher.anEmptyWorkItemPanel()));
    }

    @Test
    public void findsAndDisplaysServiceProblemWithAWorkItem() throws Exception {
        given(aServiceProblemWithWorkItem());

        when(anAgentViewsTheServiceProblem());

        then(theWorkItemPanel(), isPopulatedCorrectly());
    }

    @Test
    public void findsAndDisplaysAssignedServiceProblem() throws Exception {

    }

    @Test
    public void findsAndDisplaysServiceProblemWithReminder() throws Exception {

    }

    private Matcher<WorkItemPanel> isPopulatedCorrectly() {
        DomainWorkItem workItem = serviceProblemScenario.serviceProblem().workItem();

        return thatHas(IsDisplayed.<WorkItemPanel>isDisplayed())
                .and(aWorkItemStatus(equalTo(workItem.status().name())))
                .and(aWorkItemCreatedDate(isSameDateToMinute(workItem.createdDate())))
                .and(aWorkItemType(equalTo(workItem.assignmentType().name())))
                .and(aWorkItemAction(equalTo(workItem.action().toString())))
                .and(aWorkItemPriority(equalTo(workItem.priority().name())))
                ;
    }

    private StateExtractor<WorkItemPanel> theWorkItemPanel() {
        return new StateExtractor<WorkItemPanel>() {
            @Override
            public WorkItemPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId()).tabContent().workItemPanel();
            }
        };
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return thatHas(IsDisplayed.<ServiceProblemTab>isDisplayed());
    }

    private StateExtractor<ServiceProblemTab> theServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());
            }
        };
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