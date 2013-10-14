package sonique.bango;

import com.google.common.collect.Lists;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import sky.sns.spm.domain.model.DomainAgent;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblem;
import sky.sns.spm.domain.model.serviceproblem.DomainServiceProblemBuilder;
import sky.sns.spm.domain.model.serviceproblem.DomainWorkItemBuilder;
import sky.sns.spm.interfaces.shared.PagedSearchResults;
import sonique.bango.driver.ScenarioDriver;
import sonique.bango.service.SearchApiService;
import sonique.bango.service.ServiceProblemApiService;
import spm.domain.DirectoryNumber;
import spm.domain.QueueName;
import spm.domain.ServiceProblemId;
import spm.domain.SnsServiceId;
import spm.domain.model.refdata.QueueBuilder;

import java.util.List;

import static org.mockito.Mockito.stub;
import static org.mockito.Mockito.when;
import static util.SupermanDataFixtures.*;

public class ServiceProblemScenario extends SupermanScenario {

    private Long serviceProblemId;
    private String serviceId;
    private String directoryNumber;
    private final DomainServiceProblem serviceProblem;

    public static ServiceProblemScenario noWorkItemScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        DomainServiceProblem serviceProblem = new DomainServiceProblemBuilder()
                .withServiceProblemId(someServiceProblemId())
                .withQueue(new QueueBuilder().with(new QueueName("Queue")).build())
                .withDirectoryNumber(someDirectoryNumber())
                .withServiceId(someSnsServiceId())
                .build();
        return new ServiceProblemScenario(scenarioDriver, agent, serviceProblem);
    }

    public static ServiceProblemScenario serviceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent) {
        DomainServiceProblem serviceProblem = new DomainServiceProblemBuilder()
                .withServiceProblemId(someServiceProblemId())
                .withWorkItem(DomainWorkItemBuilder.withAllDefaults().build())
                .withQueue(new QueueBuilder().with(new QueueName("Queue")).build())
                .withDirectoryNumber(someDirectoryNumber())
                .withServiceId(someSnsServiceId())
                .build();
        return new ServiceProblemScenario(scenarioDriver, agent,serviceProblem);
    }

    private ServiceProblemScenario(ScenarioDriver scenarioDriver, DomainAgent agent, DomainServiceProblem serviceProblem) {
        super(scenarioDriver, agent);
        this.serviceProblem = serviceProblem;
    }

    @Override
    public void bindScenario() {

        final List<DomainServiceProblem> serviceProblemList = Lists.newArrayList(serviceProblem);
        PagedSearchResults<DomainServiceProblem> serviceProblems = new PagedSearchResults<DomainServiceProblem>(serviceProblemList, 1L);

        SearchApiService searchApiService = scenarioDriver.searchApiServiceFor(agent);

        when(searchApiService.serviceProblemById(serviceProblem.serviceProblemId())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemByDirectoryNumber(serviceProblem.getDirectoryNumber())).thenReturn(serviceProblems);
        when(searchApiService.serviceProblemsByServiceId(serviceProblem.serviceId())).thenReturn(serviceProblems);

        ServiceProblemApiService serviceProblemApiService = scenarioDriver.serviceProblemApiServiceFor(agent);
        stub(serviceProblemApiService.pull(serviceProblem.serviceProblemId())).toAnswer(new Answer<List<DomainServiceProblem>>() {
            @Override
            public List<DomainServiceProblem> answer(InvocationOnMock invocationOnMock) throws Throwable {
                serviceProblem.tug(agent);
                return serviceProblemList;
            }
        });
    }

    public ServiceProblemId serviceProblemId() {
        return serviceProblem.serviceProblemId();
    }

    public SnsServiceId serviceId() {
        return serviceProblem.serviceId();
    }

    public DirectoryNumber directoryNumber() {
        return serviceProblem.getDirectoryNumber();
    }
}
