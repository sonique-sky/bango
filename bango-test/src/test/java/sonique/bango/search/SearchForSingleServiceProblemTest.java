package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.serviceproblem.ServiceProblemTab;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.scenario.ServiceProblemScenario.serviceProblemWithWorkItem;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

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
        String expectedTabTitle = String.format("Service Problem [%d]", serviceProblem.serviceProblemId().asLong());

        return isDisplayed().with(aTitleOf(expectedTabTitle));
    }

    private GivensBuilder aServiceProblem() {
        return new ScenarioGivensBuilder(serviceProblemScenarioFor(serviceProblem));
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblemUsingServiceProblemId() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());

                return capturedInputAndOutputs;
            }
        };
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

    private StateExtractor<ServiceProblemTab> aServiceProblemTab() {
        return new StateExtractor<ServiceProblemTab>() {
            @Override
            public ServiceProblemTab execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId());
            }
        };
    }

    private AppendableAllOf<ServiceProblemTab> isDisplayed() {
        return thatHas(IsDisplayed.<ServiceProblemTab>isDisplayed());
    }
}