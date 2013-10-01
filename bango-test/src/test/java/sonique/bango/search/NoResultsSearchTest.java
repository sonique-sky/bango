package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.NoServiceProblemsScenario;
import sonique.bango.domain.Agent;
import sonique.bango.driver.panel.SupermanElement;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.driver.panel.SearchPanel.SearchType.ServiceProblemId;
import static sonique.bango.givens.AgentBuilder.anAgent;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;

public class NoResultsSearchTest extends BangoYatspecTest {

    private NoServiceProblemsScenario serviceProblemScenario;

    @Override
    protected Agent agentForTest() {
        return anAgent();
    }

    @Before
    public void setUp() throws Exception {
        serviceProblemScenario = new NoServiceProblemsScenario(scenarioDriver(), agentForTest);

        loginAgent();
    }

    @Test
    public void displaysNoResultsMessageWhenNoServiceProblemsFound() throws Exception {
        given(noServiceProblemsExist());

        when(theAgentSearchesForTheServiceProblem());

        then(theNoResultsMessageBox(), isDisplayed());
    }

    private GivensBuilder noServiceProblemsExist() {
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(ServiceProblemId, "anything");

                return capturedInputAndOutputs;
            }
        };
    }
    private StateExtractor<SupermanElement> theNoResultsMessageBox() {
        return new StateExtractor<SupermanElement>() {
            @Override
            public SupermanElement execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.messageBox();
            }
        };
    }

    private AppendableAllOf<SupermanElement> isDisplayed() {
        return thatHas(IsDisplayed.isDisplayed());
    }
}
