package sonique.bango;

import org.eclipse.jetty.server.Server;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import sonique.bango.config.AgentApiConfig;
import sonique.bango.config.BangoApplicationContext;
import sonique.bango.servlet.BangoServletWrapper;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

public class Bango {

    private final Server server;

    public static void main(String[] args) throws Exception {
        Bango bango = new BangoBuilder().build();

        bango.start();
    }


    public Bango(QueueStore queueStore, AgentStore agentStore, ServiceProblemStore serviceProblemStore) {

        server = new Server(8080);

        BangoServletWrapper servletWrapper = new BangoServletWrapper("/superman");
        servletWrapper.staticResources("src/main/javascript/");

        AnnotationConfigWebApplicationContext parentWebApplicationContext = new AnnotationConfigWebApplicationContext();
        parentWebApplicationContext.register(BangoApplicationContext.class);
        parentWebApplicationContext.setServletContext(servletWrapper.servletContext());
        parentWebApplicationContext.refresh();

        createApiServlet(servletWrapper, AgentApiConfig.class, "/api/agent/*", parentWebApplicationContext);


//        servletWrapper.add(new AgentApiServlet(objectMapper, agentStore));
//        servletWrapper.add(new QueueApiServlet(objectMapper, serviceProblemStore, queueStore));
//        servletWrapper.add(new SearchApiServlet(objectMapper, serviceProblemStore));
//        servletWrapper.add(new SecurityServlet(objectMapper, agentStore));
//        servletWrapper.add(new ServiceProblemApiServlet(objectMapper, serviceProblemStore));

        server.setHandler(servletWrapper.asHandler());
    }

    private void createApiServlet(BangoServletWrapper servletWrapper, Class<?> configClass, String contextPath, AnnotationConfigWebApplicationContext parentWebApplicationContext) {
        AnnotationConfigWebApplicationContext webApplicationContext = new AnnotationConfigWebApplicationContext();
        webApplicationContext.register(configClass);
        webApplicationContext.setServletContext(servletWrapper.servletContext());
        webApplicationContext.setParent(parentWebApplicationContext);
        webApplicationContext.refresh();
        servletWrapper.add(new DispatcherServlet(webApplicationContext), contextPath);
    }

    public void start() throws Exception {
        server.start();
        server.join();
    }
}