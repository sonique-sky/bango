package sonique.bango.store;

import sonique.bango.domain.Agent;
import sonique.bango.servlet.GTFOException;

import java.util.Map;

import static com.google.common.base.Functions.forMap;
import static com.google.common.collect.Maps.newHashMap;

public class AgentStore {

    private final Map<String, Agent> agentCodeToAgentMap = newHashMap();

    public Agent agentFor(String agentCode) {
        return agentCodeToAgentMap.get(agentCode.toUpperCase());
    }


    public void registerAgent(Agent agent) {
        agentCodeToAgentMap.put(agent.agentCode().toUpperCase(), agent);
    }
}