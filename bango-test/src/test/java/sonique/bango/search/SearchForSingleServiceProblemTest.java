package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.BangoActionUnderTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.matcher.MockieMatcher;
import sonique.bango.service.SearchApiService;
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
        and(theSearchApiService(), searchedUsingTheDirectoryNumber());
    }

    @Test
    public void searchByServiceProblemId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingServiceProblemId());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
        and(theSearchApiService(), searchedUsingTheServiceProblemId());
    }

    @Test
    public void searchByServiceId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingAServiceId());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
        and(theSearchApiService(), searchedUsingTheServiceId());
    }

    private GivensBuilder aServiceProblem() {
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingServiceProblemId() {
        return new BangoActionUnderTest(new ViewServiceProblemAction(supermanApp, serviceProblem));
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingAServiceId() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceId());

                return capturedInputAndOutputs;
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingDirectoryNumber() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.getDirectoryNumber());

                return capturedInputAndOutputs;
            }
        };
    }

    private StateExtractor<SearchApiService> theSearchApiService() {
        return new StateExtractor<SearchApiService>() {
            @Override
            public SearchApiService execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return scenarioDriver().servicesFor(agentForTest).searchApiService();
            }
        };
    }

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId());
            }
        };
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return IsDisplayed.isDisplayed();
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayedForTheExpectedServiceProblem() {
        String expectedTabTitle = String.format("Service Problem [%d]", serviceProblem.serviceProblemId().asLong());

        return isDisplayed().with(aTitleOf(expectedTabTitle));
    }

    private Matcher<SearchApiService> searchedUsingTheDirectoryNumber() {
        return new MockieMatcher<SearchApiService>() {
            @Override
            protected void doTheMock(SearchApiService searchApiService) {
                searchApiService.serviceProblemByDirectoryNumber(serviceProblem.getDirectoryNumber());
            }
        };
    }

    private Matcher<SearchApiService> searchedUsingTheServiceProblemId() {
        return new MockieMatcher<SearchApiService>() {
            @Override
            protected void doTheMock(SearchApiService searchApiService) {
                searchApiService.serviceProblemById(serviceProblem.serviceProblemId());
            }
        };
    }

    private Matcher<SearchApiService> searchedUsingTheServiceId() {
        return new MockieMatcher<SearchApiService>() {
            @Override
            protected void doTheMock(SearchApiService searchApiService) {
                searchApiService.serviceProblemsByServiceId(serviceProblem.serviceId());
            }
        };
    }
}