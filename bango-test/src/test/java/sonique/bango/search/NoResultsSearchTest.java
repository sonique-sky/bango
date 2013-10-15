package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.MessageBox;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.NoServiceProblemsScenario;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;
import static util.SupermanDataFixtures.someServiceProblemId;

public class NoResultsSearchTest extends BangoYatspecTest {

    private NoServiceProblemsScenario serviceProblemScenario;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @After
    public void tearDown() throws Exception {
        supermanApp.messageBox().clickOk();
    }

    @Test
    public void displaysNoResultsMessageWhenNoServiceProblemsFound() throws Exception {
        given(noServiceProblemsExist());

        when(theAgentSearchesForTheServiceProblem());

        then(aMessageBox(), isDisplayed().with(aTitleOf("No Results")));
    }

    private GivensBuilder noServiceProblemsExist() {
        serviceProblemScenario = new NoServiceProblemsScenario(scenarioDriver(), agentForTest);
        return new ScenarioGivensBuilder(serviceProblemScenario);
    }

    private ActionUnderTest theAgentSearchesForTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens interestingGivens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(someServiceProblemId());

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