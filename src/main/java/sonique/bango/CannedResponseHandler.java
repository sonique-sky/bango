package sonique.bango;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CannedResponseHandler extends AbstractHandler {
    private final String response;
    private final String contentType;

    public static CannedResponseHandler cannedJsonResponseHandler(String response) {
        return new CannedResponseHandler("application/json", response);
    }

    public static CannedResponseHandler cannedTextResponseHandler(String response) {
        return new CannedResponseHandler("text/plain", response);
    }


    CannedResponseHandler(String contentType, String response) {
        this.response = response;
        this.contentType = contentType;
    }

    public void handle(String s, Request request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException, ServletException {
        httpServletResponse.setStatus(200);
        httpServletResponse.setContentLength(response.length());
        httpServletResponse.setContentType(contentType);
        httpServletResponse.getWriter().print(response);
    }
}
