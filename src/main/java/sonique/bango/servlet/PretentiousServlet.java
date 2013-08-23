package sonique.bango.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class PretentiousServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
            String json = myMyMyMyResponse(request);
            response.setStatus(200);
            response.setContentLength(json.length());
            response.setContentType("application/json");
            response.getWriter().write(json);
        } catch (GTFOException e) {
            response.setStatus(e.status());
        }
    }

    protected abstract String myMyMyMyResponse(HttpServletRequest request);

}
