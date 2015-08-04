package sonique.bango.driver.panel.dialog;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanElement;
import sonique.bango.driver.component.form.SupermanButton;
import sonique.bango.driver.component.form.SupermanPanel;
import sonique.bango.driver.component.form.SupermanTextField;
import sonique.bango.driver.panel.SupermanDialog;

public class LoginDialog extends SupermanDialog {

    private final LoginPanel formPanel;

    public LoginDialog(SupermanWebDriver driver) {
        super(driver, By.cssSelector("div.spm-login-dialog"));

        this.formPanel = new LoginPanel(this);
    }

    public SupermanTextField username() {
        return formPanel.username();
    }

    public SupermanTextField password() {
        return formPanel.password();
    }

    public SupermanButton loginButton() {
        return buttonLabeled("Login");
    }

    public SupermanButton resetButton() {
        return buttonLabeled("Reset");
    }

    private static class LoginPanel extends SupermanPanel {
        protected LoginPanel(SupermanElement element) {
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