package sonique.bango;

import sonique.bango.driver.ScenarioDriver;

public class OncePerSuiteBangoTest {

    protected static BangoTestEnvironment bangoTestEnvironment;
    protected static ScenarioDriver scenarioDriver;

    static {
        doOncePerSuiteSetup();
    }

    private static void doOncePerSuiteSetup() {
        bangoTestEnvironment = new BangoTestEnvironment();
        bangoTestEnvironment.start();
        scenarioDriver = bangoTestEnvironment.scenarioDriver();

        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            @Override
            public void run() {
                bangoTestEnvironment.stop();
            }
        }));
    }
}
