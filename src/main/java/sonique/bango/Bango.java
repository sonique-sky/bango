package sonique.bango;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;

import static sonique.bango.CannedResponseHandler.cannedJsonResponseHandler;
import static sonique.bango.CannedResponseHandler.cannedTextResponseHandler;

public class Bango {

    private final Server server;

    public static void main(String[] args) throws Exception {
        new Bango().start();
    }

    private Bango() {
        server = new Server(8080);

        HandlerList handlerList = new HandlerList();
        handlerList.setHandlers(new Handler[]{
                jsonFilesHandler(),
                securityHandler(),
                extFilesHandler(),
        });
        server.setHandler(handlerList);
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

    private Handler jsonFilesHandler() {
        ContextHandler contextHandler = new ContextHandler("/superman/data");

        String json = "{\n" +
                "\t\"agent\": {\n" +
                "\t\t\"code\": \"CAPTAIN.SCARLET\",\n" +
                "\t\t\"details\": {\n" +
                "\t\t\t\"firstName\": \"Captain\",\n" +
                "\t\t\t\"lastName\": \"Scarlet\"\n" +
                "\t\t},\n" +
                "\t\t\"availability\": \"Unavailable\",\n" +
                "\t\t\"activeCount\" : 5,\n" +
                "\t\t\"heldCount\" : 22\n" +
                "\t}\n" +
                "}";

        contextHandler.setHandler(cannedJsonResponseHandler(json));
        return contextHandler;
    }

    private Handler securityHandler() {
        ContextHandler contextHandler = new ContextHandler("/j_spring_security_check");
        contextHandler.setHandler(cannedTextResponseHandler("OK"));
        return contextHandler;
    }

    public void start() throws Exception {
        server.start();
        server.join();
    }
}