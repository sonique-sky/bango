package sonique.bango;

import org.junit.AfterClass;
import org.junit.BeforeClass;

public class BaseBangoTest {

    private static BangoTestRunner bangoTestRunner;

    @BeforeClass
    public static void startBango() throws Exception {
        bangoTestRunner = new BangoTestRunner();

        bangoTestRunner.start();
    }

    @AfterClass
    public static void stopBango() throws Exception {
        bangoTestRunner.stop();
    }
}
