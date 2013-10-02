package sonique.bango.driver;

import sonique.bango.driver.panel.*;

public class SupermanApp {
    private final SupermanWebDriver driver;

    public SupermanApp(int port) {
        driver = new SupermanWebDriver(String.format("http://localhost:%d/superman", port));
    }

    public LoginDialog loginDialog() {
        return new LoginDialog(driver);
    }

    public MessageBox messageBox() {
        return new MessageBox(driver);
    }

    public AppContainer appContainer() {
        return new AppContainer(driver);
    }

    public void close() {
        driver.close();
    }
}
