package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.*;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanFormPanel;
import sonique.bango.driver.component.form.SupermanTextField;

public class LoginDialog extends SupermanContainer {

    private final LoginFormPanel formPanel;

    public LoginDialog(SupermanWebDriver driver) {
        super(driver, By.cssSelector("div.spm-login-dialog"));

        this.formPanel = new LoginFormPanel(this);
    }

    public SupermanTextField username() {
        return formPanel.username();
    }

    public SupermanTextField password() {
        return formPanel.password();
    }

    public SupermanButton loginButton() {
        return new SupermanButton(this, By.cssSelector("a#accept-button"));
    }

    public SupermanButton resetButton() {
        return new SupermanButton(this, By.cssSelector("a#cancel-button"));
    }

    private static class LoginFormPanel extends SupermanFormPanel {
        protected LoginFormPanel(SupermanElement element) {
            super(element, By.cssSelector("div.x-panel"));
        }

        public SupermanTextField username() {
            return textField("Username");
        }

        public SupermanTextField password() {
            return textField("Password");
        }
    }
}