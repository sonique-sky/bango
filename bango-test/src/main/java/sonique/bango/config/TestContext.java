package sonique.bango.config;

import net.sf.cglib.proxy.InvocationHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;
import sonique.bango.store.AgentStore;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
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
                (AgentStore) agentRepository
        );
    }

    private static class ServiceByAgentInvocationHandler<T> implements InvocationHandler {
        private final SpringSecurityAuthorisedActorProvider actorProvider;
        private final Map<DomainAgent, T> services;

        private ServiceByAgentInvocationHandler(SpringSecurityAuthorisedActorProvider actorProvider, Map<DomainAgent, T> services) {
            this.actorProvider = actorProvider;
            this.services = services;
        }

        @Override
        public Object invoke(Object o, Method method, Object[] objects) throws Throwable {
            if (method.getName().equals("hashCode")) {
                return this.hashCode();
            } else if (method.getName().equals("equals")) {
                return this.equals(objects[0]);
            }

            T service = services.get(actorProvider.getLoggedInAgent());
            return method.invoke(service, objects);
        }
    }
}