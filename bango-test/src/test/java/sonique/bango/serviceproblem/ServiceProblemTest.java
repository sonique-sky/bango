package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.scenario.ScenarioGivensBuilder;

import static org.hamcrest.CoreMatchers.is;
import static sonique.bango.driver.panel.SearchPanel.SearchType.ServiceProblemId;

public class ServiceProblemTest extends BangoYatspecTest {

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

        then(theAssignedAgent(), isLoggedInAgent());
    }

    private Matcher<String> isLoggedInAgent() {
        return is(agentForTest.details().getDisplayName());
    }

    private StateExtractor<String> theAssignedAgent() {
        return new StateExtractor<String>() {
            @Override
            public String execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());

                return serviceProblemTab.tabContent().workItemPanel().assignedAgent();
            }
        };
    }

    private ActionUnderTest theAgentPullsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());

                serviceProblemTab.tabContent().serviceProblemToolbar().pull();


                Thread.sleep(10000);
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
