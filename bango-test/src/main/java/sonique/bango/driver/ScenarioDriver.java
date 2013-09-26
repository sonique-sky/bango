package sonique.bango.driver;

import sonique.bango.domain.Agent;
import sonique.bango.service.SearchApiService;
import sonique.bango.store.AgentStore;

import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;
import static org.mockito.Mockito.mock;

public class ScenarioDriver {

    private final AgentStore agentStore;
    private final Map<Agent,SearchApiService> searchApiServices = newHashMap();

    public ScenarioDriver(AgentStore agentStore) {
        this.agentStore = agentStore;
    }

    public void registerAgent(Agent agent){
        agentStore.registerAgent(agent);
        searchApiServices.put(agent, mock(SearchApiService.class));
    }

    public Map<Agent, SearchApiService> searchApiServices() {
        return searchApiServices;
    }

    public SearchApiService searchApiServiceFor(Agent agent) {
        return searchApiServices.get(agent);
    }
}
