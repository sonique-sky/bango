package sonique.bango.driver;

import sonique.bango.driver.panel.LoginWindow;
import sonique.bango.driver.panel.SupermanElement;

public class SupermanApp {
    private final SupermanWebDriver driver;

    public SupermanApp() {
        driver = new SupermanWebDriver("http://localhost:8080/superman");
    }

    public LoginWindow loginWindow() {
        return new LoginWindow(driver);
    }

    public SupermanElement headerPanel() {
        return null;
    }
}
