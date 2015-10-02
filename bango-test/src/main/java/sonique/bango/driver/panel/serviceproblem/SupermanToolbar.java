package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanPanel;

public class SupermanToolbar extends SupermanPanel {
    protected SupermanToolbar(SupermanElement parentPanel) {
        super(parentPanel, By.xpath(".//div[contains(concat(' ', @class, ' '), ' x-toolbar ')]"));
    }

    protected SupermanButton toolbarButton(String toolTip) {
        return button(By.xpath(String.format(".//a[@data-qtip='%s']", toolTip)));
    }
}
