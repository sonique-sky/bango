package sonique.bango;

import org.codehaus.jackson.map.ObjectMapper;
import org.eclipse.jetty.server.Server;
import sonique.bango.servlet.*;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import static org.codehaus.jackson.annotate.JsonAutoDetect.Visibility.ANY;
import static org.codehaus.jackson.annotate.JsonMethod.FIELD;

public class Bango {

    private final Server server;

    public static void main(String[] args) throws Exception {
        final QueueStore queueStore = new QueueStore(30);
        AgentStore agentStore = new AgentStore(queueStore);
        ServiceProblemStore serviceProblemStore = new ServiceProblemStore(queueStore);

        new Bango(queueStore, agentStore, serviceProblemStore).start();
    }

    private Bango(QueueStore queueStore, AgentStore agentStore, ServiceProblemStore serviceProblemStore) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(FIELD, ANY);

        server = new Server(8080);

        BangoServletWrapper servletWrapper = new BangoServletWrapper("/superman");
        servletWrapper.staticResources("src/main/javascript/");

        servletWrapper.add(new AgentApiServlet(objectMapper, agentStore));
        servletWrapper.add(new QueueApiServlet(objectMapper, serviceProblemStore, queueStore));
        servletWrapper.add(new SearchApiServlet(objectMapper, serviceProblemStore));
        servletWrapper.add(new SecurityServlet(objectMapper, agentStore));
        servletWrapper.add(new ServiceProblemApiServlet(objectMapper, serviceProblemStore));

        server.setHandler(servletWrapper.asHandler());
    }

    public void start() throws Exception {
        server.start();
        server.join();
    }
}