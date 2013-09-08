package sonique.bango.driver.component;

import sonique.bango.driver.SupermanWebDriver;

public class SupermanApp {
    private final SupermanWebDriver driver;

    public SupermanApp() {
        driver = new SupermanWebDriver("http://localhost:8080/superman");
    }

    public LoginWindow loginWindow() {
        return new LoginWindow(driver);
    }
}
