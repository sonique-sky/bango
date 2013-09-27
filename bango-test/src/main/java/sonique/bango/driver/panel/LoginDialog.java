package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanTextField;

import java.awt.*;

public class LoginDialog extends SupermanContainer {

    private final SupermanFormPanel formPanel;

    public LoginDialog(SupermanWebDriver driver) {
        super(driver, By.cssSelector("div.spm-login-dialog"));

        this.formPanel = new SupermanFormPanel(this, By.cssSelector("div.x-panel"));
    }

    public SupermanTextField username() {
        return formPanel.textField("Username");
    }

    public SupermanTextField password() {
        return formPanel.textField("Password");
    }

    public SupermanButton loginButton() {
        return new SupermanButton(this, By.cssSelector("a#accept-button"));
    }

    public SupermanButton resetButton() {
        return new SupermanButton(this, By.cssSelector("a#cancel-button"));
    }
}