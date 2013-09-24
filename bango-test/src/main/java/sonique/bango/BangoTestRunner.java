package sonique.bango;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

import static com.google.common.collect.Lists.newArrayList;

public class BangoTestRunner {

    private final Server server;

    public static void main(String[] args) throws InterruptedException {
        new BangoTestRunner().start();


        Thread.sleep(10000);
    }

    public BangoTestRunner() {
        server = new Server(8080);
        WebAppContext context = new WebAppContext();
        context.setDescriptor("bango-web/src/main/webapp/WEB-INF/web.xml");
        context.setResourceBase("bango-js/src/main/javascript");
        context.setContextPath("/superman");
        context.setParentLoaderPriority(true);


        context.setOverrideDescriptors(newArrayList("bango-test/src/main/resources/web.xml"));


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
}