package sonique.bango.servlet;

import org.codehaus.jackson.map.ObjectMapper;
import sonique.bango.store.AgentStore;

import javax.servlet.http.HttpServletRequest;

public class SecurityServlet extends PretentiousServlet {
    private final AgentStore agentStore;

    public SecurityServlet(ObjectMapper objectMapper, AgentStore agentStore) {
        super("/", objectMapper);
        this.agentStore = agentStore;
    }

    @Override
    protected String getResponse(HttpServletRequest request) {
        String sessionId = request.getSession().getId();

        if ("/j_spring_security_check".equals(request.getServletPath())) {
            agentStore.login(sessionId, request.getParameter("username").toUpperCase());
            return "Logged In";
        } else if ("/j_spring_security_logout".equals(request.getServletPath())) {
            agentStore.logout(sessionId);
            return "Logged Out";
        } else {
            throw new GTFOException(404, "Not Found");
        }
    }
}
