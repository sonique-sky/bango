package sonique.bango;

import sonique.bango.driver.AppPool;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.driver.SupermanApp;

public class BangoTestEnvironment {

    private static final int PORT = 8081;

    private AppPool appPool;

    private BangoTestRunner bangoTestRunner;

    public BangoTestEnvironment() {
        bangoTestRunner = new BangoTestRunner(PORT);
    }

    public void start() {
        bangoTestRunner.start();
        appPool = new AppPool(PORT, 1);
    }

    public void stop() {
        appPool.shutdown();

        bangoTestRunner.stop();
    }

    public SupermanApp borrowSupermanApp() {
        return appPool.borrow();
    }

    public void releaseSupermanApp(SupermanApp supermanApp) {
        appPool.release(supermanApp);
    }

    public ScenarioDriver scenarioDriver() {
        return bangoTestRunner.scenarioDriver();
    }
}
