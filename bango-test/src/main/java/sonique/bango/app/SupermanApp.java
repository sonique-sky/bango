package sonique.bango.app;

import org.openqa.selenium.remote.UnreachableBrowserException;
import sonique.bango.driver.SupermanWebDriver;
import sonique.bango.driver.panel.AppContainer;
import sonique.bango.driver.panel.dialog.SupermanDialogs;

public class SupermanApp {
    private final SupermanWebDriver driver;
    private final SupermanDialogs dialogs;

    public SupermanApp(int port) {
        driver = new SupermanWebDriver(String.format("http://localhost:%d/superman/superman.html", port));
        dialogs = new SupermanDialogs(driver);
    }

    public AppContainer appContainer() {
        return new AppContainer(driver);
    }

    public SupermanDialogs dialogs() {
        return dialogs;
    }

    public void quit() {
        try {
            driver.quit();
        } catch (UnreachableBrowserException e) {
            //ignore if driver already shutdown;
        }
    }
}