package sonique.bango.servlet;

import com.google.common.collect.Iterables;
import com.google.common.collect.Ordering;
import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.domain.EventHistoryItem;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.store.ServiceProblemStore;

import javax.servlet.http.HttpServletRequest;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

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
            ServiceProblem serviceProblem = serviceProblemWithId(parseInt(request.getParameter("serviceProblemId")));

            return writeJson(serviceProblem.eventHistoryItems());
        } else if (pathInfo.equals("/add-note")) {
            ServiceProblem serviceProblem = serviceProblemWithId(parseInt(request.getParameter("serviceProblemId")));
            List<EventHistoryItem> historyItems = serviceProblem.eventHistoryItems();
            historyItems.add(new EventHistoryItem("Note", request.getParameter("noteText"), new Date(), "Me"));

            return writeJson(Ordering.from(new Comparator<EventHistoryItem>() {
                public int compare(EventHistoryItem o, EventHistoryItem o2) {
                    return o2.createdDate().compareTo(o.createdDate());
                }
            }).sortedCopy(historyItems));
        }

        throw new GTFOException(404, "Dunno how to do that!");
    }

    private ServiceProblem serviceProblemWithId(int serviceProblemId) {
        return Iterables.getFirst(serviceProblemStore.serviceProblemById(serviceProblemId), null);
    }
}
