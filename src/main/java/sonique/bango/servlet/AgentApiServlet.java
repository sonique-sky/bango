package sonique.bango.servlet;

import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.domain.Agent;
import sonique.bango.store.AgentStore;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class AgentApiServlet extends PretentiousServlet {
    private final AgentStore agentStore;

    public AgentApiServlet(AgentStore agentStore, ObjectMapper objectMapper) {
        super(objectMapper);
        this.agentStore = agentStore;
    }

    protected String getResponse(HttpServletRequest request) {
        Agent agent = agentStore.agentFor(request.getSession().getId());

        if (request.getPathInfo().equals("/toggleAvailability")) {
            agent.toggleAvailability();
        }

        return writeJson(agent);
    }
}
