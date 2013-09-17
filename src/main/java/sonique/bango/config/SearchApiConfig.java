package sonique.bango.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import sonique.bango.controller.SearchApiController;
import sonique.bango.store.ServiceProblemStore;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import javax.annotation.Resource;
import java.util.List;

@Configuration
@EnableWebMvc
public class SearchApiConfig extends WebMvcConfigurerAdapter {

    @Resource
    private ObjectMapper objectMapper;


    @Resource
    private ServiceProblemStore serviceProblemStore;

    @Resource
    private SpringSecurityAuthorisedActorProvider authorisedActorProvider;

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(objectMapper);
        converters.add(converter);
    }

    @Bean
    public SearchApiController searchApiController() {
        return new SearchApiController(serviceProblemStore, authorisedActorProvider);
    }
}
