package sonique.bango.servlet;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import java.util.ArrayList;
import java.util.List;

import static org.eclipse.jetty.servlet.ServletContextHandler.SESSIONS;

public class BangoServletWrapper {
    private final ServletContextHandler contextHandler;
    private final String rootContext;
    private final List<Handler> handlerList = new ArrayList<Handler>();

    public BangoServletWrapper(String rootContext) {
        this.rootContext = rootContext;
        contextHandler = new ServletContextHandler(SESSIONS);
        contextHandler.setContextPath(rootContext);
    }

    public void add(PretentiousServlet servlet) {
        contextHandler.addServlet(new ServletHolder(servlet), servlet.contextPath());
    }

    public void staticResources(String resourceBase) {
        ResourceHandler extResourceHandler = new ResourceHandler();
        extResourceHandler.setResourceBase(resourceBase);
        extResourceHandler.setWelcomeFiles(new String[]{"superman.html", "index.html"});
        extResourceHandler.setDirectoriesListed(true);

        ContextHandler contextHandler = new ContextHandler(rootContext);
        contextHandler.setHandler(extResourceHandler);

        handlerList.add(contextHandler);
    }

    public Handler asHandler() {
        ContextHandlerCollection handlers = new ContextHandlerCollection();
        for (Handler handler : handlerList) {
            handlers.addHandler(handler);
        }
        handlers.addHandler(contextHandler);
        return handlers;
    }
}