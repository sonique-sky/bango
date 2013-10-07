package sonique.bango.driver;

import sky.sns.spm.domain.model.DomainAgent;
import sonique.bango.service.SearchApiService;
import sonique.bango.store.AgentStore;

import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;
import static org.mockito.Mockito.mock;

public class ScenarioDriver {

    private final AgentStore agentStore;
    private final Map<DomainAgent,SearchApiService> searchApiServices = newHashMap();

    public ScenarioDriver(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    public void registerAgent(DomainAgent agent){
        agentStore.registerAgent(agent);
        searchApiServices.put(agent, mock(SearchApiService.class));
    }

    public void deRegisterAgent(DomainAgent agent) {
        agentStore.removeAgent(agent);
        searchApiServices.remove(agent);
    }

    public Map<DomainAgent, SearchApiService> searchApiServices() {
        return searchApiServices;
    }

    public SearchApiService searchApiServiceFor(DomainAgent agent) {
        return searchApiServices.get(agent);
    }
}
