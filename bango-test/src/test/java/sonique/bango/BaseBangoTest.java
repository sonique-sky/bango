package sonique.bango;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import sonique.bango.domain.Agent;
import sonique.bango.driver.SupermanApp;

import java.util.Deque;
import java.util.concurrent.LinkedBlockingDeque;

public class BaseBangoTest {

    private static final int PORT = 8081;
    private static BangoTestRunner bangoTestRunner;
    private static AppPool appPool;

    protected SupermanApp supermanApp;

    @BeforeClass
    public static void startBango() throws Exception {
        bangoTestRunner = new BangoTestRunner(PORT);

        bangoTestRunner.start();
        appPool = new AppPool(PORT, 3);
    }

    @AfterClass
    public static void stopBango() throws Exception {
        appPool.shutdown();

        bangoTestRunner.stop();
    }

    @Before
    public void borrow() throws Exception {
        supermanApp = appPool.borrow();
    }

    @After
    public void giveBack() throws Exception {
        appPool.giveBack(supermanApp);
    }

    protected void register(Agent agent) {
        bangoTestRunner.scenarioDriver().registerAgent(agent);
    }

    public static class AppPool {

        private final Deque<SupermanApp> appPool = new LinkedBlockingDeque<SupermanApp>();

        public AppPool(int port, int poolSize) {
            for (int i = 0; i < poolSize; i++) {
                 appPool.add(new SupermanApp(port));
            }
        }

        public SupermanApp borrow() {
            synchronized (appPool) {
                return appPool.poll();
            }
        }

        public void giveBack(SupermanApp supermanApp) {
            synchronized (appPool) {
                appPool.addLast(supermanApp);
            }
        }

        public void shutdown() {
            synchronized (appPool) {
                for (SupermanApp pooledApp : appPool) {
                    pooledApp.quit();
                }
            }
        }
    }
}
