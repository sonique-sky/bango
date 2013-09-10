package sonique.bango.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import sonique.bango.domain.Agent;
import sonique.bango.store.AgentStore;

import javax.servlet.http.HttpServletRequest;

public class AgentApiServlet extends PretentiousServlet {
    private final AgentStore agentStore;

    public AgentApiServlet(ObjectMapper objectMapper, AgentStore agentStore) {
        super("/api/agent/*", objectMapper);
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