package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.QueueApiController;
import sonique.bango.store.QueueStore;
import sonique.bango.store.ServiceProblemStore;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class QueueApiConfig extends ApiConfig {

    @Resource
    private QueueStore queueStore;

    @Resource
    private ServiceProblemStore serviceProblemStore;

    @Bean
    public QueueApiController agentApiController() {
        return new QueueApiController(queueStore, serviceProblemStore);
    }
}
