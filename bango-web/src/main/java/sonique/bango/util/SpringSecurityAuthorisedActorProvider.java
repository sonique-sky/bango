package sonique.bango.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import sonique.bango.domain.Agent;
import sonique.bango.store.AgentStore;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class SpringSecurityAuthorisedActorProvider implements UserDetailsService {
    private AgentStore agentStore;

    public SpringSecurityAuthorisedActorProvider(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    public Agent getLoggedInAgent() {
        return authenticatedAgent();
    }

    public Agent authenticatedAgent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof AuthenticatedUser) {
            AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();

            return agentStore.agentFor(authenticatedUser.getUsername());
        }

        throw new RuntimeException("authorised agent not found");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new AuthenticatedUser(agentStore.agentFor(username));
    }

    public static class AuthenticatedUser implements UserDetails {

        private final Agent agent;

        public AuthenticatedUser(Agent agent) {
            this.agent = agent;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return newArrayList(new SimpleGrantedAuthority("ROLE_USER"));
        }

        @Override
        public String getPassword() {
            return EncodePassword.encodePassword(agent.agentCode().toLowerCase(), "a");
        }

        @Override
        public String getUsername() {
            return agent.agentCode();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }

        public Agent agent() {
            return agent;
        }
    }
}