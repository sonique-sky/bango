package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.driver.panel.WorkItemPanel;
import sonique.bango.matcher.workitempanel.WorkItemAssignedAgentMatcher;
import sonique.bango.matcher.workitempanel.WorkItemStatusMatcher;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.service.ServiceProblemApiService;
import sonique.testsupport.matchers.AppendableAllOf;

import static org.hamcrest.core.IsEqual.equalTo;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class PullServiceProblemTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        serviceProblemScenario = ServiceProblemScenario.serviceProblemScenario(scenarioDriver(), agentForTest);

        loginAgent();
    }

    @Test
    public void canPullAServiceProblem() throws Exception {
        given(anAgentHasFoundAServiceProblem());

        when(theAgentPullsTheServiceProblem());

        then(theServiceProblemService(), isCalled());
        and(theWorkItem(), isAssignedToTheLoggedInAgent().and(hasStatusOfAssigned())); // Testing our stubs/mocktio framework???? are we stooooopid?
    }

    private Matcher<ServiceProblemApiService> isCalled() {
        return new TypeSafeMatcher<ServiceProblemApiService>() {
            @Override
            protected boolean matchesSafely(ServiceProblemApiService item) {
                Mockito.verify(item).pull(serviceProblemScenario.serviceProblemId());
                return true;
            }

            @Override
            public void describeTo(Description description) {
                throw new UnsupportedOperationException("Method  describeTo() not yet implemented");
            }
        };
    }

    private StateExtractor<ServiceProblemApiService> theServiceProblemService() {
        return new StateExtractor<ServiceProblemApiService>() {
            @Override
            public ServiceProblemApiService execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return scenarioDriver().serviceProblemApiServiceFor(agentForTest);
            }
        };
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

                supermanApp.appContainer().searchPanel().searchFor(serviceProblemScenario.serviceProblemId());

                return givens;
            }
        };
    }
}
