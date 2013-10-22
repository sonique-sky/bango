package sonique.bango.driver.panel.dialog;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanTextField;
import sonique.bango.driver.panel.SupermanDialog;

import static org.openqa.selenium.By.cssSelector;

public class AddNoteDialog extends SupermanDialog {

    public AddNoteDialog(SupermanWebDriver driver) {
        super(driver, cssSelector("div.add-note-dialog"));
    }

    public SupermanTextField noteField() {
        return new SupermanTextField(this, By.cssSelector("textarea"));
    }

    public SupermanButton addNoteButton() {
        return buttonLabeled("Add Note");
    }

    public SupermanButton cancelButton() {
        return buttonLabeled("Cancel");
    }
}
