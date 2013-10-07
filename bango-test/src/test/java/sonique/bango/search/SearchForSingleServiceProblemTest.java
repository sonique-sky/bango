package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.ServiceProblemScenario;
import sonique.bango.driver.panel.ServiceProblemTab;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.driver.panel.SearchPanel.SearchType.*;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class SearchForSingleServiceProblemTest extends BangoYatspecTest {

    private ServiceProblemScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        serviceProblemScenario = new ServiceProblemScenario(scenarioDriver(), agentForTest)
                .withDefaults();

        loginAgent();
    }

    @Test
    public void searchByDirectoryNumber() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingDirectoryNumber());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
    }

    @Test
    public void searchByServiceProblemId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingServiceProblemId());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
    }

    @Test
    public void searchByServiceId() throws Exception {
        given(aServiceProblem());

        when(theAgentSearchesForTheServiceProblemUsingAServiceId());

        then(aServiceProblemTab(), isDisplayedForTheExpectedServiceProblem());
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayedForTheExpectedServiceProblem() {
        String expectedTabTitle = String.format("Service Problem [%d]", serviceProblemScenario.serviceProblemId());

        return isDisplayed().with(aTitleOf(expectedTabTitle));
    }

    private GivensBuilder aServiceProblem() {
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingServiceProblemId() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(ServiceProblemId, serviceProblemScenario.serviceProblemId().toString());

                return capturedInputAndOutputs;
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingAServiceId() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(ServiceId, serviceProblemScenario.serviceId());

                return capturedInputAndOutputs;
            }
        };
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingDirectoryNumber() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(DirectoryNumber, serviceProblemScenario.directoryNumber());

                return capturedInputAndOutputs;
            }
        };
    }

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblemScenario.serviceProblemId());
            }
        };
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return thatHas(IsDisplayed.<ServiceProblemTab>isDisplayed());
    }
}
