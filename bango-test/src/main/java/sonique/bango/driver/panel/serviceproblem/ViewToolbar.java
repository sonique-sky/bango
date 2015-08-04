package sonique.bango.driver.panel.serviceproblem;

import org.openqa.selenium.By;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanPanel;

public class ViewToolbar extends SupermanPanel {

    protected ViewToolbar(SupermanElement parentElement) {
        super(parentElement, By.cssSelector("[id^='view-toolbar']"));
    }

    public SupermanButton viewServiceProblem() {
        return button(By.cssSelector("[id^='view-service-problem']"));
    }

    public SupermanButton viewTroubleReport() {
        return button(By.cssSelector("[id^='view-trouble-report']"));
    }
}
