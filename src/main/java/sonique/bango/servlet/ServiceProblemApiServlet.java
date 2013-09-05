package sonique.bango.servlet;

import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.store.ServiceProblemStore;

import javax.servlet.http.HttpServletRequest;

import static java.lang.Integer.parseInt;

public class ServiceProblemApiServlet extends PretentiousServlet {
    private final ServiceProblemStore serviceProblemStore;

    public ServiceProblemApiServlet(ObjectMapper objectMapper, ServiceProblemStore serviceProblemStore) {
        super("/api/serviceproblem/*", objectMapper);
        this.serviceProblemStore = serviceProblemStore;
    }

    @Override
    protected String getResponse(HttpServletRequest request) {
        String pathInfo = request.getPathInfo();
        if (pathInfo.equals("/get")) {
                return writeJson(serviceProblemStore.serviceProblemById(parseInt(request.getParameter("serviceProblemId"))));
        }

        throw new GTFOException(404, "Dunno how to do that!");
    }
}
