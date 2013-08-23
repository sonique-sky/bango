package sonique.bango.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class PretentiousServlet extends HttpServlet {

    protected abstract String myMyMyMyResponse(HttpServletRequest request);

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            String content = myMyMyMyResponse(request);
            writeToResponse(response, content, 200);
        } catch (GTFOException e) {
            writeToResponse(response, e.message(), e.status());
        }
    }

    private void writeToResponse(HttpServletResponse response, String content, int status) throws IOException {
        response.setStatus(status);
        response.setContentLength(content.length());
        response.setContentType("application/json");
        response.getWriter().write(content);
    }
}