package sonique.bango.driver.component;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import sonique.bango.driver.SupermanWebDriver;

public class LoginWindow {
    private final WebElement loginWindowElement;
    private final SupermanFields fields;

    public LoginWindow(SupermanWebDriver driver) {
        this.loginWindowElement = driver.waitFor(By.cssSelector("div.x-window"));
        fields = new SupermanFields(loginWindowElement);
    }

    public SupermanField username() {
        return fields.textField("Username");
    }

    public SupermanField password() {
        return fields.textField("Password");
    }

    public SupermanButton loginButton() {
        return new SupermanButton(loginWindowElement.findElement(By.cssSelector("a#accept-button")));
    }

    public SupermanButton resetButton() {
        return new SupermanButton(loginWindowElement.findElement(By.cssSelector("a#cancel-button")));
    }
}