package sonique.bango.servlet;

import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.store.ServiceProblemStore;
import sun.management.resources.agent;

import javax.servlet.http.HttpServletRequest;

public class QueueApiServlet extends PretentiousServlet {
    private final ServiceProblemStore serviceProblemStore;

    public QueueApiServlet(ServiceProblemStore serviceProblemStore, ObjectMapper objectMapper) {
        super(objectMapper);
        this.serviceProblemStore = serviceProblemStore;
    }

    protected String getResponse(HttpServletRequest request) {
        if (request.getPathInfo().equals("/list")) {

            return writeJson(serviceProblemStore.serviceProblemsForQueueId(request.getParameter("queueId")));
        }

        throw new RuntimeException("Unknown Api!");
    }
}
