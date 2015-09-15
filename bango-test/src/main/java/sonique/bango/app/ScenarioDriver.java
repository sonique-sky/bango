package sonique.bango.app;

import sky.sns.spm.domain.model.DomainAgent;
import sonique.bango.service.SearchApiService;
import sonique.bango.service.ServiceProblemApiService;
import sonique.bango.store.AgentStore;

import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Maps.transformEntries;

public class ScenarioDriver {

    private final AgentStore agentStore;
    private final Map<DomainAgent, ServiceWrapper> agentServices = newHashMap();

    public ScenarioDriver(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    public void registerAgent(DomainAgent agent) {
        agentStore.insert(agent);
        agentServices.put(agent, new ServiceWrapper());
    }

    public void deRegisterAgent(DomainAgent agent) {
        agentStore.deleteAgent(agent);
        agentServices.remove(agent);
    }

    public Map<DomainAgent, SearchApiService> searchApiServices() {
        return transformEntries(agentServices, (domainAgent, serviceWrapper) -> serviceWrapper.searchApiService());
    }

    public Map<DomainAgent, ServiceProblemApiService> serviceProblemApiServices() {
        return transformEntries(agentServices, (domainAgent, serviceWrapper) -> serviceWrapper.serviceProblemApiService());
    }

    public ServiceWrapper servicesFor(DomainAgent agent) {
        return agentServices.get(agent);
    }
}