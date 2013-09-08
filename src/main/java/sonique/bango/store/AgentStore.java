package sonique.bango.store;

import com.google.common.base.Functions;
import sonique.bango.domain.Agent;
import sonique.bango.servlet.GTFOException;

import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

public class AgentStore {

    private final Map<String, Agent> agentCodeToAgentMap = newHashMap();
    private final Map<String, Agent> sessionIdToAgentMap = newHashMap();

    public Agent agentFor(String sessionId) {
        Agent agent = Functions.forMap(sessionIdToAgentMap, null).apply(sessionId);
        if (agent == null) {
            throw new GTFOException(403, "No Agent!");
        }
        return agent;
    }

    public void login(String sessionId, String agentCode) {
        sessionIdToAgentMap.put(sessionId, agentCodeToAgentMap.get(agentCode));
    }

    public void logout(String sessionId) {
        sessionIdToAgentMap.remove(sessionId);
    }

    public void registerAgent(Agent agent) {
        agentCodeToAgentMap.put(agent.agentCode(), agent);
    }
}