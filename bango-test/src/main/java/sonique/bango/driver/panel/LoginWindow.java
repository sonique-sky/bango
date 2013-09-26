package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanTextField;

public class LoginWindow extends SupermanFormPanel {

    public LoginWindow(SupermanWebDriver driver) {
        super(driver, By.cssSelector("div.spm-login-dialog"));
    }

    public SupermanTextField username() {
        return textField("Username");
    }

    public SupermanTextField password() {
        return textField("Password");
    }

    public SupermanButton loginButton() {
        return button(By.cssSelector("a#accept-button"));
    }

    public SupermanButton resetButton() {
        return button(By.cssSelector("a#cancel-button"));
    }
}