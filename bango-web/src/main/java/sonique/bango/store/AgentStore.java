package sonique.bango.store;

import com.google.common.collect.ImmutableList;
import sky.sns.spm.domain.model.AgentDashboardEntry;
import sky.sns.spm.domain.model.AgentState;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.refdata.Queue;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;

import java.util.List;
import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;

public class AgentStore implements DomainAgentRepository {

    private final Map<String, DomainAgent> agentCodeToAgentMap = newHashMap();

    public void registerAgent(DomainAgent agent) {
        agentCodeToAgentMap.put(agentCode(agent), agent);
    }

    public void removeAgent(DomainAgent agent) {
        agentCodeToAgentMap.remove(agentCode(agent));
    }

    @Override
    public void deleteAgent(DomainAgent domainAgent) {
        throw new UnsupportedOperationException("Method AgentStore deleteAgent() not yet implemented");
    }

    @Override
    public DomainAgent findByAuthorisedUid(String s) {
        return agentCodeToAgentMap.get(s);
    }

    @Override
    public List<DomainAgent> findAssignableAgents(Queue queue) {
        throw new UnsupportedOperationException("Method AgentStore findAssignableAgents() not yet implemented");
    }

    @Override
    public DomainAgent findByAgentCode(String agentCode) {
        return agentCodeToAgentMap.get(agentCode.toUpperCase());
    }

    @Override
    public AgentState getAgentState(DomainAgent agent) {
        throw new UnsupportedOperationException("Method AgentStore getAgentState() not yet implemented");
    }

    @Override
    public DomainAgent insert(DomainAgent agent) {
        throw new UnsupportedOperationException("Method AgentStore insert() not yet implemented");
    }

    @Override
    public List<AgentDashboardEntry> getAgentDashboardEntries() {
        throw new UnsupportedOperationException("Method AgentStore getAgentDashboardEntries() not yet implemented");
    }

    @Override
    public List<DomainAgent> getAllAgents() {
        return ImmutableList.copyOf(agentCodeToAgentMap.values());
    }

    @Override
    public boolean agentExists(String agentCode) {
        throw new UnsupportedOperationException("Method AgentStore agentExists() not yet implemented");
    }

    @Override
    public void markAllAgentsOffline() {
        throw new UnsupportedOperationException("Method AgentStore markAllAgentsOffline() not yet implemented");
    }

    private String agentCode(DomainAgent agent) {
        return agent.getAgentCode().toUpperCase();
    }
}