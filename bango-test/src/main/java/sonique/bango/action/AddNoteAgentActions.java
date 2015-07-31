package sonique.bango.action;

import com.googlecode.yatspec.state.givenwhenthen.ActionUnderTest;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sonique.bango.app.SupermanApp;

import static util.SupermanDataFixtures.someNoteText;

public class AddNoteAgentActions {
    private final SupermanApp supermanApp;
    private final DomainServiceProblem serviceProblem;

    public AddNoteAgentActions(SupermanApp supermanApp, DomainServiceProblem serviceProblem) {
        this.supermanApp = supermanApp;
        this.serviceProblem = serviceProblem;
    }

    public ActionUnderTest clicksTheAddNoteButton() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.appContainer().serviceProblemTab(serviceProblem.serviceProblemId()).tabContent().eventHistoryPanel().eventHistoryToolbar().addNoteButton().click();
            return capturedInputAndOutputs;
        };
    }

    public ActionUnderTest enterNote(final String theNote) {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.dialogs().addNote().noteField().enter(theNote);
            supermanApp.dialogs().addNote().addNoteButton().click();

            return capturedInputAndOutputs;
        };
    }

    public ActionUnderTest clicksCancelNoteButton() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.dialogs().addNote().cancelButton().click();

            return capturedInputAndOutputs;
        };
    }

    public ActionUnderTest typeSomeTextIntoTheNoteField() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.dialogs().addNote().noteField().enter(someNoteText());

            return capturedInputAndOutputs;
        };
    }

    public ActionUnderTest clearsTheNoteText() {
        return (givens, capturedInputAndOutputs) -> {
            supermanApp.dialogs().addNote().noteField().clear();
            supermanApp.dialogs().addNote().noteField().enter("");
            return capturedInputAndOutputs;
        };
    }
}
