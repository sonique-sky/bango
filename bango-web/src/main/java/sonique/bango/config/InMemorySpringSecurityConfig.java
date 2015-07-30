package sonique.bango.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebMvcSecurity
public class InMemorySpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Resource
    private DomainAgentRepository agentRepository;

    // Don't change this bean name - or Spring will chastise you...


    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeRequests()
                .antMatchers("/build/**", "/*.css", "/*.js", "/app/**", "/ext/**", "/resources/**", "/superman.html")
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
//                .loginPage("/superman.html")
                        .successHandler(new AuthenticationSuccessHandler() {
                            @Override
                            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                                response.setStatus(HttpServletResponse.SC_OK);
                            }
                        })
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                        System.out.println("request = " + request);
                    }
                })
                .permitAll()
                .and()
                .logout()
                .permitAll()

        ;

    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("user").password("password").roles("USER");
    }

  /*
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
   */
}