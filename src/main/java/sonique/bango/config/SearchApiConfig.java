package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.SearchApiController;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class SearchApiConfig extends ApiConfig {

    @Resource
    private ServiceProblemStore serviceProblemStore;

    @Resource
    private SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    @Bean
    public SearchApiController searchApiController() {
        return new SearchApiController(serviceProblemStore, authorisedActorProvider);
    }
}
