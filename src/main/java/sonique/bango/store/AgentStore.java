package sonique.bango.store;

import com.google.common.base.Function;
import com.google.common.base.Functions;
import sonique.bango.domain.Agent;
import sonique.bango.servlet.GTFOException;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Maps.uniqueIndex;

public class AgentStore {

    private final List<Agent> agents;

    private final Map<String, Agent> agentCodeToAgentMap;

    private final Map<String, Agent> sessionIdToAgentMap = newHashMap();

    public AgentStore(QueueStore queueStore) {
        agents = newArrayList(
                new Agent("A.A", queueStore.allQueues()),
                new Agent("B.B", queueStore.allQueues()),
                new Agent("C.C", queueStore.allQueues())
        );

        agentCodeToAgentMap = uniqueIndex(agents, new Function<Agent, String>() {
               public String apply(Agent agent) {
                   return agent.agentCode();
               }
           });
    }

    public Agent agentFor(String sessionId) {
        Agent agent = Functions.forMap(sessionIdToAgentMap).apply(sessionId);
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
}
