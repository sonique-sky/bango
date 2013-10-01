package sonique.bango;

import com.google.common.collect.Lists;
import sonique.bango.domain.*;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.when;

public class ServiceProblemScenario extends SupermanScenario {

    private Integer serviceProblemId;
    private String serviceId;
    private String directoryNumber;

    public ServiceProblemScenario(ScenarioDriver scenarioDriver, Agent agent) {
        super(agent, scenarioDriver);
    }

    public ServiceProblemScenario withDefaults() {
        serviceProblemId = 100000;
        serviceId = "1";
        directoryNumber = "dirNum";

        return this;
    }

    @Override
    public void bindScenario() {
        ServiceProblem serviceProblem = new ServiceProblem(
                serviceProblemId,
                "Open",
                new WorkItem(1, "Unassigned"),
                new Queue(1, "Queue"),
                false,
                directoryNumber,
                Lists.<EventHistoryItem>newArrayList(),
                serviceId);

        List<ServiceProblem> serviceProblems = newArrayList(serviceProblem);

        SearchApiService searchApiService = scenarioDriver.searchApiServiceFor(agent);

        when(searchApiService.serviceProblemById(serviceProblem.serviceProblemId())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.directoryNumber())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemsByServiceId(serviceProblem.serviceId())).thenReturn(serviceProblems);
    }

    public Integer serviceProblemId() {
        return serviceProblemId;
    }

    public String serviceId() {
        return serviceId;
    }

    public String directoryNumber() {
        return directoryNumber;
    }
}
