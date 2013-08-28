package sonique.bango.servlet;

import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;
import sun.management.resources.agent;

import javax.servlet.http.HttpServletRequest;

public class QueueApiServlet extends PretentiousServlet {
    private final ServiceProblemStore serviceProblemStore;
    private final QueueStore queueStore;

    public QueueApiServlet(ObjectMapper objectMapper, ServiceProblemStore serviceProblemStore, QueueStore queueStore) {
        super(objectMapper);
        this.serviceProblemStore = serviceProblemStore;
        this.queueStore = queueStore;
    }

    protected String getResponse(HttpServletRequest request) {
        String pathInfo = request.getPathInfo();
        if (pathInfo.equals("/list")) {
            return writeJson(serviceProblemStore.serviceProblemsForQueueId(Integer.parseInt(request.getParameter("queueId"))));
        } else if (pathInfo.equals("/all")) {
            return writeJson(queueStore.allQueues());
        }

        throw new RuntimeException("Unknown Api!");
    }
}
