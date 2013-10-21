package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanComponent;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanFormPanel;

public class EventHistoryToolbar extends SupermanFormPanel{
    public EventHistoryToolbar(SupermanComponent eventHistoryPanel) {
        super(eventHistoryPanel, By.cssSelector("[id^='eventHistoryActionToolbar']"));
    }

    public SupermanButton addNoteButton() {
        return button(By.cssSelector("[id^='add-note-']"));
    }

    public SupermanButton refreshHistoryButton() {
        return button(By.cssSelector("[id^='refresh-history-']"));
    }

    public SupermanButton filterButton() {
        return button(By.cssSelector("[id^='filter-history-']"));
    }

    public SupermanButton showNotesOnlyButton() {
        return button(By.cssSelector("[id^='show-notes-only-']"));
    }
}
