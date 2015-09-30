package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.BangoActionUnderTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.matcher.MockieMatcher;
import sonique.bango.service.ServiceProblemApiService;

import static org.mockito.Matchers.argThat;
import static sonique.bango.matcher.IsDisplayed.isDisplayed;
import static sonique.bango.matcher.SearchParametersMatcher.*;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemWithWorkItem;

public class SearchForSingleServiceProblemTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        serviceProblem = serviceProblemWithWorkItem().build();

        loginAgent();
    }

    @Test
    public void searchByDirectoryNumber() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingDirectoryNumber());

        then(aServiceProblemTab(), isDisplayed());
        and(theServiceProblemApiService(), searchedUsingTheDirectoryNumber());
    }

    @Test
    public void searchByServiceProblemId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingServiceProblemId());

        then(aServiceProblemTab(), isDisplayed());
        and(theServiceProblemApiService(), searchedUsingTheServiceProblemId());
    }

    @Test
    public void searchByServiceId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingAServiceId());

        then(aServiceProblemTab(), isDisplayed());
        and(theServiceProblemApiService(), searchedUsingTheServiceId());
    }

    private GivensBuilder aServiceProblem() {
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingServiceProblemId() {
        return new BangoActionUnderTest(new ViewServiceProblemAction(supermanApp, serviceProblem));
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingAServiceId() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceId());

            return capturedInputAndOutputs;
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingDirectoryNumber() {
        return (interestingGivens, capturedInputAndOutputs) -> {
            supermanApp.appContainer().searchPanel().searchFor(serviceProblem.getDirectoryNumber());

            return capturedInputAndOutputs;
        };
    }

    private StateExtractor<ServiceProblemApiService> theServiceProblemApiService() {
        return capturedInputAndOutputs -> scenarioDriver().servicesFor(agentForTest).serviceProblemApiService();
    }

    private StateExtractor<SupermanComponent> aServiceProblemTab() {
        return capturedInputAndOutputs -> supermanApp.appContainer().tab().serviceProblem(serviceProblem);
    }

    private Matcher<ServiceProblemApiService> searchedUsingTheDirectoryNumber() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.serviceProblems(argThat(directoryNumberSearchFor(serviceProblem)));
            }
        };
    }

    private Matcher<ServiceProblemApiService> searchedUsingTheServiceProblemId() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.serviceProblems(argThat(serviceProblemIdSearchFor(serviceProblem)));
            }
        };
    }

    private Matcher<ServiceProblemApiService> searchedUsingTheServiceId() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.serviceProblems(argThat(serviceIdSearchFor(serviceProblem)));
            }
        };
    }
}