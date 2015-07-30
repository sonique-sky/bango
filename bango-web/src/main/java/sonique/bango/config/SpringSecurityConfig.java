package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.access.vote.AffirmativeBased;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.ReflectionSaltSource;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.authentication.BindAuthenticator;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.DefaultFilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import sky.sns.spm.application.SystemService;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.security.AuthenticatedUserDetails;
import sky.sns.spm.infrastructure.spring.SpmSessionRegistry;
import sonique.bango.filter.SpmSecurityExceptionFilter;
import sonique.bango.filter.SpmSessionControlFilter;

import javax.annotation.Resource;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

@Configuration
public class SpringSecurityConfig {

    @Resource
    private DomainAgentRepository agentRepository;

    // Don't change this bean name - or Spring will chastise you...
    @Bean
    public FilterChainProxy springSecurityFilterChain() throws Exception {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();

        HttpSessionSecurityContextRepository httpSessionSecurityContextRepository = new HttpSessionSecurityContextRepository();

        FilterSecurityInterceptor filterSecurityInterceptor = new FilterSecurityInterceptor();

        AccessDecisionManager accessDecisionManager = new AffirmativeBased(singletonList(new RoleVoter()));

        LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> urlPatternToRoleMap = new LinkedHashMap<>();

        List<ConfigAttribute> roles = Arrays.<ConfigAttribute>asList(
                new SecurityConfig("ROLE_USER"),
                new SecurityConfig("ROLE_QUEUE_CONTROLLER"),
                new SecurityConfig("ROLE_TEAM_LEAD"),
                new SecurityConfig("ROLE_MSP_ADMINISTRATOR")
        );

        urlPatternToRoleMap.put(new AntPathRequestMatcher("/**/api/**"), roles);

        DefaultFilterInvocationSecurityMetadataSource ms = new DefaultFilterInvocationSecurityMetadataSource(urlPatternToRoleMap);

        LdapContextSource contextSource = new DefaultSpringSecurityContextSource(new URI("ldap://localhost:11899").toASCIIString());
        contextSource.setPooled(false);

        BindAuthenticator authenticator = new BindAuthenticator(contextSource);
        authenticator.setUserDnPatterns(new String[]{"uid={0},ou=People,dc=isp,dc=sky,dc=com"});

        LdapAuthenticationProvider authenticationProvider = new LdapAuthenticationProvider(authenticator);
        authenticationProvider.setUserDetailsContextMapper(userDetailsContextMapper());
        contextSource.afterPropertiesSet();

        ProviderManager providerManager = new ProviderManager(singletonList(authenticationProvider));
        filterSecurityInterceptor.setAuthenticationManager(providerManager);
        filterSecurityInterceptor.setAccessDecisionManager(accessDecisionManager);
        filterSecurityInterceptor.setSecurityMetadataSource(ms);

        SpmSessionRegistry sessionRegistry = new SpmSessionRegistry(new SystemService() {
            @Override
            public void resetAllAgentsState() {
            }

            @Override
            public void loginAgent(String agentCode) {
                agentRepository.findByAgentCode(agentCode).login(new Date());
            }

            @Override
            public void logOffAgent(String agentCode) {
                agentRepository.findByAgentCode(agentCode).logoff(new Date());
            }

            @Override
            public void pushWorkItemsThatHaveBreachedSla() {
            }

            @Override
            public void completeWorkRemindersThatHaveBreachedSla() {
            }
        });
        ConcurrentSessionControlAuthenticationStrategy sessionControlStrategy = new ConcurrentSessionControlAuthenticationStrategy(sessionRegistry);

        SecurityContextHolderAwareRequestFilter securityContextHolderAwareRequestFilter = new SecurityContextHolderAwareRequestFilter();
        SecurityFilterChain secureChain = new DefaultSecurityFilterChain(
                new AntPathRequestMatcher("/**"),
                new SecurityContextPersistenceFilter(httpSessionSecurityContextRepository),
                new SpmSessionControlFilter(sessionRegistry, securityContextLogoutHandler),
                logoutFilter(securityContextLogoutHandler),
                usernamePasswordAuthenticationFilter(providerManager, sessionControlStrategy),
                securityContextHolderAwareRequestFilter,
                new SessionManagementFilter(httpSessionSecurityContextRepository, sessionControlStrategy),
                new SpmSecurityExceptionFilter(),
                filterSecurityInterceptor
        );

        List<SecurityFilterChain> securityFilterChains = asList(
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/build/**")),
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/*.css")),
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/*.js")),
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/app/**")),
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/ext/**")),
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/resources/**")),
                new DefaultSecurityFilterChain(new AntPathRequestMatcher("/superman.html")),
                secureChain
        );

        securityContextHolderAwareRequestFilter.afterPropertiesSet();

        return new FilterChainProxy(securityFilterChains);
    }

    private UserDetailsContextMapper userDetailsContextMapper() {
        return new UserDetailsContextMapper() {
            @Override
            public UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> authorities) {
                try {
                    Attributes attributes = ctx.getAttributes();
                    String uid = getAttribute("uid", attributes);
                    DomainAgent agent = agentRepository.findByAuthorisedUid(uid);
                    if (agent == null) {
                        throw new UsernameNotFoundException("Invalid username/password");
                    }
                    return new AuthenticatedUserDetails(agent);
                } catch (Exception e) {
                    throw new UsernameNotFoundException("Invalid username/password", e);
                }
            }

            @Override
            public void mapUserToContext(UserDetails user, DirContextAdapter ctx) {
                throw new UnsupportedOperationException("Method  mapUserToContext() not yet implemented");
            }
        };
    }

    private String getAttribute(String attributeName, Attributes attributes) throws NamingException {
        return (String) attributes.get(attributeName).get();
    }

    private UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter(
            ProviderManager authenticationManager,
            ConcurrentSessionControlAuthenticationStrategy sessionControlStrategy) {
        UsernamePasswordAuthenticationFilter filter = new UsernamePasswordAuthenticationFilter();
        filter.setUsernameParameter("username");
        filter.setPasswordParameter("password");
        filter.setAuthenticationManager(authenticationManager);
        filter.setSessionAuthenticationStrategy(sessionControlStrategy);
        filter.setAuthenticationFailureHandler((request, response, exception) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Bad Credentials"));
        filter.setAuthenticationSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK));

        return filter;
    }

    private LogoutFilter logoutFilter(SecurityContextLogoutHandler securityContextLogoutHandler) {
        LogoutSuccessHandler logoutSuccessHandler = (request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK);
        return new LogoutFilter(logoutSuccessHandler, securityContextLogoutHandler);
    }
}