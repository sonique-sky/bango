package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.ServiceProblemEventHistoryItem;
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
import static sonique.datafixtures.DateTimeDataFixtures.someDateInTheNextYear;
import static sonique.datafixtures.PrimitiveDataFixtures.someNumberBetween;
import static util.SupermanDataFixtures.*;

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
        for (int i = 0; i < someNumberBetween(3, 7); i++) {
            serviceProblem.historyItems().add(ServiceProblemEventHistoryItem.createEvent(someEventDescription(), someDateInTheNextYear().toDate(), someAgent().getActorName(), someNoteText(), serviceProblem));
        }

        return scenarioGivensBuilderFor(serviceProblem);
    }

    private ActionUnderTest aServiceProblemIsDisplayed() {
        return new BangoActionUnderTest(new ViewServiceProblemAction(supermanApp, serviceProblem));
    }

    private StateExtractor<EventHistoryPanel> theEventHistoryPanel() {
        return new StateExtractor<EventHistoryPanel>() {
            @Override
            public EventHistoryPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel();
            }
        };
    }

    private Matcher<EventHistoryPanel> theEventHistoryItems() {
        return eventHistoryItems(eventHistoryMatches(serviceProblem.historyItems()));
    }

    private AppendableAllOf<EventHistoryPanel> isDisplayed() {
        return IsDisplayed.<EventHistoryPanel>isDisplayed().with(aTitleOf("Event History"));
    }
}
