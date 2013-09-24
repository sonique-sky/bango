package sonique.bango.filter;

import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistryImpl;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

public class SpmSessionRegistry extends SessionRegistryImpl {

    @Override
    public void registerNewSession(String sessionId, Object principal) {
        super.registerNewSession(sessionId, principal);
        ((SpringSecurityAuthorisedActorProvider.AuthenticatedUser)principal).agent().agentState().login();
    }

    @Override
    public void removeSessionInformation(String sessionId) {
        SessionInformation sessionInformation = getSessionInformation(sessionId);

        if (sessionInformation != null && !sessionInformation.isExpired()) {
//            systemService.logOffAgent(username(sessionInformation));
        }
        super.removeSessionInformation(sessionId);
    }
}