package sonique.bango;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import sonique.bango.domain.Agent;
import sonique.bango.driver.SupermanApp;

public class BaseBangoTest {

    private static final int PORT = 8081;
    private static BangoTestRunner bangoTestRunner;
    protected static SupermanApp supermanApp;

    @BeforeClass
    public static void startBango() throws Exception {
        bangoTestRunner = new BangoTestRunner(PORT);

        bangoTestRunner.start();

        supermanApp = new SupermanApp(PORT);
    }

    @AfterClass
    public static void stopBango() throws Exception {
        bangoTestRunner.stop();
    }

    protected void register(Agent agent) {
        bangoTestRunner.scenarioDriver().registerAgent(agent);
    }
}
