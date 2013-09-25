package sonique.bango;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import sonique.bango.driver.ScenarioDriver;

import static com.google.common.collect.Lists.newArrayList;

public class BangoTestRunner {

    private final Server server;
    private final WebAppContext context;

    public static void main(String[] args) throws InterruptedException {
        new BangoTestRunner().start();

        Thread.sleep(10000);
    }

    public BangoTestRunner() {
        server = new Server(8080);
        context = new WebAppContext();

        context.setDescriptor("bango-web/src/main/webapp/WEB-INF/web.xml");
        context.setResourceBase("bango-js/src/main/javascript");
        context.setContextPath("/superman");
        context.setParentLoaderPriority(true);
        context.setOverrideDescriptors(newArrayList("bango-test/src/main/webapp/WEB-INF/web.xml"));

        server.setHandler(context);
    }

    public synchronized void start() {
        if (!server.isRunning()) {
            try {
                server.start();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public synchronized void stop() {
        try {
            server.stop();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ScenarioDriver scenarioDriver() {
        return get(ScenarioDriver.class, "scenarioDriver");
    }

    private <T> T get(Class<T> clazz, String beanName) {
        return ((ApplicationContext) context.getServletHandler().getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE)).getBean(beanName, clazz);
    }
}