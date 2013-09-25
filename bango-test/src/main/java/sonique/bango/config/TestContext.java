package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sonique.bango.driver.ScenarioDriver;

@Configuration
public class TestContext extends BangoApplicationContext {

    @Bean
    public ScenarioDriver scenarioDriver() {
        return new ScenarioDriver(
                agentStore
        );
    }
}