package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.QueueApiController;
import sonique.bango.service.QueueApiService;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class QueueApiConfig extends ApiConfig {

    @Resource
    private QueueApiService queueApiService;

    @Bean
    public QueueApiController agentApiController() {
        return new QueueApiController(queueApiService);
    }
}