package sonique.bango.driver.panel.dialog;

import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanTextField;
import sonique.bango.driver.panel.SupermanDialog;

import java.util.ArrayList;
import java.util.List;

import static org.openqa.selenium.By.cssSelector;

public class FilterByTypeDialog extends SupermanDialog {

    public FilterByTypeDialog(SupermanWebDriver driver) {
        super(driver, cssSelector("div.filter-event-history-dialog"));
    }

    public List<SupermanTextField> eventDescriptions() {
        return new ArrayList<>();
    }

    public SupermanButton filterButton() {
        return buttonLabeled("Filter");
    }

    public SupermanButton cancelButton() {
        return buttonLabeled("Cancel");
    }
}
