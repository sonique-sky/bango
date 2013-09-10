package sonique.bango.config;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.access.vote.AffirmativeBased;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.dao.ReflectionSaltSource;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.DefaultFilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlStrategy;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.security.web.util.AntPathRequestMatcher;
import org.springframework.security.web.util.RequestMatcher;
import sonique.bango.filter.SpmSecurityExceptionFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static java.util.Arrays.asList;

@Configuration
public class SpringSecurityConfig {

    // Don't change this bean name - or Spring will chastise you...
    @Bean
    public FilterChainProxy springSecurityFilterChain() throws Exception {
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();

        HttpSessionSecurityContextRepository httpSessionSecurityContextRepository = new HttpSessionSecurityContextRepository();

        FilterSecurityInterceptor filterSecurityInterceptor = new FilterSecurityInterceptor();

        AccessDecisionManager accessDecisionManager = new AffirmativeBased(Arrays.<AccessDecisionVoter>asList(new RoleVoter()));

        LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> urlPatternToRoleMap = new LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>>();

        List<ConfigAttribute> roles = Arrays.<ConfigAttribute>asList(
                new SecurityConfig("ROLE_USER"),
                new SecurityConfig("ROLE_QUEUE_CONTROLLER"),
                new SecurityConfig("ROLE_TEAM_LEAD"),
                new SecurityConfig("ROLE_MSP_ADMINISTRATOR")
        );

        urlPatternToRoleMap.put(new AntPathRequestMatcher("/**/api/**"), roles);

        DefaultFilterInvocationSecurityMetadataSource ms = new DefaultFilterInvocationSecurityMetadataSource(urlPatternToRoleMap);

        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(new Md5PasswordEncoder());
        authenticationProvider.setSaltSource(createSaltSource());
        authenticationProvider.setHideUserNotFoundExceptions(true);

        ProviderManager providerManager = new ProviderManager(Arrays.<AuthenticationProvider>asList(authenticationProvider));
        filterSecurityInterceptor.setAuthenticationManager(providerManager);
        filterSecurityInterceptor.setAccessDecisionManager(accessDecisionManager);
        filterSecurityInterceptor.setSecurityMetadataSource(ms);

        SessionRegistryImpl sessionRegistry = new SessionRegistryImpl();
        ConcurrentSessionControlStrategy sessionControlStrategy = new ConcurrentSessionControlStrategy(sessionRegistry);
        sessionControlStrategy.setAlwaysCreateSession(true);


        SecurityFilterChain secureChain = new DefaultSecurityFilterChain(
                new AntPathRequestMatcher("/**"),
                new SecurityContextPersistenceFilter(httpSessionSecurityContextRepository),
//                new SpmSessionControlFilter(sessionRegistry, securityContextLogoutHandler),
                logoutFilter(securityContextLogoutHandler),
                usernamePasswordAuthenticationFilter(providerManager, sessionControlStrategy),
                new SecurityContextHolderAwareRequestFilter(),
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

        return new FilterChainProxy(securityFilterChains);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        List<GrantedAuthorityImpl> grantedAuthorities = newArrayList(new GrantedAuthorityImpl("ROLE_USER"));
        List<UserDetails> userDetails = Lists.<UserDetails>newArrayList(new User("A.A", "74e7d1735adb9c455ea02683382148b6", grantedAuthorities));

        return new InMemoryUserDetailsManager(userDetails);
    }

    private ReflectionSaltSource createSaltSource() {
        ReflectionSaltSource saltSource1 = new ReflectionSaltSource();
        saltSource1.setUserPropertyToUse("username");
        return saltSource1;
    }

    private UsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter(ProviderManager authenticationManager, ConcurrentSessionControlStrategy sessionControlStrategy) {
        UsernamePasswordAuthenticationFilter filter = new UsernamePasswordAuthenticationFilter();
        filter.setUsernameParameter("username");
        filter.setPasswordParameter("password");
        filter.setAuthenticationManager(authenticationManager);
        filter.setSessionAuthenticationStrategy(sessionControlStrategy);
        filter.setAuthenticationFailureHandler(new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        });
        filter.setAuthenticationSuccessHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                response.setStatus(HttpServletResponse.SC_OK);
            }
        });

        return filter;
    }

    private LogoutFilter logoutFilter(SecurityContextLogoutHandler securityContextLogoutHandler) {
        LogoutSuccessHandler logoutSuccessHandler = new LogoutSuccessHandler() {
            @Override
            public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                response.setStatus(HttpServletResponse.SC_OK);
            }
        };
        return new LogoutFilter(logoutSuccessHandler, securityContextLogoutHandler);
    }
}