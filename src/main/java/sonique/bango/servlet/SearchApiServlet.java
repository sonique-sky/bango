package sonique.bango.servlet;

import org.codehaus.jackson.map.ObjectMapper;
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
            if("serviceProblemId".equals(searchType)) {
                return writeJson(serviceProblemStore.serviceProblemById(parseInt(request.getParameter("searchParameter"))));
            }
        }

        throw new RuntimeException("Dunno how to do that search!");
    }
}
