package sonique.bango.app;

import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.infrastructure.repository.DomainAgentRepository;
import sonique.bango.service.ServiceProblemApiService;
import sonique.bango.service.TroubleReportApiService;

import java.util.Map;

import static com.google.common.collect.Maps.newHashMap;
import static com.google.common.collect.Maps.transformEntries;

public class ScenarioDriver {

    private final DomainAgentRepository agentRepository;
    private final Map<DomainAgent, ServiceWrapper> agentServices = newHashMap();

    public ScenarioDriver(DomainAgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    public void registerAgent(DomainAgent agent) {
        agentRepository.insert(agent);
        agentServices.put(agent, new ServiceWrapper());
    }

    public void deRegisterAgent(DomainAgent agent) {
        agentRepository.deleteAgent(agent);
        agentServices.remove(agent);
    }

    public Map<DomainAgent, ServiceProblemApiService> serviceProblemApiServices() {
        return transformEntries(agentServices, (domainAgent, serviceWrapper) -> serviceWrapper.serviceProblemApiService());
    }

    public Map<DomainAgent, TroubleReportApiService> troubleReportApiServices() {
        return transformEntries(agentServices, (domainAgent, serviceWrapper) -> serviceWrapper.troubleReportApiService());
    }

    public ServiceWrapper servicesFor(DomainAgent agent) {
        return agentServices.get(agent);
    }
}