package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanFormPanel;

public class ViewToolbar extends SupermanFormPanel {

    protected ViewToolbar(SupermanElement parentElement) {
        super(parentElement, By.id(""));
    }

    public SupermanButton viewTroubleReport() {
        return button(By.cssSelector(""));
    }
}
