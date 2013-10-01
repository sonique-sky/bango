package sonique.bango;

import com.google.common.collect.Lists;
import org.mockito.Matchers;
import sonique.bango.domain.*;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.when;

public class NoServiceProblemsScenario extends SupermanScenario {

    public NoServiceProblemsScenario(ScenarioDriver scenarioDriver, Agent agent) {
        super(agent, scenarioDriver);
    }

    @Override
    public void bindScenario() {
        List<ServiceProblem> emptyList = Lists.newArrayList();

        SearchApiService searchApiService = scenarioDriver.searchApiServiceFor(agent);

        when(searchApiService.serviceProblemById(Matchers.<Integer>any())).thenReturn(emptyList);
        when(searchApiService.serviceProblemByDirectoryNumber(Matchers.<String>any())).thenReturn(emptyList);
        when(searchApiService.serviceProblemsByMspId(Matchers.<String>any())).thenReturn(emptyList);
        when(searchApiService.serviceProblemsByServiceId(Matchers.<String>any())).thenReturn(emptyList);
    }
}
