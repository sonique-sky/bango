package sonique.bango.config;

import net.sf.cglib.proxy.InvocationHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sonique.bango.domain.Agent;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;
import sonique.bango.util.SpringSecurityAuthorisedActorProvider;

import javax.annotation.Resource;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import static net.sf.cglib.proxy.Proxy.newProxyInstance;

@Configuration
public class TestContext extends BangoApplicationContext {

    @Override
    public SearchApiService searchApiService() {
        return (SearchApiService) newProxyInstance(
                getClass().getClassLoader(),
                new Class[]{SearchApiService.class},
                new ServiceByAgentInvocationHandler<SearchApiService>(springSecurityAuthorisedActorProvider(), scenarioDriver().searchApiServices())
        );
    }

    @Bean
    public ScenarioDriver scenarioDriver() {
        return new ScenarioDriver(
                agentStore
        );
    }

    private static class ServiceByAgentInvocationHandler<T> implements InvocationHandler {

        private final SpringSecurityAuthorisedActorProvider actorProvider;
        private final Map<Agent, T> services;

        private ServiceByAgentInvocationHandler(SpringSecurityAuthorisedActorProvider actorProvider, Map<Agent, T> services) {
            this.actorProvider = actorProvider;
            this.services = services;
        }

        @Override
        public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
            T service = services.get(actorProvider.authenticatedAgent());
            return method.invoke(service, objects);
        }
    }
}