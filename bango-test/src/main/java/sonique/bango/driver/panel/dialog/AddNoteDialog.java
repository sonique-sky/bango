package sonique.bango.driver.panel.dialog;

import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.panel.SupermanDialog;

import static org.openqa.selenium.By.cssSelector;

public class AddNoteDialog extends SupermanDialog {

    public AddNoteDialog(SupermanWebDriver driver) {
        super(driver, cssSelector("div.x-message-box"));
    }
}
