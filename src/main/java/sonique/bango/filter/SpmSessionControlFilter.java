package sonique.bango.filter;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class SpmSessionControlFilter extends GenericFilterBean {

    private final SessionRegistry sessionRegistry;
    private final LogoutHandler logoutHandler;

    public SpmSessionControlFilter(SessionRegistry sessionRegistry, LogoutHandler logoutHandler) {
        this.sessionRegistry = sessionRegistry;
        this.logoutHandler = logoutHandler;
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        HttpSession session = request.getSession(false);

        if (session != null) {
            SessionInformation info = sessionRegistry.getSessionInformation(session.getId());

            if (info != null) {
//                if (info.isExpired()) {
//                    // Expired - abort processing
//                    doLogout(request, response);
//
//                    try {
//                        String failureResponse = RPC.encodeResponseForFailure(null, new RuntimeException("Agent Session Expired"));
//                        response.getWriter().print(failureResponse);
//                        response.flushBuffer();
//                    } catch (SerializationException e) {
//                        throw new SupermanException(SpmError.SystemTechnicalFailure, "Unable to serialise security exception");
//                    }
//                } else {
//                    // Non-expired - update last request date/time
//                    sessionRegistry.refreshLastRequest(info.getSessionId());
//                }
            }
        }

        chain.doFilter(request, response);
    }

    private void doLogout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        logoutHandler.logout(request, response, auth);
    }
}