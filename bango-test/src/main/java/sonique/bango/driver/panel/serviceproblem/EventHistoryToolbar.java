package sonique.bango.driver.panel.serviceproblem;

import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.form.SupermanButton;

public class EventHistoryToolbar extends SupermanToolbar {
    public EventHistoryToolbar(SupermanComponent eventHistoryPanel) {
        super(eventHistoryPanel);
    }

    public SupermanButton addNoteButton() {
        return toolbarButton("Add a note to this service problem");
    }

    public SupermanButton refreshHistoryButton() {
        return toolbarButton("Refresh history");
    }

    public SupermanButton filterButton() {
        return toolbarButton("Filter history by type");
    }

    public SupermanButton showNotesOnlyButton() {
        return toolbarButton("Show notes only");
    }
}
