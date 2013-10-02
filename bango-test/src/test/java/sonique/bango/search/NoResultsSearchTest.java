package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.NoServiceProblemsScenario;
import sonique.bango.domain.Agent;
import sonique.bango.driver.panel.MessageBox;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.driver.panel.SearchPanel.SearchType.ServiceProblemId;
import static sonique.bango.givens.AgentBuilder.anAgent;
import static sonique.bango.matcher.ATitleOf.*;
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

        then(aMessageBox(), isDisplayed().with(aTitleOf("No Results")));
    }

    private GivensBuilder noServiceProblemsExist() {
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchUsing(ServiceProblemId, "8787");

                return capturedInputAndOutputs;
            }
        };
    }

    private StateExtractor<MessageBox> aMessageBox() {
        return new StateExtractor<MessageBox>() {
            @Override
            public MessageBox execute(CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                return supermanApp.messageBox();
            }
        };
    }

    private AppendableAllOf<MessageBox> isDisplayed() {
        return thatHas(IsDisplayed.<MessageBox>isDisplayed());
    }
}
