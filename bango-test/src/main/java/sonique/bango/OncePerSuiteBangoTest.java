package sonique.bango;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import sonique.bango.driver.ScenarioDriver;

public class OncePerSuiteBangoTest {

    protected static final BangoTestEnvironment bangoTestEnvironment = new BangoTestEnvironment();

    @BeforeClass
    public static synchronized void startTheBango() {
        if (!bangoTestEnvironment.isRunning()) {
            bangoTestEnvironment.start();
        }
    }

    @AfterClass
    public static void killBango() {
        if (bangoTestEnvironment.appPool().getBorrowed() == 0) {
            bangoTestEnvironment.stop();
        }
    }
}