package sonique.bango;

import org.junit.BeforeClass;
import sonique.bango.driver.SupermanApp;

public class BaseBangoTest {
    protected static SupermanApp supermanApp;

    @BeforeClass
    public static void createSupermanApp() throws Exception {
        supermanApp = new SupermanApp();
    }
}
