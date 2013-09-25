package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.ServiceProblemApiController;
import sonique.bango.service.ServiceProblemApiService;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class ServiceProblemApiConfig extends ApiConfig {

    @Resource
    private ServiceProblemApiService serviceProblemApiService;

    @Bean
    public ServiceProblemApiController searchApiController() {
        return new ServiceProblemApiController(serviceProblemApiService);
    }
}
