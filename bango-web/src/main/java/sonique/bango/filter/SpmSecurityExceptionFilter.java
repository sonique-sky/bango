package sonique.bango.filter;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.util.ThrowableAnalyzer;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SpmSecurityExceptionFilter extends GenericFilterBean {
    private final ThrowableAnalyzer throwableAnalyzer = new DefaultThrowableAnalyzer();

    @SuppressWarnings("ThrowableResultOfMethodCallIgnored")
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (Exception ex) {
            Throwable[] causeChain = throwableAnalyzer.determineCauseChain(ex);

            Throwable securityException = throwableAnalyzer.getFirstThrowableOfType(AuthenticationException.class, causeChain);
            if (securityException == null) {
                securityException = throwableAnalyzer.getFirstThrowableOfType(AccessDeniedException.class, causeChain);
            }

            if (securityException != null) {
                ((HttpServletResponse) response).setStatus(403);
//                try {
//                    String failureResponse = RPC.encodeResponseForFailure(null, new SupermanException(SpmError.AgentSessionNotFound));
//                    response.getWriter().print(failureResponse);
//                    response.flushBuffer();
//                } catch (SerializationException e) {
//                    throw new SupermanException(SpmError.SystemTechnicalFailure, "Unable to serialise security exception");
//                }
            } else {
                if (ex instanceof ServletException) {
                    throw (ServletException) ex;
                } else if (ex instanceof RuntimeException) {
                    throw (RuntimeException) ex;
                }

                throw new RuntimeException(ex);
            }
        }
    }

    private static final class DefaultThrowableAnalyzer extends ThrowableAnalyzer {
        protected void initExtractorMap() {
            super.initExtractorMap();

            registerExtractor(ServletException.class, throwable -> {
                ThrowableAnalyzer.verifyThrowableHierarchy(throwable, ServletException.class);
                return ((ServletException) throwable).getRootCause();
            });
        }
    }
}