package sonique.bango.serviceproblem.eventhistorytoolbar;

import com.googlecode.yatspec.state.givenwhenthen.*;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Test;
import sky.sns.spm.domain.model.EventHistoryItem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.EventHistoryPanelActions;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.dialog.AddNoteDialog;
import sonique.bango.driver.panel.serviceproblem.EventHistoryPanel;
import sonique.bango.matcher.IsDisplayed;
import sonique.bango.matcher.MockieMatcher;
import sonique.bango.scenario.ScenarioGivensBuilder;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.bango.service.ServiceProblemApiService;
import sonique.testsupport.matchers.AppendableAllOf;

import java.util.List;

import static sonique.bango.matcher.ATitleOf.aTitleOf;
import static sonique.bango.matcher.EventHistoryMatcher.eventHistoryMatches;
import static sonique.bango.matcher.panel.EventHistoryPanelMatchers.eventHistoryItems;
import static sonique.bango.util.BangoDatafixtures.someEventHistoryItemsFor;
import static util.SupermanDataFixtures.someNoteText;

public class AddNoteTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;
    private String theNote;
    private List<EventHistoryItem> expectedEventHistoryItems;

    @Before
    public void setUp() throws Exception {
        loginAgent();
        theNote = someNoteText();
    }

    @Test
    public void addsHistoryItem() throws Exception {
        given(aServiceProblemIsOpen());
        and(theAgentIsViewingTheServiceProblem());

        when(theAgentClicksTheAddNoteButton());
        then(theDialog(), isDisplayed().with(aTitleOf("Add Note")));


        when(theAgentEntersANote());

        then(theEventHistoryPanel(), showsTheReturnedNotes());
        and(theServiceProblemService(), wasCalledWith(theNote));
    }

    private Matcher<EventHistoryPanel> showsTheReturnedNotes() {
        return eventHistoryItems(eventHistoryMatches(expectedEventHistoryItems));
    }

    private StateExtractor<EventHistoryPanel> theEventHistoryPanel() {
        return new StateExtractor<EventHistoryPanel>() {
            @Override
            public EventHistoryPanel execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel();
            }
        };
    }

    private ActionUnderTest theAgentEntersANote() {
       return  eventHistoryPanel().enterNote(theNote);
    }

    private EventHistoryPanelActions eventHistoryPanel() {
        return new EventHistoryPanelActions(supermanApp, serviceProblem);
    }

    private AppendableAllOf<AddNoteDialog> isDisplayed() {
        return IsDisplayed.isDisplayed();
    }

    private GivensBuilder theAgentIsViewingTheServiceProblem() {
        return new GivensBuilder() {
            @Override
            public InterestingGivens build(InterestingGivens givens) throws Exception {
                new ViewServiceProblemAction(supermanApp, serviceProblem).goBoom();
                return givens;
            }
        };
    }

    private StateExtractor<AddNoteDialog> theDialog() {
        return new StateExtractor<AddNoteDialog>() {
            @Override
            public AddNoteDialog execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.dialogs().addNote();
            }
        };
    }

    private Matcher<ServiceProblemApiService> wasCalledWith(final String theNote) {
        return new MockieMatcher<ServiceProblemApiService>() {
            @Override
            protected void doTheMock(ServiceProblemApiService serviceProblemApiService) {
                serviceProblemApiService.addNote(serviceProblem.serviceProblemId(), theNote);
            }
        };
    }

    private StateExtractor<ServiceProblemApiService> theServiceProblemService() {
        return new StateExtractor<ServiceProblemApiService>() {
            @Override
            public ServiceProblemApiService execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return scenarioDriver().servicesFor(agentForTest).serviceProblemApiService();
            }
        };
    }

    private GivensBuilder aServiceProblemIsOpen() {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();
        expectedEventHistoryItems = someEventHistoryItemsFor(serviceProblem);
        ServiceProblemScenario supermanScenario = new ServiceProblemScenario(scenarioDriver(), agentForTest, serviceProblem)
                .returnsWhenNoteAdded(expectedEventHistoryItems);
        return new ScenarioGivensBuilder(supermanScenario);
    }

    private ActionUnderTest theAgentClicksTheAddNoteButton() {
        return eventHistoryPanel().addNote();
    }
}
