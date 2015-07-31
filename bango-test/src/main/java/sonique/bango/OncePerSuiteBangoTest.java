package sonique.bango;

public class OncePerSuiteBangoTest {

    protected static BangoTestEnvironment bangoTestEnvironment;

    static {
        doOncePerSuiteSetup();
    }

    private static void doOncePerSuiteSetup() {
        bangoTestEnvironment = new BangoTestEnvironment();
        bangoTestEnvironment.start();

        Runtime.getRuntime().addShutdownHook(new Thread(bangoTestEnvironment::stop));
    }
}