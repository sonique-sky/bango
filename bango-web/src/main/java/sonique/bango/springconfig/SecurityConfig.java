package sonique.bango.springconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sky.sns.spm.infrastructure.security.AuthenticatedUserDetails;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Configuration
@EnableWebMvcSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Resource
    private DomainAgentRepository agentRepository;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(new AuthenticationProvider() {
            @Override
            public Authentication authenticate(Authentication authentication) throws AuthenticationException {
                DomainAgent agent = agentRepository.findByAgentCode(authentication.getName());
                if (agent == null) {
                    throw new UsernameNotFoundException("Invalid username/password");
                }

                agent.login(new Date());
                UserDetails user = new AuthenticatedUserDetails(agent);
                return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            }

            @Override
            public boolean supports(Class<?> aClass) {
                return true;
            }
        });
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.addFilter(aUsernamePasswordAuthenticationFilter())
                .addFilter(aLogoutFilter())
                .csrf().disable()

                .authorizeRequests()
                .antMatchers("/**/*.css").permitAll()
                .antMatchers("/**/*.js").permitAll()
                .antMatchers("/**/*.json").permitAll()
                .antMatchers("/app/**").permitAll()
                .antMatchers("/ext/**").permitAll()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/superman.html").permitAll()

                .antMatchers("/api/**").authenticated()
        ;
    }

    private Filter aLogoutFilter() {
        LogoutFilter logoutFilter = new LogoutFilter(
                (request, response, authentication) -> {
                    DomainAgent agent = agentRepository.findByAuthorisedUid(authentication.getName());
                    agent.logoff(new Date());
                    response.setStatus(HttpServletResponse.SC_OK);
                },
                new SecurityContextLogoutHandler());
        logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/j_spring_security_logout"));
        return logoutFilter;
    }

    private Filter aUsernamePasswordAuthenticationFilter() throws Exception {
        UsernamePasswordAuthenticationFilter authFilter = new UsernamePasswordAuthenticationFilter();
        authFilter.setUsernameParameter("username");
        authFilter.setPasswordParameter("password");
        authFilter.setAuthenticationManager(authenticationManagerBean());
        authFilter.setAuthenticationFailureHandler((request, response, exception) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Bad Credentials"));
        authFilter.setAuthenticationSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK));
        authFilter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/j_spring_security_check", HttpMethod.POST.name()));
        return authFilter;
    }
}
