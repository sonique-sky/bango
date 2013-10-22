package sonique.bango.serviceproblem.eventhistorytoolbar;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.StateExtractor;
import org.hamcrest.Matcher;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.BangoYatspecTest;
import sonique.bango.action.EventHistoryPanelActions;
import sonique.bango.action.ViewServiceProblemAction;
import sonique.bango.driver.panel.dialog.AddNoteDialog;
import sonique.bango.matcher.MockieMatcher;
import sonique.bango.scenario.ServiceProblemScenario;
import sonique.bango.service.ServiceProblemApiService;

import static sonique.bango.matcher.IsDisplayed.isDisplayed;

public class AddNoteTest extends BangoYatspecTest {

    private DomainServiceProblem serviceProblem;
    private String theNote;

    @Before
    public void setUp() throws Exception {
        loginAgent();
        theNote = "the Note";
    }

    @Ignore
    @Test
    public void addsHistoryItem() throws Exception {
        given(aServiceProblemIsOpenAndDisplayed());

        when(theAgentClicksTheAddNoteButton());

        then(theDialog(), isDisplayed());

        then(theServiceProblemService(), isCalledWith(theNote));

        //        and(theResults(), areDisplayed());
    }

    private StateExtractor<AddNoteDialog> theDialog() {
        return new StateExtractor<AddNoteDialog>() {
            @Override
            public AddNoteDialog execute(CapturedInputAndOutputs inputAndOutputs) throws Exception {
                return supermanApp.dialogs().addNote();
            }
        };
    }

    private Matcher<ServiceProblemApiService> isCalledWith(final String theNote) {
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

    private GivensBuilder aServiceProblemIsOpenAndDisplayed() {
        serviceProblem = ServiceProblemScenario.serviceProblemBuilder().build();
        new ViewServiceProblemAction(supermanApp, serviceProblem).goBoom();

        return scenarioGivensBuilderFor(serviceProblem);
    }

    private ActionUnderTest theAgentClicksTheAddNoteButton() {
        return new EventHistoryPanelActions(supermanApp, serviceProblem).addNote();
    }
}
