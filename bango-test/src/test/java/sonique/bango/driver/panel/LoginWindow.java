package sonique.bango.driver.panel;

import org.openqa.selenium.By;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.component.SupermanButton;
import sonique.bango.driver.component.SupermanTextField;

public class LoginWindow extends SupermanPanel {

    public LoginWindow(SupermanWebDriver driver) {
        super(driver.waitFor(By.cssSelector("div.x-window")));
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