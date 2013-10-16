package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.service.ServiceProblemApiService;

import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemWithWorkItem;

public class PullServiceProblemTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void canPullAServiceProblem() throws Exception {
        given(anOpenServiceProblem());
        and(theAgentIsViewingTheServiceProblem());

        when(theAgentPullsTheServiceProblem());

        then(theServiceProblemService(), isCalled());
    }

    private Matcher<ServiceProblemApiService> isCalled() {
        return new TypeSafeMatcher<ServiceProblemApiService>() {
            @Override
            protected boolean matchesSafely(ServiceProblemApiService item) {
                Mockito.verify(item).pull(serviceProblem.serviceProblemId());
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
                ServiceProblemTab serviceProblemTab = supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId());

                serviceProblemTab.tabContent().serviceProblemToolbar().pull();

                return capturedInputAndOutputs;
            }
        };
    }


    private GivensBuilder anOpenServiceProblem() {
        serviceProblem = serviceProblemWithWorkItem().build();
        return new ScenarioGivensBuilder(serviceProblemScenarioFor(serviceProblem));
    }

    private GivensBuilder theAgentIsViewingTheServiceProblem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());
                return givens;
            }
        };
    }
}
