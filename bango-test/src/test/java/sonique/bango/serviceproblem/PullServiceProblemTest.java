package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.WorkItemPanel;
import sonique.bango.matcher.workitempanel.WorkItemAssignedAgentMatcher;
import sonique.bango.matcher.workitempanel.WorkItemStatusMatcher;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.core.IsEqual.equalTo;
import static sonique.bango.driver.panel.SearchPanel.SearchType.ServiceProblemId;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class PullServiceProblemTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        serviceProblemScenario = new ServiceProblemScenario(scenarioDriver(), agentForTest)
                .withDefaults();

        loginAgent();
    }

    @Test
    public void canPullAServiceProblem() throws Exception {
        given(anAgentHasFoundAServiceProblem());

        when(theAgentPullsTheServiceProblem());

        then(theWorkItem(), isAssignedToTheLoggedInAgent().and(hasStatusOfAssigned()));
    }

    private Matcher<WorkItemPanel> hasStatusOfAssigned() {
        return new WorkItemStatusMatcher(equalTo("Assigned"));
    }

    private AppendableAllOf<WorkItemPanel> isAssignedToTheLoggedInAgent() {
        return thatHas(new WorkItemAssignedAgentMatcher(equalTo(agentForTest.details().getDisplayName())));
    }

    private StateExtractor<WorkItemPanel> theWorkItem() {
        return new StateExtractor<WorkItemPanel>() {
            @Override
            public WorkItemPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());

                return serviceProblemTab.tabContent().workItemPanel();
            }
        };
    }

    private ActionUnderTest theAgentPullsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());

                serviceProblemTab.tabContent().serviceProblemToolbar().pull();

                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder anAgentHasFoundAServiceProblem() {
        return new ScenarioGivensBuilder(serviceProblemScenario) {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                super.build(givens);

                supermanApp.appContainer().searchPanel().searchUsing(ServiceProblemId, serviceProblemScenario.serviceProblemId().toString());

                return givens;
            }
        };
    }
}
