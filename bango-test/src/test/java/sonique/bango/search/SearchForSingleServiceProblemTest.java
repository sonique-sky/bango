package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.web.spmapp.shared.dto.SearchParametersDTO;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.BangoActionUnderTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.matcher.MockieMatcher;
import sonique.bango.service.ServiceProblemApiService;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.ATitleOf.aTitleOf;
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

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
        and(theServiceProblemApiService(), searchedUsingTheDirectoryNumber());
    }

    @Test
    public void searchByServiceProblemId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingServiceProblemId());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
        and(theServiceProblemApiService(), searchedUsingTheServiceProblemId());
    }

    @Test
    public void searchByServiceId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingAServiceId());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
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

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return capturedInputAndOutputs -> supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId());
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return IsDisplayed.isDisplayed();
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayedForTheExpectedServiceProblem() {
        String expectedTabTitle = String.format("Service Problem [%d]", serviceProblem.serviceProblemId().asLong());

        return isDisplayed().with(aTitleOf(expectedTabTitle));
    }

    private Matcher<ServiceProblemApiService> searchedUsingTheDirectoryNumber() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.serviceProblems(SearchParametersDTO.withSearchProperties("directoryNumber", serviceProblem.getDirectoryNumber().asString(), 25, 0));
            }
        };
    }

    private Matcher<ServiceProblemApiService> searchedUsingTheServiceProblemId() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.serviceProblems(SearchParametersDTO.withSearchProperties("serviceProblemId", serviceProblem.serviceProblemId().asString(), 25, 0));
            }
        };
    }

    private Matcher<ServiceProblemApiService> searchedUsingTheServiceId() {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.serviceProblems(SearchParametersDTO.withSearchProperties("serviceId", serviceProblem.serviceId().asString(), 25, 0));
            }
        };
    }
}