package sonique.bango;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.context.ApplicationContext;
import sonique.bango.app.ScenarioDriver;

import java.io.File;
import java.util.Enumeration;

import static com.google.common.collect.Lists.newArrayList;
import static org.springframework.web.context.WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE;

public class BangoTestRunner {

    private final Server server;
    private final WebAppContext context;

    public static void main(String[] args) {
        new BangoTestRunner(8081).start();

        try {
            Thread.sleep(500000000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public BangoTestRunner(int port) {
        server = new Server(port);

        context = new WebAppContext();

        context.setDescriptor("../bango-web/src/main/webapp/WEB-INF/web.xml");
        context.setResourceBase("../bango-js/src/main/javascript");
        context.setContextPath("/superman");
        context.setParentLoaderPriority(true);
        context.setOverrideDescriptors(newArrayList("../bango-test/src/main/webapp/WEB-INF/web.xml"));
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
        System.out.println("clazz = [" + clazz + "], beanName = [" + beanName + "]");
        System.out.println("context = " + context);
//        Enumeration<String> attributeNames = context.getServletHandler().getServletContext().getAttributeNames();
//        while (attributeNames.hasMoreElements()) {
//            System.out.println("an attribute " + attributeNames.nextElement());
//        }
        ApplicationContext attribute = (ApplicationContext) context.getServletHandler().getServletContext().getAttribute(ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        System.out.println("attribute = " + attribute);
        return attribute.getBean(beanName, clazz);
    }
}