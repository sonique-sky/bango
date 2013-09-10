package sonique.bango.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import sonique.bango.store.ServiceProblemStore;

import javax.servlet.http.HttpServletRequest;

import static java.lang.Integer.parseInt;

public class SearchApiServlet extends PretentiousServlet {
    private final ServiceProblemStore serviceProblemStore;

    public SearchApiServlet(ObjectMapper objectMapper, ServiceProblemStore serviceProblemStore) {
        super("/api/search/*", objectMapper);
        this.serviceProblemStore = serviceProblemStore;
    }

    @Override
    protected String getResponse(HttpServletRequest request) {
        String pathInfo = request.getPathInfo();
        if (pathInfo.equals("/simple")) {
            String searchType = request.getParameter("searchType");
            if ("serviceProblemId".equals(searchType)) {
                return writeJson(serviceProblemStore.serviceProblemById(parseInt(request.getParameter("searchParameter"))));
            } else if ("directoryNumber".equals(searchType)) {
                return writeJson(serviceProblemStore.serviceProblemByDirectoryNumber(request.getParameter("searchParameter")));
            }
        }

        throw new GTFOException(404, "Dunno how to do that search!");
    }
}
