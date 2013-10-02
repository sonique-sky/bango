package sonique.bango;

import sonique.bango.driver.AppPool;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.driver.SupermanApp;

public class BangoTestEnvironment {

    private static final int PORT = 8081;

    private AppPool appPool;
    private BangoTestRunner bangoTestRunner;
    private boolean started;

    public BangoTestEnvironment() {
        bangoTestRunner = new BangoTestRunner(PORT);
    }

    public synchronized void start() {
        if(!started) {
            started = true;
            bangoTestRunner.start();
            appPool = new AppPool(PORT, 1);
        }
    }

    public synchronized void stop() {
        if(started) {
            started = false;
            appPool.shutdown();
            bangoTestRunner.stop();
        }
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
