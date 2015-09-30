package sonique.bango.serviceproblem.eventhistorytoolbar;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.serviceproblem.EventHistoryPanel;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.scenario.ServiceProblemScenario;

import java.util.List;

import static sonique.bango.matcher.EventHistoryMatcher.eventHistoryMatches;
import static sonique.bango.matcher.panel.EventHistoryPanelMatchers.eventHistoryItems;
import static sonique.bango.util.BangoDataFixtures.someEventHistoryItemsFor;

public class HistoryRefreshTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;
    private List<EventHistoryItem> expectedEventHistoryItems;

    @Before
    public void setup() {
        loginAgent();
    }

    @Test
    public void canRefreshEventHistory() throws Exception {
        given(aServiceProblemIsOpen());

        and(theAgentIsViewingTheServiceProblem());

        when(theAgentClicksRefreshEventHistory());

        then(theEventHistoryPanel(), showsTheReturnedNotes());
    }

    private ActionUnderTest theAgentClicksRefreshEventHistory() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().tab().serviceProblem(serviceProblem).tabContent().eventHistoryPanel().eventHistoryToolbar().refreshHistoryButton().click();

                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder theAgentIsViewingTheServiceProblem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                new ViewServiceProblemAction(supermanApp, serviceProblem).goBango();
                return givens;
            }
        };
    }

    private GivensBuilder aServiceProblemIsOpen() {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();
        expectedEventHistoryItems = someEventHistoryItemsFor(serviceProblem);
        ServiceProblemScenario supermanScenario = new ServiceProblemScenario(scenarioDriver(), agentForTest, serviceProblem)
                .returnsEventHistoryRefreshed(expectedEventHistoryItems);
        return new ScenarioGivensBuilder(supermanScenario);
    }

    private Matcher<EventHistoryPanel> showsTheReturnedNotes() {
        return eventHistoryItems(eventHistoryMatches(expectedEventHistoryItems));
    }

    private StateExtractor<EventHistoryPanel> theEventHistoryPanel() {
        return inputAndOutputs -> supermanApp.appContainer().tab().serviceProblem(serviceProblem).tabContent().eventHistoryPanel();
    }
}
