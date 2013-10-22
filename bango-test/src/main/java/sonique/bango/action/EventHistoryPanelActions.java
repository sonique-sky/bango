package sonique.bango.action;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import com.googlecode.yatspec.state.givenwhenthen.CapturedInputAndOutputs;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.app.SupermanApp;

public class EventHistoryPanelActions {
    private final SupermanApp supermanApp;
    private final DomainServiceProblem serviceProblem;

    public EventHistoryPanelActions(SupermanApp supermanApp, DomainServiceProblem serviceProblem) {
        this.supermanApp = supermanApp;
        this.serviceProblem = serviceProblem;
    }

    public ActionUnderTest addNote() {
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

    public ActionUnderTest clicksCancelNote() {
        return new ActionUnderTest() {
            @Override
            public CapturedInputAndOutputs execute(InterestingGivens givens, CapturedInputAndOutputs capturedInputAndOutputs) throws Exception {
                supermanApp.dialogs().addNote().cancelButton().click();

                return capturedInputAndOutputs;
            }
        };
    }

}
