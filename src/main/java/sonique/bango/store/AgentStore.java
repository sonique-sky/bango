package sonique.bango.store;

import com.google.common.base.Function;
import com.google.common.base.Functions;
import com.google.common.collect.Maps;
import sonique.bango.domain.Agent;
import sonique.bango.domain.Queue;
import sonique.bango.servlet.GTFOException;
import sun.management.resources.agent;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;

public class AgentStore {

    private static final List<Agent> agents = newArrayList(
            new Agent("A.A", newArrayList(new Queue(1, "Queue 1"), new Queue(2, "Queue 2"), new Queue(3, "Queue 3"), new Queue(4, "Queue 4"), new Queue(5, "Queue 5"))),
            new Agent("B.B", newArrayList(new Queue(1, "Queue 1"), new Queue(2, "Queue 2"), new Queue(3, "Queue 3"), new Queue(4, "Queue 4"), new Queue(5, "Queue 5"))),
            new Agent("C.C", newArrayList(new Queue(1, "Queue 1"), new Queue(2, "Queue 2"), new Queue(3, "Queue 3"), new Queue(4, "Queue 4"), new Queue(5, "Queue 5")))
    );

    private static final Map<String, Agent> agentCodeToAgentMap = Maps.uniqueIndex(agents, new Function<Agent, String>() {
        public String apply(Agent agent) {
            return agent.agentCode();
        }
    });

    private final Map<String, Agent> sessionIdToAgentMap = newHashMap();

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
