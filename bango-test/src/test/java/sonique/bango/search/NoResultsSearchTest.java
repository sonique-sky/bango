package sonique.bango.search;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.dialog.MessageBox;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.NoServiceProblemsScenario;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.AMessageOf.aMessageOf;
import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static util.SupermanDataFixtures.someServiceProblemId;

public class NoResultsSearchTest extends BangoYatspecTest {

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @After
    public void tearDown() throws Exception {
        supermanApp.dialogs().message().clickOk();
    }

    @Test
    public void displaysNoResultsMessageWhenNoServiceProblemsFound() throws Exception {
        given(noServiceProblemsExist());

        when(theAgentSearchesForTheServiceProblem());

        then(aMessageBox(), isDisplayed().with(aTitleOf("No Results")).and(aMessageOf("The search did not return any records.")));
    }

    private GivensBuilder noServiceProblemsExist() {
        NoServiceProblemsScenario serviceProblemScenario = new NoServiceProblemsScenario(scenarioDriver(), agentForTest);
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
                return supermanApp.dialogs().message();
            }
        };
    }

    private AppendableAllOf<MessageBox> isDisplayed() {
        return IsDisplayed.isDisplayed();
    }
}