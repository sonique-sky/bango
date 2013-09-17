package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.AgentApiController;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class AgentApiConfig extends ApiConfig {

    @Resource
    private SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    @Bean
    public AgentApiController agentApiController() {
        return new AgentApiController(authorisedActorProvider);
    }
}
