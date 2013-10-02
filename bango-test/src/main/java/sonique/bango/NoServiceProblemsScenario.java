package sonique.bango;

import com.google.common.collect.Lists;
import sonique.bango.domain.Agent;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;

import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.when;

public class NoServiceProblemsScenario extends SupermanScenario {

    public NoServiceProblemsScenario(ScenarioDriver scenarioDriver, Agent agent) {
        super(agent, scenarioDriver);
    }

    @Override
    public void bindScenario() {
        List<ServiceProblem> emptyList = Lists.newArrayList();

        SearchApiService searchApiService = scenarioDriver.searchApiServiceFor(agent);

        when(searchApiService.serviceProblemById(any(Integer.class))).thenReturn(emptyList);
    }
}
