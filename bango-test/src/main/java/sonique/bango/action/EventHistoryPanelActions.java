package sonique.bango.action;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.app.SupermanApp;

import static util.SupermanDataFixtures.someNoteText;

public class EventHistoryPanelActions {
    private final SupermanApp supermanApp;
    private final DomainServiceProblem serviceProblem;

    public EventHistoryPanelActions(SupermanApp supermanApp, DomainServiceProblem serviceProblem) {
        this.supermanApp = supermanApp;
        this.serviceProblem = serviceProblem;
    }

    public ActionUnderTest clicksTheAddNoteButton() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel().eventHistoryToolbar().addNoteButton().click();
                return capturedInputAndOutputs;
            }
        };
    }

    public ActionUnderTest enterNote(final String theNote) {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.dialogs().addNote().noteField().enter(theNote);
                supermanApp.dialogs().addNote().addNoteButton().click();

                return capturedInputAndOutputs;
            }
        };
    }

    public ActionUnderTest clicksCancelNoteButton() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.dialogs().addNote().cancelButton().click();

                return capturedInputAndOutputs;
            }
        };
    }

    public ActionUnderTest typeSomeTextIntoTheNoteField() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.dialogs().addNote().noteField().enter(someNoteText());

                return capturedInputAndOutputs;
            }
        };
    }

    public ActionUnderTest clearsTheNoteText() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.dialogs().addNote().noteField().clear();
                return capturedInputAndOutputs;
            }
        };
    }
}
