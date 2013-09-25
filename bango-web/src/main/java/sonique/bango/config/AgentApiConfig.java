package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.AgentApiController;
import sonique.bango.service.AgentApiService;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class AgentApiConfig extends ApiConfig {

    @Resource
    private AgentApiService agentApiService;

    @Bean
    public AgentApiController agentApiController() {
        return new AgentApiController(agentApiService);
    }
}
