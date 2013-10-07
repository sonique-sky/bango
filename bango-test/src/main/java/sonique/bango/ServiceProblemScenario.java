package sonique.bango;

import com.google.common.collect.Lists;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblemBuilder;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;
import spm.domain.DirectoryNumber;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.domain.model.refdata.QueueBuilder;

import static org.mockito.Mockito.when;

public class ServiceProblemScenario extends SupermanScenario {

    private Long serviceProblemId;
    private String serviceId;
    private String directoryNumber;

    public ServiceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        super(agent, scenarioDriver);
    }

    public ServiceProblemScenario withDefaults() {
        serviceProblemId = 100000L;
        serviceId = "1";
        directoryNumber = "dirNum";

        return this;
    }

    @Override
    public void bindScenario() {
        DomainServiceProblem serviceProblem = new DomainServiceProblemBuilder()
                .withServiceProblemId(new ServiceProblemId(serviceProblemId))
                .withWorkItem(DomainWorkItemBuilder.withAllDefaults().build())
                .withQueue(new QueueBuilder().with(new QueueName("Queue")).build())
                .withDirectoryNumber(new DirectoryNumber(directoryNumber))
                .withServiceId(new SnsServiceId(serviceId))
                .build();

        PagedSearchResults<DomainServiceProblem> serviceProblems = new PagedSearchResults<DomainServiceProblem>(Lists.<DomainServiceProblem>newArrayList(serviceProblem), 1L);

        SearchApiService searchApiService = scenarioDriver.searchApiServiceFor(agent);

        when(searchApiService.serviceProblemById(serviceProblem.serviceProblemId())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.getDirectoryNumber())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemsByServiceId(serviceProblem.serviceId())).thenReturn(serviceProblems);
    }

    public Long serviceProblemId() {
        return serviceProblemId;
    }

    public String serviceId() {
        return serviceId;
    }

    public String directoryNumber() {
        return directoryNumber;
    }
}
