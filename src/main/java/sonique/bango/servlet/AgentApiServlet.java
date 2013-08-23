package sonique.bango.servlet;

import sonique.bango.domain.Agent;
import sonique.bango.store.AgentStore;

import javax.servlet.http.HttpServletRequest;

public class AgentApiServlet extends PretentiousServlet {
    private final AgentStore agentStore;

    public AgentApiServlet(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    protected String myMyMyMyResponse(HttpServletRequest request) {
        Agent agent = agentStore.agentFor(request.getSession().getId());

        if (request.getPathInfo().equals("/toggleAvailability")) {
            agent.toggleAvailability();
        }
        return agent.dataAsJason();
    }
}
