package sonique.bango;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.eclipse.jetty.servlet.ServletContextHandler.SESSIONS;

public class Bango {

    private final Server server;
    private final Map<String, Agent> agentMap = new HashMap<String, Agent>();

    public static void main(String[] args) throws Exception {
        new Bango().start();
    }

    private Bango() {
        server = new Server(8080);
        ServletContextHandler contextHandler = new ServletContextHandler(SESSIONS);
        contextHandler.setContextPath("/superman");

        agentApiHandler(contextHandler);
        loginHandler(contextHandler);
        logoutHandler(contextHandler);
        Handler extHandler = extFilesHandler();

        ContextHandlerCollection handler = new ContextHandlerCollection();
        handler.setHandlers(new Handler[] {extHandler, contextHandler});
        server.setHandler(handler);
    }

    private Handler extFilesHandler() {
        ResourceHandler extResourceHandler = new ResourceHandler();
        extResourceHandler.setResourceBase("target/build");
        extResourceHandler.setWelcomeFiles(new String[]{"app.html", "index.html", "superman.html"});
        extResourceHandler.setDirectoriesListed(true);

        ContextHandler contextHandler = new ContextHandler("/superman");
        contextHandler.setHandler(extResourceHandler);
        return contextHandler;
    }

    private void agentApiHandler(ServletContextHandler contextHandler) {

        ServletHolder servletHolder = new ServletHolder(new HttpServlet() {
            @Override
            protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                String sessionId = request.getSession().getId();
                if (agentMap.containsKey(sessionId)) {
                    Agent agent = agentMap.get(sessionId);
                    if(request.getPathInfo().equals("/toggleAvailability")) {
                        agent.toggleAvailability();
                    }
                    String json = agent.dataAsJason();
                    response.setStatus(200);
                    response.setContentLength(json.length());
                    response.setContentType("application/json");
                    response.getWriter().write(json);
                } else {
                    response.setStatus(403);
                }
            }
        });
        contextHandler.addServlet(servletHolder, "/api/agent/*");
    }

    private void loginHandler(ServletContextHandler contextHandler) {
        ServletHolder servletHolder = new ServletHolder(new HttpServlet() {
            @Override
            protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                String sessionId = request.getSession().getId();
                agentMap.put(sessionId, new Agent());
            }
        });
        contextHandler.addServlet(servletHolder, "/j_spring_security_check");
    }

    private void logoutHandler(ServletContextHandler contextHandler) {
        ServletHolder servletHolder = new ServletHolder(new HttpServlet() {
            @Override
            protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
                String sessionId = request.getSession().getId();
                agentMap.remove(sessionId);
            }
        });
        contextHandler.addServlet(servletHolder, "/j_spring_security_logout");
    }

    public void start() throws Exception {
        server.start();
        server.join();
    }

    public static class Agent {
        private static final String AVAILABLE = "Available";
        private String availability = AVAILABLE;

        public void toggleAvailability() {
            if(AVAILABLE.equals(availability)) {
                availability = "Unavailable";
            }
            else availability = AVAILABLE;
        }

        public String dataAsJason() {
            return "{\n" +
                    "\t\"agent\": {\n" +
                    "\t\t\"code\": \"CAPTAIN.SCARLET\",\n" +
                    "\t\t\"details\": {\n" +
                    "\t\t\t\"firstName\": \"Captain\",\n" +
                    "\t\t\t\"lastName\": \"Scarlet\"\n" +
                    "\t\t},\n" +
                    "\t\t\"availability\": \"" + availability + "\",\n" +
                    "\t\t\"activeCount\" : 5,\n" +
                    "\t\t\"heldCount\" : 22\n" +
                    "\t}\n" +
                    "}";
        }
    }
}