package sonique.bango.store;

import com.google.common.base.Functions;
import sonique.bango.domain.Agent;
import sonique.bango.servlet.GTFOException;

import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

public class AgentStore {
    private final Map<String, Agent> agentMap = newHashMap();

    public Agent agentFor(String string) {
        Agent agent = Functions.forMap(agentMap).apply(string);
        if (agent == null) {
            throw new GTFOException(403, "No Agent!");
        }
        return agent;
    }

    public void login(String sessionId, Agent agent) {
        agentMap.put(sessionId, agent);
    }

    public void logout(String sessionId) {
        agentMap.remove(sessionId);

    }
}
