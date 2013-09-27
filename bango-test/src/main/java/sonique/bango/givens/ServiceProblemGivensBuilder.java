package sonique.bango.givens;

import com.googlecode.yatspec.state.givenwhenthen.GivensBuilder;
import com.googlecode.yatspec.state.givenwhenthen.InterestingGivens;
import sonique.bango.domain.Agent;
import sonique.bango.domain.ServiceProblem;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.when;

public class ServiceProblemGivensBuilder implements GivensBuilder {
    private final SearchApiService searchApiService;
    private final ServiceProblem serviceProblem;

    public ServiceProblemGivensBuilder(ScenarioDriver scenarioDriver, ServiceProblem serviceProblem, Agent agent) {
        searchApiService = scenarioDriver.searchApiServiceFor(agent);
        this.serviceProblem = serviceProblem;
        when(searchApiService.serviceProblemById(this.serviceProblem.serviceProblemId())).thenReturn(newArrayList(this.serviceProblem));
    }

    public ServiceProblemGivensBuilder withADirectoryNumber() {
        when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.directoryNumber())).thenReturn(newArrayList(serviceProblem));
        return this;
    }

    @Override
    public InterestingGivens build(InterestingGivens interestingGivens) throws Exception {
        return interestingGivens;
    }
}
