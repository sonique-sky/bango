package sonique.bango.driver;

import sonique.bango.driver.panel.*;

public class SupermanApp {
    private final SupermanWebDriver driver;

    public SupermanApp(int port) {
        driver = new SupermanWebDriver(String.format("http://localhost:%d/superman", port));
    }

    public LoginWindow loginWindow() {
        return new LoginWindow(driver);
    }

    public HeaderPanel headerPanel() {
        return new HeaderPanel(driver);
    }

    public MessageBox messageBox() {
        return new MessageBox(driver);
    }

    public SearchPanel searchPanel() {
        return new SearchPanel(driver);
    }

    public ServiceProblemTab serviceProblemTab(Integer serviceProblemId) {
        return new ServiceProblemTab(driver, serviceProblemId);
    }

    public void quit() {
        driver.quit();
    }
}
