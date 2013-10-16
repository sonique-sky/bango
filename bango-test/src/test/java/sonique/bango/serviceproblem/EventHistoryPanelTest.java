package sonique.bango.serviceproblem;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.driver.panel.serviceproblem.EventHistoryPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.testsupport.matchers.AppendableAllOf;

import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.datafixtures.DateTimeDataFixtures.someDateInTheNextYear;
import static sonique.datafixtures.PrimitiveDataFixtures.someNumberBetween;
import static sonique.testsupport.matchers.AppendableAllOf.thatHas;
import static util.SupermanDataFixtures.someAgent;
import static util.SupermanDataFixtures.someEventDescription;

public class EventHistoryPanelTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;

    @Before
    public void setUp() throws Exception {
        loginAgent();
    }

    @Test
    public void displaysEventHistory() throws Exception {
        given(aServiceProblemWithSomeHistoryEvents());

        when(anAgentViewsTheServiceProblem());

        then(theEventHistoryPanel(), isDisplayed()
//                .with(theEventHistoryItems())
        );
    }

    private Matcher<EventHistoryPanel> theEventHistoryItems() {
        return null;
    }

    private AppendableAllOf<EventHistoryPanel> isDisplayed() {
        return thatHas(IsDisplayed.<EventHistoryPanel>isDisplayed()).with(aTitleOf("Event History"));
    }

    private StateExtractor<EventHistoryPanel> theEventHistoryPanel() {
        return new StateExtractor<EventHistoryPanel>() {
            @Override
            public EventHistoryPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel();
            }
        };
    }

    private ActionUnderTest anAgentViewsTheServiceProblem() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().searchPanel().searchFor(serviceProblem.serviceProblemId());

                return capturedInputAndOutputs;
            }
        };
    }

    private GivensBuilder aServiceProblemWithSomeHistoryEvents() {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();
        for (int i = 0; i < someNumberBetween(3, 7); i++) {
            serviceProblem.writeHistoryItem(someEventDescription(), someAgent(), someDateInTheNextYear().toDate());
        }

        return scenarioGivensBuilderFor(serviceProblem);
    }
}
