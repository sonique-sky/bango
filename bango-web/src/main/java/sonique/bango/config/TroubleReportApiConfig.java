package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import sonique.bango.controller.TroubleReportApiController;
import sonique.bango.service.TroubleReportApiService;

import javax.annotation.Resource;

@Configuration
@EnableWebMvc
public class TroubleReportApiConfig extends ApiConfig {
    @Resource
    private TroubleReportApiService troubleReportApiService;

    @Bean
    public TroubleReportApiController troubleReportApiController() {
        return new TroubleReportApiController(troubleReportApiService);
    }

}
