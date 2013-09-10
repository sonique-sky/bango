package sonique.bango.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import sonique.bango.controller.SearchApiController;
import sonique.bango.controller.ServiceProblemApiController;
import sonique.bango.store.ServiceProblemStore;

import javax.annotation.Resource;
import java.util.List;

@Configuration
@EnableWebMvc
public class ServiceProblemApiConfig extends WebMvcConfigurerAdapter {

    @Resource
    private ObjectMapper objectMapper;


    @Resource
    private ServiceProblemStore serviceProblemStore;

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(objectMapper);
        converters.add(converter);
    }

    @Bean
    public ServiceProblemApiController searchApiController() {
        return new ServiceProblemApiController(serviceProblemStore);
    }
}
