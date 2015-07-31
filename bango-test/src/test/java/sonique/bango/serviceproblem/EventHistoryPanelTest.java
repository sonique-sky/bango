package sonique.bango.serviceproblem;

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
import sonique.bango.driver.panel.serviceproblem.EventHistoryPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.EventHistoryMatcher.eventHistoryMatches;
import static sonique.bango.matcher.panel.EventHistoryPanelMatchers.eventHistoryItems;
import static sonique.bango.util.BangoDataFixtures.someEventHistoryItemsFor;

public class EventHistoryPanelTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void displaysEventHistory() throws Exception {
        given(aServiceProblemWithSomeHistoryEvents());

        when(aServiceProblemIsDisplayed());

        then(theEventHistoryPanel(), isDisplayed()
                        .with(theEventHistoryItems())
        );
    }

    private GivensBuilder aServiceProblemWithSomeHistoryEvents() {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();
        serviceProblem.historyItems().addAll(someEventHistoryItemsFor(serviceProblem));
        return scenarioGivensBuilderFor(serviceProblem);
    }

    private ActionUnderTest aServiceProblemIsDisplayed() {
        return new BangoActionUnderTest(new ViewServiceProblemAction(supermanApp, serviceProblem));
    }

    private StateExtractor<EventHistoryPanel> theEventHistoryPanel() {
        return inputAndOutputs -> supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel();
    }

    private Matcher<EventHistoryPanel> theEventHistoryItems() {
        return eventHistoryItems(eventHistoryMatches(serviceProblem.historyItems()));
    }

    private AppendableAllOf<EventHistoryPanel> isDisplayed() {
        return IsDisplayed.<EventHistoryPanel>isDisplayed().with(aTitleOf("Event History"));
    }
}
