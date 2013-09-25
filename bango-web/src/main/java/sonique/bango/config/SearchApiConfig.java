package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.SearchApiController;
import sonique.bango.service.SearchApiService;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class SearchApiConfig extends ApiConfig {

    @Resource
    private SearchApiService searchApiService;

    @Bean
    public SearchApiController searchApiController() {
        return new SearchApiController(searchApiService);
    }
}
