package sonique.bango.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.infrastructure.security.SpringSecurityAuthorisedActorProvider;
import sonique.bango.app.ScenarioDriver;
import sonique.bango.service.ServiceProblemApiService;
import sonique.bango.service.TroubleReportApiService;
import sonique.bango.springconfig.BangoApplicationContext;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Map;
import java.util.function.Function;


@Configuration
public class TestContext extends BangoApplicationContext {

    @Override
    public ServiceProblemApiService serviceProblemApiService() {
        return wrapServiceFor(ServiceProblemApiService.class, ScenarioDriver::serviceProblemApiServices);
    }

    @Override
    public TroubleReportApiService troubleReportApiService() {
        return wrapServiceFor(TroubleReportApiService.class, ScenarioDriver::troubleReportApiServices);
    }

    @Bean
    public ScenarioDriver scenarioDriver() {
        return new ScenarioDriver(
                agentRepository
        );
    }

    @SuppressWarnings("unchecked")
    private <T> T wrapServiceFor(Class<T> clazz, Function<ScenarioDriver, Map<DomainAgent, T>> serviceFunction) {
        return (T) Proxy.newProxyInstance(getClass().getClassLoader(), new Class[]{clazz},
                new ServiceByAgentInvocationHandler<>(springSecurityAuthorisedActorProvider(), serviceFunction.apply(scenarioDriver()))
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