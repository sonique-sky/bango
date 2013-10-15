package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import sonique.bango.BangoYatspecTest;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.service.ServiceProblemApiService;

public class PullServiceProblemTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void canPullAServiceProblem() throws Exception {
        given(anAgentHasFoundAServiceProblem());

        when(theAgentPullsTheServiceProblem());

        then(theServiceProblemService(), isCalled());
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
                return scenarioDriver().servicesFor(agentForTest).serviceProblemApiService();
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
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                serviceProblemScenario = ServiceProblemScenario.serviceProblemScenario(scenarioDriver(), agentForTest);
                serviceProblemScenario.bindScenario();

                supermanApp.appContainer().searchPanel().searchFor(serviceProblemScenario.serviceProblemId());

                return givens;
            }
        };
    }
}
