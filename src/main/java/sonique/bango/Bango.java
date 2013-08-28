package sonique.bango;

import org.codehaus.jackson.map.ObjectMapper;
import org.eclipse.jetty.server.Server;
import sonique.bango.servlet.AgentApiServlet;
import sonique.bango.servlet.BangoServletWrapper;
import sonique.bango.servlet.QueueApiServlet;
import sonique.bango.servlet.SecurityServlet;
import sonique.bango.store.AgentStore;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import static org.codehaus.jackson.annotate.JsonAutoDetect.Visibility.ANY;
import static org.codehaus.jackson.annotate.JsonMethod.FIELD;

public class Bango {

    private final Server server;

    public static void main(String[] args) throws Exception {
        new Bango().start();
    }

    private Bango() {
        QueueStore queueStore = new QueueStore();
        AgentStore agentStore = new AgentStore(queueStore);
        ServiceProblemStore serviceProblemStore = new ServiceProblemStore(queueStore);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(FIELD, ANY);

        server = new Server(8080);

        BangoServletWrapper servletWrapper = new BangoServletWrapper("/superman");
        servletWrapper.staticResources("src/main/javascript/");

        servletWrapper.add(new AgentApiServlet(objectMapper, agentStore));
        servletWrapper.add(new QueueApiServlet(objectMapper, serviceProblemStore, queueStore));
        servletWrapper.add(new SecurityServlet(objectMapper, agentStore));

        server.setHandler(servletWrapper.asHandler());
    }

    public void start() throws Exception {
        server.start();
        server.join();
    }
}