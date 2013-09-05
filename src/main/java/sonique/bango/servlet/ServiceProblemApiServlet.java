package sonique.bango.servlet;

import com.google.common.collect.Iterables;
import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.ServiceProblemStore;

import javax.servlet.http.HttpServletRequest;

import java.util.Collection;

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
        } else if (pathInfo.equals("/eventhistory")) {
            Collection<ServiceProblem> serviceProblems = serviceProblemStore.serviceProblemById(parseInt(request.getParameter("serviceProblemId")));

            return writeJson(Iterables.getFirst(serviceProblems, null).eventHistoryItems());
        }

        throw new GTFOException(404, "Dunno how to do that!");
    }
}
